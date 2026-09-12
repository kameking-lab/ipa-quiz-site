import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { listAvailableExamIds, loadExamPaper } from "@/lib/exam-library-papers";
import { isScorableQuestion } from "@/lib/exam-library-model";
import explanations from "@/data/exam-library/explanations.json";

describe("official exam library integration", () => {
  it("requires a substantive explanation for every question and preserves all published answer keys", () => {
    const questions = listAvailableExamIds().flatMap((id) => loadExamPaper(id) ?? []);
    expect(Object.keys(explanations).sort()).toEqual(questions.map((question) => question.id).sort());
    for (const question of questions) {
      expect(question.explanation?.trim().length, question.id).toBeGreaterThanOrEqual(120);
      expect(question.explanation, question.id).not.toMatch(/解説準備中|解説は準備中|後日追加|TODO|TBD/);
    }
    const answerSnapshot = questions
      .map((question) => [question.id, question.correctChoice, question.answerAuthority])
      .sort((left, right) => String(left[0]).localeCompare(String(right[0])));
    // 特級16問に加え、図形の○印で公表された作業環境測定士360問を原本照合。
    expect(createHash("sha256").update(JSON.stringify(answerSnapshot)).digest("hex"))
      .toBe("33748a42d157cc0bbdae85f102679453bdf18158536914b68195fa93ab1a260c");
  });

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
