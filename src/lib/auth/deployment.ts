/**
 * Edge-safe deployment flags for Auth.js / admin.
 * Importable from middleware (no Node, DB, or bcrypt).
 */

export const LOCAL_DEV_ADMIN_PASSWORD = "local-dev-password-change-me";
const LOCAL_DEV_SECRET_MARKER = "ci-build-secret";

export function isVercelPreview(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

export function isVercelProduction(): boolean {
  return process.env.VERCEL_ENV === "production";
}

/**
 * Preview deploys must not expose the production admin (ARCHITECTURE.md).
 * Override with ALLOW_ADMIN_ON_PREVIEW=true only for a throwaway preview DB.
 */
export function isAdminDisabled(): boolean {
  if (process.env.ALLOW_ADMIN_ON_PREVIEW === "true") return false;
  if (process.env.DISABLE_ADMIN_ON_PREVIEW === "true") return true;
  return isVercelPreview();
}

/** Secure cookies on HTTPS production (Vercel) or when AUTH_URL is https. */
export function shouldUseSecureAuthCookies(): boolean {
  const authUrl = process.env.AUTH_URL ?? "";
  if (authUrl.startsWith("https://")) return true;
  return isVercelProduction();
}

export function isForbiddenProductionPassword(password: string): boolean {
  if (!isVercelProduction()) return false;
  return password === LOCAL_DEV_ADMIN_PASSWORD;
}

export function isProductionAuthSecretWeak(secret: string | undefined): boolean {
  if (!isVercelProduction()) return false;
  if (!secret || secret.length < 32) return true;
  return secret.includes(LOCAL_DEV_SECRET_MARKER);
}
