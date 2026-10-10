import { describe, expect, it } from "vitest";
import new2025 from "@/data/questions/rigaku-ryohoshi/2025-remaining-ready.json";
import new2026 from "@/data/questions/rigaku-ryohoshi/2026-remaining-ready.json";
import old2025 from "@/data/questions/rigaku-ryohoshi/2025-annual.json";
import old2026 from "@/data/questions/rigaku-ryohoshi/2026-annual.json";
import manifest from "@/data/questions/rigaku-ryohoshi/remaining-ready-manifest.json";
import { RIGAKU_RYOHOUSHI_QUESTIONS } from "@/data/questions/rigaku-ryohoshi";

const rows = [...new2025, ...new2026];
const kana = ["ア", "イ", "ウ", "エ", "オ"];

describe("理学療法士第61・60回の後続原本照合済み141原問", () => {
  it("旧29問を内容変更せず保持し、新141問と保留25問を混同しない", () => {
    const previous = [...old2026, ...old2025];
    const byId = new Map(RIGAKU_RYOHOUSHI_QUESTIONS.map((q) => [q.id, q]));
    expect(previous).toHaveLength(29);
    for (const q of previous) expect(byId.get(q.id)).toEqual(q);
    expect(rows).toHaveLength(141);
    expect(RIGAKU_RYOHOUSHI_QUESTIONS).toHaveLength(170);
    expect(new Set(RIGAKU_RYOHOUSHI_QUESTIONS.map((q) => q.id)).size).toBe(170);
    expect(manifest.newRawOriginals).toBe(manifest.newReadyOriginals + manifest.heldWithinNewRaw);
    expect(manifest.newReadyOriginals).toBe(rows.length);
    expect(manifest.latestTwoRoundsComplete).toBe(false);
    expect(manifest.publicGo).toBe(false);
    const held = new Set(manifest.heldIdentities);
    expect(held.size).toBe(25);
    for (const q of rows) {
      const receipt = manifest.sourceReceipts[q.id as keyof typeof manifest.sourceReceipts];
      expect(receipt, q.id).toBeDefined();
      expect(held.has(receipt.identity), q.id).toBe(false);
      expect(q.officialAnswerNumber, q.id).toBe(receipt.officialKeyCellLiteral);
      expect(q.requiredSelections, q.id).toBe(receipt.requiredSelections);
    }
  });

  it("年度・午前午後・公式キー・五肢全解説を完全なまま登録する", () => {
    const counts = { "2025-am": 0, "2025-pm": 0, "2026-am": 0, "2026-pm": 0 };
    let selectionsTwo = 0;
    for (const q of rows) {
      const group = `${q.year}-${q.session}` as keyof typeof counts;
      counts[group]++;
      expect(q.id).toBe(`rigaku-ryohoshi-${q.year}-annual-${q.session}-q${q.qNumber}`);
      expect(q.question.trim()).not.toBe("");
      expect(Object.keys(q.choices)).toEqual(kana);
      expect(Object.keys(q.choiceExplanations)).toEqual(kana);
      for (const key of kana) {
        expect(q.choices[key as keyof typeof q.choices].trim(), q.id).not.toBe("");
        expect(q.choiceExplanations[key as keyof typeof q.choiceExplanations].trim(), q.id).not.toBe("");
      }
      expect(q.explanation.trim(), q.id).not.toBe("");
      expect(q.hasImage).toBe(false);
      expect(q.needsReview).toBe(false);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      const answer = Array.isArray(q.answer) ? q.answer : [q.answer];
      expect(answer).toHaveLength(q.requiredSelections);
      if (answer.length === 2) selectionsTwo++;
    }
    expect(counts).toEqual(manifest.newReadyByYearSession);
    expect(selectionsTwo).toBe(manifest.newReadyTwoSelectionOriginals);
    expect(rows.reduce((n, q) => n + Object.keys(q.choices).length, 0)).toBe(705);
  });
});
