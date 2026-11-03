import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { DENKEN1_QUESTIONS } from "@/data/questions/denken1";
import launch from "@/data/questions/denken1/launch.json";
import theory2 from "@/data/questions/denken1/theory-aq02.json";
import { questionPagePath } from "@/lib/seo/question-url";

const KANA = [..."イロハニホヘトチリヌルヲワカヨ"];
const KEYS = [..."アイウエオカキクケコサシスセソ"];
const rows = DENKEN1_QUESTIONS.filter((q) => q.subject === "theory" && q.qNumber === 3);

// These values are read from the official answer table, theory question 3.
const officialAnswers = [..."ヘハカヲヌ"];
const frozen = JSON.parse(readFileSync("docs/evidence/approved35-construction/denken1-theory-q03/FIRST-AUTHOR-SOURCE-RECONCILED-V2.json", "utf8")) as {
  question: string; choices: Record<string, string>;
};

describe("denken1 theory A question 3 source-preserving addition", () => {
  it("adds one original and five blanks while preserving every previous row", () => {
    expect(DENKEN1_QUESTIONS).toHaveLength(25);
    expect(new Set(DENKEN1_QUESTIONS.map((q) => `${q.subject}:${q.qNumber}`)).size).toBe(5);
    for (const old of [...launch, ...theory2]) {
      expect(DENKEN1_QUESTIONS.find((q) => q.id === old.id)).toEqual(old);
    }
    expect(rows).toHaveLength(5);
  });

  it("keeps all original options, switching signs, prose and each official answer", () => {
    rows.forEach((q, i) => {
      expect(q.question).toBe(`${frozen.question}\n\n空欄(${i + 1})に当てはまる最も適切なものを選べ。`);
      expect(q.question).toContain("正の値から減少する場合を考える。V_Aが");
      expect(q.officialAnswerNumber).toBe(officialAnswers[i]);
      expect(q.answer).toBe(KEYS[KANA.indexOf(officialAnswers[i])]);
      expect(q.choices).toEqual(Object.fromEntries(KANA.map((k, j) => [KEYS[j], frozen.choices[k]])));
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(KEYS);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourceAttribution).toContain("理論A問3");
      expect(q.sourceAttribution).toContain("公式原図を抜粋");
      expect(questionPagePath(q)).toBe(`/q/denken1/2026-primary/riron/q3-${i + 1}`);
      for (const url of q.imageUrls ?? []) {
        const png = readFileSync(`public${url}`);
        expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      }
    });
    expect(rows.reduce((n, q) => n + Object.keys(q.choiceExplanations ?? {}).length, 0)).toBe(75);
  });
});
