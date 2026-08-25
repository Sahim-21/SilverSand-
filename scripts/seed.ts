/**
 * Seed the database: Deluxe AC Room with owner-confirmed occupancy rates
 * (published) + owner admin user.
 *
 * Occupancy (INR / night): 2→2000, 3→2500, 4→3000, 6→4000, 8→5000.
 * Extra bed: ₹500 per person per night; total guests (occupancy + extra beds)
 * must not exceed max_occupancy (8).
 *
 * Idempotent: re-running updates the room, upserts occupancy rows, and
 * leaves an existing admin user alone.
 *
 *   npm run db:seed
 */
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { adminUsers, occupancyPrices, rooms } from "../src/db/schema";
import {
  isForbiddenProductionPassword,
  isProductionAuthSecretWeak,
} from "../src/lib/auth/deployment";
import { OCCUPANCY_TIERS, ROOM_NAME, ROOM_SLUG } from "../src/lib/business";

/** Owner-confirmed nightly rates — source of truth: docs/BUSINESS_INFO.md */
const OCCUPANCY_NIGHTLY_INR: Record<(typeof OCCUPANCY_TIERS)[number], number> = {
  2: 2000,
  3: 2500,
  4: 3000,
  6: 4000,
  8: 5000,
};

const EXTRA_BED_RATE_INR = 500;
const MAX_OCCUPANCY = 8;

async function main() {
  const url = process.env.DATABASE_URL;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!url || !email || !password) {
    throw new Error("Set DATABASE_URL, ADMIN_EMAIL, and ADMIN_PASSWORD");
  }
  if (isForbiddenProductionPassword(password)) {
    throw new Error(
      "ADMIN_PASSWORD is the local-dev placeholder. Set a unique production password before seeding Vercel production.",
    );
  }
  if (isProductionAuthSecretWeak(process.env.AUTH_SECRET)) {
    throw new Error(
      "AUTH_SECRET is missing, too short, or the CI placeholder. Set a unique production secret.",
    );
  }

  const pool = new pg.Pool({ connectionString: url });
  const db = drizzle(pool);
  const now = new Date();

  try {
    const existingRoom = await db
      .select()
      .from(rooms)
      .where(eq(rooms.slug, ROOM_SLUG))
      .limit(1);

    let roomId: string;

    if (existingRoom.length === 0) {
      const inserted = await db
        .insert(rooms)
        .values({
          slug: ROOM_SLUG,
          name: ROOM_NAME,
          maxOccupancy: MAX_OCCUPANCY,
          extraBedRateInr: EXTRA_BED_RATE_INR,
          isPublished: true,
          updatedAt: now,
        })
        .returning({ id: rooms.id });
      roomId = inserted[0].id;
      console.log("Created room (published, with occupancy rates).");
    } else {
      roomId = existingRoom[0].id;
      await db
        .update(rooms)
        .set({
          name: ROOM_NAME,
          maxOccupancy: MAX_OCCUPANCY,
          extraBedRateInr: EXTRA_BED_RATE_INR,
          isPublished: true,
          updatedAt: now,
        })
        .where(eq(rooms.id, roomId));
      console.log("Updated room (published, rates refreshed).");
    }

    for (const occupancy of OCCUPANCY_TIERS) {
      const nightlyRateInr = OCCUPANCY_NIGHTLY_INR[occupancy];
      await db
        .insert(occupancyPrices)
        .values({
          roomId,
          occupancy,
          nightlyRateInr,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: [occupancyPrices.roomId, occupancyPrices.occupancy],
          set: {
            nightlyRateInr,
            updatedAt: now,
          },
        });
    }
    console.log(
      "Upserted occupancy rates:",
      OCCUPANCY_TIERS.map((t) => `${t}=${OCCUPANCY_NIGHTLY_INR[t]}`).join(", "),
    );
    console.log(
      `Extra bed: ₹${EXTRA_BED_RATE_INR}/person/night (cap: ${MAX_OCCUPANCY} total guests).`,
    );

    const existingAdmin = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email.toLowerCase()))
      .limit(1);

    if (existingAdmin.length === 0) {
      const passwordHash = await bcrypt.hash(password, 12);
      await db.insert(adminUsers).values({
        email: email.toLowerCase(),
        passwordHash,
      });
      console.log("Created admin user.");
    } else {
      console.log("Admin user already exists — skipped.");
    }
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
