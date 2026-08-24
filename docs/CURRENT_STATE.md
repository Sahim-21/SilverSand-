# Current state

**Date of this snapshot:** 24 August 2026  
**Phase:** 1 — documentation and architecture. **No application code is in scope.**

## What exists

| Area | Status |
| --- | --- |
| Public website | Not built |
| Admin pricing panel | Not built |
| Database | Not provisioned; schema specified in `DATABASE.md` |
| Auth | Not implemented; approach specified in `ARCHITECTURE.md` |
| Domain `silversandhomestay.com` | Intended. No indexed public site found on 24 Aug 2026 (`site:silversandhomestay.com` empty). Registrar/DNS not verified in this repo. |
| Owner-supplied facts | Name, place (Murudeshwar, Karnataka), phone/WhatsApp, one room type name, occupancy ladder, extra-bed ₹500/person. See `BUSINESS_INFO.md`. |
| Occupancy prices (2/3/4/6/8) | **Missing** |
| Address, photos, amenities, policies, GBP, coordinates | **Missing** |
| This documentation set | Complete for Phase 1 |
| Cursor rules | `.cursor/rules/` |

## What must not be treated as the product

The cloud environment may have dropped a default `create-next-app` tree (`src/`, `package.json`, Next 16, Tailwind 4) in the working directory. **That scaffold is leftover bootstrap, not Silver Sand.** Do not copy its README, Geist marketing page, or `tmp-scaffold` package name into production. When implementation starts, scaffold (or rebuild) against `ARCHITECTURE.md`.

## What was observed (not built)

Competitor and reference sites were fetched on 24 August 2026 for architecture and SEO decisions. Findings are in `SEO_STRATEGY.md`. They are observational (what the pages claim and how they are structured). They are **not** keyword-volume, backlink, or ranking-position data.

## Single source of truth for prices (intended)

```
Owner → /admin login → dashboard → edit occupancy + extra-bed rates
     → Postgres → public server components / GET /api/pricing
     → booking widget estimate → WhatsApp prefilled message
```

Nothing in that chain is live yet.

## Blockers before a public launch

1. Occupancy rates from the owner (or an explicit “show Enquire, hide rupee total until rates exist” launch mode — worse UX, only as a last resort).
2. Whether Deluxe AC is one unit or several.
3. At least a usable address or map pin, and real photographs.
4. Domain DNS pointing at the host.
5. Honest amenity and house-rule copy (check-in, parking, Wi-Fi, cancellation).

Until then, any implemented UI must fail closed: no invented ₹ amounts, no invented “2 min from beach”.
