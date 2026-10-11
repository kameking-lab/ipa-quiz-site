import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { Question } from "@/lib/questions/types";

/**
 * コスト計上の永続化（fire-and-forget 禁止）。
 *
 * 背景（2026-07-28 本番/Preview 実測）: /api/scoring を 4 回叩いても KV の
 * ai_cost:YYYY-MM が 1 円も動かなかった。例外でも KV 未接続でもなく、原因は
 * `void recordAiCost(...)` で計上を投げっぱなしにしたまま controller.close() /
 * return でレスポンスを終えていたこと。サーバレス環境ではレスポンス完了と同時に
 * 関数が凍結されるため、飛行中の KV 書き込みが黙って捨てられる。
 * その結果、CLAUDE.md §0 の ¥50,000 自動停止が最高単価の 2 経路
 * （scoring / essay-grade = resolveModel("grading")）を見失っていた。
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

// Billing durability is independent of the full published question corpus.
// Keep the real route, prompt assembly and stream; replace only the question lookup.
const copilotQuestion: Question = {
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
};
vi.mock("@/lib/questions/load", () => ({
  getQuestionById: (id: string) => id === copilotQuestion.id ? copilotQuestion : undefined,
  getAllQuestions: () => [copilotQuestion],
}));

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

function installBlockedRecord() {
  let settled = false;
  let resolveStarted!: () => void;
  let completeWrite!: () => void;
  const started = new Promise<void>((resolve) => { resolveStarted = resolve; });
  recordAiCost.mockImplementation(() => {
    resolveStarted();
    return new Promise<void>((resolve) => { completeWrite = resolve; });
  });
  return {
    started,
    settled: () => settled,
    release: () => {
      settled = true;
      completeWrite();
    },
  };
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
  // A developer/CI API key must not switch this unit test to a real paid provider.
  vi.stubEnv("GEMINI_API_KEY", undefined);
  vi.stubEnv("KV_REST_API_URL", undefined);
  vi.stubEnv("KV_REST_API_TOKEN", undefined);
  vi.stubEnv("GEMINI_MODEL_GRADING", undefined);
  vi.stubEnv("SLACK_WEBHOOK_URL", undefined);
  vi.stubEnv("SENTRY_DSN", undefined);
  // RAG コーパス構築（14k 件）は数秒かかり、ここで検証したい契約とは無関係。
  // 並列実行時にテストタイムアウトを踏むだけなので切っておく。
  vi.stubEnv("COPILOT_RAG_ENABLED", "false");
  checkMonthlyCostCap.mockResolvedValue({ allowed: true, totalJpy: 0, capJpy: 50_000 });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("コスト計上はレスポンス完了前に永続化を終える", () => {
  it("/api/scoring — ストリームが閉じる時点で recordAiCost が解決済み", async () => {
    const pending = installPendingRecord();
    stubStream(
      JSON.stringify({
        totalScore: 80,
        subResults: ["設問1", "設問2", "設問3", "設問4"].map(label => ({label, score: 20, goodPoints: [], improvements: []})),
        overallComment: "ok",
      }),
    );
    const { POST } = await import("@/app/api/scoring/route");

    const res = await POST(
      new Request("http://localhost/api/scoring", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "10.9.0.1" },
        body: JSON.stringify({
          questionId: "ap-2024h-pm-q1",
          answers: [{ label: "設問1", text: "サンプル解答テキストです。" }],
        }),
      }),
    );
    expect(res.status).toBe(200);
    await drain(res);

    expect(recordAiCost).toHaveBeenCalledTimes(1);
    // void recordAiCost(...) に戻すとここが false になる（本番で失われていた状態）。
    expect(pending.settled()).toBe(true);
  });

  it("/api/essay-grade — レスポンス返却時点で recordAiCost が解決済み", async () => {
    const pending = installPendingRecord();
    stubStream("これはJSONではないので評価不能だが、呼出し使用量は計上する。");
    const { POST } = await import("@/app/api/essay-grade/route");

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

  it("/api/generate-question — レスポンス返却時点で recordAiCost が解決済み", async () => {
    const pending = installPendingRecord();
    stubStream(
      JSON.stringify({
        question: "類題本文",
        choices: { ア: "a", イ: "b", ウ: "c", エ: "d" },
        answer: "ア",
        explanation: "解説",
      }),
    );
    const { POST } = await import("@/app/api/generate-question/route");

    const res = await POST(
      new Request("http://localhost/api/generate-question", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "10.9.0.3" },
        body: JSON.stringify({
          baseQuestion: {
            id: "ap-2023h-am-q1",
            exam: "ap",
            category: "テクノロジ",
            topicTags: ["アルゴリズム"],
            question: "テスト問題本文。",
            choices: { ア: "選択肢ア", イ: "選択肢イ", ウ: "選択肢ウ", エ: "選択肢エ" },
            answer: "ア",
            explanation: "解説テキスト。",
          },
          difficultyShift: "same",
        }),
      }),
    );
    expect(res.status).toBe(200);
    await drain(res);

    expect(recordAiCost).toHaveBeenCalledTimes(1);
    expect(pending.settled()).toBe(true);
  });

  it("/api/copilot — ストリームが閉じる時点で recordAiCost が解決済み", async () => {
    const pending = installBlockedRecord();
    stubStream("解説テキストです。");
    const { POST } = await import("@/app/api/copilot/route");

    const res = await POST(
      new Request("http://localhost/api/copilot", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "10.9.0.4" },
        body: JSON.stringify({
          question: copilotQuestion,
          messages: [{ role: "user", content: "この問題を解説して" }],
        }),
      }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("X-Provider")).toBe("gemini");
    expect(checkMonthlyCostCap).toHaveBeenCalledTimes(1);

    let streamClosed = false;
    const finished = drain(res).then(() => { streamClosed = true; });
    try {
      await pending.started;
      // Let a premature close reach the reader while the write is still blocked.
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      expect(recordAiCost).toHaveBeenCalledTimes(1);
      expect(pending.settled()).toBe(false);
      expect(streamClosed).toBe(false);
    } finally {
      pending.release();
      await finished;
    }
    expect(pending.settled()).toBe(true);
    expect(streamClosed).toBe(true);
  });
});

describe("ソースレベルの再発防止", () => {
  it("recordAiCost を fire-and-forget（void）で呼ぶルートが存在しない", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const ROUTES = [
      "app/api/scoring/route.ts",
      "app/api/essay-grade/route.ts",
      "app/api/generate-question/route.ts",
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
