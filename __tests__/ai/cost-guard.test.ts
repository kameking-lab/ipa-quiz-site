import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The KV/Slack config is read lazily inside lib/ai/cost-guard, so we can stub
// env per-test and drive behaviour purely through a mocked global fetch.

const KV_URL = "https://kv.example.com";
const KV_TOKEN = "test-token";

interface FetchCall {
  url: string;
  body?: unknown;
}

/**
 * Install a fetch mock that answers Upstash REST endpoints from an in-memory
 * store and records Slack POSTs. Returns the recorded Slack messages + KV store.
 */
function installKvMock(initial: Record<string, number | string> = {}) {
  const store = new Map<string, number | string>(Object.entries(initial));
  const slackMessages: string[] = [];
  const calls: FetchCall[] = [];

  const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    calls.push({ url });

    // Slack webhook
    if (url.startsWith("https://hooks.slack.test")) {
      const body = init?.body ? JSON.parse(String(init.body)) : {};
      slackMessages.push(body.text ?? "");
      return new Response("ok", { status: 200 });
    }

    // Upstash REST: /get/<key>
    let m = url.match(/\/get\/(.+)$/);
    if (m) {
      const key = decodeURIComponent(m[1]);
      const result = store.has(key) ? String(store.get(key)) : null;
      return new Response(JSON.stringify({ result }), { status: 200 });
    }
    // /incrbyfloat/<key>/<amount>
    m = url.match(/\/incrbyfloat\/([^/]+)\/(.+)$/);
    if (m) {
      const key = decodeURIComponent(m[1]);
      const amount = Number(m[2]);
      const next = (Number(store.get(key)) || 0) + amount;
      store.set(key, next);
      return new Response(JSON.stringify({ result: String(next) }), { status: 200 });
    }
    // /incr/<key>
    m = url.match(/\/incr\/(.+)$/);
    if (m) {
      const key = decodeURIComponent(m[1]);
      const next = (Number(store.get(key)) || 0) + 1;
      store.set(key, next);
      return new Response(JSON.stringify({ result: next }), { status: 200 });
    }
    // /expire/<key>/<ttl>
    if (/\/expire\//.test(url)) {
      return new Response(JSON.stringify({ result: 1 }), { status: 200 });
    }
    return new Response("not found", { status: 404 });
  });

  vi.stubGlobal("fetch", fetchMock);
  return { store, slackMessages, calls, fetchMock };
}

describe("cost-guard monthly cap", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("KV_REST_API_URL", KV_URL);
    vi.stubEnv("KV_REST_API_TOKEN", KV_TOKEN);
    vi.stubEnv("SLACK_WEBHOOK_URL", "https://hooks.slack.test/abc");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("allows requests when monthly total is below ¥50,000", async () => {
    const { monthlyCostKey } = await import("@/lib/ai/cost-guard");
    installKvMock({ [monthlyCostKey()]: 49_999 });
    const { checkMonthlyCostCap } = await import("@/lib/ai/cost-guard");
    const status = await checkMonthlyCostCap();
    expect(status.allowed).toBe(true);
    expect(status.totalJpy).toBe(49_999);
    expect(status.capJpy).toBe(50_000);
  });

  it("blocks requests once monthly total reaches ¥50,000", async () => {
    const { monthlyCostKey } = await import("@/lib/ai/cost-guard");
    installKvMock({ [monthlyCostKey()]: 50_000 });
    const { checkMonthlyCostCap } = await import("@/lib/ai/cost-guard");
    const status = await checkMonthlyCostCap();
    expect(status.allowed).toBe(false);
  });

  it("allows (degrades open) when KV is not configured", async () => {
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
    installKvMock();
    const { checkMonthlyCostCap } = await import("@/lib/ai/cost-guard");
    const status = await checkMonthlyCostCap();
    expect(status.allowed).toBe(true);
  });

  it("sends a Slack warning the first time ¥40,000 is crossed, once only", async () => {
    const { monthlyCostKey } = await import("@/lib/ai/cost-guard");
    // Start just below 40k; a recorded call pushes the total past it.
    const { slackMessages } = installKvMock({ [monthlyCostKey()]: 39_900 });
    const { recordAiCost } = await import("@/lib/ai/cost-guard");

    // flash-lite output = $0.40/1M ≒ ¥60/1M tokens; 2M tokens ≒ ¥120 → crosses 40k
    // (39,900 → 40,020) but stays under 50k.
    await recordAiCost({ tier: "flash-lite", inputTokens: 0, outputTokens: 2_000_000, label: "t" });
    expect(slackMessages.length).toBe(1);
    expect(slackMessages[0]).toContain("警告");

    // A second crossing must not re-notify the 40k threshold.
    await recordAiCost({ tier: "flash-lite", inputTokens: 0, outputTokens: 1, label: "t" });
    expect(slackMessages.filter((m) => m.includes("警告")).length).toBe(1);
  });

  it("sends an emergency Slack notification when ¥50,000 is crossed", async () => {
    const { monthlyCostKey } = await import("@/lib/ai/cost-guard");
    const { slackMessages } = installKvMock({ [monthlyCostKey()]: 49_900 });
    const { recordAiCost } = await import("@/lib/ai/cost-guard");
    await recordAiCost({ tier: "flash-lite", inputTokens: 0, outputTokens: 2_000_000, label: "t" });
    expect(slackMessages.some((m) => m.includes("上限") && m.includes("自動停止"))).toBe(true);
  });

  it("logs to console.error (never throws) when SLACK_WEBHOOK_URL is unset at a threshold", async () => {
    vi.stubEnv("SLACK_WEBHOOK_URL", "");
    const { monthlyCostKey } = await import("@/lib/ai/cost-guard");
    installKvMock({ [monthlyCostKey()]: 49_900 });
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { recordAiCost } = await import("@/lib/ai/cost-guard");
    await expect(
      recordAiCost({ tier: "flash-lite", inputTokens: 0, outputTokens: 2_000_000, label: "t" }),
    ).resolves.toBeUndefined();
    expect(errSpy).toHaveBeenCalled();
    expect(
      errSpy.mock.calls.some((args) =>
        args.some((a) => String(a).includes("SLACK_WEBHOOK_URL")),
      ),
    ).toBe(true);
  });

  it("estimateTokens is a non-negative chars/2 heuristic", async () => {
    const { estimateTokens } = await import("@/lib/ai/cost-guard");
    expect(estimateTokens(0)).toBe(0);
    expect(estimateTokens(10)).toBe(5);
    expect(estimateTokens(-5)).toBe(0);
  });
});
