import Link from "next/link";
import {
  Dumbbell, Flame, Target, TrendingDown, ChevronRight, CheckCircle2,
  Calendar, Apple, Droplet, Moon, Footprints,
} from "lucide-react";
import { getCurrentClient } from "@/lib/session";
import { workouts, habits, appointments } from "@/lib/data";

const habitIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  footprints: Footprints, droplet: Droplet, moon: Moon, utensils: Apple,
};

export default function ClientTodayPage() {
  const c = getCurrentClient();
  const todaysWorkout = workouts[0];
  const lost = c.startWeight - c.currentWeight;
  const toGoal = Math.abs(c.currentWeight - c.goalWeight);
  const nextSession = appointments.find((a) => a.clientId === c.id);

  return (
    <div className="space-y-6">
      {/* Greeting + workout hero */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 p-6 text-white shadow-glow">
        <p className="text-sm text-brand-100">Good morning</p>
        <h1 className="text-2xl font-bold">{c.name.split(" ")[0]} 👋</h1>
        <Link
          href={`/client/workouts/${todaysWorkout.id}`}
          className="mt-5 flex items-center gap-4 rounded-2xl bg-white/15 p-4 backdrop-blur transition hover:bg-white/20"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <Dumbbell className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-brand-100">
              Today&apos;s workout
            </div>
            <div className="font-semibold">{todaysWorkout.name}</div>
            <div className="text-xs text-brand-100">
              {todaysWorkout.exercises.length} exercises · {todaysWorkout.durationMin} min
            </div>
          </div>
          <ChevronRight className="h-5 w-5" />
        </Link>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-3 gap-3">
        <StatTile icon={Flame} label="Streak" value="23 days" tint="text-orange-500 bg-orange-50" />
        <StatTile icon={TrendingDown} label="Weight lost" value={`${lost} lb`} tint="text-accent-600 bg-accent-50" />
        <StatTile icon={Target} label="To goal" value={`${toGoal} lb`} tint="text-brand-600 bg-brand-50" />
      </section>

      {/* Goal progress */}
      <section className="card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-ink-900">{c.goal}</h2>
            <p className="text-sm text-ink-500">{c.program}</p>
          </div>
          <span className="text-2xl font-bold text-brand-600">{c.progress}%</span>
        </div>
        <div className="mt-4 h-2.5 w-full rounded-full bg-ink-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
            style={{ width: `${c.progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-ink-400">
          <span>{c.startWeight} lb start</span>
          <span>{c.currentWeight} lb now</span>
          <span>{c.goalWeight} lb goal</span>
        </div>
      </section>

      {/* Habits */}
      <section className="card p-5">
        <h2 className="font-semibold text-ink-900">Today&apos;s habits</h2>
        <div className="mt-4 space-y-2">
          {habits.map((h) => {
            const Icon = habitIcons[h.icon] ?? CheckCircle2;
            const doneToday = h.weekly[h.weekly.length - 1];
            return (
              <div
                key={h.id}
                className="flex items-center gap-3 rounded-xl border border-ink-100 p-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-ink-900">{h.name}</div>
                  <div className="flex items-center gap-1 text-xs text-ink-400">
                    <Flame className="h-3 w-3 text-orange-400" /> {h.streak} day streak
                  </div>
                </div>
                <CheckCircle2
                  className={doneToday ? "h-6 w-6 text-accent-500" : "h-6 w-6 text-ink-200"}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Next session */}
      {nextSession && (
        <section className="card flex items-center gap-4 p-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
            <Calendar className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-ink-400">Next session</div>
            <div className="font-semibold text-ink-900">{nextSession.title}</div>
            <div className="text-sm text-ink-500">
              {nextSession.start} – {nextSession.end} with Coach Alex
            </div>
          </div>
        </section>
      )}
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
