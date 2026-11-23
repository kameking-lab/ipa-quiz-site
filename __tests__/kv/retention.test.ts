// @vitest-environment node
import { describe, expect, it } from "vitest";
import { retentionCache } from "@/lib/kv/retention";

describe("optional telemetry retention confirmations", () => {
  it("does not suppress writes before confirmation and expires confirmations after five minutes", () => {
    const cache = retentionCache();
    expect(cache.needsRefresh("daily-key", 1)).toBe(true);
    expect(cache.needsRefresh("daily-key", 2)).toBe(true);
    cache.confirm("daily-key", 3);
    expect(cache.needsRefresh("daily-key", 3 + 5 * 60_000 - 1)).toBe(false);
    expect(cache.needsRefresh("daily-key", 3 + 5 * 60_000)).toBe(true);
    expect(retentionCache().needsRefresh("daily-key", 4)).toBe(true);
  });
  it("bounds retained keys and evicts the oldest confirmation without dropping new expiry writes", () => {
    const cache = retentionCache();
    for (let i = 0; i < 257; i++) cache.confirm(`key-${i}`, 10);
    expect(cache.needsRefresh("key-0", 11)).toBe(true);
    expect(cache.needsRefresh("key-1", 11)).toBe(false);
    expect(cache.needsRefresh("key-256", 11)).toBe(false);
  });
});
