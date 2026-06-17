"use client";

import { useState } from "react";
import {
  Plus, Dumbbell, Layers, Library, GripVertical, Clock, Search,
  Play, Users, Pencil, Send,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { programs, workouts, exercises, type Workout } from "@/lib/data";
import { cn } from "@/lib/utils";

type Tab = "programs" | "workouts" | "library";

const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "programs", label: "Programs", icon: Layers },
  { id: "workouts", label: "Workouts", icon: Dumbbell },
  { id: "library", label: "Exercise Library", icon: Library },
];

const exerciseTypes = ["All", "Strength", "Cardio", "Mobility", "Core"] as const;

function difficultyClasses(level: string) {
  switch (level) {
    case "Beginner":
      return "bg-accent-50 text-accent-700";
    case "Intermediate":
      return "bg-brand-50 text-brand-700";
    case "Advanced":
      return "bg-rose-50 text-rose-600";
    default:
      return "bg-ink-100 text-ink-600";
  }
}

export default function TrainingPage() {
  const [tab, setTab] = useState<Tab>("programs");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>(workouts[0]);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof exerciseTypes)[number]>("All");

  const filteredExercises = exercises.filter((e) => {
    const matchesType = typeFilter === "All" || e.type === typeFilter;
    const matchesQuery =
      query.trim() === "" ||
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.muscle.toLowerCase().includes(query.toLowerCase()) ||
      e.equipment.toLowerCase().includes(query.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <>
      <PageHeader
        title="Training"
        subtitle="Build programs, workouts and browse the exercise library"
        action={
          <button className="btn-primary">
            <Plus className="h-4 w-4" />
            Create workout
          </button>
        }
      />

      {/* Tab nav */}
      <div className="mb-6 inline-flex rounded-full border border-ink-100 bg-ink-50 p-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all",
                active
                  ? "bg-white text-ink-900 shadow-soft"
                  : "text-ink-500 hover:text-ink-800",
              )}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Programs tab */}
      {tab === "programs" && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {programs.map((p) => (
            <div key={p.id} className="card overflow-hidden">
              <div className={cn("relative h-28 bg-gradient-to-br p-4 text-white", p.color)}>
                <span className="badge bg-white/20 text-white backdrop-blur-sm">
                  {p.focus}
                </span>
                <Dumbbell className="absolute bottom-3 right-3 h-10 w-10 text-white/25" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-ink-900">{p.name}</h3>
                <p className="mt-1 text-sm text-ink-500">
                  {p.weeks} weeks · {p.workoutsPerWeek}×/wk
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-ink-500">
                  <Users className="h-3.5 w-3.5" />
                  {p.clientsAssigned} clients assigned
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="btn-primary flex-1 px-3 py-2 text-xs">
                    <Send className="h-3.5 w-3.5" />
                    Assign
                  </button>
                  <button className="btn-secondary flex-1 px-3 py-2 text-xs">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Workouts tab — builder */}
      {tab === "workouts" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Workout list */}
          <div className="card p-4 lg:col-span-1">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold text-ink-900">Your workouts</h2>
              <span className="badge bg-ink-100 text-ink-600">{workouts.length}</span>
            </div>
            <div className="space-y-2">
              {workouts.map((w) => {
                const active = selectedWorkout.id === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWorkout(w)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition",
                      active
                        ? "border-brand-300 bg-brand-50/60"
                        : "border-ink-100 hover:border-brand-200 hover:bg-brand-50/30",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        active ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-500",
                      )}
                    >
                      <Dumbbell className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-ink-900">{w.name}</div>
                      <div className="flex items-center gap-2 text-xs text-ink-500">
                        <span>{w.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {w.durationMin}m
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail / builder panel */}
          <div className="card p-6 lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-ink-900">{selectedWorkout.name}</h2>
                  <span className={cn("badge", difficultyClasses(selectedWorkout.difficulty))}>
                    {selectedWorkout.difficulty}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-ink-500">
                  <span>{selectedWorkout.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {selectedWorkout.durationMin} min
                  </span>
                  <span>{selectedWorkout.exercises.length} exercises</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {selectedWorkout.exercises.map((ex, i) => (
                <div key={`${ex.exerciseId}-${i}`} className="rounded-xl border border-ink-100">
                  <div className="flex items-center gap-3 border-b border-ink-100 p-3">
                    <GripVertical className="h-5 w-5 cursor-grab text-ink-300" />
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-700">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-ink-900">{ex.name}</div>
                      <div className="text-xs text-ink-500">{ex.muscle}</div>
                    </div>
                    <span className="badge bg-ink-100 text-ink-600">{ex.sets.length} sets</span>
                  </div>
                  <div className="p-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wide text-ink-400">
                          <th className="pb-2 pl-1 font-medium">Set</th>
                          <th className="pb-2 font-medium">Reps</th>
                          <th className="pb-2 font-medium">Weight</th>
                          <th className="pb-2 font-medium">Rest</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ex.sets.map((s, si) => (
                          <tr key={si} className="border-t border-ink-50">
                            <td className="py-2 pl-1 font-semibold text-ink-700">{si + 1}</td>
                            <td className="py-2 text-ink-700">{s.reps}</td>
                            <td className="py-2 text-ink-700">{s.weight}</td>
                            <td className="py-2 text-ink-500">{s.rest}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              <button className="btn-secondary w-full border-dashed">
                <Plus className="h-4 w-4" />
                Add exercise
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Library tab */}
      {tab === "library" && (
        <div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search exercises…"
                className="input pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {exerciseTypes.map((t) => {
                const active = typeFilter === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
                      active
                        ? "bg-brand-600 text-white"
                        : "border border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:bg-ink-50",
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredExercises.length === 0 ? (
            <div className="card p-12 text-center text-sm text-ink-400">
              No exercises match your search.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredExercises.map((ex) => (
                <div key={ex.id} className="card overflow-hidden">
                  <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition group-hover:bg-white/40">
                      <Play className="h-5 w-5 fill-current" />
                    </span>
                    <span className="absolute right-2 top-2 badge bg-white/20 text-white backdrop-blur-sm">
                      {ex.type}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="truncate text-sm font-semibold text-ink-900">{ex.name}</h3>
                    <p className="mt-0.5 text-xs text-ink-500">
                      {ex.muscle} · {ex.equipment}
                    </p>
                    <span className={cn("badge mt-3", difficultyClasses(ex.level))}>
                      {ex.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
