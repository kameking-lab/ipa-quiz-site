// Sentry Edge runtime 初期化（middleware / edge route 用）。
// SENTRY_DSN 未設定時は init をスキップして完全 no-op。
import * as Sentry from "@sentry/nextjs";
import { sanitizeTelemetryEvent, sanitizeBreadcrumb } from "@/lib/monitoring/privacy";

const DSN = process.env.SENTRY_DSN;
const isProd = process.env.NODE_ENV === "production";

if (DSN) {
  Sentry.init({
    dsn: DSN,
    environment:
      process.env.SENTRY_ENVIRONMENT ?? process.env.VERCEL_ENV ?? "development",
    release: process.env.VERCEL_GIT_COMMIT_SHA,

    // Edge は軽量に: dev全件 / prod 5%
    tracesSampleRate: isProd ? 0.05 : 1.0,

    normalizeDepth: 6,
    beforeBreadcrumb: sanitizeBreadcrumb,
    beforeSendTransaction: sanitizeTelemetryEvent,

    // PII除去
    beforeSend(event) {
      return sanitizeTelemetryEvent(event);
    },
  });
}
