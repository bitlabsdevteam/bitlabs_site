import { z } from "zod";

const requestSchema = z.object({
  query: z.string().trim().min(1).max(4000),
  conversationId: z.string().trim().uuid().nullable().optional(),
  userId: z.string().trim().min(1).max(200),
  toolMode: z.enum(["chat", "web_search"]).optional(),
  tools: z
    .object({
      webSearch: z
        .object({
          enabled: z.boolean(),
          provider: z.literal("perplexity"),
          apiKey: z.string().trim().min(1).max(300),
        })
        .optional(),
    })
    .optional(),
});

type DifyChatResponse = {
  answer?: string;
  conversation_id?: string;
};

type PerplexitySearchResult = {
  title?: string;
  url?: string;
  date?: string;
};

type PerplexityChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  search_results?: PerplexitySearchResult[];
};

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const perplexitySystemPrompt =
  "You are the BitLabs web_search tool. Search the web for the user's query and return a concise, factual result with source URLs. Do not mention private data or unsupported claims.";

function stripCodeFence(value: string) {
  const trimmedValue = value.trim();
  const codeFenceMatch = trimmedValue.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);

  return codeFenceMatch ? codeFenceMatch[1].trim() : trimmedValue;
}

function collectMessageParts(entry: JsonValue) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    return null;
  }

  const speaker = typeof entry.speaker === "string" ? entry.speaker.trim() : "";
  const role = typeof entry.role === "string" ? entry.role.trim() : "";
  const message =
    typeof entry.message === "string"
      ? entry.message.trim()
      : typeof entry.content === "string"
        ? entry.content.trim()
        : typeof entry.text === "string"
          ? entry.text.trim()
          : "";

  if (!message) {
    return null;
  }

  return {
    speaker,
    role,
    message,
  };
}

function extractAnswerFromStructuredPayload(payload: JsonValue): string | null {
  if (typeof payload === "string") {
    const cleaned = stripCodeFence(payload);

    if (cleaned === payload) {
      return cleaned || null;
    }

    return extractAnswerFromStructuredPayload(cleaned);
  }

  if (Array.isArray(payload)) {
    const messages = payload
      .map(collectMessageParts)
      .filter((entry): entry is NonNullable<ReturnType<typeof collectMessageParts>> => Boolean(entry));

    if (messages.length > 0) {
      const assistantMessages = messages.filter(({ speaker, role }) => {
        const normalizedSpeaker = speaker.toLowerCase();
        const normalizedRole = role.toLowerCase();

        return (
          normalizedSpeaker === "adam" ||
          normalizedSpeaker === "assistant" ||
          normalizedSpeaker === "ai" ||
          normalizedSpeaker === "bot" ||
          normalizedRole === "assistant"
        );
      });

      const preferredMessages = assistantMessages.length > 0 ? assistantMessages : messages;
      return preferredMessages.map(({ message }) => message).join("\n\n");
    }

    const nestedAnswers = payload
      .map((entry) => extractAnswerFromStructuredPayload(entry))
      .filter((entry): entry is string => Boolean(entry));

    return nestedAnswers.length > 0 ? nestedAnswers.join("\n\n") : null;
  }

  if (!payload || typeof payload !== "object") {
    return null;
  }

  const objectPayload = payload as Record<string, JsonValue>;

  for (const key of ["answer", "reply", "response", "output", "content", "message", "text"]) {
    const value = objectPayload[key];
    if (typeof value === "string" && value.trim()) {
      return stripCodeFence(value);
    }
  }

  for (const key of ["conversation", "messages", "items", "results", "data"]) {
    const value = objectPayload[key];
    if (value !== undefined) {
      const extractedValue = extractAnswerFromStructuredPayload(value);
      if (extractedValue) {
        return extractedValue;
      }
    }
  }

  return null;
}

function normalizeDifyAnswer(answer: string) {
  const cleanedAnswer = stripCodeFence(answer);

  try {
    const parsedAnswer = JSON.parse(cleanedAnswer) as JsonValue;
    return extractAnswerFromStructuredPayload(parsedAnswer) ?? cleanedAnswer;
  } catch {
    return cleanedAnswer;
  }
}

function formatSearchResults(results: PerplexitySearchResult[] | undefined) {
  if (!results || results.length === 0) {
    return "";
  }

  const formattedResults = results
    .slice(0, 6)
    .map((result, index) => {
      const title = result.title?.trim() || `Source ${index + 1}`;
      const url = result.url?.trim();
      const date = result.date?.trim();
      return [`${index + 1}. ${title}`, url ? `   ${url}` : "", date ? `   Published: ${date}` : ""]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `\n\nSources:\n${formattedResults}`;
}

async function runPerplexityWebSearch(query: string, apiKey: string) {
  const baseUrl = process.env.PERPLEXITY_API_BASE_URL ?? "https://api.perplexity.ai/v1/sonar";
  const model = process.env.PERPLEXITY_MODEL ?? "sonar";

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: perplexitySystemPrompt,
        },
        {
          role: "user",
          content: query,
        },
      ],
      search_mode: "web",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Perplexity web_search request failed", {
      status: response.status,
      body: errorText,
    });

    throw new Error("web_search unavailable");
  }

  const payload = (await response.json()) as PerplexityChatResponse;
  const answer = payload.choices?.[0]?.message?.content?.trim();

  if (!answer) {
    throw new Error("web_search missing answer");
  }

  return `${answer}${formatSearchResults(payload.search_results)}`;
}

function buildDifyQuery(query: string, webSearchResult: string | null) {
  if (!webSearchResult) {
    return query;
  }

  return [
    query,
    "",
    "Use the following web_search tool result as current external context. Cite or name sources when relevant, and do not treat unsupported claims as facts.",
    "<web_search_result>",
    webSearchResult,
    "</web_search_result>",
  ].join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.DIFY_API_KEY;
  const baseUrl = process.env.DIFY_API_BASE_URL ?? "https://api.dify.ai/v1";

  const parsedBody = requestSchema.safeParse(await request.json().catch(() => null));

  if (!parsedBody.success) {
    return Response.json({ error: "Invalid chat request." }, { status: 400 });
  }

  const { query, conversationId, toolMode = "chat", tools, userId } = parsedBody.data;
  const webSearchApiKey = tools?.webSearch?.enabled ? tools.webSearch.apiKey : null;

  if (toolMode === "web_search") {
    if (!webSearchApiKey) {
      return Response.json({ error: "Perplexity API key is required for web_search." }, { status: 400 });
    }

    try {
      return Response.json({
        answer: await runPerplexityWebSearch(query, webSearchApiKey),
        conversationId: conversationId ?? null,
      });
    } catch {
      return Response.json({ error: "web_search is unavailable." }, { status: 502 });
    }
  }

  if (!apiKey) {
    return Response.json({ error: "Dify API key is not configured." }, { status: 500 });
  }

  let webSearchResult: string | null = null;

  if (webSearchApiKey) {
    try {
      webSearchResult = await runPerplexityWebSearch(query, webSearchApiKey);
    } catch {
      return Response.json({ error: "web_search is unavailable." }, { status: 502 });
    }
  }

  const difyResponse = await fetch(`${baseUrl.replace(/\/$/, "")}/chat-messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query: buildDifyQuery(query, webSearchResult),
      inputs: {},
      user: userId,
      response_mode: "blocking",
      conversation_id: conversationId ?? "",
    }),
    cache: "no-store",
  });

  if (!difyResponse.ok) {
    const errorText = await difyResponse.text();
    console.error("Dify chat request failed", {
      status: difyResponse.status,
      body: errorText,
    });

    return Response.json({ error: "Adam chat is unavailable." }, { status: 502 });
  }

  const payload = (await difyResponse.json()) as DifyChatResponse;

  if (!payload.answer) {
    return Response.json({ error: "Dify response was missing an answer." }, { status: 502 });
  }

  return Response.json({
    answer: normalizeDifyAnswer(payload.answer),
    conversationId: payload.conversation_id ?? null,
  });
}
