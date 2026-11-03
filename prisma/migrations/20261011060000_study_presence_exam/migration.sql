-- Existing rows have no measured qualification. Do not infer one.
ALTER TABLE "StudyPresence" ADD COLUMN "exam" TEXT;
