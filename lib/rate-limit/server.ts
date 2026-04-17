const WINDOW_MS_DAY = 24 * 60 * 60 * 1000;
const WINDOW_MS_MINUTE = 60 * 1000;

interface Bucket {
  count: number;
  resetAt: number;
}

const dayBuckets = new Map<string, Bucket>();
const minuteBuckets = new Map<string, Bucket>();

export const FREE_DAILY_LIMIT = Number(process.env.FREE_DAILY_LIMIT ?? 30);
export const PREMIUM_MINUTE_LIMIT = Number(process.env.PREMIUM_MINUTE_LIMIT ?? 10);

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

export function checkRateLimit(opts: {
  ip: string;
  tier: "free" | "premium";
}): RateLimitResult {
  const { ip, tier } = opts;
  if (tier === "free") {
    const b = tick(dayBuckets, `free:${ip}`, WINDOW_MS_DAY);
    if (b.count >= FREE_DAILY_LIMIT) {
      return {
        ok: false,
        remaining: 0,
        limit: FREE_DAILY_LIMIT,
        resetAt: b.resetAt,
        reason: "daily",
      };
    }
    b.count += 1;
    return {
      ok: true,
      remaining: FREE_DAILY_LIMIT - b.count,
      limit: FREE_DAILY_LIMIT,
      resetAt: b.resetAt,
    };
  }

  const b = tick(minuteBuckets, `prem:${ip}`, WINDOW_MS_MINUTE);
  if (b.count >= PREMIUM_MINUTE_LIMIT) {
    return {
      ok: false,
      remaining: 0,
      limit: PREMIUM_MINUTE_LIMIT,
      resetAt: b.resetAt,
      reason: "minute",
    };
  }
  b.count += 1;
  return {
    ok: true,
    remaining: PREMIUM_MINUTE_LIMIT - b.count,
    limit: PREMIUM_MINUTE_LIMIT,
    resetAt: b.resetAt,
  };
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "0.0.0.0";
}
