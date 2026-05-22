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

const KV_URL = process.env.KV_REST_API_URL?.replace(/\/$/, "");
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const USE_KV = Boolean(KV_URL && KV_TOKEN);
const KV_TIMEOUT_MS = 1_500;

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

async function kvFetch<T>(path: string, method: "GET" | "POST" = "POST"): Promise<T | null> {
  if (!USE_KV) return null;
  try {
    const res = await fetch(`${KV_URL}${path}`, {
      method,
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      signal: AbortSignal.timeout(KV_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function kvGet(key: string): Promise<string | null> {
  const data = await kvFetch<{ result: string | null }>(`/get/${encodeURIComponent(key)}`, "GET");
  return data?.result ?? null;
}

async function kvIncr(key: string): Promise<number | null> {
  const data = await kvFetch<{ result: number }>(`/incr/${encodeURIComponent(key)}`);
  return typeof data?.result === "number" ? data.result : null;
}

async function kvExpire(key: string, ttlSec: number): Promise<void> {
  await kvFetch<{ result: number }>(`/expire/${encodeURIComponent(key)}/${ttlSec}`);
}

function memPeek(key: string, buckets: Map<string, Bucket>): number {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) return 0;
  return b.count;
}

function memConsume(
  key: string,
  buckets: Map<string, Bucket>,
  resetAt: number,
): void {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt });
    return;
  }
  existing.count += 1;
}

async function peek(key: string, buckets: Map<string, Bucket>): Promise<number> {
  if (USE_KV) {
    const raw = await kvGet(key);
    if (raw !== null) {
      const n = Number(raw);
      if (Number.isFinite(n)) return n;
    }
  }
  return memPeek(key, buckets);
}

async function consume(
  key: string,
  buckets: Map<string, Bucket>,
  ttlMs: number,
  resetAt: number,
): Promise<void> {
  if (USE_KV) {
    const newCount = await kvIncr(key);
    if (newCount !== null) {
      if (newCount === 1) {
        const ttlSec = Math.max(1, Math.ceil(ttlMs / 1000));
        await kvExpire(key, ttlSec);
      }
      return;
    }
  }
  memConsume(key, buckets, resetAt);
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
 * - When KV_REST_API_URL/KV_REST_API_TOKEN are set, state is persisted in Upstash KV
 *   so the limit holds across serverless instances. Falls back to per-instance in-memory
 *   when KV is absent or unreachable.
 */
export async function checkRateLimit(opts: RateLimitOpts): Promise<RateLimitResult> {
  const { ip, feedbackSubmitted } = opts;
  const dailyLimit = feedbackSubmitted ? POST_FEEDBACK_DAILY_LIMIT : FREE_INITIAL_LIMIT;
  const now = Date.now();
  const minResetAt = now + WINDOW_MS_MINUTE;
  const dayResetAt = nextJstMidnight(now);

  const minKey = `rl:min:${ip}`;
  const dayKey = `rl:day:${ip}`;

  const [minCount, dayCount] = await Promise.all([
    peek(minKey, minuteBuckets),
    peek(dayKey, dayBuckets),
  ]);

  if (minCount >= BETA_MINUTE_LIMIT) {
    return {
      ok: false,
      remaining: 0,
      limit: BETA_MINUTE_LIMIT,
      resetAt: minResetAt,
      reason: "minute",
    };
  }

  if (dayCount >= dailyLimit) {
    return {
      ok: false,
      remaining: 0,
      limit: dailyLimit,
      resetAt: dayResetAt,
      reason: "daily",
    };
  }

  await Promise.all([
    consume(minKey, minuteBuckets, WINDOW_MS_MINUTE, minResetAt),
    consume(dayKey, dayBuckets, WINDOW_MS_DAY, dayResetAt),
  ]);

  return {
    ok: true,
    remaining: dailyLimit - dayCount - 1,
    limit: dailyLimit,
    resetAt: dayResetAt,
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
