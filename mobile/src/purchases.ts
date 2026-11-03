import { Purchases, PACKAGE_TYPE, PURCHASES_ERROR_CODE, type PurchasesPackage } from "@revenuecat/purchases-capacitor";
import type { MobileConfiguration, MobileEntitlement } from "../shared/contracts";
export function purchaseError(error:unknown) {
  const code=error&&typeof error==="object"&&"code"in error?String(error.code):"";
  const cancelled=code===PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR || !!(error&&typeof error==="object"&&"userCancelled"in error&&error.userCancelled);
  const pending=code===PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR;
  const rejected=cancelled || [PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR,PURCHASES_ERROR_CODE.PURCHASE_INVALID_ERROR,PURCHASES_ERROR_CODE.PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR].some(value=>value===code);
  return {cancelled,pending,rejected};
}
export class Membership {
  constructor(private sdk: Pick<typeof Purchases, "isConfigured" | "isAnonymous" | "configure" | "logIn" | "logOut" | "getOfferings" | "purchasePackage" | "restorePurchases"> = Purchases) {}
  async connect(c: MobileConfiguration, access: MobileEntitlement) {
    if (!access.userId || !access.appUserId || !c.sdkKey || !c.productId) throw new Error("ログインとApp Store設定の確認が必要です。");
    if (!(await this.sdk.isConfigured()).isConfigured) await this.sdk.configure({ apiKey: c.sdkKey, appUserID: access.appUserId });
    else await this.sdk.logIn({ appUserID: access.appUserId });
  }
  async offer(c: MobileConfiguration, access: MobileEntitlement): Promise<PurchasesPackage> {
    if (access.source === "web" && access.entitled) throw new Error("ウェブの有料会員です。追加購入は不要です。");
    await this.connect(c, access);
    const offerings = await this.sdk.getOfferings();
    const offering = c.offeringId ? offerings.all[c.offeringId] : offerings.current;
    const p = offering?.availablePackages.find(p => p.product.identifier === c.productId && p.packageType === PACKAGE_TYPE.MONTHLY);
    if (!p || p.product.subscriptionPeriod !== "P1M" || p.product.currencyCode !== "JPY" || p.product.price !== c.expectedPriceYen) throw new Error("月額商品の設定・価格を確認できません。");
    return p;
  }
  async buy(c: MobileConfiguration, access: MobileEntitlement, selected: PurchasesPackage, beforePurchase?:()=>Promise<void>) {
    // Re-read server rights and offerings immediately before presenting StoreKit.
    if (access.entitled) throw new Error("すでに有料会員です。追加購入は不要です。");
    const current = await this.offer(c, access);
    if (current.identifier !== selected.identifier || current.product.identifier !== selected.product.identifier || current.product.priceString !== selected.product.priceString) throw new Error("価格情報が更新されました。内容を確認し直してください。");
    // Do not mark a transaction pending until product validation has succeeded.
    // Persist before StoreKit opens so termination during purchase is recoverable.
    await beforePurchase?.();
    await this.sdk.purchasePackage({ aPackage: current });
    // SDK responses are never proof for the server or offline authorization.
  }
  async restore(c: MobileConfiguration, access: MobileEntitlement) { await this.connect(c, access); await this.sdk.restorePurchases(); }
  async disconnect() { if ((await this.sdk.isConfigured()).isConfigured && !(await this.sdk.isAnonymous()).isAnonymous) await this.sdk.logOut(); }
}
