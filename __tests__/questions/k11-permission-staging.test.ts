import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { defaultPracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";
import type { ExamCode, Question } from "@/lib/questions/types";

const exams: ExamCode[] = ["unko-kanrisha-ryokaku", "shobo-setsubishi-kou1", "kikenbutsu-kou", "kikenbutsu-hei", "shobo-setsubishi-kou4", "shobo-setsubishi-otsu6", "kikenbutsu-otsu4", "unko-kanrisha-kamotsu"];

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
        expect(EXAM_CONFIGS[q.exam].sessions.find(s => s.session === q.session)?.categories).toContain(q.category);
        expect(defaultPracticeSession(q.exam)).toBe("gakka");
        expect(practiceSessionLabel(q.session, q.exam)).not.toContain("薬学");
        for (const url of [...(q.imageUrls ?? []), ...(q.answerImageUrls ?? [])]) {
          // Neither direct static URLs nor the image optimizer's internal fetch
          // may read staged assets. Keep the bytes outside the public root.
          expect(existsSync(join(process.cwd(), "public", url))).toBe(false);
          expect(existsSync(join(process.cwd(), "private-assets/k11", url))).toBe(true);
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

  it("丙種 keeps the 25 official answers and publication identity", () => {
    const questions: Question[] = JSON.parse(readFileSync(join(process.cwd(), "data/questions/kikenbutsu-hei/published-202606.json"), "utf8"));
    expect(questions.map(q => Number(q.officialAnswerNumber))).toEqual([2,4,4,2,3,3,1,3,4,2,4,3,3,1,1,2,4,3,3,1,4,4,4,3,2]);
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 25 }, (_, i) => i + 1));
    for (const q of questions) {
      expect(q.sourceExamYear).toBeNull();
      expect(q.season).toBe("published");
      expect(q.publicationVersion).toBe("2026-06");
    }
  });

  it("甲種 keeps all 45 visually verified official answers and source pages", () => {
    const questions: Question[] = JSON.parse(readFileSync(join(process.cwd(), "data/questions/kikenbutsu-kou/published-202606.json"), "utf8"));
    expect(questions.map(q => Number(q.officialAnswerNumber))).toEqual([1,1,2,5,3,4,4,4,5,3,3,4,1,5,3,1,4,5,5,3,2,2,2,1,2,1,1,1,3,2,4,4,1,2,3,2,5,2,2,2,4,3,5,5,5]);
    for (const [i, q] of questions.entries()) {
      expect(q.qNumber).toBe(i + 1);
      expect(q.sourcePdfUrl).toContain(`#page=${Math.floor((i + 1) / 2) + 1}`);
      expect(q.sourceAnswerUrl).toContain("#page=24");
      expect(q.sourceExamYear).toBeNull();
      expect(q.publicationVersion).toBe("2026-06");
    }
  });

  it("甲1 preserves the class-specific written range and all practical answer slots", () => {
    const questions: Question[] = JSON.parse(readFileSync(join(process.cwd(), "data/questions/shobo-setsubishi-kou1/published-202606.json"), "utf8"));
    const written = questions.filter(q => q.session === "gakka");
    expect(written.map(q => q.qNumber)).toEqual([1,2,3,4,5,6,8,13,14,15,16,17,18,19,20,21,25,29,30]);
    expect(written.map(q => Number(q.officialAnswerNumber))).toEqual([4,4,4,3,3,2,4,4,3,2,3,2,2,2,2,1,1,1,3]);
    const heads = questions.filter(q => q.qNumber === 35);
    expect(heads.map(q => q.officialAnswerNumber)).toEqual(["ア", "イ", "ウ", "エ"]);
    expect(heads.map(q => q.part)).toEqual(["1", "2", "3", "4"]);
    const calculation = questions.filter(q => q.qNumber === 36);
    expect(calculation).toHaveLength(3);
    for (const q of calculation) {
      expect(q.type).toBe("descriptive");
      expect(q.modelAnswer!.length).toBeGreaterThan(10);
      expect(q.scoringCriteria!.length).toBeGreaterThan(15);
      expect(q.answerImageUrls).toHaveLength(1);
    }
  });

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

  it("貨物 preserves every answer slot and exact multiple-selection sets in both official tables", () => {
    const dir = join(process.cwd(), "data/questions/unko-kanrisha-kamotsu");
    const official: Record<string, (number | number[])[]> = JSON.parse(readFileSync(join(dir, "official-answers.json"), "utf8"));
    for (const year of ["2024", "2023"]) {
      if (!existsSync(join(dir, `${year}.json`))) continue;
      const questions: Question[] = JSON.parse(readFileSync(join(dir, `${year}.json`), "utf8"));
      expect(new Set(questions.map(q => q.qNumber)).size).toBe(30);
      for (let n = 1; n <= 30; n++) {
        const rows = questions.filter(q => q.qNumber === n);
        const expected = official[year][n - 1];
        if (rows[0].part) {
          expect(rows.map(q => Number(q.officialAnswerNumber))).toEqual(expected);
          expect(new Set(rows.map(q => q.part)).size).toBe(rows.length);
        } else {
          expect(rows).toHaveLength(1);
          expect(rows[0].officialAnswerNumber).toBe(String(expected));
        }
        for (const q of rows) {
          const keys = Array.isArray(q.answer) ? q.answer : [q.answer];
          expect(keys.map(key => "アイウエオカキク".indexOf(key) + 1).join(",")).toBe(q.officialAnswerNumber);
        }
      }
    }
  });

  it("旅客 preserves every answer slot and exact multiple-selection sets in both official tables", () => {
    const dir = join(process.cwd(), "data/questions/unko-kanrisha-ryokaku");
    const official: Record<string, (number | number[])[]> = JSON.parse(readFileSync(join(dir, "official-answers.json"), "utf8"));
    for (const year of ["2024", "2023"]) {
      if (!existsSync(join(dir, `${year}.json`))) continue;
      const questions: Question[] = JSON.parse(readFileSync(join(dir, `${year}.json`), "utf8"));
      expect(new Set(questions.map(q => q.qNumber)).size).toBe(30);
      for (let n = 1; n <= 30; n++) {
        const rows = questions.filter(q => q.qNumber === n);
        const expected = official[year][n - 1];
        if (rows[0].part) {
          expect(rows.map(q => Number(q.officialAnswerNumber))).toEqual(expected);
          expect(new Set(rows.map(q => q.part)).size).toBe(rows.length);
        } else {
          expect(rows).toHaveLength(1);
          expect(rows[0].officialAnswerNumber).toBe(String(expected));
        }
        for (const q of rows) {
          const keys = Array.isArray(q.answer) ? q.answer : [q.answer];
          expect(keys.map(key => "アイウエオカキク".indexOf(key) + 1).join(",")).toBe(q.officialAnswerNumber);
        }
      }
    }
  });

  it("消防設備士 includes only the target class and common written questions, with practical answer images", () => {
    for (const [exam, numbers, answers, practicalCount] of [
      ["shobo-setsubishi-otsu6", [1,2,3,4,5,6,7,13,15,17,18,19,29,41], [3,1,2,4,1,4,2,2,2,3,2,4,3,3], 2],
      ["shobo-setsubishi-kou4", [1,2,3,4,5,6,11,17,18,19,20,28,32], [4,4,4,3,3,2,4,2,2,2,2,1,2], 2],
    ] as const) {
      const questions: Question[] = JSON.parse(readFileSync(join(process.cwd(), `data/questions/${exam}/published-202606.json`), "utf8"));
      const written = questions.filter(q => q.session === "gakka");
      expect(written.map(q => q.qNumber)).toEqual(numbers);
      expect(written.map(q => Number(q.officialAnswerNumber))).toEqual(answers);
      const practical = questions.filter(q => q.session === "practical");
      expect(practical).toHaveLength(practicalCount);
      for (const q of practical.filter(q => q.type === "descriptive")) {
        expect(q.modelAnswer!.length).toBeGreaterThan(5);
        expect(q.scoringCriteria!.length).toBeGreaterThan(15);
        expect(q.answerImageUrls?.length).toBeGreaterThan(0);
      }
      for (const q of questions) {
        expect(q.sourceExamYear).toBeNull();
        expect(q.publicationVersion).toBe("2026-06");
        expect(q.officialQuestionLabel).toBeTruthy();
      }
    }
  });
});
