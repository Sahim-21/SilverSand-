"use client";

import { Moon, Sun } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { applyTheme, storeTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  function toggle() {
    const next: Theme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    applyTheme(next);
    storeTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "h-9 w-9 shrink-0",
      )}
      aria-label="Toggle colour theme"
    >
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
    </button>
  );
}
