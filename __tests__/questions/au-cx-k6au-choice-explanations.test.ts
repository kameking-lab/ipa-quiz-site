import { describe, expect, it } from "vitest";
import { AU_QUESTIONS } from "@/data/questions/au";
import { BY_YEAR_QUESTIONS } from "@/data/questions/au/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import { publishedQuestions } from "@/data/questions/published";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import overlay from "@/data/questions/au/choice-explanations-cx-k6au.json";
import type { ChoiceKey } from "@/lib/questions/types";

// These items were outside the original overlay. Source-reviewed additions live in the yearly data.
const IMAGE_DEPENDENT = new Set([
  "au-2009h-am2-q15", "au-2009h-am2-q17",
  "au-2010h-am2-q5", "au-2010h-am2-q21",
  "au-2023a-am2-q12", "au-2023a-am2-q21",
  "au-2023a-am2-q23", "au-2023a-am2-q24",
  "au-2025a-am2-q21",
]);
const STANDARD_EXPLANATION = "au-2021a-am2-q23";
const entries: Record<string, Record<string, string>> = overlay;

describe("AU morning II choice explanations", () => {
  it("serves the same explanations through the lazy exam loader", async () => {
    expect(await getQuestionsForExam("au")).toEqual(publishedQuestions(AU_QUESTIONS));
  });

  it("accounts for every morning-II question across all eight years", () => {
    const questions = AU_QUESTIONS.filter(q => q.session === "am2" && [2009, 2010, 2020, 2021, 2022, 2023, 2024, 2025].includes(q.year));
    expect(questions).toHaveLength(200);
    expect(new Set(questions.map(q => q.year)).size).toBe(8);
    expect(Object.keys(entries)).toHaveLength(190);
    for (const question of questions) {
      const skipped = IMAGE_DEPENDENT.has(question.id) || question.id === STANDARD_EXPLANATION;
      expect(Boolean(entries[question.id]), question.id).toBe(!skipped);
    }
  });

  it("preserves all existing content and corrected official answers", () => {
    const originals = applyIpaCorrections("au", BY_YEAR_QUESTIONS);
    const byId = new Map(AU_QUESTIONS.map(question => [question.id, question]));
    for (const original of originals) {
      expect(byId.get(original.id)?.answer, original.id).toEqual(original.answer);
    }
  });

  it("explains each choice with the correct verdict and a substantive reason", () => {
    for (const question of AU_QUESTIONS.filter(q => entries[q.id] || q.session === "am2" && (IMAGE_DEPENDENT.has(q.id) || q.id === STANDARD_EXPLANATION) && q.explanationCoverage === "full")) {
      expect(question.type, question.id).toBe("multiple-choice");
      expect(question.session, question.id).toBe("am2");
      const keys = Object.keys(question.choices ?? {}) as ChoiceKey[];
      expect(keys, question.id).toHaveLength(4);
      expect(Object.keys(question.choiceExplanations ?? {}).sort(), question.id)
        .toEqual([...keys].sort());
      const reasons = keys.map(key => question.choiceExplanations?.[key] ?? "");
      expect(new Set(reasons).size, question.id).toBe(4);
      keys.forEach((key, index) => {
        const reason = reasons[index]!;
        expect(reason.startsWith(key === question.answer ? "正しいです。" : "誤りです。"), `${question.id}/${key}`).toBe(true);
        expect(reason.length, `${question.id}/${key}`).toBeGreaterThanOrEqual(entries[question.id] ? 60 : 40);
        expect(reason.length, `${question.id}/${key}`).toBeLessThanOrEqual(180);
      });
    }
  });

  it("pins explanations for named legal and standards questions to the exam era", () => {
    const normative = /JIS |システム(?:監査|管理)基準|情報セキュリティ監査基準|金融庁|労働者派遣法|個人情報保護法|不正アクセス禁止法|会社法|特許法|著作権法|フェアユース|GDPR|下請代金|民法|ISMAP|前払式支払手段|商品の広告|インボイス制度|X\.509|Cybersecurity Framework|プライバシーマーク|特定デジタルプラットフォーム|サイバーセキュリティ基本法|サイバー・フィジカル|3402/;
    for (const question of AU_QUESTIONS.filter(q => entries[q.id] && normative.test(q.question))) {
      for (const reason of Object.values(entries[question.id]!)) {
        expect(reason, question.id).toMatch(/出題当時の.+に基づく説明です。$/u);
      }
    }
  });
});
