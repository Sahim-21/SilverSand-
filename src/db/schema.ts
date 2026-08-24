import { relations } from "drizzle-orm";
import {
  boolean,
  char,
  integer,
  jsonb,
  pgTable,
  smallint,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const OCCUPANCY_TIERS = [2, 3, 4, 6, 8] as const;
export type OccupancyTier = (typeof OCCUPANCY_TIERS)[number];

export const rooms = pgTable("rooms", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  maxOccupancy: smallint("max_occupancy").notNull().default(8),
  extraBedRateInr: integer("extra_bed_rate_inr").notNull(),
  currency: char("currency", { length: 3 }).notNull().default("INR"),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const occupancyPrices = pgTable(
  "occupancy_prices",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    roomId: uuid("room_id")
      .notNull()
      .references(() => rooms.id, { onDelete: "cascade" }),
    occupancy: smallint("occupancy").notNull(),
    nightlyRateInr: integer("nightly_rate_inr").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [unique().on(table.roomId, table.occupancy)],
);

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

export const priceAuditLog = pgTable("price_audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  roomId: uuid("room_id")
    .notNull()
    .references(() => rooms.id),
  actorUserId: uuid("actor_user_id").references(() => adminUsers.id),
  changedAt: timestamp("changed_at", { withTimezone: true }).notNull().defaultNow(),
  payload: jsonb("payload").notNull(),
});

export const roomsRelations = relations(rooms, ({ many }) => ({
  occupancyPrices: many(occupancyPrices),
  auditLogs: many(priceAuditLog),
}));

export const occupancyPricesRelations = relations(occupancyPrices, ({ one }) => ({
  room: one(rooms, {
    fields: [occupancyPrices.roomId],
    references: [rooms.id],
  }),
}));
