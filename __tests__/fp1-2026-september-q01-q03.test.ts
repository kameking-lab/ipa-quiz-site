import { describe, expect, it } from "vitest";

import { FP1_QUESTIONS } from "@/data/questions/fp1";
import { getChoiceKeys } from "@/lib/questions/answers";

const september = FP1_QUESTIONS.filter(q => q.year === 2026 && q.season === "september" && q.qNumber <= 3);

describe("FP1 September 2026 initial basic batch", () => {
  it("retains the sourced initial questions 1 to 3 while preserving May's complete basic paper", () => {
    expect(september.map(q => q.qNumber)).toEqual([1, 2, 3]);
    expect(FP1_QUESTIONS.filter(q => q.year === 2026 && q.season === "may")).toHaveLength(50);
    expect(new Set(FP1_QUESTIONS.map(q => q.id)).size).toBe(FP1_QUESTIONS.length);
  });

  it("retains the official answer key, four explained choices, law date, and official source links", () => {
    expect(september.map(q => q.officialAnswerNumber)).toEqual(["3", "4", "2"]);
    expect(september.map(q => q.answer)).toEqual(["ウ", "エ", "イ"]);
    for (const question of september) {
      expect(question.session).toBe("gakka");
      expect(question.lawReferenceDate).toBe("2026-04-01");
      expect(getChoiceKeys(question.choices)).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.keys(question.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(question.sourcePdfUrl).toBe("https://www.kinzai.or.jp/fp/news-fp/50623.html");
      expect(question.sourceAnswerUrl).toBe("https://www2.kinzai.or.jp/data/202609/fp01_g.pdf");
      expect(question.officialReferenceUrls?.length).toBeGreaterThan(0);
    }
  });
});
