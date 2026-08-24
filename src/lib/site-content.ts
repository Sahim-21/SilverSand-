/**
 * Static marketing copy — confirmed facts or general Murudeshwar context only.
 * Do not invent property-specific amenities, distances, or reviews.
 */

/** Well-known reasons people visit Murudeshwar (destination context, not our distances). */
export const murudeshwarContext = {
  intro:
    "Murudeshwar is a coastal temple town in Uttara Kannada, Karnataka — known for the towering Shiva statue, the Murudeshwar Temple on the Arabian Sea, and quiet beaches along the Konkan coast.",
  beach:
    "Murudeshwar Beach is a popular stretch for sunrise walks and family outings near the temple complex. We have not published our homestay’s walking or driving distance to the beach until the owner confirms it.",
  temple:
    "The Murudeshwar Temple and Raja Gopura draw pilgrims and visitors year-round. Many guests combine darshan with a short coastal stay — ask us on WhatsApp when planning your dates.",
};

/** Attractions visitors often pair with a Murudeshwar trip — not “from our doorstep” claims. */
export const nearbyAttractions = [
  {
    name: "Murudeshwar Temple & Shiva statue",
    note: "Iconic coastal temple and one of the tallest Shiva statues in the world.",
  },
  {
    name: "Murudeshwar Beach",
    note: "Sandy shoreline near the temple — popular at sunrise and sunset.",
  },
  {
    name: "Netrani Island (scuba)",
    note: "Day trips for diving are common from the coast; operators are separate from our homestay.",
  },
  {
    name: "Idagunji Ganapati Temple",
    note: "A well-known pilgrimage stop in the region, often combined with a coastal itinerary.",
  },
] as const;
