# Architecture

Silver Sand Beach Homestay — `silversandhomestay.com`.

This file holds the stack recommendation (section B), the system design (section C), the sitemap (section D), and a short map of the admin pricing flow (full end-to-end in `DATABASE.md`).

**Non-negotiables**

- Occupancy prices and extra-bed rate are **never** hardcoded in the frontend.
- The owner’s admin panel is the **only** editor for those numbers.
- Everything else is static in the codebase.
- No CMS, no PMS, no OTA sync.

---

## B. Recommended tech stack

### What the stack must do well

| Need                       | Why it matters here                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| SEO                        | Primary acquisition is Google for “homestay in Murudeshwar” and close variants. SSR/SSG and clean HTML beat a client-only SPA. |
| Load speed                 | Mobile visitors on coastal 4G; photos will dominate weight.                                                                    |
| Tiny dynamic surface       | One room type, a handful of INR fields, one editor.                                                                            |
| Secure admin               | One owner, one login, money-adjacent numbers.                                                                                  |
| Low operating cost         | A single homestay, not a SaaS.                                                                                                 |
| Second developer in Cursor | TypeScript + a boring folder layout, documented in this repo.                                                                  |

### Option 1 — Next.js App Router + Postgres (recommended)

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **Data:** Postgres (Neon or equivalent serverless). Drizzle ORM.
- **Auth:** Auth.js (Auth.js / NextAuth) credentials provider, one user, database session.
- **Hosting:** Vercel (site + Route Handlers) + Neon.

**Fit:** Server Components fetch prices on the server so the public HTML can include the current rate without shipping a CMS. `revalidatePath` / `revalidateTag` after admin save keeps pages fresh. Metadata API, `sitemap.ts`, JSON-LD are first-class. Cursor and a second JS/TS developer can work without a new language.

**Cost:** Hobby/Pro Vercel + Neon free/launch tier is enough. No WordPress hosting tax.

**Risk:** Next.js moves fast; pin the version and do not adopt experimental APIs without a changelog note.

### Option 2 — Astro (static) + a tiny API

- **Frontend:** Astro, mostly `.astro` pages, island for the booking widget.
- **Data:** Cloudflare D1 or Neon, Hono worker for `GET/PATCH /pricing` and admin.

**Fit:** Excellent default HTML/CSS performance and a smaller JS diet. SEO is strong.

**Cost:** Cloudflare is cheap.

**Why not first:** Two runtimes (static site + worker), two dashboards, and auth on a Worker is more glue. A second developer must learn Astro islands _and_ the API project. The booking widget is interactive enough that you still need a serious client island — the “static site” win shrinks.

### Option 3 — WordPress + ACF (rejected for this brief)

Custom post types and a tariff plugin would make prices editable.

**Why not:** The brief forbids a CMS. WordPress is a CMS whether or not you lock the rest of the admin. Plugin/PHP attack surface, slower default pages, and a second developer in Cursor is weaker than a TypeScript repo.

### Decision

**Pick Option 1: Next.js App Router + TypeScript + Tailwind + shadcn/ui + Postgres (Neon) + Drizzle + Auth.js + Vercel.**

Justification against the brief’s criteria:

- **SEO:** SSR/SSG, metadata, sitemap, structured data without a separate prerender pipeline.
- **Load speed:** Server-rendered booking numbers; images via `next/image`; shadcn does not require a heavy runtime kit. Keep JS to the widget, not the whole page.
- **Simple dynamic pricing only:** One `GET` and one authenticated `PATCH`. No headless CMS.
- **Secure admin auth:** Session cookies, no public signup, `robots.txt` + `noindex` on `/admin`.
- **Low operating cost:** Two managed services, both with free/low tiers.
- **Cursor / second developer:** One language, App Router conventions, docs in `/docs`. shadcn is the primitive library (Button, Input, Dialog, Form, Table, Calendar) — do not add a second component kit.

Do not add Prisma _and_ Drizzle, Redux, a hotel booking SaaS, or a visual page builder.

---

## C. Full architecture

### Context diagram

```
Guest (mobile/desktop)
    │
    ▼
Next.js (Vercel)  ── static pages, images, JSON-LD
    │
    ├── Server Components ── SELECT occupancy_prices
    ├── Booking widget (client) ── GET /api/pricing  ── live estimate
    └── WhatsApp / tel: links (no booking write to our DB)
            │
Owner ──► /admin (noindex)
            │  Auth.js credentials + DB session
            ▼
         PATCH /api/admin/pricing
            │
            ▼
         Postgres (Neon)
            └── price_audit_log
```

Guests never create records. A WhatsApp click is the “booking”. That is intentional: the owner already works on +91 99862 22892; we do not build a second inbox.

### Frontend

- **App Router** under `src/app/`.
- **Route groups:** `(public)` for marketing pages; `(admin)` for `/admin`.
- **Booking widget:** client component. Inputs: check-in, check-out, occupancy (published tiers 2/3/4/6/8), extra beds. Output: nights × (tier rate + extra beds × extra-bed rate). Copy: “Estimate only — we confirm on WhatsApp.”
- **Primary CTA:** one prominent button, label **Check Availability on WhatsApp**, `https://wa.me/919986222892?text=...` (use the canonical formatted number without spaces).
- **Secondary CTA:** `tel:+919986222892`.
- **No** “Add another room type” (Dandeli Inn pattern) unless the owner later confirms multiple _types_.
- **No** room-quantity stepper unless the owner confirms multiple _units_ of Deluxe AC.
- Prices displayed on the room page come from the same fetch as the widget, never from a constant in the component file.

Inspiration from `dandeliinn.com` (concept only): room/guest control, date range, live estimated total, single WhatsApp availability CTA. Do not copy layout, palette, lodge features, or Dandeli sightseeing.

### Backend / API

Keep the API surface small.

| Method  | Path                 | Auth          | Purpose                                                                                |
| ------- | -------------------- | ------------- | -------------------------------------------------------------------------------------- |
| `GET`   | `/api/pricing`       | public        | Current room, occupancy rates, extra-bed rate, currency, `updatedAt`                   |
| `PATCH` | `/api/admin/pricing` | admin session | Replace occupancy rates + extra-bed rate; write audit rows; `revalidateTag('pricing')` |
| `POST`  | `/api/auth/*`        | Auth.js       | Login / logout                                                                         |

No `POST /api/bookings`. Optional later: a server log of WhatsApp clicks (date, occupancy) — not required for v1.

Validate with Zod: occupancy keys must be exactly `{2,3,4,6,8}`; rates positive integers (paise or whole INR — **use integer INR rupees**, not floats); extra-bed ≥ 0.

### Database

Postgres. Schema in `DATABASE.md`. One `rooms` row for Deluxe AC. Child `occupancy_prices`. `admin_users`. `price_audit_log`.

No tables for pages, media, menus, guests, or invoices.

### Auth

- **One owner account**, created by seed or CLI, not a register form.
- **Auth.js Credentials** + bcrypt (or Argon2) password hash.
- **Database sessions** (or JWT in an httpOnly cookie — prefer DB sessions so logout is real).
- Lockouts / rate limit on `/admin` login (middleware or provider).
- 2FA is optional v1 (nice later); HTTPS is mandatory.
- Env: `AUTH_SECRET`, `DATABASE_URL`, `ADMIN_EMAIL` (seed only). Never `NEXT_PUBLIC_` for prices.

Forgot-password: v1 can be “SSH / dashboard reset hash”. Document it. Do not build email recovery until there is a real transactional mailer.

### Admin

URL: `/admin` and `/admin/login`.

Screens (v1, only these):

1. Login
2. Dashboard: one card, “Deluxe AC Room”, table of occupancy → ₹ / night, extra-bed field, last updated
3. Save (disabled until dirty). Success = “Live on the public site.”

No WYSIWYG, no image upload, no “pages”.

### Caching

- Tag public pricing reads with `pricing`.
- After PATCH, `revalidateTag('pricing')` so Home and Room update without a rebuild.
- Do not ISR-cache prices for hours; a homestay owner expects the new rate on the next refresh.

### Deployment

| Piece   | Where                                                                                                                                                          |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App     | Vercel, project bound to this git repo                                                                                                                         |
| DB      | Neon (or Vercel Postgres) in `ap-southeast-1` / `ap-south-1` if available — pick the region closest to India that the vendor offers and record it in CHANGELOG |
| Domain  | `silversandhomestay.com` + `www` → Vercel                                                                                                                      |
| TLS     | Vercel default                                                                                                                                                 |
| Backups | Neon point-in-time; do not store prices only in Vercel’s ephemeral FS                                                                                          |
| Env     | Vercel project settings, never committed                                                                                                                       |

Preview deployments: admin must not be usable with production credentials. Use a separate Neon branch or disable admin on Preview.

### Observability (minimal)

- Vercel logs for 5xx and auth failures.
- Do not install a full APM in v1.

### What we explicitly do not architect

Channel manager, Stripe/Razorpay checkout, guest CRM, multi-language CMS, AI chat, Google Hotel Center feed. Direct WhatsApp is the product.

---

## D. Sitemap

No thin doorway pages. A URL earns its keep with distinct intent and facts we actually have.

### Must-have (v1)

| URL                | Intent                                                    | Notes                                                                                  |
| ------------------ | --------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `/`                | “Homestay in Murudeshwar” — choose this stay, start dates | Hero, proof we can legally show, booking widget, WhatsApp + call, honest location line |
| `/rooms/deluxe-ac` | Evaluate the one room                                     | Layout, occupancy pricing (from DB), extra bed, photos, widget                         |
| `/contact`         | Call / WhatsApp / later map                               | NAP once address exists                                                                |
| `/privacy`         | Trust / WhatsApp prefill                                  | Short, real                                                                            |
| `/terms`           | House rules we actually have                              | Do not paste a hotel TOS template                                                      |

`/rooms` as a listing page is optional in v1 (only one type). Prefer redirect `/rooms` → `/rooms/deluxe-ac` rather than a fake catalog.

### Recommended (v1.1, after facts exist)

| URL            | Intent                                         | Distinct from Home?                                        |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| `/about`       | Who hosts, what “homestay” means here          | Yes — people and house, not rates                          |
| `/murudeshwar` | Plan the trip, how to reach **this** pin       | Yes — transport + local orientation. Not a Wikipedia dump. |
| `/faq`         | Objections: parking, food, check-in, extra bed | Only Qs we can answer                                      |

### Future SEO / content (only with unique substance)

| URL                                | Opportunity                                                                    | Guardrail                                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `/rooms-in-murudeshwar`            | User SERP for **“rooms in murudeshwar”** showed OTAs, not local homestay sites | Write as _our_ rooms in Murudeshwar + how occupancy pricing works + when to pick 4 vs 6 vs 8. Do **not** scrape a city-wide hotel list.      |
| `/homestay-near-murudeshwar-beach` | Matches a stated target keyword                                                | **Blocked** until beach distance is known. Then it must add beach-specific practicality (sand, parking, walk vs auto), not a duplicate Home. |
| `/family-homestay-murudeshwar`     | 6/8 occupancy is a real differentiator if the room actually sleeps that many   | Blocked until layout is confirmed.                                                                                                           |
| `/how-to-reach-murudeshwar`        | Can merge with `/murudeshwar` if thin                                          | Do not split until there is enough unique text.                                                                                              |

**Do not create:** `/affordable-homestay-in-murudeshwar`, `/best-homestay-in-murudeshwar`, `/homestay-in-murdeshwar` (spelling variant) as separate pages. Those are title/H1/FAQ jobs on existing URLs, plus `hreflang` is irrelevant (one language). Spelling variants belong in body copy and GBP, not extra routes.

### Out of sitemap

- `/admin`, `/admin/*` — `noindex`, omit from `sitemap.ts`
- `/style-guide` — internal design reference, `noindex`
- API routes

### Internal linking (minimum)

See `SEO_STRATEGY.md` for the full map. Architecture rule: every public page can reach the booking widget or `/rooms/deluxe-ac` in one click; footer NAP + WhatsApp on all public pages.

---

## Admin pricing flow (index)

Owner → Login → Dashboard → Edit price → DB → public site.

Detailed sequence, validation, audit, and failure modes: **`DATABASE.md`**.

Implementation rule: the public widget may cache in memory for a few seconds; it must not ship a fallback constant like `const RATE_2 = 2000`.
