"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { HERO_PARALLAX_MIN_WIDTH_PX, heroParallaxOffset } from "@/lib/hero-parallax";

/**
 * Scroll-linked translateY on the hero photograph only.
 * The outer `.hero-media` entrance (scale/fade) lives on the parent, so the
 * two transforms compose instead of overwriting each other.
 */
export function HeroParallax({ children }: { children: ReactNode }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia(`(min-width: ${HERO_PARALLAX_MIN_WIDTH_PX}px)`);

    let frame = 0;
    let live = false;
    let lastY = -1;
    let idleTimer = 0;

    const setOffset = (y: number) => {
      layer.style.transform = y === 0 ? "" : `translate3d(0, ${y}px, 0)`;
    };

    const tick = () => {
      frame = 0;
      if (!live) {
        lastY = 0;
        setOffset(0);
        layer.style.willChange = "";
        return;
      }
      const y = heroParallaxOffset(window.scrollY);
      if (y === lastY) return;
      lastY = y;
      setOffset(y);
    };

    const onScroll = () => {
      if (!live) return;
      if (frame) return;
      layer.style.willChange = "transform";
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        layer.style.willChange = "";
      }, 180);
      frame = window.requestAnimationFrame(tick);
    };

    const stopListening = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      window.clearTimeout(idleTimer);
      lastY = -1;
      setOffset(0);
      layer.style.willChange = "";
    };

    const startListening = () => {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      onScroll();
    };

    const syncEnabled = () => {
      const next = !reduce.matches && wide.matches;
      if (next === live) {
        if (next) onScroll();
        return;
      }
      live = next;
      if (live) {
        startListening();
      } else {
        stopListening();
      }
    };

    syncEnabled();
    reduce.addEventListener("change", syncEnabled);
    wide.addEventListener("change", syncEnabled);

    return () => {
      reduce.removeEventListener("change", syncEnabled);
      wide.removeEventListener("change", syncEnabled);
      live = false;
      stopListening();
    };
  }, []);

  return (
    <div ref={layerRef} className="hero-parallax">
      {children}
    </div>
  );
}
