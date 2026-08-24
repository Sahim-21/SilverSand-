"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  id?: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  surface?: "light" | "dark";
};

export function QuantityStepper({
  id,
  label,
  value,
  min = 0,
  max = 8,
  onChange,
  surface = "dark",
}: QuantityStepperProps) {
  const onDark = surface === "dark";

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant={onDark ? "outline-on-dark" : "outline"}
        size="icon"
        className="h-12 w-12 shrink-0"
        aria-label={`Decrease ${label}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus className="size-4" />
      </Button>
      <span
        id={id}
        className={cn(
          "min-w-8 text-center text-base tabular-nums font-medium",
          onDark ? "text-sand" : "text-ink",
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <Button
        type="button"
        variant={onDark ? "outline-on-dark" : "outline"}
        size="icon"
        className="h-12 w-12 shrink-0"
        aria-label={`Increase ${label}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
