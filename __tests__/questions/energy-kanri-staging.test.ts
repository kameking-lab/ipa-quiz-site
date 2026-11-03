import { describe, expect, it } from "vitest";
import { ENERGY_KANRI_STAGED_QUESTIONS as questions } from "@/data/questions/energy-kanri";
import sources from "@/data/qualification-staging/energy-kanri/sources.json";
import tables from "@/data/qualification-staging/energy-kanri/official-answers.json";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

describe("エネルギー管理士の未公開収録", () => {
  it("公式2回の全28資料と全62原問の正答表を保持する", () => {
    expect(sources.downloadedSources).toHaveLength(28);
    expect(new Set(sources.downloadedSources.map((s) => s.url)).size).toBe(28);
    expect(sources.unavailablePdfUrls).toEqual([]);
    expect(tables.flatMap((t) => t.questions)).toHaveLength(62);
    expect(tables.flatMap((t) => t.questions.flatMap((q) => q.slots))).toHaveLength(842);
    for (const source of sources.downloadedSources) {
      expect(source.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(source.bytes).toBeGreaterThan(0);
      expect(new URL(source.url).hostname).toBe("www.eccj.or.jp");
    }
    for (const table of tables) for (const q of table.questions) {
      const points = q.slots.reduce((sum, slot) => sum + (slot.points ?? 0), 0);
      const expected = table.packet === 1 && q.questionNumber === 3 ? 100
        : table.packet === 3 && [8, 9].includes(q.questionNumber) ? 30
        : table.packet === 4 && q.questionNumber >= 15 ? 40 : 50;
      expect(points, `${table.year}/${table.packet}/${q.questionNumber}`).toBe(expected);
    }
  });

  it("収録済み65解答単位を公式正答と照合し、全肢の理由と共通の指示を保持する", () => {
    expect(questions).toHaveLength(65);
    expect(new Set(questions.map((q) => q.id)).size).toBe(65);
    for (const q of questions) {
      const packet = q.session === "kyotsu" ? 1 : q.category === "電気計測" ? 5 : 3;
      const official = tables.find((t) => t.year === q.year && t.packet === packet)!
        .questions.find((p) => p.questionNumber === q.qNumber)!
        .slots.find((s) => s.label === q.officialAnswerNumber)!;
      expect(Array.isArray(q.answer) ? q.answer : [q.answer]).toEqual(official.answerText.split("、"));
      expect(Object.keys(q.choiceExplanations!).sort()).toEqual(Object.keys(q.choices!).sort());
      for (const reason of Object.values(q.choiceExplanations!)) expect(reason!.length).toBeGreaterThan(10);
      expect(q.originalContent?.sharedPassages?.[0].text).toContain(`問題${q.qNumber}`);
      if (q.session === "kyotsu") {
        expect(q.originalContent?.sharedPassages?.[0].text).toContain(`${q.year === 2025 ? "令和7" : "令和8"}年4月1日`);
        expect(q.lawReferenceDate).toBe(`${q.year}-04-01`);
      }
      if (q.hasImage) {
        expect(q.imageUrls?.length).toBe(q.imageAltTexts?.length);
        expect(q.imageUrls?.[0]).toContain("/images/energy-kanri/");
      }
    }
  });

  it("公式の複数正答と全員正解を区別する", () => {
    expect(questions.find((q) => q.year === 2025 && q.officialAnswerNumber === "2")!.answer).toEqual(["ア", "カ"]);
    const allCorrect = tables.find((t) => t.year === 2026 && t.packet === 6)!
      .questions.find((q) => q.questionNumber === 8)!.slots.find((s) => s.label === "8")!;
    expect(allCorrect.answerText).toBe("");
    expect("scoring" in allCorrect && allCorrect.scoring).toBe("all-correct");
  });

  it("未完成資格を公開せず、残る原問を明記する", () => {
    const entry = QUALIFICATION_CATALOG.find((q) => q.slug === "energy-kanri")!;
    expect(entry.status).toBe("ready-to-ingest");
    expect(entry.examCode).toBeUndefined();
    expect(entry.remainingWork.join(" ")).toContain("58原問777解答単位");
  });
});
