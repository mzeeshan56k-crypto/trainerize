"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, GripVertical } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { kanbanColumns, type KanbanColumn, type KanbanCard } from "@/lib/platform";
import { getClient } from "@/lib/data";
import { useLocalState } from "@/lib/useLocalState";
import { cn } from "@/lib/utils";

const tagStyles: Record<string, string> = {
  New: "bg-brand-50 text-brand-700",
  Program: "bg-purple-50 text-purple-700",
  Video: "bg-accent-50 text-accent-700",
  Nutrition: "bg-amber-50 text-amber-700",
  Schedule: "bg-indigo-50 text-indigo-700",
  Review: "bg-ink-100 text-ink-700",
};

let cardCounter = 0;
function newCardId() {
  cardCounter += 1;
  return `kx-${Date.now()}-${cardCounter}`;
}

export default function KanbanPage() {
  const [columns, setColumns, hydrated] = useLocalState<KanbanColumn[]>("ffkc-kanban", kanbanColumns);
  const [adding, setAdding] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  function moveCard(colId: string, cardId: string, dir: -1 | 1) {
    setColumns((prev) => {
      const idx = prev.findIndex((c) => c.id === colId);
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const card = prev[idx].cards.find((c) => c.id === cardId);
      if (!card) return prev;
      return prev.map((col, i) => {
        if (i === idx) return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        if (i === target) return { ...col, cards: [...col.cards, card] };
        return col;
      });
    });
  }

  function addCard(colId: string) {
    const title = draft.trim();
    if (!title) {
      setAdding(null);
      return;
    }
    const card: KanbanCard = { id: newCardId(), title, tag: "New", due: "Today" };
    setColumns((prev) => prev.map((col) => (col.id === colId ? { ...col, cards: [...col.cards, card] } : col)));
    setDraft("");
    setAdding(null);
  }

  return (
    <>
      <PageHeader
        title="Operations workflow"
        subtitle="Track onboarding, form checks and support across your pipeline"
      />

      <div className="scroll-thin -mx-1 flex gap-5 overflow-x-auto px-1 pb-4">
        {columns.map((col, colIdx) => (
          <div
            key={col.id}
            className="flex w-80 shrink-0 flex-col rounded-2xl border border-ink-100 bg-ink-50/60"
          >
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-ink-900">{col.title}</h2>
                <span className="badge bg-white text-ink-500 shadow-soft">{col.cards.length}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAdding(adding === col.id ? null : col.id);
                  setDraft("");
                }}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 transition hover:bg-white hover:text-brand-600"
                aria-label="Add card"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="scroll-thin flex-1 space-y-3 overflow-y-auto px-3 pb-3">
              {adding === col.id && (
                <div className="rounded-xl border border-brand-200 bg-white p-3 shadow-soft">
                  <input
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addCard(col.id);
                      if (e.key === "Escape") setAdding(null);
                    }}
                    placeholder="Card title…"
                    className="input"
                  />
                  <div className="mt-2 flex gap-2">
                    <button type="button" onClick={() => addCard(col.id)} className="btn-primary px-3 py-1.5 text-xs">
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdding(null)}
                      className="btn-ghost px-3 py-1.5 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {col.cards.map((card) => {
                const client = card.clientId ? getClient(card.clientId) : undefined;
                return (
                  <div
                    key={card.id}
                    className="group rounded-xl border border-ink-100 bg-white p-3.5 shadow-soft transition hover:border-brand-200 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
                      <p className="flex-1 text-sm font-medium leading-snug text-ink-900">{card.title}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn("badge", tagStyles[card.tag] ?? "bg-ink-100 text-ink-700")}>
                          {card.tag}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-ink-400">
                          <Clock className="h-3 w-3" /> {card.due}
                        </span>
                      </div>
                      {client && <Avatar initials={client.avatar} size="sm" />}
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-2.5 opacity-0 transition group-hover:opacity-100">
                      <button
                        type="button"
                        disabled={colIdx === 0}
                        onClick={() => moveCard(col.id, card.id, -1)}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-ink-500 transition hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" /> Move
                      </button>
                      <button
                        type="button"
                        disabled={colIdx === columns.length - 1}
                        onClick={() => moveCard(col.id, card.id, 1)}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-ink-500 transition hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Move <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {hydrated && col.cards.length === 0 && adding !== col.id && (
                <button
                  type="button"
                  onClick={() => {
                    setAdding(col.id);
                    setDraft("");
                  }}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink-200 py-6 text-xs font-medium text-ink-400 transition hover:border-brand-300 hover:text-brand-600"
                >
                  <Plus className="h-3.5 w-3.5" /> Add card
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
