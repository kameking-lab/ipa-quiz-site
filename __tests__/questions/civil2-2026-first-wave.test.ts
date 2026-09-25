import { describe, expect, it } from "vitest";
import { CIVIL2_QUESTIONS } from "@/data/questions/civil2";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import { formatYearSeason } from "@/lib/utils";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

const officialAnswers: Record<number, string> = {
  6: "ウ", 7: "イ", 8: "ウ", 9: "ア", 10: "ウ", 11: "イ",
  12: "ア", 13: "イ", 14: "ウ", 15: "イ", 16: "ア",
};

describe("令和8年度 2級土木施工管理・前期第一次検定の初回収録", () => {
  it("公式正答のNo.6〜16だけを前期・学科として公開する", () => {
    expect(isExamPublished("civil2")).toBe(true);
    expect(CIVIL2_QUESTIONS).toHaveLength(11);
    expect(defaultPracticeSession("civil2")).toBe("gakka");
    expect(formatYearSeason(2026, "early")).toContain("前期");
    expect(CIVIL2_QUESTIONS.map((q) => q.qNumber)).toEqual(Object.keys(officialAnswers).map(Number));
    for (const q of CIVIL2_QUESTIONS) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(CIVIL2_QUESTIONS, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
      expect(q.answer, q.id).toBe(officialAnswers[q.qNumber]);
      expect(q.session, q.id).toBe("gakka");
      expect(q.season, q.id).toBe("early");
      expect(q.sourcePdfUrl, q.id).toContain("20260608d_mondai.pdf");
      expect(q.sourceAnswerUrl, q.id).toContain("20260608d_seitou.pdf");
      expect(q.hasImage, q.id).toBe(false);
      expect(Object.keys(q.choices ?? {}), q.id).toEqual(["ア", "イ", "ウ", "エ"]);
      for (const key of ["ア", "イ", "ウ", "エ"] as const) {
        expect(q.choiceExplanations?.[key]?.trim().length, `${q.id}/${key}`).toBeGreaterThan(15);
      }
    }
  });
});
