import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getSitemapQuestions } from "@/lib/seo/sitemap-pagination";

const answers: Record<number, Record<number, string>> = {
  2025: { 1: "A", 2: "B", 3: "E" },
  2026: { 1: "D", 2: "C", 3: "E" },
};

describe("社労士一般常識の指定統計6問", () => {
  it("各年度の公式問1～3だけを科目別ルートに載せる", () => {
    const pool = SHAROUSHI_QUESTIONS.filter((q) => q.session === "ippan");
    expect(pool).toHaveLength(6);
    expect(SHAROUSHI_QUESTIONS).toHaveLength(62);
    for (const q of pool) {
      expect(answers[q.year]?.[q.qNumber]).toBe(q.officialAnswerNumber);
      expect(Object.keys(q.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      expect(isPracticeReadyQuestion(q)).toBe(true);
      expect(q.officialReferenceUrls?.some((url) => url.startsWith("https://www.mhlw.go.jp/"))).toBe(true);
      expect(questionPagePath(q)).toBe(`/q/sharoushi/${q.year}-annual/ippan/q${q.qNumber}`);
      expect(findQuestionByRoute(ALL_QUESTIONS, {
        exam: "sharoushi", yearSeason: `${q.year}-annual`, section: "ippan", qnum: `q${q.qNumber}`,
      })?.id).toBe(q.id);
      expect(getSitemapQuestions().some((item) => item.id === q.id)).toBe(true);
    }
    expect(pool.some((q) => q.year === 2026 && q.qNumber === 9)).toBe(false);
  });

  it("派遣統計の原表値と女性管理職の同率表示を保持する", () => {
    const dispatch = SHAROUSHI_QUESTIONS.find((q) => q.year === 2025 && q.session === "ippan" && q.qNumber === 3)!;
    expect(dispatch.choiceExplanations?.["ウ"]).toContain("7.4%");
    expect(dispatch.choiceExplanations?.["ウ"]).toContain("3.1%");
    const equality = SHAROUSHI_QUESTIONS.find((q) => q.year === 2026 && q.session === "ippan" && q.qNumber === 2)!;
    expect(equality.choiceExplanations?.["エ"]).toContain("21.0%で同率");
  });
});
