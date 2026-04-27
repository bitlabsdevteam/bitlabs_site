"use client";

import { FormEvent, type ReactNode, useEffect, useRef, useState, useTransition } from "react";
import { useLanguage } from "@/components/language-provider";
import { chatContent, type Language } from "@/lib/site-content";

type Message = {
  role: "adam" | "user";
  text: string;
};

type ChatApiResponse = {
  answer: string;
  conversationId: string | null;
};

const CHAT_USER_STORAGE_KEY = "bitlabs-adam-chat-user";
const CHAT_CONVERSATION_STORAGE_KEY = "bitlabs-adam-chat-conversation";

function readOrCreateStorageValue(key: string, fallbackPrefix: string) {
  const existingValue = window.localStorage.getItem(key);
  if (existingValue) {
    return existingValue;
  }

  const nextValue = `${fallbackPrefix}-${crypto.randomUUID()}`;
  window.localStorage.setItem(key, nextValue);
  return nextValue;
}

function getChatErrorMessage(language: Language) {
  return language === "en"
    ? "Adam is temporarily unavailable. Please try again in a moment or use the contact form."
    : "現在Adamチャットを利用できません。しばらくしてから再度お試しいただくか、お問い合わせフォームをご利用ください。";
}

function renderInlineMarkdown(text: string) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);

  return segments
    .filter(Boolean)
    .map((segment, index) =>
      segment.startsWith("**") && segment.endsWith("**") ? (
        <strong key={`${segment}-${index}`} className="font-semibold text-[color:var(--ink)]">
          {segment.slice(2, -2)}
        </strong>
      ) : (
        <span key={`${segment}-${index}`}>{segment}</span>
      ),
    );
}

function normalizeAssistantText(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/([^\n])\s+(#{2,6}\s+)/g, "$1\n\n$2")
    .replace(/(#{2,6}\s+\*\*[^*]+\*\*)(\s+)/g, "$1\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function AdamMessageBody({ text }: { text: string }) {
  const normalizedText = normalizeAssistantText(text);
  const lines = normalizedText.split("\n");
  const content: ReactNode[] = [];
  let paragraphLines: string[] = [];
  let bulletLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) {
      return;
    }

    const paragraph = paragraphLines.join(" ").trim();
    if (paragraph) {
      content.push(
        <p key={`paragraph-${content.length}`} className="text-sm leading-7 text-[color:var(--ink)]">
          {renderInlineMarkdown(paragraph)}
        </p>,
      );
    }

    paragraphLines = [];
  };

  const flushBullets = () => {
    if (bulletLines.length === 0) {
      return;
    }

    content.push(
      <ul key={`list-${content.length}`} className="space-y-2 pl-5 text-sm leading-7 text-[color:var(--ink)]">
        {bulletLines.map((line, index) => (
          <li key={`bullet-${index}`} className="list-disc">
            {renderInlineMarkdown(line)}
          </li>
        ))}
      </ul>,
    );

    bulletLines = [];
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushParagraph();
      flushBullets();
      continue;
    }

    const headingMatch = trimmedLine.match(/^#{2,6}\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushBullets();

      content.push(
        <h4 key={`heading-${content.length}`} className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
          {renderInlineMarkdown(headingMatch[1])}
        </h4>,
      );
      continue;
    }

    const bulletMatch = trimmedLine.match(/^[-*•]\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      bulletLines.push(bulletMatch[1]);
      continue;
    }

    if (bulletLines.length > 0) {
      flushBullets();
    }

    paragraphLines.push(trimmedLine);
  }

  flushParagraph();
  flushBullets();

  return <div className="space-y-4 whitespace-pre-wrap break-words">{content}</div>;
}

function LocalizedAdamChatWidget({
  language,
  launcherLabel,
}: {
  language: Language;
  launcherLabel: string;
}) {
  const copy = chatContent[language];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "adam",
      text: copy.intro,
    },
  ]);
  const [isPending, startTransition] = useTransition();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const userIdRef = useRef<string>("");
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    userIdRef.current = readOrCreateStorageValue(CHAT_USER_STORAGE_KEY, "adam-user");
    setConversationId(window.localStorage.getItem(CHAT_CONVERSATION_STORAGE_KEY));
  }, []);

  useEffect(() => {
    setMessages([
      {
        role: "adam",
        text: copy.intro,
      },
    ]);
    setInput("");
    setErrorMessage(null);
  }, [copy.intro]);

  useEffect(() => {
    if (!viewportRef.current) {
      return;
    }

    viewportRef.current.scrollTo({
      top: viewportRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isPending]);

  const canSend = input.trim().length > 0 && !isPending;

  const sendMessage = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue || !userIdRef.current) {
      return;
    }

    setMessages((current) => [...current, { role: "user", text: trimmedValue }]);
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/adam-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: trimmedValue,
            conversationId,
            userId: userIdRef.current,
          }),
        });

        const payload = (await response.json()) as ChatApiResponse | { error?: string };

        if (!response.ok || !("answer" in payload)) {
          throw new Error("error" in payload ? payload.error : "Unable to complete chat request.");
        }

        if (payload.conversationId) {
          window.localStorage.setItem(CHAT_CONVERSATION_STORAGE_KEY, payload.conversationId);
          setConversationId(payload.conversationId);
        }

        setMessages((current) => [...current, { role: "adam", text: payload.answer }]);
      } catch {
        setErrorMessage(getChatErrorMessage(language));
      }
    });
  };

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = input.trim();
    if (!next) {
      return;
    }

    setInput("");
    sendMessage(next);
  };

  const sendQuickReply = (value: string) => {
    setInput("");
    sendMessage(value);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="button-primary px-6 py-3 text-sm font-medium"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {launcherLabel}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/35 p-3 md:items-end md:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={copy.dialogLabel}
            className="flex h-[74vh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:rgba(12,16,20,0.96)] shadow-[0_30px_90px_-35px_rgba(0,0,0,0.82)]"
          >
            <div className="flex items-center justify-between border-b border-[color:var(--line)] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[color:var(--ink)]">{copy.title}</p>
                {copy.subtitle ? (
                  <p className="text-xs text-[color:var(--muted-ink)]">{copy.subtitle}</p>
                ) : null}
              </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--muted-ink)] transition-colors hover:bg-[color:rgba(208,186,150,0.12)] hover:text-[color:var(--ink)]"
                  aria-label={copy.closeLabel}
                >
                  x
              </button>
            </div>

            <div ref={viewportRef} className="flex-1 space-y-3 overflow-y-auto bg-[color:rgba(8,10,13,0.72)] px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "ml-auto border border-[color:rgba(208,186,150,0.18)] bg-[color:rgba(208,186,150,0.18)] text-[color:var(--ink)]"
                      : "border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.94)] text-[color:var(--ink)]"
                  }`}
                >
                  {message.role === "adam" ? (
                    <AdamMessageBody text={message.text} />
                  ) : (
                    <p className="whitespace-pre-wrap break-words">{message.text}</p>
                  )}
                </div>
              ))}
              {isPending ? (
                <div className="max-w-[88%] rounded-2xl border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.94)] px-4 py-3 text-sm leading-6 text-[color:var(--muted-ink)]">
                  {language === "en" ? "Adam is thinking..." : "Adamが応答を準備しています..."}
                </div>
              ) : null}
            </div>

            <div className="border-t border-[color:var(--line)] px-4 py-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {copy.quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    disabled={isPending}
                    onClick={() => sendQuickReply(reply)}
                    className="rounded-full border border-[color:var(--line)] bg-[color:rgba(18,22,27,0.92)] px-3 py-1.5 text-xs text-[color:var(--muted-ink)] transition-colors hover:border-[color:rgba(208,186,150,0.22)] hover:bg-[color:rgba(208,186,150,0.12)] hover:text-[color:var(--ink)] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              {errorMessage ? (
                <p className="mb-2 text-xs leading-5 text-[color:var(--danger)]">{errorMessage}</p>
              ) : null}
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={copy.inputPlaceholder}
                  className="field-control h-11 w-full rounded-xl px-3 text-sm outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="button-primary h-11 rounded-xl px-4 text-sm font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {isPending ? (language === "en" ? "Sending..." : "送信中...") : copy.sendLabel}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function AdamChatWidget({ launcherLabel }: { launcherLabel: string }) {
  const { language } = useLanguage();

  return <LocalizedAdamChatWidget key={language} language={language} launcherLabel={launcherLabel} />;
}
