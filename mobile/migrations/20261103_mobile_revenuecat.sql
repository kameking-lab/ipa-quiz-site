-- Owner approval required. Do not apply to production as part of IOS1B.
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
