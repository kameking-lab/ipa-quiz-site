import "server-only";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/db/prisma";
import { canonicalPresenceExam, parseStudyPresence, PRESENCE_WINDOW_MS, presenceExamName, type StudyPresenceSnapshot } from "@/lib/study-presence";

const CLEANUP_INTERVAL_MS = 15 * 60_000;
let nextCleanupAt = 0;
const cutoff = (at: number) => new Date(at - PRESENCE_WINDOW_MS);
const answerId = (visitorId: string) => `answer:${createHash("sha256").update(visitorId.toLowerCase()).digest("hex")}`;

export async function readStudyPresence(measuredAt: number): Promise<{ snapshot: StudyPresenceSnapshot; expiresAt?: number }> {
  // The prefix excludes pre-release page-open rows in the same table.
  const rows = await prisma.$queryRaw<Array<{ exam: string; count: bigint; oldestAnswerAt: Date }>>`
    SELECT "exam", COUNT(*) AS count, MIN("lastSeenAt") AT TIME ZONE 'UTC' AS "oldestAnswerAt" FROM "StudyPresence"
    WHERE "lastSeenAt" > (${cutoff(measuredAt)}::timestamptz AT TIME ZONE 'UTC')
      AND "lastSeenAt" <= (${new Date(measuredAt)}::timestamptz AT TIME ZONE 'UTC')
      AND "id" LIKE 'answer:%' AND "exam" IS NOT NULL
    GROUP BY "exam"`;
  const qualified = rows.filter(row => presenceExamName(row.exam));
  const exams = qualified.map(row => ({ exam: row.exam, count: Number(row.count) }));
  const snapshot = parseStudyPresence({ count: exams.reduce((sum, row) => sum + row.count, 0), exams });
  if (!snapshot) throw new Error("Invalid presence aggregate");
  const expiresAt = qualified.reduce((earliest, row) => Math.min(earliest, row.oldestAnswerAt.getTime() + PRESENCE_WINDOW_MS), Infinity);
  return { snapshot, expiresAt };
}

export async function recordStudyPresence(visitorId: string, answeredAt: number, exam: string, previousVisitorId?: string): Promise<void> {
  const canonical = canonicalPresenceExam(exam);
  if (!canonical) throw new Error("Unknown study qualification");
  const id = answerId(visitorId);
  const previousId = previousVisitorId ? answerId(previousVisitorId) : null;
  const write = prisma.$executeRaw`INSERT INTO "StudyPresence" ("id", "lastSeenAt", "exam")
    VALUES (${id}, ${new Date(answeredAt)}::timestamptz AT TIME ZONE 'UTC', ${canonical})
    ON CONFLICT ("id") DO UPDATE
    SET "lastSeenAt" = EXCLUDED."lastSeenAt", "exam" = EXCLUDED."exam"
    WHERE "StudyPresence"."lastSeenAt" < EXCLUDED."lastSeenAt"`;
  const operations = [write];
  if (previousId && previousId !== id) {
    operations.unshift(prisma.$executeRaw`DELETE FROM "StudyPresence" WHERE "id" = ${previousId}`);
  }
  const now = Date.now();
  if (now >= nextCleanupAt) {
    // Expiry in SELECT is independent of this opportunistic physical cleanup.
    nextCleanupAt = now + CLEANUP_INTERVAL_MS;
    operations.push(prisma.$executeRaw`DELETE FROM "StudyPresence" WHERE "lastSeenAt" <= (${cutoff(now)}::timestamptz AT TIME ZONE 'UTC')`);
  }
  if (operations.length > 1) await prisma.$transaction(operations);
  else await write;
}
