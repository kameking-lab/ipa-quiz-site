// NextAuth.js v5 設定
//
// プロバイダ: Google OAuth / GitHub OAuth / Email Magic Link (nodemailer 経由 SMTP)
// セッション: JWT（DB 不要でも動作するよう）
// DB が設定されている場合のみ Prisma Adapter を有効化し、Account/User/Session を永続化する。
//
// 環境変数:
//   AUTH_SECRET                 - 必須
//   AUTH_URL                    - 必須（本番）
//   AUTH_GOOGLE_ID / _SECRET
//   AUTH_GITHUB_ID / _SECRET
//   AUTH_EMAIL_SERVER           - SMTP URL (smtp://user:pass@host:port)
//   AUTH_EMAIL_FROM             - From メールアドレス
//   DATABASE_URL                - あれば Prisma Adapter 有効

import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Nodemailer from "next-auth/providers/nodemailer";

function hasEnv(...keys: string[]) {
  return keys.every((k) => !!process.env[k]);
}

const providers: NextAuthConfig["providers"] = [];

if (hasEnv("AUTH_GOOGLE_ID", "AUTH_GOOGLE_SECRET")) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
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
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    verifyRequest: "/auth/verify-request",
    error: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        if ("plan" in user && typeof user.plan === "string") {
          token.plan = user.plan;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string | undefined) ?? session.user.id;
        session.user.plan = (token.plan as "free" | "premium" | "team" | undefined) ?? "free";
      }
      return session;
    },
  },
  trustHost: true,
};

export const isAuthConfigured = providers.length > 0;
