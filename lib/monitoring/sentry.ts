// Sentry 風エラー収集の薄いラッパー
//
// 本格導入（@sentry/nextjs）は次フェーズで行うが、現段階でも
// SENTRY_DSN を設定するだけでサーバー側 5xx を Sentry Envelope API へ
// 直接 POST できる軽量ブリッジを用意しておく。
//
// SENTRY_DSN 未設定時は noop（console.error のみ）で副作用ゼロ。
//
// 使い方:
//   try { ... } catch (err) { captureException(err, { route: "/api/foo" }); }

interface SentryDsn {
  publicKey: string;
  host: string;
  projectId: string;
}

function parseDsn(dsn: string): SentryDsn | null {
  try {
    const u = new URL(dsn);
    const publicKey = u.username;
    const host = u.host;
    const projectId = u.pathname.replace(/^\//, "");
    if (!publicKey || !host || !projectId) return null;
    return { publicKey, host, projectId };
  } catch {
    return null;
  }
}

const DSN = process.env.SENTRY_DSN ? parseDsn(process.env.SENTRY_DSN) : null;
if (process.env.SENTRY_DSN && !DSN) {
  console.warn("[sentry] SENTRY_DSN is set but failed to parse — error capture is disabled");
}
const ENVIRONMENT = process.env.SENTRY_ENVIRONMENT ?? process.env.VERCEL_ENV ?? "development";
const RELEASE = process.env.VERCEL_GIT_COMMIT_SHA ?? "dev";

export interface CaptureContext {
  route?: string;
  userId?: string;
  extra?: Record<string, unknown>;
}

export async function captureException(err: unknown, ctx: CaptureContext = {}): Promise<void> {
  // 必ず console には残す（DSN 有無に関係なく）
  console.error("[capture]", ctx.route ?? "(no-route)", err);

  if (!DSN) return;

  const message = err instanceof Error ? err.message : String(err);
  const stack = err instanceof Error ? err.stack : undefined;

  const event = {
    event_id: cryptoRandomHex(32),
    timestamp: Date.now() / 1000,
    platform: "javascript",
    environment: ENVIRONMENT,
    release: RELEASE,
    level: "error",
    server_name: process.env.VERCEL_URL ?? "local",
    transaction: ctx.route,
    user: ctx.userId ? { id: ctx.userId } : undefined,
    extra: ctx.extra,
    exception: {
      values: [
        {
          type: err instanceof Error ? err.name : "Error",
          value: message,
          stacktrace: stack ? { frames: parseFrames(stack) } : undefined,
        },
      ],
    },
  };

  const url = `https://${DSN.host}/api/${DSN.projectId}/store/`;
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Sentry-Auth": `Sentry sentry_version=7,sentry_key=${DSN.publicKey},sentry_client=ipa-quiz-site/0.1`,
      },
      body: JSON.stringify(event),
    });
  } catch (sendErr) {
    console.error("[sentry] send failed", sendErr);
  }
}

function cryptoRandomHex(len: number): string {
  const bytes = new Uint8Array(len / 2);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function parseFrames(stack: string): Array<{ filename?: string; function?: string; lineno?: number }> {
  return stack
    .split("\n")
    .slice(1, 11)
    .map((line) => {
      const m = line.match(/at\s+(.+?)\s+\((.+?):(\d+):\d+\)/);
      if (m) {
        return { function: m[1], filename: m[2], lineno: Number(m[3]) };
      }
      return { function: line.trim() };
    });
}

export const isSentryConfigured = !!DSN;
