import { describe, expect, it } from "vitest";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { listAvailableExamIds, loadExamPaper } from "@/lib/exam-library-papers";
import { isScorableQuestion } from "@/lib/exam-library-model";
import explanations from "@/data/exam-library/explanations.json";

describe("official exam library integration", () => {
  it("loads every catalog paper from the site's data root without inventing answer keys", () => {
    const ids = listAvailableExamIds();
    expect(ids.length).toBe(EXAM_CATALOG.length);
    const questions = ids.flatMap((id) => loadExamPaper(id) ?? []);
    expect(questions.length).toBe(EXAM_CATALOG.reduce((sum, entry) => sum + (entry.questionCount ?? 0), 0));
    expect(questions.filter(isScorableQuestion).length).toBe(EXAM_CATALOG.reduce((sum, entry) => sum + (entry.scoredCount ?? 0), 0));
    expect(questions.filter((question) => question.answerAuthority !== "official").every((question) => question.correctChoice === null)).toBe(true);
    expect(loadExamPaper("../../package")).toBeNull();
  });

  it("attaches authored learning explanations and preserves original question numbering", () => {
    const questions = listAvailableExamIds().flatMap((id) => loadExamPaper(id) ?? []);
    for (const [id, explanation] of Object.entries(explanations)) {
      expect(questions.find((question) => question.id === id)?.explanation).toBe(explanation.trim());
    }
    const renumbered = questions.find((question) => question.number === 7 && question.sourceQuestionNumber === 1);
    expect(renumbered).toBeDefined();
  });
});
