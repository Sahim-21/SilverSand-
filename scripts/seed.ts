/**
 * Seed the database: one room row (unpublished) + owner admin user.
 * Does NOT invent occupancy nightly rates.
 *
 * Run after migrations:
 *   npx --yes tsx scripts/seed.ts
 */
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import { adminUsers, rooms } from "../src/db/schema";
import { ROOM_NAME, ROOM_SLUG } from "../src/lib/business";

async function main() {
  const url = process.env.DATABASE_URL;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!url || !email || !password) {
    throw new Error("Set DATABASE_URL, ADMIN_EMAIL, and ADMIN_PASSWORD");
  }

  const db = drizzle(neon(url));

  const existingRoom = await db
    .select()
    .from(rooms)
    .where(eq(rooms.slug, ROOM_SLUG))
    .limit(1);

  if (existingRoom.length === 0) {
    await db.insert(rooms).values({
      slug: ROOM_SLUG,
      name: ROOM_NAME,
      maxOccupancy: 8,
      extraBedRateInr: 500,
      isPublished: false,
    });
    console.log("Created room (unpublished, no occupancy rates).");
  } else {
    console.log("Room already exists — skipped.");
  }

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
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
