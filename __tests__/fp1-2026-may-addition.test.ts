import { describe, expect, it } from "vitest";
import draft from "@/data/questions/fp1/2026-may-addition.json";
import { FP1_QUESTIONS } from "@/data/questions/fp1";
import legacy from "@/data/questions/fp1/launch.json";
import { parseQuestionBlocks } from "@/components/quiz/QuestionBody";

import { findTopicByAnySlug, topicLinkHref, topicTagToSlug } from "@/lib/seo/topics";

const missing = [12,19,23,26,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,49,50];
const officialAnswers = [1,3,2,4,1,2,4,4,1,3,4,2,2,2,1,2,2,1,4,2,4,1,3,1,3];
const keys = ["ア", "イ", "ウ", "エ"] as const;

describe("FP1 2026 May missing questions after independent primary review", () => {
  it("contains precisely the absent 25 questions without touching the existing 25", () => {
    expect(draft.map(q => q.qNumber)).toEqual(missing);
    expect(new Set(draft.map(q => q.id)).size).toBe(25);
    const currentIds = new Set(FP1_QUESTIONS.map(q => q.id));
    expect(draft.every(q => currentIds.has(q.id))).toBe(true);
    expect(FP1_QUESTIONS.filter(q => q.season === "may")).toHaveLength(50);
    expect(FP1_QUESTIONS.filter(q => q.season === "september")).toHaveLength(3);
    expect(draft.every(q => !legacy.some(old => old.id === q.id))).toBe(true);
    expect(FP1_QUESTIONS.filter(q => legacy.some(old => old.id === q.id))).toEqual(legacy);
  });

  it("binds every official answer and all four independent explanation fields", () => {
    for (const [i, q] of draft.entries()) {
      expect(Number(q.officialAnswerNumber)).toBe(officialAnswers[i]);
      expect(q.answer).toBe(keys[Number(q.officialAnswerNumber) - 1]);
      expect(Object.keys(q.choices)).toEqual([...keys]);
      expect(Object.keys(q.choiceExplanations)).toEqual([...keys]);
      expect(Object.values(q.choiceExplanations).every(x => x.length >= 20)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.lawReferenceDate).toBe("2025-10-01");
      expect(q.sourcePdfUrl).toContain("kinzai.or.jp/uploads/lib/question/202605/");
      expect(q.sourceAnswerUrl).toContain("kinzai.or.jp/uploads/lib/answer/202605/");
      expect(q.needsReview).toBe(false);
    }
  });

  it("preserves the inheritance event and limiting conditions before Q47's table", () => {
    const q = draft.find(q => q.qNumber === 47);
    expect(q).toBeDefined();
    for (const condition of ["2026", "５月24日に父が死亡", "課税価格に加算", "ほかに贈与は受けていない", "非課税制度の適用を受けていない"]) {
      expect(q?.question.replace(/\s/g, "")).toContain(condition);
    }
    expect(q?.question).toContain("|2025年２月10日|父|現金|相続時精算課税|2,000万円|");
    expect(q?.question).toContain("|2025年２月10日|母|土地|相続時精算課税|2,000万円|");
    expect(q?.choiceExplanations.ウ).toContain("2,000−55＝1,945");
    expect(q?.choiceExplanations.ウ).toContain("200＋390＋1,945＝2,535");
  });

  it("keeps borrowing and lending in the Q12 journal entries", () => {
    const q = draft.find(q => q.qNumber === 12);
    expect(q?.choices.ア).toContain("|定期保険料 324万円|現預金 540万円|");
    expect(q?.choices.ア).toContain("|前払保険料 216万円||");
    expect(q?.question).toContain("65.0％");
  });

  it("resolves each new topic through the page and link consumers", () => {
    for (const q of draft) {
      for (const tag of q.topicTags) {
        expect(findTopicByAnySlug(topicTagToSlug(tag))?.tag).toBe(tag);
        expect(topicLinkHref(tag)).toBe("/topics/" + encodeURIComponent(topicTagToSlug(tag)));
      }
    }
  });

  it("renders the source tables without merging rows or columns", () => {
    for (const [number, columns, rows] of [[19, 3, 5], [23, 4, 2], [47, 5, 5]] as const) {
      const q = draft.find(q => q.qNumber === number)!;
      const tables = parseQuestionBlocks(q.question).filter(block => block.kind === "table");
      expect(tables).toHaveLength(1);
      expect(tables[0]?.header).toHaveLength(columns);
      expect(tables[0]?.rows).toHaveLength(rows);
      expect(tables[0]?.rows.every(row => row.length === columns)).toBe(true);
    }
    for (const choice of Object.values(draft.find(q => q.qNumber === 12)!.choices)) {
      const table = parseQuestionBlocks(choice).find(block => block.kind === "table");
      expect(table?.header).toEqual(["借方", "貸方"]);
      expect(table?.rows).toHaveLength(2);
      expect(table?.rows[1]?.[1]).toBe("");
    }
  });
});
