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
          <Link href="/signup" className="font-semibold text-brand-600 hover:text-brand-700">
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
            <Link href="#" className="text-sm text-brand-600 hover:text-brand-700">Forgot?</Link>
          </div>
          <input id="password" type="password" className="input" placeholder="••••••••" defaultValue="demo1234" />
        </div>
        <button type="submit" className="btn-primary w-full py-3">Log in</button>
      </form>
    </AuthShell>
  );
}
