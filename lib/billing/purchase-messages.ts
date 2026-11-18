/** Shared public purchase errors; never interpolate an address or account identifier. */
export const PURCHASE_MESSAGES: Record<string, string> = {
  duplicate_purchase: "このメールアドレスの別のアカウントで購入済みです。そちらでログインしてください。",
  duplicate_purchase_google: "このメールアドレスの別のアカウント（Google）で購入済みです。そちらでログインしてください。",
  duplicate_purchase_apple: "このメールアドレスの別のアカウント（Apple）で購入済みです。そちらでログインしてください。",
  duplicate_purchase_google_apple: "このメールアドレスの別のアカウント（Google / Apple）で購入済みです。そちらでログインしてください。",
  purchase_check_unavailable: "購入済みか確認できませんでした。少し待ってからもう一度お試しください。",
  purchase_email_unverified: "購入前のメール確認のため、ログインし直してください。",
  subscription_exists: "すでに有料会員です。追加購入は不要です。",
};

export function purchaseNeedsSignIn(code: string): boolean {
  return code === "purchase_email_unverified" || code === "duplicate_purchase" || code.startsWith("duplicate_purchase_");
}
