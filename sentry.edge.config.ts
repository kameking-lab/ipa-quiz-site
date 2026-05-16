// Sentry Edge runtime 初期化（middleware / edge route 用）。
// SENTRY_DSN 未設定時は init をスキップして完全 no-op。
import * as Sentry from "@sentry/nextjs";

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

    // PII除去
    beforeSend(event) {
      if (event.user) {
        delete event.user.ip_address;
        delete event.user.email;
        delete event.user.username;
      }
      if (event.request?.headers) {
        const headers = event.request.headers as Record<string, string>;
        delete headers["Cookie"];
        delete headers["Authorization"];
        delete headers["X-Forwarded-For"];
        delete headers["X-Real-IP"];
      }
      if (event.request?.url) {
        try {
          const parsedUrl = new URL(event.request.url);
          parsedUrl.searchParams.delete("token");
          parsedUrl.searchParams.delete("key");
          parsedUrl.searchParams.delete("secret");
          event.request.url = parsedUrl.toString();
        } catch {
          // ignore
        }
      }
      return event;
    },
  });
}
