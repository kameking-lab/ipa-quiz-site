import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { RINSHO_KENSAGISHI_QUESTIONS } from "@/data/questions/rinsho-kensagishi";
import incoming from "@/data/questions/rinsho-kensagishi/pr759-remaining9.json";
import preexisting2025 from "@/data/questions/rinsho-kensagishi/2025-annual-pm-batch1.json";
import preexisting2026 from "@/data/questions/rinsho-kensagishi/2026-annual-pm-batch1.json";
import partial75 from "@/data/questions/rinsho-kensagishi/partial75-20261011.json";
import text3 from "@/data/questions/rinsho-kensagishi/public-text3-20261015.json";
import receipt from "@/docs/evidence/k9-pr759-20261110/RECHECK.json";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";

describe("PR759 partial adoption against current main", () => {
  it("adds only nine missing originals and preserves all 106 accepted questions", () => {
    const baseline = new Set([...preexisting2025, ...preexisting2026, ...partial75, ...text3].filter(q => !q.needsReview).map(q => q.id));
    const previous = RINSHO_KENSAGISHI_QUESTIONS.filter(q => baseline.has(q.id));
    expect(incoming).toHaveLength(9);
    expect(previous).toHaveLength(106);
    expect(createHash("sha256").update(JSON.stringify(previous)).digest("hex")).toBe(receipt.baselineSha256);
    for (const q of incoming) expect(RINSHO_KENSAGISHI_QUESTIONS.filter(item => item.id === q.id)).toEqual([q]);
    expect(new Set(RINSHO_KENSAGISHI_QUESTIONS.map(q => q.id)).size).toBe(RINSHO_KENSAGISHI_QUESTIONS.length);
  });

  it("retains official keys, selection counts and unchanged official figures", () => {
    for (const row of receipt.rows) {
      const q = RINSHO_KENSAGISHI_QUESTIONS.find(q => q.id === row.id)!;
      expect(q.answer).toEqual(row.answer);
      expect(q.officialAnswerNumber).toBe(row.officialAnswerNumber);
      expect(q.requiredSelections).toBe(row.requiredSelections);
      for (const image of row.images) {
        expect(q.imageUrls).toContain(image.url);
        expect(createHash("sha256").update(readFileSync(`public${image.url}`)).digest("hex")).toBe(image.sha256);
      }
    }
    for (const n of [12, 19]) {
      const q = RINSHO_KENSAGISHI_QUESTIONS.find(q => q.id === `rinsho-kensagishi-2025-annual-pm-q${n}`)!;
      expect(q.requiredSelections).toBe(1);
      const answers = q.answer as string[];
      for (const answer of answers) expect(isCompleteSelectionCorrect(q.answer, [answer], 1)).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, answers, 1)).toBe(false);
    }
  });
});
