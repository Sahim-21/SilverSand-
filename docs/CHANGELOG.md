# Changelog

Record **what** changed and **why**, so a second developer (or a later Cursor session) can reconstruct decisions without Slack.

Format: newest first. Each entry: date, what, why, what we explicitly rejected.

---

## 2026-08-24 — Phase 1: project scaffold

### What

- Replaced the leftover `create-next-app` demo with **Silver Sand Homestay** per `docs/ARCHITECTURE.md`.
- Stack: Next.js 16 App Router, TypeScript, Tailwind 4, shadcn-style UI (`Button`, `Input`), Neon + Drizzle, Auth.js (Credentials → `admin_users`), Zod validation.
- App structure: `(public)` marketing routes, `(admin)` pricing panel, API routes for pricing and auth.
- Drizzle schema matching `docs/DATABASE.md`; `scripts/seed.ts` creates one unpublished room + admin (extra bed ₹500 only; no occupancy rates).
- Design tokens from `docs/DESIGN_SYSTEM.md` in `globals.css`; Source Sans / Source Serif fonts.
- `.env.example`, `components.json`, Prettier + ESLint, GitHub Actions CI (`typecheck`, `lint`, `format:check`, `build`).
- Public `robots.ts`, `sitemap.ts`, `/rooms` → `/rooms/deluxe-ac` redirect.
- Booking widget is a **placeholder** (honest CTAs, no fake ₹).

### Why

Phase 0 documentation defined constraints; Phase 1 gives a second developer a runnable repo with the correct boundaries (pricing-only dynamic surface) without inventing owner facts or rack rates.

Auth uses **JWT sessions** because Auth.js Credentials provider does not support database sessions — documented here so we do not assume `auth_sessions` tables exist.

`revalidateTag('pricing', 'max')` is required by Next.js 16’s cache API.

### Rejected (on purpose)

- Seeding invented occupancy prices.
- `@auth/drizzle-adapter` / extra auth tables (unused with JWT + `admin_users`).
- Full interactive booking widget in this phase (Phase 2).
- `Hotel` schema, fake reviews, beach-distance copy.

### Follow-up

Phase 2: interactive widget, JSON-LD with known facts, owner occupancy rates, Vercel deploy. See `docs/TASKS.md`.

---

## 2026-08-24 — Phase 0: documentation only

### What

- Added `START_HERE.md` and the `docs/` set: current state, tasks, architecture (stack + sitemap), database (pricing schema + admin flow), design system, development rules, business facts, SEO strategy (including competitor analysis).
- Added `.cursor/rules/` so agents read docs first and do not invent a CMS or hardcoded rates.
- Added this changelog and a repo `README.md` that points at `START_HERE.md`.

### Why

The owner needs direct WhatsApp/phone bookings for one Deluxe AC Room with occupancy pricing. Prices must be edited in a small admin panel and nowhere else. Building UI before facts (rates, address, photos, unit count) would freeze guesses into the homepage.

Competitor and reference sites were fetched the same day so SEO and UX recommendations are observational, not generic “add a blog” advice. `dandeliinn.com` was used as a **booking-flow** reference only.

### Rejected (on purpose)

- **Application code** in that phase.
- **WordPress / a headless CMS** — the brief forbids owner-editable pages.
- **Astro + Worker as v1** — split stack for a small team.
- **Hotel / PMS / payments / live calendar**.
- **Invented occupancy ₹ amounts, address, or beach walking time**.
- **Treating sahyadristays.com as the Sahyadri beach homestay**.
- **Hotel schema and fake review stars.**
- **Doorway URLs** for every keyword variant.
