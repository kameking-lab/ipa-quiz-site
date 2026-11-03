import { describe, expect, it } from "vitest";

import { KANRI_QUESTIONS } from "@/data/questions/kanri";
import { isAcceptedAnswer, requiredSelectionCount } from "@/lib/questions/answers";

const labels = ["ア", "イ", "ウ", "エ"] as const;
/** 令和6年度・協会公式PDF最終頁の問1〜50の正解肢。問1は1又は4。 */
const officialAnswers2024 = "1,4|3|4|4|1|2|2|4|1|4|4|3|1|2|2|1|4|4|2|4|4|4|1|3|3|2|2|3|2|1|3|4|2|4|3|3|3|1|3|2|3|1|4|1|3|4|2|3|2|3".split("|");

describe("管理業務主任者の2年度の公開準備", () => {
  it("2024年度と2025年度の各50問を別回として収録する", () => {
    expect(KANRI_QUESTIONS).toHaveLength(100);
    for (const year of [2024, 2025]) {
      const paper = KANRI_QUESTIONS.filter((question) => question.year === year);
      expect(paper, `${year}`).toHaveLength(50);
      expect(paper.map((question) => question.qNumber), `${year}`)
        .toEqual(Array.from({ length: 50 }, (_, index) => index + 1));
      expect(paper.every((question) => question.season === "annual" && question.session === "gakka"), `${year}`).toBe(true);
      expect(paper.every((question) => question.needsReview === false && question.explanationCoverage === "full"), `${year}`).toBe(true);
      expect(paper.every((question) => labels.every((key) => (question.choiceExplanations?.[key]?.trim().length ?? 0) > 20)), `${year}`).toBe(true);
    }
  });

  it("2024年度の公式正解・全肢解説・出典・法令基準日が一致する", () => {
    const paper = KANRI_QUESTIONS.filter((question) => question.year === 2024);
    expect(officialAnswers2024).toHaveLength(50);
    for (const question of paper) {
      const official = officialAnswers2024[question.qNumber - 1];
      expect(question.officialAnswerNumber, question.id).toBe(official);
      const accepted = official?.split(",").map((number) => labels[Number(number) - 1]);
      expect(question.answer, question.id).toEqual(accepted?.length === 1 ? accepted[0] : accepted);
      expect(Object.keys(question.choices ?? {}), question.id).toEqual([...labels]);
      expect(Object.keys(question.choiceExplanations ?? {}), question.id).toEqual([...labels]);
      expect(question.sourcePdfUrl, question.id).toBe("https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/r06.pdf");
      expect(question.sourceAnswerUrl, question.id).toBe(question.sourcePdfUrl);
      expect(question.sourceAttribution, question.id).toContain(`試験問題 問${question.qNumber}`);
      expect(question.lawReferenceDate, question.id).toBe("2024-04-01");
    }
  });

  it("2024年度の問1は1又は4をそれぞれ正解とし、同時選択を要求しない", () => {
    const question = KANRI_QUESTIONS.find((item) => item.year === 2024 && item.qNumber === 1);
    expect(question?.answer).toEqual(["ア", "エ"]);
    expect(question && requiredSelectionCount(question)).toBe(1);
    expect(question && isAcceptedAnswer(question.answer, "ア")).toBe(true);
    expect(question && isAcceptedAnswer(question.answer, "エ")).toBe(true);
    expect(question && isAcceptedAnswer(question.answer, "イ")).toBe(false);
  });
});
