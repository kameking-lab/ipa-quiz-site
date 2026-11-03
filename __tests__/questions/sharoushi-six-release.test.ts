import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getSitemapQuestions } from "@/lib/seo/sitemap-pagination";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

const released: Record<number, Record<number, string>> = {
  2025: { 8: "D", 9: "C", 10: "E" },
  2026: { 5: "C", 9: "D", 10: "B" },
};
const held: Record<number, number[]> = { 2025: [1, 7], 2026: [2, 7] };

const keys = ["ア", "イ", "ウ", "エ", "オ"];

describe("社労士 independently reviewed six-question release", () => {
  const gakka = SHAROUSHI_QUESTIONS.filter((q) => q.session === "gakka");
  it("publishes exactly eight original questions per sitting without the held questions", () => {
    expect(QUESTIONS_BY_EXAM.sharoushi).toBe(SHAROUSHI_QUESTIONS);
    expect(getQuestionsByExamStrict("sharoushi").filter((q) => q.session === "gakka")).toHaveLength(16);
    expect(SHAROUSHI_QUESTIONS.map((q) => q.id)).toEqual([...new Set(SHAROUSHI_QUESTIONS.map((q) => q.id))]);
    for (const year of [2025, 2026]) {
      const paper = gakka.filter((q) => q.year === year);
      expect(paper).toHaveLength(8);
      expect(paper.map((q) => q.qNumber).sort((a, b) => a - b)).toEqual(
        year === 2025 ? [2, 3, 4, 5, 6, 8, 9, 10] : [1, 3, 4, 5, 6, 8, 9, 10],
      );
      expect(paper.some((q) => held[year]!.includes(q.qNumber))).toBe(false);
      expect(paper.every((q) => q.lawReferenceDate === (year === 2025 ? "2025-04-11" : "2026-04-10"))).toBe(true);
    }
  });

  it("keeps the six approved answers and all five choice explanations on playable questions", () => {
    for (const year of [2025, 2026]) {
      for (const [number, answer] of Object.entries(released[year]!)) {
        const q = gakka.find((item) => item.year === year && item.qNumber === Number(number));
        expect(q).toBeDefined();
        expect(q!.officialAnswerNumber).toBe(answer);
        expect(q!.answer).toBe(keys["ABCDE".indexOf(answer)]);
        expect(Object.keys(q!.choices ?? {})).toEqual(keys);
        expect(Object.keys(q!.choiceExplanations ?? {})).toEqual(keys);
        expect(isPracticeReadyQuestion(q!)).toBe(true);
      }
    }
  });

  it("derives six resolvable canonical question routes for the sitemap", () => {
    const sitemap = getSitemapQuestions();
    for (const year of [2025, 2026]) {
      for (const number of Object.keys(released[year]!).map(Number)) {
        const q = gakka.find((item) => item.year === year && item.qNumber === number)!;
        expect(sitemap.some((item) => item.id === q.id)).toBe(true);
        expect(questionPagePath(q)).toBe(`/q/sharoushi/${year}-annual/gakka/q${number}`);
        expect(findQuestionByRoute(ALL_QUESTIONS, {
          exam: "sharoushi", yearSeason: `${year}-annual`, section: "gakka", qnum: `q${number}`,
        })?.id).toBe(q.id);
      }
      for (const number of held[year]!) {
        expect(sitemap.some((item) => item.exam === "sharoushi" && item.session === "gakka" && item.year === year && item.qNumber === number)).toBe(false);
      }
    }
  });
});
