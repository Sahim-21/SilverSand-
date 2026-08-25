import type { NextAuthConfig } from "next-auth";

import { shouldUseSecureAuthCookies } from "@/lib/auth/deployment";

/**
 * Edge-safe Auth.js config (no DB / bcrypt / pg imports).
 * Middleware uses this alone; full Credentials + DB live in `auth.ts`.
 */
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  useSecureCookies: shouldUseSecureAuthCookies(),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isAdminRoute = pathname.startsWith("/admin");
      const isLoginPage = pathname === "/admin/login";
      const isLoggedIn = Boolean(auth);

      if (!isAdminRoute) return true;
      if (isLoginPage) return true;
      return isLoggedIn;
    },
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
} satisfies NextAuthConfig;
