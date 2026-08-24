import type { Metadata } from "next";

import { buttonVariants } from "@/components/ui/button";
import {
  BUSINESS_NAME,
  BUSINESS_PLACE,
  DISPLAY_PHONE,
  TEL_URL,
  WHATSAPP_URL,
} from "@/lib/business";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${BUSINESS_NAME} in Murudeshwar by phone or WhatsApp.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)]">Contact</h1>
      <p className="mt-4 text-[var(--muted)]">
        {BUSINESS_NAME} — {BUSINESS_PLACE}
      </p>
      <p className="mt-4 text-sm text-[var(--muted)]">
        Street address and map pin are not published yet. Use phone or WhatsApp for
        directions and availability.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "whatsapp" }))}
        >
          WhatsApp {DISPLAY_PHONE}
        </a>
        <a href={TEL_URL} className={cn(buttonVariants({ variant: "outline" }))}>
          Call {DISPLAY_PHONE}
        </a>
      </div>
    </div>
  );
}
