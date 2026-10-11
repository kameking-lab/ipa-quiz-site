import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getSitemapQuestions } from "@/lib/seo/sitemap-pagination";

describe("社労士 労災保険法・徴収法の公式根拠ゲート", () => {
  it("公式正答Bの2025年問7を独立した労災セッションで保持する", () => {
    const rousai = SHAROUSHI_QUESTIONS.filter((q) => q.session === "rousai");
    expect(rousai.map((q) => `${q.year}-${q.qNumber}`)).toEqual(["2026-2", "2026-3", "2026-4", "2026-5", "2026-6", "2026-7", "2026-8", "2026-9", "2026-10", "2025-3", "2025-4", "2025-5", "2025-6", "2025-7", "2025-9", "2025-10"]);
    const q = rousai.find((item) => item.year === 2025 && item.qNumber === 7)!;
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

  it("adds only thirteen dated and officially keyed Rousai originals", () => {
    const newKeys: Array<[number, number, string]> = [
      [2025, 3, "D"], [2025, 4, "E"], [2025, 5, "E"], [2025, 6, "E"], [2025, 9, "D"], [2025, 10, "E"],
      [2026, 2, "B"], [2026, 3, "C"], [2026, 4, "D"], [2026, 5, "D"], [2026, 8, "C"], [2026, 9, "B"], [2026, 10, "C"],
    ];
    const choiceLetters = ["ア", "イ", "ウ", "エ", "オ"];
    for (const [year, qNumber, officialAnswerNumber] of newKeys) {
      const q = SHAROUSHI_QUESTIONS.find((item) => item.year === year && item.session === "rousai" && item.qNumber === qNumber);
      expect(q, `${year} Rousai Q${qNumber}`).toBeDefined();
      expect(q!.id).toBe(`sharoushi-${year}-annual-rousai-q${qNumber}`);
      expect(q!.officialAnswerNumber).toBe(officialAnswerNumber);
      expect(q!.answer).toBe(choiceLetters["ABCDE".indexOf(officialAnswerNumber)]);
      expect(Object.keys(q!.choices ?? {})).toEqual(choiceLetters);
      expect(Object.keys(q!.choiceExplanations ?? {})).toEqual(choiceLetters);
      expect(Object.values(q!.choiceExplanations ?? {}).every(Boolean)).toBe(true);
      expect(q!.lawReferenceDate).toBe(year === 2025 ? "2025-04-11" : "2026-04-10");
      expect(q!.sourcePdfUrl).toContain("sharosi-siken.or.jp");
      expect(q!.sourceAnswerUrl).toContain("sharosi-siken.or.jp");
      expect(isPracticeReadyQuestion(q!)).toBe(true);
      expect(findQuestionByRoute(ALL_QUESTIONS, {
        exam: "sharoushi", yearSeason: `${year}-annual`, section: "rousai", qnum: `q${qNumber}`,
      })?.id).toBe(q!.id);
    }
    for (const number of [6, 7]) {
      expect(SHAROUSHI_QUESTIONS.some((item) => item.year === 2026 && item.session === "rousai" && item.qNumber === number)).toBe(true);
    }
  });

  it("雇用保険3問と健康保険1問を科目固有の公式番号で分離する", () => {
    const expected = [
      { year: 2025, session: "koyou", qNumber: 4, officialAnswerNumber: "B" },
      { year: 2026, session: "koyou", qNumber: 7, officialAnswerNumber: "C" },
      { year: 2026, session: "koyou", qNumber: 9, officialAnswerNumber: "E" },
      { year: 2025, session: "kenpo", qNumber: 9, officialAnswerNumber: "B" },
    ];
    const published = SHAROUSHI_QUESTIONS.filter((q) => q.session === "koyou" || q.session === "kenpo");
    expect(published).toHaveLength(30);
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
    expect(SHAROUSHI_QUESTIONS.filter((item) => item.session !== "ippan").length).toBeGreaterThanOrEqual(87);
  });
});
