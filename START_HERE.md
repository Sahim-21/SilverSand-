# START HERE — Silver Sand Beach Homestay

Read this file first. Then `docs/CURRENT_STATE.md`, then `docs/TASKS.md`. Do not start coding until you have read `docs/ARCHITECTURE.md`, `docs/DEVELOPMENT_RULES.md`, and `docs/BUSINESS_INFO.md`.

This repository is the official project for **Silver Sand Beach Homestay**, a homestay in Murudeshwar, Karnataka, India. The business goal is more **direct bookings via WhatsApp and phone**, not OTA bookings.

---

## Critical: weak assumptions in the brief (read before doing anything)

These are not nits. If they stay uncorrected, the site will ship the wrong product, the wrong claims, or a booking widget that cannot be honoured.

1. **Occupancy prices were never given.** The brief requires occupancy-based pricing for 2 / 3 / 4 / 6 / 8 sharing and extra bed ₹500/person, and also requires those prices to live only in the database. There is currently **no 2/3/4/6/8 rate to seed**. Extra bed ₹500 is the only owner-supplied number. Do not invent rack rates.

2. **“One room type” is not the same as “one physical room.”** Deluxe AC Room as a _type_ can still mean several sellable units. The booking widget, WhatsApp copy, and availability language all change if there is only one lockable room versus three identical rooms. Unknown.

3. **2 / 3 / 4 / 6 / 8 skipping 5 and 7 is unexplained.** Either those occupancies are sold as “nearest published tier + extra bed”, or 5- and 7-person groups are not taken. The estimate math cannot be honest until the owner picks a rule.

4. **Eight people in one “Deluxe AC Room” is physically unusual.** This is either a large family hall, a whole-unit let, a mislabelled cottage, or a copied occupancy ladder. Bed count, mattress count, and bathroom count must be collected before the room page is written. Do not imply hotel-suite luxury or a dorm unless the owner confirms the layout.

5. **“Beach Homestay” is in the trading name. Distance to the beach is not.** Coastal Pearl is hillside (Mavalli). Kamath’s own site says the beach is a complimentary 3-minute _drive_. Nestle Sahyadri and Amani claim beach / Naveen Beach Road. Third-party OTA pages for _this_ property mention Naveen Beach Road, Mavalli — **unverified**. Do not publish “on the beach”, “steps from the sand”, or a walking-time until the owner gives metres (or a GPS pin we can measure).

6. **`silversandhomestay.com` is the intended domain. Ownership and DNS are unconfirmed.** A `site:` search on 24 Aug 2026 returned no indexed pages. The name already appears on third-party hotel aggregators. Confirm registrar, nameservers, and that we are not colliding with another listing’s brand.

7. **There is no live availability calendar.** A “Check Availability on WhatsApp” CTA is correct **only if** the UI says the rupee total is an estimate pending owner confirmation. Do not imply instant confirmed booking.

8. **Dandeli Inn is a useful booking-flow reference, not a peer product.** `dandeliinn.com` is a multi-room-type lodge in Dandeli (jungle / bus-stand location) with six published sharing categories and an “add another room type” control. Silver Sand has one room type, a beach-temple town, and must not clone that inventory UI, copy, or visual design.

9. **`sahyadristays.com` is not a Murudeshwar homestay.** It is a multi-destination stay marketplace (Sakleshpur, Chikmagalur, Coorg, etc.). The Murudeshwar property people mean by “Sahyadri Beach Front Homestay” is **Nestle Sahyadri BeachFront Homestay**, whose own site is `beachstaymurudeshwar.in`. Treat those as two different competitors.

10. **“Agora.com” in the SERP notes is not independently confirmed.** The aggregator actually visible on these properties’ distribution is **Agoda**. Do not build strategy around Agora unless the original SERP screenshot shows that domain.

11. **No attached brief files were in the repo.** Analysis uses the SERP competitor list and the four frameworks named in the request (category claims, pricing transparency, CTA hierarchy, content depth / comparison pages; on-page quality; “what they do better / how to respond”), applied to pages fetched 24 Aug 2026. It does not invent Ahrefs/Semrush/GSC numbers.

12. **Phase 1 (scaffold) is complete.** The Next.js app, Drizzle schema, admin shell, and API routes exist. See `docs/CURRENT_STATE.md`. The interactive booking widget and launch content are Phase 2.

Until the owner answers the checklist in `docs/BUSINESS_INFO.md`, copy must stay conservative: location = Murudeshwar, Karnataka; product = Deluxe AC Room; contact = the phone number below; prices = fetched from the database (once seeded), never typed into React.

---

## What this project is

| Item              | Value                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Business          | Silver Sand Beach Homestay                                                                                              |
| Place             | Murudeshwar, Karnataka, India                                                                                           |
| Domain (intended) | silversandhomestay.com                                                                                                  |
| Phone / WhatsApp  | +91 99862 22892                                                                                                         |
| Product           | One room **type**: Deluxe AC Room                                                                                       |
| Pricing model     | Occupancy-based (2 / 3 / 4 / 6 / 8 sharing) + extra bed ₹500/person — **owner-edited in admin, single source of truth** |
| Conversion goal   | WhatsApp enquiry with dates + guest count + estimate; phone call as the second path                                     |
| Not in scope      | Full CMS, hotel PMS, OTA channel manager, payment gateway, live inventory calendar, owner-editable pages/images/nav     |

**Static (developers change in code, owner does not edit):** layout, copy, images, SEO content, navigation, design.

**Dynamic (owner edits in a small admin panel):** occupancy nightly rates and extra-bed rate for the one room type. That is the entire CMS.

---

## Current state (summary)

**Phase 1 (project scaffold) is complete.** Documentation (Phase 0) and the runnable Next.js repo are in place. Phase 2 remaining: owner occupancy rates and deploy. Technical SEO (titles, canonicals, JSON-LD with known facts) is live.

- Full status: [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md)
- Work remaining: [`docs/TASKS.md`](docs/TASKS.md)
- Facts vs unknowns: [`docs/BUSINESS_INFO.md`](docs/BUSINESS_INFO.md)

## Current task

**Done:** Phase 0 documentation; Phase 1 scaffold; marketing pages; **interactive booking widget** (live estimate + WhatsApp prefill).

**Next (Phase 2 remaining):** owner occupancy rates in admin; deploy to Vercel. Street address/geo can extend LodgingBusiness JSON-LD when confirmed.

**Do not do without owner facts:** invented beach distance, amenities, review quotes, or hardcoded occupancy ₹.

---

## What NOT to change

- Do not turn the site into a CMS. No owner-editable homepage, blog, gallery, or nav.
- Do not add a second room type, seasonal calendar, coupon engine, or payment checkout unless the owner explicitly expands scope.
- Do not hardcode occupancy prices or extra-bed price in frontend components, markdown, or env vars used by the public UI. Seed data belongs in the database (and a documented seed file that is not imported by React).
- Do not clone `dandeliinn.com` (or any competitor) visually or copy-wise.
- Do not add Hotel schema, fake reviews, invented distances, or doorway pages.
- Do not “fix” copy by guessing Wi-Fi, parking, food, or check-in times.
- Do not expand the dependency list without a reason recorded in `docs/CHANGELOG.md`.
- Do not make architecture changes (new DB, new auth vendor, new CSS framework) without asking.

**Where pricing is managed:** owner logs into `/admin` → dashboard → edits occupancy rates and extra-bed rate → saved to Postgres → public site and WhatsApp estimate read that row. See `docs/DATABASE.md`.

---

## How to continue (for a second developer in Cursor)

1. Read this file, then the rest of `docs/` in this order: `CURRENT_STATE` → `BUSINESS_INFO` → `ARCHITECTURE` → `DATABASE` → `SEO_STRATEGY` → `DESIGN_SYSTEM` → `DEVELOPMENT_RULES` → `TASKS` → `CHANGELOG`.
2. Follow `.cursor/rules/` — they encode the same constraints.
3. If a fact is not in `BUSINESS_INFO.md`, it is unknown. Ask; do not fill the gap with OTA scrapes presented as truth.
4. After significant work: update `CURRENT_STATE.md`, tick `TASKS.md`, and write _what and why_ in `CHANGELOG.md`.

Primary topic for SEO, from day one: **homestay in Murudeshwar**. Strategy and competitor findings live in `docs/SEO_STRATEGY.md`.
