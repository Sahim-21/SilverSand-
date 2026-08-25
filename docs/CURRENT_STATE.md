# Current state

**Date of this snapshot:** 25 August 2026  
**Phase:** 2 code complete for booking, SEO, and the **production deploy runbook**. Remaining: **live** Vercel project + Neon + DNS (owner dashboards — not provisioned from this environment).

## What exists

| Area                              | Status                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Documentation                     | Complete — `START_HERE.md` + files under `docs/` including **`DEPLOYMENT.md`**                                                                                                                                                                                                                                                                                                                               |
| Cursor rules                      | `.cursor/rules/` (silver-sand, pricing, docs)                                                                                                                                                                                                                                                                                                                                                                |
| Next.js App Router app            | Scaffolded — TypeScript, Tailwind 4, token-based UI primitives                                                                                                                                                                                                                                                                                                                                               |
| Design system                     | Tokens in `globals.css`; layout + primitives; rendered at **`/style-guide`** (`noindex`)                                                                                                                                                                                                                                                                                                                     |
| Public pages                      | Home (full section stack), `/rooms`, `/rooms/deluxe-ac-room`, `/gallery`, `/about`, `/location`, `/contact`, Privacy, Terms                                                                                                                                                                                                                                                                                  |
| Marketing sections                | Reusable components under `src/components/sections/` and `src/components/marketing/`                                                                                                                                                                                                                                                                                                                         |
| Admin                             | `/admin/login`, `/admin` — JWT + `admin_users`. **Production:** HTTPS Secure cookies, preview lock, local-dev password rejected                                                                                                                                                                                                                                                                              |
| API                               | `GET /api/pricing`, `PATCH /api/admin/pricing`, Auth.js routes                                                                                                                                                                                                                                                                                                                                               |
| Database schema                   | Drizzle — `rooms`, `occupancy_prices`, `admin_users`, `price_audit_log`                                                                                                                                                                                                                                                                                                                                      |
| Seed script                       | `scripts/seed.ts` — published Deluxe AC Room + owner occupancy ₹ (2/3/4/6/8) + extra bed ₹500 + admin user                                                                                                                                                                                                                                                                                                   |
| Tooling                           | `lint`, `typecheck`, `format`, `format:check`, `db:*`, GitHub Actions CI                                                                                                                                                                                                                                                                                                                                     |
| `.env.example`                    | All required variables documented, including Neon pooled vs `DATABASE_URL_UNPOOLED`                                                                                                                                                                                                                                                                                                                          |
| Booking widget                    | Dates first (check-out after check-in, checkout disabled until check-in). Live nightly estimate from `GET /api/pricing` as occupancy/extra beds change; stay total after dates. Extra beds capped at 8 guests total.                                                                                                                                                                                         |
| Admin login                       | `/admin/login` — Auth.js Credentials + JWT session cookie, rate limiting, constant-time compare, design-system form                                                                                                                                                                                                                                                                                          |
| Admin dashboard                   | `/admin` — server-loaded prices, per-field validation, dirty tracking, IST timestamp, published badge, Sign out                                                                                                                                                                                                                                                                                              |
| Hardcoded-price guardrail         | `npm test` scans `src/` for literal occupancy/extra-bed rupees; admin write + public read share `rooms` / `occupancy_prices`                                                                                                                                                                                                                                                                                 |
| Technical SEO                     | Unique titles/descriptions, canonicals, OG+Twitter, sitemap+robots, 404, breadcrumbs, JSON-LD (known fields only), alt on every photo frame                                                                                                                                                                                                                                                                  |
| `getAdminPricing()`               | Server-only admin fetch — no `is_published` gate, no tag cache                                                                                                                                                                                                                                                                                                                                               |
| Production DB connection          | `src/lib/db-pool.ts` — TLS on non-localhost URLs; `max: 1` on Vercel; drizzle-kit prefers `DATABASE_URL_UNPOOLED`                                                                                                                                                                                                                                                                                            |
| Vercel region                     | `vercel.json` → Functions **`sin1`** (Singapore), next to Neon `aws-ap-southeast-1`                                                                                                                                                                                                                                                                                                                          |
| Domain `silversandhomestay.com`   | Intended canonical apex. **DNS / Vercel domain / Neon project: not live.** Steps in `DEPLOYMENT.md`.                                                                                                                                                                                                                                                                                                         |
| Owner occupancy rates (2/3/4/6/8) | **In seed and admin** — 2000 / 2500 / 3000 / 4000 / 5000 INR/night; extra bed ₹500; cap 8 guests                                                                                                                                                                                                                                                                                                             |
| Address, photos, amenities, GBP   | Address + map live. **Room occupancy photos live** (`public/Rooms/`). **Nearby attraction photos live** (`public/tourist_places/` including Yana). Exterior photos still missing. The Deluxe AC Room **has a bathroom** (photos of it still missing). **1 km from Murudeshwar bus stand**. GST included. ID required at check-in. Public copy is guest-facing (no `TodoNotice`, no developer-note phrasing). |

## How to run locally

1. Copy `.env.example` → `.env.local` and fill `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
2. `npm install`
3. `npm run db:push` then `npm run db:seed`
4. `npm run dev` → http://localhost:43123
5. Owner admin → http://localhost:43123/admin/login

Production redeploy (second developer): **`docs/DEPLOYMENT.md`**.

## Single source of truth for prices

```
Owner → /admin login → dashboard → edit occupancy + extra-bed rates
     → Postgres → GET /api/pricing (tag: pricing)
     → public pages / booking widget → WhatsApp estimate
```

Rates are **not** hardcoded in React. Until the five occupancy tiers are published in Postgres, `GET /api/pricing` returns 404 and the site shows enquire-only CTAs without ₹ totals. Seed writes the owner-confirmed rates and sets `is_published: true`.

## Deployment status (honest)

| Item                                                           | Status                                                            |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| Runbook (`DEPLOYMENT.md`), env names, Hobby + Neon Free choice | **Done**                                                          |
| `vercel.json` region `sin1`; Neon region recorded as Singapore | **Done** (code/docs)                                              |
| Production Pool TLS + serverless `max: 1`                      | **Done**                                                          |
| Vercel project linked to git                                   | **Not done** — no Vercel token in this environment                |
| Neon production database created                               | **Not done** — no Neon token; local `DATABASE_URL` is `localhost` |
| `silversandhomestay.com` DNS + TLS                             | **Not done** — registrar/DNS is an owner action                   |
| Site serving guests at the apex hostname                       | **Not live**                                                      |

## Blockers before public launch

1. Owner (or first developer) completes first-time Neon + Vercel + DNS steps in `DEPLOYMENT.md`.
2. Exterior photographs. Bathroom **amenity** is confirmed; bathroom **photos** are still missing. Other landmark distances (beach, temple, railway) unpublished — bus stand is 1 km.
3. GBP / Search Console (Phase 3) — not required for the first HTTPS response, required for local SEO.
