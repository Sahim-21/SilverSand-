import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 prose prose-neutral">
      <h1 className="font-serif text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 text-[var(--muted)]">
        When you contact Silver Sand Beach Homestay by phone or WhatsApp, we use your
        number and message only to respond about your stay. We do not sell your data.
        This site does not use a payment gateway in v1.
      </p>
      <p className="mt-4 text-sm text-[var(--muted)]">
        Full policy text will be expanded before public launch if required by the
        owner&apos;s counsel.
      </p>
    </div>
  );
}
