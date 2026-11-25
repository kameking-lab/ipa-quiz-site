// @vitest-environment node
import { beforeEach, expect, it, vi } from "vitest";
import { POST } from "@/app/api/copilot/exam-library/route";
import { loadExamPaper } from "@/lib/exam-library-papers";
import type { AiAccessPolicy, AiFeature } from "@/lib/ai/access-policy";

const streamChat = vi.hoisted(() => vi.fn<(input: { system: string }) => AsyncGenerator<string>>(async function* () {
  yield "公表元の資料を確認してください。";
}));
vi.mock("@/lib/ai/provider", () => ({ getProvider: async () => ({ name: "mock", streamChat }) }));
vi.mock("@/lib/ai/access-server", () => ({
  resolveAiAccess: async (_request: Request, _feature: AiFeature, policy: AiAccessPolicy) =>
    policy.rolloutEnabled ? { kind: "paid", subject: "survey-paper-fixture" } : { kind: "legacy" },
}));
vi.mock("@/lib/ai/normal-use-kv", () => ({ sharedNormalUseStore: { admit: async () => ({ allowed: true }) } }));

beforeEach(() => streamChat.mockClear());

function ask(examId: string, questionId: string) {
  return POST(new Request("http://localhost/api/copilot/exam-library", {
    method: "POST",
    headers: { "content-type": "application/json", "X-Kakomon-AI-Consent": "20261103", "x-forwarded-for": "192.0.2.1" },
    body: JSON.stringify({
      examId, questionId, sourceUrl: "https://injected.invalid/wrong.pdf",
      messages: [{ role: "user", content: "この問題の出典を確認したいです" }],
    }),
  }));
}

const first2025 = "/exam-library/survey-assistant/561692b95a4f-2025-question-part1.pdf";
const second2025 = "/exam-library/survey-assistant/8203e4cdb1ff-2025-question-part2.pdf";
const paper2026 = "/exam-library/survey-assistant/3b797566e6fb-2026-question.pdf";

it.each([
  ["survey-assistant-2025", first2025, second2025, 15, 1],
  ["survey-assistant-2026", paper2026, paper2026, 16, 17],
] as const)("grounds all 28 %s questions in the matching paper and page", async (examId, first, second, page14, page15) => {
  const questions = loadExamPaper(examId)!;
  expect(questions.map(({ number }) => number)).toEqual(Array.from({ length: 28 }, (_, index) => index + 1));
  expect(questions[13].sourcePages?.[0]).toBe(page14);
  expect(questions[14].sourcePages?.[0]).toBe(page15);
  for (const question of questions) {
    const page = question.sourcePages?.[0];
    expect(page).toBeGreaterThan(0);
    const url = `${question.number <= 14 ? first : second}#page=${page}`;
    const response = await ask(examId, question.id);
    expect(response.status).toBe(200);
    expect(await response.text()).toContain("公表元の資料を確認してください。");
    const input = streamChat.mock.lastCall?.[0];
    expect(input?.system).toContain(`公表元の問題PDFの保存コピー: ${url}\n`);
    expect(input?.system).not.toContain("injected.invalid");
    if (examId === "survey-assistant-2026" && question.number === 12) {
      expect(input?.system).toContain("公式正答: 未登録・採点なし");
    }
  }
  expect(streamChat).toHaveBeenCalledTimes(28);
});

it("rejects malformed, unregistered and mismatched IDs before generating", async () => {
  const otherYearQuestion = loadExamPaper("survey-assistant-2026")![0].id;
  const cases = [
    ["../survey-assistant-2026", otherYearQuestion, "invalid_request"],
    ["x".repeat(97), otherYearQuestion, "invalid_request"],
    ["survey-assistant-2099", otherYearQuestion, "unknown_question"],
    ["survey-assistant-2025", otherYearQuestion, "unknown_question"],
    ["survey-assistant-2026", "", "invalid_request"],
  ];
  for (const [examId, questionId, error] of cases) {
    const response = await ask(examId, questionId);
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ error });
  }
  expect(streamChat).not.toHaveBeenCalled();
});
