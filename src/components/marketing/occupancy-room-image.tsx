import { PhotoLightboxTrigger } from "@/components/media/photo-lightbox";
import { PhotoRevealCaption } from "@/components/marketing/photo-reveal-caption";
import { TokenImage } from "@/components/ui/token-image";
import { OCCUPANCY_TIERS, type OccupancyTier } from "@/lib/business";
import { ROOM_STATIC } from "@/lib/images/room-statics";
import { formatInr } from "@/lib/pricing/estimate";
import { OCCUPANCY_IMAGES } from "@/lib/rooms/occupancy-images";
import { cn } from "@/lib/utils";

type OccupancyRoomImageProps = {
  occupancy: OccupancyTier;
  /** Published nightly rate from `getPublicPricing`. Omit when unpublished. */
  nightlyRateInr?: number | null;
  className?: string;
  sizes?: string;
};

export function OccupancyRoomImage({
  occupancy,
  nightlyRateInr,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: OccupancyRoomImageProps) {
  const image = OCCUPANCY_IMAGES[occupancy];
  const priceLabel =
    nightlyRateInr && nightlyRateInr > 0
      ? `${formatInr(nightlyRateInr)} / night`
      : undefined;

  return (
    <PhotoLightboxTrigger
      index={OCCUPANCY_TIERS.indexOf(occupancy)}
      label={image.alt}
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
      <PhotoRevealCaption title={`${occupancy} sharing`} detail={priceLabel} />
    </PhotoLightboxTrigger>
  );
}
