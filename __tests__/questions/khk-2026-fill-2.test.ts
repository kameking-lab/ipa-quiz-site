import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { KHK_2026_KIKAI_OTSU_STAGING as kikai, KHK_2026_REITO_FIRST_STAGING as reito, validateKhk2026Fill2 } from "@/scripts/lib/validate-khk-2026-fill-2";
import { KHK_2026_OTSU_STAGING as chemicalOtsu } from "@/scripts/lib/validate-khk-2026-fill";
import kikaiStored from "@/data/qualification-staging/khk-kikai/2026-otsu/questions.json";
import kikaiRefs from "@/data/qualification-staging/khk-kikai/2026-otsu/shared-question-references.json";
import reitoStored from "@/data/qualification-staging/khk-reito/2026-first/questions.json";

describe("高圧ガス2026 乙種機械・第一種冷凍機械の非公開原本", () => {
  it("85出題・425肢の照合記録と公式正答を検証する", () => {
    expect(validateKhk2026Fill2("kikai-otsu")).toEqual([]);
    expect(validateKhk2026Fill2("reito-first")).toEqual([]);
    expect(kikai).toHaveLength(50);
    expect(reito).toHaveLength(35);
    expect([...kikai, ...reito].flatMap(q => Object.values(q.choiceExplanations!))).toHaveLength(425);
    // Independently read from the official answer-table image, not the JSON keys.
    for (const [paper, session, numbers] of [
      [kikai, "hoki", "34512241315552225435"],
      [kikai, "hoan", "142355312442153"],
      [kikai, "gakushiki", "122353414531542"],
      [reito, "houki", "44533234225224421342"],
      [reito, "hoan", "411535324342215"],
    ] as const) {
      const qs = paper.filter(q => q.session === session).sort((a, b) => a.qNumber - b.qNumber);
      expect(qs.map(q => q.officialAnswerNumber).join("")).toBe(numbers);
    }
  });

  it("34共通出題は参照し、対象側のID・番号・出典・設例を保つ", () => {
    expect(kikaiStored).toHaveLength(16);
    expect(kikaiRefs).toHaveLength(34);
    expect(reitoStored).toHaveLength(35);
    const fx14 = kikai.find(q => q.session === "hoki" && q.qNumber === 14)!;
    const bx14 = chemicalOtsu.find(q => q.session === "khk-bx" && q.qNumber === 14)!;
    expect(fx14.id).not.toBe(bx14.id);
    expect(fx14.originalContent!.body).toBe(bx14.originalContent!.body);
    expect(fx14.explanation).toBe(bx14.explanation);
    expect(fx14.sourcePdfUrl).toContain("/R8FX.pdf");
    expect(fx14.imageUrls![0]).toContain("2026-FX-shared-2");
    expect(fx14.question).toContain("350,000");
    const gx13 = reito.find(q => q.session === "houki" && q.qNumber === 13)!;
    const gx14 = reito.find(q => q.session === "houki" && q.qNumber === 14)!;
    expect(gx13.originalContent!.sharedPassages![0].text).toContain("6,000");
    expect(gx13.question).toContain("250トン");
    expect(gx14.question).toContain("600トン");
    expect(gx14.question).toContain("製造設備A:300トン");
  });

  it("指数・図・表の列を保持し、3問の計算を独立検算する", () => {
    const fz = (n: number) => kikai.find(q => q.session === "gakushiki" && q.qNumber === n)!;
    expect(fz(1).question).toContain("10⁻⁶");
    expect(fz(1).question).toContain("10⁶");
    expect(fz(4).question).toContain("pV^γ");
    expect(fz(7).hasImage).toBe(true);
    const volume = 2 / .028 * 8.31 * 300.15 / 501300;
    expect(volume).toBeCloseTo(.3554, 4);
    const choices = Object.values(fz(2).choices!).map(s => Number.parseFloat(s));
    expect(choices.indexOf(choices.reduce((a, b) => Math.abs(a - volume) < Math.abs(b - volume) ? a : b)) + 1).toBe(Number(fz(2).officialAnswerNumber));
    expect(1000 * .1 * .100 / .001).toBe(10000);
    expect(fz(6).choices!.ウ).toBe("1.0×10⁴");
    expect(3 * 240 / (2 * 10)).toBe(36);
    expect(3 * 240 / (4 * 10)).toBe(18);
    expect(fz(9).choices!.エ).toBe("周方向応力36 MPa、軸方向応力18 MPa");
  });

  it("冷凍の保安検査と自主検査の対象・周期を区別する", () => {
    const law = (n: number) => reito.find(q => q.session === "houki" && q.qNumber === n)!;
    expect(law(16).explanation).toContain("原則3年に1回");
    expect(law(16).explanation).toContain("認定指定設備Bは特定施設の範囲から除かれる");
    expect(law(17).explanation).toContain("認定指定設備Bを含む");
    expect(law(17).explanation).toContain("1年に1回以上");
    expect(law(12).explanation).toContain("横置形で対象外");
    expect(law(12).explanation).toContain("5,000 L以上");
  });

  it.each(["answer", "publicAllowed", "originalContent"] as const)("%sの破損を検出する", field => {
    const broken = structuredClone(reito);
    if (field === "answer") broken[0].answer = broken[0].answer === "ア" ? "イ" : "ア";
    else if (field === "publicAllowed") broken[0].publicAllowed = true;
    else broken[0].originalContent!.body += "改変";
    expect(validateKhk2026Fill2("reito-first", broken).length).toBeGreaterThan(0);
  });

  it("公開・同期・遅延配信に2026出題を混入させない", async () => {
    const ids = new Set([...kikai, ...reito].map(q => q.id));
    expect([...kikai, ...reito].every(q => q.publicAllowed === false && !q.needsReview)).toBe(true);
    for (const pool of [ALL_QUESTIONS, QUESTIONS_BY_EXAM["khk-kikai-otsu"], QUESTIONS_BY_EXAM["khk-reito-1"], await getQuestionsForExam("khk-kikai-otsu"), await getQuestionsForExam("khk-reito-1")]) {
      if (!pool) throw new Error("公開用プールが未定義");
      expect(pool.some(q => ids.has(q.id))).toBe(false);
    }
  });
});
