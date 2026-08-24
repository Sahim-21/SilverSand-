# Design system

Visual identity for Silver Sand Beach Homestay. **Not** owner-editable. **Not** a clone of `dandeliinn.com`, Kamath, Coastal Pearl, Amani, or Nestle Sahyadri.

This is a proposed system for implementation. It is not a registered brand book. If the owner later supplies a logo or colours, replace tokens here and in CSS variables — do not leave both palettes.

---

## Product feel

Murudeshwar is a **temple-and-beach** town, not a jungle lodge (Dandeli) and not a 5-star hotel template (Amani’s public site uses stock “luxury” lines and even a Goethe passage). Silver Sand should feel like a **real house you can book without an OTA**: calm, specific, sand-and-sea, easy on a phone.

Keywords for UI writing: direct, local, occupancy-honest. Avoid: “5 star accommodation”, “timeless heritage hotel”, lorem, “best luxury homestays in Uttara Kannada” unless the owner can defend it.

---

## Layout

- **Mobile first.** WhatsApp traffic is thumb-driven. Primary CTA stays visible (sticky bar on small screens after the guest has seen the room name).
- **Desktop:** booking widget can sit in a right column on Home and Room; it must not trap the page in a hotel-booking iframe aesthetic.
- **Max content width:** ~72rem for marketing; widget ~24–28rem.
- **Section spacing:** large enough for photos; do not stack six equal icon grids (Coastal Pearl’s amenity wall) until we have real amenities.

### Page skeleton (public)

1. Header: wordmark, Rooms, Contact, **WhatsApp**, **Call**
2. Main
3. Footer: NAP (when known), phone, WhatsApp, Privacy, Terms  
   Same phone number everywhere (`+91 99862 22892`)

Admin: no marketing header. Quiet dashboard, shadcn Table + Button.

---

## Colour (proposed tokens)

Name-derived, coastal, restrained. Do not use Dandeli-style saturated jungle green as the brand.

| Token         | Role                      | Suggested                                                       |
| ------------- | ------------------------- | --------------------------------------------------------------- |
| `--sand`      | Page background           | Warm off-white / pale sand `#F6F0E6`                            |
| `--sea`       | Primary actions, links    | Deep coastal blue `#1B4F72`                                     |
| `--sea-hover` | Primary hover             | `#163F5B`                                                       |
| `--ink`       | Body text                 | Near-black `#1A1A1A`                                            |
| `--muted`     | Secondary text            | `#5C5C5C`                                                       |
| `--whatsapp`  | **Only** the WhatsApp CTA | Official-ish green `#128C7E` — recognisable, not a second brand |
| `--call`      | Secondary phone           | Outline / `--sea`                                               |
| `--line`      | Borders                   | `#E4D9C8`                                                       |
| `--danger`    | Form errors               | `#B42318`                                                       |

WhatsApp green is reserved for the **one** primary conversion button so it does not compete with random “success” badges.

Contrast: body text on `--sand` and white buttons on `--sea` must meet WCAG AA.

---

## Typography

- **UI / body:** a grocer-neutral sans available on `next/font` (e.g. Source Sans 3 or Plus Jakarta Sans). One family.
- **Display:** optional slightly warmer serif for the wordmark / H1 only (e.g. Source Serif 4) — skip if it starts looking like a wedding card.
- **Do not** use Inter everywhere plus a script font on the hero (generic “homestay WordPress” look).
- **Numbers in the widget:** tabular lining figures so the estimate does not jump.

Scale (approx): H1 2rem mobile / 2.75rem desktop; body 1rem; small print 0.875rem.

---

## Components (shadcn/ui only)

Use shadcn for primitives. Do not add MUI, Ant, Chakra, or a hotel-booking widget from npm.

| Piece        | Primitive                       | Notes                                                                                |
| ------------ | ------------------------------- | ------------------------------------------------------------------------------------ |
| WhatsApp CTA | `Button`                        | Full width on mobile; WhatsApp icon + exact label **Check Availability on WhatsApp** |
| Call         | `Button variant="outline"`      |                                                                                      |
| Occupancy    | `Select` or stepper             | Options 2 / 3 / 4 / 6 / 8 sharing — labels in English + “guests”                     |
| Extra beds   | Stepper                         | 0…max; hide if rate is 0                                                             |
| Dates        | `Calendar` / date range         | Check-out after check-in; no min-stay unless owner sets one (static later)           |
| Estimate     | Definition list                 | “Estimated total” + “Estimate only, subject to availability”                         |
| Admin table  | `Table` + `Input type="number"` | INR, integer                                                                         |
| Admin save   | `Button`                        |                                                                                      |
| Notices      | `Alert`                         | DB failure → call/WhatsApp, no fake ₹                                                |

Native `<a href="https://wa.me/...">` for WhatsApp (reliable on Android). Do not wrap it in a JS web-share only path.

---

## Booking widget (concept, not a clone)

Adapt from Dandeli Inn’s **flow**, not its chrome:

| Dandeli Inn (observed 24 Aug 2026)            | Silver Sand                                        |
| --------------------------------------------- | -------------------------------------------------- |
| Room type dropdown (6 types)                  | Single type shown as a heading; occupancy select   |
| Quantity + “Add another room type”            | Omit unless multiple units/types are confirmed     |
| Optional name & phone                         | Omit in v1 — WhatsApp already identifies the guest |
| Dates + live estimate                         | Keep                                               |
| One WhatsApp CTA                              | Keep, same job, original label                     |
| Rates listed as static cards on the same page | Show rates **from API/DB**, not from markdown      |

Empty: dates missing → estimate em dash, CTA still allowed (message without total) **or** CTA disabled until dates exist. Prefer **dates required** so the owner gets a usable WhatsApp.

Error: pricing fetch fail → no number, CTA becomes “WhatsApp us” without a fake total.

---

## Imagery

- Real owner photos only. No Unsplash “Maldives villa” and no competitor photos.
- Until photos exist: honest empty state (“Photos coming from the family — WhatsApp us for recent pictures”) rather than stock.
- `next/image`, explicit width/height, no layout shift.
- Do not overlay “LUXURY” ribbons.

---

## Motion and noise

- Almost none. No auto-rotating hero, no count-up “Happy Customers”.
- Kamath’s empty stat counters and Coastal Pearl’s award strip are what we are **not** copying unless we have real awards.

---

## Voice

- Specific: “Deluxe AC Room, priced by how many people share it.”
- Direct: “Message us on WhatsApp with your dates. We confirm availability ourselves.”
- Not: “A wonderful serenity has taken possession of my entire soul” (Amani homepage, 24 Aug 2026).

H1 on Home should include **Homestay in Murudeshwar** in natural language, not keyword stuffing.

---

## Responsive checks (when UI exists)

- 375px: sticky WhatsApp, widget usable, no horizontal scroll
- 768px: two-column starts
- 1280px: widget does not float away from the room story

Verify in a real browser, not only a screenshot.
