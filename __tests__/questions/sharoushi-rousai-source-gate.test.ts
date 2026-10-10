import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getSitemapQuestions } from "@/lib/seo/sitemap-pagination";

describe("社労士 労災保険法・徴収法の公式根拠ゲート", () => {
  it("公式正答Bの2025年問7だけを独立した労災セッションで公開する", () => {
    const rousai = SHAROUSHI_QUESTIONS.filter((q) => q.session === "rousai");
    expect(rousai.map((q) => `${q.year}-${q.qNumber}`)).toEqual(["2025-7"]);
    const q = rousai[0]!;
    expect(q.officialAnswerNumber).toBe("B");
    expect(q.answer).toBe("イ");
    expect(Object.keys(q.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
    expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
    expect(q.officialReferenceUrls).toContain("https://www.mhlw.go.jp/content/001250005.pdf");
    expect(isPracticeReadyQuestion(q)).toBe(true);
    expect(questionPagePath(q)).toBe("/q/sharoushi/2025-annual/rousai/q7");
    expect(findQuestionByRoute(ALL_QUESTIONS, {
      exam: "sharoushi", yearSeason: "2025-annual", section: "rousai", qnum: "q7",
    })?.id).toBe(q.id);
    expect(getSitemapQuestions().some((item) => item.id === q.id)).toBe(true);
    expect(SHAROUSHI_QUESTIONS.filter((item) => item.session === "gakka")).toHaveLength(16);
  });

  it("雇用保険3問と健康保険1問を科目固有の公式番号で分離する", () => {
    const expected = [
      { year: 2025, session: "koyou", qNumber: 4, officialAnswerNumber: "B" },
      { year: 2026, session: "koyou", qNumber: 7, officialAnswerNumber: "C" },
      { year: 2026, session: "koyou", qNumber: 9, officialAnswerNumber: "E" },
      { year: 2025, session: "kenpo", qNumber: 9, officialAnswerNumber: "B" },
    ];
    const published = SHAROUSHI_QUESTIONS.filter((q) => q.session === "koyou" || q.session === "kenpo");
    expect(published).toHaveLength(expected.length);
    expect(published.map(({ year, session, qNumber, officialAnswerNumber }) => ({ year, session, qNumber, officialAnswerNumber }))).toEqual(expect.arrayContaining(expected));
    for (const q of published) {
      expect(Object.keys(q.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      expect(isPracticeReadyQuestion(q)).toBe(true);
      expect(findQuestionByRoute(ALL_QUESTIONS, {
        exam: "sharoushi", yearSeason: `${q.year}-annual`, section: q.session, qnum: `q${q.qNumber}`,
      })?.id).toBe(q.id);
      expect(getSitemapQuestions().some((item) => item.id === q.id)).toBe(true);
    }
    const late = published.find((q) => q.year === 2026 && q.session === "koyou" && q.qNumber === 9)!;
    expect(late.explanation).toContain("1,380円");
    expect(late.explanation).toContain("1,320円");
    expect(late.explanation).toContain("1,300円");
    expect(late.explanation).toContain("11月2日");
    expect(SHAROUSHI_QUESTIONS.filter((item) => item.session !== "ippan")).toHaveLength(21);
  });
});
