import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SHINRYO_HOSHASENGISHI_QUESTIONS as questions } from "@/data/questions/shinryo-hoshasengishi";
import prior77a from "@/data/questions/shinryo-hoshasengishi/2025-annual-pm-batch1.json";
import prior77b from "@/data/questions/shinryo-hoshasengishi/2025-annual-pm-batch2.json";
import prior78 from "@/data/questions/shinryo-hoshasengishi/2026-annual-pm-batch1.json";
import receipt from "@/docs/evidence/radiology-latest-two-20261011/INTEGRATION.json";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";

describe("latest two radiology exams", () => {
  it("preserves all inherited questions and covers every available scorable original", async () => {
    expect(questions).toHaveLength(398);
    const loaded = await getQuestionsForExam("shinryo-hoshasengishi");
    expect(loaded).toEqual(questions);
    expect(new Set(questions.map(q => q.id)).size).toBe(398);
    for (const q of [...prior77a, ...prior77b, ...prior78]) {
      expect(questions.find(r => r.id === q.id)).toEqual(q);
    }
    for (const year of [2025, 2026]) {
      for (const session of ["am", "pm"] as const) {
        const actual = questions.filter(q => q.year === year && q.session === session).map(q => q.qNumber).sort((a, b) => a-b);
        const expected = Array.from({ length: 100 }, (_, i) => i+1).filter(n => !(year === 2026 && session === "am" && [15, 23].includes(n)));
        expect(actual, `${year}-${session}`).toEqual(expected);
      }
    }
    expect(receipt.newOriginals).toBe(372);
    expect(receipt.priorPrOriginals).toBe(26);
    expect(receipt.choiceExplanationFields).toBe(1990);
    expect(receipt.publicationGo).toBe(0);
    expect(receipt.currentPublishedOriginals).toBe(0);
    expect(EXAM_CONFIGS["shinryo-hoshasengishi"].sessions.map(s => [s.session, s.expectedQuestions])).toEqual([["am", 100], ["pm", 100]]);
  });

  it("scores alternative single answers independently from two-choice questions", () => {
    for (const [year, number, accepted] of [[2025, 40, ["エ", "オ"]], [2026, 55, ["イ", "エ", "オ"]]] as const) {
      const q = questions.find(q => q.year === year && q.session === "am" && q.qNumber === number)!;
      expect(q.answer).toEqual(accepted);
      expect(requiredSelectionCount(q)).toBe(1);
      for (const key of accepted) expect(isCompleteSelectionCorrect(q.answer, [key], q.requiredSelections)).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, [accepted[0], accepted[1]], q.requiredSelections)).toBe(false);
      expect(isCompleteSelectionCorrect(q.answer, ["ア"], q.requiredSelections)).toBe(false);
    }
    const q = questions.find(q => q.year === 2026 && q.session === "pm" && q.qNumber === 16)!;
    expect(q.answer).toEqual(["ウ", "エ"]);
    expect(q.requiredSelections).toBe(2);
    expect(isCompleteSelectionCorrect(q.answer, ["ウ"], 2)).toBe(false);
    expect(isCompleteSelectionCorrect(q.answer, ["ウ", "エ"], 2)).toBe(true);
  });

  it("retains full explanations, actual original images, correct dates and source editions", () => {
    for (const q of questions) {
      expect(Object.keys(q.choices ?? {}), q.id).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      for (const reason of Object.values(q.choiceExplanations ?? {})) expect(reason.trim().length, q.id).toBeGreaterThan(10);
      expect(q.explanationCoverage, q.id).toBe("full");
      expect(q.needsReview, q.id).toBe(false);
      expect(q.examDate, q.id).toBe(q.year === 2025 ? "2025-02-20" : "2026-02-19");
      expect(questionSourceEdition(q), q.id).toBe(`第${q.year === 2025 ? 77 : 78}回（${q.year}年実施）`);
      const urls = [...(q.imageUrls ?? []), ...Object.values(q.choiceImageUrls ?? {})];
      expect(Boolean(urls.length), q.id).toBe(q.hasImage);
      for (const url of urls) {
        const file = join(process.cwd(), "public", url);
        expect(existsSync(file), `${q.id}:${url}`).toBe(true);
        expect(readFileSync(file).subarray(0, 8).toString("hex"), file).toBe("89504e470d0a1a0a");
      }
    }
  });
});
