import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import choiceExplanations from "@/data/exam-library/choice-explanations.json";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { parseExamChoiceExplanation } from "@/lib/exam-library-choice-explanations";
import { requiredStructuredChoiceQuestionIds } from "@/lib/exam-library-coverage";
import { listAvailableExamIds, loadExamPaper } from "@/lib/exam-library-papers";
import { isScorableQuestion } from "@/lib/exam-library-model";
import explanations from "@/data/exam-library/explanations.json";

describe("official exam library integration", () => {
  it("requires every authored plain explanation to be substantive and preserves its answer-key snapshot", () => {
    const questions = listAvailableExamIds().flatMap((id) => loadExamPaper(id) ?? []);
    const authoredIds = new Set(Object.keys(explanations));
    expect(questions.filter((question) => authoredIds.has(question.id)).map((question) => question.id).sort())
      .toEqual([...authoredIds].sort());
    for (const question of questions.filter((question) => authoredIds.has(question.id))) {
      expect(question.explanation?.trim().length, question.id).toBeGreaterThanOrEqual(120);
      expect(question.explanation, question.id).not.toMatch(/解説準備中|解説は準備中|後日追加|TODO|TBD/);
    }
    const answerSnapshot = questions
      .filter((question) => authoredIds.has(question.id))
      .map((question) => [question.id, question.correctChoice, question.answerAuthority])
      .sort((left, right) => String(left[0]).localeCompare(String(right[0])));
    // 既存の択一式に加え、労働安全・労働衛生コンサルタント5年分の記述式84問も原本照合。
    expect(createHash("sha256").update(JSON.stringify(answerSnapshot)).digest("hex"))
      .toBe("091d1189ae5dcb5bd02077a23580b8c1c94b9c6b59483b2033ce316f0e2f758c");
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

  it("preserves the complete official answer-key snapshot, including structured-only questions", () => {
    const answerSnapshot = listAvailableExamIds()
      .flatMap((id) => loadExamPaper(id) ?? [])
      .filter((question) => question.answerAuthority === "official")
      .map((question) => [question.id, question.correctChoice, question.choiceCount])
      .sort((left, right) => String(left[0]).localeCompare(String(right[0])));
    expect(answerSnapshot).toHaveLength(2154);
    expect(createHash("sha256").update(JSON.stringify(answerSnapshot)).digest("hex"))
      .toBe("19ccb2b8b929d92f89d11f9ee3e5707123e92a2ed478dc9d761ddad8b8c8736d");
  });

  it("attaches authored learning explanations and preserves original question numbering", () => {
    const questions = listAvailableExamIds().flatMap((id) => loadExamPaper(id) ?? []);
    for (const [id, explanation] of Object.entries(explanations)) {
      expect(questions.find((question) => question.id === id)?.explanation).toBe(explanation.trim());
    }
    const renumbered = questions.find((question) => question.number === 7 && question.sourceQuestionNumber === 1);
    expect(renumbered).toBeDefined();
  });

  it("loads only source-matched, five-choice, government-sourced structured overlays", () => {
    const questions = listAvailableExamIds().flatMap((id) => loadExamPaper(id) ?? []);
    const byId = new Map(questions.map((question) => [question.id, question]));
    for (const [id, raw] of Object.entries(choiceExplanations)) {
      const question = byId.get(id);
      expect(question, id).toBeDefined();
      const sourceHash = createHash("sha256").update(question!.text).digest("hex");
      expect(parseExamChoiceExplanation(raw, question!, sourceHash), id).not.toBeNull();
      expect(question!.choiceExplanation, id).toEqual(
        parseExamChoiceExplanation(raw, question!, sourceHash),
      );
    }
    for (const id of requiredStructuredChoiceQuestionIds(questions)) {
      expect(Object.hasOwn(choiceExplanations, id), `required structured explanation: ${id}`).toBe(true);
      expect(byId.get(id)?.choiceExplanation, id).toBeDefined();
    }
  });
});
