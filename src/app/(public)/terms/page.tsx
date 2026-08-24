import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)]">Terms</h1>
      <p className="mt-4 text-[var(--muted)]">
        Bookings are confirmed by the host on WhatsApp or phone. Prices on this website
        are estimates until the owner confirms your dates and occupancy. House rules,
        check-in times, and cancellation terms will be published here once the owner
        provides them.
      </p>
    </div>
  );
}
