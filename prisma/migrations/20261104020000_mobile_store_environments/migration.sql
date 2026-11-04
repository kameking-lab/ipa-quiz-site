-- DB1: owner approved these nullable columns on 2026-11-04 14:30 JST.
-- Depends on 20261104000000_mobile_revenuecat. Existing values are untouched.
ALTER TABLE "MobileRevenueCatAccount" ADD COLUMN IF NOT EXISTS "productionExpiresAt" TIMESTAMPTZ;
ALTER TABLE "MobileRevenueCatAccount" ADD COLUMN IF NOT EXISTS "sandboxExpiresAt" TIMESTAMPTZ;
