import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { occupancyPrices, priceAuditLog, rooms } from "@/db/schema";
import { isAdminDisabled } from "@/lib/auth/deployment";
import { getDb } from "@/lib/db";
import { ROOM_SLUG } from "@/lib/business";
import { adminPricingPatchSchema } from "@/lib/pricing/validation";

export async function PATCH(request: Request) {
  if (isAdminDisabled()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = adminPricingPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const db = getDb();
  const room = await db.query.rooms.findFirst({
    where: eq(rooms.slug, ROOM_SLUG),
    with: { occupancyPrices: true },
  });

  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  const before = {
    extraBedRateInr: room.extraBedRateInr,
    occupancy: Object.fromEntries(
      room.occupancyPrices.map((p) => [String(p.occupancy), p.nightlyRateInr]),
    ),
  };

  const after = {
    extraBedRateInr: parsed.data.extraBedRateInr,
    occupancy: Object.fromEntries(
      parsed.data.occupancyRates.map((r) => [String(r.occupancy), r.nightlyRateInr]),
    ),
  };

  await db.transaction(async (tx) => {
    await tx
      .update(rooms)
      .set({
        extraBedRateInr: parsed.data.extraBedRateInr,
        isPublished: true,
        updatedAt: new Date(),
      })
      .where(eq(rooms.id, room.id));

    for (const rate of parsed.data.occupancyRates) {
      await tx
        .insert(occupancyPrices)
        .values({
          roomId: room.id,
          occupancy: rate.occupancy,
          nightlyRateInr: rate.nightlyRateInr,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: [occupancyPrices.roomId, occupancyPrices.occupancy],
          set: {
            nightlyRateInr: rate.nightlyRateInr,
            updatedAt: new Date(),
          },
        });
    }

    await tx.insert(priceAuditLog).values({
      roomId: room.id,
      actorUserId: session.user.id,
      payload: { before, after },
    });
  });

  revalidateTag("pricing", "max");
  revalidatePath("/");
  revalidatePath("/rooms");
  revalidatePath("/rooms/deluxe-ac-room");

  return NextResponse.json({ ok: true, updatedAt: new Date().toISOString() });
}
