import { beforeEach, describe, expect, it, vi } from "vitest";
const { findQuestionById, getQuestionsForExam } = vi.hoisted(() => ({ findQuestionById: vi.fn(), getQuestionsForExam: vi.fn() }));
vi.mock("@/lib/questions/pool-server", () => ({ findQuestionById }));
vi.mock("@/lib/questions/get-questions", () => ({ getQuestionsForExam }));
vi.mock("@/lib/api/rate-limit", () => ({ checkApiRateLimit: vi.fn().mockResolvedValue({ ok: true }), buildRateLimitHeaders: () => ({}) }));
import { POST } from "@/app/api/v1/grade/route";
import { GET } from "@/app/api/v1/questions/route";
import { buildOpenApiSpec } from "@/lib/api/openapi";
import { nurseNumericQuestion as question } from "@/__tests__/fixtures/nurse-numeric-question";

import { nurseDecimalQuestion as decimalQuestion } from "@/__tests__/fixtures/nurse-decimal-question";

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
  it.each(["23.4","23.4375",["2","3","4"]])("keeps decimal API grading explicitly unsupported for %j", async answer => {
    findQuestionById.mockResolvedValue(decimalQuestion);
    const response=await POST(new Request("http://localhost/api/v1/grade",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({questionId:decimalQuestion.id,answer})}));
    expect(response.status).toBe(400);
    const body=await response.json();
    expect(body).toMatchObject({error:"unsupported",questionType:"numeric",numericAnswer:{format:"decimal",precision:1,unit:"BMI"}});
    expect(body).not.toHaveProperty("correctAnswer");
    expect(body).not.toHaveProperty("choices");
    expect(body).not.toHaveProperty("explanation");
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
  it("問題取得と採点は公式元URLと日時固定の問題・正答を返す", async () => {
    const sourcePdfUrl = "http://www.pref.kanagawa.jp/documents/5214/r5_1_mondai.pdf";
    const sourceAnswerUrl = "http://www.pref.kanagawa.jp/documents/5214/r5_1_kaitou.pdf";
    const source = { sourcePdfUrl, sourceAnswerUrl,
      sourceArchiveUrl: `https://web.archive.org/web/20250102030405/${sourcePdfUrl}`,
      sourceAnswerArchiveUrl: `https://web.archive.org/web/20250102030406/${sourceAnswerUrl}` };
    const archived = { ...question, ...source, type: "multiple-choice", choices: { ア: "1", イ: "2" }, answer: "ア" };
    getQuestionsForExam.mockResolvedValue([archived]);
    findQuestionById.mockResolvedValue(archived);
    const list = await GET(new Request("http://localhost/api/v1/questions?exam=fp2"));
    expect((await list.json()).questions[0]).toMatchObject(source);
    expect(await (await grade("ア")).json()).toMatchObject(source);
  });
  it("continues requiring all specified choices for a multi-selection original", async () => {
    findQuestionById.mockResolvedValue({ ...question, type: "multiple-choice", numericAnswer: undefined, choices: { ア: "A", イ: "B", ウ: "C", エ: "D" }, answer: ["ア", "ウ"], requiredSelections: 2 });
    expect((await (await grade("ウ")).json()).correct).toBe(false);
    expect((await (await grade(["ウ", "ア"])).json()).correct).toBe(true);
  });
  it.each([
    [["ア", "ウ"], true], [["エ", "ア"], true], [["ウ", "エ"], true],
    [["ア"], false], [["ア", "ウ", "エ"], false],
    [["ア", "ア"], false], [["ア", "イ"], false],
  ])("grades exactly two of three accepted choices for %j", async (answer, correct) => {
    findQuestionById.mockResolvedValue({ ...question, type: "multiple-choice", numericAnswer: undefined,
      choices: { ア: "A", イ: "B", ウ: "C", エ: "D" }, answer: ["ア", "ウ", "エ"], requiredSelections: 2 });
    const response = await grade(answer as string[]);
    expect(response.status).toBe(200);
    expect((await response.json()).correct).toBe(correct);
  });
  it("documents the numeric listing format and the explicit unsupported grade boundary", () => {
    const spec = buildOpenApiSpec("http://localhost");
    expect(spec.components.schemas.Question.properties.type.enum).toContain("numeric");
    expect(spec.components.schemas.NumericAnswer.properties.format.enum).toEqual(["integer", "decimal"]);
    expect(spec.paths["/grade"].post.description).toContain("400");
    expect(spec.paths["/grade"].post.description).toContain("unsupported");
  });
});
