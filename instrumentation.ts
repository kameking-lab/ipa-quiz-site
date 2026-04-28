// Next.js 16 instrumentation hook.
// ランタイム種別ごとに Sentry の設定ファイルを動的 import する。
// SENTRY_DSN 未設定でも各 config 側で init をスキップするので副作用ゼロ。
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export { captureRequestError } from "@sentry/nextjs";
