import { checkRateLimit, getClientIp, type RateLimitResult } from "@/lib/rate-limit/server";

/**
 * Public API rate limit. Falls back to client IP when no API key is provided.
 * The bearer token (if any) is used as the rate-limit key so a user's own quota
 * is independent of the shared IP pool — useful behind a corporate NAT.
 */
export function checkApiRateLimit(req: Request): RateLimitResult & { keyId: string } {
  const auth = req.headers.get("authorization") ?? "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  const keyId = m && m[1].trim().length >= 12 ? `key:${m[1].trim().slice(0, 64)}` : `ip:${getClientIp(req)}`;
  const result = checkRateLimit({ ip: keyId });
  return { ...result, keyId };
}

export function buildRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.resetAt),
  };
}
