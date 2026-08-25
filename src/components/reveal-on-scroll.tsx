"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Homepage section fade-up. Content is visible in the HTML immediately.
 * Off-screen sections become visually pending only after IntersectionObserver
 * reports they are out of view. The booking widget is never wrapped in this.
 */
export function RevealOnScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "pending" | "in">("idle");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setPhase((current) => (current === "pending" ? "in" : current));
          io.disconnect();
          return;
        }
        setPhase((current) => (current === "idle" ? "pending" : current));
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal",
        phase === "pending" && "is-pending",
        phase === "in" && "is-in",
        className,
      )}
    >
      {children}
    </div>
  );
}
