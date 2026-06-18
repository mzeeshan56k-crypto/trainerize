import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { CheckCircle2 } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Logo />
          <h1 className="mt-10 text-2xl font-bold tracking-tight text-ink-900">{title}</h1>
          <p className="mt-2 text-sm text-ink-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-center text-sm text-ink-500">{footer}</p>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-ink-50 lg:block">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative flex h-full flex-col justify-center px-16 text-white">
          <blockquote className="text-2xl font-semibold leading-snug">
            &ldquo;FitForge gave me back 10 hours a week and helped me double my
            client roster in 6 months.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 font-semibold">AM</span>
            <div>
              <div className="font-semibold">Alicia Moreno</div>
              <div className="text-sm text-brand-100">Online Coach · 240 clients</div>
            </div>
          </div>
          <ul className="mt-12 space-y-4">
            {["30-day free trial", "No credit card required", "Cancel anytime"].map((p) => (
              <li key={p} className="flex items-center gap-3 text-brand-50">
                <CheckCircle2 className="h-5 w-5 text-accent-300" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {["Google", "Apple"].map((p) => (
        <button key={p} className="btn-secondary w-full">
          {p}
        </button>
      ))}
    </div>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-ink-100" />
      <span className="text-xs uppercase tracking-wider text-ink-400">or</span>
      <span className="h-px flex-1 bg-ink-100" />
    </div>
  );
}

export { Link };
