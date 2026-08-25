import assert from "node:assert/strict";
import { test } from "node:test";

import { ROOM_NAME } from "../business";
import { getAnsweredFaqs, STATIC_FAQS } from "./faqs";
import {
  breadcrumbListJsonLd,
  faqPageJsonLd,
  lodgingBusinessJsonLd,
  websiteJsonLd,
} from "./json-ld";
import { PAGE_SEO } from "./copy";
import type { PublicPricing } from "../pricing/types";

const published: PublicPricing = {
  room: {
    slug: "deluxe-ac",
    name: ROOM_NAME,
    maxOccupancy: 8,
    currency: "INR",
    extraBedRateInr: 500,
    isPublished: true,
  },
  occupancyRates: [
    { occupancy: 2, nightlyRateInr: 2000 },
    { occupancy: 3, nightlyRateInr: 2500 },
    { occupancy: 4, nightlyRateInr: 3000 },
    { occupancy: 6, nightlyRateInr: 4000 },
    { occupancy: 8, nightlyRateInr: 5000 },
  ],
  updatedAt: "2026-08-24T00:00:00.000Z",
};

function collectTypes(value: unknown, into = new Set<string>()): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) collectTypes(item, into);
    return into;
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record["@type"] === "string") into.add(record["@type"]);
    for (const nested of Object.values(record)) collectTypes(nested, into);
  }
  return into;
}

function hasKeyDeep(value: unknown, key: string): boolean {
  if (Array.isArray(value)) return value.some((item) => hasKeyDeep(item, key));
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (key in record) return true;
    return Object.values(record).some((nested) => hasKeyDeep(nested, key));
  }
  return false;
}

test("WebSite JSON-LD has name + url and no SearchAction", () => {
  const node = websiteJsonLd();
  assert.equal(node["@type"], "WebSite");
  assert.equal(typeof node.name, "string");
  assert.equal(typeof node.url, "string");
  const json = JSON.stringify(node);
  assert.equal(json.includes("SearchAction"), false);
});

test("unpublished LodgingBusiness omits Offers, priceRange, geo, ratings", () => {
  const node = lodgingBusinessJsonLd(null);
  const types = collectTypes(node);
  assert.ok(types.has("LodgingBusiness"));
  assert.ok(types.has("HotelRoom"));
  assert.equal(types.has("Hotel"), false);
  assert.equal(types.has("BedAndBreakfast"), false);
  assert.equal(types.has("Offer"), false);
  assert.equal(types.has("AggregateRating"), false);
  assert.equal(types.has("Review"), false);
  assert.equal(types.has("GeoCoordinates"), false);
  assert.equal(node.priceRange, undefined);
  assert.equal(hasKeyDeep(node, "geo"), false);
  assert.equal(hasKeyDeep(node, "streetAddress"), false);
  assert.equal(hasKeyDeep(node, "image"), false);
  const address = node.address as { addressLocality?: string };
  assert.equal(address.addressLocality, "Murudeshwar");
});

test("published LodgingBusiness emits Offer rows from DB rates only", () => {
  const node = lodgingBusinessJsonLd(published);
  const types = collectTypes(node);
  assert.ok(types.has("Offer"));
  assert.equal(typeof node.priceRange, "string");
  const room = node.containsPlace as { offers?: { price: string; name: string }[] };
  assert.ok(room.offers);
  const prices = room.offers.map((offer) => offer.price);
  assert.deepEqual(prices, ["2000", "2500", "3000", "4000", "5000", "500"]);
  assert.equal(
    room.offers.every((offer) => !offer.name.toLowerCase().includes("wifi")),
    true,
  );
});

test("FAQPage schema uses answered questions only", () => {
  const unanswered = getAnsweredFaqs(null);
  assert.deepEqual(
    unanswered.map((item) => item.q),
    STATIC_FAQS.map((item) => item.q),
  );
  const withRates = getAnsweredFaqs(published);
  assert.ok(withRates.some((item) => item.q === "Is there an extra bed?"));
  const blob = JSON.stringify(faqPageJsonLd(unanswered));
  const confirmedPolicyFaqs = [
    "What are check-in and check-out times?",
    "Is parking available?",
    "Do you have Wi-Fi?",
    "What is your cancellation policy?",
  ];
  for (const q of confirmedPolicyFaqs) {
    assert.ok(blob.includes(q), `FAQPage must include: ${q}`);
  }
  assert.ok(blob.includes("11:00 AM"));
  assert.ok(blob.toLowerCase().includes("non-cancellable"));
});

test("BreadcrumbList positions match the trail", () => {
  const node = breadcrumbListJsonLd([
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/rooms/deluxe-ac-room", label: ROOM_NAME },
  ]);
  const items = node.itemListElement as { position: number; name: string }[];
  assert.deepEqual(
    items.map((item) => item.position),
    [1, 2, 3],
  );
  assert.equal(items[2]?.name, ROOM_NAME);
});

test("each public page has a unique title and description", () => {
  const pages = Object.values(PAGE_SEO).filter((page) => page.path !== "/404");
  const titles = pages.map((page) =>
    "absoluteTitle" in page ? page.absoluteTitle : page.title,
  );
  const descriptions = pages.map((page) => page.description);
  assert.equal(new Set(titles).size, titles.length);
  assert.equal(new Set(descriptions).size, descriptions.length);
});
