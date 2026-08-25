"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

import { COUNT_INR_DURATION_MS, countInrFrame } from "@/lib/count-inr";
import { formatInr } from "@/lib/pricing/estimate";
import { cn } from "@/lib/utils";

type AnimatedInrProps = {
  amount: number;
  className?: string;
};

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function reducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Display-only count for the stay total. The live estimate is unchanged;
 * the last frame is always `formatInr(amount)`.
 */
export function AnimatedInr({ amount, className }: AnimatedInrProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    reducedMotionSnapshot,
    () => false,
  );
  const exact = formatInr(amount);
  const [label, setLabel] = useState(exact);
  const displayed = useRef(0);

  if (reducedMotion && label !== exact) {
    setLabel(exact);
  }

  useLayoutEffect(() => {
    if (reducedMotion) {
      displayed.current = amount;
      return;
    }

    const from = displayed.current;
    if (from === amount) {
      return;
    }

    let raf = 0;
    const started = performance.now();

    const tick = (now: number) => {
      const t = (now - started) / COUNT_INR_DURATION_MS;
      const value = countInrFrame(from, amount, t);
      displayed.current = t >= 1 ? amount : value;
      // Last frame uses `amount`, not the interpolant, so formatInr matches
      // the live estimate exactly.
      setLabel(t >= 1 ? formatInr(amount) : formatInr(value));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [amount, reducedMotion]);

  const text = reducedMotion ? exact : label;
  const busy = !reducedMotion && text !== exact;

  return (
    <p
      className={cn(
        "font-serif text-2xl font-semibold tabular-nums text-sand",
        className,
      )}
      aria-busy={busy}
      aria-live="polite"
    >
      {text}
    </p>
  );
}
