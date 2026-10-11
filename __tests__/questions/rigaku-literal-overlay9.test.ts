import { describe, expect, it } from "vitest";
import y2025 from "@/data/questions/rigaku-ryohoshi/2025-literal-overlay9.json";
import y2026 from "@/data/questions/rigaku-ryohoshi/2026-literal-overlay9.json";
import manifest from "@/data/questions/rigaku-ryohoshi/literal-overlay9-manifest.json";
import previous from "@/data/questions/rigaku-ryohoshi/remaining-ready-manifest.json";
import { RIGAKU_RYOHOUSHI_QUESTIONS } from "@/data/questions/rigaku-ryohoshi";

const rows = [...y2025, ...y2026];

describe("理学療法士の公式二列表記9問の局所復元", () => {
  it("前回HOLD25のうち指定9IDだけを新規登録し、残16を保留する", () => {
    expect(rows).toHaveLength(9);
    expect(RIGAKU_RYOHOUSHI_QUESTIONS).toHaveLength(179);
    const previousHeld = new Set(previous.heldIdentities);
    const resolved = new Set(rows.map((q) => manifest.sourceReceipts[q.id as keyof typeof manifest.sourceReceipts].identity));
    expect(resolved.size).toBe(9);
    for (const identity of resolved) expect(previousHeld.has(identity)).toBe(true);
    expect(previousHeld.size - resolved.size).toBe(manifest.remainingHeldFromRaw166);
    expect(manifest.latestTwoRoundsComplete).toBe(false);
    expect(manifest.publicGo).toBe(false);
  });

  it("公式キーと五肢の二列内容を保持し、編集者の罫線を残さない", () => {
    const keys = ["ア", "イ", "ウ", "エ", "オ"];
    for (const q of rows) {
      const receipt = manifest.sourceReceipts[q.id as keyof typeof manifest.sourceReceipts];
      expect(q.officialAnswerNumber).toBe(receipt.officialKeyCellLiteral);
      expect(q.requiredSelections).toBe(receipt.requiredSelections);
      expect(Object.keys(q.choices)).toEqual(keys);
      expect(Object.keys(q.choiceExplanations)).toEqual(keys);
      for (const key of keys) {
        const choice = q.choices[key as keyof typeof q.choices];
        expect(choice.includes("　"), q.id).toBe(true);
        expect(choice.includes("―") || choice.includes("─"), q.id).toBe(false);
        expect(q.choiceExplanations[key as keyof typeof q.choiceExplanations].trim(), q.id).not.toBe("");
      }
      expect(q.hasImage).toBe(false);
      expect(q.needsReview).toBe(false);
      expect(RIGAKU_RYOHOUSHI_QUESTIONS.find((item) => item.id === q.id)).toEqual(q);
    }
  });
});
