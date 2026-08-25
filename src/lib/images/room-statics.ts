import type { StaticImageData } from "next/image";

import type { OccupancyTier } from "@/lib/business";

import room2 from "../../../public/Rooms/2sharing.jpeg";
import room3 from "../../../public/Rooms/3sharing.jpeg";
import room4 from "../../../public/Rooms/4sharing.jpeg";
import room6 from "../../../public/Rooms/6Sharing.jpeg";
import room8 from "../../../public/Rooms/8sharing.jpeg";

export const ROOM_STATIC: Record<OccupancyTier, StaticImageData> = {
  2: room2,
  3: room3,
  4: room4,
  6: room6,
  8: room8,
};
