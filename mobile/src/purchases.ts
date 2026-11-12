import { Purchases, PURCHASES_ERROR_CODE, type PurchasesPackage } from "@revenuecat/purchases-capacitor";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import type { MobileConfiguration, MobileEntitlement } from "../shared/contracts";
export function purchaseError(error:unknown) {
  const code=error&&typeof error==="object"&&"code"in error?String(error.code):"";
  const cancelled=code===PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR || !!(error&&typeof error==="object"&&"userCancelled"in error&&error.userCancelled);
  const pending=code===PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR;
  const rejected=cancelled || [PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR,PURCHASES_ERROR_CODE.PURCHASE_INVALID_ERROR,PURCHASES_ERROR_CODE.PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR].some(value=>value===code);
  return {cancelled,pending,rejected};
}
/** A failure whose message is already written for the person holding the phone. */
export class StoreError extends Error {
  constructor(message: string, readonly code: string) { super(message); this.name = "StoreError"; }
}
const readableCodes = new Map(Object.entries(PURCHASES_ERROR_CODE).map(([name, code]) => [String(code), name]));
const STORE_HINTS: Record<string, string> = {
  [PURCHASES_ERROR_CODE.CONFIGURATION_ERROR]: "App Storeの商品設定を読み込めませんでした",
  [PURCHASES_ERROR_CODE.STORE_PROBLEM_ERROR]: "App Storeに接続できませんでした",
  [PURCHASES_ERROR_CODE.NETWORK_ERROR]: "通信できませんでした。電波の良い場所で再度お試しください",
  [PURCHASES_ERROR_CODE.OFFLINE_CONNECTION_ERROR]: "オフラインのため確認できませんでした",
  [PURCHASES_ERROR_CODE.INVALID_CREDENTIALS_ERROR]: "課金設定のキーが一致しません",
  [PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR]: "この端末では購入が制限されています（スクリーンタイム等）",
  [PURCHASES_ERROR_CODE.PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR]: "この商品は現在購入できません",
  [PURCHASES_ERROR_CODE.RECEIPT_IN_USE_BY_OTHER_SUBSCRIBER_ERROR]: "このApple IDの購入は別の過去問AIアカウントに登録済みです",
  [PURCHASES_ERROR_CODE.PURCHASE_BELONGS_TO_OTHER_USER]: "このApple IDの購入は別の過去問AIアカウントに登録済みです",
  [PURCHASES_ERROR_CODE.PRODUCT_REQUEST_TIMED_OUT_ERROR]: "App Storeの応答がありませんでした",
  [PURCHASES_ERROR_CODE.OPERATION_ALREADY_IN_PROGRESS_ERROR]: "前の購入処理がまだ終わっていません",
};
/**
 * One short line that says why a store step failed, with the SDK code so a
 * screenshot from a phone is enough to diagnose it. Never hides the reason
 * behind a generic "check your settings" sentence.
 */
export function describeStoreError(error: unknown, step: string): string {
  if (error instanceof StoreError) return error.message;
  const record = error && typeof error === "object" ? error as Record<string, unknown> : {};
  const code = typeof record.code === "string" || typeof record.code === "number" ? String(record.code) : "";
  const text = typeof error === "string" ? error : typeof record.message === "string" ? record.message : "";
  // Capacitor answers "UNIMPLEMENTED" (or the plugin's web fallback answers with
  // a bare string) when the native RevenueCat plugin is missing from the build.
  if (code === "UNIMPLEMENTED" || code === "UNAVAILABLE" || /not (supported|implemented)/i.test(text)) {
    return `${step}: アプリの課金機能が読み込まれていません（${code || "UNIMPLEMENTED"}）。アプリを最新版に更新してください。`;
  }
  const readable = readableCodes.get(code) ?? (typeof record.readableErrorCode === "string" ? record.readableErrorCode : "");
  const hint = STORE_HINTS[code] ?? "";
  const detail = typeof record.underlyingErrorMessage === "string" && record.underlyingErrorMessage ? record.underlyingErrorMessage : text;
  const label = code ? `コード ${code}${readable ? ` ${readable}` : ""}` : "コードなし";
  const shortDetail = detail ? ` 詳細: ${detail.replace(/\s+/g, " ").slice(0, 120)}` : "";
  return `${step}（${label}）${hint ? `。${hint}` : ""}。${shortDetail}`.replace(/。 ?$/, "。").trim();
}
export async function nativePublicSdkKey(fallback: string): Promise<string> {
  return (Capacitor.isNativePlatform() ? (await Preferences.get({ key: "kakomon:rc-ios-public-key" })).value : null) || fallback;
}
type Sdk = Pick<typeof Purchases, "isConfigured" | "isAnonymous" | "configure" | "logIn" | "logOut" | "getOfferings" | "purchasePackage" | "restorePurchases">;
export class Membership {
  // One SDK identity change at a time: a second configure() racing a logIn()
  // would silently replace the signed-in RevenueCat user.
  private connecting: Promise<unknown> = Promise.resolve();
  constructor(private sdk: Sdk = Purchases) {}
  /**
   * Prices are shown before sign-in, so the SDK may start anonymous. Purchases
   * and restores always run as the server-derived identity (logIn), which is
   * what makes an App Store purchase count on the website too.
   */
  connect(c: MobileConfiguration, access: MobileEntitlement | null): Promise<void> {
    const task = this.connecting.then(() => this.connectNow(c, access));
    this.connecting = task.catch(() => {});
    return task;
  }
  private async connectNow(c: MobileConfiguration, access: MobileEntitlement | null) {
    // The online Next.js purchase UI reads the key saved by the bundled shell.
    const sdkKey = await nativePublicSdkKey(c.sdkKey);
    if (!sdkKey || !c.productId) throw new StoreError("App Storeの課金設定がサーバーから届いていません（sdk_key / product_id 未設定）。", "unconfigured");
    const appUserId = access?.userId ? access.appUserId : null;
    if (access?.userId && !appUserId) throw new StoreError("会員番号をサーバーから取得できませんでした（app_user_id 未発行）。会員状態を再確認してください。", "no_app_user_id");
    try {
      if (!(await this.sdk.isConfigured()).isConfigured) {
        await this.sdk.configure(appUserId ? { apiKey: sdkKey, appUserID: appUserId } : { apiKey: sdkKey });
        // configure() is fire-and-forget on iOS; confirm it took effect so a
        // silent failure is reported here instead of as "no products".
        if (!(await this.sdk.isConfigured()).isConfigured) throw new StoreError("App Storeの課金機能を初期化できませんでした（configure 失敗）。", "configure_failed");
      } else if (appUserId) await this.sdk.logIn({ appUserID: appUserId });
      else if (!(await this.sdk.isAnonymous()).isAnonymous) await this.sdk.logOut();
    } catch (error) {
      throw error instanceof StoreError ? error : new StoreError(describeStoreError(error, "App Storeの課金機能を準備できませんでした"), "connect");
    }
  }
  async offer(c: MobileConfiguration, access: MobileEntitlement | null): Promise<PurchasesPackage> {
    if (access?.source === "web" && access.entitled) throw new Error("ウェブの有料会員です。追加購入は不要です。");
    await this.connect(c, access);
    let offerings: Awaited<ReturnType<Sdk["getOfferings"]>>;
    try { offerings = await this.sdk.getOfferings(); }
    catch (error) { throw new StoreError(describeStoreError(error, "App Storeから商品を取得できませんでした"), "offerings"); }
    const offering = (c.offeringId ? offerings.all[c.offeringId] : undefined) ?? offerings.current;
    if (!offering) throw new StoreError(`App Storeの商品一覧が空です（offering「${c.offeringId || "current"}」なし）。`, "no_offering");
    const p = offering.availablePackages.find(item => item.product.identifier === c.productId);
    if (!p) throw new StoreError(`月額商品がApp Storeから届いていません（${c.productId} なし / 届いた商品: ${offering.availablePackages.map(item => item.product.identifier).join(", ") || "0件"}）。`, "no_product");
    // Apple's own sheet shows the binding price; the button shows the StoreKit
    // price string. Only a non-monthly product would be a wrong sale.
    if (p.product.subscriptionPeriod && p.product.subscriptionPeriod !== "P1M") throw new StoreError(`月額商品の期間が想定と違います（${p.product.subscriptionPeriod}）。`, "wrong_period");
    return p;
  }
  async buy(c: MobileConfiguration, access: MobileEntitlement, selected: PurchasesPackage, beforePurchase?:()=>Promise<void>) {
    // Re-read server rights and offerings immediately before presenting StoreKit.
    if (access.entitled) throw new Error("すでに有料会員です。追加購入は不要です。");
    if (!access.userId) throw new StoreError("購入にはログインが必要です（Webと同じ会員になります）。", "login_required");
    const current = await this.offer(c, access);
    if (current.product.identifier !== selected.product.identifier) throw new StoreError("商品情報が更新されました。内容を確認し直してください。", "changed");
    // Do not mark a transaction pending until product validation has succeeded.
    // Persist before StoreKit opens so termination during purchase is recoverable.
    await beforePurchase?.();
    await this.sdk.purchasePackage({ aPackage: current });
    // SDK responses are never proof for the server or offline authorization.
  }
  async restore(c: MobileConfiguration, access: MobileEntitlement) {
    if (!access.userId) throw new StoreError("購入の復元にはログインが必要です（Webと同じ会員になります）。", "login_required");
    await this.connect(c, access);
    try { await this.sdk.restorePurchases(); }
    catch (error) { throw new StoreError(describeStoreError(error, "購入を復元できませんでした"), "restore"); }
  }
  disconnect(): Promise<void> {
    const task = this.connecting.then(async () => {
      if ((await this.sdk.isConfigured()).isConfigured && !(await this.sdk.isAnonymous()).isAnonymous) await this.sdk.logOut();
    });
    this.connecting = task.catch(() => {});
    return task;
  }
}
// The online shell and explicit sign-out share the SDK identity queue.
export const deviceMembership = new Membership();
