import { describe, expect, it } from "vitest";

import { EISEI1_QUESTIONS } from "@/data/questions/eisei1";
import source2025 from "@/data/exam-library/papers/lckohyo-LC20252114.json";
import presentation2025 from "@/data/exam-library/presentation/lckohyo-LC20252114.json";
import { questionTitle } from "@/lib/seo/question-meta";
import { groupByYearSeason } from "@/lib/seo/exam-meta";

const KEYS = ["ア", "イ", "ウ", "エ", "オ"] as const;
const sourcePdfUrl = "https://www.exam.or.jp/wp-content/uploads/2025/10/LC20252114.pdf";

describe("first-class health supervisor published papers", () => {
  it("labels question metadata and year listings with each official publication month", () => {
    const first2025 = EISEI1_QUESTIONS.find((q) => q.year === 2025 && q.qNumber === 1);
    const first2026 = EISEI1_QUESTIONS.find((q) => q.year === 2026 && q.qNumber === 1);
    expect(first2025 && questionTitle(first2025)).toContain("2025年10月公表問題");
    expect(first2026 && questionTitle(first2026)).toContain("2026年4月公表問題");
    expect(groupByYearSeason(EISEI1_QUESTIONS).map((g) => g.label)).toEqual([
      "2026年4月公表問題",
      "2025年10月公表問題",
    ]);
  });
  it("offers all 44 questions from both the 2025 October and 2026 April publications", () => {
    for (const year of [2025, 2026]) {
      const paper = EISEI1_QUESTIONS.filter((q) => q.year === year && q.season === "published");
      expect(paper).toHaveLength(44);
      expect(paper.map((q) => q.qNumber).sort((a, b) => a - b)).toEqual(
        Array.from({ length: 44 }, (_, i) => i + 1),
      );
      for (const question of paper) {
        expect(Object.keys(question.choices ?? {})).toEqual(KEYS);
        expect(Object.keys(question.choiceExplanations ?? {})).toEqual(KEYS);
        expect(question.explanationCoverage).toBe("full");
      }
    }
    expect(new Set(EISEI1_QUESTIONS.map((q) => q.id)).size).toBe(EISEI1_QUESTIONS.length);
  });

  it("matches the officially marked 2025 answers and explains every choice", () => {
    const questions = EISEI1_QUESTIONS.filter((q) => q.year === 2025);
    expect(source2025).toHaveLength(44);

    for (const source of source2025) {
      const question = questions.find((q) => q.qNumber === source.number);
      const extracted = presentation2025[source.id as keyof typeof presentation2025];
      expect(question, source.id).toBeDefined();
      expect(extracted, source.id).toBeDefined();
      if (source.number !== 1 && source.number !== 37) {
        expect(question?.question).toBe(extracted.prompt);
      }
      expect(question?.answer).toBe(KEYS[source.correctChoice - 1]);
      expect(question?.officialAnswerNumber).toBe(String(source.correctChoice));
      expect(question?.sourcePdfUrl).toBe(sourcePdfUrl);
      expect(question?.sourceAnswerUrl).toBe(sourcePdfUrl);
      expect(question?.explanationCoverage).toBe("full");
      expect(question?.needsReview).toBe(false);
      expect(Object.keys(question?.choices ?? {})).toEqual(KEYS);
      expect(Object.keys(question?.choiceExplanations ?? {})).toEqual(KEYS);
      for (const key of KEYS) {
        const displayedChoice = question?.choices?.[key]?.replaceAll(" ／ ", "");
        expect(displayedChoice).toBe(extracted.choices[KEYS.indexOf(key)]?.text);
        expect(question?.choiceExplanations?.[key]?.length).toBeGreaterThan(20);
        expect(question?.choiceExplanations?.[key]).not.toMatch(/根拠を特定できません/);
      }
    }
  });

  it("keeps the staffing facts and hormone table readable after PDF extraction", () => {
    const staffing = EISEI1_QUESTIONS.find((q) => q.year === 2025 && q.qNumber === 1);
    const hormones = EISEI1_QUESTIONS.find((q) => q.year === 2025 && q.qNumber === 37);
    expect(staffing?.question).toContain("業務：200人\n");
    expect(staffing?.question).toContain("業務：50人\n");
    expect(staffing?.question).toContain("業務：30人");
    expect(hormones?.choices?.ウ).toContain("メラトニン ／ 副甲状腺 ／");
  });
});
