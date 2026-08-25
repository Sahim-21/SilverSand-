# Tasks

Phased. Check a box only when the work is in the repo (or the owner has given the fact). Do not skip Phase 0 facts that the matching page would have to invent.

---

## Phase 0 — Owner facts (blocks honest copy and pricing)

- [x] Occupancy nightly rates for **2, 3, 4, 6, 8** sharing (INR, per room per night unless owner says otherwise)
- [x] Confirm extra bed is **₹500 per person per night** (not per stay) and the **maximum extra beds**
- [ ] Pricing rule for **5 and 7** guests (and for 1 guest, if allowed)
- [ ] One physical Deluxe AC **unit** vs several units of the same type
- [ ] Bed and bathroom layout (beds, extra mattresses, attached bath, hot water)
- [x] Full postal address + PIN — 1, Naveen Beach Rd, Murdeshwar, Mavalli, Karnataka 581350
- [x] Exact map coordinates (or a Google Maps pin the owner owns) — Place ID + Embed map; 14.1007798, 74.4874894
- [ ] Walking/driving distance to Murudeshwar Beach, Murudeshwar Temple, bus stand, railway station — **owner-measured or maps-measured from the confirmed pin**, not guessed
- [ ] Real photographs with permission to use — **homepage hero coast scene done** (`public/images/hero-murudeshwar-coast.jpg`); **Deluxe AC Room occupancy photos done** (`public/Rooms/` 2/3/4/6/8 sharing via `next/image`); exterior, bathroom, and other property photos still open
- [x] Homepage hero photograph (Murudeshwar coastal scene) — wired with `next/image` + mangrove overlay; not a property exterior shot
- [x] Check-in / check-out times
- [x] Cancellation / advance-payment policy — cancellation confirmed (non-refundable); advance payment method still open
- [x] Parking (car / two-wheeler, on-site vs street)
- [x] Wi-Fi (yes/no, where)
- [x] Meals (none / on request / included) — not included, not offered
- [ ] GST / tax: rates on site inclusive or exclusive
- [x] Genuine reviews — live Google Places API `reviews` on Home (Place ID in `BUSINESS_INFO.md`); do not fabricate or hardcode quotes
- [ ] Google Business Profile: exists? owner access? categories? photos?
- [ ] Domain: registrar login, DNS, SSL
- [ ] Legal name / homestay registration if they want it on the site
- [ ] Owner display name for “hosted by”
- [ ] Languages spoken
- [ ] Unmarried couples / ID rules if they want them stated

Full checklist with why each item matters: `BUSINESS_INFO.md`.

---

## Phase 1 — Documentation

- [x] Project understanding and constraints (`START_HERE.md`)
- [x] Tech stack comparison and pick (`ARCHITECTURE.md`)
- [x] Architecture: frontend, API, DB, auth, admin, deploy (`ARCHITECTURE.md`)
- [x] Sitemap: must-have / recommended / future (`ARCHITECTURE.md`)
- [x] SEO strategy + competitor analysis (`SEO_STRATEGY.md`)
- [x] Pricing schema (`DATABASE.md`)
- [x] Admin pricing flow (`DATABASE.md`, `ARCHITECTURE.md`)
- [x] Design system (`DESIGN_SYSTEM.md`)
- [x] Development rules (`DEVELOPMENT_RULES.md`)
- [x] Business facts file with no guessed fields (`BUSINESS_INFO.md`)
- [x] Cursor rules (`.cursor/rules/`)
- [x] Changelog started (`CHANGELOG.md`)

---

## Phase 1 — Project scaffold (complete)

- [x] Next.js App Router + TypeScript + Tailwind + shadcn-style UI
- [x] Drizzle schema: `rooms`, `occupancy_prices`, `admin_users`, `price_audit_log`
- [x] Seed script (unpublished room, admin user; no invented occupancy rates)
- [x] Auth.js Credentials → `admin_users` (JWT sessions)
- [x] `GET /api/pricing`, `PATCH /api/admin/pricing`
- [x] Admin login + pricing dashboard
- [x] Must-have public pages (honest placeholder copy)
- [x] `robots.ts`, `sitemap.ts`, `.env.example`, CI workflow
- [x] Lint / typecheck / format scripts
- [x] Booking widget (dates, occupancy, extra beds, live estimate, WhatsApp prefill)
- [x] Design system: tokens, primitives, layout, `/style-guide`
- [x] Marketing pages: Home (full section stack), `/rooms`, `/rooms/deluxe-ac-room`, `/gallery`, `/about`, `/location`, `/contact` — reusable section components; pricing from DB only

---

## Phase 2 — Booking widget and launch (in progress)

Must ship a **usable** booking path, not a platform.

- [x] Owner occupancy rates entered (Phase 0) and room published via admin
- [x] Interactive booking widget: dates, occupancy, extra beds, live estimate from API
- [x] WhatsApp prefill with dates, guests, estimate, room name
- [x] `LodgingBusiness` + `HotelRoom` JSON-LD **only with known facts** (`Offer` when rates are published; no geo/ratings)
- [x] Unique titles, canonicals, OG/Twitter, sitemap, robots, breadcrumbs, 404
- [ ] Deploy to Vercel + Neon; domain DNS
- [ ] README verified against production setup

---

## Phase 3 — Recommended pages and local SEO (after must-have pages are truthful)

- [x] About the homestay (family/host story — from owner, not invented) — `/about` with TODOs for missing host facts
- [ ] Murudeshwar guide / how to reach (useful, not a doorway) — partial on `/location`; dedicated `/murudeshwar` deferred
- [x] FAQ (only answered questions) — on Home; check-in, parking, Wi-Fi, and cancellation now answered; extra bed when rates published
- [ ] NAP consistency: site, WhatsApp about, GBP, listed directories
- [ ] GBP setup or cleanup (categories, photos, products/services, WhatsApp, booking link = this site)
- [ ] Search Console + Bing Webmaster
- [ ] Real photo `alt` text; compressed images
- [ ] Optional: Google review deep-link, not scraped fake testimonials

---

## Phase 4 — Future SEO pages (only with unique substance)

Do not build these as thin keyword URLs.

- [ ] `rooms-in-murudeshwar` — **content-gap page** (user SERP: this query showed OTAs, not local homestays). Must explain _this_ room, occupancy pricing, who it suits, how to book direct. Not a fake city-wide inventory.
- [ ] Homestay near Murudeshwar Beach — **only if** distance is known and the page is distinct from Home
- [ ] Affordable / family occupancy page — only if pricing and layout support the claim
- [ ] Netrani / temple day-trip companion pages — only if the host actually helps with those trips
- [ ] Request inclusion on `murudeshwar.co.in` “best homestays” roundup (outreach, not a page)

---

## Explicitly out of scope (do not tick by building them)

- [ ] ~~Owner CMS for pages, images, blog, nav~~
- [ ] ~~Channel manager / iCal / OTA sync~~
- [ ] ~~Online payment / instant confirmed booking~~
- [ ] ~~Multi-property or second room type~~
- [ ] ~~Seasonal rate engine, weekend modifiers, coupons~~ (revisit only if owner asks)
- [ ] ~~Guest accounts~~
- [ ] ~~Live remaining-room count~~
