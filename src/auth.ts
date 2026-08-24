import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { adminUsers } from "@/db/schema";
import { getDb, isDatabaseConfigured } from "@/lib/db";

/**
 * Per-email login attempt tracking.
 *
 * In serverless (Vercel) each Lambda instance has its own memory; this Map
 * resets on cold starts and is not shared across concurrent instances.
 * That is acceptable for v1: bcrypt's cost factor already makes each guess
 * expensive (~100ms), so the effective brute-force rate is limited even
 * without a distributed counter. Record this limitation in CHANGELOG.
 */
const _attempts = new Map<string, { count: number; resetAt: number }>();
const RATE_MAX = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const rec = _attempts.get(email);
  if (!rec || now >= rec.resetAt) return false;
  return rec.count >= RATE_MAX;
}

function recordAttempt(email: string, success: boolean) {
  if (success) {
    _attempts.delete(email);
    return;
  }
  const now = Date.now();
  const rec = _attempts.get(email);
  if (!rec || now >= rec.resetAt) {
    _attempts.set(email, { count: 1, resetAt: now + RATE_WINDOW_MS });
  } else {
    rec.count += 1;
  }
}

/**
 * A pre-computed bcrypt hash used when the email is not found.
 * We always call bcrypt.compare (against this dummy if needed) so response
 * time does not reveal whether an email address exists in admin_users.
 */
const DUMMY_BCRYPT_HASH =
  "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWq";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Credentials provider requires JWT sessions in Auth.js — DB sessions need
  // the adapter, which only works with OAuth providers. JWT stored in an
  // httpOnly, Secure, SameSite=Lax cookie; JS in the browser cannot read it.
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!isDatabaseConfigured()) return null;

        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString();
        if (!email || !password) return null;

        // Layer 1: per-email rate limit (in-process; see note above).
        if (isRateLimited(email)) return null;

        const db = getDb();
        const admin = await db.query.adminUsers.findFirst({
          where: eq(adminUsers.email, email),
        });

        // Always run bcrypt.compare (constant-time) to prevent a timing oracle
        // that would reveal whether an email address is registered.
        const hashToCompare = admin?.passwordHash ?? DUMMY_BCRYPT_HASH;
        const valid = await bcrypt.compare(password, hashToCompare);

        if (!admin || !valid) {
          recordAttempt(email, false);
          return null;
        }

        recordAttempt(email, true);

        await db
          .update(adminUsers)
          .set({ lastLoginAt: new Date() })
          .where(eq(adminUsers.id, admin.id));

        return {
          id: admin.id,
          email: admin.email,
          name: "Owner",
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  trustHost: true,
});
