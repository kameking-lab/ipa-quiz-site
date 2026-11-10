// @vitest-environment node
import { describe, expect, it } from "vitest";
import { PM_QUESTIONS } from "@/data/questions/pm";
import { BY_YEAR_QUESTIONS } from "@/data/questions/pm/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import overlay from "@/data/questions/pm/choice-explanations-cx-k5.json";

// IPA official AM2 answer PDFs, retrieved 2026-11-10. URLs and extraction receipt:
// data/questions/corrections/official-sources.json; external lane report.
const officialKeys: Record<string, string> = {
  "2009h": "イウイイエエエアイウエウアエウアイイウウイエエイウ",
  "2010h": "エエウウエアイイアアイイエエイイイウアウエウエエウ",
  "2020a": "イエエアイアエアエウアイエエエウエイエウウエエイイ",
  "2021a": "ウエアウウアアウイイウウイイウイエウウウアウアイイ",
  "2022a": "イエアアエエイエウエエアアウエエエエエウイエイエウ",
  "2023a": "イイアアエイイアウアアイエイアエアウウウイウアエイ",
  "2024a": "イアウウエイエウアエイイイアイイエイアエウイエエウ",
  "2025a": "エイアイアイウアエイウエエアイイエウイエウアエアエ"
};

const deferredByPaper: Record<string, number[]> = {
  "2009h": [2, 10, 12, 19],
  "2010h": [2, 6, 8, 15],
  "2020a": [1, 2, 7, 9, 10, 11, 12],
  "2021a": [2, 4, 11, 18],
  "2022a": [9, 10, 11],
  "2023a": [5, 6, 7, 10, 18],
  "2024a": [4, 5, 6, 10, 12, 17],
  "2025a": [6, 7, 9, 17, 18],
};
const deferredIds = new Set(Object.entries(deferredByPaper).flatMap(([paper, numbers]) =>
  numbers.map((number) => `pm-${paper}-am2-q${number}`),
));
const morningII = PM_QUESTIONS.filter((question) => question.session === "am2");
const overlayIds = new Set(Object.keys(overlay));
function withoutChoiceExplanations(question: Question) {
  const copy = { ...question };
  delete copy.choiceExplanations;
  return copy;
}

describe("PM morning II choice explanations, cx-k5", () => {
  it("accounts for all eight papers, including explicitly deferred questions", () => {
    expect(morningII).toHaveLength(200);
    expect(overlayIds.size).toBe(162);
    expect(deferredIds.size).toBe(38);
    for (const question of morningII) {
      expect(overlayIds.has(question.id), question.id).toBe(!deferredIds.has(question.id));
    }
    for (const id of [...overlayIds, ...deferredIds]) {
      expect(morningII.some((question) => question.id === id), id).toBe(true);
    }
  });

  it("provides four distinct reasons aligned with the displayed and source answers", () => {
    for (const question of morningII.filter((q) => overlayIds.has(q.id))) {
      const keys = Object.keys(question.choices ?? {}).sort() as ChoiceKey[];
      const reasons = question.choiceExplanations ?? {};
      expect(keys, question.id).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.keys(reasons).sort(), question.id).toEqual(keys);
      expect(new Set(Object.values(reasons)).size, question.id).toBe(4);
      expect(question.answer, question.id).toBe(BY_YEAR_QUESTIONS.find((q) => q.id === question.id)?.answer);
      for (const key of keys) {
        const reason = reasons[key] ?? "";
        expect(reason.length, `${question.id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${question.id}/${key}`).toBeLessThanOrEqual(180);
        expect(reason.startsWith(key === question.answer ? "正しいです。" : "誤りです。"), `${question.id}/${key}`).toBe(true);
      }
    }
  });

  it("matches independently extracted official keys for all published reasons", () => {
    for (const question of morningII.filter((q) => overlayIds.has(q.id))) {
      const paper = `${question.year}${question.season === "spring" ? "h" : "a"}`;
      const official = officialKeys[paper]?.[question.qNumber - 1];
      expect(official, question.id).toMatch(/^[アイウエ]$/u);
      expect(question.answer, question.id).toBe(official);
      expect(Object.entries(question.choiceExplanations ?? {}).filter(([, reason]) => reason?.startsWith("正しいです。")).map(([key]) => key), question.id)
        .toEqual([official]);
    }
  });

  it("changes only choice explanations after existing corrections", () => {
    const corrected = applyIpaCorrections("pm", BY_YEAR_QUESTIONS);
    expect(PM_QUESTIONS.map(withoutChoiceExplanations))
      .toEqual(corrected.map(withoutChoiceExplanations));
    const once = applyChoiceExplanationOverlay(corrected, overlay);
    expect(applyChoiceExplanationOverlay(once, overlay)).toEqual(once);
  });

  it("loads the same explanations through the quiz lazy loader", async () => {
    const lazy = await getQuestionsForExam("pm");
    for (const question of morningII.filter((q) => overlayIds.has(q.id))) {
      expect(lazy.find((q) => q.id === question.id)?.choiceExplanations, question.id)
        .toEqual(question.choiceExplanations);
    }
  });

  it("retains historical qualifications in every choice of version-sensitive questions", () => {
    const annotated = morningII.filter((q) => Object.values(q.choiceExplanations ?? {}).some((reason) => reason?.includes("出題当時")));
    expect(annotated).toHaveLength(56);
    for (const question of annotated) {
      for (const reason of Object.values(question.choiceExplanations ?? {})) {
        expect(reason, question.id).toMatch(/出題当時.*基づきます。$/u);
      }
    }
  });
});
