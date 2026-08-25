import { NextResponse } from "next/server";

import { getPublicPricing } from "@/lib/pricing/fetch";

export async function GET() {
  try {
    const pricing = await getPublicPricing();

    if (!pricing) {
      return NextResponse.json(
        {
          error: "Pricing unavailable",
          message:
            "Pricing unavailable. Please call or WhatsApp us for today's price.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(pricing, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch {
    return NextResponse.json({ error: "Pricing unavailable" }, { status: 503 });
  }
}
