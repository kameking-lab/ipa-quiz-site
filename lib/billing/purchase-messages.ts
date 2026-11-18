/** Shared public purchase errors; never interpolate an address or account identifier. */
export const PURCHASE_MESSAGES: Record<string, string> = {
  duplicate_purchase: "このメールアドレスの別のアカウントで購入済みです。そちらでログインしてください。",
  duplicate_purchase_google: "このメールアドレスの別のアカウント（Google）で購入済みです。そちらでログインしてください。",
  duplicate_purchase_apple: "このメールアドレスの別のアカウント（Apple）で購入済みです。そちらでログインしてください。",
  duplicate_purchase_google_apple: "このメールアドレスの別のアカウント（Google / Apple）で購入済みです。そちらでログインしてください。",
  purchase_check_unavailable: "購入済みか確認できませんでした。少し待ってからもう一度お試しください。",
  purchase_email_unverified: "購入前のメール確認のため、ログインし直してください。",
  subscription_exists: "すでに有料会員です。追加購入は不要です。",
  web_subscription_exists: "ウェブの契約が残っています。契約管理でお支払い状況をご確認ください。",
  web_checkout_pending: "ウェブで決済手続き中です。開いている決済画面でお支払いを完了するか、「戻る」で中止してください。",
  app_store_purchase_pending: "App Storeで購入を処理中です。アプリの会員画面で購入状況をご確認ください。",
};

export function purchaseNeedsSignIn(code: string): boolean {
  return code === "purchase_email_unverified" || code === "duplicate_purchase" || code.startsWith("duplicate_purchase_");
}
