# FitForge — AI Fitness Coaching Platform

A full-featured, production-style **personal training & online coaching platform**, built as a feature-equivalent reimagining of tools like Trainerize. FitForge gives trainers, online coaches and gyms a single place to build workouts, plan nutrition, message clients, schedule sessions and track progress.

> Built with original branding and UI. Not affiliated with Trainerize.

## ✨ Features

**Marketing site**
- Landing page with hero, feature grid, solutions, app showcase, testimonials & CTA
- Features page, Pricing page (3 tiers + FAQ)
- Login / Sign-up flows

**Coaching dashboard** (`/dashboard`)
- **Overview** — KPIs, revenue & activity charts, today's schedule, AI at-risk flags, recent client progress
- **Clients** — searchable/filterable CRM list + rich client detail pages (overview, training, progress charts, notes)
- **Training** — program library, drag-style workout builder with sets/reps/rest, exercise library with filters
- **Nutrition** — meal plans, macro breakdowns, calorie targets
- **Calendar** — weekly scheduling grid with color-coded sessions, classes & check-ins
- **Messages** — two-pane real-time-style chat with composer
- **Progress** — body-weight & strength charts, habit tracker, progress photos
- **AI Coach** — assistant for generating programs, drafting check-ins and surfacing insights
- **Settings** — profile, business, billing, notifications, white-label branding

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
