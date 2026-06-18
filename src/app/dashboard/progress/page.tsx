"use client";

import {
  TrendingDown, Dumbbell, Activity, Flame, Camera, LineChart,
  Footprints, Droplet, Moon, Utensils, Users, Target,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { WeightChart, StrengthChart } from "@/components/dashboard/Charts";
import { EmptyState } from "@/components/ui/Modal";
import { DataControls } from "@/components/dashboard/DataControls";
import { weightTrend, strengthTrend, habits } from "@/lib/data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const habitIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  footprints: Footprints,
  droplet: Droplet,
  moon: Moon,
  utensils: Utensils,
};

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const photoTiles = [
  { label: "Week 1", gradient: "from-brand-400 to-brand-600" },
  { label: "Week 4", gradient: "from-accent-400 to-accent-600" },
  { label: "Week 8", gradient: "from-amber-400 to-rose-500" },
  { label: "Week 12", gradient: "from-brand-500 to-accent-500" },
];

export default function ProgressPage() {
  const app = useApp();

  if (!app.hydrated) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brand-600" />
      </div>
    );
  }

  const clientCount = app.clients.length;
  const avgAdherence =
    clientCount > 0
      ? Math.round(app.clients.reduce((sum, c) => sum + (c.adherence ?? 0), 0) / clientCount)
      : 0;

  return (
    <>
      <PageHeader
        title="Progress"
        subtitle="Track body stats, strength and habits"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {app.seeded ? (
          <>
            <StatCard label="Total weight lost" value="21 lb" delta="9.8%" icon={TrendingDown} />
            <StatCard label="Strength gain" value="+45%" delta="45%" icon={Dumbbell} />
            <StatCard label="Workouts logged" value="1,284" delta="6.4%" icon={Activity} />
            <StatCard label="Active streak" value="23 days" delta="3 days" icon={Flame} />
          </>
        ) : (
          <>
            <StatCard label="Active clients" value={String(clientCount)} icon={Users} />
            <StatCard label="Avg adherence" value={`${avgAdherence}%`} icon={Target} />
            <StatCard label="Workouts logged" value="0" icon={Activity} />
            <StatCard label="Active streak" value="0 days" icon={Flame} />
          </>
        )}
      </div>

      {app.seeded ? (
        <SeededProgress />
      ) : (
        <div className="mt-6 space-y-6">
          <EmptyState
            icon={LineChart}
            title="No progress data yet"
            description="Charts populate as clients log workouts. Load example data to preview."
          />
          <DataControls variant="card" />
        </div>
      )}
    </>
  );
}

/* ----------- Rich sample visuals — only rendered when seeded ----------- */

function SeededProgress() {
  return (
    <>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-ink-900">Body weight trend</h2>
              <p className="text-sm text-ink-500">Actual vs. target over time</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-ink-500">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> Actual</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-ink-300" /> Target</span>
            </div>
          </div>
          <div className="mt-4">
            <WeightChart data={weightTrend} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-ink-900">Strength progression</h2>
              <p className="text-sm text-ink-500">Top lifts (lb) by month</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-ink-500">
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

      <div className="mt-6 card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-ink-900">Habit tracker</h2>
            <p className="text-sm text-ink-500">Daily consistency this week</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {habits.map((habit) => {
            const Icon = habitIcons[habit.icon] ?? Activity;
            return (
              <div
                key={habit.id}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-ink-100 p-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-ink-900">{habit.name}</div>
                  <div className="flex items-center gap-1 text-xs text-ink-500">
                    <Flame className="h-3.5 w-3.5 text-orange-500" /> {habit.streak} day streak
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {habit.weekly.map((done, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold",
                          done
                            ? "bg-accent-500 text-white"
                            : "border border-ink-200 bg-ink-50 text-ink-300",
                        )}
                      >
                        {dayLabels[i][0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-ink-900">Progress photos</h2>
            <p className="text-sm text-ink-500">Visual transformation timeline</p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photoTiles.map((tile) => (
            <div key={tile.label} className="group">
              <div
                className={cn(
                  "relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br text-white/90",
                  tile.gradient,
                )}
              >
                <Camera className="h-9 w-9 opacity-80 transition group-hover:scale-110" />
                <span className="absolute bottom-3 left-3 badge bg-white/20 text-white backdrop-blur">
                  {tile.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
