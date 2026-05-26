-- Phase 11: add a unique constraint on StudyRecord so history-sync's
-- createMany({ skipDuplicates: true }) actually de-duplicates at the DB level.
--
-- Existing rows may already contain duplicates (the previous skipDuplicates was
-- a no-op), so collapse them first — keep the lexicographically smallest id per
-- (userId, questionId, answeredAt) group, delete the rest.
DELETE FROM "StudyRecord" a
USING "StudyRecord" b
WHERE a."id" > b."id"
  AND a."userId" = b."userId"
  AND a."questionId" = b."questionId"
  AND a."answeredAt" = b."answeredAt";

-- CreateIndex
CREATE UNIQUE INDEX "StudyRecord_userId_questionId_answeredAt_key" ON "StudyRecord"("userId", "questionId", "answeredAt");
