import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { KHK_2026_REITO_SECOND_STAGING as second, KHK_2026_REITO_THIRD_STAGING as third, validateKhk2026Fill3 } from "@/scripts/lib/validate-khk-2026-fill-3";
import { KHK_2026_REITO_FIRST_STAGING as first } from "@/scripts/lib/validate-khk-2026-fill-2";
import stored from "@/data/qualification-staging/khk-reito/2026-second/questions.json";
import refs from "@/data/qualification-staging/khk-reito/2026-second/shared-question-references.json";

describe("高圧ガス2026 第二種・第三種冷凍機械の非公開原本", () => {
  it("75出題と375肢を検証し、公式正答表の独立転記に一致する", () => {
    expect(validateKhk2026Fill3("reito-second")).toEqual([]);
    expect(validateKhk2026Fill3("reito-third")).toEqual([]);
    expect(second).toHaveLength(40);
    expect(third).toHaveLength(35);
    expect([...second, ...third].flatMap(q => Object.values(q.choiceExplanations!))).toHaveLength(375);
    // Read from the official answer-table image, independently of the key JSON.
    for (const [paper, session, numbers] of [
      [second, "houki", "44533234222545413113"],
      [second, "hoan", "3211434255"],
      [second, "gakushiki", "1145243345"],
      [third, "houki", "32524524335445121233"],
      [third, "hoan", "142513323524125"],
    ] as const) {
      expect(paper.filter(q => q.session === session).sort((a, b) => a.qNumber - b.qNumber).map(q => q.officialAnswerNumber).join("")).toBe(numbers);
    }
  });

  it("10共通出題を参照し、問9と問10には第二種側の設例範囲を適用する", () => {
    expect(stored).toHaveLength(30);
    expect(refs).toHaveLength(10);
    const a = second.find(q => q.session === "houki" && q.qNumber === 9)!;
    const b = first.find(q => q.session === "houki" && q.qNumber === 9)!;
    expect(a.originalContent!.body).toBe(b.originalContent!.body);
    expect(a.explanation).toBe(b.explanation);
    expect(a.id).not.toBe(b.id);
    expect(a.sourcePdfUrl).toContain("/R8HX.pdf");
    expect(a.originalContent!.sharedPassages![0].text).toContain("問9から問14");
    expect(b.originalContent!.sharedPassages![0].text).toContain("問9から問13");
    for (const n of [9, 10, 14]) {
      const q = second.find(q => q.session === "houki" && q.qNumber === n)!;
      expect(q.question).toContain("250トン");
      expect(q.imageUrls![0]).toContain("HX-shared-1");
    }
    expect(second.find(q => q.session === "houki" && q.qNumber === 15)!.question).toContain("600トン");
    expect(third.every(q => q.originalContent!.sharedPassages!.length === 0)).toBe(true);
  });

  it("p-h線図と条件表を保持し、計算結果と時間単位を検証する", () => {
    const q1 = second.find(q => q.session === "gakushiki" && q.qNumber === 1)!;
    const q2 = second.find(q => q.session === "gakushiki" && q.qNumber === 2)!;
    expect(q1.imageUrls![0]).toContain("HZ-q1");
    expect(q1.imageAltTexts![0]).toContain("h=253 kJ/kg");
    expect(240 / (413 - 253)).toBe(1.5);
    expect(413 + 60 / 1.5).toBe(453);
    expect(q1.explanation).toContain("300/60=5");
    const mass = 200 / (1450 - 325);
    expect(mass * .6 * 3600 / .75).toBeCloseTo(512, 8);
    const cop = 200 / (mass * (1710 - 1450) / (.8 * .9));
    expect(cop).toBeCloseTo(3.11538, 5);
    expect(q2.choices!.ア).toContain("513 m³/h");
    expect(q2.choices!.ア).toContain("3.1");
    expect(q2.explanation).toContain("512 m³/h");
    expect(q2.imageUrls![0]).toContain("HZ-q2");
    expect(q2.question).toContain("\n\n圧縮機の体積効率");
  });

  it("製造者と免状の能力範囲、耐圧試験、安全装置を区別する", () => {
    const law = (n: number) => third.find(q => q.session === "houki" && q.qNumber === n)!;
    expect(law(8).explanation).toContain("30トンであり、第二種製造者");
    expect(law(9).explanation).toContain("100トン未満");
    expect(law(9).explanation).toContain("50トンの施設なら");
    expect(law(10).explanation).toContain("原則3年に1回");
    expect(second.find(q => q.session === "houki" && q.qNumber === 16)!.explanation).toContain("Bを含めて1年に1回以上");
    expect(second.find(q => q.session === "hoan" && q.qNumber === 8)!.explanation).toContain("破裂板を選ぶことはできない");
    expect(third.find(q => q.session === "hoan" && q.qNumber === 13)!.explanation).toContain("配管以外の部分");
  });

  it.each(["answer", "publicAllowed", "originalContent", "questionNotice"] as const)("%sの破損を検出する", field => {
    const broken = structuredClone(third);
    if (field === "answer") broken[0].answer = broken[0].answer === "ア" ? "イ" : "ア";
    else if (field === "publicAllowed") broken[0].publicAllowed = true;
    else if (field === "originalContent") broken[0].originalContent!.body += "改変";
    else broken[0].questionNotice = "改変";
    expect(validateKhk2026Fill3("reito-third", broken).length).toBeGreaterThan(0);
  });

  it("公開・遅延ロード・同期データに2026出題を混入させない", async () => {
    const ids = new Set([...second, ...third].map(q => q.id));
    expect([...second, ...third].every(q => q.publicAllowed === false && !q.needsReview)).toBe(true);
    for (const pool of [ALL_QUESTIONS, QUESTIONS_BY_EXAM["khk-reito-2"], QUESTIONS_BY_EXAM["khk-reito-3"], await getQuestionsForExam("khk-reito-2"), await getQuestionsForExam("khk-reito-3")]) {
      if (!pool) throw new Error("公開用プールが未定義");
      expect(pool.some(q => ids.has(q.id))).toBe(false);
    }
  });
});
