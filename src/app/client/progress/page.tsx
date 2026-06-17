"use client";

import { useState } from "react";
import {
  TrendingDown, Target, Scale, Flame, Plus, Camera, Award,
  Dumbbell, CheckCircle2, ArrowDown, ArrowUp,
} from "lucide-react";
import { getCurrentClient } from "@/lib/session";
import { weightTrend, strengthTrend } from "@/lib/data";
import { WeightChart, StrengthChart } from "@/components/dashboard/Charts";
import { cn } from "@/lib/utils";

interface CheckIn {
  weight: number;
  date: string;
}

const measurements = [
  { name: "Chest", value: 40.5, unit: "in", change: -0.5 },
  { name: "Waist", value: 32.0, unit: "in", change: -1.5 },
  { name: "Hips", value: 38.0, unit: "in", change: -0.8 },
  { name: "Arms", value: 14.2, unit: "in", change: 0.4 },
  { name: "Thighs", value: 22.5, unit: "in", change: -0.6 },
];

const photoWeeks = ["Week 1", "Week 4", "Week 8", "Week 12"];

const achievements = [
  { label: "First workout", icon: Dumbbell },
  { label: "10 workouts", icon: CheckCircle2 },
  { label: "5 lb down", icon: TrendingDown },
  { label: "30-day streak", icon: Flame },
];

export default function ClientProgressPage() {
  const c = getCurrentClient();
  const lost = c.startWeight - c.currentWeight;
  const toGoal = Math.abs(c.currentWeight - c.goalWeight);

  const [checkIns, setCheckIns] = useState<CheckIn[]>([
    { weight: c.currentWeight, date: "Jun 16" },
    { weight: c.currentWeight + 1, date: "Jun 9" },
    { weight: c.currentWeight + 2, date: "Jun 2" },
  ]);
  const [entry, setEntry] = useState("");

  const addCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(entry);
    if (Number.isNaN(value) || value <= 0) return;
    const date = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    setCheckIns((prev) => [{ weight: value, date }, ...prev]);
    setEntry("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 p-6 text-white shadow-glow">
        <p className="text-sm text-brand-100">Your journey</p>
        <h1 className="text-2xl font-bold">Progress</h1>
        <p className="mt-1 text-sm text-brand-100">
          {c.program} · {c.goal}
        </p>
      </section>

      {/* Quick stat tiles */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={Scale} label="Current" value={`${c.currentWeight} lb`} tint="text-brand-600 bg-brand-50" />
        <StatTile icon={TrendingDown} label="Change" value={`${lost >= 0 ? "-" : "+"}${Math.abs(lost)} lb`} tint="text-accent-600 bg-accent-50" />
        <StatTile icon={Target} label="To goal" value={`${toGoal} lb`} tint="text-amber-600 bg-amber-50" />
        <StatTile icon={Flame} label="Streak" value="23 days" tint="text-orange-500 bg-orange-50" />
      </section>

      {/* Log weight */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink-900">Log your weight</h2>
        <form onSubmit={addCheckIn} className="mt-4 flex items-end gap-3">
          <div className="flex-1">
            <label htmlFor="weight" className="label">
              Weight (lb)
            </label>
            <input
              id="weight"
              type="number"
              inputMode="decimal"
              step="0.1"
              min="0"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="138.0"
              className="input"
            />
          </div>
          <button type="submit" className="btn-primary">
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>
        <div className="mt-5">
          <div className="text-xs uppercase tracking-wide text-ink-400">
            Recent check-ins
          </div>
          <ul className="mt-2 space-y-2">
            {checkIns.map((ci, i) => (
              <li
                key={`${ci.date}-${i}`}
                className="flex items-center justify-between rounded-xl border border-ink-100 p-3"
              >
                <span className="text-sm text-ink-500">{ci.date}</span>
                <span className="text-sm font-semibold text-ink-900">
                  {ci.weight} lb
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Body weight chart */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink-900">Body weight</h2>
        <div className="mt-2">
          <WeightChart data={weightTrend} />
        </div>
      </section>

      {/* Strength chart */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink-900">Strength</h2>
        <div className="mt-3 flex flex-wrap gap-4 text-xs">
          <LegendDot colorClass="bg-brand-500" label="Squat" />
          <LegendDot colorClass="bg-accent-500" label="Bench" />
          <LegendDot colorClass="bg-amber-500" label="Deadlift" />
        </div>
        <div className="mt-2">
          <StrengthChart data={strengthTrend} />
        </div>
      </section>

      {/* Measurements */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink-900">Measurements</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {measurements.map((m) => {
            const down = m.change < 0;
            return (
              <div
                key={m.name}
                className="rounded-xl border border-ink-100 p-3"
              >
                <div className="text-xs text-ink-400">{m.name}</div>
                <div className="mt-1 text-lg font-bold text-ink-900">
                  {m.value}
                  <span className="text-xs font-normal text-ink-400"> {m.unit}</span>
                </div>
                <div
                  className={cn(
                    "mt-1 flex items-center gap-0.5 text-xs font-medium",
                    down ? "text-accent-600" : "text-amber-600"
                  )}
                >
                  {down ? (
                    <ArrowDown className="h-3 w-3" />
                  ) : (
                    <ArrowUp className="h-3 w-3" />
                  )}
                  {Math.abs(m.change)} {m.unit}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Progress photos */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink-900">Progress photos</h2>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scroll-thin">
          {photoWeeks.map((week, i) => (
            <div
              key={week}
              className="flex h-36 w-28 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 via-brand-600 to-ink-800 text-white"
            >
              <Camera className="h-6 w-6 opacity-80" />
              <span className="mt-2 text-xs font-medium">{week}</span>
            </div>
          ))}
          <button
            type="button"
            className="flex h-36 w-28 shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink-200 text-ink-400 transition hover:border-brand-300 hover:text-brand-500"
          >
            <Plus className="h-6 w-6" />
            <span className="mt-2 text-xs font-medium">Add photo</span>
          </button>
        </div>
      </section>

      {/* Achievements */}
      <section className="card p-5">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          <h2 className="font-semibold text-ink-900">Achievements</h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {achievements.map((a) => {
            const Icon = a.icon;
            return (
              <span
                key={a.label}
                className="badge border border-amber-100 bg-amber-50 text-amber-700"
              >
                <Icon className="h-3.5 w-3.5" />
                {a.label}
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StatTile({
  icon: Icon, label, value, tint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tint: string;
}) {
  const [text, bg] = tint.split(" ");
  return (
    <div className="card p-4 text-center">
      <span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-lg ${bg} ${text}`}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="mt-2 text-base font-bold text-ink-900">{value}</div>
      <div className="text-[11px] text-ink-400">{label}</div>
    </div>
  );
}

function LegendDot({ colorClass, label }: { colorClass: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-ink-500">
      <span className={cn("h-2.5 w-2.5 rounded-full", colorClass)} />
      {label}
    </span>
  );
}
