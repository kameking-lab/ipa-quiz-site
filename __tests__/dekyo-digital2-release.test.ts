import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import source2024Second from "@/data/questions/dekyo-digital2/2024-second-sources.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

const exam = "dekyo-digital2";
const papers = [{ year: 2024, season: "second", source: source2024Second }];

describe("工事担任者 第二級デジタル通信", () => {
  it.each(papers)("serves all $year $season questions and matches their official grid", async ({ year, season, source }) => {
    const questions = (await getQuestionsForExam(exam)).filter(q => q.year === year && q.season === season);
    expect(questions).toHaveLength(62);
    expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === year && q.season === season).map(q => q.id))
      .toEqual(questions.map(q => q.id));
    const answers: Record<string, number> = source.answers;
    for (const q of questions) {
      const [, group, part] = q.id.match(/-q(\d+)-(\d+)$/)!;
      const official = answers[`${q.session}.${group}.${part}`];
      expect(q.officialAnswerNumber).toBe(official);
      expect(q.answer).toBe("アイウエオ"[official! - 1]);
      expect(q.sourcePdfUrl).toBe(source.sourcePdfUrl);
      expect(q.sourceAnswerUrl).toBe(source.sourceAnswerUrl);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      if (q.hasImage) expect(q.imageUrls).toHaveLength(1);
      for (const url of q.imageUrls ?? []) {
        expect(existsSync(join(process.cwd(), "public", url)), url).toBe(true);
      }
    }
  });
});
