import { describe, expect, it } from "vitest";
import overlay from "@/data/questions/sc/choice-explanations-cx-k7.json";
import existingOverlay from "@/data/questions/sc/choice-explanations-2024-2025.json";
import { SC_QUESTIONS } from "@/data/questions/sc";
import { BY_YEAR_QUESTIONS } from "@/data/questions/sc/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";

const skipped = [
  "sc-2009a-am1-q3",
  "sc-2009a-am1-q8",
  "sc-2009a-am1-q13",
  "sc-2009h-am1-q1",
  "sc-2010a-am1-q8",
  "sc-2010a-am1-q12",
  "sc-2010a-am1-q19",
  "sc-2011a-am1-q8",
  "sc-2011a-am1-q10",
  "sc-2011a-am1-q25",
  "sc-2011a-am1-q29",
  "sc-2012a-am1-q1",
  "sc-2012a-am1-q17",
  "sc-2012h-am1-q7",
  "sc-2013a-am1-q3",
  "sc-2013a-am1-q6",
  "sc-2013a-am1-q16",
  "sc-2013a-am1-q17",
  "sc-2013a-am1-q18",
  "sc-2013h-am1-q3",
  "sc-2013h-am1-q7",
  "sc-2013h-am1-q23",
  "sc-2013h-am1-q29",

  "sc-2014a-am1-q3",
  "sc-2014a-am1-q7",
  "sc-2014h-am1-q2",
  "sc-2014h-am1-q4",
  "sc-2014h-am1-q7",
  "sc-2014h-am1-q8",
  "sc-2014h-am1-q9",
  "sc-2015a-am1-q3",
  "sc-2015a-am1-q7",
  "sc-2015a-am1-q10",
  "sc-2015a-am1-q11",
  "sc-2015a-am1-q19",
  "sc-2015a-am1-q29",
  "sc-2015h-am1-q7",
  "sc-2015h-am1-q14",
  "sc-2015h-am1-q18",
  "sc-2016a-am1-q1",
  "sc-2016a-am1-q2",
  "sc-2016a-am1-q10",
  "sc-2016a-am1-q19",
  "sc-2016a-am1-q20",
  "sc-2016a-am1-q28",
  "sc-2016a-am1-q29",
  "sc-2016h-am1-q3",
  "sc-2017h-am1-q1",
  "sc-2017h-am1-q3",
  "sc-2017h-am1-q6",
  "sc-2017h-am1-q7",
  "sc-2017h-am1-q8",
  "sc-2017h-am1-q18",
  "sc-2018a-am1-q3",
  "sc-2018a-am1-q20",
  "sc-2018a-am1-q28",
  "sc-2018h-am1-q5",
  "sc-2018h-am1-q7",
  "sc-2018h-am1-q8",
  "sc-2018h-am1-q28",

  "sc-2019h-am1-q7", "sc-2019h-am1-q11", "sc-2019h-am1-q19",
  "sc-2019a-am1-q1", "sc-2019a-am1-q19",
  "sc-2021h-am1-q19", "sc-2021h-am1-q26",
  "sc-2022h-am1-q16", "sc-2023h-am1-q2", "sc-2023h-am1-q6",
];
const target = SC_QUESTIONS.filter(q => q.year >= 2009 && q.year <= 2025 && q.session === "am1");

describe("SC cx-k7 morning I choice explanations", () => {
  it("covers all 960 target questions with 120 existing, 770 additions and 70 documented skips", () => {
    expect(target).toHaveLength(960);
    expect(Object.keys(overlay)).toHaveLength(770);
    expect(target.filter(q => q.choiceExplanations)).toHaveLength(890);
    expect(target.filter(q => !q.choiceExplanations).map(q => q.id).sort()).toEqual(skipped.sort());
    expect(Object.keys(overlay).filter(id => id in existingOverlay)).toEqual([]);
  });

  it("adds four specific reasons matching the corrected official answer and the displayed choices", () => {
    const byId = new Map(target.map(q => [q.id, q]));
    for (const [id, reasons] of Object.entries(overlay)) {
      const question = byId.get(id)!;
      expect(question, id).toBeDefined();
      expect(question.year, id).toBeLessThanOrEqual(2023);
      expect(question.type, id).toBe("multiple-choice");
      expect(Object.keys(reasons).sort(), id).toEqual(Object.keys(question.choices!).sort());
      expect(new Set(Object.values(reasons)).size, id).toBe(4);
      for (const [key, reason] of Object.entries(reasons)) {
        expect(reason.length, `${id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${id}/${key}`).toBeLessThanOrEqual(180);
        expect(reason.startsWith(key === question.answer ? "正しいです。" : "誤りです。"), `${id}/${key}`).toBe(true);
      }
      expect(question.choiceExplanations, id).toEqual(reasons);
    }
  });

  it("makes the selection polarity explicit for negative questions", () => {
    expect(overlay["sc-2013a-am1-q9"].ウ).toContain("誤っている記述としてこの肢を選びます");
    for (const key of ["ア", "イ", "エ"] as const) {
      expect(overlay["sc-2013a-am1-q9"][key]).toContain("誤り");
    }
    expect(overlay["sc-2013h-am1-q21"].ア).toContain("指摘事項として選びます");
  });

  it("keeps all existing question fields and overlays unchanged when applying the new layer", () => {
    const baseline = applyChoiceExplanationOverlay(applyIpaCorrections("sc", BY_YEAR_QUESTIONS), existingOverlay);
    const expected = applyChoiceExplanationOverlay(baseline, overlay);
    expect(SC_QUESTIONS).toEqual(expected);
    for (const [index, question] of SC_QUESTIONS.entries()) {
      const { choiceExplanations: added, ...actualFields } = question;
      const { choiceExplanations: before, ...originalFields } = baseline[index]!;
      expect(actualFields, question.id).toEqual(originalFields);
      if (!(question.id in overlay)) expect(added, question.id).toEqual(before);
    }
  });

  it("qualifies all four choices in questions that use historical laws, standards or institutions", () => {
    for (const [id, reasons] of Object.entries(overlay)) {
      if (Object.values(reasons).some(reason => reason.includes("出題当時"))) {
        for (const reason of Object.values(reasons)) expect(reason, id).toContain("出題当時");
      }
    }
  });
});
