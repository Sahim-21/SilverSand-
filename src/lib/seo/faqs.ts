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
    a: `Send us a WhatsApp message or call ${DISPLAY_PHONE} with your travel dates and how many guests will share the room. We reply with availability and the rate for your group. There is no instant checkout — we confirm every booking ourselves.`,
  },
  {
    q: "Why is there no online payment?",
    a: "We confirm bookings on WhatsApp and phone, not through an OTA checkout. Advance payment terms are set by the owner and will be published here once confirmed.",
  },
  {
    q: "What room types are available?",
    a: `One type: the ${ROOM_NAME}. It is air-conditioned and priced by how many guests share it — 2, 3, 4, 6, or 8. There are no other room categories at this homestay.`,
  },
  {
    q: "How does occupancy pricing work?",
    a: "The nightly rate changes with the number of guests sharing the room. A couple (2 sharing) pays one rate; a family of six (6 sharing) pays a different, higher rate for the same room. The per-person cost is lower for larger groups.",
  },
  {
    q: "Are the prices on this website final?",
    a: "The rates on this page are the current occupancy rates. We confirm the total on WhatsApp before you travel — if rates have changed, we tell you.",
  },
  {
    q: "Can I book for 5 or 7 guests?",
    a: "The published occupancy tiers are 2, 3, 4, 6, and 8. If your group is 5 or 7, WhatsApp us — the owner will confirm whether that occupancy is accepted and at which rate.",
  },
  {
    q: "What are check-in and check-out times?",
    a: "Check-in is at 11:00 AM. Check-out is at 11:00 AM the following day.",
  },
  {
    q: "Is parking available?",
    a: "Yes — parking is available on-site.",
  },
  {
    q: "Do you have Wi-Fi?",
    a: "Yes, free Wi-Fi is available for guests.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Bookings are non-cancellable and non-refundable. Once your stay is confirmed, cancellations and refunds are not available.",
  },
];

export function extraBedFaq(pricing: PublicPricing | null): FaqItem | null {
  if (!pricing) return null;
  if (pricing.room.extraBedRateInr > 0) {
    return {
      q: "Is there an extra bed?",
      a: `Yes. Extra beds are offered up to eight guests in the room. The current charge is ${formatInr(pricing.room.extraBedRateInr)} per person per night. Confirm on WhatsApp that an extra bed is available for your dates before including it in the total.`,
    };
  }
  return {
    q: "Is there an extra bed?",
    a: "No extra bed is offered at the current published rate. Ask on WhatsApp if you need one — the owner may accommodate it for certain dates.",
  };
}

/** FAQPage schema must use this list — pending owner questions are UI-only. */
export function getAnsweredFaqs(pricing: PublicPricing | null): FaqItem[] {
  const extra = extraBedFaq(pricing);
  return extra ? [...STATIC_FAQS, extra] : [...STATIC_FAQS];
}
