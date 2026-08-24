import { buttonVariants } from "@/components/ui/button";
import {
  BUSINESS_PLACE,
  DISPLAY_PHONE,
  ROOM_NAME,
  TEL_URL,
  WHATSAPP_URL,
} from "@/lib/business";
import { cn } from "@/lib/utils";

export function BookingWidgetPlaceholder() {
  return (
    <aside className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[var(--sea)]">Book your stay</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Pick dates and occupancy for a live estimate once the owner has set rates in the
        admin panel. Until then, message us directly.
      </p>
      <p className="mt-4 text-sm font-medium text-[var(--ink)]">{ROOM_NAME}</p>
      <p className="mt-1 text-xs text-[var(--muted)]">
        Occupancy pricing (2 / 3 / 4 / 6 / 8 sharing) + extra bed — rates from database
        only, not hardcoded here.
      </p>
      <p className="mt-4 text-xs text-[var(--muted)]">
        Estimate only, subject to availability.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "whatsapp" }), "w-full")}
        >
          Check Availability on WhatsApp
        </a>
        <a
          href={TEL_URL}
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
        >
          Call {DISPLAY_PHONE}
        </a>
      </div>
      <p className="mt-4 text-xs text-[var(--muted)]">{BUSINESS_PLACE}</p>
    </aside>
  );
}
