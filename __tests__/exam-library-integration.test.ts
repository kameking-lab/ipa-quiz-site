import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import choiceExplanations from "@/data/exam-library/choice-explanations.json";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { parseExamChoiceExplanation } from "@/lib/exam-library-choice-explanations";
import { requiredStructuredChoiceQuestionIds } from "@/lib/exam-library-coverage";
import { listAvailableExamIds, loadExamPaper } from "@/lib/exam-library-papers";
import { isScorableQuestion } from "@/lib/exam-library-model";
import explanations from "@/data/exam-library/explanations.json";
import peContinuation from "@/reports/LQ3B-20261104/adoption-manifest.json";
import peLq3d from "@/reports/LQ3D-20261104/adoption-manifest.json";

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
    const surveySnapshot = answerSnapshot.filter(([id]) => String(id).startsWith("private-gsi-survey-assistant-20261021-"));
    const peIds = new Set(EXAM_CATALOG.filter(entry => entry.group === "pe-first").flatMap(entry => (loadExamPaper(entry.id) ?? []).map(question => question.id)));
    const peSnapshot = answerSnapshot.filter(([id]) => peIds.has(String(id)));
    const existingSnapshot = answerSnapshot.filter(([id]) => !String(id).startsWith("private-gsi-survey-assistant-20261021-") && !peIds.has(String(id)) && !isReviewedOctoberImport(String(id)));
    expect(answerSnapshot).toHaveLength(3153 + (peContinuation.length + peLq3d.length) * 35);
    expect(peSnapshot).toHaveLength(594 + (peContinuation.length + peLq3d.length) * 35);
    // Preserve the previous 2,154 official keys independently of the new reviewed packet.
    expect(existingSnapshot).toHaveLength(2154);
    expect(createHash("sha256").update(JSON.stringify(existingSnapshot)).digest("hex"))
      .toBe("19ccb2b8b929d92f89d11f9ee3e5707123e92a2ed478dc9d761ddad8b8c8736d");
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
