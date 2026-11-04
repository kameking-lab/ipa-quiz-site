import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SEKOU_1KENCHIKU_QUESTIONS as questions } from "@/data/questions/sekou-1kenchiku";
import answerKeys from "@/reports/sekou-1kenchiku-latest2/official-answer-key.json";
import figures from "@/reports/sekou-1kenchiku-latest2/figures.json";
import { ALL_QUESTIONS } from "@/data/questions";
import { ALL_QUIZ_EXAM_CODES, ALL_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isAcceptedAnswer, isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { questionPagePath } from "@/lib/seo/question-url";
const keys = ["ア", "イ", "ウ", "エ", "オ"];

describe("1級建築施工管理 第一次検定 令和7・8年度ステージング", () => {
  it("preserves 72 originals per year and 44 morning / 28 afternoon questions", () => {
    expect(questions).toHaveLength(144);
    expect(new Set(questions.map(q => q.id)).size).toBe(144);
    for (const year of [2025, 2026]) {
      const paper = questions.filter(q => q.year === year);
      expect(paper.map(q => q.qNumber)).toEqual(Array.from({ length: 72 }, (_, i) => i + 1));
      expect(paper.filter(q => q.session === "am")).toHaveLength(44);
      expect(paper.filter(q => q.session === "pm")).toHaveLength(28);
    }
    expect(EXAM_CONFIGS["sekou-1kenchiku"].sessions.map(s => s.expectedQuestions)).toEqual([44, 28]);
  });
  it("matches every answer against the visually transcribed official final key", () => {
    for (const q of questions) {
      const official = answerKeys.find(k => k.year === q.year)!.answers[q.qNumber - 1]!;
      const mapped = official.map(n => keys[n - 1]);
      expect(Array.isArray(q.answer) ? q.answer : [q.answer], q.id).toEqual(mapped);
      expect(q.sourceAnswerUrl).toBe(answerKeys.find(k => k.year === q.year)!.pdfUrl + "#page=" + (q.year === 2025 ? 39 : 38));
    }
  });
  it("accepts either corrected answer at 2025 No.57 with a single selection", () => {
    const q = questions.find(q => q.year === 2025 && q.qNumber === 57)!;
    expect(q.answer).toEqual(["ウ", "エ"]);
    for (const choice of keys) {
      expect(isAcceptedAnswer(q.answer, choice)).toBe(["ウ", "エ"].includes(choice));
      expect(isCompleteSelectionCorrect(q.answer, [choice], q.requiredSelections)).toBe(["ウ", "エ"].includes(choice));
    }
    expect(isCompleteSelectionCorrect(q.answer, ["ウ", "エ"], q.requiredSelections)).toBe(false);
  });
  it("keeps the actual four/five choices, all reasons and each question's source", () => {
    for (const q of questions) {
      const count = q.qNumber >= 51 && q.qNumber <= 60 ? 5 : 4;
      expect(Object.keys(q.choices!)).toEqual(keys.slice(0, count));
      expect(Object.keys(q.choiceExplanations!)).toEqual(keys.slice(0, count));
      expect(Object.values(q.choiceExplanations!).every(s => s!.length >= 20), q.id).toBe(true);
      expect(q.sourcePdfUrl).toBe(`https://www.fcip-shiken.jp/pdf/r0${q.year - 2018}_1kg_mondai.pdf`);
      expect(q.question.length, q.id).toBeGreaterThan(20);
      expect(q.explanationCoverage).toBe("full");
      expect(q.explanation).toContain("出題時点の法令");
    }
  });
  it("includes exactly the required official diagrams with pinned hashes", () => {
    expect(questions.filter(q => q.hasImage).map(q => `${q.year}-${q.qNumber}`)).toEqual([
      "2025-2", "2025-5", "2025-7", "2025-11", "2025-12", "2026-5", "2026-11", "2026-12", "2026-51",
    ]);
    for (const figure of figures) {
      const bytes = readFileSync(resolve("public", figure.path.slice(1)));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(figure.sha256);
      expect(questions.find(q => q.year === figure.year && q.qNumber === figure.number)!.imageUrls).toContain(figure.path);
    }
  });
  it("retains canonical route metadata while publishing the reviewed questions in public registries", async () => {
    expect(isExamPublished("sekou-1kenchiku")).toBe(true);
    expect(ALL_QUIZ_EXAM_CODES).toContain("sekou-1kenchiku");
    expect(ALL_EXAM_CODES).not.toContain("sekou-1kenchiku");
    expect(getRegisteredExamCodes()).toContain("sekou-1kenchiku");
    expect(ALL_QUESTIONS.some(q => q.exam === "sekou-1kenchiku")).toBe(true);
    expect(await getQuestionsForExam("sekou-1kenchiku")).toEqual(questions);
    expect(questionPagePath(questions[0]!)).toBe("/q/sekou-1kenchiku/2025-july/am/q1");
  });
});
