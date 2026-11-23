import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute } from "@/lib/seo/question-url";

describe("release question corpus", () => {
  it("excludes the two Kanken journal sets from the public registry and practice loader", async () => {
    const catalog = QUESTIONS_BY_EXAM["kanken-4"] ?? [];
    const practice = await getQuestionsForExam("kanken-4");
    for (const pool of [catalog, practice]) {
      expect(pool.length).toBeGreaterThan(0);
      for (const season of ["february", "june"]) {
        expect(findQuestionByRoute(pool, {
          exam: "kanken-4",
          yearSeason: `2022-${season}`,
          section: "gakka",
          qnum: "q4",
        })).toBeUndefined();
      }
      expect(pool.some((q) => q.year === 2022 && ["february", "june"].includes(q.season))).toBe(false);
    }
  });

  it("accepts either official option for the two single-selection public health nurse items", async () => {
    const pool = await getQuestionsForExam("hokenshi");
    for (const [id, alternatives, rejected] of [
      ["hokenshi-2016-annual-pm-q8", ["ア", "ウ"], "イ"],
      ["hokenshi-2017-annual-am-q43", ["イ", "ウ"], "ア"],
    ] as const) {
      const question = pool.find((q) => q.id === id);
      expect(question).toBeDefined();
      if (!question) throw new Error(`Missing question ${id}`);
      expect(question.requiredSelections).toBe(1);
      const count = requiredSelectionCount(question);
      for (const choice of alternatives) {
        expect(isCompleteSelectionCorrect(question.answer, [choice], count)).toBe(true);
      }
      expect(isCompleteSelectionCorrect(question.answer, alternatives, count)).toBe(false);
      expect(isCompleteSelectionCorrect(question.answer, [rejected], count)).toBe(false);
    }
  });

  it("serves the complete physician paper C and resolves its exact question URL", async () => {
    const catalog = QUESTIONS_BY_EXAM.ishi ?? [];
    const practice = await getQuestionsForExam("ishi");
    for (const pool of [catalog, practice]) {
      const paper = pool.filter((q) => q.year === 2026 && q.session === "mondai-c");
      expect(paper).toHaveLength(75);
      expect(new Set(paper.map((q) => q.qNumber)).size).toBe(75);
      const question = findQuestionByRoute(pool, {
        exam: "ishi", yearSeason: "2026-annual", section: "mondai-c", qnum: "q49",
      });
      expect(question?.id).toBe("ishi-2026-annual-mondai-c-q49");
      expect(question?.answer).toBe("ウ");
      expect(question?.choices?.ウ).toBe("薬物相互作用");
      expect(question && isPracticeReadyQuestion(question)).toBe(true);
    }
  });

  it("links a wireless exam question and answer to the same fixed examination month", async () => {
    const pool = await getQuestionsForExam("amateur1");
    const question = pool.find((q) => q.id === "amateur1-2026-november-houki-q8");
    expect(question).toBeDefined();
    for (const url of [question?.sourcePdfUrl, question?.sourceAnswerUrl]) {
      expect(url).toMatch(/^https:\/\/www\.kakomon-ai\.jp\/exam-library\/nichimu\/amateur1\/2026-11\//);
      const pathname = new URL(url!).pathname;
      expect(existsSync(join(process.cwd(), "public", pathname.slice(1)))).toBe(true);
    }
  });
});
