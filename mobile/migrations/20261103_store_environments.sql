-- Review only. No runtime schema mutation, no production execution in IOS1D.
ALTER TABLE "MobileRevenueCatAccount" ADD COLUMN IF NOT EXISTS "productionExpiresAt" TIMESTAMPTZ;
ALTER TABLE "MobileRevenueCatAccount" ADD COLUMN IF NOT EXISTS "sandboxExpiresAt" TIMESTAMPTZ;
