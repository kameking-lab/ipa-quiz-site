import { beforeEach, expect, it, vi } from "vitest";
import { Membership,purchaseError } from "../src/purchases";
import { PACKAGE_TYPE, type PurchasesPackage } from "@revenuecat/purchases-capacitor";
import type { MobileConfiguration, MobileEntitlement } from "../shared/contracts";
const c:MobileConfiguration={sdkKey:"mock-public-sdk-key",productId:"mock.monthly",offeringId:"main",entitlement:"kakomon_pro",expectedPriceYen:980,leasePublicKey:""};
const a:MobileEntitlement={userId:"u",appUserId:"opaque-server-identity",entitled:false,source:"free",expiresAt:null,checkedAt:"",lease:null};
const product={identifier:"monthly",packageType:PACKAGE_TYPE.MONTHLY,product:{identifier:c.productId,price:980,priceString:"¥980",currencyCode:"JPY",subscriptionPeriod:"P1M"}} as PurchasesPackage;
const sdk={isConfigured:vi.fn(),isAnonymous:vi.fn(),configure:vi.fn(),logIn:vi.fn(),logOut:vi.fn(),getOfferings:vi.fn(),purchasePackage:vi.fn(),restorePurchases:vi.fn()};
beforeEach(()=>{vi.resetAllMocks();sdk.isConfigured.mockResolvedValue({isConfigured:false});sdk.isAnonymous.mockResolvedValue({isAnonymous:false});sdk.getOfferings.mockResolvedValue({all:{main:{availablePackages:[product]}}});});
it("shows server web membership without calling StoreKit or buying twice",async()=>{
  await expect(new Membership(sdk).offer(c,{...a,entitled:true,source:"web"})).rejects.toThrow("追加購入は不要");expect(sdk.configure).not.toHaveBeenCalled();expect(sdk.purchasePackage).not.toHaveBeenCalled();
});
it("requires sign-in and server-derived identity",async()=>{
  await expect(new Membership(sdk).offer(c,{...a,userId:null})).rejects.toThrow("ログイン");expect(sdk.configure).not.toHaveBeenCalled();
});
it("buys only the configured one-month JPY product after rechecking price",async()=>{
  const m=new Membership(sdk),offer=await m.offer(c,a);await m.buy(c,a,offer);
  expect(sdk.configure).toHaveBeenCalledWith({apiKey:c.sdkKey,appUserID:a.appUserId});expect(sdk.purchasePackage).toHaveBeenCalledWith({aPackage:product});
  sdk.getOfferings.mockResolvedValue({all:{main:{availablePackages:[{...product,product:{...product.product,price:1200}}]}}});
  await expect(m.buy(c,a,offer)).rejects.toThrow("価格");expect(sdk.purchasePackage).toHaveBeenCalledTimes(1);
});
it("propagates cancellation, pending purchases and restore errors without granting local rights",async()=>{
  const m=new Membership(sdk);sdk.purchasePackage.mockRejectedValue({userCancelled:true});await expect(m.buy(c,a,product)).rejects.toMatchObject({userCancelled:true});
  sdk.restorePurchases.mockRejectedValue(new Error("store unavailable"));await expect(m.restore(c,a)).rejects.toThrow("store unavailable");
  expect(a.entitled).toBe(false);
});
it("supports restore and disconnects the RevenueCat identity at sign-out",async()=>{
  const m=new Membership(sdk);await m.restore(c,a);expect(sdk.restorePurchases).toHaveBeenCalledOnce();sdk.isConfigured.mockResolvedValue({isConfigured:true});await m.disconnect();expect(sdk.logOut).toHaveBeenCalledOnce();
});
it("does not leave a pending transaction when price or duration validation fails before StoreKit",async()=>{
  const beforePurchase=vi.fn();
  sdk.getOfferings.mockResolvedValue({all:{main:{availablePackages:[{...product,product:{...product.product,subscriptionPeriod:"P1Y"}}]}}});
  await expect(new Membership(sdk).buy(c,a,product,beforePurchase)).rejects.toThrow("月額商品");
  expect(beforePurchase).not.toHaveBeenCalled();expect(sdk.purchasePackage).not.toHaveBeenCalled();
});
it("persists the pending marker before opening StoreKit and stops when persistence fails",async()=>{
  const beforePurchase=vi.fn(async()=>{expect(sdk.purchasePackage).not.toHaveBeenCalled();});
  await new Membership(sdk).buy(c,a,product,beforePurchase);expect(beforePurchase).toHaveBeenCalledOnce();expect(sdk.purchasePackage).toHaveBeenCalledOnce();
  sdk.purchasePackage.mockClear();
  await expect(new Membership(sdk).buy(c,a,product,async()=>{throw new Error("storage unavailable");})).rejects.toThrow("storage unavailable");
  expect(sdk.purchasePackage).not.toHaveBeenCalled();
});
it("distinguishes rejected transactions from pending or uncertain network/store results",()=>{
  expect(purchaseError({code:"1"})).toMatchObject({cancelled:true,rejected:true,pending:false});
  for(const code of ["3","4","5"])expect(purchaseError({code})).toMatchObject({rejected:true,pending:false});
  expect(purchaseError({code:"20"})).toMatchObject({rejected:false,pending:true});
  for(const code of ["0","2","6","10"])expect(purchaseError({code})).toMatchObject({rejected:false,pending:false});
});
it("does not log out an already anonymous SDK identity when switching from guest to member",async()=>{
  sdk.isConfigured.mockResolvedValue({isConfigured:true});sdk.isAnonymous.mockResolvedValue({isAnonymous:true});
  const m=new Membership(sdk);await m.disconnect();expect(sdk.logOut).not.toHaveBeenCalled();
  await m.offer(c,a);expect(sdk.logIn).toHaveBeenCalledWith({appUserID:a.appUserId});
});
