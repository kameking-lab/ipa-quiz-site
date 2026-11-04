// NextAuth.js v5 設定
//
// 本番の通常ログインはGoogle。Appleは追加設定後に有効。GitHub/SMTPは任意設定。
// セッション: JWT（DB 不要でも動作するよう）
// DB が設定されている場合のみ Prisma Adapter を有効化し、Account/User/Session を永続化する。
//
// 環境変数:
//   AUTH_SECRET                 - 必須
//   AUTH_URL                    - 必須（本番）
//   AUTH_GOOGLE_ID / _SECRET
//   AUTH_APPLE_ID / _SECRET      - Services ID / signed client-secret JWT
//   AUTH_GITHUB_ID / _SECRET
//   AUTH_EMAIL_SERVER           - SMTP URL (smtp://user:pass@host:port)
//   AUTH_EMAIL_FROM             - From メールアドレス
//   DATABASE_URL                - あれば Prisma Adapter 有効

import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Nodemailer from "next-auth/providers/nodemailer";
import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import { APP_REVIEW_EMAIL, APP_REVIEW_USER_ID } from "./app-review-config";

function hasEnv(...keys: string[]) {
  return keys.every((k) => !!process.env[k]);
}

const providers: NextAuthConfig["providers"] = [];

// Authorize on the server only. Keep the endpoint registered so disabling the
// feature at runtime cannot leave a stale provider accepting credentials.
providers.push(Credentials({
  id: "app-review", name: "App Review",
  credentials: { code: { type: "password" } },
  async authorize(credentials, request) {
    const { authorizeAppReview } = await import("./app-review");
    return authorizeAppReview(credentials, request);
  },
}));

if (hasEnv("AUTH_APPLE_ID", "AUTH_APPLE_SECRET")) {
  providers.push(Apple({
    clientId: process.env.AUTH_APPLE_ID, clientSecret: process.env.AUTH_APPLE_SECRET,
    authorization: { params: { scope: "name email", response_mode: "form_post" } },
    checks: ["nonce", "state"],
    allowDangerousEmailAccountLinking: false,
  }));
}

if (hasEnv("AUTH_GOOGLE_ID", "AUTH_GOOGLE_SECRET")) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  );
}

if (hasEnv("AUTH_GITHUB_ID", "AUTH_GITHUB_SECRET")) {
  providers.push(
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

if (hasEnv("AUTH_EMAIL_SERVER", "AUTH_EMAIL_FROM")) {
  providers.push(
    Nodemailer({
      server: process.env.AUTH_EMAIL_SERVER,
      from: process.env.AUTH_EMAIL_FROM,
    }),
  );
}

export const authConfig: NextAuthConfig = {
  providers,
  session: { strategy: "jwt" },
  // Apple returns a cross-site POST. Auth.js makes state/nonce cookies None;
  // preserve the callback cookie too (including the native PKCE destination).
  ...(process.env.AUTH_URL?.startsWith("https://") ? { cookies: {
    callbackUrl: { name: "__Secure-authjs.callback-url", options: {
      httpOnly: true, sameSite: "none" as const, path: "/", secure: true,
    } },
  } } : {}),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    verifyRequest: "/auth/verify-request",
    error: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      // The reserved demo identity is accessible only via its code provider.
      // Never link OAuth/email accounts to it, including from a review session.
      if (account?.provider === "app-review") return user.id === APP_REVIEW_USER_ID;
      if (user.id === APP_REVIEW_USER_ID || user.email?.toLowerCase() === APP_REVIEW_EMAIL) return false;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.authenticatedAt = Date.now();
        if ("plan" in user && typeof user.plan === "string") {
          token.plan = user.plan;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token.reviewVersion === "string") session.reviewVersion = token.reviewVersion;
      if (session.user) {
        session.authenticatedAt = typeof token.authenticatedAt === "number" ? token.authenticatedAt : 0;
        session.user.id = (token.id as string | undefined) ?? session.user.id;
        session.user.plan = (token.plan as "free" | "premium" | "team" | undefined) ?? "free";
      }
      return session;
    },
  },
  trustHost: true,
};

export const isAuthConfigured = providers.some(p => typeof p === "function" || p.id !== "app-review") || process.env.APP_REVIEW_LOGIN_ENABLED === "true";
