"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, Plus, Menu } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { PortalSwitcher } from "@/components/PortalSwitcher";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-ink-100 bg-ink-100/80 px-4 backdrop-blur-xl sm:px-6">
      <button className="lg:hidden" onClick={onMenu} aria-label="Open menu">
        <Menu className="h-6 w-6 text-ink-700" />
      </button>
      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search clients, workouts, exercises…"
          className="w-full rounded-full border border-ink-200 bg-ink-50 py-2 pl-9 pr-4 text-sm focus:border-brand-300 focus:bg-ink-100 focus:outline-none focus:ring-4 focus:ring-brand-100"
        />
      </div>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <PortalSwitcher />
        <Link href="/dashboard/clients?new=1" className="btn-primary hidden sm:inline-flex">
          <Plus className="h-4 w-4" /> Add client
        </Link>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-600 hover:bg-ink-100" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-ink-100" />
        </button>
        <div className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 hover:bg-ink-50">
          <Avatar initials="AC" size="sm" />
          <div className="hidden text-left sm:block">
            <div className="text-sm font-semibold leading-tight text-ink-900">Alex Coach</div>
            <div className="text-xs text-ink-400">Head Trainer</div>
          </div>
        </div>
      </div>
    </header>
  );
}
