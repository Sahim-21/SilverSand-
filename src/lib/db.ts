import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "@/db/schema";
import { getPoolConfig } from "@/lib/db-pool";

function getDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(getDatabaseUrl());
}

/**
 * Shared Pool for the Node.js process. Works with Neon (TCP / pooled
 * connection string, TLS on) and local Postgres (no TLS). Route Handlers
 * and Server Components run on the Node runtime — not Edge — so `pg` is
 * correct here. On Vercel the pool is size 1 (`src/lib/db-pool.ts`).
 */
const globalForDb = globalThis as unknown as { __pgPool?: Pool };

function getPool(): Pool {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!globalForDb.__pgPool) {
    globalForDb.__pgPool = new Pool(getPoolConfig(url));
  }
  return globalForDb.__pgPool;
}

export function getDb() {
  return drizzle(getPool(), { schema });
}

export type Db = ReturnType<typeof getDb>;
