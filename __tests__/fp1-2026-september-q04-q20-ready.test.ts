import { describe, expect, it } from "vitest";
import ready from "@/data/questions/fp1/2026-september-q04-q20-ready.json";
import mayLaunch from "@/data/questions/fp1/launch.json";
import mayAddition from "@/data/questions/fp1/2026-may-addition.json";
import { FP1_QUESTIONS } from "@/data/questions/fp1";
import { parseQuestionBlocks } from "@/components/quiz/QuestionBody";

const numbers = [4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20];
const answers = [3,2,1,4,3,3,2,2,1,1,1,4,3,1,4,2];
const keys = ["ア","イ","ウ","エ"];

describe("FP1 September verified basic part", () => {
  it("registers the 16 ready questions without publishing held Q10 or changing May 50", () => {
    expect(ready.map(q => q.qNumber)).toEqual(numbers);
    expect(ready.map(q => Number(q.officialAnswerNumber))).toEqual(answers);
    expect(FP1_QUESTIONS.filter(q => q.year === 2026 && q.season === "may")).toHaveLength(50);
    expect(FP1_QUESTIONS.filter(q => q.year === 2026 && q.season === "september")).toHaveLength(16);
    expect(FP1_QUESTIONS.some(q => q.year === 2026 && q.season === "september" && q.qNumber === 10)).toBe(false);
    expect(FP1_QUESTIONS.filter(q => q.season === "may").map(q => q.id).sort()).toEqual(
      [...mayLaunch,...mayAddition].map(q => q.id).sort()
    );
  });

  it("preserves each four-choice original and gives each choice a separate reason", () => {
    for (const q of ready) {
      expect(q.answer).toBe(keys[Number(q.officialAnswerNumber)-1]);
      expect(Object.keys(q.choices)).toEqual(keys);
      expect(Object.keys(q.choiceExplanations)).toEqual(keys);
      expect(Object.values(q.choices).every(value => value.trim().length > 0)).toBe(true);
      expect(Object.values(q.choiceExplanations).every(value => value.trim().length > 0)).toBe(true);
      expect(q.lawReferenceDate).toBe("2026-04-01");
      expect(q.sourcePdfUrl).toContain("202609/fp01_g_kiso.pdf");
      expect(q.sourceAnswerUrl).toContain("202609/fp01_g.pdf");
    }
  });

  it("distinguishes Q11's three propositions from its four answer options", () => {
    const q = ready.find(q => q.qNumber === 11)!;
    expect(q.question).toContain("(a)");
    expect(q.question).toContain("(b)");
    expect(q.question).toContain("(c)");
    expect(Object.values(q.choices)).toEqual(["１つ","２つ","３つ","０（なし）"]);
    expect(q.answer).toBe("イ");
    expect(q.choiceExplanations.イ).toContain("2つ");
    expect(q.choiceExplanations.イ).toContain("(c)");
  });

  it("renders the original journal entries and transaction/rate tables as tables", () => {
    const q12 = ready.find(q => q.qNumber === 12)!;
    for (const choice of Object.values(q12.choices)) {
      const table = parseQuestionBlocks(choice).find(block => block.kind === "table");
      expect(table?.header).toHaveLength(2);
      expect(table?.rows).toHaveLength(2);
    }
    for (const number of [17,20]) {
      const q = ready.find(q => q.qNumber === number)!;
      const table = parseQuestionBlocks(q.question).find(block => block.kind === "table");
      expect(table?.header).toHaveLength(4);
      expect(table?.rows).toHaveLength(number === 17 ? 3 : 2);
    }
  });
});
