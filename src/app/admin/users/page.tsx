"use client";

import { useState } from "react";
import {
  UserPlus, Search, ShieldCheck, ShieldOff, Ban, CheckCircle2, Check,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { useLocalState } from "@/lib/useLocalState";
import { platformUsers, rolePermissions, type PlatformUser } from "@/lib/platform";

const roleBadge: Record<string, string> = {
  Client: "bg-ink-100 text-ink-700",
  Coach: "bg-brand-50 text-brand-700",
  Staff: "bg-purple-50 text-purple-700",
  Admin: "bg-accent-50 text-accent-700",
};

const statusBadge: Record<string, string> = {
  active: "bg-accent-50 text-accent-700",
  suspended: "bg-rose-50 text-rose-600",
  invited: "bg-amber-50 text-amber-700",
};

const filters = ["All", "Client", "Coach", "Staff", "Admin"] as const;

export default function UsersPage() {
  const [users, setUsers] = useLocalState<PlatformUser[]>("ffkc-admin-users", platformUsers);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<(typeof filters)[number]>("All");

  function toggleStatus(id: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "suspended" ? "active" : "suspended" }
          : u,
      ),
    );
  }

  const visible = users.filter((u) => {
    const matchesRole = role === "All" || u.role === role;
    const q = query.toLowerCase();
    const matchesQuery =
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return matchesRole && matchesQuery;
  });

  return (
    <>
      <PageHeader
        title="Identity & Access"
        subtitle="Manage every user, role and access policy across the platform"
        action={
          <button className="btn-primary">
            <UserPlus className="h-4 w-4" /> Invite user
          </button>
        }
      />

      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or email…"
              className="input pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setRole(f)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  role === f
                    ? "bg-brand-600 text-white shadow-glow"
                    : "bg-ink-50 text-ink-600 hover:bg-ink-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-x-auto scroll-thin">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">MFA</th>
                <th className="pb-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((u) => (
                <tr key={u.id} className="border-b border-ink-50 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={u.avatar} size="sm" />
                      <div>
                        <div className="font-semibold text-ink-900">{u.name}</div>
                        <div className="text-xs text-ink-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`badge ${roleBadge[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="py-3">
                    <span className={`badge capitalize ${statusBadge[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="py-3">
                    {u.mfa ? (
                      <span className="badge bg-accent-50 text-accent-700">
                        <ShieldCheck className="h-3 w-3" /> On
                      </span>
                    ) : (
                      <span className="badge bg-ink-100 text-ink-500">
                        <ShieldOff className="h-3 w-3" /> Off
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        u.status === "suspended"
                          ? "bg-accent-50 text-accent-700 hover:bg-accent-100"
                          : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                      }`}
                    >
                      {u.status === "suspended" ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" /> Activate
                        </>
                      ) : (
                        <>
                          <Ban className="h-3.5 w-3.5" /> Suspend
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-ink-400">
                    No users match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 font-semibold text-ink-900">Role permissions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rolePermissions.map((r) => (
            <div key={r.role} className="card p-5">
              <h3 className="font-semibold text-ink-900">{r.role}</h3>
              <ul className="mt-3 space-y-2">
                {r.perms.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
