# Changelog

Record **what** changed and **why**, so a second developer (or a later Cursor session) can reconstruct decisions without Slack.

Format: newest first. Each entry: date, what, why, what we explicitly rejected.

---

## 2026-08-24 — Phase 1: documentation only

### What

- Added `START_HERE.md` and the `docs/` set: current state, tasks, architecture (stack + sitemap), database (pricing schema + admin flow), design system, development rules, business facts, SEO strategy (including competitor analysis).
- Added `.cursor/rules/` so agents read docs first and do not invent a CMS or hardcoded rates.
- Added this changelog and a repo `README.md` that points at `START_HERE.md`.

### Why

The owner needs direct WhatsApp/phone bookings for one Deluxe AC Room with occupancy pricing. Prices must be edited in a small admin panel and nowhere else. Building UI before facts (rates, address, photos, unit count) would freeze guesses into the homepage.

Competitor and reference sites were fetched the same day so SEO and UX recommendations are observational, not generic “add a blog” advice. `dandeliinn.com` was used as a **booking-flow** reference only.

### Rejected (on purpose)

- **Application code** in this phase, including treating any leftover `create-next-app` tree as the product.
- **WordPress / a headless CMS** — the brief forbids owner-editable pages; WordPress is still a CMS.
- **Astro + Worker as v1** — better HTML diet, worse for a second Cursor developer than one Next.js app.
- **Hotel / PMS / payments / live calendar** — conversion is WhatsApp; we do not have availability data.
- **Invented occupancy ₹ amounts, address, or beach walking time** — not in `BUSINESS_INFO.md` confirmed facts.
- **Treating sahyadristays.com as the Sahyadri beach homestay** — it is a marketplace; Nestle Sahyadri is the Murudeshwar property.
- **Hotel schema and fake review stars.**
- **Doorway URLs** for every keyword variant.

### Follow-up

Implementation starts only when authorised, ideally after occupancy rates and unit count exist. See `docs/TASKS.md` Phase 0 and Phase 2.
