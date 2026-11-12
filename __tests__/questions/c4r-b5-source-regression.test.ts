import { describe, expect, it } from "vitest";
import engei from "@/data/questions/engei-soshoku1/2023-early.json";
import plastic from "@/data/questions/kyoka-plastic2/2024-early.json";
import plastic1 from "@/data/questions/kyoka-plastic1/2023-early.json";
import chemistry1 from "@/data/questions/kagaku-bunseki1/2023-early.json";
import chemistry2 from "@/data/questions/kagaku-bunseki2/2024-early.json";

// Values re-read from JAVADA's original question PDFs, not the earlier manuscript.
describe("c4r-B5 公式原本の選択肢", () => {
  it("強化プラスチック1級2023 B8は硫化水素の臭いを問う", () => {
    const q = plastic1.find(q => q.officialQuestionLabel === "B群 8")!;
    expect(q.choices.エ).toBe("硫化水素は、無臭である。");
    expect(q.officialAnswerNumber).toBe("ニ");
    expect(q.choiceExplanations.エ).toContain("無臭ではありません");
  });

  it("化学分析2級2024 B11の試薬名を原本どおりに保持する", () => {
    const q = chemistry2.find(q => q.officialQuestionLabel === "B群 11")!;
    expect(q.choices.ウ).toContain("ベンゾイン");
    expect(q.choices.ウ).not.toContain("ベンゾイル");
  });

  it("化学分析1級2023 B11の硫酸と揮散条件を逆転させない", () => {
    const q = chemistry1.find(q => q.officialQuestionLabel === "B群 11")!;
    expect(q.question).toContain("硫酸を加えないとふっ化物として揮散し");
    expect(q.question).not.toContain("硝酸");
    expect(q.officialAnswerNumber).toBe("イ");
    expect(q.answer).toBe("ア");
    expect(q.choiceExplanations.ア).toContain("硫酸を加えないと");
  });

  it("園芸装飾1級2023 B18の水しろの割合を原本6ページの表どおりに保持する", () => {
    const q = engei.find(q => q.officialQuestionLabel === "B群 18")!;
    expect(Object.values(q.choices)).toEqual([
      "A：10、B：15", "A：10、B：25", "A：15、B：10", "A：25、B：20",
    ]);
    expect(q.answer).toBe("ウ");
    expect(q.officialAnswerNumber).toBe("ハ");
    expect(q.explanation).toContain("A＝15、B＝10");
  });

  it("園芸装飾1級2023 B21の植物を原本7ページどおりに保持する", () => {
    const q = engei.find(q => q.officialQuestionLabel === "B群 21")!;
    expect(Object.values(q.choices)).toEqual([
      "フェニックス・ロベレニー", "ハマナス", "カタクリ", "クロマツ",
    ]);
    expect(q.answer).toBe("ア");
  });

  it("強化プラスチック2級2024 B17の欠陥の順序を原本6ページどおりに保持する", () => {
    const q = plastic.find(q => q.officialQuestionLabel === "B群 17")!;
    expect(Object.values(q.choices)).toEqual([
      "樹脂やけ", "硬化不良", "変形・反り", "層間はく離",
    ]);
    expect(q.answer).toBe("イ");
    expect(q.officialAnswerNumber).toBe("ロ");
    expect(q.choiceExplanations.イ).toContain("硬化不良");
  });
});
