import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import source2023 from "@/data/questions/zensho-financial-statement-analysis/2023-sources.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

const exam = "zensho-financial-statement-analysis";
const papers = [{ year: 2023, count: 88, source: source2023 }];

describe("全商 財務諸表分析検定", () => {
  it.each(papers)("serves the $year paper and its published answer key", async ({ year, count, source }) => {
    const questions = (await getQuestionsForExam(exam)).filter(question => question.year === year);
    const publicQuestions = QUESTIONS_BY_EXAM[exam]?.filter(question => question.year === year);
    expect(questions).toHaveLength(count);
    expect(publicQuestions?.map(question => question.id)).toEqual(questions.map(question => question.id));
    const answers: Record<string, string> = source.answers;
    expect(Object.keys(answers)).toHaveLength(count);
    for (const question of questions) {
      const label = question.question.split("\n", 1)[0];
      const sign = question.numericAnswer?.fixedSign === "negative" ? "-" : "";
      expect(sign + question.answer).toBe(answers[label]);
      expect(question.sourcePdfUrl).toBe(source.sourcePdfUrl);
      expect(question.sourceAnswerUrl).toBe(source.sourceAnswerUrl);
      expect(question.imageUrls?.length).toBeGreaterThan(0);
      for (const url of question.imageUrls ?? []) {
        expect(existsSync(join(process.cwd(), "public", url)), url).toBe(true);
      }
      if (question.type === "multiple-choice") {
        expect(Object.keys(question.choiceExplanations ?? {})).toEqual(Object.keys(question.choices ?? {}));
      }
    }
  });
});
