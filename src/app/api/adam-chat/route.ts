import { z } from "zod";

const requestSchema = z.object({
  query: z.string().trim().min(1).max(4000),
  conversationId: z.string().trim().uuid().nullable().optional(),
  userId: z.string().trim().min(1).max(200),
});

type DifyChatResponse = {
  answer?: string;
  conversation_id?: string;
};

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

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

export async function POST(request: Request) {
  const apiKey = process.env.DIFY_API_KEY;
  const baseUrl = process.env.DIFY_API_BASE_URL ?? "https://api.dify.ai/v1";

  if (!apiKey) {
    return Response.json({ error: "Dify API key is not configured." }, { status: 500 });
  }

  const parsedBody = requestSchema.safeParse(await request.json().catch(() => null));

  if (!parsedBody.success) {
    return Response.json({ error: "Invalid chat request." }, { status: 400 });
  }

  const { query, conversationId, userId } = parsedBody.data;

  const difyResponse = await fetch(`${baseUrl.replace(/\/$/, "")}/chat-messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query,
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
