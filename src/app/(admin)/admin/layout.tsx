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
    <div className="min-h-screen bg-sand text-ink">
      <div className="border-b border-line bg-surface px-gutter py-3 text-sm text-muted">
        Silver Sand — pricing admin
      </div>
      {children}
    </div>
  );
}
