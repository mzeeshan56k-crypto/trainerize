# FitForge (FFKC) — Client Handover Guide

A complete, self-hosted AI fitness coaching platform built to replace paid tools
like Trainerize with **zero recurring per-seat cost**. This document is everything
you need to run, demo, deploy and extend the app.

---

## 1. What you're getting

A production-ready Next.js web app with **three full portals**, switchable from the
top-bar **portal switcher** or the buttons on the `/login` screen:

| Portal | URL | Who it's for |
|---|---|---|
| **Trainer** | `/dashboard` | Coaches managing clients |
| **Client** | `/client` | Members / trainees |
| **Super Admin** | `/admin` | Platform operators |

There is no login wall on the demo — pick a portal and explore. (Adding real
auth is a documented next step, see §6.)

---

## 2. Feature checklist (Trainerize parity + more)

**Trainer portal**
- Coaching operations dashboard (KPIs, revenue, activity, today's schedule)
- Client CRM + detailed client profiles (training, progress, notes)
- **Traffic-Light** performance auditing (🟢🟡🔴) with auto progress reviews
- Program & workout builder, exercise library **with playable demo videos**
- Nutrition & macro plan builder
- Scheduling calendar + availability
- **Operations Kanban** (onboarding / form checks / support) with movable cards
- **AI Co-Pilot** — AI-drafted corrections with approve / edit / dismiss workflow + chat
- In-app messaging
- Settings: profile, business, billing, notifications, **white-label branding (logo upload)**

**Client portal**
- Daily "Today" dashboard
- Training hub + **workout player** with reps/load, **RPE/RIR**, auto-regulation, rest timer, demo videos
- Nutrition diary with **AI meal-plan generator** + barcode/photo quick-log
- Progress: weight logging, charts, measurements, **real progress-photo uploads**, achievements
- Biometrics: sleep architecture, recovery/volume heatmap, recovery score, **bloodwork lab portal + lab uploads**
- **Challenges & leaderboards**
- **Weekly check-in forms**
- Scheduling & booking with calendar sync
- **Learn**: course player with video lessons, media vault (form-check uploads), social sharing
- Coach chat

**Super Admin portal**
- Platform-wide visibility dashboard
- Identity & Access Management (roles, permissions, MFA, suspend/activate)
- Tiered billing (Basic / Pro / Elite) + revenue routing
- Multi-channel communications & broadcasts
- Automation drip campaigns + integration canvas (GoHighLevel, Trainerize, Zapier, Stripe)
- Global asset library
- 3-layer security & PII governance with audit log

---

## 3. Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build / preview:

```bash
npm run build && npm start
```

Requirements: Node 18.18+ (Node 20+ recommended). No environment variables or
database required for the demo.

---

## 4. Deploy to Vercel (free tier works)

1. Push this repo to your GitHub account.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework is auto-detected as **Next.js** → click **Deploy**.
4. You get a live `https://<project>.vercel.app` URL in ~1 minute.

CLI alternative: `npm i -g vercel && vercel --prod`.

---

## 5. How the demo data works

- All content lives in `src/lib/data.ts` and `src/lib/platform.ts` (typed mock data).
- Interactive actions **persist in the browser** via `localStorage` (see
  `src/lib/useLocalState.ts`) — logged sets, booked sessions, kanban moves, AI
  approvals, uploaded photos, challenge joins, check-ins, security toggles, etc.
  This means the demo "remembers" your changes per browser. Clearing site data resets it.
- Uploaded images are downscaled client-side and stored as data URLs so the demo
  works with no storage backend.
- Demo course/exercise videos use public sample clips configured in
  `src/lib/media.ts` — swap these URLs for your own hosted videos in production.

---

## 6. Going to production (recommended next steps)

The front end is complete; these connect it to real infrastructure:

1. **Auth & roles** — add NextAuth (or Clerk/Auth0) so Trainer/Client/Admin are
   real, access-controlled accounts instead of open demo routes.
2. **Database & API** — replace the mock layer with Postgres + Prisma (or Supabase).
   The data shapes in `src/lib/*` already define the schema.
3. **File storage** — send photo/video uploads to S3, Cloudflare R2 or
   Supabase Storage instead of localStorage.
4. **Payments** — wire Stripe for the billing tiers and client packages.
5. **AI** — connect the AI Co-Pilot and meal generator to a real LLM API
   (the UI and approval workflow are already built).
6. **Video hosting** — host course/exercise videos on Mux/Cloudflare Stream and
   update `src/lib/media.ts`.
7. **Integrations** — implement the GoHighLevel / Zapier / calendar webhooks shown
   in the admin automation canvas.

---

## 7. Tech stack & structure

- **Next.js 14** (App Router) · **TypeScript** · **Tailwind CSS** · **Recharts** · **lucide-react**

```
src/
  app/
    (marketing)  page.tsx, features, pricing, login, signup
    dashboard/   trainer portal (11 sections)
    client/      member portal (12 sections)
    admin/       super admin portal (7 sections)
    error.tsx, not-found.tsx, icon.svg
  components/  marketing/ dashboard/ client/ admin/ ui/
  lib/         data.ts, platform.ts, media.ts, session.ts, useLocalState.ts, utils.ts
```

39 routes, clean production build, full TypeScript type-safety.

---

*Built as an original, white-labelable platform. Not affiliated with Trainerize.*
