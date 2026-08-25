"use client";

import { useEffect } from "react";

import {
  applyTheme,
  readStoredTheme,
  systemTheme,
  THEME_STORAGE_KEY,
} from "@/lib/theme";

/**
 * Applies stored or system theme after mount and follows the OS while the
 * visitor has not picked an explicit light/dark choice.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const stored = readStoredTheme();
    applyTheme(stored ?? systemTheme());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      if (readStoredTheme()) return;
      applyTheme(systemTheme());
    };
    media.addEventListener("change", onSystem);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      applyTheme(readStoredTheme() ?? systemTheme());
    };
    window.addEventListener("storage", onStorage);

    return () => {
      media.removeEventListener("change", onSystem);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return children;
}
