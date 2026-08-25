# Changelog

Record **what** changed and **why**, so a second developer (or a later Cursor session) can reconstruct decisions without Slack.

Format: newest first. Each entry: date, what, why, what we explicitly rejected.

---

## 2026-08-25 — GST, bathroom, ID, bus-stand landmark; remove public flags

### What

- Confirmed: listed occupancy and extra-bed rates **include GST**; a **bathroom is available**; **guest ID is required**; the homestay is **1 km from Murudeshwar bus stand**.
- Published those facts as normal copy (occupancy table, room copy, About, Terms, Location, FAQs, JSON-LD `valueAddedTaxIncluded` + bathroom amenity).
- Removed every public `TodoNotice` and remaining “pending owner / will be published” flags.
- Booking widget still shows `*Estimate only, subject to availability` and now notes that rates include GST (no extra GST line on the total).

### Why

Owner confirmed these four facts on 25 August 2026. Yellow pending boxes for everything else were noise — unpublished facts (bed count, other distances, host name) are omitted, not boxed.

### Rejected

- Inventing bed count, attached vs shared bath, hot water, or beach/temple/railway distances.
- Adding GST on top of occupancy/extra-bed estimates.
- Hardcoding occupancy ₹ in React.
- Keeping ID/GST/distance `TodoNotice` boxes after the facts landed.

---

## 2026-08-25 — Remove stale “pending owner” copy for confirmed facts

### What

- Rewrote guest-facing copy that still treated occupancy rates, extra-bed offering, AC, meals, check-in/out, and cancellation as unpublished.
- Home “Room & pricing” now states occupancy pricing without “when published.”
- Beds/bath `TodoNotice` no longer lists AC coverage (all rooms are AC). Extra-bed cap is no longer listed as unpublished.
- Meals, check-in, and cancellation on `/about` are normal copy. ID/guest house rules stay in a `TodoNotice`.
- Fail-closed occupancy table and extra-bed FAQ no longer use “Pending owner confirmation” when rates simply fail to load.
- Left the booking widget disclaimer `*Estimate only, subject to availability` unchanged.

### Why

Those facts are confirmed in `BUSINESS_INFO.md`. Scaffolding language was still on Home, Rooms, the room page, About, Gallery, Location, FAQ, and meta descriptions.

### Rejected

- Removing beds/bath or landmark-distance callouts (still unconfirmed).
- Hardcoding occupancy ₹ in the fail-closed extra-bed FAQ.

---

## 2026-08-25 — Booking widget: dates, live rates, 8-guest cap

### What

- Check-out is disabled until check-in is chosen. Choosing or typing a check-out on/before check-in snaps to the next day (`normalizeCheckOutIso`). Changing check-in later than the current check-out bumps check-out.
- The estimate box shows the **live occupancy (+ extra bed) nightly rate** as soon as `/api/pricing` is available, and the stay total once dates are valid. Totals still come only from published DB rates.
- Extra beds are limited to remaining places in the room (`occupancy + extra beds ≤ 8`). 8 sharing cannot add an extra bed. The estimate clamps extras the same way so a stale stepper value cannot bill past the cap.

### Why

Guests were able to pick an invalid stay, add extra beds on a full 8-person occupancy, and did not see the rupee amount change until both dates were set.

### Rejected

- Hardcoded occupancy ₹ in the widget.
- Charging extra beds above `max_occupancy`.

---

## 2026-08-25 — Production deploy runbook (Vercel Hobby + Neon Free)

### What

- Added `docs/DEPLOYMENT.md`: env vars from `.env.example` (Production vs Preview vs local), `silversandhomestay.com` DNS, Neon pooled vs direct URIs, and how a second developer redeploys after `git pull`.
- `vercel.json` pins Functions to **`sin1`** (Singapore). Neon project region recorded as **`aws-ap-southeast-1`**. Mumbai is not a Neon region.
- App/seed use `src/lib/db-pool.ts`: TLS (`rejectUnauthorized`) off localhost; `max: 1` when `VERCEL` is set. `drizzle.config.ts` prefers `DATABASE_URL_UNPOOLED` for DDL.
- Seed against a non-localhost URL rejects the local-dev admin password and a weak `AUTH_SECRET` even when `VERCEL_ENV` is unset (laptop → Neon).
- README / START_HERE / ARCHITECTURE / DATABASE / TASKS / CURRENT_STATE point at the runbook.

### Status

Runbook and connection code are in the repo. **No live Vercel project, Neon database, or DNS** was created from this environment (no vendor tokens; local `DATABASE_URL` is localhost). `silversandhomestay.com` is not serving this app until the first-time dashboard steps are done.

### Why

ARCHITECTURE.md: Vercel + Neon, apex + `www`, env in the host not git, Preview admin lock, low operating cost. Hobby + Neon Free is enough for one homestay. Functions must sit next to Postgres (Singapore), not the Vercel default `iad1`.

### Rejected

- Vercel Pro / Neon Launch for v1 (no traffic or always-on requirement).
- Claiming the public domain is live.
- GitHub Actions deploy (Vercel git integration is the Hobby path; extra CI deploy would duplicate cost and secrets).
- Pinning Functions to `bom1` while the database is in Singapore (adds RTT on every pricing read).

---

## 2026-08-25 — Production-based admin auth

### What

- Auth.js uses `AUTH_SECRET`, 7-day JWT, and **Secure** cookies when `AUTH_URL` is https or `VERCEL_ENV=production`.
- Vercel Preview disables `/admin` and `PATCH /api/admin/pricing` by default (`ALLOW_ADMIN_ON_PREVIEW=true` only with a non-prod DB).
- Vercel Production rejects the local-dev password and the CI `AUTH_SECRET` placeholder (login + seed).
- `.env.example` documents `AUTH_URL` for production.

### Why

Architecture: preview must not use production admin; production must not ship with `.env.local` placeholders.

### Rejected

- OAuth / magic-link (still one owner, Credentials).
- Secure cookies on every `NODE_ENV=production` run (would break `next start` on http://127.0.0.1).

---

## 2026-08-25 — Booking widget date `min` hydration

### What

- Check-in / check-out `min` is no longer computed with `todayIso()` during SSR. The first render omits `min`; after mount it uses the guest's local calendar date.

### Why

Server HTML used the VM date (`2026-08-25`) while the browser used a different local date (`2026-08-18`), which React reported as a hydration mismatch on the date inputs.

### Rejected

- `suppressHydrationWarning` on the inputs (hides the mismatch instead of avoiding it).
- Passing the server's "today" to the client (still wrong in another timezone).

---

## 2026-08-25 — Nearby attraction photographs

### What

- Wired owner photos in `public/tourist_places/` to the existing Nearby Attractions cards on Home and `/location` via `next/image` (lazy, unique alt, intrinsic width/height).
- Files: `murudeshwar_temple.jpg`, `beach.jpg`, `murudeshwar_jetty.jpg`, `idagunji_temple.jpg` (renamed from `idagunji temple.jpg`), `Netrani.jpg`.
- Attraction notes and the unpublished walking-distance copy in `src/lib/site-content.ts` are unchanged. Yana stays text-only (no photo yet).
- `docs/TASKS.md`: attraction images marked added; checklist #8 (distances from the homestay) still open.

### Why

The owner supplied photographs of the temple, beach, jetty, Idagunji, and Netrani. Guests should see those places on the attraction cards without us inventing travel times from Silver Sand.

### Rejected

- Raw `<img>` tags.
- Publishing walking or driving times from these photos.
- A PhotoFrame empty slot on Yana.

---

## 2026-08-25 — Deluxe AC Room occupancy photos + Book Now

### What

- Wired owner photos in `public/Rooms/` to each occupancy tier (2 / 3 / 4 / 6 / 8 sharing) via `next/image` (`OccupancyRoomImage`, lazy, unique alt per image). Filename for 6 sharing is `6Sharing.jpeg` (case-sensitive).
- Replaced the room `PhotoFrame` placeholder in `PhotosSection` (Home, `/gallery`, `/rooms/deluxe-ac-room`) with the five occupancy photographs.
- Occupancy pricing cards on Home, `/rooms`, and `/rooms/deluxe-ac-room` show the matching photo, the DB rate, and a **Book Now** control.
- **Book Now** uses the existing `Button` `whatsapp` variant (same as “Check Availability on WhatsApp”). On Home and the room page it is a smooth-scroll link to `#booking` on the in-page widget; on `/rooms` and `/gallery` it goes to `/rooms/deluxe-ac-room#booking`.
- `docs/TASKS.md`: room occupancy images marked resolved (exterior / bathroom still open).

### Why

The owner supplied per-occupancy room photographs. Guests should see the matching image next to each sharing rate and jump to the existing WhatsApp booking widget without a new route.

### Rejected

- Raw `<img>` tags.
- Inventing a new Button variant.
- A separate `/book` page — the widget already lives in the Home and Deluxe AC Room heroes.
- Replacing exterior/bathroom placeholders (those photos are still missing).

---

## 2026-08-25 — Homepage hero: Murudeshwar coast photograph

### What

- Wired `public/images/hero-murudeshwar-coast.jpg` into `HeroSection` with `next/image` (`priority`, `fill`, responsive `sizes`, quality 85 → WebP/AVIF via Next).
- Subtle mangrove-deep → mangrove gradient overlay so place line, H1, body copy, and the booking WhatsApp/Call CTAs stay readable.
- Alt text describes the coastal Murudeshwar beach scene — not the homestay exterior.
- `docs/TASKS.md`: homepage hero image marked resolved (room / property photos still open).

### Why

Above-the-fold LCP needs an eager, optimized photograph; a flat sand panel was only a stand-in until this asset arrived.

### Rejected

- Plain `<img>` or CSS `background-image`.
- Lazy-loading the hero.
- Alt text that implies the photo is of Silver Sand Beach Homestay itself.

---

## 2026-08-25 — Live Maps Embed + published NAP / geo

### What

- Replaced the dashed map placeholder with Google Maps **Embed API** (`mode=place`, Place ID `ChIJz7O6_zJHvDsRPrgj4nB9eiE`) on Home and `/location` — 16:9 iframe, `loading="lazy"`.
- Env: `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` in `.env.example` (referrer-restricted; public by design). Fallback link to Google Maps if unset.
- Confirmed address and coordinates in `docs/BUSINESS_INFO.md` and `src/lib/business.ts`: **1, Naveen Beach Rd, Murdeshwar, Mavalli, Karnataka 581350, India**; lat **14.1007798**, lng **74.4874894**.
- Footer, contact, location copy, and `lodgingBusinessJsonLd` now emit full `PostalAddress` + `GeoCoordinates`. Checklist #1 and #11 marked done.

### Why

Owner-supplied Place ID resolves to this NAP on Google Maps; embed gives a live pin without the JS Maps SDK.

### Rejected

- Full JavaScript Maps API / custom markers for v1.
- Publishing landmark walking times without owner-measured distances (#8 still open).

---

## 2026-08-25 — Homepage Google reviews via Places API (New)

### What

- Server-side Place Details fetch for reviews only (`X-Goog-FieldMask: reviews`) using `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` (`ChIJz7O6_zJHvDsRPrgj4nB9eiE`).
- `getGoogleReviews()` cached 24h (`unstable_cache` tag `google-reviews`); `GET /api/reviews` exposes the same payload without leaking the key.
- Homepage `ReviewsSection`: author, rating, text, relative date, Maps link — exactly as returned (0–5 reviews). “Powered by Google” attribution + relevance ordering note.
- `.env.example`, `docs/BUSINESS_INFO.md` checklist #9, and `docs/ARCHITECTURE.md` updated. Unit tests for response normalization.

### Why

Owner supplied the Place ID so we can show genuine Google reviews without inventing quotes. Server-only key + daily cache keeps cost and exposure under control.

### Rejected

- Client-side Places calls or `NEXT_PUBLIC_` API keys.
- Inventing, rounding, or cherry-picking reviews; fabricating `AggregateRating` JSON-LD from this feed.
- Empty placeholder review cards when the API returns nothing (section stays hidden).

---

## 2026-08-25 — Photos section: remove exterior and bathroom placeholders

### What

- `PhotosSection` no longer renders empty dashed `PhotoFrame` slots for the property exterior or bathroom on `/`, `/gallery`, or `/rooms/deluxe-ac-room`.
- One room-photo `PhotoFrame` placeholder remains until the owner supplies a Deluxe AC Room image.
- Section copy updated: no empty boxes for exterior/bathroom; those photos come in a later step.

### Why

The owner does not want visible empty placeholder frames for categories where photos are not ready yet. A single room slot is enough until real images arrive.

### Rejected

- Stock or OTA-scraped images as stand-ins.

---

## 2026-08-25 — Booking terms page: confirmed policies published

### What

- `/terms` now states owner-confirmed booking terms: check-in 11:00 AM, check-out 11:00 AM next day, non-cancellable/non-refundable bookings, no meals, and the single air-conditioned Deluxe AC Room type.
- Provisional “will be published once the owner provides them” language removed for those items only; house rules (ID, guest policies) and GST/tax inclusion remain marked as pending.
- Terms meta description in `src/lib/seo/copy.ts` updated to match.

### Why

These policies were confirmed on 25 August 2026 (`BUSINESS_INFO.md`) and already appear in FAQs — the terms page should not lag behind with placeholder copy.

### Rejected

- Publishing ID/couples rules or GST treatment before the owner confirms them.

---

## 2026-08-25 — FAQ: check-in, parking, Wi-Fi, cancellation confirmed

### What

- Moved four owner-confirmed answers from `TodoNotice` placeholders into `STATIC_FAQS` (`src/lib/seo/faqs.ts`):
  - Check-in 11:00 AM; check-out 11:00 AM the next day.
  - On-site parking.
  - Free Wi-Fi.
  - Non-cancellable, non-refundable bookings (stated plainly).
- `FaqSection` no longer renders pending-owner cards for those four questions.
- `FAQPage` JSON-LD now includes these Q&As (`json-ld.test.ts` updated).
- `docs/TASKS.md` Phase 0 items checked off for check-in/out, cancellation, parking, Wi-Fi, and meals.

### Why

Owner confirmed these policies on 25 August 2026 (`BUSINESS_INFO.md`). Schema and on-page FAQs must only use answers we can stand behind — no more `TodoNotice` for settled facts.

### Rejected

- Softening cancellation copy into vague “contact us” language.

---

## 2026-08-25 — Live occupancy rates seeded and published

### What

- `scripts/seed.ts` now upserts owner-confirmed nightly rates (INR): 2→2000, 3→2500, 4→3000, 6→4000, 8→5000; `extraBedRateInr: 500` (per person per night); `max_occupancy: 8`; `is_published: true`. Re-runs update an existing room and occupancy rows.
- Local DB re-seeded; `GET /api/pricing` returns the five rates + extra bed (no “rates not published” 404 when data is live).
- Booking widget fail-closed copy updated: temporary unavailability / WhatsApp enquire — not “rates are not published yet.”
- `src/lib/db.ts` uses `pg` (node-postgres) so seed and the Node.js app share one TCP driver (Neon or local Postgres). Auth middleware split onto `auth.config.ts` so Edge middleware does not import `pg`.
- `docs/DATABASE.md` seed + public JSON examples updated to the live numbers.

### Why

Owner confirmed the tariff ladder on 25 August 2026 (`BUSINESS_INFO.md`). Public widget and JSON-LD offers need published DB rows, not enquire-only placeholders.

### Rejected

- Hardcoding these rupees in React components (still forbidden; `no-hardcoded-prices.test.ts` must pass).
- Inventing rates for 1 / 5 / 7 guests (still open on the checklist).

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
