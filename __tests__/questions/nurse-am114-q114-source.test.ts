import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import source from "@/docs/evidence/nurse-am7-followup-20261010/114-am-q91-120-source.json";

const id = "kangoshi-2024-annual-am-q114";
const original = source.questions.find((item) => item.number === 114)!;
const q = KANGOSHI_QUESTIONS.find((item) => item.id === id)!;
const labels = ["ア", "イ", "ウ", "エ"] as const;

describe("114th nursing AM Q114 direct-source addition", () => {
  it("keeps the original case, all four choices and official key", () => {
    expect(KANGOSHI_QUESTIONS.filter((item) => item.id === id)).toHaveLength(1);
    expect(original.officialAnswerDigits).toBe("3");
    expect(q.question).toContain(original.fullSharedPremiseText);
    expect(q.question).toContain("経皮ビリルビン10.0 mg/dL");
    expect(q.question).toContain("排尿9回/日、排便8回/日");
    labels.forEach((label, index) => {
      expect(original.rawQuestionAndAllChoices).toContain(`${index + 1}．${q.choices?.[label]}`);
      expect(q.choiceExplanations?.[label]?.length).toBeGreaterThan(0);
    });
    expect(q.answer).toBe("ウ");
    expect(q.officialAnswerNumber).toBe("3");
    expect(q.requiredSelections).toBe(1);
    expect(q.sourcePdfUrl.endsWith("#page=49")).toBe(true);
  });

  it("states the calculated weight loss and links the four narrow clinical references", () => {
    expect(((3200 - 3100) / 3200) * 100).toBe(3.125);
    expect(q.choiceExplanations?.["イ"]).toContain("3.125％");
    expect(q.officialReferenceUrls).toEqual(expect.arrayContaining([
      "https://www.england.nhs.uk/wp-content/uploads/2015/07/jaundice-in-the-newborn.pdf",
      "https://www.who.int/data/gho/indicator-metadata-registry/imr-details/10324",
      "https://www.stanfordchildrens.org/en/topic/default?id=physical-exam-of-the-newborn-90-P02670",
      "https://www.uhsussex.nhs.uk/wp-content/uploads/2022/08/Breastfeeding-in-the-first-few-days.pdf",
    ]));
  });
});

