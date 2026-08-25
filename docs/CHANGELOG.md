# Changelog

Record **what** changed and **why**, so a second developer (or a later Cursor session) can reconstruct decisions without Slack.

Format: newest first. Each entry: date, what, why, what we explicitly rejected.

---

## 2026-08-25 — Owner-confirmed pricing, policies, and amenities

### What

- Updated `docs/BUSINESS_INFO.md` with owner-supplied facts (25 August 2026):
  - Occupancy nightly rates (INR): 2 → ₹2,000; 3 → ₹2,500; 4 → ₹3,000; 6 → ₹4,000; 8 → ₹5,000.
  - Extra bed: ₹500 per person per night; max **8 total guests** (not sold beyond that cap).
  - Room type: single **Deluxe AC Room** type; all rooms air-conditioned.
  - Meals: not included, not offered.
  - Wi-Fi: available, free.
  - Parking: on-site.
  - Check-in 11:00 AM; check-out 11:00 AM the next day.
  - Cancellation: non-cancellable / non-refundable.
  - Social share image: branded OG/Twitter wordmark is **final** (no owner photograph required).
- Checked off matching items in the `BUSINESS_INFO.md` missing-information checklist (#4–#7, #12, #13, #16).
- Added derived constants for rates, extra bed, check-in/out, and max guests.

### Why

Site copy, admin seeding, FAQs, and JSON-LD cannot move past placeholder state until these facts live in the single source of truth.

### Rejected / still withheld

- **Naveen Beach Road / Mavalli / PIN 581350** — still unverified OTA-mirror data; address not added to Confirmed.
- Bed/bathroom layout, landmark distances, guest-count rules for 1/5/7, unit count, GST, GBP, reviews, host name, house rules, and OTA policy — still open on the checklist.

---

## 2026-08-25 — Technical SEO: metadata, crawl files, JSON-LD, breadcrumbs

### What

- Unique title tags and meta descriptions per public URL (`src/lib/seo/copy.ts`) plus Open Graph (`en_IN`) and Twitter `summary_large_image`. Canonicals via `pageMetadata()`. Home title is absolute so the brand is not doubled by the layout template.
- `robots.ts` now advertises `sitemap.xml`. Sitemap still lists public URLs only (`/admin`, `/api`, `/style-guide` omitted).
- Branded OG/Twitter image (`src/app/opengraph-image.tsx`) — wordmark card, not a stock villa. `openGraph.images` / `twitter.images` point at that route so an explicit `openGraph` object does not hide the file convention.
- JSON-LD: `WebSite`, `LodgingBusiness` + nested `HotelRoom`, `Offer`/`priceRange` only from published `getPublicPricing()`, `FAQPage` from answered FAQs only, `BreadcrumbList` on inner pages. Builders in `src/lib/seo/json-ld.ts`. Public layout loads pricing for that graph; `getPublicPricing()` fail-closes to `null` if the database is unreachable so prerender does not 500.
- Visible breadcrumbs on inner pages; `PhotoFrame` requires `alt` (`role="img"` while empty); `CardTitle` defaults to h3 so each public page keeps one H1; booking widget title is h2.
- Custom `src/app/not-found.tsx` with Home + WhatsApp/Call.
- Home body “Deluxe AC Room” links to `/rooms/deluxe-ac-room`.
- `docs/SEO_STRATEGY.md` records what is live vs withheld. Tests in `src/lib/seo/json-ld.test.ts`.

### Why

SEO is a day-one constraint. Crawl metadata and structured data have to match confirmed facts so we do not copy competitor sins (fake ratings, lorem, Hotel schema).

### Rejected

- `Hotel`, `BedAndBreakfast`, `AggregateRating`, `Review`, `SearchAction`, `GeoCoordinates`, street `PostalAddress`, `image` on the business, and `Offer` rows while rates are unpublished.
- Keyword meta tag.
- Using a stock photograph as `og:image`.

---

## 2026-08-24 — Hardcoded-price audit + fail-closed display

### What

- Audited `src/` for occupancy nightly rates or extra-bed rupees that are not read from `rooms` / `occupancy_prices`. None in React. The only numeric extra-bed in the repo outside tests is `scripts/seed.ts` (`extraBedRateInr: 500`, owner-supplied, unpublished until admin save). Occupancy nightly rates are still not seeded.
- Occupancy table fail-closes: missing or `<= 0` nightly rate → em dash; extra bed `<= 0` → “Not offered” (no `₹0`).
- Added `src/lib/pricing/no-hardcoded-prices.test.ts`: scans production source for literal rates / unexpected `₹` amounts, and asserts admin PATCH + public `getPublicPricing()` both use `rooms.extra_bed_rate_inr` and `occupancy_prices.nightly_rate_inr`. Wired into `npm test` and CI.

### Why

A second occupancy constant in JSX would silently diverge from admin. The scanner is the tripwire.

### Rejected

- Moving extra-bed `500` out of seed (it is the one owner-supplied figure and lives in the DB row, not in the UI).
- Allowing `₹0` as a published extra-bed display.

---

## 2026-08-24 — Admin login + pricing dashboard (hardened)

### What

- **`/admin/login`**: redesigned with `Label` and `Alert` design-system primitives; generic error message (does not reveal whether the email exists).
- **`/admin`**: Server Component now loads current prices from `getAdminPricing()` before the page renders — no client-side `useEffect` round-trip, and admin can see/edit rates even when the room is unpublished or fewer than 5 occupancy rows exist (both of which make the public API return null).
- **`PricingDashboard` (client form)**: receives initial prices as props; dirty-state tracking (Save Changes disabled until a value changes); per-field validation (whole numbers, sensible upper bounds); `baseline` reset after successful save so the form returns to "not dirty" without a reload; "Last saved" timestamp in IST; Published/Unpublished badge; Sign out alongside Save.
- **`auth.ts`**: in-memory per-email rate limiting (5 attempts / 15 minutes); constant-time bcrypt.compare (always runs even when email not found) to prevent timing oracle on email existence; rate-limit resets on successful login.
- **`getAdminPricing()`** (`src/lib/pricing/admin-fetch.ts`): server-only query, no `is_published` gate, no tag cache — always fresh from Postgres.

### Why

The scaffold admin shell was functional but loaded prices via the public API (which fails when unpublished) and lacked dirty-state tracking, per-field feedback, and timing-safe auth. These are the minimum quality bars for a money-adjacent page used by a single owner.

### Rate limiting note

In-process `Map` resets on cold starts in serverless. This is documented here: bcrypt's cost factor (~100ms per check) is the primary brute-force defense. A distributed rate limiter (e.g. Upstash Redis or Arcjet) can replace this without changing the auth architecture.

### Rejected

- No user management UI, no roles, no reservation fields — pricing only.
- No CMS capability added to the admin.
- DB sessions (Auth.js Credentials cannot use the adapter without OAuth; JWT in httpOnly cookie is the correct v1 approach — documented in CHANGELOG).

---

## 2026-08-24 — Interactive booking widget (live estimate + WhatsApp prefill)

### What

- Replaced the mangrove placeholder with a working booking panel: optional name, occupancy dropdown (room type × 2/3/4/6/8 sharing), quantity stepper, extra beds, native check-in/out date pickers (check-out after check-in), optional phone, results box, **Check Availability on WhatsApp**, and **Call us**.
- “+ Add another room type” adds enquiry lines. v1 still has one Deluxe AC Room; the catalog is an array so a second type can be added later without rewriting the form.
- Estimated Total uses `GET /api/pricing` + `estimateEnquiry` only. Unpublished rates → enquire-only copy, **no ₹ fallback**. Disclaimer: `*Estimate only, subject to availability`.
- WhatsApp `wa.me` message is built from the form (room, occupancy, quantity, extra beds, dates, live estimate, name/phone if given).
- Estimate math lives in `src/lib/pricing/estimate.ts` (covered by `npm test`). Widget sits on Home, the Deluxe AC room page, and `/style-guide`.

### Why

Guests need a usable mobile-first path to see a live occupancy estimate and message the owner, without inventing rack rates or implying instant confirmation.

### Rejected

- Hardcoded occupancy ₹ or extra-bed ₹ in the widget.
- A date-picker npm library (native `<input type="date">` is the real mobile picker).
- Treating quantity as live remaining-room inventory (unit count is still unknown).
- Cloning Dandeli Inn’s layout or extra room-type inventory.

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
