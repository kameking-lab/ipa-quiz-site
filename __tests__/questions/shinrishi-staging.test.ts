import { describe, expect, it } from "vitest";
import { SHINRISHI_CANDIDATES, SHINRISHI_QUESTIONS } from "@/data/questions/shinrishi";
import { getAvailableExams } from "@/lib/seo/exam-meta";
import audit from "@/reports/shinrishi-9-source-audit.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { choiceDisplayLabel } from "@/lib/questions/display";

describe("公認心理師第9回の公式原問と公開前ステージング", () => {
  it("154問を公式通し番号・午前午後・4/5肢のまま保存する", () => {
    expect(SHINRISHI_CANDIDATES.map(q => q.qNumber)).toEqual(Array.from({ length: 154 }, (_, i) => i + 1));
    expect(new Set(SHINRISHI_CANDIDATES.map(q => q.id)).size).toBe(154);
    for (const q of SHINRISHI_CANDIDATES) {
      expect(q.session).toBe(q.qNumber <= 77 ? "am" : "pm");
      expect(Object.values(q.choices ?? {})).toHaveLength((q.qNumber >= 46 && q.qNumber <= 53) || (q.qNumber >= 122 && q.qNumber <= 128) ? 4 : 5);
      expect(q.question.length).toBeGreaterThan(15);
      expect(q.explanation.length).toBeGreaterThan(30);
      expect(q.hasImage).toBe(false);
      expect(q.sourceAnswerUrl).toBe(audit.sources.answers.url);
      expect(questionSourceEdition(q)).toBe("第9回（2026年3月1日実施）");
      const source = audit.questions.find(item => item.number === q.qNumber)!;
      expect(q.sourcePdfUrl).toBe(`${audit.sources[q.session as "am" | "pm"].url}#page=${source.pdfPage}`);
      const answer = source.officialAnswer.map(n => "アイウエオ"[n - 1]);
      expect(Array.isArray(q.answer) ? q.answer : [q.answer]).toEqual(answer);
      expect(q.requiredSelections ?? 1).toBe(answer.length);
      expect(isCompleteSelectionCorrect(q.answer, answer, q.requiredSelections)).toBe(true);
      if (answer.length === 2) expect(isCompleteSelectionCorrect(q.answer, answer.slice(0, 1), q.requiredSelections)).toBe(false);
    }
  });

  it("登録済みでも公開一覧・同期/非同期問題プールへ出さない", async () => {
    expect(choiceDisplayLabel("shinrishi", "ア")).toBe("1");
    expect(EXAM_CONFIGS.shinrishi.sessions).toHaveLength(2);
    expect(getQualificationByExamCode("shinrishi")?.status).toBe("terms-review-required");
    expect(isExamPublished("shinrishi")).toBe(false);
    expect(ALL_EXAM_CODES).not.toContain("shinrishi");
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("shinrishi");
    expect(getAvailableExams()).not.toContain("shinrishi");
    expect(QUESTIONS_BY_EXAM.shinrishi).toBeUndefined();
    expect(SHINRISHI_QUESTIONS).toEqual([]);
    expect(await getQuestionsForExam("shinrishi")).toEqual([]);
  });
});
