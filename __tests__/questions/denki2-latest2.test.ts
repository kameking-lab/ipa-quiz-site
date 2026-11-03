import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { DENKI2_QUESTIONS } from "@/data/questions/denki2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS, ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import checkedSource from "@/reports/sekou-2denki/source-check.json";
import figures from "@/reports/sekou-2denki/figures.json";

const keys = ["ア", "イ", "ウ", "エ", "オ"];
describe("sekou-2denki latest two official papers, staged", () => {
  it("keeps 62 original questions per edition and all 504 choice explanations", () => {
    expect(DENKI2_QUESTIONS).toHaveLength(124);
    expect(new Set(DENKI2_QUESTIONS.map(q => q.id)).size).toBe(124);
    let explanations = 0;
    for (const source of checkedSource) {
      const [year, season] = source.edition.split("-");
      const rows = DENKI2_QUESTIONS.filter(q => q.year === Number(year) && q.season === season);
      expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: 62 }, (_, i) => i + 1));
      for (const q of rows) {
        const officialAnswer = source.answerByNumber[String(q.qNumber) as keyof typeof source.answerByNumber];
        expect(q.answer).toBe(keys[officialAnswer - 1]);
        expect(q.officialAnswerNumber).toBe(String(officialAnswer));
        const count = q.qNumber >= 37 && q.qNumber <= 40 ? 5 : 4;
        expect(Object.keys(q.choices ?? {})).toHaveLength(count);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
        for (const text of Object.values(q.choiceExplanations ?? {})) expect(text.trim().length).toBeGreaterThan(8);
        expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.fcip-shiken\.jp\/pdf\//);
        expect(q.sourceAnswerUrl).toBe(q.sourcePdfUrl);
        expect(q.sourceAttribution).toContain("一般財団法人建設業振興基金");
        if (q.category === "法規（選択）") expect(q.explanation).toContain("出題時点");
        explanations += count;
      }
    }
    expect(explanations).toBe(504);
  });

  it("retains all 21 necessary official figures with matching hashes", () => {
    expect(DENKI2_QUESTIONS.filter(q => q.hasImage)).toHaveLength(21);
    expect(figures).toHaveLength(21);
    for (const figure of figures) {
      const q = DENKI2_QUESTIONS.find(q => `${q.year}-${q.season}` === figure.edition && q.qNumber === figure.number)!;
      expect(q.hasImage).toBe(true);
      expect(q.imageUrls).toEqual([figure.imageUrl]);
      const bytes = readFileSync(`${process.cwd()}/public${figure.imageUrl}`);
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(figure.sha256);
    }
  });

  it("registers the owner-approved qualification while keeping every public registry gated", async () => {
    expect(getQualificationByExamCode("denki2")).toMatchObject({slug: "sekou-2denki", status: "ready-to-ingest"});
    expect(isExamPublished("denki2")).toBe(false);
    expect(QUESTIONS_BY_EXAM.denki2).toBeUndefined();
    expect(await getQuestionsForExam("denki2")).toEqual([]);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("denki2");
    expect(ALL_EXAM_CODES).not.toContain("denki2");
    expect(EXAM_CONFIGS.denki2.sessions[0].expectedQuestions).toBe(62);
  });
});
