// NextAuth.js v5 — Route-side & server-side entrypoint.
//
// 利用例:
//   import { auth, signIn, signOut, handlers } from "@/lib/auth";
//   const session = await auth();
//
// DATABASE_URL がある環境でのみ Prisma Adapter を差し込み、永続化を有効化する。
// 未設定環境では JWT のみで動く（OAuth でサインインするたびにトークンを発行）。

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig, isAuthConfigured } from "./config";
import { prisma } from "@/lib/db/prisma";
import { reviewSessionClaims, reviewSessionValid } from "./app-review";

const adapter = process.env.DATABASE_URL ? PrismaAdapter(prisma) : undefined;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter,
  callbacks: {
    ...authConfig.callbacks,
    async jwt(args) {
      const token = await authConfig.callbacks!.jwt!(args);
      if (!token) return null;
      if (args.user?.id) Object.assign(token, reviewSessionClaims(args.user.id));
      if (!reviewSessionValid(token)) return null;
      // Deletion revokes every JWT, including devices retaining an old cookie.
      if (process.env.DATABASE_URL && typeof token.id === "string" &&
          (token.id.startsWith("deleted-billing-") || !await prisma.user.findUnique({where:{id:token.id},select:{id:true}}))) return null;
      return token;
    },
  },
});

export { isAuthConfigured };
