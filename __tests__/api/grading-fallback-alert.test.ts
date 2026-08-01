import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// 採点の mock-fallback は「AI 呼び出しの課金は発生しているのに、利用者へ返るのは
// 字数ベースの簡易判定」という状態。200 で返るので外形監視には映らず、
// console.warn は Vercel のログに流れて誰も見ない＝黙って壊れ続ける経路だった。
// 運用側に必ず届くこと、かつ鳴りすぎないことの両方を固定する。

const KV = "https://kv.example";

interface KvState {
  counters: Map<string, number>;
  slackPosts: string[];
}

function installFetchMock(opts: { kv: boolean }): KvState {
  const state: KvState = { counters: new Map(), slackPosts: [] };
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input.toString();
      if (opts.kv && url.startsWith(KV)) {
        const path = url.slice(KV.length);
        const [, op, rawKey] = path.split("/");
        const key = decodeURIComponent(rawKey ?? "");
        if (op === "incr") {
          const next = (state.counters.get(key) ?? 0) + 1;
          state.counters.set(key, next);
          return new Response(JSON.stringify({ result: next }), { status: 200 });
        }
        return new Response(JSON.stringify({ result: 1 }), { status: 200 });
      }
      state.slackPosts.push(String(init?.body ?? ""));
      return new Response("ok", { status: 200 });
    }),
  );
  return state;
}

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("SLACK_WEBHOOK_URL", "https://hooks.slack.example/test");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("notifyOpsOnce — 異常は届き、鳴りすぎない", () => {
  it("同一事象は cooldown 内に 1 回しか送らない（通知が無視される状態を作らない）", async () => {
    vi.stubEnv("KV_REST_API_URL", KV);
    vi.stubEnv("KV_REST_API_TOKEN", "t");
    const state = installFetchMock({ kv: true });
    const { notifyOpsOnce } = await import("@/lib/notify/ops-alert");

    expect(await notifyOpsOnce({ key: "scoring:mock-fallback", text: "1 回目" })).toBe(true);
    expect(await notifyOpsOnce({ key: "scoring:mock-fallback", text: "2 回目" })).toBe(false);
    expect(await notifyOpsOnce({ key: "scoring:mock-fallback", text: "3 回目" })).toBe(false);
    expect(state.slackPosts.length).toBe(1);
  });

  it("別の事象は別枠で通知される（1 件目が他を塞がない）", async () => {
    vi.stubEnv("KV_REST_API_URL", KV);
    vi.stubEnv("KV_REST_API_TOKEN", "t");
    const state = installFetchMock({ kv: true });
    const { notifyOpsOnce } = await import("@/lib/notify/ops-alert");

    await notifyOpsOnce({ key: "scoring:mock-fallback", text: "a" });
    await notifyOpsOnce({ key: "scoring:truncated", text: "b" });
    await notifyOpsOnce({ key: "essay-grade:mock-fallback", text: "c" });
    expect(state.slackPosts.length).toBe(3);
  });

  it("KV が無い環境では抑制せず通知を試みる（異常を握り潰さない）", async () => {
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
    const state = installFetchMock({ kv: false });
    const { notifyOpsOnce } = await import("@/lib/notify/ops-alert");

    await notifyOpsOnce({ key: "scoring:mock-fallback", text: "x" });
    await notifyOpsOnce({ key: "scoring:mock-fallback", text: "y" });
    expect(state.slackPosts.length).toBe(2);
  });

  it("Slack 送信が失敗しても throw しない（通知の都合で採点を壊さない）", async () => {
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      }),
    );
    const { notifyOpsOnce } = await import("@/lib/notify/ops-alert");
    await expect(notifyOpsOnce({ key: "k", text: "t" })).resolves.toBe(false);
  });
});

describe("buildGradingFallbackAlert — 通知だけで次の手が決まる", () => {
  it("truncated のときは出力上限で切れたと明示する", async () => {
    const { buildGradingFallbackAlert } = await import("@/lib/notify/ops-alert");
    const text = buildGradingFallbackAlert({
      route: "/api/scoring",
      questionId: "ap-2023a-pm-q2",
      model: "gemini-2.5-flash",
      usage: {
        truncated: true,
        finishReason: "MAX_TOKENS",
        outputTokens: 400,
        thoughtsTokens: 1091,
      },
      rawChars: 1200,
    });
    expect(text).toContain("truncated");
    expect(text).toContain("MAX_TOKENS");
    // 思考トークンが上限を食い潰した事故の指紋。これが載っていないと
    // 通知を見ても原因の切り分けができない。
    expect(text).toContain("thoughtsTokens=1091");
    expect(text).toContain("ap-2023a-pm-q2");
    expect(text).toContain("gemini-2.5-flash");
  });

  it("解析失敗のときは課金済みであることを明示する", async () => {
    const { buildGradingFallbackAlert } = await import("@/lib/notify/ops-alert");
    const text = buildGradingFallbackAlert({
      route: "/api/essay-grade",
      questionId: "pm-2023a-pm2-q1",
      model: "gemini-2.5-flash",
      usage: { truncated: false, finishReason: "STOP" },
      rawChars: 80,
    });
    expect(text).toContain("課金は発生済み");
    expect(text).toContain("解析に失敗");
  });
});

describe("採点ルートが実際にアラートを配線している", () => {
  const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

  it("scoring の mock-fallback 分岐が通知を出す", () => {
    const src = read("app/api/scoring/route.ts");
    expect(src).toMatch(/notifyOpsInBackground/);
    expect(src).toMatch(/scoring:mock-fallback/);
    expect(src).toMatch(/scoring:truncated/);
  });

  it("essay-grade の mock-fallback 分岐が通知を出す", () => {
    const src = read("app/api/essay-grade/route.ts");
    expect(src).toMatch(/notifyOpsInBackground/);
    expect(src).toMatch(/essay-grade:mock-fallback/);
    expect(src).toMatch(/essay-grade:truncated/);
  });

  it("rate_limited / cost_capped では通知しない（鳴らすと他の警報が埋もれる）", () => {
    // 無料枠・IP 制限は正常動作。cost_capped は ¥50,000 到達時に cost-guard が
    // 1 回通知済みで、その後の 503 は帰結にすぎない。どちらもここで鳴らすと
    // 件数が多すぎて、本当に見るべき mock-fallback が埋もれる。
    for (const path of ["app/api/scoring/route.ts", "app/api/essay-grade/route.ts"]) {
      const src = read(path);
      const alertKeys = [...src.matchAll(/key:\s*usage\?\.truncated\s*\?\s*"([^"]+)"\s*:\s*"([^"]+)"/g)]
        .flatMap((m) => [m[1], m[2]]);
      expect(alertKeys.length, `${path} に通知の配線が無い`).toBeGreaterThan(0);
      for (const key of alertKeys) {
        expect(key).toMatch(/(mock-fallback|truncated)$/);
      }
      expect(src).not.toMatch(/key:\s*"[^"]*rate[_-]?limit/i);
      expect(src).not.toMatch(/key:\s*"[^"]*cost[_-]?cap/i);
    }
  });
});
