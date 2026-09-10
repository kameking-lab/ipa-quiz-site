import "server-only";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/db/prisma";

// Shared database, never a process-local counter: Vercel instances must agree.
export async function recordStudyPresence(visitorId: string, idleMs: number): Promise<number> {
  const id = createHash("sha256").update(visitorId).digest("hex");
  const [, , rows] = await prisma.$transaction([
    prisma.$executeRaw`INSERT INTO "StudyPresence" ("id", "lastSeenAt")
      VALUES (${id}, NOW() - ${idleMs} * INTERVAL '1 millisecond') ON CONFLICT ("id") DO UPDATE
      SET "lastSeenAt" = GREATEST("StudyPresence"."lastSeenAt", EXCLUDED."lastSeenAt")
      WHERE "StudyPresence"."lastSeenAt" < EXCLUDED."lastSeenAt"`,
    prisma.$executeRaw`DELETE FROM "StudyPresence" WHERE "lastSeenAt" <= NOW() - INTERVAL '2 minutes'`,
    prisma.$queryRaw<Array<{ count: bigint }>>`SELECT COUNT(*) AS count FROM "StudyPresence"
      WHERE "lastSeenAt" > NOW() - INTERVAL '2 minutes'`,
  ]);
  return Number(rows[0].count);
}
