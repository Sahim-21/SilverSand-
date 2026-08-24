# Tasks

Phased. Check a box only when the work is in the repo (or the owner has given the fact). Do not skip Phase 0 facts that the matching page would have to invent.

---

## Phase 0 — Owner facts (blocks honest copy and pricing)

- [ ] Occupancy nightly rates for **2, 3, 4, 6, 8** sharing (INR, per room per night unless owner says otherwise)
- [ ] Confirm extra bed is **₹500 per person per night** (not per stay) and the **maximum extra beds**
- [ ] Pricing rule for **5 and 7** guests (and for 1 guest, if allowed)
- [ ] One physical Deluxe AC **unit** vs several units of the same type
- [ ] Bed and bathroom layout (beds, extra mattresses, attached bath, hot water)
- [ ] Full postal address + PIN
- [ ] Exact map coordinates (or a Google Maps pin the owner owns)
- [ ] Walking/driving distance to Murudeshwar Beach, Murudeshwar Temple, bus stand, railway station — **owner-measured or maps-measured from the confirmed pin**, not guessed
- [ ] Real photographs (exterior, room, bath, view) with permission to use
- [ ] Check-in / check-out times
- [ ] Cancellation / advance-payment policy
- [ ] Parking (car / two-wheeler, on-site vs street)
- [ ] Wi-Fi (yes/no, where)
- [ ] Meals (none / on request / included) — do not assume homestay food
- [ ] GST / tax: rates on site inclusive or exclusive
- [ ] Genuine reviews to feature (Google URLs or written permission) — **do not fabricate**
- [ ] Google Business Profile: exists? owner access? categories? photos?
- [ ] Domain: registrar login, DNS, SSL
- [ ] Legal name / homestay registration if they want it on the site
- [ ] Owner display name for “hosted by”
- [ ] Languages spoken
- [ ] Unmarried couples / ID rules if they want them stated

Full checklist with why each item matters: `BUSINESS_INFO.md`.

---

## Phase 1 — Documentation (this phase)

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

## Phase 2 — Implementation slice (only after Phase 0 minimum: rates + unit count)

Must ship a **usable** booking path, not a platform.

- [ ] Fresh Next.js App Router + TypeScript + Tailwind + shadcn/ui scaffold (do not reuse leftover demo branding)
- [ ] Postgres + Drizzle schema for `rooms`, `occupancy_prices`, `admin_users`, `price_audit_log`
- [ ] Seed: one room row; occupancy prices **from owner**; extra bed ₹500 (or owner correction)
- [ ] Auth: single owner, credentials, httpOnly session, no public registration
- [ ] `GET` pricing for the public site (no secrets)
- [ ] Admin: login → dashboard → edit rates → save → revalidate public pages
- [ ] Public booking widget: occupancy (or guest count mapped to a published tier), extra beds, date range, **live estimate**, primary CTA **Check Availability on WhatsApp**, secondary **Call**
- [ ] Estimate labelled as estimate; WhatsApp message includes dates, guests, extra beds, estimate, room name
- [ ] Must-have pages: Home, Deluxe AC Room, Contact, Privacy, Terms
- [ ] Technical SEO baseline: metadata, canonical, sitemap.xml, robots.txt, OG image, `LodgingBusiness` + `Accommodation` JSON-LD **only with known facts**
- [ ] `noindex` on `/admin` and API error pages
- [ ] Mobile layout for the booking widget (thumb-reachable WhatsApp CTA)
- [ ] README: how to run locally, env vars, how owner prices are edited
- [ ] Update `CURRENT_STATE.md`, this file, and `CHANGELOG.md`

---

## Phase 3 — Recommended pages and local SEO (after must-have pages are truthful)

- [ ] About the homestay (family/host story — from owner, not invented)
- [ ] Murudeshwar guide / how to reach (useful, not a doorway)
- [ ] FAQ (only answered questions)
- [ ] NAP consistency: site, WhatsApp about, GBP, listed directories
- [ ] GBP setup or cleanup (categories, photos, products/services, WhatsApp, booking link = this site)
- [ ] Search Console + Bing Webmaster
- [ ] Real photo `alt` text; compressed images
- [ ] Optional: Google review deep-link, not scraped fake testimonials

---

## Phase 4 — Future SEO pages (only with unique substance)

Do not build these as thin keyword URLs.

- [ ] `rooms-in-murudeshwar` — **content-gap page** (user SERP: this query showed OTAs, not local homestays). Must explain *this* room, occupancy pricing, who it suits, how to book direct. Not a fake city-wide inventory.
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
