import { unstable_cache } from "next/cache";

import type {
  GoogleReview,
  GoogleReviewAuthor,
  GoogleReviewsResult,
} from "@/lib/google-reviews/types";

const PLACES_DETAILS_BASE = "https://places.googleapis.com/v1/places";
/** Places API returns at most five reviews for the `reviews` field. */
export const GOOGLE_REVIEWS_API_CAP = 5 as const;
const CACHE_REVALIDATE_SECONDS = 60 * 60 * 24; // 24 hours

type PlacesLocalizedText = {
  text?: string;
  languageCode?: string;
};

type PlacesAuthorAttribution = {
  displayName?: string;
  uri?: string;
  photoUri?: string;
};

type PlacesReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  text?: PlacesLocalizedText;
  originalText?: PlacesLocalizedText;
  rating?: number;
  authorAttribution?: PlacesAuthorAttribution;
  googleMapsUri?: string;
  flagContentUri?: string;
};

type PlacesDetailsResponse = {
  reviews?: PlacesReview[];
};

function getApiKey(): string | undefined {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  return key || undefined;
}

function getPlaceId(): string | undefined {
  const id = process.env.GOOGLE_PLACE_ID?.trim();
  return id || undefined;
}

export function isGoogleReviewsConfigured(): boolean {
  return Boolean(getApiKey() && getPlaceId());
}

function normalizeAuthor(raw: PlacesAuthorAttribution | undefined): GoogleReviewAuthor {
  return {
    displayName: raw?.displayName?.trim() || "Google user",
    uri: raw?.uri?.trim() || undefined,
    photoUri: raw?.photoUri?.trim() || undefined,
  };
}

/**
 * Map one Places Review object into the display shape.
 * Skips entries with no usable rating (API contract is 1.0–5.0).
 * Text may be empty when the guest left a star-only review — we still show it.
 */
export function normalizePlaceReview(raw: PlacesReview): GoogleReview | null {
  if (typeof raw.rating !== "number" || Number.isNaN(raw.rating)) return null;

  const text =
    raw.text?.text?.trim() ||
    raw.originalText?.text?.trim() ||
    "";

  return {
    name: raw.name,
    rating: raw.rating,
    text,
    relativePublishTimeDescription: raw.relativePublishTimeDescription?.trim() || "",
    author: normalizeAuthor(raw.authorAttribution),
    googleMapsUri: raw.googleMapsUri?.trim() || undefined,
    flagContentUri: raw.flagContentUri?.trim() || undefined,
  };
}

export function normalizePlacesReviewsResponse(
  body: PlacesDetailsResponse,
): GoogleReview[] {
  const list = Array.isArray(body.reviews) ? body.reviews : [];
  const out: GoogleReview[] = [];
  for (const item of list.slice(0, GOOGLE_REVIEWS_API_CAP)) {
    const normalized = normalizePlaceReview(item);
    if (normalized) out.push(normalized);
  }
  return out;
}

async function fetchReviewsUncached(): Promise<GoogleReviewsResult | null> {
  const apiKey = getApiKey();
  const placeId = getPlaceId();
  if (!apiKey || !placeId) return null;

  const url = `${PLACES_DETAILS_BASE}/${encodeURIComponent(placeId)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        // Only the reviews field — Place Details (New) field mask.
        "X-Goog-FieldMask": "reviews",
      },
      // Prefer our unstable_cache tag over fetch cache alone.
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "[google-reviews] Place Details failed",
        response.status,
        await response.text().catch(() => ""),
      );
      return null;
    }

    const body = (await response.json()) as PlacesDetailsResponse;
    return {
      reviews: normalizePlacesReviewsResponse(body),
      apiCap: GOOGLE_REVIEWS_API_CAP,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[google-reviews] Place Details error", error);
    return null;
  }
}

/**
 * Server-only. Uses GOOGLE_PLACES_API_KEY — never import this from client components.
 * Cached 24h to limit Places API cost (max 5 reviews per response).
 */
export async function getGoogleReviews(): Promise<GoogleReviewsResult | null> {
  if (!isGoogleReviewsConfigured()) return null;

  const cached = unstable_cache(fetchReviewsUncached, ["google-place-reviews"], {
    tags: ["google-reviews"],
    revalidate: CACHE_REVALIDATE_SECONDS,
  });

  return cached();
}
