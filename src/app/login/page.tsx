import Link from "next/link";
import { AuthShell, SocialButtons, Divider } from "@/components/marketing/AuthShell";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to your FitForge coaching dashboard."
      footer={
        <>
          New to FitForge?{" "}
          <Link href="/signup" className="font-semibold text-brand-400 hover:text-brand-400">
            Create an account
          </Link>
        </>
      }
    >
      <SocialButtons />
      <Divider />
      <form className="space-y-4" action="/dashboard">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" type="email" className="input" placeholder="you@email.com" defaultValue="coach@fitforge.app" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="label" htmlFor="password">Password</label>
            <Link href="#" className="text-sm text-brand-400 hover:text-brand-400">Forgot?</Link>
          </div>
          <input id="password" type="password" className="input" placeholder="••••••••" defaultValue="demo1234" />
        </div>
        <button type="submit" className="btn-primary w-full py-3">Log in as trainer</button>
      </form>

      <div className="mt-4 rounded-xl border border-ink-100 bg-ink-50/60 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-400">
          Just exploring?
        </p>
        <p className="mt-1 text-sm text-ink-600">
          FitForge has two experiences — the coach dashboard and the member app.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Link href="/dashboard" className="btn-secondary px-2">
            Trainer
          </Link>
          <Link href="/client" className="btn-accent px-2">
            Client
          </Link>
          <Link href="/admin" className="btn px-2 bg-ink-50 text-white hover:bg-ink-800">
            Admin
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
