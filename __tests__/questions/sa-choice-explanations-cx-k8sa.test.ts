import { describe, expect, it } from "vitest";
import { SA_QUESTIONS } from "@/data/questions/sa";
import { BY_YEAR_QUESTIONS } from "@/data/questions/sa/by-year";
import overlay from "@/data/questions/sa/choice-explanations-cx-k8sa.json";
import { applyIpaCorrections } from "@/data/questions/corrections";
import type { ChoiceKey } from "@/lib/questions/types";

describe("SA 午前IIの選択肢解説", () => {
  it("問題・選択肢・既存の訂正済み正答を変えずに読み込む", () => {
    const originals = applyIpaCorrections("sa", BY_YEAR_QUESTIONS);
    expect(SA_QUESTIONS.map(({ choiceExplanations: _, ...question }) => question))
      .toEqual(originals.map(({ choiceExplanations: _, ...question }) => question));
  });

  it("対象の全四肢に60〜180字の異なる理由を付け、正答と正誤を一致させる", () => {
    const byId = new Map(SA_QUESTIONS.map(question => [question.id, question]));
    for (const [id, reasons] of Object.entries(overlay)) {
      const question = byId.get(id)!;
      expect(question, id).toBeDefined();
      expect(question.session, id).toBe("am2");
      expect(question.type, id).toBe("multiple-choice");
      expect(Object.keys(reasons).sort(), id).toEqual(Object.keys(question.choices ?? {}).sort());
      expect(new Set(Object.values(reasons)).size, id).toBe(4);
      for (const [key, reason] of Object.entries(reasons)) {
        expect(reason.length, `${id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${id}/${key}`).toBeLessThanOrEqual(180);
        expect(reason.startsWith(key === question.answer ? "正しいです。" : "誤りです。"), `${id}/${key}`).toBe(true);
        expect(question.choiceExplanations?.[key as ChoiceKey], `${id}/${key}`).toBe(reason);
      }
    }
  });

  it("既存の正答訂正を解説にも反映する", () => {
    const question = SA_QUESTIONS.find(question => question.id === "sa-2009a-am2-q9")!;
    expect(question.answer).toBe("ア");
    expect(question.choiceExplanations?.ア).toContain("正しいです。");
    expect(question.choiceExplanations?.イ).toContain("誤りです。");
  });
});
