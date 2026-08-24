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

## Scripts

| Command                           | Purpose                            |
| --------------------------------- | ---------------------------------- |
| `npm run dev`                     | Dev server (port 43123)            |
| `npm run build`                   | Production build                   |
| `npm run lint`                    | ESLint                             |
| `npm run typecheck`               | `tsc --noEmit`                     |
| `npm run format` / `format:check` | Prettier                           |
| `npm run db:push`                 | Push Drizzle schema to Postgres    |
| `npm test`                        | Estimate + WhatsApp message tests  |

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
