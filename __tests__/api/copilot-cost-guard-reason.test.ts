import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  cap: vi.fn(),
  question: vi.fn(),
  entry: vi.fn(),
  paper: vi.fn(),
}));

vi.mock("@/lib/ai/cost-guard", () => ({ checkMonthlyCostCap: mocks.cap, estimateTokens: vi.fn(), recordAiCost: vi.fn() }));
vi.mock("@/lib/rate-limit", () => ({ checkIpRateLimit: async () => ({ ok: true }) }));
vi.mock("@/lib/questions/load", () => ({ getQuestionById: mocks.question }));
vi.mock("@/lib/copilot/rag-pipeline", () => ({ runCopilotRAGPipeline: async () => ({ ragDirective: "", ragContextBlock: "" }) }));
vi.mock("@/lib/copilot/prompt-assembly", () => ({ assembleCopilotPrompt: () => ({ system: "", userMessages: [] }) }));
vi.mock("@/lib/copilot/gemini-flash38", () => ({ createCopilotGeminiProvider: () => ({ name: "gemini" }) }));
vi.mock("@/lib/exam-library-catalog", () => ({ findExamEntry: mocks.entry }));
vi.mock("@/lib/exam-library-papers", () => ({ loadExamPaper: mocks.paper }));

import { POST as questionCopilot } from "@/app/api/copilot/route";
import { POST as libraryCopilot } from "@/app/api/copilot/exam-library/route";

const originalKey = process.env.GEMINI_API_KEY;

beforeAll(() => { process.env.GEMINI_API_KEY = "test-only"; });
afterAll(() => {
  if (originalKey === undefined) delete process.env.GEMINI_API_KEY;
  else process.env.GEMINI_API_KEY = originalKey;
});
beforeEach(() => {
  mocks.question.mockReturnValue({ id: "ap-2024a-am-q1", choices: { ア: "A", イ: "B" }, answer: "ア" });
  mocks.entry.mockReturnValue({ label: "試験", subject: "科目", pdfUrl: "https://example.com/paper.pdf" });
  mocks.paper.mockReturnValue([{ id: "lckohyo-TEST01-q1", number: 1, text: "過去問", choiceCount: 2, correctChoice: 1, answerAuthority: "official", sourcePages: [1], explanation: "解説" }]);
});

const routes = [
  { name: "question", post: questionCopilot, body: { question: { id: "ap-2024a-am-q1" }, messages: [{ role: "user", content: "教えて" }] } },
  { name: "exam library", post: libraryCopilot, body: { examId: "lckohyo-TEST01", questionId: "lckohyo-TEST01-q1", messages: [{ role: "user", content: "教えて" }] } },
];

describe.each(routes)("$name copilot cost guard", ({ post, body }) => {
  it("reports temporary AI unavailability without claiming a monthly cap", async () => {
    mocks.cap.mockResolvedValueOnce({ allowed: false, reason: "unavailable", totalJpy: 0, capJpy: 50_000 });
    const response = await post(new Request("http://localhost/api/copilot", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }));
    expect(response.status).toBe(503);
    const result = await response.json();
    expect(result.error).toBe("cost_guard_unavailable");
    expect(result.message).toContain("AI応答を一時停止");
    expect(result.message).not.toContain("今月の利用上限");
  });

  it("continues reporting a genuine monthly cap", async () => {
    mocks.cap.mockResolvedValueOnce({ allowed: false, reason: "cap", totalJpy: 50_000, capJpy: 50_000 });
    const response = await post(new Request("http://localhost/api/copilot", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }));
    expect(response.status).toBe(503);
    expect((await response.json()).error).toBe("cost_capped");
  });
});
