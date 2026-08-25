import assert from "node:assert/strict";
import { test } from "node:test";

import { getPoolConfig, isLocalDatabaseUrl } from "./db-pool";

function withVercel(value: string | undefined, run: () => void) {
  const previous = process.env.VERCEL;
  if (value === undefined) delete process.env.VERCEL;
  else process.env.VERCEL = value;
  try {
    run();
  } finally {
    if (previous === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = previous;
  }
}

test("local CI and loopback URLs skip TLS", () => {
  assert.equal(isLocalDatabaseUrl("postgresql://ci:ci@localhost:5432/ci"), true);
  assert.equal(isLocalDatabaseUrl("postgresql://ci:ci@127.0.0.1:5432/ci"), true);
  assert.equal(getPoolConfig("postgresql://ci:ci@localhost:5432/ci").ssl, undefined);
});

test("Neon pooled URLs require TLS", () => {
  const neon =
    "postgresql://user:pass@ep-example-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
  assert.equal(isLocalDatabaseUrl(neon), false);
  assert.deepEqual(getPoolConfig(neon).ssl, { rejectUnauthorized: true });
});

test("Vercel serverless uses a single pooled connection", () => {
  const neon =
    "postgresql://user:pass@ep-example-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
  withVercel(undefined, () => {
    assert.equal(getPoolConfig(neon).max, 10);
  });
  withVercel("1", () => {
    assert.equal(getPoolConfig(neon).max, 1);
  });
});
