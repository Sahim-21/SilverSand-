"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import {
  LIGHTBOX_DURATION_MS,
  LIGHTBOX_SWIPE_PX,
  wrapGalleryIndex,
  type LightboxSlide,
} from "@/lib/images/lightbox";
import { cn } from "@/lib/utils";

type LightboxContextValue = {
  openAt: (index: number) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function focusables(root: HTMLElement): HTMLElement[] {
  return [
    ...root.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ].filter((el) => el.getAttribute("aria-hidden") !== "true");
}

type PhotoLightboxProviderProps = {
  slides: LightboxSlide[];
  /** Accessible name for the dialog, e.g. "Deluxe AC Room photos". */
  label: string;
  children: ReactNode;
};

export function PhotoLightboxProvider({
  slides,
  label,
  children,
}: PhotoLightboxProviderProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<number>(0);

  const openAt = useCallback(
    (nextIndex: number) => {
      if (slides.length === 0) return;
      window.clearTimeout(exitTimer.current);
      setIndex(wrapGalleryIndex(nextIndex, slides.length, 0));
      setExiting(false);
      setOpen(true);
    },
    [slides.length],
  );

  const close = useCallback(() => {
    window.clearTimeout(exitTimer.current);
    if (reducedMotion()) {
      setExiting(false);
      setOpen(false);
      return;
    }
    setExiting(true);
    exitTimer.current = window.setTimeout(() => {
      setOpen(false);
      setExiting(false);
    }, LIGHTBOX_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(exitTimer.current);
  }, []);

  return (
    <LightboxContext.Provider value={{ openAt }}>
      {children}
      {open ? (
        <PhotoLightboxDialog
          slides={slides}
          index={index}
          label={label}
          exiting={exiting}
          onIndex={setIndex}
          onClose={close}
        />
      ) : null}
    </LightboxContext.Provider>
  );
}

export function PhotoLightboxTrigger({
  index,
  label,
  className,
  children,
}: {
  index: number;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("PhotoLightboxTrigger must be used inside PhotoLightboxProvider");
  }

  return (
    <button
      type="button"
      className={cn(
        "block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-haspopup="dialog"
      aria-label={`View larger: ${label}`}
      onClick={() => ctx.openAt(index)}
    >
      {children}
    </button>
  );
}

function PhotoLightboxDialog({
  slides,
  index,
  label,
  exiting,
  onIndex,
  onClose,
}: {
  slides: LightboxSlide[];
  index: number;
  label: string;
  exiting: boolean;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const indexRef = useRef(index);
  const onIndexRef = useRef(onIndex);
  const onCloseRef = useRef(onClose);
  const captionId = useId();
  const slide = slides[index];
  const prevIndex = wrapGalleryIndex(index, slides.length, -1);
  const nextIndex = wrapGalleryIndex(index, slides.length, 1);

  useEffect(() => {
    indexRef.current = index;
    onIndexRef.current = onIndex;
    onCloseRef.current = onClose;
  }, [index, onClose, onIndex]);

  const go = useCallback(
    (delta: number) => {
      onIndex(wrapGalleryIndex(index, slides.length, delta));
    },
    [index, onIndex, slides.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement;
    dialog.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const restoreInert: HTMLElement[] = [];
    for (const child of Array.from(document.body.children)) {
      if (!(child instanceof HTMLElement) || child === dialog) continue;
      if (child.hasAttribute("inert")) continue;
      child.setAttribute("inert", "");
      restoreInert.push(child);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onIndexRef.current(wrapGalleryIndex(indexRef.current, slides.length, -1));
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onIndexRef.current(wrapGalleryIndex(indexRef.current, slides.length, 1));
        return;
      }
      if (event.key !== "Tab") return;
      const nodes = focusables(dialog);
      if (nodes.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreInert.forEach((el) => el.removeAttribute("inert"));
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [slides.length]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < LIGHTBOX_SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
    go(dx > 0 ? -1 : 1);
  };

  if (!slide) return null;

  const nearby = new Set([index, prevIndex, nextIndex]);

  const dialog = (
    <div
      ref={dialogRef}
      className={cn("public-site ss-lightbox", exiting ? "is-exiting" : "is-entered")}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-labelledby={captionId}
      tabIndex={-1}
    >
      <div className="ss-lightbox-backdrop" onClick={onClose} />
      <div className="ss-lightbox-chrome">
        <button
          type="button"
          className="ss-lightbox-control ss-lightbox-close ss-press"
          aria-label="Close photos"
          onClick={onClose}
        >
          <X aria-hidden="true" className="size-5" />
        </button>
        {slides.length > 1 ? (
          <>
            <button
              type="button"
              className="ss-lightbox-control ss-lightbox-prev ss-press"
              aria-label="Previous photo"
              onClick={() => go(-1)}
            >
              <ChevronLeft aria-hidden="true" className="size-6" />
            </button>
            <button
              type="button"
              className="ss-lightbox-control ss-lightbox-next ss-press"
              aria-label="Next photo"
              onClick={() => go(1)}
            >
              <ChevronRight aria-hidden="true" className="size-6" />
            </button>
          </>
        ) : null}
      </div>
      <div
        className="ss-lightbox-stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        {slides.map((item, i) => {
          if (!nearby.has(i)) return null;
          const active = i === index;
          return (
            <Image
              key={item.alt}
              src={item.src}
              alt={active ? item.alt : ""}
              width={item.src.width}
              height={item.src.height}
              sizes="100vw"
              priority={active}
              className={cn(
                "max-h-[min(82vh,52rem)] w-auto max-w-[min(92vw,72rem)] object-contain",
                !active && "hidden",
              )}
            />
          );
        })}
      </div>
      <p id={captionId} className="ss-lightbox-caption">
        {slide.caption}
        <span className="text-sand/70">
          {" "}
          · {index + 1} of {slides.length}
        </span>
      </p>
      <p className="sr-only">
        Use arrow keys or swipe to move between photos. Escape closes the viewer.
      </p>
    </div>
  );

  return createPortal(dialog, document.body);
}
