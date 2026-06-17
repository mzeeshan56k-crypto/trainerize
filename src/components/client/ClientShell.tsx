"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, Apple, LineChart, MessageSquare } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/client", label: "Today", icon: Home },
  { href: "/client/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/client/nutrition", label: "Nutrition", icon: Apple },
  { href: "/client/progress", label: "Progress", icon: LineChart },
  { href: "/client/messages", label: "Coach", icon: MessageSquare },
];

export function ClientShell({
  children,
  clientName,
  clientInitials,
}: {
  children: React.ReactNode;
  clientName: string;
  clientInitials: string;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/client" ? pathname === "/client" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-ink-50/40">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-ink-600 sm:block">
              {clientName}
            </span>
            <Avatar initials={clientInitials} size="sm" />
          </div>
        </div>
      </header>

      {/* Desktop tab nav */}
      <div className="sticky top-16 z-30 hidden border-b border-ink-100 bg-white/85 backdrop-blur-xl sm:block">
        <nav className="mx-auto flex max-w-3xl gap-1 px-4 sm:px-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition",
                isActive(item.href)
                  ? "border-brand-600 text-brand-700"
                  : "border-transparent text-ink-500 hover:text-ink-900",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 pb-28 pt-6 sm:px-6 sm:pb-12">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 backdrop-blur-xl sm:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium transition",
                isActive(item.href) ? "text-brand-700" : "text-ink-400",
              )}
            >
              <item.icon
                className={cn("h-5 w-5", isActive(item.href) && "text-brand-600")}
              />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
