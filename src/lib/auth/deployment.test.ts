import assert from "node:assert/strict";
import { test } from "node:test";

import {
  isAdminDisabled,
  isAuthSecretTooWeak,
  isForbiddenProductionPassword,
  isLocalDevAdminPassword,
  isProductionAuthSecretWeak,
  LOCAL_DEV_ADMIN_PASSWORD,
  shouldUseSecureAuthCookies,
} from "./deployment";

function withEnv(env: Record<string, string | undefined>, run: () => void) {
  const keys = [
    "VERCEL_ENV",
    "AUTH_URL",
    "DISABLE_ADMIN_ON_PREVIEW",
    "ALLOW_ADMIN_ON_PREVIEW",
  ];
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  for (const key of keys) delete process.env[key];
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    run();
  } finally {
    for (const key of keys) {
      const value = previous[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("admin is disabled on Vercel Preview by default", () => {
  withEnv({ VERCEL_ENV: "preview" }, () => {
    assert.equal(isAdminDisabled(), true);
  });
});

test("admin stays enabled on Vercel production and local", () => {
  withEnv({ VERCEL_ENV: "production" }, () => {
    assert.equal(isAdminDisabled(), false);
  });
  withEnv({}, () => {
    assert.equal(isAdminDisabled(), false);
  });
});

test("ALLOW_ADMIN_ON_PREVIEW re-enables preview admin", () => {
  withEnv({ VERCEL_ENV: "preview", ALLOW_ADMIN_ON_PREVIEW: "true" }, () => {
    assert.equal(isAdminDisabled(), false);
  });
});

test("secure cookies follow https AUTH_URL or Vercel production", () => {
  withEnv({ AUTH_URL: "https://silversandhomestay.com" }, () => {
    assert.equal(shouldUseSecureAuthCookies(), true);
  });
  withEnv({ AUTH_URL: "http://127.0.0.1:43123" }, () => {
    assert.equal(shouldUseSecureAuthCookies(), false);
  });
  withEnv({ VERCEL_ENV: "production" }, () => {
    assert.equal(shouldUseSecureAuthCookies(), true);
  });
});

test("local-dev password is rejected only on Vercel production", () => {
  withEnv({ VERCEL_ENV: "production" }, () => {
    assert.equal(isForbiddenProductionPassword(LOCAL_DEV_ADMIN_PASSWORD), true);
    assert.equal(isForbiddenProductionPassword("a-real-owner-password"), false);
  });
  withEnv({}, () => {
    assert.equal(isForbiddenProductionPassword(LOCAL_DEV_ADMIN_PASSWORD), false);
  });
});

test("CI AUTH_SECRET placeholder is weak on Vercel production", () => {
  withEnv({ VERCEL_ENV: "production" }, () => {
    assert.equal(isProductionAuthSecretWeak(undefined), true);
    assert.equal(isProductionAuthSecretWeak("short"), true);
    assert.equal(
      isProductionAuthSecretWeak("ci-build-secret-min-32-chars-long-xx"),
      true,
    );
    assert.equal(
      isProductionAuthSecretWeak("this-is-a-long-enough-random-production-secret"),
      false,
    );
  });
});

test("remote seed helpers reject local-dev credentials without Vercel env", () => {
  assert.equal(isLocalDevAdminPassword(LOCAL_DEV_ADMIN_PASSWORD), true);
  assert.equal(isLocalDevAdminPassword("owner-only-password"), false);
  assert.equal(isAuthSecretTooWeak(undefined), true);
  assert.equal(isAuthSecretTooWeak("ci-build-secret-min-32-chars-long-xx"), true);
  assert.equal(
    isAuthSecretTooWeak("this-is-a-long-enough-random-production-secret"),
    false,
  );
});
