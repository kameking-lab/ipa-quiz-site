import { beforeAll, describe, expect, it, vi } from "vitest";
import type { ExamQuestion } from "@/lib/exam-library-model";

const { loadPaper, findEntry, prompt } = vi.hoisted(() => ({
  loadPaper: vi.fn(),
  findEntry: vi.fn(),
  prompt: { value: "" },
}));
vi.mock("@/lib/exam-library-papers", () => ({ loadExamPaper: loadPaper }));
vi.mock("@/lib/exam-library-catalog", () => ({ findExamEntry: findEntry }));
vi.mock("@/lib/ai/provider", () => ({
  getProvider: async () => ({
    name: "mock",
    async *streamChat(input: { system: string }) {
      prompt.value = input.system;
      yield "公表元の資料を確認してください。";
    },
  }),
}));

import { POST } from "@/app/api/copilot/exam-library/route";

const examId = "lckohyo-TEST01";
const question: ExamQuestion = {
  id: `${examId}-q1`, number: 1, text: "保護具について正しい選択肢を選ぶ。", images: [],
  correctChoice: 2, choiceCount: 5, answerAuthority: "official", sourcePages: [3],
  explanation: "選択肢2が公式正答です。",
};

beforeAll(() => {
  delete process.env.GEMINI_API_KEY;
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  findEntry.mockReturnValue({ label: "衛生管理者", subject: "労働衛生", pdfUrl: "https://www.exam.or.jp/test.pdf" });
  loadPaper.mockReturnValue([question]);
});

function request(questionId = question.id): Request {
  return new Request("http://localhost/api/copilot/exam-library", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "10.7.1.1" },
    body: JSON.stringify({ examId, questionId, selectedChoice: 1, messages: [{ role: "user", content: "なぜ誤りですか？" }] }),
  });
}

describe("POST /api/copilot/exam-library", () => {
  it("rejects IDs that do not belong to a trusted published paper", async () => {
    const response = await POST(request(`${examId}-missing`));
    expect(response.status).toBe(400);
    expect((await response.json()).error).toBe("unknown_question");
  });

  it("grounds the answer in the server-side official answer and PDF, using the shared AI model", async () => {
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(response.headers.get("X-Provider")).toBe("mock");
    expect(await response.text()).toContain("公表元の資料");
    expect(prompt.value).toContain("公式正答: （2）");
    expect(prompt.value).toContain("https://www.exam.or.jp/test.pdf#page=3");
    expect(prompt.value).toContain("学習者の選択: （1）");
  });

  it("does not invent a correct choice when no official answer is registered", async () => {
    loadPaper.mockReturnValueOnce([{ ...question, correctChoice: null, answerAuthority: "unconfirmed" }]);
    const response = await POST(request());
    expect(response.status).toBe(200);
    await response.text();
    expect(prompt.value).toContain("公式正答: 未登録・採点なし");
    expect(prompt.value).not.toContain("公式正答: （2）");
    expect(prompt.value).not.toContain("選択肢2が公式正答です");
  });
});
