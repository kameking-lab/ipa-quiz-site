import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { Membership,purchaseError,describeStoreError,StoreError } from "../src/purchases";
import { PACKAGE_TYPE, type PurchasesPackage } from "@revenuecat/purchases-capacitor";
import type { MobileConfiguration, MobileEntitlement } from "../shared/contracts";
vi.mock("@capacitor/preferences",()=>({Preferences:{get:vi.fn()}}));
const c:MobileConfiguration={sdkKey:"mock-public-sdk-key",productId:"mock.monthly",offeringId:"main",entitlement:"kakomon_pro",expectedPriceYen:980,leasePublicKey:""};
const a:MobileEntitlement={userId:"u",appUserId:"opaque-server-identity",entitled:false,source:"free",expiresAt:null,checkedAt:"",lease:null};
const product={identifier:"monthly",packageType:PACKAGE_TYPE.MONTHLY,product:{identifier:c.productId,price:980,priceString:"¥980",currencyCode:"JPY",subscriptionPeriod:"P1M"}} as PurchasesPackage;
const sdk={isConfigured:vi.fn(),isAnonymous:vi.fn(),configure:vi.fn(),logIn:vi.fn(),logOut:vi.fn(),getOfferings:vi.fn(),purchasePackage:vi.fn(),restorePurchases:vi.fn()};
let configured=false;
beforeEach(()=>{vi.resetAllMocks();configured=false;sdk.isConfigured.mockImplementation(async()=>({isConfigured:configured}));sdk.configure.mockImplementation(async()=>{configured=true;});sdk.isAnonymous.mockResolvedValue({isAnonymous:false});sdk.getOfferings.mockResolvedValue({all:{main:{availablePackages:[product]}}});});
it("shows server web membership without calling StoreKit or buying twice",async()=>{
  await expect(new Membership(sdk).offer(c,{...a,entitled:true,source:"web"})).rejects.toThrow("追加購入は不要");expect(sdk.configure).not.toHaveBeenCalled();expect(sdk.purchasePackage).not.toHaveBeenCalled();
});
it("shows the store price before sign-in with an anonymous SDK, but buys and restores only as the server identity",async()=>{
  const guest={...a,userId:null,appUserId:null},m=new Membership(sdk);
  await expect(m.offer(c,guest)).resolves.toBe(product);
  expect(sdk.configure).toHaveBeenCalledWith({apiKey:c.sdkKey});
  await expect(m.buy(c,guest,product)).rejects.toThrow("ログイン");
  await expect(m.restore(c,guest)).rejects.toThrow("ログイン");
  expect(sdk.purchasePackage).not.toHaveBeenCalled();expect(sdk.restorePurchases).not.toHaveBeenCalled();
  // After sign-in the same SDK switches to the opaque server-derived identity.
  await m.buy(c,a,product);
  expect(sdk.logIn).toHaveBeenCalledWith({appUserID:a.appUserId});expect(sdk.purchasePackage).toHaveBeenCalledOnce();
});
it("refuses a signed-in purchase without the server-derived RevenueCat identity",async()=>{
  await expect(new Membership(sdk).offer(c,{...a,appUserId:null})).rejects.toThrow("app_user_id");expect(sdk.configure).not.toHaveBeenCalled();
});
it("clears a previous buyer when a fresh guest screen reuses the configured SDK",async()=>{
  configured=true;
  const m=new Membership(sdk);
  await m.offer(c,{...a,userId:null,appUserId:null});
  expect(sdk.logOut).toHaveBeenCalledOnce();
  expect(sdk.logIn).not.toHaveBeenCalled();
  expect(sdk.logOut.mock.invocationCallOrder[0]).toBeLessThan(sdk.getOfferings.mock.invocationCallOrder[0]);
});
it("does not replace an existing anonymous customer on a guest refresh",async()=>{
  configured=true;sdk.isAnonymous.mockResolvedValue({isAnonymous:true});
  await new Membership(sdk).offer(c,{...a,userId:null,appUserId:null});
  expect(sdk.logOut).not.toHaveBeenCalled();
});
it("buys the configured monthly product at the App Store's own price (no local price gate)",async()=>{
  const m=new Membership(sdk),offer=await m.offer(c,a);await m.buy(c,a,offer);
  expect(sdk.configure).toHaveBeenCalledWith({apiKey:c.sdkKey,appUserID:a.appUserId});expect(sdk.purchasePackage).toHaveBeenCalledWith({aPackage:product});
  // A different storefront price/currency is shown by StoreKit and Apple's sheet; it must not block buying.
  const usd={...product,product:{...product.product,price:6.99,priceString:"$6.99",currencyCode:"USD"}} as PurchasesPackage;
  sdk.getOfferings.mockResolvedValue({all:{main:{availablePackages:[usd]}}});
  await m.buy(c,a,offer);expect(sdk.purchasePackage).toHaveBeenLastCalledWith({aPackage:usd});
  sdk.getOfferings.mockResolvedValue({all:{main:{availablePackages:[{...product,product:{...product.product,identifier:"other.product"}}]}}});
  await expect(m.buy(c,a,offer)).rejects.toThrow("other.product");expect(sdk.purchasePackage).toHaveBeenCalledTimes(2);
});
it("falls back to the current offering and names what the store actually returned",async()=>{
  sdk.getOfferings.mockResolvedValue({all:{},current:{availablePackages:[product]}});
  await expect(new Membership(sdk).offer(c,a)).resolves.toBe(product);
  sdk.getOfferings.mockResolvedValue({all:{},current:null});
  await expect(new Membership(sdk).offer(c,a)).rejects.toThrow("offering「main」なし");
  sdk.getOfferings.mockResolvedValue({all:{main:{availablePackages:[]}}});
  await expect(new Membership(sdk).offer(c,a)).rejects.toThrow("mock.monthly なし / 届いた商品: 0件");
});
it("reports the RevenueCat code when products cannot be fetched and when configure silently fails",async()=>{
  sdk.getOfferings.mockRejectedValue(Object.assign(new Error("There is an issue with your configuration."),{code:"23",underlyingErrorMessage:"None of the products registered in the RevenueCat dashboard could be fetched from App Store Connect."}));
  const error=await new Membership(sdk).offer(c,a).catch(e=>e);
  expect(error).toBeInstanceOf(StoreError);expect(error.message).toContain("App Storeから商品を取得できませんでした（コード 23 CONFIGURATION_ERROR）");expect(error.message).toContain("None of the products");
  configured=false;sdk.configure.mockImplementation(async()=>{});
  await expect(new Membership(sdk).offer(c,a)).rejects.toThrow("configure 失敗");
});
it("describes a missing native plugin instead of a generic failure",()=>{
  expect(describeStoreError(Object.assign(new Error('"Purchases.getOfferings()" is not implemented on ios'),{code:"UNIMPLEMENTED"}),"商品取得")).toContain("アプリの課金機能が読み込まれていません（UNIMPLEMENTED）");
  expect(describeStoreError("Web not supported in this plugin.","商品取得")).toContain("UNIMPLEMENTED");
  expect(describeStoreError({code:"10",message:"offline"},"購入")).toContain("コード 10 NETWORK_ERROR");
});
it("propagates cancellation, pending purchases and restore errors without granting local rights",async()=>{
  const m=new Membership(sdk);sdk.purchasePackage.mockRejectedValue({userCancelled:true});await expect(m.buy(c,a,product)).rejects.toMatchObject({userCancelled:true});
  sdk.restorePurchases.mockRejectedValue({code:"2",message:"store unavailable"});await expect(m.restore(c,a)).rejects.toThrow("購入を復元できませんでした（コード 2 STORE_PROBLEM_ERROR）");
  expect(a.entitled).toBe(false);
});
it("supports restore and disconnects the RevenueCat identity at sign-out",async()=>{
  const m=new Membership(sdk);await m.restore(c,a);expect(sdk.restorePurchases).toHaveBeenCalledOnce();await m.disconnect();expect(sdk.logOut).toHaveBeenCalledOnce();
});
it("disconnect waits for a pending SDK login so the buyer cannot be reconnected after logout", async()=>{
  configured=true;
  let finish!:()=>void;
  sdk.logIn.mockImplementationOnce(()=>new Promise<void>(resolve=>{finish=resolve;}));
  const membership=new Membership(sdk);
  const connecting=membership.connect(c,a);
  await vi.waitFor(()=>expect(sdk.logIn).toHaveBeenCalledOnce());
  const disconnecting=membership.disconnect();
  expect(sdk.logOut).not.toHaveBeenCalled();
  finish();await connecting;await disconnecting;
  expect(sdk.logOut).toHaveBeenCalledOnce();
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
  configured=true;sdk.isAnonymous.mockResolvedValue({isAnonymous:true});
  const m=new Membership(sdk);await m.disconnect();expect(sdk.logOut).not.toHaveBeenCalled();
  await m.offer(c,a);expect(sdk.logIn).toHaveBeenCalledWith({appUserID:a.appUserId});
});

afterEach(()=>vi.restoreAllMocks());
it("uses the public SDK key saved by the bundled shell in the online native purchase UI",async()=>{
  vi.spyOn(Capacitor,"isNativePlatform").mockReturnValue(true);
  const stored=vi.mocked(Preferences.get).mockResolvedValue({value:"mock-bundled-public-sdk-key"});
  await new Membership(sdk).connect({...c,sdkKey:""},a);
  expect(stored).toHaveBeenCalledWith({key:"kakomon:rc-ios-public-key"});
  expect(sdk.configure).toHaveBeenCalledWith({apiKey:"mock-bundled-public-sdk-key",appUserID:a.appUserId});
});
