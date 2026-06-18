import Link from "next/link";
import {
  Dumbbell, Apple, MessageSquare, LineChart, CalendarDays, Smartphone,
  Sparkles, CheckCircle2, ArrowRight, Star, Users, CreditCard, Zap,
} from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

const features = [
  { icon: Dumbbell, title: "Workout Builder", desc: "Drag-and-drop programs with 1,000+ exercises, video demos, supersets and progressive overload." },
  { icon: Apple, title: "Nutrition Coaching", desc: "Build meal plans, set macro targets and track food with a barcode scanner and food database." },
  { icon: MessageSquare, title: "In-App Messaging", desc: "Stay connected with 1:1 chat, broadcast announcements, video check-ins and automated reminders." },
  { icon: LineChart, title: "Progress Tracking", desc: "Body stats, progress photos, measurements, PRs and goal tracking visualized beautifully." },
  { icon: CalendarDays, title: "Scheduling", desc: "Book sessions, run group classes and sync with your calendar — clients self-book in seconds." },
  { icon: Sparkles, title: "AI Coach Assistant", desc: "Generate programs, auto-reply to clients and surface at-risk members with built-in AI." },
];

const solutions = [
  { tag: "Personal Trainers", title: "Coach more clients in less time", points: ["Reusable program templates", "Automated check-ins", "Custom branded app"] },
  { tag: "Online Coaches", title: "Scale your business worldwide", points: ["Sell packages & subscriptions", "Onboard clients automatically", "Deliver anywhere, anytime"] },
  { tag: "Gyms & Studios", title: "Engage every member", points: ["Group challenges & leaderboards", "Class scheduling", "Member retention tools"] },
];

const testimonials = [
  { name: "Alicia Moreno", role: "Online Coach · 240 clients", quote: "FitForge replaced 5 different tools. My retention is up 38% and I coach twice the clients with half the admin.", initials: "AM" },
  { name: "Derek Sloane", role: "Studio Owner", quote: "The branded app made us look like a million-dollar brand overnight. Members love the leaderboards.", initials: "DS" },
  { name: "Priya Nair", role: "Personal Trainer", quote: "Building a 12-week program takes me 10 minutes now. The AI assistant is genuinely a game changer.", initials: "PN" },
];

const stats = [
  { value: "50k+", label: "Trainers & coaches" },
  { value: "4.9★", label: "App store rating" },
  { value: "12M+", label: "Workouts logged" },
  { value: "98%", label: "Retention rate" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-ink-100 to-ink-50">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="container-page relative grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
            <div className="animate-fade-up">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" /> Now with AI program builder
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
                Coach clients.{" "}
                <span className="gradient-text">Grow your fitness business.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-ink-600">
                FitForge is the all-in-one platform for personal trainers, online
                coaches and gyms — build workouts, plan nutrition, message clients
                and track progress from one beautiful app.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/dashboard" className="btn-primary px-7 py-3 text-base">
                  Start 30-day free trial <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/features" className="btn-secondary px-7 py-3 text-base">
                  Explore features
                </Link>
              </div>
              <p className="mt-4 text-sm text-ink-400">
                No credit card required · Cancel anytime
              </p>
            </div>
            <div className="relative animate-fade-in">
              <HeroMockup />
            </div>
          </div>
          <div className="border-y border-ink-100 bg-ink-100/80">
            <div className="container-page grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-sm text-ink-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section container-page" id="features">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Everything in one place</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              The complete coaching toolkit
            </h2>
            <p className="mt-4 text-lg text-ink-600">
              Replace a dozen disconnected tools with a single platform built for
              fitness professionals.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card group p-7 transition hover:-translate-y-1 hover:shadow-glow">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 transition group-hover:bg-brand-600 group-hover:text-white">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solutions */}
        <section className="bg-ink-50/60 section" id="solutions">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Built for your business</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                One platform, every fitness pro
              </h2>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {solutions.map((s) => (
                <div key={s.tag} className="card flex flex-col p-8">
                  <span className="badge w-fit bg-brand-500/15 text-brand-400">{s.tag}</span>
                  <h3 className="mt-4 text-xl font-bold text-ink-900">{s.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-ink-700">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-500" /> {p}
                      </li>
                    ))}
                  </ul>
                  <Link href="/dashboard" className="btn-ghost mt-6 w-fit px-0 text-brand-400 hover:bg-transparent hover:text-brand-400">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase band */}
        <section className="section container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow"><Smartphone className="h-3.5 w-3.5" /> Your own branded app</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                Put your brand in every client&apos;s pocket
              </h2>
              <p className="mt-4 text-lg text-ink-600">
                Deliver workouts, nutrition and messages through a polished mobile
                experience — with your logo, your colors, your business.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  ["Custom branded iOS & Android app", Smartphone],
                  ["Accept payments & subscriptions", CreditCard],
                  ["Engage clients with challenges", Zap],
                  ["Grow with referrals & community", Users],
                ].map(([label, Icon]: any) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-ink-800">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <PhoneMockup />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gradient-to-b from-ink-50 to-ink-100 section" id="testimonials">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Loved by professionals</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                Trusted by 50,000+ coaches worldwide
              </h2>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="card flex flex-col p-7">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-ink-700">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 font-semibold text-white">
                      {t.initials}
                    </span>
                    <div>
                      <div className="font-semibold text-ink-900">{t.name}</div>
                      <div className="text-sm text-ink-500">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink-50 px-8 py-16 text-center sm:px-16">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to grow your coaching business?
              </h2>
              <p className="mt-4 text-lg text-brand-100">
                Join thousands of fitness professionals building stronger, more
                profitable businesses with FitForge.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/dashboard" className="btn bg-ink-100 px-7 py-3 text-base text-brand-400 hover:bg-brand-500/15">
                  Start your free trial <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/pricing" className="btn border border-white/30 px-7 py-3 text-base text-white hover:bg-white/10">
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function HeroMockup() {
  return (
    <div className="relative rounded-2xl border border-ink-100 bg-ink-100 p-4 shadow-glow">
      <div className="flex items-center gap-1.5 pb-3">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-accent-400" />
      </div>
      <div className="rounded-xl bg-ink-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-ink-400">Active clients</div>
            <div className="text-2xl font-bold text-ink-900">42</div>
          </div>
          <span className="badge bg-accent-500/20 text-accent-400">+8 this month</span>
        </div>
        <div className="mt-4 flex h-28 items-end gap-2">
          {[40, 65, 50, 80, 72, 95, 88].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-brand-400 to-brand-600" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-ink-100 p-3">
          <div className="text-xs text-ink-400">Workouts completed</div>
          <div className="text-lg font-bold text-ink-900">1,284</div>
        </div>
        <div className="rounded-xl border border-ink-100 p-3">
          <div className="text-xs text-ink-400">Avg. adherence</div>
          <div className="text-lg font-bold text-ink-900">91%</div>
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="mx-auto w-64 rounded-[2.5rem] border-8 border-ink-900 bg-ink-50 shadow-2xl">
      <div className="h-6 rounded-t-[1.6rem] bg-ink-50" />
      <div className="overflow-hidden rounded-b-[1.6rem] bg-ink-100">
        <div className="bg-gradient-to-br from-brand-600 to-accent-500 p-5 text-white">
          <div className="text-xs opacity-80">Good morning</div>
          <div className="text-lg font-bold">Maya 👋</div>
          <div className="mt-3 rounded-xl bg-white/15 p-3 backdrop-blur">
            <div className="text-xs opacity-90">Today&apos;s workout</div>
            <div className="font-semibold">Upper Body Push</div>
            <div className="mt-1 text-xs opacity-80">3 exercises · 55 min</div>
          </div>
        </div>
        <div className="space-y-3 p-4">
          {["Bench Press", "Overhead Press", "Tricep Pushdown"].map((e, i) => (
            <div key={e} className="flex items-center gap-3 rounded-xl border border-ink-100 p-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15 text-xs font-bold text-brand-400">{i + 1}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-ink-900">{e}</div>
                <div className="text-xs text-ink-400">3 sets</div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-accent-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
