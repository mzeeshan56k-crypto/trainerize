"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { conversations, type Message } from "@/lib/data";
import { CURRENT_CLIENT_ID } from "@/lib/session";
import { cn } from "@/lib/utils";

const coachReplies = [
  "Love to hear it — keep that momentum going! 💪",
  "Great question. Let's review it at your next check-in, but you're on the right track.",
  "Proud of your consistency. Rest up and hydrate today!",
  "Awesome update. I'll tweak next week's plan to keep pushing you forward.",
];

export default function ClientMessagesPage() {
  const conversation =
    conversations.find((c) => c.clientId === CURRENT_CLIENT_ID) ?? conversations[0];

  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const memberMessage: Message = {
      id: `m-${Date.now()}`,
      fromClient: true,
      text,
      time: "Now",
    };
    setMessages((prev) => [...prev, memberMessage]);
    setDraft("");

    const reply = coachReplies[Math.floor(Math.random() * coachReplies.length)];
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          fromClient: false,
          text: reply,
          time: "Now",
        },
      ]);
    }, 1000);
  }

  return (
    <div className="space-y-4">
      {/* Coach header */}
      <section className="card flex items-center gap-4 p-4">
        <div className="relative">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-glow">
            AC
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-accent-500" />
        </div>
        <div className="flex-1">
          <h1 className="font-semibold text-ink-900">Coach Alex</h1>
          <p className="text-xs text-ink-500">
            Head Trainer · Usually replies in a few hours
          </p>
        </div>
      </section>

      {/* Message thread */}
      <section className="card flex h-[calc(100vh-16rem)] flex-col overflow-hidden">
        <div className="scroll-thin flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m) =>
            m.fromClient ? (
              // Member (you) — right aligned, brand bubble
              <div key={m.id} className="flex flex-col items-end">
                <div className="max-w-[78%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-sm text-white shadow-soft">
                  {m.text}
                </div>
                <span className="mt-1 pr-1 text-[11px] text-ink-400">{m.time}</span>
              </div>
            ) : (
              // Coach — left aligned, white/gray bubble with avatar
              <div key={m.id} className="flex items-end gap-2">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[10px] font-bold text-white">
                  AC
                </span>
                <div className="flex flex-col items-start">
                  <div className="max-w-[78%] rounded-2xl rounded-bl-md border border-ink-100 bg-ink-50 px-4 py-2.5 text-sm text-ink-900">
                    {m.text}
                  </div>
                  <span className="mt-1 pl-1 text-[11px] text-ink-400">{m.time}</span>
                </div>
              </div>
            )
          )}
          <div ref={endRef} />
        </div>

        {/* Composer */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-ink-100 bg-white p-3"
        >
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Message Coach Alex…"
            className="input flex-1"
            aria-label="Message"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className={cn("btn-primary px-4")}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </section>
    </div>
  );
}
