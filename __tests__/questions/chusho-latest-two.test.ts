import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { CHUSHO_KIGYO_SHINDANSHI_QUESTIONS as questions } from "@/data/questions/chusho-kigyo-shindanshi";
import officialKeys from "@/docs/evidence/chusho-latest-two-20261011/official-answer-keys.json";
import { EXAM_CONFIGS, ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { isAcceptedAnswer } from "@/lib/questions/answers";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

describe("SME consultant first-stage latest two official papers", () => {
  it("covers every official answer row and original without duplicating subjects or parts", () => {
    expect(questions).toHaveLength(454);
    expect(new Set(questions.map(q => q.id)).size).toBe(454);
    const sourceKey = (q: typeof questions[number]) => `${q.year}|${q.session}|${q.qNumber}|${q.part ?? ""}`;
    expect(new Set(questions.map(sourceKey)).size).toBe(454);
    expect(new Set(questions.map(q => `${q.year}|${q.session}|${q.qNumber}`)).size).toBe(417);
    expect(questions.map(q => q.id).sort()).toEqual(officialKeys.map(q => q.id).sort());
    for (const expected of officialKeys) {
      const actual = questions.find(q => q.id === expected.id)!;
      const answer = Array.isArray(actual.answer) ? actual.answer : [actual.answer];
      expect(answer, expected.id).toEqual(expected.answer);
    }
    for (const year of [2025, 2026]) expect(questions.filter(q => q.year === year)).toHaveLength(227);
  });

  it("keeps both corrected all-candidate answers as alternative accepted choices", () => {
    const corrected = officialKeys.filter(q => q.allAnswersAccepted);
    expect(corrected.map(q => `${q.year}/${q.subjectCode}/${q.qNumber}`)).toEqual(["2025/D/33", "2025/F/12"]);
    for (const key of corrected) {
      const q = questions.find(q => q.id === key.id)!;
      expect(q.answer).toEqual(Object.keys(q.choices!));
      expect(q.requiredSelections).toBeUndefined();
      expect(q.explanation).toMatch(/全.*正解|すべて.*正解/);
      expect(q.sourceAnswerUrl).toContain("v2_20250902.pdf");
      for (const choice of Object.keys(q.choices!)) expect(isAcceptedAnswer(q.answer, choice)).toBe(true);
    }
  });

  it("serves complete reasons, actual diagram files and exact official source URLs", () => {
    expect(questions.reduce((count,q) => count + Object.keys(q.choices!).length,0)).toBe(2088);
    for (const q of questions) {
      expect(q.explanationCoverage,q.id).toBe("full");
      expect(Object.keys(q.choiceExplanations ?? {}).sort(),q.id).toEqual(Object.keys(q.choices!).sort());
      expect(Object.values(q.choiceExplanations ?? {}).every(reason => reason!.trim().length > 5),q.id).toBe(true);
      expect(q.sourcePdfUrl,q.id).toMatch(/^https:\/\/www\.jf-cmca\.jp\/attach\/test\/shikenmondai\/1ji202[56]\//);
      expect(q.sourceAnswerUrl,q.id).toMatch(/^https:\/\/www\.jf-cmca\.jp\/attach\/test\/r0[78]\//);
      expect(q.sourceAttribution,q.id).toBeTruthy();
      expect(q.needsReview,q.id).not.toBe(true);
      expect(isPracticeReadyQuestion(q),q.id).toBe(true);
      if (q.hasImage) {
        expect(q.imageUrls?.length,q.id).toBeGreaterThan(0);
        expect(q.imageAltTexts?.length,q.id).toBe(q.imageUrls?.length);
        for (const url of q.imageUrls!) expect(existsSync(join(process.cwd(),"public",url)),q.id+url).toBe(true);
      }
    }
  });

  it("loads all seven subjects through the exam registry without classifying it as IPA", async () => {
    expect(EXAM_CONFIGS["chusho-kigyo-shindanshi"].sessions.map(s => s.session)).toEqual([
      "keizai","zaimu","kigyo","unei","keiei-houmu","keiei-joho","chusho-seisaku",
    ]);
    expect(ALL_EXAM_CODES as string[]).not.toContain("chusho-kigyo-shindanshi");
    expect(ALL_QUIZ_EXAM_CODES).toContain("chusho-kigyo-shindanshi");
    expect(getQualificationByExamCode("chusho-kigyo-shindanshi")?.administrator).toContain("診断士");
    expect(await getQuestionsForExam("chusho-kigyo-shindanshi")).toHaveLength(454);
  });
});
