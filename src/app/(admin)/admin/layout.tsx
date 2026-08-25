import type { Metadata } from "next";

import { ThemeToggle } from "@/components/theme-toggle";
import { noIndexMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = noIndexMetadata("Admin");

/**
 * Admin route group layout.
 *
 * Intentionally minimal — no marketing header, no public nav, no SiteFooter.
 * Middleware protects all /admin/* routes; individual pages also call auth().
 */
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="admin-shell min-h-screen bg-background text-ink">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-lg items-center justify-between px-gutter py-2 text-sm text-muted">
          <span>Silver Sand — pricing admin only</span>
          <ThemeToggle />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
