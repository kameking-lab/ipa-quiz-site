// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QUESTION_QUOTA_LUA, questionQuotaStore, readAiQuestionMetrics } from "@/lib/ai/question-quota-kv";
import { sharedNormalUseStore } from "@/lib/ai/normal-use-kv";
import { sharedUsageStore } from "@/lib/ai/usage-kv";

const now = Date.UTC(2026, 10, 23, 8, 40);
const day = { subject: "guest:synthetic-browser", limit: 3, offset: 540, now };
const rest = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubEnv("KV_REST_API_URL", "https://example.test/");
  vi.stubEnv("KV_REST_API_TOKEN", "synthetic-test-token");
  vi.stubGlobal("fetch", rest);
  rest.mockReset();
  vi.useFakeTimers({ toFake: ["Date"], now });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function argumentsFor(call: number) {
  const [url, init] = rest.mock.calls[call];
  expect(url).toBe("https://example.test");
  expect(init).toMatchObject({ method: "POST", cache: "no-store", headers: { "Content-Type": "application/json" } });
  return JSON.parse(String(init?.body));
}

describe("Upstash JSON REST contract", () => {
  it("posts a declared key list and decimal-string Lua arguments and accepts an integer or digit string", async () => {
    rest.mockResolvedValueOnce(Response.json({ result: ["reserved", 0] }))
      .mockResolvedValueOnce(Response.json({ result: ["completed", "1"] }));
    const reserved = await questionQuotaStore.reserve(day, ["copilot", "question"]);
    expect(reserved).toMatchObject({ status: "reserved", remaining: 3 });
    const payload = argumentsFor(0);
    const [, , numKeys, quotaKey, , claimKey, ...args] = payload;
    expect(payload.slice(0, 2)).toEqual(["EVAL", QUESTION_QUOTA_LUA]);
    expect(numKeys).toBe(3);
    expect(claimKey).toBe(`${quotaKey}:claim`);
    const lease = reserved.lease!;
    expect(args).toEqual(["reserve", "3", String(now), String(reserved.resetAt + 120_000),
      lease.fingerprint, lease.owner, String(now + 120_000), String(8 * 86_400)]);
    expect(await questionQuotaStore.settle(lease, true)).toMatchObject({ status: "completed", remaining: 2 });
    expect(argumentsFor(1).slice(-8)).toEqual(["complete", ...args.slice(1)]);
  });

  it("retries ambiguous admission once using the same request digest and lease owner", async () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    rest.mockResolvedValueOnce(Response.json({ error: "ERR command rate limit exceeded" }, { status: 503 }))
      .mockResolvedValueOnce(Response.json({ result: ["reserved", "0"] }));
    expect(await questionQuotaStore.reserve(day, ["copilot", "question"])).toMatchObject({ status: "reserved", remaining: 3 });
    expect(argumentsFor(0)).toEqual(argumentsFor(1));
    expect(warning).toHaveBeenCalledExactlyOnceWith("[ai-kv] command failed", {
      operation: "question-quota:reserve", kind: "http", httpStatus: 503, upstashError: "command rate limit exceeded",
    });
  });

  it("handles error envelopes without logging credentials, addresses, cookies or arbitrary text", async () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    rest.mockResolvedValueOnce(Response.json({ error: "ERR WRONGTYPE caller=192.0.2.10 cookie=synthetic-test-token" }, { status: 400 }))
      .mockResolvedValueOnce(Response.json({ error: "synthetic-test-token" }));
    await expect(questionQuotaStore.read(day)).rejects.toThrow("usage store unavailable");
    expect(warning.mock.calls).toEqual([
      ["[ai-kv] command failed", { operation: "question-quota:read", kind: "http", httpStatus: 400, upstashError: "WRONGTYPE" }],
      ["[ai-kv] command failed", { operation: "question-quota:read", kind: "response", httpStatus: 200, upstashError: "unrecognized Upstash error" }],
    ]);
  });

  it.each([null, false, "", " 1", "1.5", 4, {}])("does not infer admission from a malformed count (%j)", async count => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    rest.mockImplementation(async () => Response.json({ result: ["reserved", count] }));
    await expect(questionQuotaStore.reserve(day, "question")).rejects.toThrow("invalid question quota response");
    expect(rest).toHaveBeenCalledTimes(2);
  });

  it("normalizes count tuples and treats Redis null as zero only for absent metric fields", async () => {
    rest.mockResolvedValueOnce(Response.json({ result: ["1", "1"] }))
      .mockResolvedValueOnce(Response.json({ result: [0, "1"] }))
      .mockResolvedValueOnce(Response.json({ result: [null, "2", 1] }));
    expect(await sharedUsageStore.admit(day.subject, 3, day.offset, now)).toMatchObject({ allowed: true, remaining: 2 });
    expect(await sharedNormalUseStore.admit([{ key: "window", limit: 1, resetAt: now + 60_000, reason: "minute" }]))
      .toEqual({ allowed: false, deniedWindow: 0 });
    expect(await readAiQuestionMetrics(now)).toEqual({ free: 0, paid: 2, quotaReached: 1 });
  });
});
