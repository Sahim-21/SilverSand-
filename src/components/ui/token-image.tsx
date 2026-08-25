"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { TOKEN_BLUR_DATA_URL } from "@/lib/images/placeholder";
import { cn } from "@/lib/utils";

type TokenImageProps = ImageProps & {
  /** Sizes the reserved box to the final photo dimensions (no CLS). */
  slotClassName?: string;
};

/**
 * next/image with a sand-deep reserved slot (no CLS) and `placeholder="blur"`.
 * Shimmer sits behind the photo so a missed onLoad cannot hide it.
 * `prefers-reduced-motion` keeps the slot static.
 */
export function TokenImage({
  alt,
  className,
  slotClassName,
  onLoad,
  placeholder,
  blurDataURL,
  ...props
}: TokenImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const staticSrc = typeof props.src === "object";

  const markLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) markLoaded();
  }, [markLoaded, props.src]);

  return (
    <span className={cn("relative block overflow-hidden bg-sand-deep", slotClassName)}>
      <Image
        {...props}
        ref={imgRef}
        alt={alt}
        placeholder={placeholder ?? "blur"}
        {...(staticSrc ? {} : { blurDataURL: blurDataURL ?? TOKEN_BLUR_DATA_URL })}
        className={cn("z-[1]", className)}
        onLoad={(event) => {
          markLoaded();
          onLoad?.(event);
        }}
      />
      <span
        aria-hidden="true"
        className={cn("ss-image-skeleton", loaded && "is-loaded")}
      />
    </span>
  );
}
