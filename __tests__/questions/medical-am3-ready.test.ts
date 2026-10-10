import { describe, expect, it } from "vitest";
import ot from "@/data/questions/sagyo-ryohoshi/am35-local-ready.json";
import vision55 from "@/data/questions/shino-kunrenshi/am54-local-ready.json";
import vision56 from "@/data/questions/shino-kunrenshi/am15-formula-ready.json";
import { SAGYO_RYOHOSHI_QUESTIONS } from "@/data/questions/sagyo-ryohoshi";
import { SHINO_KUNRENSHI_QUESTIONS } from "@/data/questions/shino-kunrenshi";
import evidence from "@/docs/evidence/medical-am3-next-20261010/INTEGRATION.json";

const rows = [...ot, ...vision55, ...vision56];
const kana = ["ア", "イ", "ウ", "エ", "オ"];

describe("保存済み午前3原問の局所受入れ", () => {
  it("原本ID・午前年度・公式キーと全5肢を保持する", () => {
    expect(rows.map((q) => q.id).sort()).toEqual(evidence.goIds);
    expect(SAGYO_RYOHOSHI_QUESTIONS).toHaveLength(299);
    expect(SHINO_KUNRENSHI_QUESTIONS).toHaveLength(186);
    for (const q of rows) {
      expect(q.id).toBe(`${q.exam}-${q.year}-annual-am-q${q.qNumber}`);
      expect(q.session).toBe("am");
      expect(q.needsReview).toBe(false);
      expect(q.hasImage).toBe(false);
      expect(Object.keys(q.choices)).toEqual(kana);
      expect(Object.keys(q.choiceExplanations)).toEqual(kana);
      for (const key of kana) {
        expect(q.choices[key as keyof typeof q.choices].trim()).not.toBe("");
        expect(q.choiceExplanations[key as keyof typeof q.choiceExplanations].trim()).not.toBe("");
      }
      expect(q.explanation.trim()).not.toBe("");
      const answer = Array.isArray(q.answer) ? q.answer : [q.answer];
      expect(answer).toHaveLength(q.requiredSelections);
      expect(answer.map((a) => String(kana.indexOf(a) + 1)).join(""))
        .toBe(q.officialAnswerNumber);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
    }
  });

  it("第56回視能AM15の公式3と符号付き計算式を一致させる", () => {
    const q = vision56[0];
    expect(q?.id).toBe("shino-kunrenshi-2025-annual-am-q15");
    expect(q?.officialAnswerNumber).toBe("3");
    expect(q?.answer).toBe("ウ");
    expect(q?.question).toContain("12 mm");
    expect(q?.explanation).toContain("Fc/(1+d·Fc)");
    expect(q?.explanation).toContain("0.928");
    expect(q?.explanation).toContain("−6.50 D");
    expect(evidence.q15OfficialAnswerCell).toBe("AM15=3");
    expect(evidence.q15IndependentCalculation).toBeCloseTo(-6.4655172413793105, 10);
    expect(evidence.originalSourceMetadataTypo).toBe("shino-kunrenshi-56-pm-15");
    expect(evidence.latestTwoRoundsComplete).toBe(false);
    expect(evidence.publicGo).toBe(false);
  });
});
