"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = {
  role: "adam" | "user";
  text: string;
};

const quickReplies = [
  "Tell me about BitLabs services",
  "How does enterprise deployment work?",
  "I need an AI agent for internal operations",
];

function createAdamReply(input: string) {
  const text = input.toLowerCase();

  if (text.includes("price") || text.includes("cost") || text.includes("budget")) {
    return "I can help scope the project first, then our team can provide a pricing estimate based on your requirements.";
  }

  if (text.includes("deploy") || text.includes("security") || text.includes("cloud")) {
    return "BitLabs designs secure deployment paths with access controls, governance checkpoints, and private infrastructure options.";
  }

  if (text.includes("agent") || text.includes("rag")) {
    return "We build agentic and RAG systems with evaluation-first workflows, retrieval quality controls, and production monitoring.";
  }

  return "I can help with AI agents, LLM and SLM development, secure deployment, and project planning. Share your goal and timeline.";
}

export function AdamChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "adam",
      text: "Hi, I am Adam. Ask me anything about BitLabs services or your AI project.",
    },
  ]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = input.trim();
    if (!next) return;

    const reply = createAdamReply(next);
    setMessages((current) => [...current, { role: "user", text: next }, { role: "adam", text: reply }]);
    setInput("");
  };

  const sendQuickReply = (value: string) => {
    const reply = createAdamReply(value);
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
        Talk to Adam
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/35 p-3 md:items-end md:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Talk to Adam chatbot"
            className="flex h-[74vh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface-strong)] shadow-[0_30px_90px_-35px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-center justify-between border-b border-[color:var(--line)] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[color:var(--ink)]">Talk to Adam</p>
                <p className="text-xs text-[color:var(--muted-ink)]">Agentic RAG assistant</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--muted-ink)] transition-colors hover:bg-[color:var(--accent-soft)]"
                aria-label="Close chat"
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
                {quickReplies.map((reply) => (
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
                  placeholder="Type your question..."
                  className="h-11 w-full rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[color:var(--accent)]"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="h-11 rounded-xl bg-[color:var(--ink)] px-4 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
