"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type ReviewAvatarProps = {
  src: string;
};

/** 40×40 reserved sand-deep slot for Google profile photos (remote URI, not next/image). */
export function ReviewAvatar({ src }: ReviewAvatarProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-sand-deep">
      {/* eslint-disable-next-line @next/next/no-img-element -- Google profile URIs; no next/image remote config */}
      <img
        src={src}
        alt=""
        width={40}
        height={40}
        className="relative z-[1] h-10 w-10 rounded-full object-cover"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
      />
      <span
        aria-hidden="true"
        className={cn("ss-image-skeleton", loaded && "is-loaded")}
      />
    </span>
  );
}
