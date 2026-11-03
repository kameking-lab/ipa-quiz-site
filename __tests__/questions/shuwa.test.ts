import { describe, expect, it } from "vitest";
import { SHUWA_QUESTIONS } from "@/data/questions/shuwa";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { defaultPracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";
import { isOfficialPastOnlyRequest } from "@/lib/questions/past-question-policy";
import answers from "@/data/exam-library/source-packs/shuwa/official-answers.json";

describe("手話通訳士の公開前ステージング", () => {
  it("同期・非同期の演習一覧とIPA用の取込一覧へ漏らさない", async () => {
    expect(isExamPublished("shuwa")).toBe(false);
    expect(QUESTIONS_BY_EXAM.shuwa).toBeUndefined();
    expect(await getQuestionsForExam("shuwa")).toEqual([]);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("shuwa");
    expect(ALL_EXAM_CODES).not.toContain("shuwa");
  });
  it("公式2回分の全160正答を4科目の原問番号で保持する", () => {
    expect(answers.map(a => a.round)).toEqual([37, 36]);
    for (const table of answers) {
      expect(Object.keys(table.answers)).toHaveLength(4);
      for (const column of Object.values(table.answers)) {
        expect(column).toHaveLength(20);
        expect(column.every(n => n >= 1 && n <= 4)).toBe(true);
      }
    }
    for (const q of SHUWA_QUESTIONS) {
      const table = answers.find(a => a.year === q.year)!;
      const official = table.answers[q.session as keyof typeof table.answers][q.qNumber - 1];
      expect(q.officialAnswerNumber).toBe(String(official));
      expect(q.answer).toBe("アイウエ"[official - 1]);
      expect(q.sourceAnswerUrl).toBe(table.sourceUrl);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(isPracticeReadyQuestion(q)).toBe(true);
      expect(shuffleChoices(q)).toBe(q);
    }
  });
  it("4科目を原問番号で扱い、生成問題を要求できない", () => {
    expect(EXAM_CONFIGS.shuwa.sessions.map(s => s.expectedQuestions)).toEqual([20, 20, 20, 20]);
    expect(defaultPracticeSession("shuwa")).toBe("mondai-a");
    expect(practiceSessionLabel("mondai-d", "shuwa")).toBe("国語");
    expect(isOfficialPastOnlyRequest("shuwa", undefined)).toBe(true);
    expect(isOfficialPastOnlyRequest(undefined, "shuwa-2026-annual-mondai-a-01")).toBe(true);
  });
});
