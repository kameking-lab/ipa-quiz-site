import "server-only";
import { createHash } from "node:crypto";
import { nextJstMidnight } from "@/lib/billing/reset-time";
import { prisma } from "@/lib/db/prisma";
import { EXAM_CODE_ALIASES } from "@/lib/questions/exam-aliases";
import { canonicalPresenceExam, parseStudyPresence, parseStudyPresenceToday, PRESENCE_WINDOW_MS, type StudyPresenceTodayCount } from "@/lib/study-presence";

const CLEANUP_INTERVAL_MS = 15 * 60_000;
const DAY_MS = 24 * 60 * 60_000;
// The daily room combines parallel question pools. Keep legacy five-minute exam IDs intact.
const dailyExamAliases = new Map<string, string>([...Object.entries(EXAM_CODE_ALIASES), ["sokuryoshiho", "survey-assistant"]]);
let nextCleanupAt = 0;
const dailyPrefix = (dayStart: number) => "daily-answer:" + new Date(dayStart + 9 * 60 * 60_000).toISOString().slice(0, 10) + ":";
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
      const dailyExam = dailyExamAliases.get(exam) ?? exam;
      const previous = todayByExam.get(dailyExam);
      todayByExam.set(dailyExam, { exam: dailyExam, count: (previous?.count ?? 0) + Number(row.today),
        activeCount: (previous?.activeCount ?? 0) + Number(row.activeToday) });
    }
  }
  const exams = Array.from(activeByExam, ([exam, count]) => ({ exam, count }));
  const snapshot = parseStudyPresence({ count: exams.reduce((sum, row) => sum + row.count, 0), exams });
  const dailyExams = [...todayByExam.values()];
  const today = parseStudyPresenceToday({ count: dailyExams.reduce((sum, row) => sum + row.count, 0),
    activeCount: dailyExams.reduce((sum, row) => sum + row.activeCount, 0), exams: dailyExams });
  if (!snapshot || !today) throw new Error("Invalid presence aggregate");
  const yesterday = today.count < 5 ? (await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) AS count FROM "StudyPresence"
    WHERE "lastSeenAt" >= (${new Date(midnight - 2 * DAY_MS)}::timestamptz AT TIME ZONE 'UTC')
      AND "lastSeenAt" < (${todayStart}::timestamptz AT TIME ZONE 'UTC')
      AND "id" LIKE ${dailyPrefix(midnight - 2 * DAY_MS) + "%"}
  `)[0] : undefined;
  return { snapshot, today, expiresAt, yesterdayCount: yesterday ? Number(yesterday.count) : undefined };
}

export async function recordStudyPresence(visitorId: string, answeredAt: number, exam: string, previousVisitorId?: string): Promise<void> {
  const canonical = canonicalPresenceExam(exam);
  if (!canonical) throw new Error("Unknown study qualification");
  const id = answerId(visitorId);
  const previousId = previousVisitorId ? answerId(previousVisitorId) : null;
  const prefix = dailyPrefix(nextJstMidnight(answeredAt).getTime() - DAY_MS);
  const write = prisma.$executeRaw`INSERT INTO "StudyPresence" ("id", "lastSeenAt", "exam")
    VALUES
      (${id}, ${new Date(answeredAt)}::timestamptz AT TIME ZONE 'UTC', ${canonical}),
      (${prefix + id}, ${new Date(answeredAt)}::timestamptz AT TIME ZONE 'UTC', ${canonical})
    ON CONFLICT ("id") DO UPDATE
    SET "lastSeenAt" = EXCLUDED."lastSeenAt", "exam" = EXCLUDED."exam"
    WHERE "StudyPresence"."lastSeenAt" < EXCLUDED."lastSeenAt"`;
  const operations = [write];
  if (previousId && previousId !== id) {
    operations.unshift(prisma.$executeRaw`DELETE FROM "StudyPresence" WHERE "id" IN (${previousId}, ${prefix + previousId})`);
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
