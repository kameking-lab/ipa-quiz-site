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
// Auth.js may link a new OAuth account to the currently signed-in user.
// Stop that path for the reserved review member before the adapter can write.
if (adapter?.linkAccount) {
  const linkAccount = adapter.linkAccount;
  adapter.linkAccount = async account => {
    const { APP_REVIEW_USER_ID } = await import("./app-review-config");
    if (account.userId === APP_REVIEW_USER_ID) throw new Error("review_account_link_forbidden");
    await linkAccount(account);
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter,
  callbacks: {
    ...authConfig.callbacks,
    async jwt(args) {
      const token = await authConfig.callbacks!.jwt!(args);
      if (!token) return null;
      if (args.user?.id) Object.assign(token, await reviewSessionClaims(args.user.id));
      if (!await reviewSessionValid(token)) return null;
      // Deletion revokes every JWT, including devices retaining an old cookie.
      if (process.env.DATABASE_URL && typeof token.id === "string" &&
          (token.id.startsWith("deleted-billing-") || !await prisma.user.findUnique({where:{id:token.id},select:{id:true}}))) return null;
      return token;
    },
  },
});

export { isAuthConfigured };
