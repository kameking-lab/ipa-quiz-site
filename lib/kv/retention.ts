import "server-only";

const REFRESH_MS = 5 * 60_000;
const MAX_KEYS = 256;

/**
 * Skip redundant retention writes on a warm instance, only after Redis confirms
 * EXPIRE succeeded. This is never used for admission/quota counters. A cold
 * instance writes the TTL again; a key removed externally is repaired within
 * five minutes of subsequent traffic. Concurrent first writes each retain
 * their own EXPIRE, so no request depends on an unawaited write.
 */
export function retentionCache() {
  const confirmed = new Map<string, number>();
  return {
    needsRefresh(key: string, now = Date.now()): boolean {
      return (confirmed.get(key) ?? 0) <= now;
    },
    confirm(key: string, now = Date.now()): void {
      confirmed.delete(key);
      if (confirmed.size >= MAX_KEYS) {
        const oldest = confirmed.keys().next().value;
        if (oldest !== undefined) confirmed.delete(oldest);
      }
      confirmed.set(key, now + REFRESH_MS);
    },
  };
}
