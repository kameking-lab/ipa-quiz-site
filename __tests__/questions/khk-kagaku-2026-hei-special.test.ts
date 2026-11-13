import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "@/data/qualification-staging/khk-kagaku/2026-hei-special/manifest.json";
import review from "@/data/qualification-staging/khk-kagaku/2026-hei-special/review.json";
import references from "@/data/qualification-staging/khk-kagaku/2026-hei-special/shared-question-references.json";
import storedQuestions from "@/data/qualification-staging/khk-kagaku/2026-hei-special/questions.json";
import lpgQuestions from "@/data/qualification-staging/khk-kagaku/2026-hei-lpg/questions.json";
import ready from "@/data/questions/khk-kagaku/ready.json";
import publicQuestions from "@/data/questions/khk-kagaku/public-questions.json";
import imageAllowlist from "@/data/questions/khk-kagaku/image-assets.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { KHK_2026_HEI_SPECIAL_STAGING, validateKhk2026HeiSpecialStaging } from "@/scripts/lib/validate-khk-kagaku-2026-hei-special";

describe("2026 KHK hei-special private source corpus", () => {
  it("preserves all 60 occurrences, official keys, verified content and three source tables", () => {
    expect(validateKhk2026HeiSpecialStaging()).toEqual([]);
    expect(review.questions).toHaveLength(60);
    expect(review.assets).toHaveLength(3);
    expect(KHK_2026_HEI_SPECIAL_STAGING.flatMap(q => Object.values(q.choiceExplanations!))).toHaveLength(300);
    const shared = KHK_2026_HEI_SPECIAL_STAGING.filter(q => q.originalContent?.sharedPassages?.length);
    expect(shared).toHaveLength(13);
    for (const q of shared) {
      expect(q.question).toContain(q.originalContent!.sharedPassages![0].text);
      expect(q.question).toContain(q.qNumber <= 9 ? "100,000,000" : "350,000");
      expect(review.assets.some(x => x.futureImageUrl === q.imageUrls![0])).toBe(true);
    }
    const table = KHK_2026_HEI_SPECIAL_STAGING.find(q => q.session === "khk-dz" && q.qNumber === 7)!;
    expect(table.answer).toBe("ウ");
    expect(table.choices!["ウ"]).toBe("ロ>イ>ハ ロ>ハ>イ");
    expect(table.question).toContain("選択肢は左が爆発下限界、右が最小発火エネルギーの最低値");
  });

  it("reuses four LPG originals without duplicating bodies or explanations", () => {
    expect(storedQuestions).toHaveLength(56);
    expect(references.map(x => [x.occurrence.qNumber, x.existingQuestionId])).toEqual([
      [2, "khk-kagaku-2026-annual-cx-q2"], [3, "khk-kagaku-2026-annual-cx-q3"],
      [4, "khk-kagaku-2026-annual-cx-q4"], [7, "khk-kagaku-2026-annual-cx-q7"],
    ]);
    for (const ref of references) {
      expect(ref).not.toHaveProperty("originalContent");
      expect(ref.occurrence).not.toHaveProperty("explanation");
      const existing = lpgQuestions.find(q => q.id === ref.existingQuestionId)!;
      const resolved = KHK_2026_HEI_SPECIAL_STAGING.find(q => q.id === ref.id)!;
      expect(resolved.originalContent).toBe(existing.originalContent);
      expect(resolved.choiceExplanations).toBe(existing.choiceExplanations);
      expect(resolved.sourcePdfUrl).toMatch(/R8DX\.pdf$/);
    }
  });

  it("keeps staged occurrences and source images out of all serving pools", async () => {
    const ids = new Set(KHK_2026_HEI_SPECIAL_STAGING.map(q => q.id));
    expect(manifest.publicAllowed).toBe(false);
    expect(KHK_2026_HEI_SPECIAL_STAGING.every(q => q.publicAllowed === false)).toBe(true);
    for (const pool of [ready, publicQuestions, QUESTIONS_BY_EXAM["khk-kagaku"], await getQuestionsForExam("khk-kagaku")]) {
      expect(pool!.some(q => ids.has(q.id))).toBe(false);
    }
    const loader = readFileSync(resolve("data/questions/khk-kagaku/assets.server.ts"), "utf8");
    for (const asset of review.assets) {
      expect(imageAllowlist).not.toContain(asset.file);
      expect(loader).not.toContain(asset.file.split("/").at(-1));
    }
  });

  it("recomputes six numeric answers using the printed quantities and pressure convention", () => {
    const results = new Map([
      [2, 10 / 32 * 22.4], [4, (1 + 0.1013) * (300 + 273.15) / (20 + 273.15) - 0.1013],
      [6, (20 * 4.19 * 75 + 20 * 2260) / 1000], [8, 100 / (1 + 2 / 0.21)],
      [13, 1.1 * 1 * 100 / 0.1 / 1000], [15, 120000 / (Math.PI * 30 ** 2 / 4)],
    ]);
    for (const [n, value] of results) {
      const q = KHK_2026_HEI_SPECIAL_STAGING.find(q => q.session === "khk-dz" && q.qNumber === n)!;
      const values = Object.entries(q.choices!).map(([key, text]) => [key, Number.parseFloat(text!)] as const);
      const nearest = values.reduce((a, b) => Math.abs(a[1] - value) < Math.abs(b[1] - value) ? a : b);
      expect(nearest[0]).toBe(q.answer);
      expect(review.calculationChecks.find(x => x.id === q.id)!.result).toBeCloseTo(value, 8);
      expect(q.isCalculation).toBe(true);
    }
  });
});
