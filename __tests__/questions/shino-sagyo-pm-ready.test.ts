import { describe, expect, it } from "vitest";
import { SAGYO_RYOHOSHI_QUESTIONS } from "@/data/questions/sagyo-ryohoshi";
import { SHINO_KUNRENSHI_QUESTIONS } from "@/data/questions/shino-kunrenshi";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import integration from "@/docs/evidence/shino-sagyo-pm-ready-20261010/INTEGRATION.json";

const choiceKeys = ["ア", "イ", "ウ", "エ", "オ"] as const;

describe("作業療法士・視能訓練士 午後の部分収録", () => {
  it.each([
    ["sagyo-ryohoshi", SAGYO_RYOHOSHI_QUESTIONS],
    ["shino-kunrenshi", SHINO_KUNRENSHI_QUESTIONS],
  ] as const)("%s は原典照合済み60問のみ公開する", async (exam, questions) => {
    const loaded = await getQuestionsForExam(exam);
    expect(loaded).toEqual(questions);
    expect(loaded).toHaveLength(60);
    expect(new Set(loaded.map((question) => question.id)).size).toBe(60);
    expect(loaded.every((question) => question.session === "pm")).toBe(true);
    expect(new Set(loaded.map((question) => question.year))).toEqual(new Set([2024, 2025]));

    for (const question of loaded) {
      expect(question.needsReview).toBe(false);
      expect(question.hasImage).toBe(false);
      expect(question.sourcePdfUrl).toContain("mhlw.go.jp/");
      expect(question.sourceAnswerUrl).toContain("mhlw.go.jp/");
      expect(choiceKeys.every((key) => Boolean(question.choices?.[key]?.trim()))).toBe(true);
      expect(choiceKeys.every((key) => Boolean(question.choiceExplanations?.[key]?.trim()))).toBe(true);
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers).toHaveLength(question.requiredSelections ?? 1);
      expect(answers.every((answer) => choiceKeys.includes(answer as typeof choiceKeys[number]))).toBe(true);
      expect(question.officialAnswerNumber).toMatch(/^[1-5]{1,2}$/);
      expect(answers.map((answer) => String(choiceKeys.indexOf(answer as typeof choiceKeys[number]) + 1)).join(""))
        .toBe(question.officialAnswerNumber);
    }
  });

  it("別冊・図・専門根拠・代替キーの保留問は runtime へ入らない", () => {
    const all = [...SAGYO_RYOHOSHI_QUESTIONS, ...SHINO_KUNRENSHI_QUESTIONS];
    const identities = new Set(all.map((question) => {
      const round = question.exam === "sagyo-ryohoshi"
        ? (question.year === 2025 ? 61 : 60)
        : (question.year === 2025 ? 56 : 55);
      return `${question.exam}-${round}-pm-${question.qNumber}`;
    }));
    expect(all).toHaveLength(120);
    expect(integration.draftOriginals).toBe(135);
    expect(integration.heldDrafts).toHaveLength(15);
    expect(integration.excludedBeforeDraft).toHaveLength(9);
    expect(integration.readyProvenance).toHaveLength(120);
    for (const held of [...integration.heldDrafts, ...integration.excludedBeforeDraft]) {
      expect(identities.has(held.identity)).toBe(false);
    }
  });
});
