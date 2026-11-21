import "server-only";
import { createHash } from "node:crypto";
import { nextJstMidnight } from "@/lib/billing/reset-time";
import { prisma } from "@/lib/db/prisma";
import { canonicalPresenceExam, parseStudyPresence, parseStudyPresenceToday, PRESENCE_WINDOW_MS, type StudyPresenceTodayCount } from "@/lib/study-presence";

const CLEANUP_INTERVAL_MS = 15 * 60_000;
const DAY_MS = 24 * 60 * 60_000;
let nextCleanupAt = 0;
const answerId = (visitorId: string) => `answer:${createHash("sha256").update(visitorId.toLowerCase()).digest("hex")}`;

export async function readStudyPresence(measuredAt: number) {
  const midnight = nextJstMidnight(measuredAt).getTime();
  const todayStart = new Date(midnight - DAY_MS);
  const activeAfter = new Date(measuredAt - PRESENCE_WINDOW_MS);
  // Old clients keep the rolling window even in the first five minutes of a new JST day.
  const rows = await prisma.$queryRaw<Array<{
    exam: string; active: bigint; today: bigint; activeToday: bigint; oldestAnswerAt: Date | null;
  }>>`
    WITH bounds AS (
      SELECT ${activeAfter}::timestamptz AT TIME ZONE 'UTC' AS active_after,
        ${todayStart}::timestamptz AT TIME ZONE 'UTC' AS today_start,
        ${new Date(measuredAt)}::timestamptz AT TIME ZONE 'UTC' AS measured_at
    )
    SELECT "exam", COUNT(*) FILTER (WHERE "lastSeenAt" > active_after) AS active,
      COUNT(*) FILTER (WHERE "lastSeenAt" >= today_start) AS today,
      COUNT(*) FILTER (WHERE "lastSeenAt" >= today_start AND "lastSeenAt" > active_after) AS "activeToday",
      (MIN("lastSeenAt") FILTER (WHERE "lastSeenAt" > active_after)) AT TIME ZONE 'UTC' AS "oldestAnswerAt"
    FROM "StudyPresence" CROSS JOIN bounds
    WHERE "lastSeenAt" >= LEAST(active_after, today_start) AND "lastSeenAt" <= measured_at
      AND "id" LIKE 'answer:%' AND "exam" IS NOT NULL
    GROUP BY "exam"`;
  const activeByExam = new Map<string, number>();
  const todayByExam = new Map<string, StudyPresenceTodayCount>();
  let expiresAt = midnight;
  for (const row of rows) {
    const exam = canonicalPresenceExam(row.exam);
    if (!exam) continue;
    if (row.oldestAnswerAt) {
      activeByExam.set(exam, (activeByExam.get(exam) ?? 0) + Number(row.active));
      expiresAt = Math.min(expiresAt, row.oldestAnswerAt.getTime() + PRESENCE_WINDOW_MS);
    }
    if (row.today > 0n) {
      const previous = todayByExam.get(exam);
      todayByExam.set(exam, { exam, count: (previous?.count ?? 0) + Number(row.today),
        activeCount: (previous?.activeCount ?? 0) + Number(row.activeToday) });
    }
  }
  const exams = Array.from(activeByExam, ([exam, count]) => ({ exam, count }));
  const snapshot = parseStudyPresence({ count: exams.reduce((sum, row) => sum + row.count, 0), exams });
  const dailyExams = [...todayByExam.values()];
  const today = parseStudyPresenceToday({ count: dailyExams.reduce((sum, row) => sum + row.count, 0),
    activeCount: dailyExams.reduce((sum, row) => sum + row.activeCount, 0), exams: dailyExams });
  if (!snapshot || !today) throw new Error("Invalid presence aggregate");
  return { snapshot, today, expiresAt };
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
    const retentionStart = nextJstMidnight(now - 2 * DAY_MS);
    operations.push(prisma.$executeRaw`DELETE FROM "StudyPresence" WHERE "lastSeenAt" < (${retentionStart}::timestamptz AT TIME ZONE 'UTC')`);
  }
  if (operations.length > 1) await prisma.$transaction(operations);
  else await write;
}
