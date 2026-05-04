// Prisma client singleton.
//
// Next.js の dev HMR で接続がリークしないよう globalThis にキャッシュする。
// @prisma/client は本 PR ではインストールしていない（次 PR で追加）。
// このため型チェック回避のため dynamic require を使わず、
// 呼び出し側でインストール済みであることを前提とする。
//
// 利用例:
//   import { prisma } from "@/lib/db/prisma";
//   const user = await prisma.user.findUnique({ where: { id } });

import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  globalThis.__prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
