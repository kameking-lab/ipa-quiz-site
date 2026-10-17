import { describe, expect, it } from "vitest";

import { BETA_MINUTE_LIMIT, FREE_INITIAL_LIMIT, checkRateLimit } from "@/lib/rate-limit/server";

describe("AI usage without a commercial daily quota", () => {
  it("allows an eleventh AI request while keeping the minute burst limit", async () => {
    const ip = "198.51.100.211";
    for (let count = 1; count <= BETA_MINUTE_LIMIT; count++) {
      const result = await checkRateLimit({ ip, skipDaily: true });
      expect(result.ok).toBe(true);
      expect(result.limit).toBe(BETA_MINUTE_LIMIT);
    }
    expect(await checkRateLimit({ ip, skipDaily: true })).toMatchObject({ ok: false, reason: "minute" });
  });

  it("retains the daily contact and public API guard on the default path", async () => {
    const ip = "198.51.100.212";
    for (let count = 0; count < FREE_INITIAL_LIMIT; count++) {
      expect((await checkRateLimit({ ip })).ok).toBe(true);
    }
    expect(await checkRateLimit({ ip })).toMatchObject({ ok: false, reason: "daily" });
  });
});
