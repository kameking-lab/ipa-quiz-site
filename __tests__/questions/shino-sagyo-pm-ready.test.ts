import { describe, expect, it } from "vitest";
import { SAGYO_RYOHOSHI_QUESTIONS } from "@/data/questions/sagyo-ryohoshi";
import { SHINO_KUNRENSHI_QUESTIONS } from "@/data/questions/shino-kunrenshi";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import integration from "@/docs/evidence/shino-sagyo-pm-ready-20261010/INTEGRATION.json";
import laterIntegration from "@/docs/evidence/shino-sagyo-pm57-end-ready-20261010/INTEGRATION.json";

import ot13 from "@/docs/evidence/sagyo-ot13-recovered-20261011/INTEGRATION.json";
import go34 from "@/data/questions/shino-kunrenshi/saved-go34-20261011.json";

const restoredIds = new Set([...ot13.newIds, ...go34.map(question => question.id)]);

const restoredImageIds = new Set([...ot13.newIds, ...go34.filter(question => question.hasImage).map(question => question.id)]);

const choiceKeys = ["ア", "イ", "ウ", "エ", "オ"] as const;

describe("作業療法士・視能訓練士 午後の部分収録", () => {
  it.each([
    ["sagyo-ryohoshi", SAGYO_RYOHOSHI_QUESTIONS, 166],
    ["shino-kunrenshi", SHINO_KUNRENSHI_QUESTIONS, 105],
  ] as const)("%s は原典照合済み部分集合のみ公開する", async (exam, questions, expectedCount) => {
    const loaded = (await getQuestionsForExam(exam)).filter(question => question.session === "pm");
    expect(loaded).toEqual(questions.filter(question => question.session === "pm"));
    expect(loaded).toHaveLength(expectedCount);
    expect(new Set(loaded.map((question) => question.id)).size).toBe(expectedCount);
    expect(loaded.every((question) => question.session === "pm")).toBe(true);
    expect(new Set(loaded.map((question) => question.year))).toEqual(new Set([2024, 2025]));

    for (const question of loaded) {
      expect(question.needsReview).toBe(false);
      expect(question.hasImage).toBe(restoredImageIds.has(question.id));
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

  it("原典回収で解消した午後問だけを復帰し、残る保留を除外する", () => {
    const all = [...SAGYO_RYOHOSHI_QUESTIONS, ...SHINO_KUNRENSHI_QUESTIONS].filter(question => question.session === "pm");
    const identities = new Set(all.map((question) => {
      const round = question.exam === "sagyo-ryohoshi"
        ? (question.year === 2025 ? 61 : 60)
        : (question.year === 2025 ? 56 : 55);
      return `${question.exam}-${round}-pm-${question.qNumber}`;
    }));
    expect(all).toHaveLength(271);
    expect(integration.draftOriginals).toBe(135);
    expect(integration.heldDrafts).toHaveLength(15);
    expect(integration.excludedBeforeDraft).toHaveLength(9);
    expect(integration.readyProvenance).toHaveLength(120);
    expect(laterIntegration.draftOriginals).toBe(119);
    expect(laterIntegration.heldDrafts).toHaveLength(21);
    expect(laterIntegration.excludedBeforeDraft).toHaveLength(7);
    expect(laterIntegration.readyProvenance).toHaveLength(98);
    for (const held of [...integration.heldDrafts, ...integration.excludedBeforeDraft, ...laterIntegration.heldDrafts, ...laterIntegration.excludedBeforeDraft]) {
      const match = held.identity.match(/^(.+)-(\d+)-pm-(\d+)$/)!;
      const year = match[2] === "61" || match[2] === "56" ? 2025 : 2024;
      const id = `${match[1]}-${year}-annual-pm-q${match[3]}`;
      expect(identities.has(held.identity)).toBe(restoredIds.has(id));
    }
  });
});
