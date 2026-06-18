import Link from "next/link";
import {
  Dumbbell, Apple, MessageSquare, LineChart, CalendarDays, Smartphone,
  Sparkles, CreditCard, Users, Bell, Video, Trophy, ClipboardList,
  HeartPulse, Target, ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

const groups = [
  {
    name: "Training",
    icon: Dumbbell,
    items: [
      ["Workout Builder", "Drag-and-drop builder with supersets, circuits, tempo and progressive overload.", ClipboardList],
      ["Exercise Library", "1,000+ exercises with HD video demos, or upload your own.", Video],
      ["Program Templates", "Reusable multi-week programs you can assign in one click.", Target],
      ["Auto-Progression", "Weights and reps adapt automatically as clients get stronger.", LineChart],
    ],
  },
  {
    name: "Nutrition",
    icon: Apple,
    items: [
      ["Meal Plans", "Build custom plans or choose from a library of templates.", ClipboardList],
      ["Macro Targets", "Set protein, carbs and fat goals tracked daily.", Target],
      ["Food Logging", "Barcode scanner and a database of millions of foods.", Apple],
      ["Hydration & Habits", "Track water, sleep, steps and custom habits.", HeartPulse],
    ],
  },
  {
    name: "Engagement",
    icon: MessageSquare,
    items: [
      ["In-App Messaging", "1:1 chat, group broadcasts and automated reminders.", MessageSquare],
      ["Video Check-ins", "Async video feedback on form and weekly reviews.", Video],
      ["Challenges & Leaderboards", "Drive community and accountability.", Trophy],
      ["Smart Notifications", "Nudge clients at exactly the right moment.", Bell],
    ],
  },
  {
    name: "Business",
    icon: CreditCard,
    items: [
      ["Payments & Plans", "Sell packages, subscriptions and one-off sessions.", CreditCard],
      ["Branded App", "Your logo and colors on iOS and Android.", Smartphone],
      ["Scheduling", "Self-booking, group classes and calendar sync.", CalendarDays],
      ["Client CRM", "Leads, onboarding and lifecycle in one place.", Users],
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-ink-100 to-ink-50">
          <div className="container-page py-20 text-center">
            <span className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Platform features</span>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
              Everything you need to coach, all in one place
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-600">
              From building programs to growing revenue — FitForge gives fitness
              professionals a complete, connected toolkit.
            </p>
          </div>
        </section>

        {groups.map((g, gi) => (
          <section key={g.name} className={gi % 2 === 1 ? "bg-ink-50/60 section" : "section"}>
            <div className="container-page">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <g.icon className="h-5 w-5" />
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-ink-900">{g.name}</h2>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {g.items.map(([title, desc, Icon]: any) => (
                  <div key={title} className="card flex gap-4 p-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink-900">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="section container-page">
          <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-ink-50 px-8 py-14 text-center">
            <h2 className="text-3xl font-extrabold text-white">See it in action</h2>
            <p className="mt-3 text-brand-100">Explore the full coaching dashboard — no signup needed.</p>
            <Link href="/dashboard" className="btn mt-7 bg-ink-100 px-7 py-3 text-base text-brand-400 hover:bg-brand-500/15">
              Open the dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
