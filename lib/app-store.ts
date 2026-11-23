/** App Store のリンクと Safari Smart App Banner の単一情報源。 */
const APP_ID = "6830358918";

export const APP_STORE = {
  appId: APP_ID,
  url: `https://apps.apple.com/jp/app/id${APP_ID}`,
} as const;

/** 全ページの共通 Metadata に指定する。WKWebView にはバナーは表示されない。 */
export function appStoreItunesMetadata(): { appId: string } {
  return { appId: APP_STORE.appId };
}
