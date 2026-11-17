// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from "vitest";
const m=vi.hoisted(()=>({query:vi.fn(),web:vi.fn(),app:vi.fn()}));
vi.mock("@/lib/db/prisma",()=>({prisma:{$queryRawUnsafe:m.query}}));
vi.mock("@/mobile/server/entitlement",()=>({webEntitlement:m.web}));
vi.mock("@/mobile/server/revenuecat",()=>({revenueCatAccess:m.app}));
vi.mock("@/mobile/server/config",()=>({mobileConfig:()=>({enabled:true})}));
vi.mock("@/lib/billing/subscription/config",()=>({monthlyConfig:()=>({mode:"stripe-live"})}));
import { assertNoDuplicatePurchase, auditDuplicatePurchases } from "@/lib/billing/duplicate-purchase-runtime";
const current={id:"current",email:"owner@example.invalid",emailVerified:new Date(),providers:["apple"]};
const other={...current,id:"other",providers:["google"]};
beforeEach(()=>{vi.resetAllMocks();m.query.mockResolvedValueOnce([current]).mockResolvedValue([current,other]);m.web.mockResolvedValue({entitled:false});m.app.mockResolvedValue(null);});
afterEach(()=>vi.restoreAllMocks());
it("rejects a known Stripe membership even when App Store verification is unavailable",async()=>{
  m.web.mockResolvedValue({entitled:true});m.app.mockRejectedValue(Error("provider unavailable"));
  await expect(assertNoDuplicatePurchase("current")).rejects.toMatchObject({code:"duplicate_purchase_google"});
  expect(m.app).not.toHaveBeenCalled();
});
it("refreshes the other account's App Store receipt before authorizing a purchase",async()=>{
  m.app.mockResolvedValue({expiresAt:new Date(Date.now()+60000)});
  await expect(assertNoDuplicatePurchase("current")).rejects.toMatchObject({code:"duplicate_purchase_google"});
  expect(m.app).toHaveBeenCalledExactlyOnceWith("other",true);
});
it("audits committed production receipts without recursively refreshing RevenueCat",async()=>{
  const warn=vi.spyOn(console,"warn").mockImplementation(()=>{});
  m.query.mockReset().mockResolvedValueOnce([current]).mockResolvedValueOnce([current,other]).mockResolvedValueOnce([{active:true}]).mockResolvedValueOnce([{active:false}]);
  m.web.mockImplementation(async id=>({entitled:id==="other"}));
  await auditDuplicatePurchases("current");
  expect(m.app).not.toHaveBeenCalled();
  expect(m.query.mock.calls[2]).toEqual([expect.stringContaining('"productionExpiresAt"'),"current",true]);
  expect(warn).toHaveBeenCalledExactlyOnceWith("duplicate_purchase_stripe_app_store_same_email");
});
