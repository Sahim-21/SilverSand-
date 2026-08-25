import type { StaticImageData } from "next/image";

import { TokenImage } from "@/components/ui/token-image";
import type { OccupancyTier } from "@/lib/business";
import { OCCUPANCY_IMAGES } from "@/lib/rooms/occupancy-images";
import { cn } from "@/lib/utils";

import room2 from "../../../public/Rooms/2sharing.jpeg";
import room3 from "../../../public/Rooms/3sharing.jpeg";
import room4 from "../../../public/Rooms/4sharing.jpeg";
import room6 from "../../../public/Rooms/6Sharing.jpeg";
import room8 from "../../../public/Rooms/8sharing.jpeg";

const ROOM_STATIC: Record<OccupancyTier, StaticImageData> = {
  2: room2,
  3: room3,
  4: room4,
  6: room6,
  8: room8,
};

type OccupancyRoomImageProps = {
  occupancy: OccupancyTier;
  className?: string;
  sizes?: string;
  caption?: string;
};

export function OccupancyRoomImage({
  occupancy,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  caption,
}: OccupancyRoomImageProps) {
  const image = OCCUPANCY_IMAGES[occupancy];

  return (
    <figure
      className={cn("ss-zoom-frame overflow-hidden rounded-lg bg-sand-deep", className)}
    >
      <TokenImage
        src={ROOM_STATIC[occupancy]}
        alt={image.alt}
        fill
        sizes={sizes}
        slotClassName="aspect-[4/3] w-full"
        className="ss-image-zoom object-cover"
      />
      {caption ? (
        <figcaption className="px-1 pt-2 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
