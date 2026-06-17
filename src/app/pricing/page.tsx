import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

const tiers = [
  {
    name: "Starter",
    price: 19,
    tagline: "For new coaches getting started.",
    cta: "Start free trial",
    highlighted: false,
    features: ["Up to 5 active clients", "Workout & nutrition builder", "In-app messaging", "Progress tracking", "Mobile client app"],
  },
  {
    name: "Pro",
    price: 49,
    tagline: "For growing coaching businesses.",
    cta: "Start free trial",
    highlighted: true,
    features: ["Up to 50 active clients", "Everything in Starter", "Payments & subscriptions", "Scheduling & group classes", "AI program builder", "Challenges & leaderboards"],
  },
  {
    name: "Studio",
    price: 129,
    tagline: "For gyms, studios and teams.",
    cta: "Talk to sales",
    highlighted: false,
    features: ["Unlimited clients", "Everything in Pro", "Custom branded app", "Multiple trainer seats", "Advanced analytics", "Priority support & onboarding"],
  },
];

const faqs = [
  ["Can I try FitForge for free?", "Yes — every plan starts with a 30-day free trial. No credit card required to start."],
  ["Can I change plans later?", "Absolutely. Upgrade, downgrade or cancel anytime from your billing settings."],
  ["Do my clients pay anything?", "No. Clients get the mobile app for free — you only pay for your coaching seat."],
  ["Is there a branded app option?", "Yes, the Studio plan includes a fully custom-branded iOS and Android app."],
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-brand-50/60 to-white">
          <div className="container-page py-20 text-center">
            <span className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Simple pricing</span>
            <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
              Plans that grow with your business
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink-600">
              Start free for 30 days. Cancel anytime. Your clients always use the
              app for free.
            </p>
          </div>
        </section>

        <section className="container-page pb-10">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`card relative flex flex-col p-8 ${
                  t.highlighted ? "ring-2 ring-brand-500 shadow-glow" : ""
                }`}
              >
                {t.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-ink-900">{t.name}</h3>
                <p className="mt-1 text-sm text-ink-500">{t.tagline}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-ink-900">${t.price}</span>
                  <span className="mb-1 text-sm text-ink-500">/month</span>
                </div>
                <Link
                  href="/dashboard"
                  className={`mt-6 w-full ${t.highlighted ? "btn-primary" : "btn-secondary"}`}
                >
                  {t.cta}
                </Link>
                <ul className="mt-7 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section container-page">
          <h2 className="text-center text-3xl font-bold tracking-tight text-ink-900">
            Frequently asked questions
          </h2>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
            {faqs.map(([q, a]) => (
              <div key={q} className="p-6">
                <h3 className="font-semibold text-ink-900">{q}</h3>
                <p className="mt-2 text-sm text-ink-600">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
