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

// Beta limits — applied to all users regardless of client-supplied tier.
// Free tier targets 15/day; minute burst limit kept for abuse control.
export const BETA_DAILY_LIMIT = parseLimit(process.env.BETA_DAILY_LIMIT, 15);
export const BETA_MINUTE_LIMIT = parseLimit(process.env.BETA_MINUTE_LIMIT, 5);

// Pro tier daily limit (Phase 4: gated by Stripe subscription)
export const PRO_DAILY_LIMIT = parseLimit(process.env.PRO_DAILY_LIMIT, 200);
export const PRO_MINUTE_LIMIT = parseLimit(process.env.PRO_MINUTE_LIMIT, 15);

// Client-side limit constant (kept in sync with BETA_DAILY_LIMIT for display)
export const FREE_DAILY_LIMIT = BETA_DAILY_LIMIT;

// Clean up expired buckets every 10 minutes to avoid memory growth in long-lived instances
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

/**
 * Server-side rate limit check. Ignores client-supplied tier — all
 * requests are subject to the same beta limits per IP address.
 */
export function checkRateLimit(opts: { ip: string }): RateLimitResult {
  const { ip } = opts;

  // Minute limit checked first (short-circuit on burst)
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

  // Daily limit
  const db = tick(dayBuckets, `day:${ip}`, WINDOW_MS_DAY);
  if (db.count >= BETA_DAILY_LIMIT) {
    return {
      ok: false,
      remaining: 0,
      limit: BETA_DAILY_LIMIT,
      resetAt: db.resetAt,
      reason: "daily",
    };
  }

  mb.count += 1;
  db.count += 1;
  return {
    ok: true,
    remaining: BETA_DAILY_LIMIT - db.count,
    limit: BETA_DAILY_LIMIT,
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
