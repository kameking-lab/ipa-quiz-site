import { describe, expect, it } from "vitest";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";
const env = () => ({ BILLING_PRODUCT: "subscription", BILLING_MODE: "stripe-test", BILLING_WEBHOOK_MODE: "stripe-test", BILLING_SUBSCRIPTION_ENABLED: "true",
  BILLING_SOURCE_INSTANCE: "offline-monthly", BILLING_STRIPE_TEST_PRICE_ID: "price_monthly", BILLING_SUBSCRIPTION_PORTAL_CONFIGURATION_ID: "bpc_monthly",
  BILLING_ORIGIN: "http://localhost:3338", BILLING_STARTS_AT: "2026-01-02T00:00:00Z", BILLING_NOTICE_AT: "2026-01-01T00:00:00Z", BILLING_LEGAL_REVIEWED: "true",
  BILLING_SELLER_NAME: "Fixture", BILLING_SELLER_ADDRESS: "Fixture", BILLING_SELLER_PHONE: "000", BILLING_SUPPORT_EMAIL: "fake@example.invalid", BILLING_REFUND_TERMS: "Fixture only" });
describe("monthly configuration is dormant and requires distinct production approval", () => {
  it("selects monthly explicitly and defaults to provisional 980/10 without legacy grace", () => {
    expect(monthlySelected({})).toBe(false); const c = monthlyConfig(env()); expect(c.enabled).toBe(true); expect(c.priceYen).toBe(980); expect(c.freeDaily).toBe(10);
  });
  it("sales disabled still permits existing webhook and management config", () => {
    const c = monthlyConfig({ ...env(), BILLING_MODE: "off" }); expect(c.mode).toBe("stripe-test"); expect(c.enabled).toBe(false);
  });
  it("old one-time live approval never activates monthly sales", () => {
    const c = monthlyConfig({ ...env(), BILLING_MODE: "stripe-live", BILLING_WEBHOOK_MODE: "stripe-live", BILLING_ORIGIN: "https://example.invalid", BILLING_STRIPE_LIVE_PRICE_ID: "price_live",
      BILLING_LIVE_ACTIVATION: "approved", BILLING_COPY_UPDATED: "true" }); expect(c.enabled).toBe(false);
  });
  it.each(["BILLING_SUBSCRIPTION_PORTAL_CONFIGURATION_ID", "BILLING_STRIPE_TEST_PRICE_ID", "BILLING_LEGAL_REVIEWED", "BILLING_STARTS_AT", "BILLING_SELLER_NAME"])("missing %s does not start sales", key => {
    const e: Record<string, string> = env(); delete e[key]; expect(monthlyConfig(e).enabled).toBe(false);
  });
  it("rejects a test realm on a production host", () => {
    expect(() => monthlyConfig({ ...env(), VERCEL: "1", VERCEL_ENV: "production" })).toThrow();
  });
});
