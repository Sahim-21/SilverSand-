# Changelog

Record **what** changed and **why**, so a second developer (or a later Cursor session) can reconstruct decisions without Slack.

Format: newest first. Each entry: date, what, why, what we explicitly rejected.

---

## 2026-08-24 — Must-have marketing pages and reusable sections

### What

- Homepage wired to the full section stack from the architecture brief: hero (+ WhatsApp/phone CTAs high), property intro, room & pricing (DB), photos, about, Murudeshwar beach/temple, nearby attractions, FAQ, map, final CTA.
- New public routes: `/rooms` (single-room listing), `/rooms/deluxe-ac-room` (canonical room URL), `/gallery`, `/about`, `/location`; `/contact` enhanced with shared `ContactCta` and TODOs.
- Reusable layers: `src/components/sections/*`, `src/components/marketing/*`, `src/lib/navigation.ts`, `src/lib/site-content.ts`, `src/lib/todos.ts`.
- Header/footer use shared nav; `sitemap.ts` updated; `/rooms/deluxe-ac` → `/rooms/deluxe-ac-room` redirect.
- Missing owner facts surface as `TodoNotice` components referencing `docs/BUSINESS_INFO.md` checklist numbers — no invented amenities, distances, or rates.

### Why

Ship a complete, honest marketing surface using the Phase 2 design system without duplicating markup or hardcoding occupancy prices. Inner pages reuse the same sections as Home where intent overlaps.

### Rejected

- Hardcoded ₹ occupancy rates in components.
- Stock photos or invented beach-distance copy.
- `/rooms` → room-detail redirect (user brief requires a listing page even with one type).

### Follow-up

Phase 2: interactive booking widget, owner occupancy rates in admin, JSON-LD when address exists. See `docs/TASKS.md`.

---

## 2026-08-24 — Design system tokens, primitives, style guide

### What

- Replaced the scaffold sand/blue tokens with a **sand canvas + mangrove/gold** system in `src/app/globals.css` (Tailwind `@theme` utilities).
- Primitives: `Button`, `Input` (light/dark), `Label`, `Card`, `Alert`, `Heading`/`Text`, `PhotoFrame`.
- Layout: `Container`, `Section`, `Stack`, `Split`, `PageHeader`.
- Public pages and the booking placeholder now use those components. Booking card is mangrove with gold title; WhatsApp stays green.
- Internal **`/style-guide`** (noindex, robots disallow) so future work can see real components.
- `docs/DESIGN_SYSTEM.md` records the decided tokens (no longer “proposed”).

### Why

Photography-first marketing needs a quiet warm canvas. The booking panel borrows the **tone** of a warm-dark form (deep green/near-black, mustard accent, soft fields, generous form gaps) without cloning it or painting the whole site dark. Gold is not a luxury overlay on light pages.

### Rejected

- Full-site dark theme (fights photographs).
- Heavy gradients, animation, stock photos.
- Gold as the WhatsApp CTA (WhatsApp green stays reserved).
- Reintroducing `--sea` blues.

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
