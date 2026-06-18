import Link from "next/link";
import { AuthShell, SocialButtons, Divider } from "@/components/marketing/AuthShell";

export default function SignupPage() {
  return (
    <AuthShell
      title="Start your free trial"
      subtitle="30 days free. No credit card required."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-400 hover:text-brand-400">
            Log in
          </Link>
        </>
      }
    >
      <SocialButtons />
      <Divider />
      <form className="space-y-4" action="/dashboard">
        <div>
          <label className="label" htmlFor="name">Full name</label>
          <input id="name" type="text" className="input" placeholder="Alex Coach" />
        </div>
        <div>
          <label className="label" htmlFor="email">Work email</label>
          <input id="email" type="email" className="input" placeholder="you@email.com" />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input id="password" type="password" className="input" placeholder="Create a password" />
        </div>
        <button type="submit" className="btn-primary w-full py-3">Create account</button>
        <p className="text-center text-xs text-ink-400">
          By signing up you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthShell>
  );
}
