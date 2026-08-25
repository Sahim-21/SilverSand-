# Design system

Visual identity for Silver Sand Beach Homestay. **Not** owner-editable. **Not** a clone of `dandeliinn.com`, Kamath, Coastal Pearl, Amani, Nestle Sahyadri, or the attached booking-form screenshot.

Implemented in code as CSS custom properties + Tailwind `@theme` utilities (`src/app/globals.css`). Pages must use those utilities (`bg-background`, `text-ink`, `text-mangrove-fg`, `gap-form`, …), not leftover hex values. Dark mode remaps canvas/text tokens; it does not introduce a second palette.

**Rendered reference:** `/style-guide` (`noindex`, not in the sitemap).

---

## Product feel

Murudeshwar is a **temple-and-beach** town. The site should feel like a **real house you can book without an OTA**: calm, specific, sand-and-sea, easy on a phone.

Direction (locked for v1): professional, clean, trustworthy, comfortable, **premium but not artificially luxurious**, photography-first, mobile-first.

Avoid: “5 star”, heavy gradients, excessive animation, generic stock-photo villas, gold-on-everything “luxury hotel” chrome, Dandeli-style jungle green as the whole brand.

---

## Surfaces (what we actually decided)

Two surfaces, not one generic dark website:

1. **Page canvas** — warm **sand** in light mode (`--background` → `--sand`) so photographs sit on a quiet field, not hotel-white. In dark mode the canvas is **mangrove-deep** (`#121C18`), the same coastal near-black as the brand, not zinc/slate grey.
2. **Mangrove booking panel** (pigment `--mangrove`, `#1A2B24`) with **warm gold** for titles and accent on that panel only. Pigments do not invert when the theme changes, so sand type on the panel still reads.

WhatsApp green is **only** for WhatsApp CTAs. Gold is not a second conversion colour on light pages.

---

## Colour tokens

Defined in `:root` and mapped in `@theme inline`. **Pigments** (`--sand`, `--mangrove`, `--gold`, WhatsApp green) stay the same in both themes so `text-sand` on the booking panel and gold buttons with `text-mangrove` keep working. **Canvas and text** tokens remap under `html.dark`.

Use `--background` for the page, not `--sand`. Use `--mangrove-fg` for links, the wordmark, and outline/call buttons — not raw `--mangrove` (that pigment stays dark green and would disappear on a dark canvas). Gold buttons keep `text-mangrove`.

### Light (`:root`)

| Token              | Hex / value         | Role                                              |
| ------------------ | ------------------- | ------------------------------------------------- |
| `--background`     | `var(--sand)`       | Page canvas                                       |
| `--sand`           | `#F4EFE6`           | Pigment — light canvas; on-dark type              |
| `--sand-deep`      | `#E8DFD0`           | Photo empty states, hover washes, banded sections |
| `--surface`        | `#FFFCF7`           | Cards, header, footer                             |
| `--ink`            | `#1C1914`           | Body text (warm near-black)                       |
| `--muted`          | `#5E574C`           | Secondary text                                    |
| `--mangrove`       | `#1A2B24`           | Pigment — brand, primary buttons, booking panel   |
| `--mangrove-mid`   | `#243830`           | Dark-panel inputs, hover                          |
| `--mangrove-deep`  | `#121C18`           | Hero overlay, dark-mode page canvas               |
| `--mangrove-fg`    | `#1A2B24`           | Links, wordmark (follows canvas in dark mode)     |
| `--gold`           | `#C4A35A`           | Dark-panel titles; `Button variant="gold"`        |
| `--gold-hover`     | `#B08F48`           | Gold hover                                        |
| `--gold-muted`     | `#D4B56A`           | Gold on dark, large type; dark-mode mangrove-fg   |
| `--whatsapp`       | `#128C7E`           | WhatsApp CTA only                                 |
| `--whatsapp-hover` | `#0E7368`           | WhatsApp hover                                    |
| `--line`           | `#D9D0C2`           | Borders on the light canvas                       |
| `--line-on-dark`   | sand at 22% opacity | Dark-panel input borders                          |
| `--danger`         | `#B42318`           | Errors                                            |
| `--focus`          | `#1A2B24`           | Focus ring on light surfaces                      |

### Dark (`html.dark`)

Warm mangrove-deep canvas and gold-mustard links — not a generic black/white swap. Pigments above are **not** redefined here.

| Token           | Dark value                         | Role                                   |
| --------------- | ---------------------------------- | -------------------------------------- |
| `--background`  | `var(--mangrove-deep)` (`#121C18`) | Page canvas                            |
| `--sand-deep`   | `#1A2420`                          | Empty states, hover, banded sections   |
| `--surface`     | `#1E2C26`                          | Cards, header, footer, occupancy table |
| `--ink`         | `var(--sand)` (`#F4EFE6`)          | Body text                              |
| `--muted`       | `#C9BFB0`                          | Secondary text                         |
| `--line`        | `#3D4C44`                          | Borders on the dark canvas             |
| `--mangrove-fg` | `var(--gold-muted)` (`#D4B56A`)    | Links, wordmark, outline/call          |
| `--focus`       | `var(--gold-muted)`                | Focus ring on dark surfaces            |
| `--danger`      | `#E07068`                          | Errors (lightened for the dark canvas) |

Tailwind `dark:` variants follow the `html.dark` class (`@custom-variant dark`), not only `prefers-color-scheme`, so the header toggle actually switches utilities such as the hero overlay.

**Do not use:** `--sea` / `--sea-hover` (Phase 1 scaffold blues — removed). Do not add zinc, slate, or a second grey scale. Do not invert `--sand` so it is both the dark page and on-dark type — that was the dual-use bug this remap avoids.

### Contrast (WCAG AA)

Guarded in `src/lib/theme-contrast.test.ts`. Body copy needs 4.5:1; large gold titles need 3:1.

| Pair (approx.)                        | Mode  | Notes                                |
| ------------------------------------- | ----- | ------------------------------------ |
| Ink on sand / surface                 | Light | Body                                 |
| Muted on sand                         | Light | Secondary                            |
| Sand on mangrove / mangrove-deep      | Both  | Booking panel, hero overlay H1       |
| Mangrove on gold                      | Both  | Gold buttons                         |
| Ink (sand) on mangrove-deep / surface | Dark  | Body, occupancy cards                |
| Muted `#C9BFB0` on surface `#1E2C26`  | Dark  | Secondary                            |
| Gold-muted on surface / page          | Dark  | Links and wordmark (`--mangrove-fg`) |
| Gold-muted on mangrove-deep           | Both  | Hero eyebrow                         |

Do not set body copy in gold on the sand canvas.

---

## Dark mode behaviour

- **First visit:** `prefers-color-scheme` (inline script in `layout.tsx` before paint, key `silversand-theme`).
- **After the visitor toggles:** that choice is stored in `localStorage` and wins over the OS. If they never toggle, OS changes still apply.
- **Control:** small sun/moon ghost button in the public header (and the admin chrome). Sun in dark mode, moon in light mode.
- **Hero overlay:** mangrove-deep → mangrove gradient; dark mode uses a slightly stronger wash (`from-mangrove-deep/95`) so sand type still sits on the photograph.
- **Occupancy / pricing cards:** `bg-surface` + `text-ink` so they follow the remap. Do not use `bg-sand` for those cards.
- **Static OG image** (`opengraph-image.tsx`) may keep branded hex — it is not a themed page.

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

| Token                  | Value   | Use                                          |
| ---------------------- | ------- | -------------------------------------------- |
| `--space-gutter`       | 1rem    | `px-gutter` mobile                           |
| `--space-gutter-md`    | 1.5rem  | `px-gutter-md` from md                       |
| `--space-form`         | 1.5rem  | `gap-form` between fields                    |
| `--space-section`      | 5.5rem  | `py-section` — vertical padding of a section |
| `--space-section-fade` | 2.75rem | Soft join at the top of a banded section     |
| `--ss-radius-md`       | 0.5rem  | Inputs, buttons (`rounded-md`)               |
| `--ss-radius-lg`       | 0.75rem | Cards, photo frames                          |

Max content width: `Container` `page` = 72rem; `narrow` = 42rem; widget column = 24rem in `Split` / heroes.

---

## Section bands

One treatment for major blocks on Home (Hero → intro → Room & Pricing → Photos → About → … → FAQ → Footer). Not a gold hairline, not a template wave SVG.

**Alternate two existing canvases:** `--background` (`.ss-band-canvas`) and `--sand-deep` (`.ss-band-wash`). Same pairing in dark mode (`mangrove-deep` / `#1A2420`). The mangrove final CTA and the surface footer stay the brand closer and closer chrome — they are not a third sand recipe.

**Join:** a 2.75rem static linear gradient at the top of each band (`--space-section-fade`) so the colour eases rather than hard-cuts. No scroll-linked background cross-fade (extra paint on every frame for a difference you cannot see at this contrast).

**Rhythm:** `--space-section` 5.5rem padding on every `Section`. The first band after the hero (`PropertyIntro`) does not fade — the photograph is already the break.

`Section` `band="canvas" | "wash"` and `fade`. Homepage passes bands; reused sections on `/gallery`, `/about`, `/location` keep their previous surfaces until this direction is confirmed to roll out.

---

## Layout components

| Component     | File                                    | Job                                                         |
| ------------- | --------------------------------------- | ----------------------------------------------------------- |
| `Container`   | `src/components/layout/container.tsx`   | Horizontal gutters + max width                              |
| `Section`     | `src/components/layout/section.tsx`     | Vertical page rhythm + optional `band` (`canvas` \| `wash`) |
| `Stack`       | `src/components/layout/stack.tsx`       | Vertical gaps including `gap-form`                          |
| `Split`       | `src/components/layout/split.tsx`       | Story + sticky widget                                       |
| `PageHeader`  | `src/components/layout/page-header.tsx` | Optional breadcrumbs + eyebrow + **one H1** + description   |
| `Breadcrumbs` | `src/components/layout/breadcrumbs.tsx` | Visible trail + `BreadcrumbList` JSON-LD                    |
| `PhotoFrame`  | `src/components/ui/photo-frame.tsx`     | Honest empty photo; **required `alt`**                      |

Public skeleton: **Sticky** header (wordmark, Rooms, Contact, **theme toggle**, WhatsApp, Call) → Main → Footer (NAP when known, phone, WhatsApp, Privacy, Terms). A gold **contact FAB** (WhatsApp + Call) sits at the bottom-right after you scroll past the hero; it hides while the booking widget’s WhatsApp CTA is on screen. Phone is always `+91 99862 22892`. Booking widgets on Home and the room page use `lg:sticky lg:top-24` so they sit below the header.

Admin: no marketing header. Quiet canvas/surface dashboard with the same theme toggle.

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

Fields: native check-in / check-out (check-out disabled until check-in; check-out cannot be on or before check-in), occupancy dropdown (room type × sharing), quantity stepper, extra beds (capped so occupancy + extras ≤ 8), live estimate, name/phone (optional), WhatsApp + Call. “+ Add another room type” adds another enquiry line so a second room type can be catalogued later without a rewrite.

Estimates use `GET /api/pricing` / `estimateEnquiry` only. If rates are unpublished, the results box stays enquire-only with **no ₹ fallback**. Disclaimer: `*Estimate only, subject to availability`.

---

## Imagery

- Homepage hero: Murudeshwar coastal photograph via `TokenImage` (`next/image`, `priority`, `placeholder="blur"` from the static import) with a mangrove-deep gradient overlay — alt describes the beach scene, not the property.
- Deluxe AC Room occupancy photos: `TokenImage` from `public/Rooms/` (`2sharing.jpeg`, `3sharing.jpeg`, `4sharing.jpeg`, `6Sharing.jpeg`, `8sharing.jpeg`). Lazy-load (below the fold), unique `alt` per tier, 4:3 reserved slot (`aspect-[4/3]`) so the sand-deep skeleton cannot shift layout. Hover (or always-on for touch) reveals occupancy sharing plus the live nightly rate on a mangrove-deep bottom gradient.
- Nearby attraction photos: same `TokenImage` slot from `public/tourist_places/`. Lazy-load, unique `alt` per place. The overlay caption is the attraction name. Do not publish walking times from these images.
- Loading: `placeholder="blur"` (Next.js native). The slot is `bg-sand-deep` with a CSS shimmer (`--sand` highlight) *behind* the photo so a missed `onLoad` cannot hide it. `prefers-reduced-motion: reduce` keeps the slot static. Do not use a generic grey skeleton. Review avatars use the same reserved sand-deep circle (40×40) because they are remote Google URIs.
- Owner property photos only, via `next/image` when they exist. Every `PhotoFrame` (and later image) has an `alt`.
- Until remaining property photos exist (exterior, bathroom): `PhotoFrame` empty state with `role="img"` + `aria-label={alt}`, not Unsplash. Do not show empty frames for those categories.

---

## Motion

No hero carousels, no count-up stats, no animation library.

### Interaction tokens (public site only)

Defined once in `:root` and reused. Do not hand-tune a second duration or easing on a single control.

| Token              | Value                            | Role                                     |
| ------------------ | -------------------------------- | ---------------------------------------- |
| `--ss-duration`    | `180ms`                          | All hover/press transitions (150–250ms)  |
| `--ss-ease`        | `cubic-bezier(0.22, 1, 0.36, 1)` | Shared easing                            |
| `--ss-hover-scale` | `1.02`                           | Buttons on hover                         |
| `--ss-press-scale` | `0.98`                           | Buttons while pressed                    |
| `--ss-card-lift`   | `-0.25rem`                       | Occupancy/pricing cards on hover         |
| `--ss-image-zoom`  | `1.04`                           | Room and attraction photos on hover      |
| `--ss-fab-pulse`   | `2.8s`                           | Slow WhatsApp FAB ring (not hover/press) |

Scoped to `.public-site` (public layout + 404). **Admin (`.admin-shell`) does not use these** — dashboard stays colour-only `duration-150` on buttons/inputs, no scale or lift.

| Surface                   | Hover                                                                           | Press      | Reduced motion                   |
| ------------------------- | ------------------------------------------------------------------------------- | ---------- | -------------------------------- |
| Buttons (`.ss-press`)     | Scale 1.02 + slight brightness                                                  | Scale 0.98 | Brightness only (no transform)   |
| Occupancy cards           | Shadow + translateY                                                             | —          | Shadow only                      |
| Nav / footer (`.ss-link`) | Colour to `--mangrove-fg` (no underline)                                        | —          | Colour transition kept           |
| Room / attraction photos  | Zoom 1.04 + mangrove-deep bottom caption (occupancy + live ₹ / attraction name) | —          | Opacity only (no zoom, no slide) |
| Contact FAB               | Gold circles; WhatsApp has a slow gold pulse ring                               | Scale 0.98 | Pulse off; buttons stay          |

Classes: `ss-press` (on `buttonVariants`), `ss-link`, `ss-card-lift`, `ss-zoom-frame` + `ss-image-zoom`, `ss-photo-caption`, `ss-fab-cluster` / `ss-fab` / `ss-fab-pulse`.

Room/attraction captions sit in `.ss-photo-caption` (sand type on a mangrove-deep gradient from the bottom). Fine-pointer hover (and `:focus-within`) fades them in with `--ss-duration`. Coarse pointers / `hover: none` keep the caption visible. Occupancy ₹ comes from `getPublicPricing` / `formatInr` — never a hardcoded amount. Unpublished rates show the occupancy label only.

Contact FABs are gold (not WhatsApp green — in-flow WhatsApp buttons stay green). They fade/slide in after `[data-ss-hero]` leaves the viewport, and hide while `[data-ss-booking-cta]` (the widget’s WhatsApp button) is on screen. The WhatsApp FAB reuses `buildWhatsAppEnquiryUrl` when the widget is mounted; otherwise `buildGenericWhatsAppEnquiryUrl`. Call is `tel:+919986222892`. Footer padding on small viewports keeps links clear of the cluster.

### Homepage entrance

Not on `/rooms`, `/about`, `/gallery`, `/location`:

1. **Hero entrance** — the photograph (and overlay) fades/scales in from `1.045`. Headline, subtext, then **Check dates** follow at 160 / 260 / 360ms. The last beat finishes by ~760ms. The booking widget is not part of this sequence and must stay visible and usable from first paint.
2. **Scroll fade-up** — `IntersectionObserver` in `RevealOnScroll`. Same ease and 12px rise on Room & Pricing, Photos, About, Nearby Attractions, and FAQ. Content is in the DOM immediately; off-screen sections are only visually pending after mount.

`prefers-reduced-motion: reduce` disables transform-based motion (hero scale, section fade-up, button scale, card lift, image zoom, FAB slide, WhatsApp FAB pulse). Colour and opacity transitions may remain. Never use motion as a loading gate for prices or the widget.

---

## Voice

- Specific: “Deluxe AC Room, priced by how many people share it.”
- Direct: “Message us on WhatsApp with your dates. We confirm availability ourselves.”
- Home H1 includes **Homestay in Murudeshwar** in natural language.

---

## Responsive checks

- 375px: header CTAs usable, widget full width, no horizontal scroll; gold contact FAB must not cover footer links or the widget CTA (it hides while the widget WhatsApp button is on screen; extra footer padding on small viewports)
- 768px: two-column starts on `Split`
- 1280px: widget stays in the 24rem column, sticky below the site header on desktop

Verify on `/`, `/rooms/deluxe-ac-room`, `/contact`, and `/style-guide`.
