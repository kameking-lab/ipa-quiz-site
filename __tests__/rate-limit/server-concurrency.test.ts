import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-30T03:00:00.000Z"));
  vi.stubEnv("KV_REST_API_URL", "");
  vi.stubEnv("KV_REST_API_TOKEN", "");
  vi.stubEnv("BETA_MINUTE_LIMIT", "");
  vi.stubGlobal("fetch", vi.fn(() => { throw new Error("Unexpected external request"); }));
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("real memory admission under concurrent requests", () => {
  it("allows exactly the daily limit for Promise.all on one IP", async () => {
    const { checkRateLimit, FREE_INITIAL_LIMIT } = await import("@/lib/rate-limit/server");
    const results = await Promise.all(Array.from({ length: FREE_INITIAL_LIMIT * 3 }, () =>
      checkRateLimit({ ip: "same-ip" }),
    ));
    expect(results.filter((result) => result.ok)).toHaveLength(FREE_INITIAL_LIMIT);
    expect(results.filter((result) => result.ok).map((result) => result.remaining)).toEqual(
      Array.from({ length: FREE_INITIAL_LIMIT }, (_, i) => FREE_INITIAL_LIMIT - i - 1),
    );
    expect(results.filter((result) => !result.ok).every((result) => result.reason === "daily")).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("allows exactly the minute limit for concurrent feedback requests", async () => {
    const { checkRateLimit, BETA_MINUTE_LIMIT } = await import("@/lib/rate-limit/server");
    const results = await Promise.all(Array.from({ length: BETA_MINUTE_LIMIT * 3 }, () =>
      checkRateLimit({ ip: "same-ip", feedbackSubmitted: true }),
    ));
    expect(results.filter((result) => result.ok)).toHaveLength(BETA_MINUTE_LIMIT);
    expect(results.filter((result) => !result.ok).every((result) => result.reason === "minute")).toBe(true);
  });

  it("allows exactly the shared feedback token limit across concurrent different IPs", async () => {
    const { checkRateLimit } = await import("@/lib/rate-limit/server");
    const { FEEDBACK_TOKEN_DAILY_LIMIT } = await import("@/lib/constants/ai-quota");
    const results = await Promise.all(Array.from({ length: FEEDBACK_TOKEN_DAILY_LIMIT + 20 }, (_, i) =>
      checkRateLimit({ ip: `school-ip-${i}`, feedbackSubmitted: true, feedbackTokenId: "shared-token" }),
    ));
    expect(results.filter((result) => result.ok)).toHaveLength(FEEDBACK_TOKEN_DAILY_LIMIT);
    expect(results.filter((result) => !result.ok)).toHaveLength(20);
    expect(results.filter((result) => !result.ok).every((result) => result.reason === "daily")).toBe(true);
    expect((await checkRateLimit({ ip: "independent-ip", feedbackSubmitted: true, feedbackTokenId: "other-token" })).ok).toBe(true);
  });

  it("preserves real legacy API key separation on the same school IP", async () => {
    const { checkApiRateLimit } = await import("@/lib/api/rate-limit");
    const { FREE_INITIAL_LIMIT } = await import("@/lib/rate-limit/server");
    const request = (token: string) => new Request("https://example.test/api/v1/questions?exam=ap", {
      headers: { authorization: `Bearer ${token}`, "x-forwarded-for": "192.0.2.1" },
    });
    const results = await Promise.all(Array.from({ length: FREE_INITIAL_LIMIT * 3 }, () =>
      checkApiRateLimit(request("existing-student-key-one")),
    ));
    expect(results.filter((result) => result.ok)).toHaveLength(FREE_INITIAL_LIMIT);
    expect((await checkApiRateLimit(request("existing-student-key-two"))).ok).toBe(true);
  });

  it("retains the first minute expiry; denied calls consume neither day nor token quota", async () => {
    const { checkRateLimit, BETA_MINUTE_LIMIT, POST_FEEDBACK_DAILY_LIMIT } = await import("@/lib/rate-limit/server");
    const { FEEDBACK_TOKEN_DAILY_LIMIT } = await import("@/lib/constants/ai-quota");
    const opts = { ip: "same-ip", feedbackSubmitted: true, feedbackTokenId: "token" };
    for (let i = 0; i < BETA_MINUTE_LIMIT; i++) expect((await checkRateLimit(opts)).ok).toBe(true);
    vi.advanceTimersByTime(59_999);
    const denied = await Promise.all(Array.from({ length: 20 }, () => checkRateLimit(opts)));
    expect(denied.every((result) => !result.ok && result.reason === "minute")).toBe(true);
    vi.advanceTimersByTime(1);
    expect(await checkRateLimit(opts)).toMatchObject({ ok: true, remaining: POST_FEEDBACK_DAILY_LIMIT - BETA_MINUTE_LIMIT - 1 });
    for (let i = BETA_MINUTE_LIMIT + 1; i < FEEDBACK_TOKEN_DAILY_LIMIT; i++) {
      expect((await checkRateLimit({ ...opts, ip: `other-ip-${i}` })).ok).toBe(true);
    }
    expect(await checkRateLimit({ ...opts, ip: "last-ip" })).toMatchObject({ ok: false, reason: "daily" });
  });

  it("does not extend an existing minute bucket when another request arrives", async () => {
    const { checkRateLimit, BETA_MINUTE_LIMIT } = await import("@/lib/rate-limit/server");
    const opts = { ip: "same-ip", feedbackSubmitted: true };
    await checkRateLimit(opts);
    vi.advanceTimersByTime(30_000);
    for (let i = 1; i < BETA_MINUTE_LIMIT; i++) await checkRateLimit(opts);
    vi.advanceTimersByTime(30_000);
    expect((await checkRateLimit(opts)).ok).toBe(true);
  });

  it("resets daily quota exactly at JST midnight without denied consumption", async () => {
    vi.setSystemTime(new Date("2026-10-30T14:58:00.000Z"));
    const { checkRateLimit, FREE_INITIAL_LIMIT } = await import("@/lib/rate-limit/server");
    const opts = { ip: "same-ip" };
    for (let i = 0; i < FREE_INITIAL_LIMIT; i++) await checkRateLimit(opts);
    vi.advanceTimersByTime(119_999);
    expect(await checkRateLimit(opts)).toMatchObject({ ok: false, reason: "daily", resetAt: Date.parse("2026-10-30T15:00:00.000Z") });
    vi.advanceTimersByTime(1);
    expect(await checkRateLimit(opts)).toMatchObject({ ok: true, remaining: FREE_INITIAL_LIMIT - 1, resetAt: Date.parse("2026-10-31T15:00:00.000Z") });
  });

  it("does not consume minute quota on a daily denial before a feedback upgrade", async () => {
    const { checkRateLimit, FREE_INITIAL_LIMIT, BETA_MINUTE_LIMIT } = await import("@/lib/rate-limit/server");
    for (let i = 0; i < FREE_INITIAL_LIMIT; i++) await checkRateLimit({ ip: "same-ip" });
    vi.advanceTimersByTime(60_000);
    for (let i = 0; i < BETA_MINUTE_LIMIT; i++) {
      expect(await checkRateLimit({ ip: "same-ip" })).toMatchObject({ ok: false, reason: "daily" });
    }
    const upgraded = await Promise.all(Array.from({ length: BETA_MINUTE_LIMIT }, () =>
      checkRateLimit({ ip: "same-ip", feedbackSubmitted: true }),
    ));
    expect(upgraded.every((result) => result.ok)).toBe(true);
  });

  it("does not consume an IP quota on shared-token denial and resets token quota at JST midnight", async () => {
    vi.setSystemTime(new Date("2026-10-30T14:58:00.000Z"));
    const { checkRateLimit, BETA_MINUTE_LIMIT } = await import("@/lib/rate-limit/server");
    const { FEEDBACK_TOKEN_DAILY_LIMIT } = await import("@/lib/constants/ai-quota");
    for (let i = 0; i < FEEDBACK_TOKEN_DAILY_LIMIT; i++) {
      await checkRateLimit({ ip: `ip-${i}`, feedbackSubmitted: true, feedbackTokenId: "shared" });
    }
    vi.advanceTimersByTime(119_999);
    for (let i = 0; i < BETA_MINUTE_LIMIT; i++) {
      expect((await checkRateLimit({ ip: "fresh-ip", feedbackSubmitted: true, feedbackTokenId: "shared" })).ok).toBe(false);
    }
    for (let i = 0; i < BETA_MINUTE_LIMIT; i++) {
      expect(await checkRateLimit({ ip: "fresh-ip", feedbackSubmitted: true, feedbackTokenId: "other" })).toMatchObject({ ok: true, remaining: FEEDBACK_TOKEN_DAILY_LIMIT - i - 1 });
    }
    vi.advanceTimersByTime(1);
    expect((await checkRateLimit({ ip: "next-day-ip", feedbackSubmitted: true, feedbackTokenId: "shared" })).ok).toBe(true);
  });
});

describe("configured KV compatibility (no atomic KV migration)", () => {
  function fakeKv(loseMinuteIncrementReply = false) {
    vi.stubEnv("KV_REST_API_URL", "https://kv.example.test");
    vi.stubEnv("KV_REST_API_TOKEN", "test-only-token");
    const counts = new Map<string, number>();
    const commands: string[][] = [];
    vi.stubGlobal("fetch", vi.fn(async (input: string) => {
      const command = new URL(input).pathname.slice(1).split("/").map(decodeURIComponent);
      commands.push(command);
      const [operation, key] = command;
      if (operation === "get") return new Response(JSON.stringify({ result: counts.has(key) ? String(counts.get(key)) : null }));
      if (operation === "incr") {
        const count = (counts.get(key) ?? 0) + 1;
        counts.set(key, count);
        if (loseMinuteIncrementReply && key.startsWith("rl:min:")) throw new Error("Unknown remote mutation outcome");
        return new Response(JSON.stringify({ result: count }));
      }
      if (operation === "expire") return new Response(JSON.stringify({ result: 1 }));
      throw new Error("Unexpected command");
    }));
    return { commands, counts };
  }

  it("preserves existing keys and legacy 60s/24h new-key TTL commands", async () => {
    const { commands } = fakeKv();
    const { checkRateLimit, POST_FEEDBACK_DAILY_LIMIT } = await import("@/lib/rate-limit/server");
    expect(await checkRateLimit({ ip: "client", feedbackSubmitted: true, feedbackTokenId: "token" })).toMatchObject({ ok: true, remaining: POST_FEEDBACK_DAILY_LIMIT - 1 });
    expect(commands.filter(([command]) => command === "expire")).toEqual(expect.arrayContaining([
      ["expire", "rl:min:client", "60"],
      ["expire", "rl:day:client", "86400"],
      ["expire", "rl:day:tok:token", "86400"],
    ]));
    commands.length = 0;
    await checkRateLimit({ ip: "client", feedbackSubmitted: true, feedbackTokenId: "token" });
    expect(commands.filter(([command]) => command === "expire")).toEqual([]);
  });

  it("retains legacy uncertain-write handling without adding mutation retries or whole-request replay", async () => {
    const { commands, counts } = fakeKv(true);
    const { checkRateLimit } = await import("@/lib/rate-limit/server");
    expect((await checkRateLimit({ ip: "client" })).ok).toBe(true);
    expect(commands.filter(([command]) => command === "incr")).toEqual([
      ["incr", "rl:min:client"], ["incr", "rl:day:client"],
    ]);
    expect(counts.get("rl:min:client")).toBe(1);
    expect(counts.get("rl:day:client")).toBe(1);
  });
});
