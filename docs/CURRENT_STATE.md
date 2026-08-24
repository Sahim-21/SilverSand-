# Current state

**Date of this snapshot:** 24 August 2026  
**Phase:** 1 complete — **project scaffold + design system**. Phase 2 feature work (interactive booking widget, JSON-LD, launch) is next.

## What exists

| Area                              | Status                                                                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| Documentation (10 files)          | Complete — `START_HERE.md` + nine files under `docs/`                                    |
| Cursor rules                      | `.cursor/rules/` (silver-sand, pricing, docs)                                            |
| Next.js App Router app            | Scaffolded — TypeScript, Tailwind 4, token-based UI primitives                           |
| Design system                     | Tokens in `globals.css`; layout + primitives; rendered at **`/style-guide`** (`noindex`) |
| Public pages                      | Home, Deluxe AC Room, Contact, Privacy, Terms (`(public)` route group)                   |
| Admin                             | `/admin/login`, `/admin` pricing dashboard (JWT + `admin_users`)                         |
| API                               | `GET /api/pricing`, `PATCH /api/admin/pricing`, Auth.js routes                           |
| Database schema                   | Drizzle — `rooms`, `occupancy_prices`, `admin_users`, `price_audit_log`                  |
| Seed script                       | `scripts/seed.ts` — room (unpublished) + admin; **no occupancy ₹ invented**              |
| Tooling                           | `lint`, `typecheck`, `format`, `format:check`, `db:*`, GitHub Actions CI                 |
| `.env.example`                    | All required variables documented                                                        |
| Booking widget                    | Dark mangrove placeholder — WhatsApp/call CTAs; interactive dates/estimate not built yet |
| Domain `silversandhomestay.com`   | Intended. DNS not configured in this repo.                                               |
| Owner occupancy rates (2/3/4/6/8) | **Still missing** — room stays `is_published: false` until owner saves rates in admin    |
| Address, photos, amenities, GBP   | **Missing** — copy is conservative; `PhotoFrame` empty states, no stock photos           |

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
     → public pages / future booking widget → WhatsApp estimate
```

Rates are **not** hardcoded in React. Until the owner enters all five occupancy tiers, `GET /api/pricing` returns 404 and the site shows enquire-only CTAs without ₹ totals.

## Blockers before public launch

1. Occupancy rates from the owner (or deliberate enquire-only mode).
2. Interactive booking widget (dates, occupancy, live estimate, WhatsApp prefill).
3. Address or map pin, real photos, honest amenities/policies.
4. Domain DNS → Vercel (or chosen host).
5. `LodgingBusiness` JSON-LD only when geo/address are confirmed.
