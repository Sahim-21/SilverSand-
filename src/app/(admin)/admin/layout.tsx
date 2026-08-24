import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Admin",
};

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
    <div className="min-h-screen bg-sand text-ink">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-lg px-gutter py-3 text-sm text-muted">
          Silver Sand — pricing admin only
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
