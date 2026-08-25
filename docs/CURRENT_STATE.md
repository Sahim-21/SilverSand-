# Current state

**Date of this snapshot:** 25 August 2026  
**Phase:** 1 complete — scaffold + design system + marketing pages + booking widget + admin pricing panel + **technical SEO (metadata, sitemap/robots, JSON-LD, breadcrumbs)**. Remaining Phase 2 work: owner occupancy rates, deploy.

## What exists

| Area                              | Status                                                                                                                                          |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Documentation (10 files)          | Complete — `START_HERE.md` + nine files under `docs/`                                                                                           |
| Cursor rules                      | `.cursor/rules/` (silver-sand, pricing, docs)                                                                                                   |
| Next.js App Router app            | Scaffolded — TypeScript, Tailwind 4, token-based UI primitives                                                                                  |
| Design system                     | Tokens in `globals.css`; layout + primitives; rendered at **`/style-guide`** (`noindex`)                                                        |
| Public pages                      | Home (full section stack), `/rooms`, `/rooms/deluxe-ac-room`, `/gallery`, `/about`, `/location`, `/contact`, Privacy, Terms                     |
| Marketing sections                | Reusable components under `src/components/sections/` and `src/components/marketing/`                                                            |
| Admin                             | `/admin/login`, `/admin` pricing dashboard (JWT + `admin_users`)                                                                                |
| API                               | `GET /api/pricing`, `PATCH /api/admin/pricing`, Auth.js routes                                                                                  |
| Database schema                   | Drizzle — `rooms`, `occupancy_prices`, `admin_users`, `price_audit_log`                                                                         |
| Seed script                       | `scripts/seed.ts` — room (unpublished) + admin; **no occupancy ₹ invented**                                                                     |
| Tooling                           | `lint`, `typecheck`, `format`, `format:check`, `db:*`, GitHub Actions CI                                                                        |
| `.env.example`                    | All required variables documented                                                                                                               |
| Booking widget                    | Interactive mangrove panel — occupancy dropdown, quantity, extra beds, dates, live estimate from `GET /api/pricing`, WhatsApp prefill + Call us |
| Admin login                       | `/admin/login` — Auth.js Credentials + JWT session cookie, rate limiting, constant-time compare, design-system form                             |
| Admin dashboard                   | `/admin` — server-loaded prices, per-field validation, dirty tracking, IST timestamp, published badge, Sign out                                 |
| Hardcoded-price guardrail         | `npm test` scans `src/` for literal occupancy/extra-bed rupees; admin write + public read share `rooms` / `occupancy_prices`                    |
| Technical SEO                     | Unique titles/descriptions, canonicals, OG+Twitter, sitemap+robots, 404, breadcrumbs, JSON-LD (known fields only), alt on every photo frame     |
| `getAdminPricing()`               | Server-only admin fetch — no `is_published` gate, no tag cache                                                                                  |
| Domain `silversandhomestay.com`   | Intended. DNS not configured in this repo.                                                                                                      |
| Owner occupancy rates (2/3/4/6/8) | **Still missing** — room stays `is_published: false` until owner saves rates in admin                                                           |
| Address, photos, amenities, GBP   | **Missing** — copy is conservative; `PhotoFrame` empty states, `TodoNotice` for gaps                                                            |

## How to run locally

1. Copy `.env.example` → `.env.local` and fill `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
2. `npm install`
3. `npm run db:push` then `npm run db:seed`
4. `npm run dev` → http://localhost:43123
5. Owner admin → http://localhost:43123/admin/login

## Single source of truth for prices

```
Owner → /admin login → dashboard → edit occupancy + extra-bed rates
     → Postgres → GET /api/pricing (tag: pricing)
     → public pages / booking widget → WhatsApp estimate
```

Rates are **not** hardcoded in React. Until the owner enters all five occupancy tiers, `GET /api/pricing` returns 404 and the site shows enquire-only CTAs without ₹ totals.

## Blockers before public launch

1. Occupancy rates from the owner (admin is ready to accept them).
2. Address or map pin, real photos, honest amenities/policies.
3. Domain DNS → Vercel (or chosen host).
4. Street address / map pin so `LodgingBusiness` can add `geo` and `streetAddress` (locality-only address is already in JSON-LD).
