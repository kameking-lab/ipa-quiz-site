import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { questionPagePath } from "@/lib/seo/question-url";
import type { ExamCode } from "@/lib/questions/types";

// Independently read from JAVADA's published answer table, five rows per group.
const sets: { code: ExamCode; year: number; a: string; b: string }[] = [
  { code: "toso1", year: 2024, a: "○×○○×○××○×○××××○○××○○○○×○", b: "ニニニロハハハニロロイハロイハニニニイイイハロイロ" },
  { code: "toso1", year: 2023, a: "○×××○×××○×○×○○××○○×○○○×○○", b: "イイロハニイハニハロイハロイハハニニニイイロロハニ" },
];

describe.each(sets)("c4-17 $code $year early", ({ code, year, a, b }) => {
  const questions = QUESTIONS_BY_EXAM[code]!.filter(q => q.year === year && q.season === "early");
  const source = JSON.parse(readFileSync(`data/questions/${code}/${year}-early.sources.json`, "utf8"));

  it("loads all original numbers and retains the official answer table", async () => {
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    expect(questions.slice(0, 25).map(q => q.officialAnswerNumber).join("")).toBe(a);
    expect(questions.slice(25).map(q => q.officialAnswerNumber).join("")).toBe(b);
    expect(source.officialAnswers.a.join("")).toBe(a);
    expect(source.officialAnswers.b.join("")).toBe(b);
    expect((await getQuestionsForExam(code)).filter(q => q.year === year)).toEqual(questions);
    expect(EXAM_CONFIGS[code].yearRange.start).toBeLessThanOrEqual(year);
    for (const q of questions) {
      const expected = q.qNumber <= 25 ? a[q.qNumber - 1] : b[q.qNumber - 26];
      expect(formatQuestionAnswerForDisplay(q, q.answer), q.id).toBe(expected);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(usesNumberedChoices(code)).toBe(true);
      expect(questionSourceEdition(q)).toBe(`${year}年度前期`);
      expect(questionPagePath(q)).toBe(`/q/${code}/${year}-early/gakka/q${q.qNumber}`);
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      for (const [key, text] of Object.entries(q.choiceExplanations!)) {
        expect(text!.startsWith(key === q.answer ? "正解。" : "不正解。"), q.id).toBe(true);
      }
      expect(q.sourcePdfUrl).toMatch(/https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+\.pdf#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toBe(source.sourceAnswerUrl);
    }
  });

  it("keeps every question legible without missing figures or answer labels", () => {
    expect(questions.every(q => !q.hasImage)).toBe(true);
    expect(questions.every(q => q.question.trim().length > 0)).toBe(true);
    expect(questions.every(q => q.explanation.length >= 50)).toBe(true);
    expect(questions.slice(0, 25).every(q => Object.keys(q.choices!).length === 2)).toBe(true);
    expect(questions.slice(25).every(q => Object.keys(q.choices!).length === 4)).toBe(true);
  });
});
