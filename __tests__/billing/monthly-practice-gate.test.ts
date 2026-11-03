// @vitest-environment node
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { practiceGateEnabled } from "@/lib/billing/practice-access";
import { billingConfig, gateReady } from "@/lib/billing/config";
const monthly = () => ({ BILLING_PRODUCT:"subscription", BILLING_MODE:"stripe-test", BILLING_WEBHOOK_MODE:"stripe-test", BILLING_SUBSCRIPTION_ENABLED:"true", BILLING_SOURCE_INSTANCE:"offline-monthly", BILLING_STRIPE_TEST_PRICE_ID:"price_monthly", BILLING_SUBSCRIPTION_PORTAL_CONFIGURATION_ID:"bpc_monthly", BILLING_ORIGIN:"http://localhost:3338", BILLING_STARTS_AT:"2026-01-02T00:00:00Z", BILLING_NOTICE_AT:"2026-01-01T00:00:00Z", BILLING_LEGAL_REVIEWED:"true", BILLING_SELLER_NAME:"Fixture", BILLING_SELLER_ADDRESS:"Fixture", BILLING_SELLER_PHONE:"000", BILLING_SUPPORT_EMAIL:"fake@example.invalid", BILLING_REFUND_TERMS:"Fixture only" });
describe("practice entry selects the active billing product", () => {
  it("enables the monthly question POST without legacy transition dates", () => { const e=monthly(); expect(gateReady(billingConfig(e))).toBe(false); expect(practiceGateEnabled(e)).toBe(true); });
  it("does not activate monthly practice when sales are disabled", () => { expect(practiceGateEnabled({...monthly(),BILLING_SUBSCRIPTION_ENABLED:"false"})).toBe(false); });
  it("does not activate monthly before its notice/start gate", () => { expect(practiceGateEnabled({...monthly(),BILLING_STARTS_AT:"2099-01-01T00:00:00Z"})).toBe(false); });
  it("preserves the old product transition gate", () => { const e={...monthly(),BILLING_PRODUCT:"pass",BILLING_TRANSITION_STARTS_AT:"2026-01-02T00:00:00.000Z"};expect(practiceGateEnabled(e)).toBe(gateReady(billingConfig(e)));expect(practiceGateEnabled(e)).toBe(true); });
  it("off ignores dormant malformed billing settings", () => { expect(practiceGateEnabled({BILLING_MODE:"off",BILLING_ORIGIN:"%%%",BILLING_PRICE_YEN:"bad"})).toBe(false); });
  it("both normal and stream entry points use the shared decision", () => { for(const p of ["page.tsx","stream/page.tsx"]){const text=readFileSync(new URL(`../../app/quiz/${p}`,import.meta.url),"utf8");expect(text).toContain('practiceGateEnabled()');expect(text).not.toContain('gateReady(billingConfig())');} });
});
