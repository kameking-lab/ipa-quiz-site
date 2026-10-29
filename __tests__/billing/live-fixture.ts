/** Synthetic configuration only. Not credentials, a real account, or activation instructions. */
export function liveEnv(): Record<string, string> {
  return { NODE_ENV: "production", VERCEL: "1", VERCEL_ENV: "production", BILLING_MODE: "stripe-live", BILLING_SOURCE_INSTANCE: "fixture-source", BILLING_WEBHOOK_MODE: "stripe-live", BILLING_LIVE_ACTIVATION: "approved",
    BILLING_COPY_UPDATED: "true", BILLING_ANONYMOUS_MIGRATION_APPROVED: "true", BILLING_LEGAL_REVIEWED: "true",
    BILLING_ORIGIN: "https://test.example.invalid", BILLING_MIGRATION_POLICY_URL: "https://test.example.invalid/notice",
    BILLING_NOTICE_AT: "2026-01-01T00:00:00.000Z", BILLING_TRANSITION_STARTS_AT: "2026-02-01T00:00:00.000Z",
    BILLING_SELLER_NAME: "TEST FIXTURE", BILLING_SELLER_ADDRESS: "TEST FIXTURE", BILLING_SELLER_PHONE: "TEST FIXTURE",
    BILLING_SUPPORT_EMAIL: "test@example.invalid", BILLING_REFUND_TERMS: "TEST FIXTURE",
    BILLING_STRIPE_LIVE_SECRET_KEY: "rk_live_fixture_not_real", BILLING_STRIPE_LIVE_WEBHOOK_SECRET: "whsec_live_fixture_not_real",
    BILLING_STRIPE_LIVE_PRICE_ID: "price_fixture", DATABASE_URL: "postgresql://fixture.invalid/not-connected" };
}
