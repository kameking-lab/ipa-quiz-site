import { describe, expect, it } from "vitest";

import { KANRI_QUESTIONS } from "@/data/questions/kanri";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { defaultPracticeSession } from "@/lib/questions/practice-session";

const officialAnswers = new Map([[1, "4"], [2, "2"], [3, "3"], [4, "2"], [5, "4"], [6, "4"], [7, "1"], [8, "3"], [20, "4"], [21, "2"], [22, "2"], [23, "1"], [47, "2"], [48, "1"], [49, "1"], [50, "2"]]);
const labels = ["ア", "イ", "ウ", "エ"] as const;

describe("2025 管理業務主任者 pilot", () => {
  it("publishes only the sixteen independently checked questions from the official 50", () => {
    expect(isExamPublished("kanri")).toBe(true);
    expect(getQualificationByExamCode("kanri")?.officialReuseTermsUrl)
      .toBe("https://www.kanrikyo.or.jp/kanri/pdf/kakomonshiyou.pdf");
    expect(EXAM_CONFIGS.kanri.sessions[0]?.expectedQuestions).toBe(50);
    expect(defaultPracticeSession("kanri")).toBe("gakka");
    expect(KANRI_QUESTIONS.map((q) => q.qNumber)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 20, 21, 22, 23, 47, 48, 49, 50]);
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
