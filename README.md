# FitForge — AI Fitness Coaching Platform

A full-featured, production-style **personal training & online coaching platform**, built as a feature-equivalent reimagining of tools like Trainerize. FitForge gives trainers, online coaches and gyms a single place to build workouts, plan nutrition, message clients, schedule sessions and track progress.

> Built with original branding and UI. Not affiliated with Trainerize.

## ✨ Features

Three full portals, switchable via the in-app **portal switcher** (top bar) or the
**Trainer / Client / Admin** buttons on `/login`. Interactive state (logged sets,
booked sessions, kanban moves, AI approvals, toggles) **persists** via localStorage.

**Marketing site** — landing, features, pricing (3 tiers + FAQ), login / sign-up.

**1. Trainer portal** (`/dashboard`)
- **Overview** — KPIs, revenue & activity charts, today's schedule, AI at-risk flags
- **Clients** — searchable CRM + rich client detail pages (overview, training, progress, notes)
- **Auditing** — Traffic-Light compliance tracker (green/yellow/red) + auto progress reviews
- **Training** — program library, workout builder with sets/reps/rest, exercise library
- **Nutrition** — meal plans, macro breakdowns, calorie targets
- **Calendar** — weekly scheduling grid, color-coded sessions, classes & check-ins
- **Workflow** — Operations Kanban (onboarding / form checks / support) with movable cards
- **Messages** — two-pane chat with composer
- **Progress** — body-weight & strength charts, habits, photos
- **AI Co-Pilot** — AI-drafted corrections with an approve / edit / dismiss workflow + chat
- **Settings** — profile, business, billing, notifications, white-label branding

**2. Client portal** (`/client`)
- **Today** — daily overview, today's workout, streaks, habits, next session
- **Workouts** — assigned plan + interactive **player** logging reps/load/**RPE/RIR**, auto-regulation hints, rest timer
- **Nutrition** — macro diary, meal logging, **AI meal generator**, barcode/photo quick-log
- **Progress** — weight logging + charts, measurements, photos, achievements
- **Biometrics** — sleep architecture (REM/Deep), muscle recovery/volume heatmap, recovery score, bloodwork lab portal
- **Booking** — browse trainer slots, book/cancel, Google/Apple calendar sync
- **Learn** — course masterclasses, media vault for form-check uploads, social milestone sharing
- **Coach** — 1:1 chat with simulated replies

**3. Super Admin portal** (`/admin`)
- **Overview** — platform-wide KPIs, enrollment growth, top trainers, tier breakdown
- **Identity & Access (IAM)** — users, role-based permissions, suspend/activate, MFA status
- **Billing & Tiers** — Basic / Pro / Elite plans, revenue routing & breakdown
- **Communications** — broadcast composer + multi-channel hub
- **Automation** — drip-campaign sequences + integration canvas (GoHighLevel, Trainerize, Zapier, Stripe)
- **Global Library** — master exercise & course asset manager
- **Security & PII** — MFA, end-to-end encryption, zero-knowledge locks, PII compliance filter, audit log

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) for data viz
- [lucide-react](https://lucide.dev/) icons

Data is served from an in-memory mock layer (`src/lib/data.ts`) so the app runs fully without a database — ideal for demos and easy to swap for a real API.

## 🚀 Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

## ▲ Deploy to Vercel

This app is zero-config on Vercel.

**Option A — Dashboard**
1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset is auto-detected as **Next.js** — click **Deploy**.

**Option B — CLI**
```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

No environment variables are required for the demo.

## 📁 Project structure

```
src/
  app/
    page.tsx              # landing
    features/ pricing/    # marketing
    login/ signup/        # auth
    dashboard/            # app (layout + 9 sections)
  components/
    marketing/ dashboard/ ui/
  lib/
    data.ts  utils.ts
```
