"use client";

import { useRef, useState } from "react";
import {
  Sparkles, Send, Dumbbell, ClipboardCheck, Salad,
  AlertTriangle, LineChart,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

const quickActions = [
  {
    id: "program",
    icon: Dumbbell,
    title: "Generate a program",
    desc: "Build a structured training split",
    prompt: "Generate a 3-day workout split for an intermediate client focused on hypertrophy.",
  },
  {
    id: "checkin",
    icon: ClipboardCheck,
    title: "Draft a client check-in",
    desc: "Write a weekly check-in message",
    prompt: "Draft a friendly weekly check-in message for a client who hit all their workouts.",
  },
  {
    id: "meal",
    icon: Salad,
    title: "Suggest meal plan",
    desc: "Create a macro-aligned plan",
    prompt: "Suggest a high-protein meal plan around 1,900 calories for fat loss.",
  },
  {
    id: "atrisk",
    icon: AlertTriangle,
    title: "Find at-risk clients",
    desc: "Surface clients losing momentum",
    prompt: "Which of my clients are at risk of dropping off and why?",
  },
  {
    id: "summary",
    icon: LineChart,
    title: "Summarize client progress",
    desc: "Recap recent results",
    prompt: "Summarize the progress of my client over the last 8 weeks.",
  },
];

function generateReply(input: string): string {
  const text = input.toLowerCase();

  if (text.includes("program") || text.includes("split") || text.includes("workout")) {
    return [
      "Here's a balanced 3-day split you can assign right away:",
      "",
      "Day 1 — Upper Push",
      "• Bench Press — 4 x 6-8",
      "• Overhead Press — 3 x 8-10",
      "• Incline Dumbbell Press — 3 x 10-12",
      "• Tricep Pushdown — 3 x 12-15",
      "",
      "Day 2 — Lower",
      "• Barbell Back Squat — 4 x 5-6",
      "• Romanian Deadlift — 3 x 8-10",
      "• Dumbbell Lunge — 3 x 12 / leg",
      "• Plank — 3 x 45-60s",
      "",
      "Day 3 — Upper Pull",
      "• Deadlift — 3 x 5",
      "• Pull-Up — 4 x AMRAP",
      "• Lat Pulldown — 3 x 10-12",
      "• Bicep Curl — 3 x 12-15",
      "",
      "Progress the top sets by ~2.5-5 lb each week. Want me to tailor it to a specific client or goal?",
    ].join("\n");
  }

  if (text.includes("meal") || text.includes("nutrition") || text.includes("diet")) {
    return [
      "Here's a high-protein day at ~1,900 kcal (180g protein):",
      "",
      "• Breakfast — Egg white omelette, oats & berries (430 kcal)",
      "• Lunch — Grilled chicken, quinoa, mixed greens (560 kcal)",
      "• Snack — Greek yogurt + almonds (280 kcal)",
      "• Dinner — Baked salmon, sweet potato, broccoli (580 kcal)",
      "",
      "This keeps protein high to preserve muscle in a deficit. I can swap meals for dietary preferences if you let me know any restrictions.",
    ].join("\n");
  }

  if (text.includes("at risk") || text.includes("at-risk") || text.includes("drop")) {
    return [
      "Scanning adherence and last-active signals, two clients stand out:",
      "",
      "• Noah Kim — 41% adherence, last active 3 weeks ago. Momentum has stalled since onboarding.",
      "• Liam Patel — pending status, hasn't started yet (joined 3 days ago).",
      "",
      "I'd recommend a quick personal check-in with Noah and a welcome nudge for Liam. Want me to draft those messages?",
    ].join("\n");
  }

  if (text.includes("check-in") || text.includes("checkin") || text.includes("message")) {
    return [
      "Here's a warm weekly check-in you can send:",
      "",
      "\"Hey! Incredible week — you hit every session and your consistency is really showing. How are you feeling in the gym and with recovery? If you're up for it, we can nudge the working weights slightly next week. Proud of you 💪\"",
      "",
      "Want a version for a client who missed a few sessions instead?",
    ].join("\n");
  }

  if (text.includes("progress") || text.includes("summar")) {
    return [
      "Here's an 8-week progress recap:",
      "",
      "• Body weight: 214 → 193 lb (down 21 lb, tracking ahead of target)",
      "• Strength: squat +70 lb, bench +45 lb, deadlift +110 lb since January",
      "• Adherence: 88% of programmed workouts completed",
      "",
      "Trajectory is excellent. Consider introducing a deload week soon to consolidate gains. Want me to draft a congratulatory note for the client?",
    ].join("\n");
  }

  return [
    "Great question. As your coaching assistant I can help with programming, nutrition, client communication, and spotting clients who need attention.",
    "",
    "Tell me a bit more — the client's goal, experience level, or what you'd like to accomplish — and I'll give you something you can use right away.",
  ].join("\n");
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `m${idCounter}`;
}

export default function AiCoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      role: "assistant",
      text: "Hi Alex 👋 I'm your AI coaching assistant. I can generate programs, draft client messages, suggest meal plans, and flag clients who need attention. What would you like to work on?",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function send(raw?: string) {
    const value = (raw ?? input).trim();
    if (!value) return;

    const userMsg: ChatMessage = { id: nextId(), role: "user", text: value };
    const assistantMsg: ChatMessage = {
      id: nextId(),
      role: "assistant",
      text: generateReply(value),
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  }

  function handleQuickAction(prompt: string) {
    setInput(prompt);
    inputRef.current?.focus();
  }

  return (
    <>
      <PageHeader
        title="AI Coach"
        subtitle="Your intelligent training assistant"
      />

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 p-6 text-white shadow-soft sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Sparkles className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-xl font-bold">Meet your AI coaching copilot</h2>
            <p className="mt-1 max-w-2xl text-sm text-white/85">
              Generate periodized programs, draft personalized client check-ins, build
              macro-aligned meal plans, and surface at-risk clients before they churn —
              all in seconds, so you can spend more time coaching.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => handleQuickAction(action.prompt)}
            className="card group p-5 text-left transition hover:border-brand-200 hover:shadow-lg"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-100">
              <action.icon className="h-5 w-5" />
            </span>
            <div className="mt-3 font-semibold text-ink-900">{action.title}</div>
            <div className="mt-0.5 text-sm text-ink-500">{action.desc}</div>
          </button>
        ))}
      </div>

      <div className="mt-6 card flex h-[560px] flex-col overflow-hidden">
        <div className="flex items-center gap-2 border-b border-ink-100 px-5 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-semibold text-ink-900">AI Coach</div>
            <div className="text-xs text-accent-600">Online · ready to help</div>
          </div>
        </div>

        <div className="scroll-thin flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-2.5",
                msg.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {msg.role === "assistant" && (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                  <Sparkles className="h-4 w-4" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-[78%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm",
                  msg.role === "user"
                    ? "rounded-br-md bg-brand-600 text-white"
                    : "rounded-bl-md bg-ink-50 text-ink-800",
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-3 border-t border-ink-100 p-4"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI coach anything…"
            className="input flex-1"
          />
          <button type="submit" className="btn-primary" disabled={!input.trim()}>
            <Send className="h-4 w-4" /> Send
          </button>
        </form>
      </div>
    </>
  );
}
