import Image from "next/image";

import type { OccupancyTier } from "@/lib/business";
import { OCCUPANCY_IMAGES } from "@/lib/rooms/occupancy-images";
import { cn } from "@/lib/utils";

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
    <figure className={cn("overflow-hidden rounded-lg bg-sand-deep", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="aspect-[4/3] h-auto w-full object-cover"
      />
      {caption ? (
        <figcaption className="px-1 pt-2 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
