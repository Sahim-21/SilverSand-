# Development rules

Rules for humans and for Cursor. If a rule here conflicts with a convenience, this file wins. Architecture changes need an explicit ask.

---

## Before any significant change

1. Read `START_HERE.md`.
2. Read `docs/CURRENT_STATE.md`, `docs/BUSINESS_INFO.md`, and the doc that owns the area (`ARCHITECTURE`, `DATABASE`, `SEO_STRATEGY`, `DESIGN_SYSTEM`).
3. If the change is not a tiny bugfix, read `docs/TASKS.md` and work from a listed item.

---

## Preserve architecture

- Next.js App Router + Postgres + Drizzle + Auth.js + Vercel, as in `ARCHITECTURE.md`.
- One dynamic domain: **pricing**.
- Public conversion: **WhatsApp + phone**, not a bookings table.
- Ask before: adding a CMS, a second database, a second UI kit, a payment gateway, iCal/OTA sync, seasonal pricing, a new room type, or replacing Auth.js.

---

## Only pricing is dynamic

| Dynamic (DB, owner admin) | Static (repo) |
| --- | --- |
| Occupancy nightly rates (2/3/4/6/8) | All page copy |
| Extra-bed rate | Layout, nav, design tokens |
| `is_published` / `updated_at` | Images, SEO body, FAQ answers |
| Admin password hash | Phone number, domain, WhatsApp URL **as published facts** (change via PR if the owner’s number changes — it is not a CMS field in v1) |

Phone lives in one config module (e.g. `src/lib/business.ts`) sourced from documented facts — **not** in the pricing table. That is still not owner-editable from the panel.

**Forbidden:** `const PRICE_2_SHARING = 1999` in a React file; Markdown price tables that the widget reads; `NEXT_PUBLIC_RATE_2`; duplicating rates in JSON imported by the client “just for SSR fallback”.

Allowed: database seed **from owner-supplied numbers**; TypeScript **types** for occupancy `2 | 3 | 4 | 6 | 8`.

---

## No CMS

Do not add Sanity, Strapi, Payload, WordPress, Contentful, or “make the about page editable”. If the owner wants a copy change, it is a git change.

---

## Facts: do not invent

If it is not in `docs/BUSINESS_INFO.md` as a **confirmed** fact, do not put it on the site as truth. That includes:

- Street address, GPS, “X minutes from the beach/temple”
- Wi-Fi, parking, meals, check-in times, cancellation
- Review quotes and star ratings
- Occupancy prices

OTA pages (EaseMyTrip, Casai, etc.) that mention Silver Sand are **leads to verify**, not sources of truth.

---

## SEO

- Follow `docs/SEO_STRATEGY.md`.
- No doorway pages, no fake `Hotel` schema, no fabricated `AggregateRating`.
- Use `LodgingBusiness` / `BedAndBreakfast` + `Accommodation` with only known properties.
- `/admin` stays out of the sitemap and is `noindex`.

---

## Dependencies

- Default UI primitives: **shadcn/ui** only.
- Do not add a library for something the platform already does (date math: a few lines; WhatsApp: `wa.me` URL).
- New dependency = a `CHANGELOG.md` line that says **why**.

---

## Scope hygiene

- Do not reformat unrelated files.
- Do not drive-by rename the design tokens.
- Do not “improve” competitor copy into our pages.

---

## Booking widget honesty

- Label totals as **estimates**.
- WhatsApp message must include dates (if chosen), occupancy, extra beds, estimate (if computed), room name.
- If pricing cannot be loaded, **do not** show a leftover ₹ from the last build.

---

## After significant work

Update, in the same PR/commit batch:

1. `docs/CURRENT_STATE.md` — what is true now  
2. `docs/TASKS.md` — checkboxes  
3. `docs/CHANGELOG.md` — **what and why**  
4. `docs/BUSINESS_INFO.md` — if the owner supplied a new fact  

---

## Ask first

Major architecture, a second room type, payments, a blog engine, or publishing a beach-distance claim without a pin.
