import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import choiceExplanations from "@/data/exam-library/choice-explanations.json";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { parseExamChoiceExplanation } from "@/lib/exam-library-choice-explanations";
import { requiredStructuredChoiceQuestionIds } from "@/lib/exam-library-coverage";
import { listAvailableExamIds, loadExamPaper } from "@/lib/exam-library-papers";
import { gradeExamAnswer, isScorableQuestion } from "@/lib/exam-library-model";
import explanations from "@/data/exam-library/explanations.json";

const isReviewedOctoberImport = (id: string) => /^lckohyo-LC202621(?:0[23679]|1[01279])-q\d+$/.test(id);

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
      .filter((question) => authoredIds.has(question.id) && !isReviewedOctoberImport(question.id))
      .map((question) => [question.id, question.correctChoice, question.answerAuthority])
      .sort((left, right) => String(left[0]).localeCompare(String(right[0])));
    // コンサルタントの記述式84問、特級ボイラーの記述・複数選択16問、全員正解扱いの1問も含める。
    expect(createHash("sha256").update(JSON.stringify(answerSnapshot)).digest("hex"))
      .toBe("76f0daaa0708b4132a76aaae60eab4758999dedb5174b0fc8e7e800b634527e0");
  });

  it("keeps the 2022 metals question 1 available without grading any of its options", () => {
    const paper = loadExamPaper("emkohyo-EM20221808")!;
    expect(paper.map((q) => q.sourceQuestionNumber)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
    const first = paper[0]!;
    expect(first).toMatchObject({
      sourcePages: [2], choiceCount: 5, correctChoice: null, officialAllCandidatesCorrect: true,
    });
    expect(first.explanation).toContain("受験者全員を正解");
    for (const option of [1, 2, 3, 4, 5]) expect(gradeExamAnswer(first, option)).toBe("unscored");
    expect(paper.slice(1).map((q) => q.correctChoice)).toEqual([1, 2, 2, 2, 2, 3, 3, 2, 1, 4, 3, 2, 5, 4, 2, 3, 1, 4, 4]);
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
    const surveySnapshot = answerSnapshot.filter(([id]) => String(id).startsWith("private-gsi-survey-assistant-20261021-"));
    const peIds = new Set(EXAM_CATALOG.filter(entry => entry.group === "pe-first").flatMap(entry => (loadExamPaper(entry.id) ?? []).map(question => question.id)));
    const peSnapshot = answerSnapshot.filter(([id]) => peIds.has(String(id)));
    expect(answerSnapshot).toHaveLength(5598);
    expect(createHash("sha256").update(JSON.stringify(answerSnapshot)).digest("hex"))
      .toBe("8ef01d1a490868ce59f8afb0d5b964d2a15bd40ebbce3a72ad29d58193dd66b6");
    expect(peSnapshot).toHaveLength(2222);
    // Bound to the existing packet's 55 officialKey values; 2026 No.12 stays unscored.
    expect(surveySnapshot).toHaveLength(55);
    expect(createHash("sha256").update(JSON.stringify(surveySnapshot)).digest("hex"))
      .toBe("3b870b77a24283772ff21d8dbbdd5f9b32451e77afd43122082649315fd672d4");
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
