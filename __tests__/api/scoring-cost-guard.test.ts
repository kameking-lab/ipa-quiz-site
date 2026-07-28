import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * /api/scoring のコスト上限装置への配線（ブロッカー1）。
 *
 * 背景: cost-guard を呼んでいたのは copilot / essay-grade / generate-question の
 * 3 ルートだけで、/api/scoring は未配線だった。午後採点は resolveModel("grading")
 * = pro 層を使う最も単価の高い経路なのに、月間累計に記録すらされず、
 * §0 の ¥50,000 自動停止も効かない状態だった。
 *
 * ここで固定する契約（既存 3 ルートと同じ作法）:
 *  1. 上限到達時は 503 / error:"cost_capped" / X-Error-Type:"cost_capped" を返す
 *  2. 上限未到達なら通常どおり採点し、完了後に recordAiCost で計上する
 *  3. 計上する層はモデル ID から導出される（pro を flash-lite で記録しない）
 *  4. mock プロバイダ（課金なし）では上限チェックも計上もしない
 */

const checkMonthlyCostCap = vi.fn();
const recordAiCost = vi.fn();

vi.mock("@/lib/ai/cost-guard", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/cost-guard")>(
    "@/lib/ai/cost-guard",
  );
  return {
    ...actual,
    checkMonthlyCostCap: (...args: unknown[]) => checkMonthlyCostCap(...args),
    recordAiCost: (...args: unknown[]) => recordAiCost(...args),
  };
});

// 実プロバイダを装う最小スタブ。route は provider.name !== "mock" を実課金とみなす。
const streamChat = vi.fn();
vi.mock("@/lib/ai/provider", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/provider")>("@/lib/ai/provider");
  return {
    ...actual,
    getProvider: async () => ({ name: "gemini", streamChat }),
  };
});

const QUESTION_ID = "ap-2024h-pm-q1";

function makeReq(ip: string): Request {
  return new Request("http://localhost/api/scoring", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({
      questionId: QUESTION_ID,
      answers: [{ label: "設問1", text: "サンプル解答テキストです。" }],
    }),
  });
}

function stubStream(text: string) {
  streamChat.mockImplementation(async function* () {
    yield text;
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  // 層がモデル ID から導出されることを見たいので、上位モデルを明示して固定する
  // （既定値は安全側の flash。既定値そのものの契約は cost-tracker-tier.test.ts）。
  process.env.GEMINI_MODEL_GRADING = "gemini-2.5-pro";
  checkMonthlyCostCap.mockResolvedValue({ allowed: true, totalJpy: 0, capJpy: 50_000 });
  recordAiCost.mockResolvedValue(undefined);
});

afterEach(() => {
  delete process.env.GEMINI_MODEL_GRADING;
  vi.resetModules();
});

describe("/api/scoring — コスト上限装置への配線", () => {
  it("月間上限に到達していると 503 cost_capped を返し、AI を一切呼ばない", async () => {
    checkMonthlyCostCap.mockResolvedValue({
      allowed: false,
      totalJpy: 50_001,
      capJpy: 50_000,
    });
    stubStream("{}");
    const { POST } = await import("@/app/api/scoring/route");

    const res = await POST(makeReq("10.1.0.1"));

    // 未配線だと上限を無視して 200 で採点が走る＝ここが落ちる。
    expect(res.status).toBe(503);
    expect(res.headers.get("X-Error-Type")).toBe("cost_capped");
    expect((await res.json()).error).toBe("cost_capped");
    expect(streamChat).not.toHaveBeenCalled();
  });

  it("上限未到達なら採点し、完了後に月間累計へ計上する", async () => {
    stubStream(
      JSON.stringify({
        totalScore: 80,
        subResults: [{ label: "設問1", score: 16, goodPoints: [], improvements: [] }],
        overallComment: "ok",
      }),
    );
    const { POST } = await import("@/app/api/scoring/route");

    const res = await POST(makeReq("10.1.0.2"));
    expect(res.status).toBe(200);
    await res.text(); // ストリーム完走 → recordAiCost 発火

    expect(checkMonthlyCostCap).toHaveBeenCalled();
    // 未配線だと 1 度も呼ばれない＝使用量が累計に記録すらされない。
    expect(recordAiCost).toHaveBeenCalledTimes(1);

    const arg = recordAiCost.mock.calls[0][0] as {
      tier: string;
      label: string;
      inputTokens: number;
      outputTokens: number;
    };
    expect(arg.label).toBe("scoring");
    // 午後採点は pro 層。flash-lite で記録されると集計が 25 分の 1 になる。
    expect(arg.tier).toBe("pro");
    expect(arg.inputTokens).toBeGreaterThan(0);
    expect(arg.outputTokens).toBeGreaterThan(0);
  });

  it("mock プロバイダ（課金なし）では上限チェックも計上もしない", async () => {
    vi.doMock("@/lib/ai/provider", async () => {
      const actual = await vi.importActual<typeof import("@/lib/ai/provider")>(
        "@/lib/ai/provider",
      );
      return { ...actual, getProvider: async () => ({ name: "mock", streamChat }) };
    });
    vi.resetModules();
    const { POST } = await import("@/app/api/scoring/route");

    const res = await POST(makeReq("10.1.0.3"));
    expect(res.status).toBe(200);
    await res.text();

    expect(checkMonthlyCostCap).not.toHaveBeenCalled();
    expect(recordAiCost).not.toHaveBeenCalled();
    vi.doUnmock("@/lib/ai/provider");
  });
});
