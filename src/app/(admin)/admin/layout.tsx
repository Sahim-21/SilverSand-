import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white text-[var(--ink)]">
      <div className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--muted)]">
        Silver Sand — pricing admin
      </div>
      {children}
    </div>
  );
}
