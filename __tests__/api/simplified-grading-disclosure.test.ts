import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * 簡易判定フォールバックの開示（利用者が「AI が採点した」と誤認しないこと）。
 *
 * 背景: AI 応答の JSON 解析に失敗すると buildMockScoring / buildMockGrading が
 * 無告知で正規の採点として返っていた。HTTP 200 のまま、X-Provider も "gemini" の
 * ままなので、利用者からは AI 採点と区別がつかない。課金は発生しているのに
 * 中身は字数ヒューリスティック、という状態だった。
 *
 * ここで固定する契約:
 *  1. 簡易判定に落ちたレスポンスは gradingMode:"simplified" を必ず持つ
 *  2. AI 採点が成立したレスポンスは gradingMode:"ai"
 *  3. UI は gradingMode:"simplified" のとき告知を出す
 *  4. サーバログにフォールバックの事実が残る（頻度を後から追える）
 *  5. 内部の env 変数名が利用者向け文言に混ざらない
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

function stubStream(text: string) {
  streamChat.mockImplementation(async function* () {
    yield text;
  });
}

const ESSAY_BODY = {
  questionId: "au-2024a-pm2-q1",
  industry: "it",
  answers: { ア: "あ".repeat(800), イ: "い".repeat(800), ウ: "う".repeat(800) },
};

const SCORING_BODY = {
  questionId: "ap-2024h-pm-q1",
  answers: [{ label: "設問1", text: "サンプル解答テキストです。" }],
};

function req(path: string, body: unknown, ip: string): Request {
  return new Request(`http://localhost${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  checkMonthlyCostCap.mockResolvedValue({ allowed: true, totalJpy: 0, capJpy: 50_000 });
  recordAiCost.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.resetModules();
});

describe("/api/scoring — 簡易判定の開示", () => {
  it("AI 応答が解析できないと gradingMode:'simplified' を返し、ログに残す", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    stubStream("これは JSON ではありません。採点できません。");
    const { POST } = await import("@/app/api/scoring/route");

    const res = await POST(req("/api/scoring", SCORING_BODY, "10.8.0.1"));
    expect(res.status).toBe(200);
    const body = JSON.parse(await res.text()) as { gradingMode?: string };

    // 開示が無いと利用者は AI 採点と区別できない（＝ここが落ちる）。
    expect(body.gradingMode).toBe("simplified");
    // 頻度を後から追えないと、静かに壊れ続ける。
    expect(warn).toHaveBeenCalled();
    expect(warn.mock.calls.some((c) => String(c[0]).includes("mock-fallback"))).toBe(true);
    warn.mockRestore();
  });

  it("AI 採点が成立すれば gradingMode:'ai'", async () => {
    stubStream(
      JSON.stringify({
        totalScore: 80,
        subResults: [{ label: "設問1", score: 16, goodPoints: [], improvements: [] }],
        overallComment: "ok",
      }),
    );
    const { POST } = await import("@/app/api/scoring/route");

    const res = await POST(req("/api/scoring", SCORING_BODY, "10.8.0.2"));
    const body = JSON.parse(await res.text()) as { gradingMode?: string };
    expect(body.gradingMode).toBe("ai");
  });
});

describe("/api/essay-grade — 簡易判定の開示", () => {
  it("AI 応答が解析できないと gradingMode:'simplified' + X-Grading-Mode を返し、ログに残す", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    stubStream("採点できません。JSON ではない散文。");
    const { POST } = await import("@/app/api/essay-grade/route");

    const res = await POST(req("/api/essay-grade", ESSAY_BODY, "10.8.0.3"));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { gradingMode?: string };

    expect(body.gradingMode).toBe("simplified");
    expect(res.headers.get("X-Grading-Mode")).toBe("simplified");
    expect(warn.mock.calls.some((c) => String(c[0]).includes("mock-fallback"))).toBe(true);
    warn.mockRestore();
  });

  it("AI 採点が成立すれば gradingMode:'ai' + X-Grading-Mode:'ai'", async () => {
    stubStream(
      JSON.stringify({
        rank: "B",
        passProbability: 55,
        subResults: [
          { key: "ア", score: 60, axes: {}, goodPoints: [], improvements: [], missingElements: [] },
          { key: "イ", score: 60, axes: {}, goodPoints: [], improvements: [], missingElements: [] },
          { key: "ウ", score: 60, axes: {}, goodPoints: [], improvements: [], missingElements: [] },
        ],
        overallAdvice: "ok",
        unnecessaryElements: [],
      }),
    );
    const { POST } = await import("@/app/api/essay-grade/route");

    const res = await POST(req("/api/essay-grade", ESSAY_BODY, "10.8.0.4"));
    const body = (await res.json()) as { gradingMode?: string };
    expect(body.gradingMode).toBe("ai");
    expect(res.headers.get("X-Grading-Mode")).toBe("ai");
  });
});

describe("UI と文言", () => {
  const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

  it("採点結果 UI は gradingMode:'simplified' のとき告知を描画する", () => {
    for (const rel of [
      "components/afternoon/AfternoonResultView.tsx",
      "components/essay/EssayResultView.tsx",
    ]) {
      const src = read(rel);
      expect(src).toContain("SimplifiedGradingNotice");
      expect(src).toMatch(/gradingMode === "simplified"/);
    }
  });

  it("告知は「簡易判定」と「内容は評価していない」ことを明示する", () => {
    const src = read("components/SimplifiedGradingNotice.tsx");
    expect(src).toContain("簡易判定");
    expect(src).toContain("評価していません");
  });

  it("利用者に見える文言へ内部の env 変数名が漏れていない", () => {
    // "GEMINI_API_KEY を設定すると…" のような内部都合の文言は利用者に無意味。
    for (const rel of [
      "app/api/scoring/route.ts",
      "app/api/essay-grade/route.ts",
      "app/api/generate-question/route.ts",
    ]) {
      const src = read(rel);
      // コメント行を除いた上で、文字列リテラル中に env 名が無いことを見る。
      const withoutComments = src
        .split("\n")
        .filter((l) => !l.trim().startsWith("//") && !l.trim().startsWith("*"))
        .join("\n");
      expect(withoutComments).not.toContain("GEMINI_API_KEY");
    }
  });
});
