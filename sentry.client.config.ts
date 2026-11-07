// Sentry クライアント側初期化。
// NEXT_PUBLIC_SENTRY_DSN 未設定時は init をスキップして完全 no-op。
import * as Sentry from "@sentry/nextjs";
import { sanitizeTelemetryEvent, sanitizeBreadcrumb } from "@/lib/monitoring/privacy";

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
      return sanitizeTelemetryEvent(event);
    },

    // Breadcrumbからもセンシティブ情報を除去
    beforeBreadcrumb: sanitizeBreadcrumb,
    beforeSendTransaction: sanitizeTelemetryEvent,
  });
}
