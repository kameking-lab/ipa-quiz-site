import { describe, expect, it } from "vitest";
import naiso from "@/data/questions/naiso-kosei2/2025-early.json";
import bousui from "@/data/questions/bousui-urethane2/2025-early.json";
import sakan from "@/data/questions/sakan3/2025-early.json";
import haiden from "@/data/questions/haiden-seigyo1/2025-early.json";
import bankin from "@/data/questions/kenchiku-bankin2/2025-early.json";

describe("c4r-A6 official-source corrections", () => {
  it("preserves the prohibition in B22 and explains the official incorrect statement", () => {
    const q = naiso[46];
    expect(q.choices.イ).toBe("野縁の端部は、野縁受けから150mm以上はね出して取り付けてはならない。");
    expect(q.officialAnswerNumber).toBe("ハ");
    expect(q.answer).toBe("ウ");
    expect(q.choiceExplanations.イ).toContain("禁止");
    expect(q.choiceExplanations.ウ).toContain("「必ずシングル野縁」とする指定が不適切");
  });

  it("keeps B19's explanation aligned with the official tapered-edge answer", () => {
    const q = naiso[43];
    expect(q.officialAnswerNumber).toBe("ロ");
    expect(q.choices[q.answer as keyof typeof q.choices]).toBe("テーパエッジ");
    expect(q.choiceExplanations.イ).toMatch(/^正解。.*テーパエッジ/);
    expect(q.explanation).not.toContain("公式正答はベベルエッジ");
  });

  it("uses the official 10 mm answer consistently in every B20 explanation", () => {
    const q = naiso[44];
    expect(q.officialAnswerNumber).toBe("ニ");
    expect(q.choices[q.answer as keyof typeof q.choices]).toBe("10");
    for (const text of Object.values(q.choiceExplanations)) expect(text).toContain("10mm");
    expect(q.choiceExplanations.エ).toMatch(/^正解。.*10mm以上/);
  });

  it("restores omitted source terminology without changing the official keys", () => {
    expect(sakan[4].question).toContain("つけ代墨");
    expect(sakan[4].explanation).toContain("つけ代墨");
    expect(sakan[4].officialAnswerNumber).toBe("○");
    expect(bousui[14].question).toContain("ウレタンゴム系塗膜防水");
    expect(bousui[14].officialAnswerNumber).toBe("×");
    expect(bousui[47].choices.イ).toContain("指触乾燥(タックフリー)時間");
    expect(bousui[47].officialAnswerNumber).toBe("ニ");
  });

  it("explains why the five-symbol statement is false using the published four-symbol table", () => {
    const q = haiden[11];
    expect(q.officialAnswerNumber).toBe("×");
    expect(q.answer).toBe("イ");
    expect(q.question).toContain("V、W、X、Y、Zの5種類");
    expect(q.choiceExplanations.イ).toContain("X（固定形）、Y（搬出形）、S（差込形）、W（引出形）の4種類");
  });

  it("retains the printed shears statement with an explicit official-scoring note", () => {
    const q = bankin[34];
    expect(q.officialAnswerNumber).toBe("イ");
    expect(q.answer).toBe("ア");
    expect(q.choices.エ).toContain("刃長をいっぱいに使い");
    expect(q.choiceExplanations.ア).toContain("強く締め付ければよいとする点が不適切");
    expect(q.choiceExplanations.エ).toContain("公式正答はイ");
  });
});
