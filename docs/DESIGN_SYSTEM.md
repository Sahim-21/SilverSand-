# Design system

Visual identity for Silver Sand Beach Homestay. **Not** owner-editable. **Not** a clone of `dandeliinn.com`, Kamath, Coastal Pearl, Amani, Nestle Sahyadri, or the attached booking-form screenshot.

Implemented in code as CSS custom properties + Tailwind `@theme` utilities (`src/app/globals.css`). Pages must use those utilities (`bg-sand`, `text-mangrove`, `gap-form`, …), not leftover hex values.

**Rendered reference:** `/style-guide` (`noindex`, not in the sitemap).

---

## Product feel

Murudeshwar is a **temple-and-beach** town. The site should feel like a **real house you can book without an OTA**: calm, specific, sand-and-sea, easy on a phone.

Direction (locked for v1): professional, clean, trustworthy, comfortable, **premium but not artificially luxurious**, photography-first, mobile-first.

Avoid: “5 star”, heavy gradients, excessive animation, generic stock-photo villas, gold-on-everything “luxury hotel” chrome, Dandeli-style jungle green as the whole brand.

---

## Surfaces (what we actually decided)

Two surfaces, not one dark website:

1. **Sand canvas** for marketing pages so real photographs (when we have them) sit on a warm, quiet field — not a hotel-white or a full-bleed dark theme.
2. **Mangrove booking panel** (deep coastal green / near-black) with **warm gold** for titles and accent on that panel only. Adapted from a restrained warm-dark booking form; not copied pixel-for-pixel.

WhatsApp green is **only** for WhatsApp CTAs. Gold is not a second conversion colour on light pages.

---

## Colour tokens

Defined in `:root` and mapped in `@theme inline`.

| Token              | Hex / value         | Role                                        |
| ------------------ | ------------------- | ------------------------------------------- |
| `--sand`           | `#F4EFE6`           | Page background                             |
| `--sand-deep`      | `#E8DFD0`           | Photo empty states, hover washes            |
| `--surface`        | `#FFFCF7`           | Light cards, header/footer                  |
| `--ink`            | `#1C1914`           | Body text (warm near-black)                 |
| `--muted`          | `#5E574C`           | Secondary text                              |
| `--mangrove`       | `#1A2B24`           | Brand, primary buttons on light, dark panel |
| `--mangrove-mid`   | `#243830`           | Dark-panel inputs, hover                    |
| `--mangrove-deep`  | `#121C18`           | Reserved (deeper shade)                     |
| `--gold`           | `#C4A35A`           | Dark-panel titles; `Button variant="gold"`  |
| `--gold-hover`     | `#B08F48`           | Gold hover                                  |
| `--gold-muted`     | `#D4B56A`           | Gold on dark, large type only               |
| `--whatsapp`       | `#128C7E`           | WhatsApp CTA only                           |
| `--whatsapp-hover` | `#0E7368`           | WhatsApp hover                              |
| `--line`           | `#D9D0C2`           | Light borders                               |
| `--line-on-dark`   | sand at 22% opacity | Dark-panel input borders                    |
| `--danger`         | `#B42318`           | Errors                                      |

**Do not use:** `--sea` / `--sea-hover` (Phase 1 scaffold blues — removed).

Contrast: ink on sand, sand on mangrove, and mangrove on gold buttons must stay WCAG AA. Do not set body copy in gold on sand.

---

## Typography

- **UI / body:** Source Sans 3 (`next/font`, `--font-source-sans`).
- **Display / wordmark / H1–H3:** Source Serif 4 — not a script, not Inter+script.
- **Numbers:** `tabular-nums` on estimates and admin INR fields.

Scale (via `Heading` / `Text` in `src/components/ui/heading.tsx`):

| Role    | Component                | Size                              |
| ------- | ------------------------ | --------------------------------- |
| Display | `Heading size="display"` | 1.875rem mobile / 2.75rem desktop |
| Title   | `Heading size="title"`   | 1.5rem / 1.875rem                 |
| Section | `Heading size="section"` | 1.25rem / 1.5rem                  |
| Body    | `Text`                   | 1rem, line-height 1.6             |
| Small   | `Text size="sm"`         | 0.875rem                          |
| Caption | `Text size="xs"`         | 0.75rem                           |

---

## Spacing and radius

| Token               | Value   | Use                            |
| ------------------- | ------- | ------------------------------ |
| `--space-gutter`    | 1rem    | `px-gutter` mobile             |
| `--space-gutter-md` | 1.5rem  | `px-gutter-md` from md         |
| `--space-form`      | 1.5rem  | `gap-form` between fields      |
| `--space-section`   | 3.5rem  | `py-section`                   |
| `--ss-radius-md`    | 0.5rem  | Inputs, buttons (`rounded-md`) |
| `--ss-radius-lg`    | 0.75rem | Cards, photo frames            |

Max content width: `Container` `page` = 72rem; `narrow` = 42rem; widget column = 24rem in `Split` / heroes.

---

## Layout components

| Component     | File                                    | Job                                                       |
| ------------- | --------------------------------------- | --------------------------------------------------------- |
| `Container`   | `src/components/layout/container.tsx`   | Horizontal gutters + max width                            |
| `Section`     | `src/components/layout/section.tsx`     | Vertical page rhythm                                      |
| `Stack`       | `src/components/layout/stack.tsx`       | Vertical gaps including `gap-form`                        |
| `Split`       | `src/components/layout/split.tsx`       | Story + sticky widget                                     |
| `PageHeader`  | `src/components/layout/page-header.tsx` | Optional breadcrumbs + eyebrow + **one H1** + description |
| `Breadcrumbs` | `src/components/layout/breadcrumbs.tsx` | Visible trail + `BreadcrumbList` JSON-LD                  |
| `PhotoFrame`  | `src/components/ui/photo-frame.tsx`     | Honest empty photo; **required `alt`**                    |

Public skeleton: Header (wordmark, Rooms, Contact, WhatsApp, Call) → Main → Footer (NAP when known, phone, WhatsApp, Privacy, Terms). Phone is always `+91 99862 22892`.

Admin: no marketing header. Quiet sand/surface dashboard.

---

## Primitives (shadcn-style, this repo only)

Do not add MUI, Ant, or a hotel-booking npm widget.

| Primitive          | Variants / notes                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `Button`           | `default` mangrove; `gold` (dark panels); `outline`; `outline-on-dark`; `whatsapp`; `call`; `ghost` |
| `Input`            | `surface="light" \| "dark"` — h-12, soft radius, thin border                                        |
| `Label`            | Field labels                                                                                        |
| `Card`             | `tone="surface" \| "dark"`. `CardTitle` is **h3** by default (`as="h2"` for the booking widget).    |
| `Alert`            | `info` / `danger` — pricing failure: call/WhatsApp, **no fake ₹**                                   |
| `Heading` / `Text` | Type scale                                                                                          |

Native `<a href="https://wa.me/919986222892">` for WhatsApp. Label: **Check Availability on WhatsApp**.

---

## Booking widget

Dark `Card` on the sand page. Gold title, sand body, WhatsApp green CTA, outline-on-dark **Call us**.

Fields: name (optional), occupancy dropdown (room type × sharing), quantity stepper, extra beds, native date pickers, phone (optional), estimate results box, WhatsApp + Call. “+ Add another room type” adds another enquiry line so a second room type can be catalogued later without a rewrite.

Estimates use `GET /api/pricing` / `estimateEnquiry` only. If rates are unpublished, the results box stays enquire-only with **no ₹ fallback**. Disclaimer: `*Estimate only, subject to availability`.

---

## Imagery

- Homepage hero: Murudeshwar coastal photograph via `next/image` (`priority`, responsive `sizes`) with a mangrove-deep gradient overlay — alt describes the beach scene, not the property.
- Deluxe AC Room occupancy photos: `next/image` from `public/Rooms/` (`2sharing.jpeg`, `3sharing.jpeg`, `4sharing.jpeg`, `6Sharing.jpeg`, `8sharing.jpeg`). Lazy-load (below the fold), unique `alt` per tier, 4:3 crop in `OccupancyRoomImage`. Do not use raw `<img>`.
- Owner property photos only, via `next/image` when they exist. Every `PhotoFrame` (and later image) has an `alt`.
- Until remaining property photos exist (exterior, bathroom): `PhotoFrame` empty state with `role="img"` + `aria-label={alt}`, not Unsplash. Do not show empty frames for those categories.

---

## Motion

Colour transitions on buttons/inputs only (`duration-150`). No hero carousels, no count-up stats.

---

## Voice

- Specific: “Deluxe AC Room, priced by how many people share it.”
- Direct: “Message us on WhatsApp with your dates. We confirm availability ourselves.”
- Home H1 includes **Homestay in Murudeshwar** in natural language.

---

## Responsive checks

- 375px: header CTAs usable, widget full width, no horizontal scroll
- 768px: two-column starts on `Split`
- 1280px: widget stays in the 24rem column, sticky on desktop

Verify on `/`, `/rooms/deluxe-ac-room`, `/contact`, and `/style-guide`.
