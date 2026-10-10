import { describe, expect, it } from "vitest";
import { SAGYO_RYOHOSHI_QUESTIONS } from "@/data/questions/sagyo-ryohoshi";
import { SHINO_KUNRENSHI_QUESTIONS } from "@/data/questions/shino-kunrenshi";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import integration from "@/docs/evidence/shino-sagyo-am-ready-20261010/INTEGRATION.json";

const choiceKeys = ["ア", "イ", "ウ", "エ", "オ"] as const;

describe("作業療法士・視能訓練士 午前の部分収録", () => {
  it.each([
    ["sagyo-ryohoshi", SAGYO_RYOHOSHI_QUESTIONS, 139, 298],
    ["shino-kunrenshi", SHINO_KUNRENSHI_QUESTIONS, 91, 184],
  ] as const)("%s は保存済み原本で確認した午前問だけ追加する", async (exam, questions, amCount, totalCount) => {
    const loaded = await getQuestionsForExam(exam);
    expect(loaded).toEqual(questions);
    expect(loaded).toHaveLength(totalCount);
    expect(new Set(loaded.map(question => question.id)).size).toBe(totalCount);
    const morning = loaded.filter(question => question.session === "am");
    expect(morning).toHaveLength(amCount);
    expect(new Set(morning.map(question => question.year))).toEqual(new Set([2024, 2025]));
    for (const question of morning) {
      expect(question.needsReview).toBe(false);
      expect(question.hasImage).toBe(false);
      expect(question.sourceAttribution).toContain("午前");
      expect(choiceKeys.every(key => Boolean(question.choices?.[key]?.trim()))).toBe(true);
      expect(choiceKeys.every(key => Boolean(question.choiceExplanations?.[key]?.trim()))).toBe(true);
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers).toHaveLength(question.requiredSelections ?? 1);
      expect(answers.map(answer => String(choiceKeys.indexOf(answer as typeof choiceKeys[number]) + 1)).join(""))
        .toBe(question.officialAnswerNumber);
    }
  });

  it("共有設例を原問ごとに表示し、保留は公開集合に混ぜない", () => {
    const all = [...SAGYO_RYOHOSHI_QUESTIONS, ...SHINO_KUNRENSHI_QUESTIONS];
    expect(all).toHaveLength(482);
    const ids = new Set(all.map(question => question.id));
    for (const original of integration.heldDrafts) {
      const parts = original.identity.match(/^(.+)-(\d+)-am-(\d+)$/);
      expect(parts).not.toBeNull();
      const [, exam, round, number] = parts!;
      const year = round === "61" || round === "56" ? 2025 : 2024;
      expect(ids.has(`${exam}-${year}-annual-am-q${number}`)).toBe(false);
    }
    expect(integration.heldDrafts).toHaveLength(37);
    expect(integration.excludedBeforeDraft).toHaveLength(14);
    for (const [id, cue] of [
      ["sagyo-ryohoshi-2025-annual-am-q11", "65 歳の男性"],
      ["sagyo-ryohoshi-2025-annual-am-q12", "65 歳の男性"],
      ["sagyo-ryohoshi-2024-annual-am-q14", "34 歳の女性"],
      ["sagyo-ryohoshi-2024-annual-am-q15", "34 歳の女性"],
    ] as const) {
      expect(all.find(question => question.id === id)?.question).toContain(cue);
    }
  });
});
