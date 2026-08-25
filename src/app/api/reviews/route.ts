import { NextResponse } from "next/server";

import { getGoogleReviews, isGoogleReviewsConfigured } from "@/lib/google-reviews/fetch";

/**
 * Public read of Google Place reviews (server-fetched).
 * The Places API key never leaves the server.
 */
export async function GET() {
  if (!isGoogleReviewsConfigured()) {
    return NextResponse.json(
      {
        error: "Reviews unavailable",
        message: "Google Places reviews are not configured.",
      },
      { status: 503 },
    );
  }

  const result = await getGoogleReviews();
  if (!result) {
    return NextResponse.json(
      {
        error: "Reviews unavailable",
        message: "Could not load Google reviews right now.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
