import type { NearbyAttractionName } from "@/lib/site-content";

export type AttractionName = NearbyAttractionName;

export type AttractionImage = {
  src: `/${string}`;
  width: number;
  height: number;
  alt: string;
};

/**
 * Owner-supplied photographs for Nearby Attractions cards.
 * Keys match `nearbyAttractions[].name` in site-content.ts.
 * Filenames match `public/tourist_places/` (Linux is case-sensitive).
 */
export const ATTRACTION_IMAGES: Partial<Record<AttractionName, AttractionImage>> = {
  "Murudeshwar Temple & Shiva statue": {
    src: "/tourist_places/murudeshwar_temple.jpg",
    width: 401,
    height: 498,
    alt: "Murudeshwar Temple and Shiva statue seen from the beach, with the Raja Gopura and seated statue above the shoreline",
  },
  "Murudeshwar Beach": {
    src: "/tourist_places/beach.jpg",
    width: 860,
    height: 645,
    alt: "Murudeshwar Beach curving along the peninsula beside the temple gopura and Shiva statue",
  },
  "Netrani Island": {
    src: "/tourist_places/Netrani.jpg",
    width: 447,
    height: 447,
    alt: "Netrani Island in the Arabian Sea, a rocky islet with a boat approaching through clear water",
  },
  "Idagunji Ganapati Temple": {
    src: "/tourist_places/idagunji_temple.jpg",
    width: 596,
    height: 335,
    alt: "Idagunji Temple entrance with colourful deity sculptures above the gateway",
  },
  "Yana rock formations": {
    src: "/tourist_places/yana.jpeg",
    width: 1080,
    height: 787,
    alt: "Yana rock formations — a dark jagged karst tower rising above forest in the Sahyadri foothills",
  },
  "Murdeshwar jetty & local fish market": {
    src: "/tourist_places/murudeshwar_jetty.jpg",
    width: 400,
    height: 500,
    alt: "Murudeshwar Jetty and fishing boats on the peninsula, with the temple complex beyond",
  },
};
