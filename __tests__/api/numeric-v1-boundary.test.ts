import { beforeEach, describe, expect, it, vi } from "vitest";
const { findQuestionById, getQuestionsForExam } = vi.hoisted(() => ({ findQuestionById: vi.fn(), getQuestionsForExam: vi.fn() }));
vi.mock("@/lib/questions/pool-server", () => ({ findQuestionById }));
vi.mock("@/lib/questions/get-questions", () => ({ getQuestionsForExam }));
vi.mock("@/lib/api/rate-limit", () => ({ checkApiRateLimit: vi.fn().mockResolvedValue({ ok: true }), buildRateLimitHeaders: () => ({}) }));
import { POST } from "@/app/api/v1/grade/route";
import { GET } from "@/app/api/v1/questions/route";
import { buildOpenApiSpec } from "@/lib/api/openapi";
import { nurseNumericQuestion as question } from "@/__tests__/fixtures/nurse-numeric-question";

const grade = (answer: string | string[]) => POST(new Request("http://localhost/api/v1/grade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ questionId: question.id, answer }) }));
beforeEach(() => { findQuestionById.mockReset(); getQuestionsForExam.mockReset(); });
describe("Public API v1 numeric boundary", () => {
  it.each(["42", "42foo", ["4", "2"]])("explicitly rejects numeric grading for %j without choices or a scoring 500", async (answer) => {
    findQuestionById.mockResolvedValue(question);
    const response = await grade(answer);
    expect(response.status).toBe(400);
    const result = await response.json();
    expect(result).toMatchObject({ error: "unsupported", questionType: "numeric", supportedQuestionTypes: ["multiple-choice"], numericAnswer: { format: "integer", unit: "滴/分" } });
    expect(result).not.toHaveProperty("choices");
    expect(result).not.toHaveProperty("correctAnswer");
    expect(result).not.toHaveProperty("explanation");
  });
  it("keeps the existing nurse-listing exclusion without even loading its pool", async () => {
    const response = await GET(new Request("http://localhost/api/v1/questions?exam=kangoshi"));
    expect(response.status).toBe(400);
    expect((await response.json()).error).toBe("invalid_request");
    expect(getQuestionsForExam).not.toHaveBeenCalled();
  });
  it("serializes numeric metadata without inventing choices when a permitted exam pool contains numeric format", async () => {
    getQuestionsForExam.mockResolvedValue([{ ...question, exam: "ap", id: "fixture-numeric-in-permitted-pool" }]);
    const response = await GET(new Request("http://localhost/api/v1/questions?exam=ap"));
    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.questions[0]).toMatchObject({ type: "numeric", numericAnswer: question.numericAnswer });
    expect(result.questions[0]).not.toHaveProperty("choices");
  });
  it("continues grading both independently accepted choices", async () => {
    findQuestionById.mockResolvedValue({ ...question, type: "multiple-choice", numericAnswer: undefined, choices: { ア: "A", イ: "B", ウ: "C", エ: "D" }, answer: ["ア", "ウ"] });
    expect((await (await grade("ウ")).json()).correct).toBe(true);
    expect((await (await grade("イ")).json()).correct).toBe(false);
  });
  it("continues requiring all specified choices for a multi-selection original", async () => {
    findQuestionById.mockResolvedValue({ ...question, type: "multiple-choice", numericAnswer: undefined, choices: { ア: "A", イ: "B", ウ: "C", エ: "D" }, answer: ["ア", "ウ"], requiredSelections: 2 });
    expect((await (await grade("ウ")).json()).correct).toBe(false);
    expect((await (await grade(["ウ", "ア"])).json()).correct).toBe(true);
  });
  it("documents the numeric listing format and the explicit unsupported grade boundary", () => {
    const spec = buildOpenApiSpec("http://localhost");
    expect(spec.components.schemas.Question.properties.type.enum).toContain("numeric");
    expect(spec.components.schemas.NumericAnswer.properties.format.enum).toEqual(["integer"]);
    expect(spec.paths["/grade"].post.description).toContain("400");
    expect(spec.paths["/grade"].post.description).toContain("unsupported");
  });
});
