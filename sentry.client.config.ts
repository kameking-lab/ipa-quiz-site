// Sentry クライアント側初期化。
// NEXT_PUBLIC_SENTRY_DSN 未設定時は init をスキップして完全 no-op。
import * as Sentry from "@sentry/nextjs";

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const isProd = process.env.NODE_ENV === "production";

if (DSN) {
  Sentry.init({
    dsn: DSN,
    environment:
      process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ??
      process.env.VERCEL_ENV ??
      "development",
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

    // Traces: 全件(dev) / 10%(prod) — Sentry無料枠を意識したサンプリング
    tracesSampleRate: isProd ? 0.1 : 1.0,

    // Session Replay: エラー時は全件取得、通常セッションは最小限
    replaysSessionSampleRate: isProd ? 0.01 : 0.1,
    replaysOnErrorSampleRate: 1.0,

    // スタック深度を増やして根本原因を把握しやすくする
    normalizeDepth: 6,

    // ブラウザ拡張・adblocker・ResizeObserver等の既知無害エラーを除外
    ignoreErrors: [
      // ResizeObserver timing noise
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications",
      // Promise rejection noise
      "Non-Error promise rejection captured",
      // Safari/Firefox 拡張干渉
      "Can't find variable: __gCrWeb",
      "window.webkit is not defined",
      // adblocker干渉 (fetch/XHR blocked)
      "Failed to fetch",
      "NetworkError when attempting to fetch resource",
      "Load failed",
      // Chrome拡張干渉
      /^chrome-extension:\/\//,
      /Extensions? Error/,
    ],

    // ブラウザ拡張・データURIからのエラーを除外
    denyUrls: [
      /^chrome-extension:\/\//i,
      /^moz-extension:\/\//i,
      /^safari-extension:\/\//i,
      /^safari-web-extension:\/\//i,
      /^extensions\//i,
      /^data:/i,
    ],

    // PII除去 — IP・User-Agent等の個人情報をイベントから消す
    beforeSend(event) {
      // サーバー側で付与されるIPは不要
      if (event.user) {
        delete event.user.ip_address;
        delete event.user.email;
        delete event.user.username;
      }
      // request ヘッダからPIIを除去
      if (event.request?.headers) {
        const headers = event.request.headers as Record<string, string>;
        delete headers["Cookie"];
        delete headers["Authorization"];
        delete headers["X-Forwarded-For"];
      }
      // URLのクエリパラメータからPIIを除去
      if (event.request?.url) {
        try {
          const url = new URL(event.request.url);
          url.searchParams.delete("token");
          url.searchParams.delete("key");
          url.searchParams.delete("secret");
          event.request.url = url.toString();
        } catch {
          // URL parse失敗は無視
        }
      }
      return event;
    },

    // Breadcrumbからもセンシティブ情報を除去
    beforeBreadcrumb(breadcrumb) {
      // fetchリクエストのURLからPIIクエリパラメータを除去
      if (breadcrumb.category === "fetch" || breadcrumb.category === "xhr") {
        const data = breadcrumb.data as Record<string, string> | undefined;
        if (data?.url) {
          try {
            const url = new URL(data.url, "https://placeholder.invalid");
            url.searchParams.delete("token");
            url.searchParams.delete("key");
            url.searchParams.delete("secret");
            data.url = url.pathname + (url.search || "");
          } catch {
            // 解析不能URLはそのまま
          }
        }
      }
      return breadcrumb;
    },
  });
}
