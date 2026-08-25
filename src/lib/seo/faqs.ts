import { DISPLAY_PHONE, ROOM_NAME } from "@/lib/business";
import { formatInr } from "@/lib/pricing/estimate";
import type { PublicPricing } from "@/lib/pricing/types";

export type FaqItem = {
  q: string;
  a: string;
};

/** Q&A we can stand behind without owner TODOs. */
export const STATIC_FAQS: readonly FaqItem[] = [
  {
    q: "How do I book?",
    a: `Message us on WhatsApp or call ${DISPLAY_PHONE} with your dates and how many guests will share the room. We confirm availability ourselves — there is no instant OTA checkout on this site.`,
  },
  {
    q: "What room types do you have?",
    a: `One type only: ${ROOM_NAME}, with occupancy-based pricing for 2, 3, 4, 6, or 8 sharing.`,
  },
  {
    q: "Are the prices on the website final?",
    a: "They are estimates from our published occupancy rates. We confirm the total on WhatsApp before you travel.",
  },
];

export function extraBedFaq(pricing: PublicPricing | null): FaqItem | null {
  if (!pricing) return null;
  if (pricing.room.extraBedRateInr > 0) {
    return {
      q: "Is there an extra bed charge?",
      a: `Yes. Extra bed is ${formatInr(pricing.room.extraBedRateInr)} per person per night when offered. We confirm the total on WhatsApp.`,
    };
  }
  return {
    q: "Is there an extra bed charge?",
    a: "No extra bed is offered at the current published rate.",
  };
}

/** FAQPage schema must use this list — pending owner questions are UI-only. */
export function getAnsweredFaqs(pricing: PublicPricing | null): FaqItem[] {
  const extra = extraBedFaq(pricing);
  return extra ? [...STATIC_FAQS, extra] : [...STATIC_FAQS];
}
