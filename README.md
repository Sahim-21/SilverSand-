# Silver Sand Beach Homestay

Direct-booking website for **Silver Sand Beach Homestay**, Murudeshwar, Karnataka (`silversandhomestay.com`).

Guests pick occupancy and dates, see a **live estimate from the owner’s prices**, and tap **Check Availability on WhatsApp** (or call). Occupancy rates are not hardcoded — the owner edits them in `/admin`.

## Quick start

```bash
cp .env.example .env.local
# Edit DATABASE_URL, AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

npm install
npm run db:push
npm run db:seed
npm run dev
```

- Site: http://localhost:43123
- Admin: http://localhost:43123/admin/login

After seeding, log in and enter all five occupancy rates (2/3/4/6/8) plus extra-bed ₹. The room is unpublished until you save valid rates.

## Production auth (Vercel Production)

Set these in the Vercel project (Production environment only — not Preview):

| Variable                         | Value                                                           |
| -------------------------------- | --------------------------------------------------------------- |
| `DATABASE_URL`                   | Production Neon (not the local `ci` database)                   |
| `AUTH_SECRET`                    | `openssl rand -base64 32` — not the local CI placeholder        |
| `AUTH_URL`                       | `https://silversandhomestay.com`                                |
| `NEXT_PUBLIC_SITE_URL`           | `https://silversandhomestay.com`                                |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Owner login — seed once; **not** `local-dev-password-change-me` |

Preview deployments hide `/admin` unless `ALLOW_ADMIN_ON_PREVIEW=true` and the database is a non-production branch.

## Scripts

| Command                           | Purpose                                          |
| --------------------------------- | ------------------------------------------------ |
| `npm run dev`                     | Dev server (port 43123)                          |
| `npm run build`                   | Production build                                 |
| `npm run lint`                    | ESLint                                           |
| `npm run typecheck`               | `tsc --noEmit`                                   |
| `npm run format` / `format:check` | Prettier                                         |
| `npm run db:push`                 | Push Drizzle schema to Postgres                  |
| `npm test`                        | Estimate, WhatsApp, price-scanner, JSON-LD tests |

## Docs

Read **[START_HERE.md](./START_HERE.md)** first, then `docs/CURRENT_STATE.md` and `docs/TASKS.md`.

| File                                                     | Contents                            |
| -------------------------------------------------------- | ----------------------------------- |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)           | Stack, system design, sitemap       |
| [docs/DATABASE.md](./docs/DATABASE.md)                   | Pricing schema, admin flow          |
| [docs/SEO_STRATEGY.md](./docs/SEO_STRATEGY.md)           | Topics, local SEO, competitors      |
| [docs/BUSINESS_INFO.md](./docs/BUSINESS_INFO.md)         | Confirmed facts and owner checklist |
| [docs/DEVELOPMENT_RULES.md](./docs/DEVELOPMENT_RULES.md) | Hard rules for contributors         |

## Contact (confirmed)

WhatsApp / phone: **+91 99862 22892**
