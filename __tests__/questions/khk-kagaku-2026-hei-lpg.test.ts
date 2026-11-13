import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "@/data/qualification-staging/khk-kagaku/2026-hei-lpg/manifest.json";
import review from "@/data/qualification-staging/khk-kagaku/2026-hei-lpg/review.json";
import ready from "@/data/questions/khk-kagaku/ready.json";
import publicQuestions from "@/data/questions/khk-kagaku/public-questions.json";
import imageAllowlist from "@/data/questions/khk-kagaku/image-assets.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { KHK_2026_HEI_LPG_STAGING, validateKhk2026HeiLpgStaging } from "@/scripts/lib/validate-khk-kagaku-2026-hei-lpg";

describe("2026 KHK hei-lpg private source corpus", () => {
  it("preserves 60 originals, exact official keys, source digests and two source tables", () => {
    expect(validateKhk2026HeiLpgStaging()).toEqual([]);
    expect(review.questions).toHaveLength(60);
    expect(review.assets).toHaveLength(2);
    expect(KHK_2026_HEI_LPG_STAGING.flatMap(q => Object.values(q.choiceExplanations!))).toHaveLength(300);
    const shared = KHK_2026_HEI_LPG_STAGING.filter(q => q.originalContent?.sharedPassages?.length);
    expect(shared).toHaveLength(13);
    for (const q of shared) {
      const passage = q.originalContent?.sharedPassages?.[0];
      expect(passage).toBeDefined();
      expect(q.question).toContain(passage!.text);
      const asset = review.assets.find(x => x.futureImageUrl === q.imageUrls![0]);
      expect(asset).toBeDefined();
      expect(passage!.text).toContain(q.qNumber <= 16 ? "550,000" : "100,000");
    }
  });

  it("keeps staged IDs out of public, internal-ready, synchronous and lazy serving pools", async () => {
    const stagedIds = new Set(KHK_2026_HEI_LPG_STAGING.map(q => q.id));
    expect(manifest.publicAllowed).toBe(false);
    expect(KHK_2026_HEI_LPG_STAGING.every(q => q.publicAllowed === false)).toBe(true);
    for (const pool of [ready, publicQuestions, QUESTIONS_BY_EXAM["khk-kagaku"], await getQuestionsForExam("khk-kagaku")]) {
      expect(pool!.some(q => stagedIds.has(q.id))).toBe(false);
    }
    for (const asset of review.assets) {
      expect(imageAllowlist).not.toContain(asset.file);
    }
    const assetLoader = readFileSync(resolve("data/questions/khk-kagaku/assets.server.ts"), "utf8");
    expect(assetLoader).not.toContain("2026-CX-shared-");
  });

  it("independently recomputes all five numeric answers with printed units and pressure conventions", () => {
    const results = new Map([
      [2, (7 / 44 + 3 / 58) * 22.4],
      [4, (0.6 / 44) * 0.008314 * 290.15 / 0.047 - 0.1013],
      [8, (50 / 58) / (20 / 30 + 30 / 44 + 50 / 58) * 100],
      [10, 0.35 * 1.0713 + 0.65 * 0.2813 - 0.1013],
      [15, (3 / 44) * 5 * 22.4 / 0.21],
    ]);
    for (const [number, result] of results) {
      const q = KHK_2026_HEI_LPG_STAGING.find(q => q.session === "khk-cz" && q.qNumber === number)!;
      const optionValues = Object.entries(q.choices!).map(([key, text]) => [key, Number.parseFloat(text!)] as const);
      const nearest = optionValues.reduce((a, b) => Math.abs(a[1] - result) < Math.abs(b[1] - result) ? a : b);
      expect(nearest[0]).toBe(q.answer);
      expect(review.calculationChecks.find(x => x.id === q.id)!.result).toBeCloseTo(result, 8);
      expect(q.isCalculation).toBe(true);
    }
  });

  it("retains the official answer for the material-property question while tracking technical review", () => {
    const q = KHK_2026_HEI_LPG_STAGING.find(q => q.id === review.technicalReview.questionId)!;
    expect(q.officialAnswerNumber).toBe("4");
    expect(q.answer).toBe("エ");
    expect(q.choices!["エ"]).toBe("イ、ロ、ニ");
    expect(q.originalContent!.body).toContain("耐寒性");
    expect(q.needsReview).toBe(true);
    for (const text of [q.explanation, ...Object.values(q.choiceExplanations!)]) {
      expect(text).toContain("一般的なFKMは耐寒性に制約");
      expect(text).not.toContain("ロ：正しい。");
    }
    expect(manifest.technicalReviewPendingIds).toEqual([q.id]);
    expect(KHK_2026_HEI_LPG_STAGING.filter(q => !q.needsReview)).toHaveLength(59);
  });
});
