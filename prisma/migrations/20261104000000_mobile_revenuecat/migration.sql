-- DB1: owner approved these additive tables on 2026-11-04 14:30 JST.
-- Raw SQL is intentional, matching the mobile server queries and feedback_unlock.
-- Re-running preserves existing rows. IF NOT EXISTS does not repair schema drift;
-- check existing columns/constraints first (docs/mobile-db-migrations.md).
CREATE TABLE IF NOT EXISTS "MobileRevenueCatAccount" (
  "userId" TEXT PRIMARY KEY REFERENCES "User"("id") ON DELETE CASCADE,
  "appUserId" TEXT NOT NULL UNIQUE,
  "expiresAt" TIMESTAMPTZ,
  "checkedAt" TIMESTAMPTZ
);
-- Single-use PKCE codes. Only a SHA-256 digest of the code is stored.
CREATE TABLE IF NOT EXISTS "MobileAuthCode" (
  "codeHash" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "challenge" TEXT NOT NULL,
  "expiresAt" TIMESTAMPTZ NOT NULL
);
