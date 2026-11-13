import { describe, expect, it } from "vitest";
import plant from "@/data/questions/plant-haikan-seizu2/2024-late.json";
import garden from "@/data/questions/zoen-gino1/2023-early.json";
import sequence from "@/data/questions/sequence1/2024-late.json";

describe("c5r-B3 公式原文の意味を変える転記の回帰防止", () => {
  it("酸洗いという条件を保持する（公式PDF A群20）", () => {
    const q = plant.find(q => q.qNumber === 20)!;
    expect(q.question).toBe("金属製品の表面を酸で洗ってもさびは落ちない。");
    expect(q.officialAnswerNumber).toBe("×");
    expect(q.explanation).toContain("酸洗い");
  });

  it("サツキの剪定時期を保持する（公式PDF B群12ロ）", () => {
    const q = garden.find(q => q.qNumber === 37)!;
    expect(q.choices["イ"]).toBe("サツキを秋に整姿のため強く刈り込んだ。");
    expect(q.officialAnswerNumber).toBe("ニ");
    expect(q.choiceExplanations["イ"]).toContain("秋に");
  });

  it("JISの呼び寸法を選ぶ肯定設問と解説を一致させる（公式PDF B群18）", () => {
    const q = sequence.find(q => q.qNumber === 43)!;
    expect(q.question).toContain("規定されているもの");
    expect(q.question).not.toContain("規定されていない");
    expect(q.officialAnswerNumber).toBe("ニ");
    expect(q.choices[q.answer as keyof typeof q.choices]).toBe("375");
    expect(q.choiceExplanations["エ"]).toContain("375がJISで規定される呼び寸法");
    expect(q.choiceExplanations["ウ"]).toContain("275は本問で問うJISの呼び寸法に含まれません");
  });
});
