import {
  ADDRESS_COUNTRY,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  BUSINESS_NAME,
  GEO_LATITUDE,
  GEO_LONGITUDE,
  OCCUPANCY_TIERS,
  PHONE_E164,
  POSTAL_CODE,
  ROOM_NAME,
  ROOM_PATH,
  SITE_URL,
  STREET_ADDRESS,
} from "@/lib/business";
import { formatInr } from "@/lib/pricing/estimate";
import type { PublicPricing } from "@/lib/pricing/types";
import { absoluteUrl } from "@/lib/seo/metadata";

/** JSON-LD values we emit — no functions, no invented nested types. */
export type JsonLdValue =
  string | number | boolean | null | JsonLdObject | JsonLdValue[];

export type JsonLdObject = {
  [key: string]: JsonLdValue | undefined;
};

export type Crumb = {
  href: string;
  label: string;
};

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
  };
}

function occupancyOffers(pricing: PublicPricing): JsonLdObject[] {
  const offers: JsonLdObject[] = pricing.occupancyRates
    .filter((row) => row.nightlyRateInr > 0)
    .map((row) => ({
      "@type": "Offer",
      name: `${pricing.room.name}, ${row.occupancy} sharing`,
      price: String(row.nightlyRateInr),
      priceCurrency: pricing.room.currency || "INR",
      unitText: "NIGHT",
    }));

  if (pricing.room.extraBedRateInr > 0) {
    offers.push({
      "@type": "Offer",
      name: "Extra bed per person",
      price: String(pricing.room.extraBedRateInr),
      priceCurrency: pricing.room.currency || "INR",
      unitText: "NIGHT",
    });
  }

  return offers;
}

function hotelRoomJsonLd(pricing: PublicPricing | null): JsonLdObject {
  const room: JsonLdObject = {
    "@type": "HotelRoom",
    "@id": `${absoluteUrl(ROOM_PATH)}#room`,
    name: pricing?.room.name ?? ROOM_NAME,
    url: absoluteUrl(ROOM_PATH),
    occupancy: {
      "@type": "QuantitativeValue",
      minValue: OCCUPANCY_TIERS[0],
      maxValue: OCCUPANCY_TIERS[OCCUPANCY_TIERS.length - 1],
    },
  };

  if (pricing) {
    const offers = occupancyOffers(pricing);
    if (offers.length > 0) {
      room.offers = offers;
    }
  }

  return room;
}

function priceRangeFromPricing(pricing: PublicPricing): string | undefined {
  const rates = pricing.occupancyRates
    .map((row) => row.nightlyRateInr)
    .filter((amount) => amount > 0);
  if (rates.length === 0) return undefined;
  const min = Math.min(...rates);
  const max = Math.max(...rates);
  return min === max ? formatInr(min) : `${formatInr(min)}–${formatInr(max)}`;
}

/**
 * LodgingBusiness with confirmed NAP + geo from BUSINESS_INFO / Place ID pin.
 * No invented ratings, breakfast, Hotel type, or image until owner photos exist.
 * Offers and priceRange appear only when occupancy rates are published.
 */
export function lodgingBusinessJsonLd(pricing: PublicPricing | null): JsonLdObject {
  const node: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/#lodging`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: PHONE_E164,
    currenciesAccepted: "INR",
    areaServed: {
      "@type": "City",
      name: "Murudeshwar",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: STREET_ADDRESS,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      postalCode: POSTAL_CODE,
      addressCountry: ADDRESS_COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_LATITUDE,
      longitude: GEO_LONGITUDE,
    },
    containsPlace: hotelRoomJsonLd(pricing),
  };

  const range = pricing ? priceRangeFromPricing(pricing) : undefined;
  if (range) {
    node.priceRange = range;
  }

  return node;
}

export function faqPageJsonLd(
  faqs: readonly { q: string; a: string }[],
): JsonLdObject | null {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function breadcrumbListJsonLd(items: readonly Crumb[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}
