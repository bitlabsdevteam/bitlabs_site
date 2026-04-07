"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { chatContent, type Language } from "@/lib/site-content";

type Message = {
  role: "adam" | "user";
  text: string;
};

function createAdamReply(input: string, language: Language) {
  const text = input.toLowerCase();

  if (
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("budget") ||
    text.includes("料金") ||
    text.includes("費用") ||
    text.includes("予算")
  ) {
    return language === "en"
      ? "We usually start by clarifying scope, constraints, and success criteria, then provide a cost range based on that shape."
      : "まずは要件整理を行い、その内容に応じて概算費用の目安をご案内します。";
  }

  if (
    text.includes("deploy") ||
    text.includes("security") ||
    text.includes("cloud") ||
    text.includes("導入") ||
    text.includes("デプロイ") ||
    text.includes("セキュリティ") ||
    text.includes("クラウド")
  ) {
    return language === "en"
      ? "BitLabs plans secure deployment with access control, governance checkpoints, and private infrastructure options when required."
      : "BitLabsは、アクセス制御、ガバナンス確認、プライベート基盤の選択肢を含む安全な導入設計を行います。";
  }

  if (
    text.includes("agent") ||
    text.includes("rag") ||
    text.includes("workflow") ||
    text.includes("internal") ||
    text.includes("エージェント") ||
    text.includes("検索") ||
    text.includes("社内")
  ) {
    return language === "en"
      ? "We build agentic systems and RAG workflows with evaluation, retrieval controls, and production monitoring built in."
      : "評価を前提としたワークフロー、検索品質の制御、本番監視を組み込んだエージェント型システムとRAGを構築します。";
  }

  return language === "en"
    ? "I can help with AI agents, LLM or SLM development, secure deployment, and project planning. Share your goal and target timeline."
    : "AIエージェント、LLM/SLM開発、セキュアな導入設計、プロジェクト計画についてご案内できます。目的と希望時期を教えてください。";
}

function LocalizedAdamChatWidget({ language }: { language: Language }) {
  const copy = chatContent[language];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "adam",
      text: copy.intro,
    },
  ]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = input.trim();
    if (!next) return;

    const reply = createAdamReply(next, language);
    setMessages((current) => [...current, { role: "user", text: next }, { role: "adam", text: reply }]);
    setInput("");
  };

  const sendQuickReply = (value: string) => {
    const reply = createAdamReply(value, language);
    setMessages((current) => [...current, { role: "user", text: value }, { role: "adam", text: reply }]);
    setInput("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full border border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-6 py-3 text-sm font-medium text-[color:var(--ink)] transition-colors hover:bg-[color:var(--warm)]"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {copy.openLabel}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/35 p-3 md:items-end md:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={copy.dialogLabel}
            className="flex h-[74vh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] shadow-[0_30px_90px_-35px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-center justify-between border-b border-[color:var(--line)] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[color:var(--ink)]">{copy.title}</p>
                <p className="text-xs text-[color:var(--muted-ink)]">{copy.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--muted-ink)] transition-colors hover:bg-[color:var(--accent-soft)]"
                aria-label={copy.closeLabel}
              >
                x
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-[color:var(--surface)]/45 px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "ml-auto bg-[color:var(--ink)] text-white"
                      : "border border-[color:var(--line)] bg-[color:var(--surface-strong)] text-[color:var(--ink)]"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="border-t border-[color:var(--line)] px-4 py-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {copy.quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => sendQuickReply(reply)}
                    className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-1.5 text-xs text-[color:var(--muted-ink)] transition-colors hover:bg-[color:var(--accent-soft)]"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={copy.inputPlaceholder}
                  className="h-11 w-full rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[color:var(--accent)]"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="h-11 rounded-xl bg-[color:var(--ink)] px-4 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {copy.sendLabel}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function AdamChatWidget() {
  const { language } = useLanguage();

  return <LocalizedAdamChatWidget key={language} language={language} />;
}
