import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { questionPagePath } from "@/lib/seo/question-url";
import type { ExamCode } from "@/lib/questions/types";

// Independently transcribed from the five rows of each official answer table.
const sets: { code: ExamCode; year: number; a: string; b: string; figures: number }[] = [
  { code: "fujin-kodomofuku1", year: 2023, a: ["○×○○○", "×××○○", "○××○×", "○○×○○", "××○×○"].join(""), b: ["ロイハハニ", "ロハイロロ", "ハニロイハ", "ニハニニイ", "ロニニハロ"].join(""), figures: 2 },
];

describe.each(sets)("c4-19 $code $year early", ({ code, year, a, b, figures }) => {
  const questions = QUESTIONS_BY_EXAM[code]!.filter(q => q.year === year);
  const source = JSON.parse(readFileSync(`data/questions/${code}/${year}-early.sources.json`, "utf8"));

  it("loads the complete official groups, answer mappings and public routes", async () => {
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    expect(source.officialAnswers.a.join("")).toBe(a);
    expect(source.officialAnswers.b.join("")).toBe(b);
    expect((await getQuestionsForExam(code)).filter(q => q.year === year)).toEqual(questions);
    expect(EXAM_CONFIGS[code].yearRange.start).toBeLessThanOrEqual(year);
    for (const q of questions) {
      const n = (q.qNumber - 1) % 25 + 1;
      const group = q.qNumber <= 25 ? "A" : "B";
      const official = group === "A" ? a[n - 1] : b[n - 1];
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(formatQuestionAnswerForDisplay(q, q.answer), q.id).toBe(official);
      expect(questionNumberLabel(q)).toBe(`${group}群 ${n}`);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(questionSourceEdition(q)).toBe(`${year}年度前期`);
      expect(questionPagePath(q)).toBe(`/q/${code}/${year}-early/gakka/q${q.qNumber}`);
      expect(Object.keys(q.choices!)).toHaveLength(group === "A" ? 2 : 4);
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      expect(q.explanation.length, q.id).toBeGreaterThanOrEqual(50);
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/.+\.pdf#page=\d+$/);
      expect(q.sourceAnswerUrl).toBe(source.sourceAnswerUrl);
      for (const [key, explanation] of Object.entries(q.choiceExplanations!)) {
        expect(explanation!.startsWith(key === q.answer ? "正解。" : "不正解。"), q.id).toBe(true);
      }
    }
  });

  it("retains every required original figure and all fifty source checks", () => {
    expect(source.audit).toHaveLength(50);
    expect(questions.filter(q => q.hasImage)).toHaveLength(figures);
    expect(source.figures).toHaveLength(figures);
    for (const figure of source.figures) {
      const bytes = readFileSync(`public${figure.url}`);
      expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
      expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(figure.sha256);
      const question = questions.find(q => q.id === figure.id)!;
      expect(question.imageUrls).toContain(figure.url);
      expect(question.imageAltTexts).toHaveLength(1);
    }
  });
});
