"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { appointments, getClient, type Appointment } from "@/lib/data";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Fabricated current week (Mon 15 Jun 2026 .. Sun 21 Jun 2026)
const DATES = [15, 16, 17, 18, 19, 20, 21];
const TODAY_INDEX = 2; // Wednesday 17th highlighted

// 07:00 .. 19:00 inclusive
const HOURS = Array.from({ length: 13 }, (_, i) => 7 + i);

type EventType = Appointment["type"];

const TYPE_STYLES: Record<
  EventType,
  { label: string; dot: string; chip: string }
> = {
  session: {
    label: "Session",
    dot: "bg-brand-500",
    chip: "border-brand-200 bg-brand-50 text-brand-800",
  },
  "check-in": {
    label: "Check-in",
    dot: "bg-accent-500",
    chip: "border-accent-200 bg-accent-50 text-accent-800",
  },
  consult: {
    label: "Consult",
    dot: "bg-amber-500",
    chip: "border-amber-200 bg-amber-50 text-amber-800",
  },
  class: {
    label: "Class",
    dot: "bg-purple-500",
    chip: "border-purple-200 bg-purple-50 text-purple-800",
  },
};

function hourOf(time: string) {
  return parseInt(time.slice(0, 2), 10);
}

function EventChip({ appt }: { appt: Appointment }) {
  const client = appt.clientId ? getClient(appt.clientId) : undefined;
  const style = TYPE_STYLES[appt.type];
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-lg border p-2 text-left shadow-sm transition hover:shadow-md",
        style.chip,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-semibold leading-tight">
          {appt.title}
        </div>
        <div className="mt-0.5 flex items-center gap-1 text-[11px] opacity-80">
          <Clock className="h-3 w-3" />
          {appt.start}–{appt.end}
        </div>
      </div>
      {client && <Avatar initials={client.avatar} size="sm" className="ring-1" />}
    </div>
  );
}

export default function CalendarPage() {
  const [weekOffset, setWeekOffset] = useState(0);

  // Sort upcoming by day then start time
  const upcoming = [...appointments].sort(
    (a, b) => a.day - b.day || a.start.localeCompare(b.start),
  );

  return (
    <>
      <PageHeader
        title="Calendar"
        subtitle="Manage sessions, classes and check-ins"
        action={
          <button className="btn-primary">
            <Plus className="h-4 w-4" />
            New event
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Calendar */}
        <div className="card p-4 sm:p-6 lg:col-span-3">
          {/* Week nav + legend */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWeekOffset((w) => w - 1)}
                className="btn-ghost h-9 w-9 !px-0"
                aria-label="Previous week"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold text-ink-900">
                {weekOffset === 0 ? "This week" : `Week ${weekOffset > 0 ? "+" : ""}${weekOffset}`}
                <span className="ml-2 font-normal text-ink-500">Jun 15 – 21, 2026</span>
              </span>
              <button
                onClick={() => setWeekOffset((w) => w + 1)}
                className="btn-ghost h-9 w-9 !px-0"
                aria-label="Next week"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500">
              {(Object.keys(TYPE_STYLES) as EventType[]).map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className={cn("h-2.5 w-2.5 rounded-full", TYPE_STYLES[t].dot)} />
                  {TYPE_STYLES[t].label}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop / tablet grid */}
          <div className="hidden md:block">
            <div className="overflow-x-auto scroll-thin">
              <div className="min-w-[720px]">
                {/* Day header */}
                <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-ink-100">
                  <div />
                  {DAYS.map((d, i) => (
                    <div
                      key={d}
                      className={cn(
                        "px-2 pb-2 text-center",
                        i === TODAY_INDEX && "rounded-t-lg bg-brand-50",
                      )}
                    >
                      <div className="text-xs font-medium text-ink-500">{d}</div>
                      <div
                        className={cn(
                          "mx-auto mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold",
                          i === TODAY_INDEX
                            ? "bg-brand-600 text-white"
                            : "text-ink-900",
                        )}
                      >
                        {DATES[i]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hour rows */}
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-ink-50"
                  >
                    <div className="py-3 pr-2 text-right text-[11px] font-medium text-ink-400">
                      {String(hour).padStart(2, "0")}:00
                    </div>
                    {DAYS.map((_, dayIdx) => {
                      const cellAppts = appointments.filter(
                        (a) => a.day === dayIdx && hourOf(a.start) === hour,
                      );
                      return (
                        <div
                          key={dayIdx}
                          className={cn(
                            "min-h-[56px] space-y-1 border-l border-ink-50 p-1",
                            dayIdx === TODAY_INDEX && "bg-brand-50/40",
                          )}
                        >
                          {cellAppts.map((a) => (
                            <EventChip key={a.id} appt={a} />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: day-agenda list */}
          <div className="space-y-5 md:hidden">
            {DAYS.map((d, dayIdx) => {
              const dayAppts = appointments
                .filter((a) => a.day === dayIdx)
                .sort((a, b) => a.start.localeCompare(b.start));
              if (dayAppts.length === 0) return null;
              return (
                <div key={d}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-ink-900">{d}</span>
                    <span className="text-xs text-ink-400">Jun {DATES[dayIdx]}</span>
                  </div>
                  <div className="space-y-2">
                    {dayAppts.map((a) => (
                      <EventChip key={a.id} appt={a} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming mini-list */}
        <div className="card h-fit p-6">
          <h2 className="font-semibold text-ink-900">Upcoming</h2>
          <p className="mt-1 text-sm text-ink-500">Next on your schedule</p>
          <div className="mt-4 space-y-2">
            {upcoming.map((a) => {
              const client = a.clientId ? getClient(a.clientId) : undefined;
              const style = TYPE_STYLES[a.type];
              return (
                <div
                  key={a.id}
                  className="flex items-center gap-3 rounded-xl border border-ink-100 p-3"
                >
                  <span className={cn("h-9 w-1 rounded-full", style.dot)} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-ink-900">
                      {a.title}
                    </div>
                    <div className="text-xs text-ink-500">
                      {DAYS[a.day]} · {a.start}–{a.end}
                    </div>
                  </div>
                  {client && <Avatar initials={client.avatar} size="sm" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
