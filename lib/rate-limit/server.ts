const WINDOW_MS_DAY = 24 * 60 * 60 * 1000;
const WINDOW_MS_MINUTE = 60 * 1000;

interface Bucket {
  count: number;
  resetAt: number;
}

const dayBuckets = new Map<string, Bucket>();
const minuteBuckets = new Map<string, Bucket>();

function parseLimit(raw: string | undefined, fallback: number): number {
  const n = Number(raw ?? fallback);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

// 教育貢献プロジェクト：初期 10 回までは誰でも無料、フィードバック投稿後は実質無制限
export const FREE_INITIAL_LIMIT = parseLimit(process.env.FREE_INITIAL_LIMIT, 10);
export const POST_FEEDBACK_DAILY_LIMIT = parseLimit(process.env.POST_FEEDBACK_DAILY_LIMIT, 9999);
export const BETA_MINUTE_LIMIT = parseLimit(process.env.BETA_MINUTE_LIMIT, 15);

// Backwards-compat exports retained for existing imports
export const BETA_DAILY_LIMIT = FREE_INITIAL_LIMIT;
export const FREE_DAILY_LIMIT = FREE_INITIAL_LIMIT;

if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, b] of dayBuckets) {
      if (b.resetAt <= now) dayBuckets.delete(key);
    }
    for (const [key, b] of minuteBuckets) {
      if (b.resetAt <= now) minuteBuckets.delete(key);
    }
  }, 10 * 60 * 1000);
}

function nextJstMidnight(now: number): number {
  const jstOffsetMs = 9 * 60 * 60 * 1000;
  const jstNow = now + jstOffsetMs;
  const dayStart = Math.floor(jstNow / WINDOW_MS_DAY) * WINDOW_MS_DAY;
  return dayStart + WINDOW_MS_DAY - jstOffsetMs;
}

function tick(bucket: Map<string, Bucket>, key: string, windowMs: number): Bucket {
  const now = Date.now();
  const existing = bucket.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = windowMs === WINDOW_MS_DAY ? nextJstMidnight(now) : now + windowMs;
    const fresh: Bucket = { count: 0, resetAt };
    bucket.set(key, fresh);
    return fresh;
  }
  return existing;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  limit: number;
  resetAt: number;
  reason?: "daily" | "minute";
}

export interface RateLimitOpts {
  ip: string;
  /** Set to true if the user has submitted feedback — grants near-unlimited daily quota. */
  feedbackSubmitted?: boolean;
}

/**
 * Server-side rate limit check.
 * - First 10 requests/day per IP are free for everyone.
 * - Once the user submits feedback (client passes a header), daily limit jumps to 9999.
 * - Minute burst limit applies to all.
 */
export function checkRateLimit(opts: RateLimitOpts): RateLimitResult {
  const { ip, feedbackSubmitted } = opts;
  const dailyLimit = feedbackSubmitted ? POST_FEEDBACK_DAILY_LIMIT : FREE_INITIAL_LIMIT;

  const mb = tick(minuteBuckets, `min:${ip}`, WINDOW_MS_MINUTE);
  if (mb.count >= BETA_MINUTE_LIMIT) {
    return {
      ok: false,
      remaining: 0,
      limit: BETA_MINUTE_LIMIT,
      resetAt: mb.resetAt,
      reason: "minute",
    };
  }

  const db = tick(dayBuckets, `day:${ip}`, WINDOW_MS_DAY);
  if (db.count >= dailyLimit) {
    return {
      ok: false,
      remaining: 0,
      limit: dailyLimit,
      resetAt: db.resetAt,
      reason: "daily",
    };
  }

  mb.count += 1;
  db.count += 1;
  return {
    ok: true,
    remaining: dailyLimit - db.count,
    limit: dailyLimit,
    resetAt: db.resetAt,
  };
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "0.0.0.0";
}

/** True if the request advertises a verified feedback submission (client header). */
export function readFeedbackFlag(req: Request): boolean {
  return req.headers.get("x-feedback-submitted") === "1";
}
