"use client";

import { useState } from "react";
import {
  TrendingUp, TrendingDown, Minus, CheckCircle2, AlertTriangle,
  Eye, Sparkles, FileText,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ComplianceBars } from "@/components/dashboard/Charts";
import { Avatar } from "@/components/ui/Avatar";
import {
  complianceRates, complianceRows, lightStyles, type Light, type ComplianceRow,
} from "@/lib/platform";
import { getClient } from "@/lib/data";
import { cn } from "@/lib/utils";

type Filter = "all" | "red" | "yellow" | "green";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "red", label: "At risk" },
  { id: "yellow", label: "Watch" },
  { id: "green", label: "On track" },
];

const trendIcon = {
  up: { Icon: TrendingUp, className: "text-accent-600" },
  down: { Icon: TrendingDown, className: "text-rose-500" },
  flat: { Icon: Minus, className: "text-ink-400" },
};

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded-full bg-ink-100">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
      </div>
      <span className="w-9 text-xs font-medium tabular-nums text-ink-600">{value}%</span>
    </div>
  );
}

function generateReview(row: ComplianceRow): string {
  const client = getClient(row.clientId);
  const name = client?.name.split(" ")[0] ?? "This client";
  const trendWord =
    row.trend === "up" ? "trending upward" : row.trend === "down" ? "trending downward" : "holding steady";
  const strongest = Math.max(row.workout, row.diet, row.habits);
  const weakest = Math.min(row.workout, row.diet, row.habits);
  const weakArea =
    weakest === row.workout ? "workout completion" : weakest === row.diet ? "nutrition logging" : "daily habits";
  const strongArea =
    strongest === row.workout ? "training adherence" : strongest === row.diet ? "nutrition" : "habit consistency";

  if (row.light === "red") {
    return `${name} is significantly off-plan and ${trendWord}. Workout completion sits at ${row.workout}%, diet at ${row.diet}% and habits at ${row.habits}%. The biggest gap is ${weakArea} (${weakest}%). Immediate action recommended: ${row.note} Schedule a 1:1 to rebuild momentum before the account churns.`;
  }
  if (row.light === "yellow") {
    return `${name} is mostly on track but worth watching — engagement is ${trendWord}. ${strongArea} is the bright spot (${strongest}%), while ${weakArea} (${weakest}%) is dragging overall results. ${row.note} A light-touch nudge this week should keep things from slipping.`;
  }
  return `${name} is performing strongly and ${trendWord}. Across the board — workout ${row.workout}%, diet ${row.diet}%, habits ${row.habits}% — adherence is excellent, led by ${strongArea} at ${strongest}%. ${row.note} Consider progressing the program to keep them challenged.`;
}

export default function AuditingPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [reviews, setReviews] = useState<Record<string, string>>({});

  const counts = complianceRows.reduce(
    (acc, r) => {
      acc[r.light] += 1;
      return acc;
    },
    { green: 0, yellow: 0, red: 0 } as Record<Light, number>,
  );

  const rows = filter === "all" ? complianceRows : complianceRows.filter((r) => r.light === filter);

  function toggleReview(row: ComplianceRow) {
    setReviews((prev) => {
      const next = { ...prev };
      if (next[row.clientId]) {
        delete next[row.clientId];
      } else {
        next[row.clientId] = generateReview(row);
      }
      return next;
    });
  }

  return (
    <>
      <PageHeader
        title="Performance auditing"
        subtitle="Monitor engagement and flag at-risk accounts"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6">
          <h2 className="font-semibold text-ink-900">Rolling compliance</h2>
          <p className="mb-5 text-sm text-ink-500">Across your active roster</p>
          <ComplianceBars
            workout={complianceRates.workout}
            diet={complianceRates.diet}
            habits={complianceRates.habits}
          />
        </div>
        <StatCard label="On track" value={String(counts.green)} icon={CheckCircle2} />
        <div className="grid gap-6 sm:grid-cols-2 lg:contents">
          <StatCard label="Watch list" value={String(counts.yellow)} icon={Eye} positive={false} />
          <StatCard label="At risk" value={String(counts.red)} icon={AlertTriangle} positive={false} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition",
                active
                  ? "bg-brand-600 text-white shadow-glow"
                  : "border border-ink-200 bg-white text-ink-700 hover:bg-ink-50",
              )}
            >
              {f.label}
              {f.id !== "all" && (
                <span className={cn("ml-1.5 text-xs", active ? "text-white/80" : "text-ink-400")}>
                  {counts[f.id as Light]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        {rows.map((row) => {
          const client = getClient(row.clientId);
          const styles = lightStyles[row.light];
          const Trend = trendIcon[row.trend];
          const open = Boolean(reviews[row.clientId]);
          const isRed = row.light === "red";

          return (
            <div
              key={row.clientId}
              className={cn(
                "card overflow-hidden transition",
                isRed && "border-rose-200 bg-rose-50/40 ring-1 ring-rose-100",
              )}
            >
              <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className={cn("h-3 w-3 shrink-0 rounded-full", styles.dot)} />
                  {client && <Avatar initials={client.avatar} />}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold text-ink-900">{client?.name}</span>
                      <span className={cn("badge", styles.badge)}>{styles.label}</span>
                    </div>
                    <p className="truncate text-xs text-ink-500">{client?.program}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 lg:gap-6">
                  <div>
                    <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-400">Workout</div>
                    <MiniBar value={row.workout} color="bg-brand-500" />
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-400">Diet</div>
                    <MiniBar value={row.diet} color="bg-accent-500" />
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-400">Habits</div>
                    <MiniBar value={row.habits} color="bg-amber-500" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={cn("flex items-center gap-1 text-sm font-medium", Trend.className)}>
                    <Trend.Icon className="h-4 w-4" />
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleReview(row)}
                    className={cn(open ? "btn-secondary" : "btn-primary", "whitespace-nowrap")}
                  >
                    <Sparkles className="h-4 w-4" />
                    {open ? "Hide review" : "Generate progress review"}
                  </button>
                </div>
              </div>

              <p className="border-t border-ink-100 px-5 py-3 text-sm text-ink-600">
                <span className="font-medium text-ink-700">Note:</span> {row.note}
              </p>

              {open && (
                <div className="border-t border-brand-100 bg-brand-50/50 px-5 py-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
                    <FileText className="h-3.5 w-3.5" /> Auto-generated progress review
                  </div>
                  <p className="text-sm leading-relaxed text-ink-700">{reviews[row.clientId]}</p>
                </div>
              )}
            </div>
          );
        })}

        {rows.length === 0 && (
          <p className="card p-10 text-center text-sm text-ink-400">No clients in this segment.</p>
        )}
      </div>
    </>
  );
}
