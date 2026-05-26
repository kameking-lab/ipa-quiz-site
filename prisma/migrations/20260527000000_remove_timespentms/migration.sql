-- Phase 12: drop the dead StudyRecord.timeSpentMs column.
-- It was read by /api/account/history-export but never written by any code
-- path (always NULL), so dropping it loses no data (structural review I-2).
ALTER TABLE "StudyRecord" DROP COLUMN "timeSpentMs";
