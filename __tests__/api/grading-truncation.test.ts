import { describe, it, expect, beforeEach, vi } from "vitest";

/**
 * 午後 AI 採点が「課金だけ発生して中身は字数判定」に戻らないための回帰テスト。
 *
 * 固定する挙動は 3 つ:
 *  1. 採点ルートは thinkingBudget と responseMimeType を必ずプロバイダに渡す
 *     （思考トークンが maxOutputTokens を食い潰す事故の根本原因）
 *  2. 応答が MAX_TOKENS で切れたときは、黙って簡易判定に落ちず
 *     「出力上限で途中終了した」と利用者に開示する
 *  3. 思考トークンは出力として課金されるので、必ず計上に含める
 */

const seen = vi.hoisted(() => ({
  params: [] as Array<Record<string, unknown>>,
  cost: [] as Array<{ inputTokens: number; outputTokens: number; label: string }>,
  truncate: false,
}));

vi.mock("@/lib/ai/provider", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/provider")>("@/lib/ai/provider");
  return {
    ...actual,
    getProvider: async () => ({
      name: "gemini",
      async *streamChat(params: Record<string, unknown>) {
        seen.params.push(params);
        const onComplete = params.onComplete as
          | ((c: import("@/lib/ai/provider").StreamCompletion) => void)
          | undefined;
        if (seen.truncate) {
          // improvements / axes の途中で切れた JSON（実測時と同じ壊れ方）
          yield '{"totalScore":40,"rank":"B","subResults":[{"label":"設問1","key":"ア","score":8,"improvements":["キーワード';
          onComplete?.({
            finishReason: "MAX_TOKENS",
            promptTokens: 1975,
            outputTokens: 400,
            thoughtsTokens: 1091,
            truncated: true,
          });
          return;
        }
        yield JSON.stringify({
          totalScore: 80,
          subResults: [{ label: "設問1", score: 16, goodPoints: ["良い"], improvements: [] }],
          overallComment: "よくできています",
          rank: "A",
          passProbability: 80,
          overallAdvice: "よい論述です",
        });
        onComplete?.({
          finishReason: "STOP",
          promptTokens: 1975,
          outputTokens: 632,
          thoughtsTokens: undefined,
          truncated: false,
        });
      },
    }),
  };
});

vi.mock("@/lib/ai/cost-guard", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/cost-guard")>(
    "@/lib/ai/cost-guard",
  );
  return {
    ...actual,
    checkMonthlyCostCap: async () => ({ allowed: true }),
    recordAiCost: async (entry: { inputTokens: number; outputTokens: number; label: string }) => {
      seen.cost.push(entry);
    },
  };
});

const { POST: scoringPOST } = await import("@/app/api/scoring/route");
const { POST: essayPOST } = await import("@/app/api/essay-grade/route");

let ipCounter = 0;
function req(url: string, body: unknown): Request {
  ipCounter += 1;
  return new Request(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `172.20.${Math.floor(ipCounter / 250)}.${ipCounter % 250}`,
    },
    body: JSON.stringify(body),
  });
}

const scoringBody = {
  questionId: "ap-2024h-pm-q1",
  answers: [{ label: "設問1", text: "テスト解答です。" }],
};

const essayText = "あ".repeat(700);
const essayBody = {
  questionId: "pm-2024a-pm2-q1",
  industry: "manufacturing",
  answers: { ア: essayText, イ: essayText, ウ: essayText },
};

beforeEach(() => {
  process.env.GEMINI_API_KEY = "test-key";
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  seen.params = [];
  seen.cost = [];
  seen.truncate = false;
});

describe("/api/scoring — thinking budget と打ち切り開示", () => {
  it("thinkingBudget と responseMimeType をプロバイダに渡す", async () => {
    await scoringPOST(req("http://localhost/api/scoring", scoringBody)).then((r) => r.text());
    expect(seen.params).toHaveLength(1);
    expect(seen.params[0].thinkingBudget).toBe(0);
    expect(seen.params[0].responseMimeType).toBe("application/json");
  });

  it("STOP で完走したら gradingMode は ai になる", async () => {
    const res = await scoringPOST(req("http://localhost/api/scoring", scoringBody));
    const json = JSON.parse(await res.text());
    expect(json.gradingMode).toBe("ai");
  });

  it("MAX_TOKENS で切れたら「出力上限で途中終了」と開示する", async () => {
    seen.truncate = true;
    const res = await scoringPOST(req("http://localhost/api/scoring", scoringBody));
    const json = JSON.parse(await res.text());
    expect(json.gradingMode).toBe("simplified");
    expect(json.overallComment).toContain("出力上限");
  });

  it("思考トークンを出力トークンとして計上する", async () => {
    seen.truncate = true;
    await scoringPOST(req("http://localhost/api/scoring", scoringBody)).then((r) => r.text());
    expect(seen.cost).toHaveLength(1);
    // 400 (本文) + 1091 (思考) — 思考ぶんを落とすと §0 の上限が実費を見失う
    expect(seen.cost[0].outputTokens).toBe(1491);
    expect(seen.cost[0].inputTokens).toBe(1975);
  });
});

describe("/api/essay-grade — thinking budget と打ち切り開示", () => {
  it("thinkingBudget と responseMimeType をプロバイダに渡す", async () => {
    await essayPOST(req("http://localhost/api/essay-grade", essayBody));
    expect(seen.params).toHaveLength(1);
    expect(seen.params[0].thinkingBudget).toBe(0);
    expect(seen.params[0].responseMimeType).toBe("application/json");
  });

  it("MAX_TOKENS で切れたら simplified として開示する", async () => {
    seen.truncate = true;
    const res = await essayPOST(req("http://localhost/api/essay-grade", essayBody));
    const json = await res.json();
    expect(json.gradingMode).toBe("simplified");
    expect(res.headers.get("X-Grading-Mode")).toBe("simplified");
    expect(json.overallAdvice).toContain("出力上限");
  });

  it("思考トークンを出力トークンとして計上する", async () => {
    seen.truncate = true;
    await essayPOST(req("http://localhost/api/essay-grade", essayBody));
    expect(seen.cost).toHaveLength(1);
    expect(seen.cost[0].outputTokens).toBe(1491);
  });
});
