# Business information

**Rule:** nothing in the “Confirmed” section is guessed. Third-party listings are in “Unverified — do not publish as fact.”

Last reviewed: 25 August 2026.

---

## Confirmed (from the project owner / this brief)

| Field                         | Value                                                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Trading name                  | Silver Sand Beach Homestay                                                                                     |
| Category                      | Homestay                                                                                                       |
| Place (city / region)         | Murudeshwar, Karnataka, India                                                                                  |
| Intended domain               | silversandhomestay.com                                                                                         |
| Phone / WhatsApp              | +91 99862 22892                                                                                                |
| E.164 for `tel:` / `wa.me`    | +919986222892                                                                                                  |
| Room types                    | **One type:** Deluxe AC Room — all rooms are air-conditioned                                                   |
| Occupancy pricing ladder      | 2 / 3 / 4 / 6 / 8 sharing                                                                                      |
| Extra bed                     | ₹500 per person **per night**; up to the room’s max occupancy cap of **8 total guests** (not sold beyond that) |
| Public prices                 | Owner-edited in admin; **not** hardcoded on the site                                                           |
| Owner-editable besides prices | **Nothing**                                                                                                    |
| Conversion                    | Direct WhatsApp + phone call; not OTAs                                                                         |
| Meals                         | Not included; not offered                                                                                      |
| Wi-Fi                         | Available; **free**                                                                                            |
| Parking                       | Available on-site                                                                                              |
| Check-in                      | 11:00 AM                                                                                                       |
| Check-out                     | 11:00 AM the next day                                                                                          |
| Cancellation                  | Not available — bookings are **non-cancellable / non-refundable**                                              |
| Social share image            | Branded wordmark OG/Twitter card is **final** — no owner photograph required for social sharing                |
| Google Place ID               | `ChIJz7O6_zJHvDsRPrgj4nB9eiE` — reviews (Places API) + map embed (Maps Embed API)                              |
| Full postal address           | 1, Naveen Beach Rd, Murdeshwar, Mavalli, Karnataka 581350, India (from Google Maps for the Place ID above)     |
| Map coordinates (WGS84)       | Latitude `14.1007798`, longitude `74.4874894` (Google Maps place pin for the Place ID)                         |

_Source for rows added 25 August 2026: owner confirmation (this brief)._
_Address / geo: confirmed via owner-supplied Place ID on Google Maps, 25 August 2026._

### Occupancy rates (2 / 3 / 4 / 6 / 8)

Per room, per night (INR). Confirmed by owner, 25 August 2026.

| Sharing | ₹ / night |
| ------- | --------- |
| 2       | 2,000     |
| 3       | 2,500     |
| 4       | 3,000     |
| 6       | 4,000     |
| 8       | 5,000     |

Do not copy Coastal Pearl, Kamath, Amani, or Nestle Sahyadri tariffs — these are owner-supplied only.

### Address

**Confirmed** (25 August 2026) via owner-supplied Google Place ID `ChIJz7O6_zJHvDsRPrgj4nB9eiE`:

**1, Naveen Beach Rd, Murdeshwar, Mavalli, Karnataka 581350, India**

Previously listed only on third-party OTA mirrors — now treated as NAP because it matches the Place ID pin on Google Maps (same phone as confirmed WhatsApp).

### Photos and GBP login

**Not provided by the owner** (site photographs; GBP admin login / primary category cleanup).

### Map coordinates

**Confirmed** (25 August 2026) from the Google Maps pin for the Place ID above:

- Latitude: **14.1007798**
- Longitude: **74.4874894**

Used in `LodgingBusiness` `GeoCoordinates` and the Maps Embed API place map. Checklist #11.

### Guest reviews

**Resolved via live Google Places API (New)** — Place ID `ChIJz7O6_zJHvDsRPrgj4nB9eiE`, server-side Place Details with field mask `reviews` only. Homepage shows whatever Google returns (max 5, ordered by relevance). We do **not** invent, cherry-pick, or hardcode review text. Checklist #9.

Bed and bathroom layout (bed count, mattresses, attached bath, hot water) is still **not** confirmed.

---

## Unverified — do not publish as fact

These appeared on **third-party** pages when researched on 24 August 2026. They may describe this business, a namesake, or a stale OTA scrape. **Ask the owner.** Until confirmed, they stay off the website, schema, and GBP copy we control.

| Claim                                                                                          | Where it showed up                      | Action                                                         |
| ---------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------- |
| “Murudeshwara Beach is a few steps away” / sea view / terrace / garden / continental breakfast | OTA mirrors                             | Confirm each amenity / distance separately                     |
| No front desk; private entrance; check-in from 12:00; min age 18                               | Hotels.com.au-style listing             | Confirm house rules                                            |
| Listed on MakeMyTrip, Agoda, Goibibo, etc.                                                     | Search snippets for the name            | Confirm which OTAs to **compete with**, not which to advertise |
| “2.0-star” / “2 room types”                                                                    | Low-quality mirrors (e.g. myservice.pk) | Ignore until owner lists units                                 |

**Resolved from Place ID (25 August 2026):** Naveen Beach Road / Mavalli / PIN 581350 now matches Google Maps for `ChIJz7O6_zJHvDsRPrgj4nB9eiE` — published as NAP.

**Owner-confirmed separately (25 August 2026):** free Wi-Fi and no meals — do not treat the OTA mirror lines above as the source for those facts.

**Amani Beach Homestay** also lists **Naveen Beach Road, Murdeshwar, 581350**. Same road ≠ same property; our NAP comes from our Place ID, not from copying Amani.

---

## Derived constants (safe to use in code)

Use these; they come from confirmed fields.

```
WHATSAPP_E164=919986222892
TEL=+919986222892
DISPLAY_PHONE=+91 99862 22892
SITE_HOST=silversandhomestay.com
ROOM_SLUG=deluxe-ac
ROOM_NAME=Deluxe AC Room
OCCUPANCY_TIERS=2,3,4,6,8
OCCUPANCY_RATE_2=2000
OCCUPANCY_RATE_3=2500
OCCUPANCY_RATE_4=3000
OCCUPANCY_RATE_6=4000
OCCUPANCY_RATE_8=5000
EXTRA_BED_RATE_INR=500
EXTRA_BED_UNIT=per_person_per_night
MAX_TOTAL_GUESTS=8
CHECK_IN=11:00
CHECK_OUT=11:00
GOOGLE_PLACE_ID=ChIJz7O6_zJHvDsRPrgj4nB9eiE
STREET_ADDRESS=1, Naveen Beach Rd
ADDRESS_LOCALITY=Mavalli
POSTAL_CODE=581350
GEO_LATITUDE=14.1007798
GEO_LONGITUDE=74.4874894
```

`wa.me` URL: `https://wa.me/919986222892`

`GOOGLE_PLACES_API_KEY` is server-only (never `NEXT_PUBLIC_`). Place Details requests use field mask `reviews` only.

`NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` is the Maps **Embed** API key (appears in the iframe URL by design). Restrict HTTP referrers to `silversandhomestay.com` (and preview hosts) in Google Cloud Console. Do not reuse the Places server key as a wide-open browser key.

---

## K. Missing-information checklist (collect from the owner)

Exactly what is still required, plus a few items the original list omitted because the site cannot be honest without them.

### From the original list

| #   | Collect                                                                                               | Why it is blocking                                                 | Status                                                                                                      |
| --- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| 1   | **Full postal address** (house/building, road, locality, PIN)                                         | NAP, Maps, schema `PostalAddress`, footer, GBP match               | ☑ 1, Naveen Beach Rd, Murdeshwar, Mavalli, Karnataka 581350 (Place ID / Maps, 25 Aug 2026)                  |
| 2   | **Real photographs** (exterior, room, bathroom, any view) with usage permission                       | Trust; competitors with weak copy still convert on photos          | ☐ Occupancy room photos in `public/Rooms/` (2/3/4/6/8 sharing, 25 Aug 2026). Exterior / bathroom still open |
| 3   | **Bed and bathroom details** (how many beds, extra mattresses, attached bath, hot water, AC coverage) | 6- and 8-sharing is otherwise an empty claim                       | ☐ AC confirmed; beds/bath still open                                                                        |
| 4   | **Check-in and check-out times**                                                                      | FAQ, WhatsApp, house rules                                         | ☑ 11:00 AM check-in; 11:00 AM next-day check-out (owner, 25 Aug 2026)                                       |
| 5   | **Cancellation / payment policy** (advance, UPI, cash, refund)                                        | Reduces back-and-forth on WhatsApp                                 | ☑ Non-cancellable / non-refundable (owner, 25 Aug 2026). Advance payment method still open.                 |
| 6   | **Parking** (car, two-wheeler, on-site vs street)                                                     | Family/group intent; Coastal Pearl pushes parking/EV               | ☑ On-site (owner, 25 Aug 2026)                                                                              |
| 7   | **Wi-Fi** (yes/no, where)                                                                             | Standard filter; do not tick it from OTA text                      | ☑ Yes, free (owner, 25 Aug 2026)                                                                            |
| 8   | **Nearby landmark distances** (beach, temple, bus stand, railway, highway)                            | “Homestay near Murudeshwar beach” page is unethical without this   | ☐ Pin known; measured distances still open                                                                  |
| 9   | **Genuine reviews** (Google links, or written permission to quote)                                    | Amani/Kamath show quotes of mixed quality; we will not invent ours | ☑ Live Google Places `reviews` on Home (Place ID above; API cap 5; no manual quotes)                        |
| 10  | **Google Business Profile** (exists? login? primary category? hours? photos? WhatsApp?)               | Local pack vs Agoda/Google Travel                                  | ☐ Place ID known; GBP login / cleanup still open                                                            |
| 11  | **Exact map coordinates** (or owner-controlled Maps pin)                                              | Schema `GeoCoordinates`, embed, “how to reach”                     | ☑ 14.1007798, 74.4874894 + Embed API place map (25 Aug 2026)                                                |

### Extra items this brief still needs (not optional)

| #   | Collect                                                                          | Why                                                             | Status                                                                            |
| --- | -------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 12  | **₹ nightly for 2, 3, 4, 6, 8 sharing**                                          | Admin has nothing to edit toward; widget cannot show a total    | ☑ See occupancy table above (owner, 25 Aug 2026)                                  |
| 13  | **Extra bed: per night?** Max extra beds? Included in which occupancies?         | ₹500 is otherwise ambiguous                                     | ☑ ₹500/person/night; max **8 total guests** incl. extra beds (owner, 25 Aug 2026) |
| 14  | **Rule for 1, 5, 7 guests**                                                      | Occupancy ladder has holes                                      | ☐                                                                                 |
| 15  | **One physical room vs how many Deluxe AC units**                                | Widget quantity; “availability” language                        | ☐                                                                                 |
| 16  | **Meals** (none / paid / included / veg only)                                    | Homestay SERP expectation; Nestle Sahyadri sells food hard      | ☑ Not included; not offered (owner, 25 Aug 2026)                                  |
| 17  | **GST / tax inclusive?**                                                         | Estimate honesty                                                | ☐                                                                                 |
| 18  | **Domain registrar + whether silversandhomestay.com is paid and in our control** | Launch                                                          | ☐ DNS steps in `DEPLOYMENT.md`; registrar login still owner                       |
| 19  | **Legal / registration** (Karnataka homestay licence) if they want it on-page    | Coastal Pearl claims “Registered & Approved”                    | ☐                                                                                 |
| 20  | **Host name(s) and languages**                                                   | About page, trust                                               | ☐                                                                                 |
| 21  | **Unmarried couples / ID / local police rules they actually enforce**            | Avoid surprise refusals                                         | ☐                                                                                 |
| 22  | **Which OTAs to keep vs de-emphasise**                                           | Goal is direct bookings; they may still need OTAs for occupancy | ☐                                                                                 |

When any item is answered, add it to **Confirmed** above with the date, and note the source (WhatsApp from owner, not an OTA). Then changelog.
