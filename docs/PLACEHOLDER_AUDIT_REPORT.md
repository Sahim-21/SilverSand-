# Placeholder & Missing-Information Audit

**Silver Sand Beach Homestay**  
**Generated:** 25 August 2026  
**Scope:** All `src/` pages/components, `scripts/seed.ts`, SEO/JSON-LD layers, cross-referenced against `docs/BUSINESS_INFO.md`.

**Image inventory:** Zero image files exist anywhere in the repo (`public/` is empty; no `.jpg`, `.png`, `.webp`, or `.svg` assets).

**Phone/WhatsApp cross-check:** `src/lib/business.ts` (`+91 99862 22892`, `+919986222892`, `wa.me/919986222892`) **matches** `BUSINESS_INFO.md` confirmed values. **No mismatches found.**

**Lorem ipsum:** None in production `src/` components.

---

## `/` — Home

| File | Line(s) | Placeholder / pending content | Element |
|------|---------|-------------------------------|---------|
| `src/components/sections/property-intro-section.tsx` | 30–32 | Bed layout, bathroom details, and amenity list are pending the owner's confirmation… | Body copy |
| `src/components/sections/property-intro-section.tsx` | 34–36 | Pending owner confirmation → Bed count, bathroom layout, and AC coverage for 6–8 sharing are not published yet (checklist #3). | TodoNotice (checklist **#3**) |
| `src/components/sections/room-pricing-section.tsx` | 21 | Rates are set by the owner and shown here when published — not estimated or rounded. | Body copy (rates unpublished) |
| `src/components/marketing/occupancy-pricing.tsx` | 11–21 | Pending owner confirmation → Nightly rates for 2 / 3 / 4 / 6 / 8 sharing are not published yet… | TodoNotice (checklist **#12**) |
| `src/components/sections/photos-section.tsx` | 26–28 | Owner-supplied photographs will appear here. These placeholders will be replaced… | Section intro |
| `src/components/sections/photos-section.tsx` | 32–35 | PhotoFrame — alt: …photograph pending from the owner; caption: Exterior — pending owner photos (#2) | Empty dashed frame (checklist **#2**) |
| `src/components/sections/photos-section.tsx` | 37–40 | PhotoFrame — Deluxe AC Room — pending (#2) | Empty dashed frame |
| `src/components/sections/photos-section.tsx` | 42–45 | PhotoFrame — Bathroom — pending (#2) | Empty dashed frame |
| `src/components/sections/photos-section.tsx` | 48 | TODO: Owner input required (checklist #2 in docs/BUSINESS_INFO.md). | TodoNotice (default todoMessage) |
| `src/components/ui/photo-frame.tsx` | 22–33 | Dashed border box, role="img", no &lt;img&gt; | Shared placeholder component |
| `src/components/sections/about-section.tsx` | 40–42 | The host's name, languages spoken, and the family story will be added here once the owner confirms them. | Body copy (hidden in compact mode on home) |
| `src/components/sections/about-section.tsx` | 46–48 | Host name(s) and languages spoken are not yet confirmed (checklist #20). | TodoNotice (checklist **#20**) |
| `src/components/sections/murudeshwar-info-section.tsx` | 38–39 | Renders murudeshwarContext.beach (see site-content.ts) | Card copy |
| `src/components/sections/murudeshwar-info-section.tsx` | 44–46 | We have not published the walking or driving distance… (checklist #8). | TodoNotice (checklist **#8**) |
| `src/components/sections/nearby-attractions-section.tsx` | 18–20 | distances from our homestay will be added once the owner shares a confirmed map pin. | Section intro |
| `src/components/sections/faq-section.tsx` | 60–62 | Extra bed rate will appear here when the owner publishes pricing (checklist #12–#13). | TodoNotice when rates unpublished |
| `src/components/sections/faq-section.tsx` | 67–76 | Four pending FAQ cards (see Pending FAQ table) | TodoNotice per card |
| `src/lib/seo/faqs.ts` | 18 | Advance payment terms are set by the owner and will be published here once confirmed. | Answered FAQ (partially pending **#5**) |
| `src/lib/seo/faqs.ts` | 34 | If your group is 5 or 7, WhatsApp us — the owner will confirm… | Answered FAQ (guest-count rules **#14** unresolved) |
| `src/components/sections/map-section.tsx` | 31–33 | We have not published a street address or a precise map pin… | Body copy |
| `src/components/sections/map-section.tsx` | 37–38 | Map embed pending — owner needs to confirm the street address and coordinates (checklist #1, #11). | Dashed map placeholder box |
| `src/components/sections/map-section.tsx` | 41–43 | A confirmed map pin is required before we embed a map… (checklist #11). | TodoNotice (checklist **#11**) |
| `src/components/booking/booking-widget-form.tsx` | 417–421 | Rates are not published yet. Message us on WhatsApp for today's price — we do not show a fallback rupee amount. | Booking widget results box |
| `src/lib/seo/json-ld.ts` | 112–117 | PostalAddress with only Murudeshwar / Karnataka / IN — no street, PIN, or GeoCoordinates | Site-wide JSON-LD (via layout) |

---

## `/rooms` — Rooms listing

| File | Line(s) | Placeholder / pending content | Element |
|------|---------|-------------------------------|---------|
| `src/app/(public)/rooms/page.tsx` | 19 | Rates come directly from the owner when published. | Hero description |
| `src/components/sections/rooms-list-section.tsx` | 23–26 | One extra bed can be added when the owner confirms… Bed layout and full amenity list are pending owner confirmation. | Card description |
| `src/components/marketing/occupancy-pricing.tsx` | 11–21 | Same unpublished-rates TodoNotice as home | TodoNotice (**#12**) |

---

## `/rooms/deluxe-ac-room` — Deluxe AC Room

| File | Line(s) | Placeholder / pending content | Element |
|------|---------|-------------------------------|---------|
| `src/components/sections/room-page-hero.tsx` | 28–30 | An extra bed can be added… when available; the current rate is set by the owner and visible in the widget when published. | Hero copy |
| `src/components/sections/room-layout-section.tsx` | 26–28 | Bed count, bathroom layout, and maximum extra beds… (checklist #3). | TodoNotice (**#3**) |
| `src/components/marketing/occupancy-pricing.tsx` | 11–21 / 65 | Unpublished: TodoNotice (**#12**). When published: extra bed shows (per night — confirm with owner) | Pricing table |
| `src/components/sections/photos-section.tsx` | 26–48 | Full photos section (same as home) | 3× PhotoFrame + TodoNotice (**#2**) |
| `src/components/booking/booking-widget-form.tsx` | 417–421 | Unpublished-rates message in widget | Booking widget |
| `src/lib/seo/copy.ts` | 31 | Meta: Extra bed available when offered. | meta description |

---

## `/gallery`

| File | Line(s) | Placeholder / pending content | Element |
|------|---------|-------------------------------|---------|
| `src/app/(public)/gallery/page.tsx` | 19 | Real photographs from the owner will appear here. We do not use stock villa images or OTA scrapes. | Hero description |
| `src/components/sections/photos-section.tsx` | 26–48 | Entire photos section (3 empty frames + TodoNotice) | Same as home |
| `src/lib/seo/copy.ts` | 36 | Meta: Placeholders until the owner provides them. | meta description |

---

## `/about`

| File | Line(s) | Placeholder / pending content | Element |
|------|---------|-------------------------------|---------|
| `src/components/sections/about-section.tsx` | 40–42 | The host's name, languages spoken, and the family story will be added here once the owner confirms them. | Body copy (full mode) |
| `src/components/sections/about-section.tsx` | 46–48 | Host name(s) and languages spoken… (checklist #20). | TodoNotice (**#20** / languages) |
| `src/app/(public)/about/page.tsx` | 32–34 | Meals policy… not yet confirmed (checklist #16). Do not assume breakfast is offered… | TodoNotice (**#16**) |
| `src/app/(public)/about/page.tsx` | 36–38 | House rules including check-in/out times, ID requirements, and cancellation policy… (checklist #21). | TodoNotice (**#21**) |

---

## `/location`

| File | Line(s) | Placeholder / pending content | Element |
|------|---------|-------------------------------|---------|
| `src/app/(public)/location/page.tsx` | 25 | Street address and map pin will be added when the owner confirms them. | Hero description |
| `src/app/(public)/location/page.tsx` | 42–44 | We have not published walking or driving times from our homestay… | Body copy |
| `src/app/(public)/location/page.tsx` | 46–48 | Full street address is not yet confirmed (checklist #1). | TodoNotice (**#1**) |
| `src/app/(public)/location/page.tsx` | 50–52 | Distances to the beach, temple, bus stand… (checklist #8). | TodoNotice (**#8**) |
| `src/components/sections/map-section.tsx` | 31–43 | Map placeholder box + TodoNotice (**#1**, **#11**) | Map section |
| `src/components/sections/murudeshwar-info-section.tsx` | 44–46 | Landmark-distance TodoNotice (**#8**) | Section |
| `src/components/sections/nearby-attractions-section.tsx` | 18–20 | Distances pending map pin | Section intro |
| `src/lib/seo/copy.ts` | 46 | Meta: Street address and map pin will be added when confirmed. | meta description |

---

## `/contact`

| File | Line(s) | Placeholder / pending content | Element |
|------|---------|-------------------------------|---------|
| `src/app/(public)/contact/page.tsx` | 36–38 | Full postal address and map pin are not published yet (checklist #1, #11). | TodoNotice (**#1**, **#11**) |
| `src/app/(public)/contact/page.tsx` | 41–45 | Once we have a confirmed address, directions will appear on the Location page. | Body copy |

---

## `/privacy`

| File | Line(s) | Placeholder / pending content | Element |
|------|---------|-------------------------------|---------|
| `src/app/(public)/privacy/page.tsx` | 31–32 | Full policy text will be expanded before public launch if required by the owner's counsel. | Provisional legal copy |

---

## `/terms` — Booking terms

| File | Line(s) | Placeholder / pending content | Element |
|------|---------|-------------------------------|---------|
| `src/app/(public)/terms/page.tsx` | 26–29 | Prices on this website are estimates until the owner confirms… House rules, check-in times, and cancellation terms will be published here once the owner provides them. | Provisional terms copy |
| `src/lib/seo/copy.ts` | 61 | Meta: house rules once the owner publishes them | meta description |

---

## `/style-guide` (noindex dev page)

| File | Line(s) | Placeholder / pending content | Element |
|------|---------|-------------------------------|---------|
| `src/app/(public)/style-guide/page.tsx` | 202 | PhotoFrame alt: Specimen empty photo frame — no property photograph yet | Design specimen |
| `src/app/(public)/style-guide/page.tsx` | 214–216 | Until the owner publishes rates, the results box stays enquire-only with no rupee fallback. | Documentation copy |
| `src/app/(public)/style-guide/page.tsx` | 155 | Input placeholder="2 sharing" | UI placeholder attribute |

---

## `/admin` and `/admin/login`

| File | Line(s) | Placeholder / pending content | Element |
|------|---------|-------------------------------|---------|
| `src/components/admin/pricing-dashboard.tsx` | 255 | Rates not yet saved. Saving will publish them to the public site. | Admin empty state |
| `scripts/seed.ts` | 38–39 | extraBedRateInr: 500 (per-night unit unconfirmed); isPublished: false; no occupancy rates seeded | DB seed |

---

## Global (all public pages)

| File | Line(s) | Placeholder / pending content | Appears on |
|------|---------|-------------------------------|------------|
| `src/components/site-footer.tsx` | 21 | Full address pending — see Location or Contact. | Every public page |
| `src/components/booking/booking-widget-form.tsx` | 417–421 | Unpublished-rates WhatsApp message | Home, room page, style guide |
| `src/app/(public)/layout.tsx` | 16–17 | lodgingBusinessJsonLd — partial address, no geo/image/offers when unpublished | All public pages |
| `src/app/opengraph-image.tsx` | 8–9 | Replace with a real owner photo once one exists. | Social share preview |
| `src/app/twitter-image.tsx` | 1 | Re-exports opengraph-image | Twitter card |
| `src/lib/seo/metadata.ts` | 7 | url: "/opengraph-image" | OG/Twitter meta |
| `src/app/api/pricing/route.ts` | 13–14 | Rates are not published yet. Please call or WhatsApp us for today's price. | API |
| `src/lib/todos.ts` | 33 | TODO: Owner input required (checklist #N in docs/BUSINESS_INFO.md). | Default TodoNotice fallback |
| `src/components/marketing/todo-notice.tsx` | 12 | Pending owner confirmation | All TodoNotice instances |

---

## Pending FAQ cards (Home only)

Defined in `src/components/sections/faq-section.tsx` lines 10–15; each renders Answer pending owner input (checklist #N).

| Question | Checklist # | Item key |
|----------|-------------|----------|
| What are check-in and check-out times? | **#4** | checkInOut |
| Is parking available? | **#6** | parking |
| Do you have Wi-Fi? | **#7** | wifi |
| What is your cancellation policy? | **#5** | cancellation |

---

## Placeholder images summary

| Asset / component | File | Used on page(s) | Notes |
|-------------------|------|-----------------|-------|
| **Homepage hero** | `public/images/hero-murudeshwar-coast.jpg` | `/` | **Resolved 25 Aug 2026** — `next/image` + mangrove overlay; coastal scene (not property exterior) |
| PhotoFrame (room) | photos-section.tsx | /, /gallery, /rooms/deluxe-ac-room | Dashed box until owner room photo |
| PhotoFrame default caption | photo-frame.tsx:18 | Any frame without custom caption | Photos coming from the family — WhatsApp us for recent pictures. |
| Map embed | Map Embed API | /, /location | **Resolved** — live place iframe (see CHANGELOG) |
| OG/Twitter image | opengraph-image.tsx | All pages (social) | Branded typography card is final |
| Style-guide specimen | style-guide/page.tsx:202 | /style-guide | Design reference only |

**Note:** Exterior/bathroom PhotoFrame slots were removed from the UI (empty boxes unwanted). Room PhotoFrame remains.

---

## Shared content file gaps

| File | Line(s) | Text | Referenced on |
|------|---------|------|---------------|
| `src/lib/site-content.ts` | 14 | We have not published our walking distance to the beach — confirm that on WhatsApp once the owner provides a map pin. | Home, /location |
| `src/lib/site-content.ts` | 21 | Travel times from Silver Sand are intentionally omitted — no confirmed pin. | Nearby attractions |

---

## Hardcoded prices / phone / address audit

| Value | Location | vs BUSINESS_INFO.md |
|-------|----------|---------------------|
| +91 99862 22892 / +919986222892 | src/lib/business.ts:10–12 | **Match** (confirmed) |
| ₹500 extra bed | scripts/seed.ts:38 only | Owner-supplied; per-night vs per-stay not confirmed (#13); not shown until published |
| Street address / PIN | — | **Not published anywhere** (correct) |
| Occupancy nightly rates | — | **Not seeded**; public UI shows enquire-only state |
| No hardcoded ₹ in React src/ | no-hardcoded-prices.test.ts | Passes |

---

## Checklist items with no UI surface yet

These keys exist in `src/lib/todos.ts` (OWNER_CHECKLIST) but no TodoNotice or page copy references them:

| # | Key | Topic |
|---|-----|-------|
| **#9** | reviews | Genuine reviews |
| **#10** | gbp | Google Business Profile |
| **#14** | guestCountRules | Rules for 1 / 5 / 7 guests (partially mentioned in answered FAQ only) |
| **#15** | unitCount | Number of Deluxe AC units |
| **#17** | gst | GST / tax inclusive |
| **#18** | domain | Domain DNS / registrar control |
| **#19** | registration | Legal / homestay licence |
| **#22** | otaPolicy | Which OTAs to keep vs de-emphasise |

---

## Appendix A — docs/BUSINESS_INFO.md still unknown / unverified

### Not provided by owner

| # | Item |
|---|------|
| — | Occupancy nightly rates (2/3/4/6/8) |
| **#1** | Full postal address |
| **#2–#11** | Photos, amenities, policies, GBP, coordinates, reviews (grouped in doc) |
| **#12** | ₹ nightly for each occupancy tier |
| **#13** | Extra bed: per night? max beds? which occupancies? |
| **#14** | Rules for 1, 5, 7 guests |
| **#15** | One room vs multiple Deluxe AC units |
| **#16** | Meals policy |
| **#17** | GST / tax inclusive |
| **#18** | Domain registrar / DNS control |
| **#19** | Legal / Karnataka homestay registration |
| **#20** | Host name(s) and languages |
| **#21** | House rules (couples, ID, police rules) |
| **#22** | OTA policy |

### Unverified OTA claims — must not publish

- Naveen Beach Road / Mavalli / PIN 581350
- Sea view, terrace, garden, free Wi-Fi, continental breakfast
- No front desk; private entrance; check-in from 12:00; min age 18
- OTA listing claims (MakeMyTrip, Agoda, etc.)
- "2.0-star" / "2 room types" from low-quality mirrors

### Ambiguous confirmed value

- **₹500 extra bed:** owner-supplied but unit of time not confirmed; code treats as per person per night in seed/model.

---

## Appendix B — Explicit code TODOs (developer comments)

| File | Line | Text |
|------|------|------|
| src/lib/todos.ts | 33 | TODO: Owner input required (checklist #N…) — returned by todoMessage() |
| src/lib/seo/faqs.ts | 10 | Q&A we can stand behind without owner TODOs. |
| src/lib/seo/faqs.ts | 52 | FAQPage schema must use this list — pending owner questions are UI-only. |
| src/components/ui/photo-frame.tsx | 13 | Replace with next/image… when the owner supplies photos. |
| src/app/opengraph-image.tsx | 9 | Replace with a real owner photo once one exists. |

---

*Report only — no changes made.*
