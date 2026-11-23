import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * コスト計上の永続化（fire-and-forget 禁止）。
 *
 * ここで固定する契約:
 *   recordAiCost が解決するまで、レスポンスは完了してはならない。
 *
 * 検証方法: recordAiCost をマクロタスク後に解決する遅延 Promise に差し替え、
 * 「レスポンスが完了した時点」で解決済みかどうかを見る。await していなければ
 * 未解決のままレスポンスが終わる＝落ちる。
 */

const recordAiCost = vi.fn();
const checkMonthlyCostCap = vi.fn();

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

const streamChat = vi.fn();
vi.mock("@/lib/ai/provider", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/provider")>("@/lib/ai/provider");
  return {
    ...actual,
    getProvider: async () => ({ name: "gemini", streamChat }),
  };
});

/**
 * 「まだ書き込みが終わっていない KV」を模す。setTimeout(0) を挟むことで、
 * await していないコードパスは必ず settled=false のままレスポンスを終える。
 */
function installPendingRecord(): { settled: () => boolean } {
  let settled = false;
  recordAiCost.mockImplementation(
    () =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          settled = true;
          resolve();
        }, 0);
      }),
  );
  return { settled: () => settled };
}

function stubStream(text: string) {
  streamChat.mockImplementation(async function* () {
    yield text;
  });
}

async function drain(res: Response): Promise<void> {
  if (!res.body) return;
  const reader = res.body.getReader();
  for (;;) {
    const { done } = await reader.read();
    if (done) break;
  }
}

beforeEach(() => {
  vi.clearAllMocks();
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  delete process.env.GEMINI_MODEL_GRADING;
  // RAG コーパス構築（14k 件）は数秒かかり、ここで検証したい契約とは無関係。
  // 並列実行時にテストタイムアウトを踏むだけなので切っておく。
  process.env.COPILOT_RAG_ENABLED = "false";
  checkMonthlyCostCap.mockResolvedValue({ allowed: true, totalJpy: 0, capJpy: 50_000 });
});

afterEach(() => {
  delete process.env.COPILOT_RAG_ENABLED;
  vi.resetModules();
});

describe("コスト計上はレスポンス完了前に永続化を終える", () => {
  it("/api/essay-grade — レスポンス返却時点で recordAiCost が解決済み", async () => {
    const pending = installPendingRecord();
    stubStream("これはJSONではないので評価不能だが、呼出し使用量は計上する。");
    const { POST } = await import("@/lib/essay/legacy-grade");

    const res = await POST(
      new Request("http://localhost/api/essay-grade", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "10.9.0.2" },
        body: JSON.stringify({
          questionId: "au-2024a-pm2-q1",
          industry: "it",
          answers: {
            ア: "あ".repeat(800),
            イ: "い".repeat(800),
            ウ: "う".repeat(800),
          },
        }),
      }),
    );
    expect(res.status).toBe(503);
    await drain(res);

    expect(recordAiCost).toHaveBeenCalledTimes(1);
    // 1 回 ¥2〜3 の最高単価経路。ここが落ちると上限が最も危険な経路を見失う。
    expect(pending.settled()).toBe(true);
  });

  it("/api/copilot — ストリームが閉じる時点で recordAiCost が解決済み", async () => {
    const pending = installPendingRecord();
    stubStream("解説テキストです。");
    const { POST } = await import("@/app/api/copilot/route");

    const res = await POST(
      new Request("http://localhost/api/copilot", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "10.9.0.4" },
        body: JSON.stringify({
          question: {
            id: "ap-2023h-am-q1",
            exam: "ap",
            session: "am",
            year: 2023,
            season: "spring",
            qNumber: 1,
            type: "multiple-choice",
            category: "テクノロジ",
            topicTags: ["アルゴリズム"],
            difficulty: 3,
            question: "テスト問題本文。",
            choices: { ア: "選択肢ア", イ: "選択肢イ", ウ: "選択肢ウ", エ: "選択肢エ" },
            answer: "ア",
            explanation: "解説テキスト。",
            hasImage: false,
            sourcePdfUrl: "https://example.com/test.pdf",
            license: "IPA-public",
          },
          messages: [{ role: "user", content: "この問題を解説して" }],
        }),
      }),
    );
    expect(res.status).toBe(200);
    await drain(res);

    expect(recordAiCost).toHaveBeenCalledTimes(1);
    // copilot は逐次ストリームの遅延に救われて本番では偶然載っていたが、
    // 保証はどこにも無い。短い応答ほど失われやすい。
    expect(pending.settled()).toBe(true);
  }, 60_000);
});

describe("ソースレベルの再発防止", () => {
  it("recordAiCost を fire-and-forget（void）で呼ぶルートが存在しない", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const ROUTES = [
      "lib/essay/legacy-grade.ts",
      "app/api/copilot/route.ts",
    ];
    for (const rel of ROUTES) {
      const src = readFileSync(join(process.cwd(), rel), "utf-8");
      expect(src).toContain("recordAiCost");
      // `void recordAiCost(` が復活したら落ちる。
      expect(src).not.toMatch(/void\s+recordAiCost\s*\(/);
    }
  });
});
