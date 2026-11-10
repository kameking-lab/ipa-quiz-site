import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { choiceDisplayLabel } from "@/lib/questions/display";
import type { ExamCode, Question } from "@/lib/questions/types";

const exams: ExamCode[] = ["kikenbutsu-otsu4"];

describe("k11 official-source candidates remain private", () => {
  for (const exam of exams) {
    const dir = join(process.cwd(), "data/questions", exam);
    const questions: Question[] = readdirSync(dir)
      .filter(name => /^(published-|20\d\d)/.test(name) && name.endsWith(".json"))
      .flatMap(name => JSON.parse(readFileSync(join(dir, name), "utf8")));

    it(`${exam}: blocks eager and lazy publication, including discovery`, async () => {
      expect(getQualificationByExamCode(exam)?.status).toBe("permission-required");
      expect(isExamPublished(exam)).toBe(false);
      expect(QUESTIONS_BY_EXAM[exam]).toBeUndefined();
      expect(await getQuestionsForExam(exam)).toEqual([]);
      expect(getRegisteredExamCodes()).not.toContain(exam);
      expect(questions.length).toBeGreaterThan(0);
    });

    it(`${exam}: preserves sources, images, all-choice explanations and printed numbering`, () => {
      expect(new Set(questions.map(q => q.id)).size).toBe(questions.length);
      for (const q of questions) {
        expect(q.publicAllowed).toBe(false);
        expect(isPracticeReadyQuestion(q)).toBe(false);
        expect(q.exam).toBe(exam);
        expect(q.sourceAnswerUrl).toMatch(/^https:\/\//);
        expect(q.sourcePdfUrl).toMatch(/^https:\/\//);
        expect(q.sourceAttribution).toContain("独自作成");
        expect(EXAM_CONFIGS[q.exam].seasons).toContain(q.season);
        for (const url of [...(q.imageUrls ?? []), ...(q.answerImageUrls ?? [])]) {
          expect(existsSync(join(process.cwd(), "public", url))).toBe(true);
        }
        if (q.type === "descriptive") continue;
        const keys = Object.keys(q.choices!);
        expect(Object.keys(q.choiceExplanations!).sort()).toEqual(keys.sort());
        for (const reason of Object.values(q.choiceExplanations!)) expect(reason!.length).toBeGreaterThan(12);
        for (const key of Array.isArray(q.answer) ? q.answer : [q.answer]) expect(keys).toContain(key);
        if (Array.isArray(q.answer)) expect(q.requiredSelections).toBe(q.answer.length);
        expect(choiceDisplayLabel(exam, "ア")).toBe("1");
        expect(shuffleChoices(q)).toBe(q);
      }
    });
  }

  it("乙4 keeps all 35 official answers and excerpt identity", () => {
    const questions: Question[] = JSON.parse(readFileSync(join(process.cwd(), "data/questions/kikenbutsu-otsu4/published-202606.json"), "utf8"));
    expect(questions.map(q => q.officialAnswerNumber)).toEqual(
      [4,1,4,1,4,3,2,2,5,4,2,2,2,3,2,1,1,4,5,5,4,1,2,5,3,5,3,1,4,5,5,1,4,4,1].map(String),
    );
    for (const q of questions) {
      expect(q.sourceExamYear).toBeNull();
      expect(q.season).toBe("published");
      expect(q.publicationVersion).toBe("2026-06");
      expect(q.questionNotice).toContain("個別の出題年度・回は非公表");
    }
  });
});
