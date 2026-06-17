"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft, Clock, Flame, Check, CheckCircle2, Dumbbell, PartyPopper,
} from "lucide-react";
import { workouts } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Page({ params }: { params: { id: string } }) {
  const workout = workouts.find((w) => w.id === params.id);
  if (!workout) notFound();
  const w = workout;

  const [done, setDone] = useState<Set<string>>(new Set());

  const totalSets = useMemo(
    () => w.exercises.reduce((acc, ex) => acc + ex.sets.length, 0),
    [w],
  );

  const toggle = (key: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const completedSets = done.size;
  const pct = totalSets === 0 ? 0 : Math.round((completedSets / totalSets) * 100);
  const allDone = completedSets === totalSets && totalSets > 0;

  const completedExercises = w.exercises.filter((ex, exIdx) =>
    ex.sets.every((_, setIdx) => done.has(`${exIdx}-${setIdx}`)),
  ).length;

  return (
    <div className="space-y-5">
      {/* Back link */}
      <Link
        href="/client/workouts"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-500 transition hover:text-ink-900"
      >
        <ChevronLeft className="h-4 w-4" /> All workouts
      </Link>

      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-ink-900 p-6 text-white shadow-glow">
        <span className="badge bg-white/15 text-white">{w.category}</span>
        <h1 className="mt-2 text-2xl font-bold">{w.name}</h1>
        <div className="mt-1 flex items-center gap-3 text-sm text-brand-100">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {w.durationMin} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-4 w-4" /> {w.difficulty}
          </span>
        </div>

        {/* Progress indicator */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-brand-100">
            <span>{completedExercises} of {w.exercises.length} exercises done</span>
            <span>{pct}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-500 transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </section>

      {/* Exercises */}
      <section className="space-y-4 pb-4">
        {w.exercises.map((ex, exIdx) => {
          const exDone = ex.sets.every((_, setIdx) => done.has(`${exIdx}-${setIdx}`));
          return (
            <div
              key={`${ex.exerciseId}-${exIdx}`}
              className={cn(
                "card overflow-hidden p-5 transition",
                exDone && "border-accent-200 bg-accent-50/40 ring-1 ring-accent-100",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-ink-400">
                      {String(exIdx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-semibold text-ink-900">{ex.name}</h2>
                  </div>
                  <span className="badge mt-1.5 bg-brand-50 text-brand-700">
                    {ex.muscle}
                  </span>
                </div>
                {exDone && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-accent-600">
                    <CheckCircle2 className="h-5 w-5" /> Done
                  </span>
                )}
              </div>

              {ex.notes && (
                <p className="mt-3 rounded-lg bg-ink-50 px-3 py-2 text-xs text-ink-500">
                  {ex.notes}
                </p>
              )}

              {/* Sets */}
              <div className="mt-4 space-y-2">
                {/* Column headers */}
                <div className="grid grid-cols-[2.5rem_1fr_1fr_1fr_2.5rem] items-center gap-2 px-1 text-[11px] font-medium uppercase tracking-wide text-ink-400">
                  <span>Set</span>
                  <span>Reps</span>
                  <span>Weight</span>
                  <span>Rest</span>
                  <span className="text-right">Log</span>
                </div>
                {ex.sets.map((s, setIdx) => {
                  const key = `${exIdx}-${setIdx}`;
                  const checked = done.has(key);
                  return (
                    <div
                      key={key}
                      className={cn(
                        "grid grid-cols-[2.5rem_1fr_1fr_1fr_2.5rem] items-center gap-2 rounded-xl border p-3 text-sm transition",
                        checked
                          ? "border-accent-200 bg-accent-50"
                          : "border-ink-100 bg-white",
                      )}
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-100 text-xs font-bold text-ink-600">
                        {setIdx + 1}
                      </span>
                      <span className="font-semibold text-ink-900">{s.reps}</span>
                      <span className="text-ink-600">{s.weight}</span>
                      <span className="text-ink-400">{s.rest}</span>
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        aria-pressed={checked}
                        aria-label={`Mark set ${setIdx + 1} ${checked ? "incomplete" : "complete"}`}
                        className={cn(
                          "ml-auto flex h-8 w-8 items-center justify-center rounded-full border-2 transition active:scale-90",
                          checked
                            ? "border-accent-500 bg-accent-500 text-white"
                            : "border-ink-200 text-transparent hover:border-brand-400",
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Sticky progress / finish bar */}
      <div className="sticky bottom-4 z-20">
        <div
          className={cn(
            "card flex items-center gap-4 p-4 shadow-lg backdrop-blur",
            allDone ? "border-accent-200 bg-accent-50/90" : "bg-white/95",
          )}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-xs text-ink-500">
              <span className="font-medium">
                {completedSets} / {totalSets} sets
              </span>
              <span className="font-semibold text-ink-900">{pct}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            disabled={!allDone}
            className={cn(
              "btn-primary shrink-0 whitespace-nowrap",
              allDone && "bg-accent-500 hover:bg-accent-600",
            )}
          >
            {allDone ? (
              <>
                <PartyPopper className="h-4 w-4" /> Workout complete! 🎉
              </>
            ) : (
              <>
                <Dumbbell className="h-4 w-4" /> Finish workout
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
