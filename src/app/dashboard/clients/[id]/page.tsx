"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, MessageSquare, Pencil, Scale, Target, Flag, Activity,
  Dumbbell, Calendar, Sparkles, Clock, Layers,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { WeightChart, StrengthChart, AdherenceRing } from "@/components/dashboard/Charts";
import {
  getClient, workouts, weightTrend, strengthTrend, type ClientStatus,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const statusBadge: Record<ClientStatus, string> = {
  active: "bg-accent-50 text-accent-700",
  pending: "bg-amber-50 text-amber-700",
  inactive: "bg-ink-100 text-ink-600",
};

const tabs = ["Overview", "Training", "Progress", "Notes"] as const;
type Tab = (typeof tabs)[number];

const priorNotes = [
  {
    author: "Coach Alex",
    time: "Jun 10, 2026 · 2:14 PM",
    text: "Adjusted Wednesday session to emphasize posterior chain. Form on RDLs is looking much cleaner.",
  },
  {
    author: "Coach Alex",
    time: "Jun 3, 2026 · 9:40 AM",
    text: "Great check-in call. Energy and sleep are trending up. Keep protein intake consistent through the weekend.",
  },
];

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = getClient(params.id);
  const [tab, setTab] = useState<Tab>("Overview");

  if (!client) {
    notFound();
  }

  const c = client;
  const sampleWorkouts = workouts.slice(0, 3);
  const joined = new Date(c.joinedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const weightDelta = c.currentWeight - c.startWeight;

  return (
    <>
      <Link
        href="/dashboard/clients"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to clients
      </Link>

      {/* Header card */}
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <Avatar initials={c.avatar} size="lg" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-ink-900">{c.name}</h1>
                <span className={cn("badge", statusBadge[c.status])}>
                  {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-500">{c.email}</p>
              <p className="text-sm text-ink-500">{c.phone}</p>
              {c.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span key={t} className="badge bg-brand-50 text-brand-700">{t}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/messages" className="btn-secondary">
              <MessageSquare className="h-4 w-4" />
              Message
            </Link>
            <button className="btn-primary">
              <Pencil className="h-4 w-4" />
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Quick stat tiles */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Scale} label="Current weight" value={`${c.currentWeight} lb`} hint={`${weightDelta >= 0 ? "+" : ""}${weightDelta} lb vs start`} />
        <StatTile icon={Target} label="Goal weight" value={`${c.goalWeight} lb`} />
        <StatTile icon={Flag} label="Start weight" value={`${c.startWeight} lb`} />
        <StatTile icon={Activity} label="Adherence" value={`${c.adherence}%`} />
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-1 border-b border-ink-100">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors",
              tab === t ? "text-brand-700" : "text-ink-500 hover:text-ink-900",
            )}
          >
            {t}
            {tab === t && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-600" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Overview" && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card p-6 lg:col-span-2">
              <h2 className="font-semibold text-ink-900">Goal progress</h2>
              <p className="text-sm text-ink-500">{c.goal}</p>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-sm text-ink-600">
                  <span>Progress to goal</span>
                  <span className="font-semibold text-ink-900">{c.progress}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoRow icon={Dumbbell} label="Program" value={c.program} />
                <InfoRow icon={Calendar} label="Joined" value={joined} />
              </div>

              <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50/50 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand-600" />
                  <h3 className="font-semibold text-ink-900">AI insights</h3>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-ink-600">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    Adherence is at {c.adherence}% — {c.adherence >= 85 ? "well above target, momentum is strong." : c.adherence >= 60 ? "steady, but a nudge could push it higher." : "below target; consider a re-engagement check-in."}
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    Weight has moved from {c.startWeight} lb to {c.currentWeight} lb, with {Math.abs(c.goalWeight - c.currentWeight)} lb left to the {c.goalWeight} lb goal.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {c.progress}% of the way through &ldquo;{c.goal}&rdquo; on the {c.program} program. Last active {c.lastActive.toLowerCase()}.
                  </li>
                </ul>
              </div>
            </div>

            <div className="card flex flex-col p-6">
              <h2 className="font-semibold text-ink-900">Adherence</h2>
              <p className="text-sm text-ink-500">Workouts completed</p>
              <div className="mt-2 flex flex-1 items-center justify-center">
                <AdherenceRing value={c.adherence} />
              </div>
            </div>
          </div>
        )}

        {tab === "Training" && (
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-brand-600" />
                <h2 className="font-semibold text-ink-900">Assigned program</h2>
              </div>
              <p className="mt-1 text-sm text-ink-500">{c.program}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {sampleWorkouts.map((w) => (
                <div key={w.id} className="card p-5">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-ink-900">{w.name}</h3>
                    <span className="badge bg-brand-50 text-brand-700">{w.category}</span>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-ink-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-ink-400" />
                      {w.durationMin} min
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-ink-400" />
                      {w.difficulty}
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-ink-400" />
                      {w.exercises.length} exercises
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Progress" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card p-6">
              <h2 className="font-semibold text-ink-900">Weight trend</h2>
              <p className="text-sm text-ink-500">Actual vs target (lb)</p>
              <div className="mt-4">
                <WeightChart data={weightTrend} />
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-ink-900">Strength progress</h2>
                  <p className="text-sm text-ink-500">Top lifts (lb)</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-ink-500">
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> Squat</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-accent-400" /> Bench</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Deadlift</span>
                </div>
              </div>
              <div className="mt-4">
                <StrengthChart data={strengthTrend} />
              </div>
            </div>
          </div>
        )}

        {tab === "Notes" && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card p-6 lg:col-span-2">
              <h2 className="font-semibold text-ink-900">Coach notes</h2>
              <p className="text-sm text-ink-500">History of observations for {c.name}</p>
              <div className="mt-4 space-y-3">
                {priorNotes.map((n, i) => (
                  <div key={i} className="rounded-xl border border-ink-100 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink-900">{n.author}</span>
                      <span className="text-xs text-ink-400">{n.time}</span>
                    </div>
                    <p className="mt-2 text-sm text-ink-600">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <label htmlFor="new-note" className="label">Add a note</label>
              <textarea
                id="new-note"
                rows={6}
                placeholder={`Write a note about ${c.name}…`}
                className="input resize-none"
              />
              <button className="btn-primary mt-3 w-full">Save note</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="card p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" />
      </span>
      <div className="mt-4 text-2xl font-bold text-ink-900">{value}</div>
      <div className="mt-1 text-sm text-ink-500">{label}</div>
      {hint && <div className="mt-0.5 text-xs text-ink-400">{hint}</div>}
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ink-100 p-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-50 text-ink-600">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="text-xs text-ink-400">{label}</div>
        <div className="truncate text-sm font-semibold text-ink-900">{value}</div>
      </div>
    </div>
  );
}
