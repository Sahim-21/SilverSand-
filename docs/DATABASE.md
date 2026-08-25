# Database

Postgres is the **single source of truth for prices**. The public site and the admin panel read and write the same rows. Marketing copy, photos, and nav are **not** in the database.

This file includes the room-pricing schema and the owner admin flow end to end.

---

## Principles

- One sellable **room type** in v1: Deluxe AC Room.
- Published occupancy tiers: **2, 3, 4, 6, 8** (integers). No other occupancy rows in v1.
- Extra bed is a **property of the room**, one INR amount, not a per-occupancy matrix (unless the owner later says otherwise).
- Amounts are **integer INR** (`NUMERIC(10,0)` or `INTEGER`). No floats.
- Every price change writes an **audit row**. Rates are money.
- No CMS tables.
- Production: Neon pooled `DATABASE_URL` for the app; `DATABASE_URL_UNPOOLED` for `drizzle-kit`. Full steps in **`DEPLOYMENT.md`**.

---

## G. Room-pricing schema

### ER overview

```
admin_users 1──* sessions (Auth.js)
rooms 1──* occupancy_prices
rooms 1──* price_audit_log
admin_users 1──* price_audit_log
```

### `rooms`

One row in v1.

| Column               | Type                                  | Notes                                                                                                                                                                   |
| -------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                 | `uuid` PK                             | Default `gen_random_uuid()`                                                                                                                                             |
| `slug`               | `text` UNIQUE NOT NULL                | `'deluxe-ac'`                                                                                                                                                           |
| `name`               | `text` NOT NULL                       | `'Deluxe AC Room'` — display name, not a CMS page                                                                                                                       |
| `max_occupancy`      | `smallint` NOT NULL                   | `8` until owner says otherwise                                                                                                                                          |
| `extra_bed_rate_inr` | `integer` NOT NULL                    | Owner-editable. Brief: `500`                                                                                                                                            |
| `extra_bed_label`    | `text` NOT NULL DEFAULT `'Extra bed'` | Not owner-editable in v1 UI if we want zero CMS creep; can stay in code instead. Prefer column only if admin must change label. **v1: keep label in code, rate in DB.** |
| `currency`           | `char(3)` NOT NULL DEFAULT `'INR'`    |                                                                                                                                                                         |
| `is_published`       | `boolean` NOT NULL DEFAULT `true`     | If false, public API returns 404/empty and widget shows “Call to enquire” with **no ₹**                                                                                 |
| `created_at`         | `timestamptz` NOT NULL                |                                                                                                                                                                         |
| `updated_at`         | `timestamptz` NOT NULL                |                                                                                                                                                                         |

Do **not** store check-in time, Wi-Fi, or photo URLs here. Those are static until the brief changes.

### `occupancy_prices`

| Column             | Type                                               | Notes                                  |
| ------------------ | -------------------------------------------------- | -------------------------------------- |
| `id`               | `uuid` PK                                          |                                        |
| `room_id`          | `uuid` NOT NULL FK → `rooms(id)` ON DELETE CASCADE |                                        |
| `occupancy`        | `smallint` NOT NULL                                | CHECK (`occupancy` IN (2, 3, 4, 6, 8)) |
| `nightly_rate_inr` | `integer` NOT NULL                                 | CHECK (`nightly_rate_inr` > 0)         |
| `updated_at`       | `timestamptz` NOT NULL                             |                                        |

**UNIQUE** (`room_id`, `occupancy`).

Exactly five rows per room in v1. Admin PATCH replaces all five in one transaction so the site never shows a mix of old 2-sharing and new 8-sharing.

### `admin_users`

| Column          | Type                     | Notes         |
| --------------- | ------------------------ | ------------- |
| `id`            | `uuid` PK                |               |
| `email`         | `citext` UNIQUE NOT NULL |               |
| `password_hash` | `text` NOT NULL          | bcrypt/argon2 |
| `created_at`    | `timestamptz` NOT NULL   |               |
| `last_login_at` | `timestamptz`            |               |

Auth.js will add `accounts` / `sessions` / `verification_tokens` if we use the Auth.js Prisma/Drizzle adapter. That is auth infrastructure, not a CMS.

### `price_audit_log`

| Column          | Type                                   | Notes                                                                               |
| --------------- | -------------------------------------- | ----------------------------------------------------------------------------------- |
| `id`            | `uuid` PK                              |                                                                                     |
| `room_id`       | `uuid` NOT NULL FK                     |                                                                                     |
| `actor_user_id` | `uuid` FK `admin_users`                |                                                                                     |
| `changed_at`    | `timestamptz` NOT NULL DEFAULT `now()` |                                                                                     |
| `payload`       | `jsonb` NOT NULL                       | `{ "before": { "extraBedRateInr": 500, "occupancy": { "2": … } }, "after": { … } }` |

v1 admin UI does not need a history screen. The table exists so a bad save is recoverable and a second developer can see why a rate changed.

### What is not modelled (on purpose)

| Idea                             | Why later / never                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| Seasonal / weekend rates         | Brief is occupancy + extra bed only                                                             |
| 5- and 7-person rows             | Owner has not defined the rule; handle in **application policy**, not extra rows, until they do |
| Multiple rooms / units inventory | Unknown unit count                                                                              |
| Taxes / GST %                    | Unknown; if later, add `tax_note` static copy first, not a tax engine                           |
| Coupons                          | Out of scope                                                                                    |
| Bookings table                   | Conversion is WhatsApp                                                                          |

### Application policy for unpublished occupancies (confirm with owner)

Until the owner writes a rule, **do not invent 5- and 7-person prices**. Widget UX:

- Guest count control offers **2, 3, 4, 6, 8** as the occupancy billed (matching the published ladder).
- Extra beds are a separate integer (0…max), each adding `extra_bed_rate_inr` per night.
- If a family of 5 arrives, they pick **4 sharing + 1 extra bed** or **6 sharing** — the UI should explain both options with **live numbers from the DB**, not hide one.

Document the owner’s choice in `BUSINESS_INFO.md` when given; then encode it in one function `estimateStay({ occupancy, extraBeds, nights, rates })`.

### Estimate formula (v1)

```
nights = dateDiff(checkout, checkin)   // reject checkout ≤ checkin
base   = occupancy_prices[occupancy].nightly_rate_inr
extra  = extraBeds * rooms.extra_bed_rate_inr
line   = quantity * base + extra       // extra beds are per enquiry line, not × quantity
total  = nights * line                 // sum across room-type lines
```

No GST unless owner supplies a rate. Label: “Estimate only, subject to availability.”

### Seed

- Insert `rooms` slug `deluxe-ac`, name `Deluxe AC Room`, `extra_bed_rate_inr = 500`, `max_occupancy = 8`, `is_published = true`.
- Insert five `occupancy_prices` with owner-confirmed nightly rates (INR): **2→2000, 3→2500, 4→3000, 6→4000, 8→5000** (source: `docs/BUSINESS_INFO.md`, 25 August 2026).
- Extra bed is **₹500 per person per night**; total guests (billed occupancy + extra beds) must not exceed `max_occupancy` (8). `estimateStay` / `priceEnquiryNightly` **clamp** extra beds to the remaining places (`maxExtraBeds` in `src/lib/pricing/guest-cap.ts`). Occupancy 8 → zero extra beds.
- Seed is **idempotent**: re-running updates the room, upserts the five occupancy rows, and leaves an existing admin user alone (`npm run db:seed`).

Do not invent rates or copy competitor tariffs. After seed, `GET /api/pricing` returns the published room + rates (not the “rates not published” 404).

### Public JSON shape (`GET /api/pricing`)

```json
{
  "room": {
    "slug": "deluxe-ac",
    "name": "Deluxe AC Room",
    "maxOccupancy": 8,
    "currency": "INR",
    "extraBedRateInr": 500
  },
  "occupancyRates": [
    { "occupancy": 2, "nightlyRateInr": 2000 },
    { "occupancy": 3, "nightlyRateInr": 2500 },
    { "occupancy": 4, "nightlyRateInr": 3000 },
    { "occupancy": 6, "nightlyRateInr": 4000 },
    { "occupancy": 8, "nightlyRateInr": 5000 }
  ],
  "updatedAt": "2026-08-25T00:00:00.000Z"
}
```

Amounts above match the owner-confirmed seed (25 August 2026). Public API still fail-closes (404 / enquire copy, **no invented ₹**) if `is_published` is false or any tier is missing / ≤ 0.

---

## H. Admin pricing flow (end to end)

### Actors

- **Owner:** the homestay operator, phone +91 99862 22892.
- **Public guest:** never authenticated.
- **Developer:** may seed and reset the owner password; does not change rates in code after go-live.

### Happy path

1. **Owner → Login**  
   Opens `https://silversandhomestay.com/admin/login` (bookmark). Enters email + password. Auth.js verifies hash, creates session cookie (`Secure`, `HttpOnly`, `SameSite=Lax`). `last_login_at` updates. Failed attempts are rate-limited.

2. **Login → Dashboard**  
   Server Component, session required. Loads the single `rooms` row + five `occupancy_prices`. Renders a table:

   | Sharing            | ₹ per night |
   | ------------------ | ----------- |
   | 2                  | [input]     |
   | 3                  | [input]     |
   | 4                  | [input]     |
   | 6                  | [input]     |
   | 8                  | [input]     |
   | Extra bed / person | [input]     |

   Shows `updated_at` in IST. No other widgets.

3. **Dashboard → Edit price**  
   Owner changes one or more integers. Client validates: all five occupancies present, all > 0, extra bed ≥ 0 (0 allowed if they stop offering extra beds). Save enabled.

4. **Edit → DB**  
   `PATCH /api/admin/pricing` with CSRF-safe session. Transaction:

   1. `SELECT … FOR UPDATE` the room.
   2. Snapshot `before` JSON.
   3. `UPDATE rooms SET extra_bed_rate_inr, updated_at`.
   4. `UPSERT` five occupancy rows.
   5. Insert `price_audit_log`.
   6. Commit.
   7. `revalidateTag('pricing')`.

5. **DB → public site**  
   Home, room page, and `GET /api/pricing` read committed rows. The booking widget’s next fetch (or RSC render) shows new ₹. WhatsApp prefill uses the **fetched** estimate, not a constant.

6. **Guest path (read-only)**  
   Guest sets dates + occupancy + extra beds → sees estimate → **Check Availability on WhatsApp**. No INSERT. Owner confirms availability in WhatsApp (human).

### Failure modes

| Case                      | Behaviour                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Wrong password            | Generic error; backoff                                                                                       |
| Partial occupancy payload | 400; no commit                                                                                               |
| DB down                   | Public: do not invent rates; show “Call or WhatsApp for today’s rate” + phone CTAs, **no stale hardcoded ₹** |
| Owner sets extra bed 0    | Allowed; widget hides extra-bed stepper or shows “not offered”                                               |
| `is_published = false`    | Same as DB down for ₹; still show the room photograph/copy if we have them                                   |
| Preview deploy            | Admin disabled or separate DB; never point at production rates with public auth                              |

### Security checklist (pricing)

- `/admin` `noindex, nofollow`
- Not in `sitemap.xml`
- Session cookie not readable by JS
- PATCH rejects occupancy keys other than 2,3,4,6,8 (no silent 5-person row)
- Audit log is append-only from the app’s perspective
- Developers do not commit `.env`

### How a second developer traces a wrong price on the site

1. Open `/admin` (or `SELECT * FROM occupancy_prices`).
2. Check `price_audit_log` for the last `after` payload.
3. Confirm `GET /api/pricing` matches.
4. If the widget disagrees, the bug is in `estimateStay` / `estimateEnquiry` — not a second price list in React.

---

## Audit: one write path, one read path (24 Aug 2026)

Scanned `src/` (excluding `*.test.ts`) for occupancy nightly rates, extra-bed rupee amounts, named `RATE_*` / `PRICE_*` fallbacks, and `₹` amounts in UI.

### What we found

| Location                                   | Amount                                                                           | Verdict                                                                                                                       |
| ------------------------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `scripts/seed.ts`                          | Occupancy 2000/2500/3000/4000/5000 + `extraBedRateInr: 500`, `isPublished: true` | **Allowed.** Owner-confirmed figures (25 Aug 2026), written into `rooms` / `occupancy_prices` at seed. Not imported by React. |
| `src/lib/pricing/estimate.test.ts`         | Fixture 2000/2500/3000/4000/5000 + extra 500                                     | **Allowed.** Unit-test math only; not shipped to the public UI.                                                               |
| `src/lib/booking/whatsapp-message.test.ts` | `₹4,500` as a formatted label argument                                           | **Allowed.** Asserts message formatting; the production builder never invents a total.                                        |
| Admin validation copy                      | `₹99,999` / `₹9,999`                                                             | **Allowed.** Upper bounds, not rack rates.                                                                                    |
| Style guide glyph row                      | `₹ 0 1 2 3 4 5 6 7 8 9`                                                          | **Allowed.** Type specimen, not a price.                                                                                      |

No occupancy nightly rate and no extra-bed rupee amount exist as a React default, JSX fallback, or `NEXT_PUBLIC_` env. Public components call `getPublicPricing()` / `GET /api/pricing` and render live ₹ when published; otherwise enquire copy / em dash (fail closed). Occupancy table fail-closes: `nightlyRateInr <= 0` → em dash; `extraBedRateInr <= 0` → “Not offered”.

### Same table, same columns

| Path        | Code                                                                                           | Table.column                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Admin save  | `PATCH /api/admin/pricing`                                                                     | `UPDATE rooms.extra_bed_rate_inr`; upsert `occupancy_prices.nightly_rate_inr` per occupancy 2/3/4/6/8; insert `price_audit_log` |
| Admin load  | `getAdminPricing()`                                                                            | `SELECT` those same columns (no `is_published` gate)                                                                            |
| Public load | `getPublicPricing()` → `GET /api/pricing`, occupancy table, booking widget, FAQ extra-bed line | `SELECT rooms.extra_bed_rate_inr` + `occupancy_prices.nightly_rate_inr` (requires `is_published` and all five tiers `> 0`)      |

After save, `revalidateTag("pricing")` drops the public cache so the next Home / room / widget fetch reads Postgres again. No redeploy.

### Guardrail

`src/lib/pricing/no-hardcoded-prices.test.ts` (run via `npm test`):

1. Walks `src/**/*.ts(x)` excluding tests and fails on literal `nightlyRateInr` / `extraBedRateInr` numbers, named `RATE_*` constants, or unexpected `₹` amounts.
2. Asserts the admin PATCH, `getAdminPricing()`, and `getPublicPricing()` all import `@/db/schema` and reference `rooms`, `occupancyPrices`, `extraBedRateInr`, and `nightlyRateInr`.
