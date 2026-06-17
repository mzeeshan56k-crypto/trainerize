import {
  Users, UserCog, DollarSign, Dumbbell, Star,
  TrendingUp, TrendingDown, Gauge, ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { EnrollmentChart } from "@/components/dashboard/Charts";
import { Avatar } from "@/components/ui/Avatar";
import {
  adminKpis, enrollmentTrend, billingTiers, trainers,
} from "@/lib/platform";
import { formatCurrency } from "@/lib/utils";

const tierBadge: Record<string, string> = {
  Basic: "bg-ink-100 text-ink-700",
  Pro: "bg-brand-50 text-brand-700",
  Elite: "bg-accent-50 text-accent-700",
};

const statusBadge: Record<string, string> = {
  active: "bg-accent-50 text-accent-700",
  trial: "bg-amber-50 text-amber-700",
  suspended: "bg-rose-50 text-rose-600",
};

const insights = [
  { label: "Client retention", value: "94.2%", icon: TrendingUp, tone: "text-accent-600", bg: "bg-accent-50" },
  { label: "Monthly churn", value: "2.8%", icon: TrendingDown, tone: "text-rose-600", bg: "bg-rose-50" },
  { label: "Avg session rating", value: "4.8 / 5", icon: Star, tone: "text-amber-600", bg: "bg-amber-50" },
  { label: "Support SLA met", value: "98.5%", icon: Gauge, tone: "text-brand-600", bg: "bg-brand-50" },
];

export default function AdminOverviewPage() {
  const maxSubs = Math.max(...billingTiers.map((t) => t.subscribers));
  const top = [...trainers].sort((a, b) => b.mrr - a.mrr);

  return (
    <>
      <PageHeader
        title="Platform overview"
        subtitle="Aggregate activity across the entire facility network"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Trainers" value={adminKpis.trainers.toLocaleString()} delta="4.5%" icon={UserCog} />
        <StatCard label="Clients" value={adminKpis.clients.toLocaleString()} delta="6.8%" icon={Users} />
        <StatCard label="MRR" value={formatCurrency(adminKpis.mrr)} delta="9.1%" icon={DollarSign} />
        <StatCard label="Workouts today" value={adminKpis.workoutsToday.toLocaleString()} delta="3.2%" icon={Dumbbell} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-ink-900">Client growth</h2>
              <p className="text-sm text-ink-500">Network-wide enrollment trend</p>
            </div>
            <span className="text-2xl font-bold text-ink-900">{adminKpis.clients.toLocaleString()}</span>
          </div>
          <div className="mt-4">
            <EnrollmentChart data={enrollmentTrend} />
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold text-ink-900">Subscribers by tier</h2>
          <p className="text-sm text-ink-500">Active plan distribution</p>
          <div className="mt-5 space-y-4">
            {billingTiers.map((t) => (
              <div key={t.name}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium text-ink-700">{t.name}</span>
                  <span className="font-semibold text-ink-900">{t.subscribers.toLocaleString()}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-ink-100">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${t.color}`}
                    style={{ width: `${(t.subscribers / maxSubs) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink-900">Top trainers</h2>
          <span className="text-sm text-ink-500">Ranked by MRR</span>
        </div>
        <div className="mt-4 overflow-x-auto scroll-thin">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                <th className="pb-3 font-medium">Trainer</th>
                <th className="pb-3 font-medium">Clients</th>
                <th className="pb-3 font-medium">Tier</th>
                <th className="pb-3 font-medium">MRR</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {top.map((t) => (
                <tr key={t.id} className="border-b border-ink-50 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={t.avatar} size="sm" />
                      <span className="font-semibold text-ink-900">{t.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-ink-700">{t.clients}</td>
                  <td className="py-3">
                    <span className={`badge ${tierBadge[t.tier]}`}>{t.tier}</span>
                  </td>
                  <td className="py-3 font-semibold text-ink-900">{formatCurrency(t.mrr)}</td>
                  <td className="py-3">
                    <span className={`badge capitalize ${statusBadge[t.status]}`}>{t.status}</span>
                  </td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 text-ink-700">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {t.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-ink-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
            Operational insight trends
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((i) => (
            <div key={i.label} className="card p-5">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${i.bg} ${i.tone}`}>
                <i.icon className="h-5 w-5" />
              </span>
              <div className="mt-4 text-2xl font-bold text-ink-900">{i.value}</div>
              <div className="mt-1 text-sm text-ink-500">{i.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
