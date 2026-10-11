import { describe, expect, it } from "vitest";
import { SAGYO_RYOHOSHI_QUESTIONS } from "@/data/questions/sagyo-ryohoshi";
import { SHINO_KUNRENSHI_QUESTIONS } from "@/data/questions/shino-kunrenshi";
import pm from "@/docs/evidence/shino-sagyo-pm01-20-ready-20261010/INTEGRATION.json";

const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;

describe("作業療法士・視能訓練士 午後1〜20の局所追加", () => {
  it.each([
    ["sagyo-ryohoshi", SAGYO_RYOHOSHI_QUESTIONS, 17],
    ["shino-kunrenshi", SHINO_KUNRENSHI_QUESTIONS, 17],
  ] as const)("%s の図・専門根拠待ちを除いた原問", (exam, questions, expected) => {
    const newIds = new Set(pm.readyProvenance.filter(record => record.identity.startsWith(exam)).map(record => {
      const match = record.identity.match(/-(\d+)-pm-(\d+)$/)!;
      const year = match[1] === "61" || match[1] === "56" ? 2025 : 2024;
      return `${exam}-${year}-annual-pm-q${match[2]}`;
    }));
    expect(newIds.size).toBe(expected);
    const ready = questions.filter(question => newIds.has(question.id));
    expect(ready).toHaveLength(expected);
    for (const question of ready) {
      expect(question.session).toBe("pm");
      expect(question.hasImage).toBe(false);
      expect(question.needsReview).toBe(false);
      expect(question.sourceAttribution).toContain("午後");
      expect(keys.every(key => Boolean(question.choices?.[key]?.trim()))).toBe(true);
      expect(keys.every(key => Boolean(question.choiceExplanations?.[key]?.trim()))).toBe(true);
      const answer = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answer).toHaveLength(question.requiredSelections ?? 1);
      expect(answer.map(value => String(keys.indexOf(value as typeof keys[number]) + 1)).join(""))
        .toBe(question.officialAnswerNumber);
    }
  });
  it("今回の保留4稿・未生成42問を公開集合に混ぜない", () => {
    expect(pm.draftOriginals).toBe(38);
    expect(pm.readyProvenance).toHaveLength(34);
    expect(pm.heldDrafts).toHaveLength(4);
    expect(pm.excludedBeforeDraft).toHaveLength(42);
    const all = [...SAGYO_RYOHOSHI_QUESTIONS, ...SHINO_KUNRENSHI_QUESTIONS];
    expect(all).toHaveLength(485);
    for (const record of [...pm.heldDrafts, ...pm.excludedBeforeDraft]) {
      const match = record.identity.match(/^(.+)-(\d+)-pm-(\d+)$/)!;
      const year = match[2] === "61" || match[2] === "56" ? 2025 : 2024;
      expect(all.some(question => question.id === `${match[1]}-${year}-annual-pm-q${match[3]}`)).toBe(false);
    }
  });
});
