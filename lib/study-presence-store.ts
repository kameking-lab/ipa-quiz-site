import "server-only";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/db/prisma";
import { canonicalPresenceExam, parseStudyPresence, PRESENCE_WINDOW_MS, presenceExamName, type StudyPresenceSnapshot } from "@/lib/study-presence";

const expire = () => prisma.$executeRaw`DELETE FROM "StudyPresence"
  WHERE "lastSeenAt" <= NOW() - ${PRESENCE_WINDOW_MS} * INTERVAL '1 millisecond'`;
const aggregate = () => prisma.$queryRaw<Array<{ exam: string; count: bigint }>>`
  SELECT "exam", COUNT(*) AS count FROM "StudyPresence"
  WHERE "exam" IS NOT NULL AND "lastSeenAt" > NOW() - ${PRESENCE_WINDOW_MS} * INTERVAL '1 millisecond'
  GROUP BY "exam" ORDER BY count DESC, "exam" ASC`;

function snapshot(rows: Array<{ exam: string; count: bigint }>): StudyPresenceSnapshot {
  // Legacy unqualified rows and qualifications no longer public are not learners of a known exam.
  const exams = rows.filter(row => presenceExamName(row.exam)).map(row => ({ exam: row.exam, count: Number(row.count) }));
  const result = parseStudyPresence({ count: exams.reduce((sum, row) => sum + row.count, 0), exams });
  if (!result) throw new Error("Invalid presence aggregate");
  return result;
}

// Home/selection pages only read; they never create a learner or extend a study window.
export async function readStudyPresence(): Promise<StudyPresenceSnapshot> {
  const [, rows] = await prisma.$transaction([expire(), aggregate()]);
  return snapshot(rows);
}

// The existing daily browser hash remains the only key: one browser, one latest active exam.
export async function recordStudyPresence(visitorId: string, idleMs: number, exam: string, previousVisitorId?: string): Promise<StudyPresenceSnapshot> {
  const canonical = canonicalPresenceExam(exam);
  if (!canonical) throw new Error("Unknown study qualification");
  const id = createHash("sha256").update(visitorId).digest("hex");
  const previousId = previousVisitorId ? createHash("sha256").update(previousVisitorId).digest("hex") : null;
  const results = await prisma.$transaction([
    // Atomic daily rotation: the old browser row must not remain in the count.
    ...(previousId && previousId !== id ? [prisma.$executeRaw`DELETE FROM "StudyPresence" WHERE "id" = ${previousId}`] : []),
    prisma.$executeRaw`INSERT INTO "StudyPresence" ("id", "lastSeenAt", "exam")
      VALUES (${id}, NOW() - ${idleMs} * INTERVAL '1 millisecond', ${canonical})
      ON CONFLICT ("id") DO UPDATE
      SET "lastSeenAt" = EXCLUDED."lastSeenAt", "exam" = EXCLUDED."exam"
      WHERE "StudyPresence"."lastSeenAt" < EXCLUDED."lastSeenAt"`,
    expire(), aggregate(),
  ]);
  return snapshot(results[results.length - 1] as Array<{ exam: string; count: bigint }>);
}
