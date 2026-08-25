import type { OccupancyTier } from "@/lib/business";

export type OccupancyImage = {
  occupancy: OccupancyTier;
  src: `/${string}`;
  width: number;
  height: number;
  alt: string;
};

/**
 * Owner-supplied Deluxe AC Room photos, one per published occupancy tier.
 * Filenames match `public/Rooms/` as committed (Linux is case-sensitive —
 * 6 sharing is `6Sharing.jpeg`).
 */
export const OCCUPANCY_IMAGES: Record<OccupancyTier, OccupancyImage> = {
  2: {
    occupancy: 2,
    src: "/Rooms/2sharing.jpeg",
    width: 960,
    height: 1280,
    alt: "Deluxe AC Room — 2 sharing occupancy at Silver Sand Beach Homestay",
  },
  3: {
    occupancy: 3,
    src: "/Rooms/3sharing.jpeg",
    width: 960,
    height: 1280,
    alt: "Deluxe AC Room arranged for 3 sharing occupancy in Murudeshwar",
  },
  4: {
    occupancy: 4,
    src: "/Rooms/4sharing.jpeg",
    width: 1280,
    height: 960,
    alt: "Deluxe AC Room — 4 sharing occupancy, Silver Sand Beach Homestay",
  },
  6: {
    occupancy: 6,
    src: "/Rooms/6Sharing.jpeg",
    width: 1280,
    height: 960,
    alt: "Deluxe AC Room shown for 6 guests sharing at Silver Sand Beach Homestay",
  },
  8: {
    occupancy: 8,
    src: "/Rooms/8sharing.jpeg",
    width: 1280,
    height: 960,
    alt: "Deluxe AC Room set for 8 sharing occupancy in Murudeshwar",
  },
};
