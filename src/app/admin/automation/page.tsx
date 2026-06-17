"use client";

import {
  Mail, Bell, MessageSquareText, Smartphone, Play, Pause, Plus,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useLocalState } from "@/lib/useLocalState";
import { dripCampaigns, integrations, type DripCampaign } from "@/lib/platform";

const statusBadge: Record<string, string> = {
  active: "bg-accent-50 text-accent-700",
  paused: "bg-amber-50 text-amber-700",
  draft: "bg-ink-100 text-ink-600",
};

const channelIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Email: Mail,
  Push: Bell,
  SMS: Smartphone,
  "In-app": MessageSquareText,
};

export default function AutomationPage() {
  const [drips, setDrips] = useLocalState<DripCampaign[]>("ffkc-drips", dripCampaigns);

  function toggleStatus(id: string) {
    setDrips((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "active" ? "paused" : "active" }
          : d,
      ),
    );
  }

  return (
    <>
      <PageHeader
        title="Automation"
        subtitle="Drip campaigns and the integration canvas that powers the network"
      />

      <div className="space-y-4">
        {drips.map((d) => (
          <div key={d.id} className="card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-ink-900">{d.name}</h3>
                  <span className={`badge capitalize ${statusBadge[d.status]}`}>{d.status}</span>
                </div>
                <p className="mt-1 text-sm text-ink-500">
                  Trigger: {d.trigger} · {d.enrolled.toLocaleString()} enrolled
                </p>
              </div>
              <button
                onClick={() => toggleStatus(d.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                  d.status === "active"
                    ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                    : "bg-accent-50 text-accent-700 hover:bg-accent-100"
                }`}
              >
                {d.status === "active" ? (
                  <>
                    <Pause className="h-3.5 w-3.5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" /> Activate
                  </>
                )}
              </button>
            </div>

            <div className="mt-5 flex items-stretch gap-3 overflow-x-auto scroll-thin pb-1">
              {d.steps.map((s, i) => {
                const Icon = channelIcon[s.channel] ?? Mail;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="min-w-[180px] rounded-xl border border-ink-100 bg-ink-50/50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="badge bg-brand-50 text-brand-700">Day {s.day}</span>
                        <Icon className="h-4 w-4 text-ink-400" />
                      </div>
                      <div className="mt-2 text-sm font-semibold text-ink-900">{s.title}</div>
                      <div className="mt-0.5 text-xs text-ink-500">{s.channel}</div>
                    </div>
                    {i < d.steps.length - 1 && (
                      <div className="h-px w-5 shrink-0 bg-ink-200" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-ink-900">Integration canvas</h2>
            <p className="text-sm text-ink-500">
              GoHighLevel, Trainerize, Zapier and Stripe sync — connect your stack
            </p>
          </div>
          <button className="btn-secondary">
            <Plus className="h-4 w-4" /> Add integration
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((i) => (
            <div key={i.id} className="card p-5">
              <div className="flex items-start gap-3">
                <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${i.color}`} />
                <div className="flex-1">
                  <div className="font-semibold text-ink-900">{i.name}</div>
                  <div className="text-sm text-ink-500">{i.desc}</div>
                </div>
              </div>
              <div className="mt-4">
                {i.status === "connected" ? (
                  <span className="badge bg-accent-50 text-accent-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-500" /> Connected
                  </span>
                ) : (
                  <button className="btn-secondary w-full">Connect</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
