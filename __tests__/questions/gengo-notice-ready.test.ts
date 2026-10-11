import { describe, expect, it } from "vitest";
import raw from "@/data/questions/gengo-chokakushi/official-notice-ready.json";
import manifest from "@/data/questions/gengo-chokakushi/source-manifest.json";
import keys from "@/docs/evidence/gengo-latest-two-20261011/OFFICIAL-ANSWER-KEY400.json";
import { GENGO_CHOKAKUSHI_QUESTIONS } from "@/data/questions/gengo-chokakushi";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { choiceDisplayLabel } from "@/lib/questions/display";
import type { Question } from "@/lib/questions/types";

const manuscripts = raw as Question[];
const choiceKeys = ["ア", "イ", "ウ", "エ", "オ"] as const;
// These five alternate-answer cells were read directly from the official PDFs.
const expected = {
  "2025-40": ["ウ", "エ"], "2026-14": ["エ", "オ"],
  "2026-35": ["ア", "ウ"], "2026-69": ["ア", "イ"], "2026-83": ["ア", "イ"],
};

describe("language therapist official-notice intake", () => {
  it("accounts for 400 original identities without treating answer keys as completed questions", () => {
    expect(keys.entries).toHaveLength(400);
    expect(new Set(keys.entries.map(q => q.id)).size).toBe(400);
    for (const year of [2025, 2026]) for (const session of ["am", "pm"]) {
      const sitting = keys.entries.filter(q => q.year === year && q.session === session);
      expect(sitting.map(q => q.number)).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
    }
    expect(keys.entries.filter(q => q.excluded).map(q => q.id)).toEqual([
      "gengo-chokakushi-2025-annual-am-q36", "gengo-chokakushi-2025-annual-am-q48",
    ]);
    expect(keys.entries.filter(q => q.acceptedAnswerSets.length > 1)).toHaveLength(5);
    expect(manifest.missingIds).toHaveLength(393);
    expect(manifest.officiallyExcluded + manifest.missingOriginals + manuscripts.length).toBe(400);
    expect(manifest.currentPublicIncrement).toBe(0);
    expect(manifest.fullLatestTwoComplete).toBe(false);
    expect(manifest.acquisitionStop.httpStatus).toBe(403);
  });

  it("preserves five original notices, all 25 explanations and final alternate keys", () => {
    expect(manuscripts).toHaveLength(5);
    expect(new Set(manuscripts.map(q => q.id)).size).toBe(5);
    for (const q of manuscripts) {
      expect(q.answer).toEqual(expected[`${q.year}-${q.qNumber}` as keyof typeof expected]);
      expect(q.id).toBe(`gengo-chokakushi-${q.year}-annual-am-q${q.qNumber}`);
      expect(Object.keys(q.choices ?? {})).toEqual(choiceKeys);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(choiceKeys);
      for (const key of choiceKeys) expect(q.choiceExplanations?.[key]?.length).toBeGreaterThan(10);
      expect(q.explanationCoverage).toBe("full");
      expect(q.hasImage).toBe(false);
      expect(q.sourcePdfUrl).toMatch(/https:\/\/www\.mhlw\.go\.jp\/general\/sikaku\/successlist\/(2025|2026)\/siken21\/dl\/(27|28)A\d+\.pdf#page=1$/);
      expect(q.sourceAttribution).toContain(`第${q.year === 2025 ? 27 : 28}回`);
      expect(q.sourceAnswerUrl).toContain(`${q.year === 2025 ? 27 : 28}seitou.pdf`);
      expect(manifest.missingIds).not.toContain(q.id);
    }
    expect(choiceDisplayLabel("gengo-chokakushi", "ア")).toBe("1");
    expect(choiceDisplayLabel("gengo-chokakushi", "オ")).toBe("5");
  });

  it("accepts either single alternate answer and rejects selecting both", () => {
    for (const q of manuscripts) {
      expect(q.requiredSelections).toBe(1);
      const answer = q.answer as string[];
      for (const key of answer) expect(isCompleteSelectionCorrect(q.answer, [key], q.requiredSelections)).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, answer, q.requiredSelections)).toBe(false);
      const wrong = choiceKeys.find(key => !answer.includes(key))!;
      expect(isCompleteSelectionCorrect(q.answer, [wrong], q.requiredSelections)).toBe(false);
    }
  });

  it("keeps locally unresolved explanations and official exclusions out of the practice candidate set", () => {
    expect(GENGO_CHOKAKUSHI_QUESTIONS.map(q => q.id)).toEqual([
      "gengo-chokakushi-2026-annual-am-q14", "gengo-chokakushi-2026-annual-am-q69", "gengo-chokakushi-2025-annual-am-q40",
    ]);
    expect(new Set(GENGO_CHOKAKUSHI_QUESTIONS.map(q => q.id))).toEqual(new Set(manifest.practiceEligibleIds));
    expect(GENGO_CHOKAKUSHI_QUESTIONS).toHaveLength(3);
    expect(manuscripts.filter(q => q.needsReview).map(q => q.id)).toEqual(manifest.localReviewIds);
    expect(manifest.localReviewIds).toHaveLength(2);
    for (const excluded of [...manifest.excludedIds, ...manifest.localReviewIds]) {
      expect(GENGO_CHOKAKUSHI_QUESTIONS.map(q => q.id)).not.toContain(excluded);
    }
    const q69 = manuscripts.find(q => q.qNumber === 69)!;
    expect(q69.needsReview).toBe(false);
    expect(q69.choiceExplanations?.ア).toContain("標準的な読み課題");
    expect(q69.officialReferenceUrls).toContain("https://www.mext.go.jp/content/20210916-mxt_kyokasyo01-000024786_008.pdf#page=11");
    const q83 = manuscripts.find(q => q.qNumber === 83)!;
    expect(q83.choiceExplanations?.ア).toContain("喉頭挙上への作用を否定して覚えない");
  });
});
