import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const cols = [
  {
    title: "Product",
    links: [
      ["Features", "/features"],
      ["Pricing", "/pricing"],
      ["Workout Builder", "/features"],
      ["Nutrition", "/features"],
      ["Mobile App", "/features"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Personal Trainers", "/#solutions"],
      ["Online Coaches", "/#solutions"],
      ["Gyms & Studios", "/#solutions"],
      ["Nutritionists", "/#solutions"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/#"],
      ["Customers", "/#testimonials"],
      ["Blog", "/#"],
      ["Careers", "/#"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Help Center", "/#"],
      ["Contact", "/#"],
      ["API Docs", "/#"],
      ["Status", "/#"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-50/50">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-ink-500">
              The all-in-one platform to coach clients, build workouts and grow
              your fitness business.
            </p>
            <div className="mt-6 flex gap-3">
              {["twitter", "instagram", "youtube", "linkedin"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition hover:border-brand-300 hover:text-brand-400"
                  aria-label={s}
                >
                  <span className="text-xs font-semibold capitalize">
                    {s[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink-900">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-ink-500 transition hover:text-brand-400"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-200 pt-8 sm:flex-row">
          <p className="text-sm text-ink-400">
            © {new Date().getFullYear()} FitForge Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-ink-400">
            <Link href="/#" className="hover:text-ink-600">
              Privacy
            </Link>
            <Link href="/#" className="hover:text-ink-600">
              Terms
            </Link>
            <Link href="/#" className="hover:text-ink-600">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
