import { describe, expect, it } from "vitest";
import type { Question } from "@/lib/questions/types";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { KHK_2026_OTSU_STAGING as otsu, KHK_2026_KIKAI_KOU_STAGING as kikai, validateKhk2026Fill } from "@/scripts/lib/validate-khk-2026-fill";
import otsuStored from "@/data/qualification-staging/khk-kagaku/2026-otsu/questions.json";
import kikaiStored from "@/data/qualification-staging/khk-kikai/2026-kou/questions.json";
import otsuRefs from "@/data/qualification-staging/khk-kagaku/2026-otsu/shared-question-references.json";
import kikaiRefs from "@/data/qualification-staging/khk-kikai/2026-kou/shared-question-references.json";
import kagakuImages from "@/data/questions/khk-kagaku/image-assets.json";
import { KHK_2026_KOU_STAGING as chemicalKou } from "@/scripts/lib/validate-khk-kagaku-2026-kou";

describe("高圧ガス2026 乙種化学・甲種機械の非公開原本", () => {
  it("85出題・425肢を原本照合記録と公式正答で検証する", () => {
    expect(validateKhk2026Fill("otsu")).toEqual([]);
    expect(validateKhk2026Fill("kikai-kou")).toEqual([]);
    expect(otsu).toHaveLength(50);
    expect(kikai).toHaveLength(35);
    expect([...otsu, ...kikai].flatMap(q => Object.values(q.choiceExplanations!))).toHaveLength(425);
    expect(kikai.filter(q => q.session === "hoan")).toHaveLength(15);
    expect([...otsu, ...kikai].every(q => !q.needsReview)).toBe(true);
  });

  it("共通49出題を参照し、区分のID・公式出典・設例を維持する", () => {
    expect(otsuStored).toHaveLength(35);
    expect(kikaiStored).toHaveLength(1);
    expect(otsuRefs.length + kikaiRefs.length).toBe(49);
    const by = (qs: Question[], session: string, n: number) => qs.find(q => q.session === session && q.qNumber === n)!;
    const ex = by(kikai, "hoki", 7);
    const ax = by(chemicalKou, "khk-ax", 7);
    expect(ex.id).not.toBe(ax.id);
    expect(ex.originalContent!.body).toBe(ax.originalContent!.body);
    expect(ex.explanation).toBe(ax.explanation);
    expect(ex.sourcePdfUrl).toContain("/R8EX.pdf");
    expect(ax.sourcePdfUrl).toContain("/R8AX.pdf");
    expect(kikaiRefs.find(r => r.id === ex.id)!.existingQuestionId).toBe("khk-kagaku-2026-annual-cx-q7");
    const bx14 = by(otsu, "khk-bx", 14);
    expect(otsuRefs.find(r => r.id === bx14.id)!.existingQuestionId).toBe("khk-kagaku-2026-annual-dx-q17");
    expect(bx14.qNumber).toBe(14);
    expect(bx14.originalContent!.sharedPassages![0].text).toContain("問13から問20");
    expect(bx14.question).toContain("350,000");
    expect(bx14.imageUrls![0]).toContain("2026-BX-shared-2");
    expect(by(kikai, "hoan", 7).answer).toBe("イ");
    expect(by(chemicalKou, "khk-ay", 7).answer).toBe("イ");
    expect(by(kikai, "hoan", 7).originalContent!.body).not.toBe(by(chemicalKou, "khk-ay", 7).originalContent!.body);
  });

  it("表の列、上付き指数、化学式を保持し、6問の計算を確認する", () => {
    const bz = (n: number) => otsu.find(q => q.session === "khk-bz" && q.qNumber === n)!;
    expect(bz(1).originalContent!.body).toContain("kg・m⁻¹・s⁻²");
    expect(bz(2).choices!.イ).toBe("2.5×10⁻² m³");
    expect(3 * 8.314 * (27 + 273.15) / 300000).toBeCloseTo(.025, 4);
    expect(17.6 / 44 * 60 / 40 * 28).toBeCloseTo(16.8);
    expect(1500 / (.5 * 100)).toBe(30);
    expect(3 * -394 + 4 * -286 + 2219).toBe(-107);
    expect(bz(5).choices!.ウ).toBe("a=1、b=2、c=1、d=3");
    for (const [key, value] of Object.entries(bz(5).choices!)) {
      const [a, b, c, d] = [...value.matchAll(/=(\d+)/g)].map(m => Number(m[1]));
      const balanced = 3 === 2 + c && a === 1 && 6 + 3 * a === 3 + 2 * d && 2 * b === c + d;
      expect(balanced).toBe(key === bz(5).answer);
    }
    expect(bz(9).originalContent!.body).toContain("H + O₂ + M → HO₂ + M ④");
    expect(bz(11).choices!.エ).toContain("最も高いもの：アンモニア、発火温度が最も低いもの：アセチレン");
    expect(1 / (.3 / 5 + .22 / 3 + .48 / 1.8)).toBeCloseTo(2.5);
    expect(bz(13).choices!.イ).toBe("メタン濃度30 vol %、エタン濃度22 vol %、ブタン濃度48 vol %");
  });

  it.each(["answer", "publicAllowed"] as const)("%sの破損を検出する", field => {
    const broken = structuredClone(otsu);
    if (field === "answer") broken[0].answer = broken[0].answer === "ア" ? "イ" : "ア";
    else broken[0].publicAllowed = true;
    expect(validateKhk2026Fill("otsu", broken).some(e => e.includes(field === "answer" ? "official answer differs" : "scope/publication state differs"))).toBe(true);
  });

  it("公開・同期・遅延配信及び化学画像許可リストへ混入させない", async () => {
    const ids = new Set([...otsu, ...kikai].map(q => q.id));
    expect([...otsu, ...kikai].every(q => q.publicAllowed === false)).toBe(true);
    for (const pool of [ALL_QUESTIONS, QUESTIONS_BY_EXAM["khk-kagaku"], QUESTIONS_BY_EXAM["khk-kikai-kou"], await getQuestionsForExam("khk-kagaku"), await getQuestionsForExam("khk-kikai-kou")]) {
      if (!pool) throw new Error("公開用プールが未定義");
      expect(pool.some(q => ids.has(q.id))).toBe(false);
    }
    expect(JSON.stringify(kagakuImages)).not.toMatch(/2026-(?:BX|BZ)/);
  });
});
