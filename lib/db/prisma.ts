// Prisma client singleton.
//
// The client is only instantiated when DATABASE_URL is set. In environments
// without a provisioned database (the default today) this stays null and every
// caller is already guarded by an `if (!process.env.DATABASE_URL) … 503` check,
// so the typed `prisma` is never dereferenced. Once DATABASE_URL is provided
// (and `prisma migrate deploy` has run), all sync endpoints activate together.
//
// Usage:
//   import { prisma } from "@/lib/db/prisma";
//   if (!process.env.DATABASE_URL) return 503;  // guard first
//   const rows = await prisma.studyRecord.findMany(...);

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  (process.env.DATABASE_URL
    ? new PrismaClient()
    : // No DB provisioned: keep the historical null placeholder. Callers gate
      // on DATABASE_URL before touching this, so the cast is safe.
      (null as unknown as PrismaClient));

if (process.env.DATABASE_URL && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
