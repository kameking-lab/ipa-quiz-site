import { describe, expect, it } from "vitest";
import overlay from "@/data/questions/sm/choice-explanations-cx-k8sm.json";
import { SM_QUESTIONS } from "@/data/questions/sm";
import { BY_YEAR_QUESTIONS } from "@/data/questions/sm/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import type { ChoiceKey } from "@/lib/questions/types";

describe("SM morning II choice explanations", () => {
  const baseline = applyIpaCorrections("sm", BY_YEAR_QUESTIONS);
  // Verified against the eight IPA answer PDFs in corrections/official-sources.json.
  const officialAnswers: Record<number, string> = {
    2009: "アウウイエイアアウウアエアイイウアアイイイエアアエ",
    2010: "ウイイウウウイウウウイウアエウウイエエイイアイイウ",
    2011: "アウウウアイアウエイウアウウウエウエエエエエウアア",
    2021: "エウイエウウエエウエアイエウイアウイイアウウウエア",
    2022: "エイイアイイウウウイイウウウエウイイウウエアウイイ",
    2023: "イイウエアウウイウエアイイエイアウアウアエエイエア",
    2024: "エエイイアウイウウウイエエアウウイウアイエイイウウ",
    2025: "イウウエイウウエイエイイウエエアウアアエエイエエウ",
  };
  const imageRequired = [
    "sm-2010a-am2-q10", "sm-2010a-am2-q18", "sm-2011a-am2-q17",
    "sm-2022h-am2-q23", "sm-2023h-am2-q7", "sm-2023h-am2-q24",
    "sm-2024h-am2-q6", "sm-2024h-am2-q19", "sm-2025h-am2-q6", "sm-2025h-am2-q19",
  ];

  it("covers every text-solvable target across all eight years", () => {
    const targets = baseline.filter(q => q.session === "am2" && q.type === "multiple-choice");
    expect(targets).toHaveLength(200);
    expect(targets.filter(q => q.choiceExplanations).map(q => q.id)).toEqual(["sm-2024h-am2-q17"]);
    expect(Object.keys(overlay)).toHaveLength(189);
    expect(targets.filter(q => !q.choiceExplanations && !Object.hasOwn(overlay, q.id)).map(q => q.id).sort())
      .toEqual([...imageRequired].sort());
  });

  it("matches all 200 official answer keys after existing corrections", () => {
    for (const [year, answerKeys] of Object.entries(officialAnswers)) {
      const questions = SM_QUESTIONS.filter(q => q.year === Number(year) && q.session === "am2")
        .sort((a, b) => a.qNumber - b.qNumber);
      expect(questions.map(q => q.answer).join(""), year).toBe(answerKeys);
    }
  });
  it("preserves every official corrected answer and existing explanation", () => {
    expect(SM_QUESTIONS.map(q => [q.id, q.answer, q.explanation])).toEqual(
      baseline.map(q => [q.id, q.answer, q.explanation]),
    );
    for (const question of baseline.filter(q => q.choiceExplanations)) {
      expect(SM_QUESTIONS.find(q => q.id === question.id)?.choiceExplanations).toEqual(question.choiceExplanations);
      expect(Object.keys(overlay)).not.toContain(question.id);
    }
  });

  it("loads all four reasons with a single correct label matching the corrected answer", () => {
    for (const id of Object.keys(overlay)) {
      const q = SM_QUESTIONS.find(q => q.id === id)!;
      expect(q.session, id).toBe("am2");
      expect(q.type, id).toBe("multiple-choice");
      const keys = Object.keys(q.choices ?? {}) as ChoiceKey[];
      expect(keys, id).toHaveLength(4);
      expect(Object.keys(q.choiceExplanations ?? {}).sort(), id).toEqual(keys.sort());
      const reasons = keys.map(key => q.choiceExplanations?.[key] ?? "");
      expect(new Set(reasons).size, id).toBe(4);
      for (const [i, key] of keys.entries()) {
        expect(reasons[i].length, `${id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reasons[i].length, `${id}/${key}`).toBeLessThanOrEqual(180);
        expect(reasons[i].startsWith(key === q.answer ? "正しいです。" : "誤りです。"), `${id}/${key}`).toBe(true);
      }
    }
  });
});
