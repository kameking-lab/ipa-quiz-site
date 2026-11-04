-- DB1: owner approved these additive objects on 2026-11-04 14:30 JST.
-- Depends on 20261104000000_mobile_revenuecat. No backfill or row mutation.
-- This row describes an unlinked accounting surrogate with no login/profile.
CREATE TABLE IF NOT EXISTS "DeletedBillingRetention" (
  "archiveId" TEXT PRIMARY KEY REFERENCES "User"("id") ON DELETE CASCADE,
  "purgeAfter" TIMESTAMPTZ NOT NULL
);
-- Retention cleanup must delete dependent financial records in FK order and
-- then this surrogate after purgeAfter, under an authorized maintenance job.
ALTER TABLE "MobileAuthCode" ADD COLUMN IF NOT EXISTS "authenticatedAt" BIGINT;
