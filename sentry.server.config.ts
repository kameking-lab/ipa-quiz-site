// Sentry サーバー側初期化。
// SENTRY_DSN 未設定時は init をスキップして完全 no-op。
import * as Sentry from "@sentry/nextjs";

const DSN = process.env.SENTRY_DSN;
const isProd = process.env.NODE_ENV === "production";

// 既知のボット・スクレイパーUA（監視ノイズ除外）
const BOT_UA_PATTERN =
  /Googlebot|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Sogou|Exabot|facebot|ia_archiver|Semrush|AhrefsBot|MJ12bot|DotBot/i;

if (DSN) {
  Sentry.init({
    dsn: DSN,
    environment:
      process.env.SENTRY_ENVIRONMENT ?? process.env.VERCEL_ENV ?? "development",
    release: process.env.VERCEL_GIT_COMMIT_SHA,

    // Traces: 全件(dev) / 10%(prod)
    tracesSampleRate: isProd ? 0.1 : 1.0,

    normalizeDepth: 6,

    // PII除去 + ボットフィルタ
    beforeSend(event, hint) {
      // ボット・スクレイパーのリクエストは送信しない
      const ua = event.request?.headers?.["User-Agent"] ?? "";
      if (BOT_UA_PATTERN.test(ua)) {
        return null;
      }

      // ヘルスチェックエンドポイントのエラーは除外
      const url = event.request?.url ?? "";
      if (url.includes("/api/health") || url.includes("/monitoring")) {
        return null;
      }

      // PIIをイベントから除去
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

      // 未使用のhint参照を避けるため明示的に型付け
      void (hint as unknown);

      return event;
    },
  });
}
