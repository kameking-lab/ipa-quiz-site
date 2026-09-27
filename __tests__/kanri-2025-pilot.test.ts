import { describe, expect, it } from "vitest";

import { KANRI_QUESTIONS } from "@/data/questions/kanri";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { defaultPracticeSession } from "@/lib/questions/practice-session";

const officialAnswers = new Map([[1, "4"], [2, "2"], [3, "3"], [6, "4"], [8, "3"]]);
const labels = ["ア", "イ", "ウ", "エ"] as const;

describe("2025 管理業務主任者 pilot", () => {
  it("publishes only the five independently checked questions from the official 50", () => {
    expect(isExamPublished("kanri")).toBe(true);
    expect(getQualificationByExamCode("kanri")?.officialReuseTermsUrl)
      .toBe("https://www.kanrikyo.or.jp/kanri/pdf/kakomonshiyou.pdf");
    expect(EXAM_CONFIGS.kanri.sessions[0]?.expectedQuestions).toBe(50);
    expect(defaultPracticeSession("kanri")).toBe("gakka");
    expect(KANRI_QUESTIONS.map((q) => q.qNumber)).toEqual([1, 2, 3, 6, 8]);
  });

  it("keeps official answers, four numbered choices, full explanations, and sources aligned", () => {
    for (const q of KANRI_QUESTIONS) {
      const official = officialAnswers.get(q.qNumber);
      expect(official, q.id).toBeDefined();
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(labels[Number(official) - 1]);
      expect(Object.keys(q.choices ?? {}), q.id).toEqual([...labels]);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual([...labels]);
      expect(Object.values(q.choiceExplanations ?? {}).every((text) => text.length > 20), q.id).toBe(true);
      expect(q.explanationCoverage, q.id).toBe("full");
      expect(q.needsReview, q.id).toBe(false);
      expect(q.sourcePdfUrl).toBe("https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r07.pdf");
      expect(q.sourceAnswerUrl).toBe(q.sourcePdfUrl);
      expect(q.sourceAttribution).toContain(`試験問題 問${q.qNumber}`);
      expect(q.lawReferenceDate).toBe("2025-04-01");
      expect(q.question).not.toMatch(/(?:正解|解答)\s*[1-4１-４]/);
    }
    expect(choiceDisplayLabel("kanri", "ウ")).toBe("3");
  });
});
