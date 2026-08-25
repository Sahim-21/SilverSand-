import type { PoolConfig } from "pg";

/**
 * Pool settings for local Postgres and Neon (TCP, including the pooled
 * `-pooler` hostname). Route Handlers stay on the Node runtime — not Edge.
 *
 * Production: use the Neon pooled URI in DATABASE_URL with sslmode=require.
 * drizzle-kit DDL: DATABASE_URL_UNPOOLED (direct / non-pooler) when set.
 */
export function isLocalDatabaseUrl(url: string): boolean {
  try {
    const hostname = new URL(url).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return url.includes("localhost") || url.includes("127.0.0.1");
  }
}

export function getPoolConfig(connectionString: string): PoolConfig {
  const local = isLocalDatabaseUrl(connectionString);
  const serverless = Boolean(process.env.VERCEL);

  return {
    connectionString,
    max: serverless ? 1 : 10,
    idleTimeoutMillis: serverless ? 10_000 : 30_000,
    ssl: local ? undefined : { rejectUnauthorized: true },
  };
}
