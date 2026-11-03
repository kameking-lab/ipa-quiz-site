import { describe, it, expect } from "vitest";
import { billingConfig, gateReady, checkoutReady } from "@/lib/billing/config";
import { liveEnv } from "./live-fixture";
describe("live activation is explicit, complete, and independent from host deployment", () => {
  it("can activate on production only with explicit operator approval and all required settings", () => {
    const c = billingConfig(liveEnv()); expect(c.mode).toBe("stripe-live"); expect(checkoutReady(c)).toBe(true);
    expect(billingConfig({ NODE_ENV: "production", VERCEL: "1" }).mode).toBe("off");
  });
  it.each(["BILLING_LIVE_ACTIVATION", "BILLING_SOURCE_INSTANCE", "BILLING_WEBHOOK_MODE", "BILLING_COPY_UPDATED", "BILLING_ANONYMOUS_MIGRATION_APPROVED", "BILLING_LEGAL_REVIEWED",
    "BILLING_ORIGIN", "BILLING_MIGRATION_POLICY_URL", "BILLING_NOTICE_AT", "BILLING_TRANSITION_STARTS_AT", "BILLING_SELLER_NAME",
    "BILLING_SELLER_ADDRESS", "BILLING_SELLER_PHONE", "BILLING_SUPPORT_EMAIL", "BILLING_REFUND_TERMS", "DATABASE_URL",
    "BILLING_STRIPE_LIVE_SECRET_KEY", "BILLING_STRIPE_LIVE_WEBHOOK_SECRET", "BILLING_STRIPE_LIVE_PRICE_ID"])("missing %s leaves gate off", key => {
    const env = liveEnv(); delete env[key]; expect(billingConfig(env).mode).toBe("off");
  });
  it("rejects test keys, malformed config, non-HTTPS origin and foreign migration notice", () => {
    for (const patch of [{ BILLING_STRIPE_LIVE_SECRET_KEY: "sk_test_fixture" }, { BILLING_ORIGIN: "bad" }, { BILLING_PRICE_YEN: "bad" },
      { BILLING_ORIGIN: "http://test.example.invalid" }, { BILLING_MIGRATION_POLICY_URL: "https://foreign.invalid/notice" },
      { BILLING_NOTICE_AT: "2026-02-01T00:00:00.000Z" }]) expect(billingConfig({ ...liveEnv(), ...patch }).mode).toBe("off");
  });
  it("future announced effective date does not start restrictions early", () => {
    const c = billingConfig({ ...liveEnv(), BILLING_TRANSITION_STARTS_AT: "2099-01-01T00:00:00.000Z" });
    expect(c.mode).toBe("stripe-live"); expect(gateReady(c)).toBe(false);
  });
});
