import { describe, expect, it } from "vitest";
import { IJI_SHUZEN_QUESTIONS } from "@/data/questions/iji-shuzen";
import audit from "@/reports/iji-shuzen-source-audit.json";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { getAvailableExams } from "@/lib/seo/exam-meta";
import { isExamPublished } from "@/lib/qualifications/catalog";

const keys = ["ア", "イ", "ウ", "エ"];
describe("マンション維持修繕技術者の直近2回", () => {
  it("全94原問と90問の公式正答、記述4問の公式正解例を保持する", () => {
    expect(IJI_SHUZEN_QUESTIONS).toHaveLength(94);
    for (const paper of audit.papers) {
      const rows = IJI_SHUZEN_QUESTIONS.filter(q => q.year === paper.year);
      expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: 47 }, (_, i) => i + 1));
      for (const q of rows) {
        expect(q.needsReview).toBe(false);
        expect(q.lawReferenceDate).toBe(`${paper.year}-04-01`);
        expect(q.sourcePdfUrl).toContain(`${paper.year}mondai.pdf#page=`);
        expect(q.sourceAnswerUrl).toContain(`${paper.year}seikai.pdf`);
        if (q.qNumber <= 45) {
          const official = paper.multipleChoiceAnswers[String(q.qNumber) as keyof typeof paper.multipleChoiceAnswers];
          expect(q.officialAnswerNumber).toBe(String(official));
          expect(q.answer).toBe(keys[official - 1]);
          expect(Object.keys(q.choices ?? {})).toEqual(keys);
          expect(Object.keys(q.choiceExplanations ?? {})).toEqual(keys);
          for (const text of Object.values(q.choiceExplanations ?? {})) expect(text.length).toBeGreaterThan(15);
        } else {
          expect(q.type).toBe("descriptive");
          expect(q.modelAnswer).toBe(paper.modelAnswers[String(q.qNumber) as "46" | "47"]);
          expect(q.scoringCriteria).toContain("自己採点");
        }
      }
    }
  });
  it("数式とPDFで読み順が逆転した選択肢を欠落させない", () => {
    const q12 = IJI_SHUZEN_QUESTIONS.find(q => q.year === 2025 && q.qNumber === 12)!;
    expect(q12.choices?.イ).toContain("√t");
    expect(q12.choices?.エ).toContain("∛t");
    const q24 = IJI_SHUZEN_QUESTIONS.find(q => q.year === 2025 && q.qNumber === 24)!;
    expect(q24.choices?.エ).toContain("数値が大きいほど遮音性が低い");
    expect(q24.choices?.ウ).not.toContain("T - 1");
  });
  it("未公開の一覧・直接取得・静的ルート用一覧を遮断する", async () => {
    expect(isExamPublished("iji-shuzen")).toBe(false);
    expect(QUESTIONS_BY_EXAM["iji-shuzen"]).toBeUndefined();
    expect(ALL_QUESTIONS.some(q => q.exam === "iji-shuzen")).toBe(false);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("iji-shuzen");
    expect(ALL_EXAM_CODES).not.toContain("iji-shuzen");
    expect(getAvailableExams()).not.toContain("iji-shuzen");
    expect(getRegisteredExamCodes()).not.toContain("iji-shuzen");
    expect(await getQuestionsForExam("iji-shuzen")).toEqual([]);
  });
});
