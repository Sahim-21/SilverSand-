# Business information

**Rule:** nothing in the “Confirmed” section is guessed. Third-party listings are in “Unverified — do not publish as fact.”

Last reviewed: 24 August 2026.

---

## Confirmed (from the project owner / this brief)

| Field                         | Value                                                                                                                                               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trading name                  | Silver Sand Beach Homestay                                                                                                                          |
| Category                      | Homestay                                                                                                                                            |
| Place (city / region)         | Murudeshwar, Karnataka, India                                                                                                                       |
| Intended domain               | silversandhomestay.com                                                                                                                              |
| Phone / WhatsApp              | +91 99862 22892                                                                                                                                     |
| E.164 for `tel:` / `wa.me`    | +919986222892                                                                                                                                       |
| Room types                    | **One type:** Deluxe AC Room                                                                                                                        |
| Occupancy pricing ladder      | 2 / 3 / 4 / 6 / 8 sharing                                                                                                                           |
| Extra bed                     | ₹500 per person (unit of time — night vs stay — **not confirmed**; treat as **per person per night** in the data model until the owner corrects it) |
| Public prices                 | Owner-edited in admin; **not** hardcoded on the site                                                                                                |
| Owner-editable besides prices | **Nothing**                                                                                                                                         |
| Conversion                    | Direct WhatsApp + phone call; not OTAs                                                                                                              |

### Occupancy rates (2 / 3 / 4 / 6 / 8)

**Not provided.** Do not invent. Do not copy Coastal Pearl, Kamath, Amani, or Nestle Sahyadri tariffs into the seed.

### Address

**Not provided by the owner.**

### Photos, amenities, policies, GBP, coordinates, reviews

**Not provided by the owner.**

---

## Unverified — do not publish as fact

These appeared on **third-party** pages when researched on 24 August 2026. They may describe this business, a namesake, or a stale OTA scrape. **Ask the owner.** Until confirmed, they stay off the website, schema, and GBP copy we control.

| Claim                                                                                                       | Where it showed up                                                              | Action                                                         |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Naveen Beach Road / Mavalli / PIN 581350                                                                    | Casai, EaseMyTrip, Hotels.com.au-style mirrors for “Silver Sand Beach Homestay” | Confirm full address                                           |
| “Murudeshwara Beach is a few steps away” / sea view / terrace / garden / free Wi-Fi / continental breakfast | Same class of OTA mirrors                                                       | Confirm each amenity separately                                |
| No front desk; private entrance; check-in from 12:00; min age 18                                            | Hotels.com.au-style listing                                                     | Confirm house rules                                            |
| Listed on MakeMyTrip, Agoda, Goibibo, etc.                                                                  | Search snippets for the name                                                    | Confirm which OTAs to **compete with**, not which to advertise |
| “2.0-star” / “2 room types”                                                                                 | Low-quality mirrors (e.g. myservice.pk)                                         | Ignore until owner lists units                                 |

**Amani Beach Homestay** also lists **Naveen Beach Road, Murdeshwar, 581350**. If Silver Sand is on the same road, that is a **direct geographic competitor** — still not a reason to copy their address onto our site.

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
```

`wa.me` URL: `https://wa.me/919986222892`

Default extra-bed **seed** (only this number is owner-supplied): `500` INR, pending confirmation it is per night.

---

## K. Missing-information checklist (collect from the owner)

Exactly what is still required, plus a few items the original list omitted because the site cannot be honest without them.

### From the original list

| #   | Collect                                                                                               | Why it is blocking                                                 |
| --- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 1   | **Full postal address** (house/building, road, locality, PIN)                                         | NAP, Maps, schema `PostalAddress`, footer, GBP match               |
| 2   | **Real photographs** (exterior, room, bathroom, any view) with usage permission                       | Trust; competitors with weak copy still convert on photos          |
| 3   | **Bed and bathroom details** (how many beds, extra mattresses, attached bath, hot water, AC coverage) | 6- and 8-sharing is otherwise an empty claim                       |
| 4   | **Check-in and check-out times**                                                                      | FAQ, WhatsApp, house rules                                         |
| 5   | **Cancellation / payment policy** (advance, UPI, cash, refund)                                        | Reduces back-and-forth on WhatsApp                                 |
| 6   | **Parking** (car, two-wheeler, on-site vs street)                                                     | Family/group intent; Coastal Pearl pushes parking/EV               |
| 7   | **Wi-Fi** (yes/no, where)                                                                             | Standard filter; do not tick it from OTA text                      |
| 8   | **Nearby landmark distances** (beach, temple, bus stand, railway, highway)                            | “Homestay near Murudeshwar beach” page is unethical without this   |
| 9   | **Genuine reviews** (Google links, or written permission to quote)                                    | Amani/Kamath show quotes of mixed quality; we will not invent ours |
| 10  | **Google Business Profile** (exists? login? primary category? hours? photos? WhatsApp?)               | Local pack vs Agoda/Google Travel                                  |
| 11  | **Exact map coordinates** (or owner-controlled Maps pin)                                              | Schema `GeoCoordinates`, embed, “how to reach”                     |

### Extra items this brief still needs (not optional)

| #   | Collect                                                                          | Why                                                             |
| --- | -------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 12  | **₹ nightly for 2, 3, 4, 6, 8 sharing**                                          | Admin has nothing to edit toward; widget cannot show a total    |
| 13  | **Extra bed: per night?** Max extra beds? Included in which occupancies?         | ₹500 is otherwise ambiguous                                     |
| 14  | **Rule for 1, 5, 7 guests**                                                      | Occupancy ladder has holes                                      |
| 15  | **One physical room vs how many Deluxe AC units**                                | Widget quantity; “availability” language                        |
| 16  | **Meals** (none / paid / included / veg only)                                    | Homestay SERP expectation; Nestle Sahyadri sells food hard      |
| 17  | **GST / tax inclusive?**                                                         | Estimate honesty                                                |
| 18  | **Domain registrar + whether silversandhomestay.com is paid and in our control** | Launch                                                          |
| 19  | **Legal / registration** (Karnataka homestay licence) if they want it on-page    | Coastal Pearl claims “Registered & Approved”                    |
| 20  | **Host name(s) and languages**                                                   | About page, trust                                               |
| 21  | **Unmarried couples / ID / local police rules they actually enforce**            | Avoid surprise refusals                                         |
| 22  | **Which OTAs to keep vs de-emphasise**                                           | Goal is direct bookings; they may still need OTAs for occupancy |

When any item is answered, add it to **Confirmed** above with the date, and note the source (WhatsApp from owner, not an OTA). Then changelog.
