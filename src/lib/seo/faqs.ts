import { DISPLAY_PHONE, LANDMARK_BUS_STAND, ROOM_NAME } from "@/lib/business";
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
    a: `Send us a WhatsApp message or call ${DISPLAY_PHONE} with your travel dates and how many guests will share the room. We reply with availability and the rate for your group. There's no pay-now button on this site — we confirm every booking ourselves.`,
  },
  {
    q: "Why is there no online payment?",
    a: "We confirm bookings on WhatsApp and phone, not through an online checkout. Any advance payment is agreed on WhatsApp when we confirm your dates.",
  },
  {
    q: "What rooms do you have?",
    a: `Just one: the ${ROOM_NAME}. It's air-conditioned, has a bathroom, and is priced for 2, 3, 4, 6, or 8 guests sharing.`,
  },
  {
    q: "How does occupancy pricing work?",
    a: "The nightly rate depends on how many guests share the room. A couple pays one rate; a family of six pays more for the same room, but less per person.",
  },
  {
    q: "Are these the rates I'll pay?",
    a: "These are our current nightly rates, GST included. We'll confirm the total on WhatsApp before you travel — if rates have changed, we tell you.",
  },
  {
    q: "Can I book for 5 or 7 guests?",
    a: "We publish rates for 2, 3, 4, 6, and 8 guests. If you're a group of 5 or 7, WhatsApp us and we'll confirm the rate.",
  },
  {
    q: "What are check-in and check-out times?",
    a: "Check-in is at 11:00 AM. Check-out is at 11:00 AM the following day.",
  },
  {
    q: "Is parking available?",
    a: "Yes — parking is on-site.",
  },
  {
    q: "Do you have Wi-Fi?",
    a: "Yes, guests have free Wi-Fi.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Bookings are non-cancellable and non-refundable. Once your stay is confirmed, cancellations and refunds are not available.",
  },
  {
    q: "Do the rates include GST?",
    a: "Yes. The occupancy and extra-bed rates include GST.",
  },
  {
    q: "Does the room have a bathroom?",
    a: "Yes. The Deluxe AC Room has a bathroom.",
  },
  {
    q: "Do I need to bring ID?",
    a: "Yes — please bring a valid ID to check in.",
  },
  {
    q: "How far is the homestay from Murudeshwar bus stand?",
    a: `We're ${LANDMARK_BUS_STAND}.`,
  },
];

export function extraBedFaq(pricing: PublicPricing | null): FaqItem | null {
  if (!pricing) return null;
  if (pricing.room.extraBedRateInr > 0) {
    return {
      q: "Is there an extra bed?",
      a: `Yes. Extra beds can be added up to eight guests in the room. The charge is ${formatInr(pricing.room.extraBedRateInr)} per person per night, GST included. Ask on WhatsApp if you need one for your dates.`,
    };
  }
  return {
    q: "Is there an extra bed?",
    a: "Extra beds aren't listed right now. Ask on WhatsApp if you need one.",
  };
}

/** FAQPage schema must use this list — unanswered owner questions are omitted, not shown as placeholders. */
export function getAnsweredFaqs(pricing: PublicPricing | null): FaqItem[] {
  const extra = extraBedFaq(pricing);
  return extra ? [...STATIC_FAQS, extra] : [...STATIC_FAQS];
}
