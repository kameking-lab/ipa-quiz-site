// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from "vitest";
const m=vi.hoisted(()=>({query:vi.fn(),web:vi.fn(),app:vi.fn(),readAppStoreStatus:vi.fn(),record:vi.fn(),reconcile:vi.fn(),after:vi.fn(),provider:{}}));
vi.mock("next/server",()=>({after:m.after}));
vi.mock("@/lib/db/prisma",()=>({prisma:{$queryRawUnsafe:m.query}}));
vi.mock("@/mobile/server/entitlement",()=>({webEntitlement:m.web}));
vi.mock("@/mobile/server/revenuecat",()=>({readAppStorePurchaseStatus:m.readAppStoreStatus,revenueCatAccess:m.app}));
vi.mock("@/mobile/server/config",()=>({mobileConfig:()=>({enabled:true})}));
vi.mock("@/lib/billing/subscription/config",()=>({monthlyConfig:()=>({mode:"stripe-live"}),monthlySelected:()=>true}));
vi.mock("@/lib/billing/subscription/runtime",()=>({monthlyRuntime:()=>({
  service:{recordAppStoreOverlaps:m.record,reconcileAppStoreOverlap:m.reconcile},provider:m.provider,
})}));
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
  expect(m.app).toHaveBeenCalledExactlyOnceWith("other", { scope: "web", fresh: true });
});
it("queues overlaps from committed production receipts without recursively refreshing RevenueCat",async()=>{
  m.query.mockReset().mockResolvedValueOnce([current]).mockResolvedValueOnce([current,other]).mockResolvedValueOnce([{active:true}]).mockResolvedValueOnce([{active:false}]);
  m.web.mockImplementation(async id=>({entitled:id==="other"}));
  m.record.mockResolvedValue([{userId:"other",orderId:"existing-order",newlyRecorded:false}]);
  await auditDuplicatePurchases("current");
  expect(m.app).not.toHaveBeenCalled();
  expect(m.web).not.toHaveBeenCalled();
  expect(m.query.mock.calls[2]).toEqual([expect.stringContaining('"productionExpiresAt"'),"current",true]);
  expect(m.record).toHaveBeenCalledExactlyOnceWith("current",["current"]);
  expect(m.reconcile).not.toHaveBeenCalled();
  expect(m.after).toHaveBeenCalledOnce();
  await m.after.mock.calls[0][0]();
  expect(m.reconcile).toHaveBeenCalledExactlyOnceWith("other","existing-order",m.provider,m.readAppStoreStatus);
});
it("keeps the overlap audit best-effort for callers outside the RevenueCat webhook",async()=>{
  const warn=vi.spyOn(console,"warn").mockImplementation(()=>{});
  m.query.mockReset().mockRejectedValue(Error("fixture lookup failure"));
  await expect(auditDuplicatePurchases("current")).resolves.toBeUndefined();
  expect(warn).toHaveBeenCalledExactlyOnceWith("duplicate_purchase_audit_unavailable");
});
