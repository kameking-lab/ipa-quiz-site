import { describe, expect, it } from "vitest";
import { ENERGY_KANRI_STAGED_QUESTIONS as questions } from "@/data/questions/energy-kanri";
import sources from "@/data/qualification-staging/energy-kanri/sources.json";
import tables from "@/data/qualification-staging/energy-kanri/official-answers.json";
import type { ChoiceKey } from "@/lib/questions/types";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { existsSync } from "node:fs";
import { join } from "node:path";
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

  it("収録済み10原問128公式解答欄を照合し、全肢解説・原問指示・図を保持する", () => {
    expect(questions).toHaveLength(125);
    expect(new Set(questions.map((q) => q.id)).size).toBe(125);
    for (const q of questions) {
      const packet = q.session === "kyotsu" ? 1 : q.category === "電気計測" ? 5 : 3;
      const original = tables.find((t) => t.year === q.year && t.packet === packet)!
        .questions.find((p) => p.questionNumber === q.qNumber)!;
      const labels = q.officialAnswerNumber!.split(",");
      const expected = labels.flatMap((label) => original.slots.find((slot) => slot.label === label)!.answerText.split("、"));
      expect(Array.isArray(q.answer) ? q.answer : [q.answer]).toEqual(expected);
      if (labels.length > 1) {
        expect(q.requiredSelections).toBe(labels.length);
        expect("unorderedSlotGroups" in original && original.unorderedSlotGroups).toContainEqual(labels);
        expect(q.questionNotice).toContain("順序不問");
      } else expect(q.requiredSelections ?? 1).toBe(1);
      expect(Object.keys(q.choiceExplanations!).sort()).toEqual(Object.keys(q.choices!).sort());
      for (const reason of Object.values(q.choiceExplanations!)) expect(reason!.length).toBeGreaterThan(10);
      expect(q.originalContent?.sharedPassages?.[0].text).toContain(`問題${q.qNumber}`);
      if (q.session === "kyotsu" && q.qNumber === 3) {
        expect(q.originalContent?.sharedPassages?.[0].text).toContain(`${q.year === 2025 ? "令和7" : "令和8"}年4月1日`);
        expect(q.lawReferenceDate).toBe(`${q.year}-04-01`);
      }
      if (q.hasImage) {
        expect(q.imageUrls?.length).toBe(q.imageAltTexts?.length);
        expect(q.imageUrls?.[0]).toContain("/images/energy-kanri/");
        for (const url of q.imageUrls!) expect(existsSync(join(process.cwd(), "public", url))).toBe(true);
      }
    }
  });

  it("原問ごとの全解答欄を過不足なく保持し、順序不問ペアを重複なく採点する", () => {
    const manifest = [
      [2025, 1, 2], [2025, 1, 3], [2025, 3, 8], [2025, 3, 9], [2025, 5, 6],
      [2026, 1, 2], [2026, 1, 3], [2026, 3, 8], [2026, 3, 9], [2026, 5, 6],
    ];
    let slotCount = 0;
    for (const [year, packet, num] of manifest) {
      const url = `r${String(year - 2018).padStart(2, "0")}_${packet}.pdf#`;
      const records = questions.filter((q) => q.year === year && q.qNumber === num && q.sourcePdfUrl?.includes(url));
      const labels = records.flatMap((q) => q.officialAnswerNumber!.split(","));
      const official = tables.find((t) => t.year === year && t.packet === packet)!.questions.find((q) => q.questionNumber === num)!;
      expect(labels).toEqual(official.slots.map((s) => s.label));
      expect(new Set(labels).size).toBe(labels.length);
      slotCount += labels.length;
    }
    expect(slotCount).toBe(128);
    const pairs = questions.filter((q) => q.requiredSelections === 2);
    expect(pairs).toHaveLength(3);
    for (const q of pairs) {
      const answers = q.answer as ChoiceKey[];
      expect(isCompleteSelectionCorrect(answers, answers, 2)).toBe(true);
      expect(isCompleteSelectionCorrect(answers, [...answers].reverse(), 2)).toBe(true);
      expect(isCompleteSelectionCorrect(answers, [answers[0]], 2)).toBe(false);
      expect(isCompleteSelectionCorrect(answers, [answers[0], answers[0]], 2)).toBe(false);
      expect(isCompleteSelectionCorrect(answers, ["ア", "イ"], 2)).toBe(false);
    }
    const infrared = pairs.find((q) => q.year === 2026 && q.officialAnswerNumber === "7,8")!;
    expect(infrared.choiceFactTruth?.オ).toBe(true);
    expect(infrared.choiceExplanations?.オ).toContain("H₂Oにも赤外線吸収");
  });

  it("公式の複数正答と全員正解を区別する", () => {
    expect(questions.find((q) => q.year === 2025 && q.session === "kyotsu" && q.qNumber === 3 && q.officialAnswerNumber === "2")!.answer).toEqual(["ア", "カ"]);
    const allCorrect = tables.find((t) => t.year === 2026 && t.packet === 6)!
      .questions.find((q) => q.questionNumber === 8)!.slots.find((s) => s.label === "8")!;
    expect(allCorrect.answerText).toBe("");
    expect("scoring" in allCorrect && allCorrect.scoring).toBe("all-correct");
  });

  it("未完成資格を公開せず、残る原問を明記する", () => {
    const entry = QUALIFICATION_CATALOG.find((q) => q.slug === "energy-kanri")!;
    expect(entry.status).toBe("ready-to-ingest");
    expect(entry.examCode).toBeUndefined();
    expect(entry.remainingWork.join(" ")).toContain("52原問714解答欄");
  });
});
