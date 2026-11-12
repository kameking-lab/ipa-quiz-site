import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ExamCode } from "@/lib/questions/types";

// Official answer sheets independently checked against their rendered tables.
const sets: { code: ExamCode; season: string; answers: string }[] = [
  { code: "kikai-hozen-denki3", season: "round1", answers: "○×○××○×○○×○○○×○××○○○○××○○××○×○" },
];

describe.each(sets)("c4-15 $code 2023 $season", ({ code, season, answers }) => {
  const manifest = JSON.parse(readFileSync(`data/questions/${code}/sources-2023-${season}.json`, "utf8"));
  const questions = QUESTIONS_BY_EXAM[code]!.filter(q => q.year === 2023 && q.season === season);

  it("loads the complete sitting and preserves the published answers", async () => {
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(new Set(questions.map(q => q.id)).size).toBe(30);
    expect(questions.map(q => q.officialAnswerNumber).join("")).toBe(answers);
    expect(manifest.officialAnswers.join("")).toBe(answers);
    expect((await getQuestionsForExam(code)).filter(q => q.year === 2023 && q.season === season)).toEqual(questions);
    expect(EXAM_CONFIGS[code].yearRange.start).toBeLessThanOrEqual(2023);
    expect(EXAM_CONFIGS[code].seasons).toContain(season);
    for (const q of questions) {
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.answer, q.id).toBe(answers[q.qNumber - 1] === "○" ? "ア" : "イ");
      expect(Object.keys(q.choiceExplanations!), q.id).toEqual(["ア", "イ"]);
      for (const [key, text] of Object.entries(q.choiceExplanations!)) {
        expect(text!.startsWith(key === q.answer ? "正解。" : "不正解。"), q.id).toBe(true);
        expect(text!.length, q.id).toBeGreaterThan(30);
      }
      expect(q.sourcePdfUrl).toContain("/2023/");
      expect(q.sourceAnswerUrl).toContain("/2023/");
      if (/下図/.test(q.question)) expect(q.hasImage, q.id).toBe(true);
    }
  });

  it("retains all source figures with their verified bytes", () => {
    expect(questions.filter(q => q.hasImage)).toHaveLength(manifest.figures.length);
    for (const figure of manifest.figures) {
      const bytes = readFileSync(`public${figure.url}`);
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(figure.sha256);
      expect(figure.cropPdfPoints).toHaveLength(4);
      expect(questions.find(q => q.qNumber === figure.qNumber)?.imageUrls).toContain(figure.url);
    }
  });
});
