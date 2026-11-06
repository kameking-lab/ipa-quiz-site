/**
 * App Store（iOS アプリ）への小さな案内の単一情報源。
 *
 * 既定は OFF。Apple の審査を通過してアプリが公開されたら、Vercel の環境変数
 * `NEXT_PUBLIC_APP_STORE_LIVE=true` を設定して再デプロイすると、
 * ホームの案内カード・フッターの 1 行・Safari の Smart App Banner が一斉に出る。
 *
 * iOS アプリ（Capacitor の WKWebView）の中では案内を出さない（nativeClient() で判定）。
 * Smart App Banner は Safari 専用の仕組みで、WKWebView では表示されない。
 */
const APP_ID = "6830358918";

export const APP_STORE = {
  appId: APP_ID,
  url: `https://apps.apple.com/jp/app/id${APP_ID}`,
  /** ビルド時に固定される。読み替えはテストのみ（appStoreLive() を使う）。 */
  live: process.env.NEXT_PUBLIC_APP_STORE_LIVE === "true",
} as const;

/** 呼び出し時点の環境変数で判定する（テストで vi.stubEnv できるように関数にしている）。 */
export function appStoreLive(): boolean {
  return process.env.NEXT_PUBLIC_APP_STORE_LIVE === "true";
}

/** Next.js Metadata の `itunes`（<meta name="apple-itunes-app">）。OFF のときは undefined。 */
export function appStoreItunesMetadata(): { appId: string } | undefined {
  return appStoreLive() ? { appId: APP_STORE.appId } : undefined;
}
