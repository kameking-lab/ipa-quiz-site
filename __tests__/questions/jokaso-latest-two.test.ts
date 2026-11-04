import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { JOKASO_CANDIDATES } from "@/data/questions/jokaso";
import answers2025 from "@/reports/jokaso-latest2/2025-official-answers.json";
import answers2026 from "@/reports/jokaso-latest2/2026-official-answers.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_QUIZ_EXAM_CODES, ALL_EXAM_CODES } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { choiceDisplayLabel } from "@/lib/questions/display";

const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;
describe("浄化槽管理士の直近2回ステージング", () => {
  it.each([[2025, answers2025], [2026, answers2026]] as const)("%i年度の全80問を公式正答表と照合する", (year, source) => {
    const questions = JOKASO_CANDIDATES.filter((q) => q.year === year);
    expect(questions.map((q) => q.qNumber)).toEqual(Array.from({ length: 80 }, (_, i) => i + 1));
    for (const q of questions) {
      expect(q.answer, q.id).toBe(keys[source.answers[q.qNumber - 1] - 1]);
      expect(q.sourceAnswerUrl).toBe(source.url);
      expect(Object.keys(q.choices!)).toEqual(keys);
      expect(Object.keys(q.choiceExplanations!)).toEqual(keys);
      expect(q.explanationCoverage).toBe("full");
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.explanation).toContain("出題時点");
      for (const key of keys) {
        expect(q.choices![key]!.trim().length, `${q.id} ${key}`).toBeGreaterThan(0);
        expect(q.choiceExplanations![key]!.length, `${q.id} ${key}`).toBeGreaterThan(8);
      }
      if (q.hasImage) {
        expect(q.imageUrls).toHaveLength(1);
        expect(existsSync(join(process.cwd(), "public", q.imageUrls![0]))).toBe(true);
        expect(q.imageAltTexts?.[0]).toContain("原図");
      }
    }
  });
  it("batch1公開後: 公開経路に出さず、IPA区分にも混入させない", async () => {
    expect(isExamPublished("jokaso")).toBe(true);
    expect(QUESTIONS_BY_EXAM.jokaso).toBeDefined();
    expect(ALL_QUIZ_EXAM_CODES).toContain("jokaso");
    expect(ALL_EXAM_CODES).not.toContain("jokaso");
    expect((await getQuestionsForExam("jokaso")).length).toBeGreaterThan(0);
  });
  it("図示選択肢にも文字を持ち、数式と文章中の選択箇所を保持する", () => {
    const find = (year: number, n: number) => JOKASO_CANDIDATES.find((q) => q.year === year && q.qNumber === n)!;
    expect(find(2026, 80).choices?.ウ).toContain("異物除去");
    expect(find(2025, 55).choices?.ア).toContain("(100 × CI + R × CR) / (100 + R)");
    expect(find(2026, 23).question).toContain("W / (v・F)");
    expect(find(2025, 26).question).toContain("清掃");
    expect(find(2026, 10).question).toContain("し尿処理施設");
    expect(choiceDisplayLabel("jokaso", "オ")).toBe("5");
  });
});
