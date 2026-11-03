import "server-only";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/db/prisma";
import { canonicalPresenceExam, parseStudyPresence, PRESENCE_WINDOW_MS, presenceExamName, type StudyPresenceSnapshot } from "@/lib/study-presence";

const expire = () => prisma.$executeRaw`DELETE FROM "StudyPresence"
  WHERE "lastSeenAt" <= NOW() - ${PRESENCE_WINDOW_MS} * INTERVAL '1 millisecond'`;
const CLEANUP_INTERVAL_MS = 15 * 60_000;
let nextCleanupAt = 0;
function cleanupOnWrite() {
  if (Date.now() < nextCleanupAt) return [];
  // Reserve before awaiting: concurrent writes in this instance cannot all clean up.
  // Expiry is always enforced by SELECT, even when cleanup fails or is delayed.
  nextCleanupAt = Date.now() + CLEANUP_INTERVAL_MS;
  return [expire()];
}
const aggregate = () => prisma.$queryRaw<Array<{ exam: string; count: bigint }>>`
  SELECT "exam", COUNT(*) AS count FROM "StudyPresence"
  WHERE "exam" IS NOT NULL AND "lastSeenAt" > NOW() - ${PRESENCE_WINDOW_MS} * INTERVAL '1 millisecond'
  GROUP BY "exam" ORDER BY count DESC, "exam" ASC`;

const total = () => prisma.$queryRaw<Array<{ count: bigint }>>`
  SELECT COUNT(*) AS count FROM "StudyPresence"
  WHERE "lastSeenAt" > NOW() - ${PRESENCE_WINDOW_MS} * INTERVAL '1 millisecond'`;

function snapshot(rows: Array<{ exam: string; count: bigint }>): StudyPresenceSnapshot {
  // Legacy unqualified rows and qualifications no longer public are not learners of a known exam.
  const exams = rows.filter(row => presenceExamName(row.exam)).map(row => ({ exam: row.exam, count: Number(row.count) }));
  const result = parseStudyPresence({ count: exams.reduce((sum, row) => sum + row.count, 0), exams });
  if (!result) throw new Error("Invalid presence aggregate");
  return result;
}

// Home/selection pages only read; they never create a learner or extend a study window.
export async function readStudyPresence(): Promise<StudyPresenceSnapshot> {
  return snapshot(await aggregate());
}

// Both client formats share one hash row; the newest activity determines its qualification.
function recordOps(visitorId: string, idleMs: number, canonical: string | null, previousVisitorId?: string) {
  const id = createHash("sha256").update(visitorId).digest("hex");
  const previousId = previousVisitorId ? createHash("sha256").update(previousVisitorId).digest("hex") : null;
  return [
    // Atomic daily rotation: the old browser row must not remain in the count.
    ...(previousId && previousId !== id ? [prisma.$executeRaw`DELETE FROM "StudyPresence" WHERE "id" = ${previousId}`] : []),
    prisma.$executeRaw`INSERT INTO "StudyPresence" ("id", "lastSeenAt", "exam")
      VALUES (${id}, NOW() - ${idleMs} * INTERVAL '1 millisecond', ${canonical})
      ON CONFLICT ("id") DO UPDATE
      SET "lastSeenAt" = EXCLUDED."lastSeenAt", "exam" = EXCLUDED."exam"
      WHERE "StudyPresence"."lastSeenAt" < EXCLUDED."lastSeenAt"`,
    ...cleanupOnWrite(),
  ];
}

// The existing daily browser hash remains the only key: one browser, one latest active exam.
export async function recordStudyPresence(visitorId: string, idleMs: number, exam: string, previousVisitorId?: string): Promise<StudyPresenceSnapshot> {
  const canonical = canonicalPresenceExam(exam);
  if (!canonical) throw new Error("Unknown study qualification");
  const results = await prisma.$transaction([...recordOps(visitorId, idleMs, canonical, previousVisitorId), aggregate()]);
  return snapshot(results[results.length - 1] as Array<{ exam: string; count: bigint }>);
}

// Preserve the old overall counter. Unknown activity must never renew an old qualification.
export async function recordLegacyStudyPresence(visitorId: string, idleMs: number, previousVisitorId?: string): Promise<number> {
  const results = await prisma.$transaction([...recordOps(visitorId, idleMs, null, previousVisitorId), total()]);
  const rows = results[results.length - 1] as Array<{ count: bigint }>;
  const count = Number(rows[0]?.count);
  if (!Number.isSafeInteger(count) || count < 0) throw new Error("Invalid legacy presence aggregate");
  return count;
}
