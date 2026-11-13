import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey, ExamCode } from "@/lib/questions/types";

// 公式正答表の画像を5問ごとに読み直した固定値。元のイロハニと配信記号の対応も検査する。
const editions = [
  { exam: "katawaku3", year: 2023,
    answers: "○×○×○" + "○×○××" + "×○××○" + "×○○××" + "×○○○×" + "○×○○×",
    pages: [...Array(12).fill(2), ...Array(13).fill(3), ...Array(5).fill(4)],
    figures: [2, 4, 18, 25, 26] },
];

describe.each(editions)("c5-08 $exam $year", ({ exam: code, year, answers, pages, figures }) => {
  const exam = code as ExamCode;
  it("公式正答と図・出典・通し番号を保持し配信経路から解ける", async () => {
    const rows = QUESTIONS_BY_EXAM[exam]!.filter(q => q.year === year && q.season === "late");
    expect(rows).toHaveLength(answers.length);
    expect(answers).toHaveLength(30);
    expect(new Set(rows.map(q => q.id)).size).toBe(answers.length);
    expect((await getQuestionsForExam(exam)).filter(q => q.year === year && q.season === "late")).toEqual(rows);
    expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(year);
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(answers.length);
    const evidence = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-late.sources.json`), "utf8"));
    expect(evidence.review).toHaveLength(answers.length);
    expect(evidence.choiceExplanationCount).toBe(answers.length * 2);
    expect(evidence.figureCount).toBe(figures.length);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(key);
      expect(q.officialQuestionLabel).toBe(String(i + 1));
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(choiceDisplayLabel(exam, key)).toBe(official);
      expect(questionSourceEdition(q)).toBe(`${year}年度後期`);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices!));
      expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
      expect(q.sourcePdfUrl, q.id).toBe(`${evidence.sources[0].url}#page=${pages[i]}`);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = JSON.stringify(buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id }));
      expect(graph).toContain(`${official}: ${q.choices![key]}`);
      expect(graph).toContain("中央職業能力開発協会");
      expect(q.hasImage).toBe(figures.includes(q.qNumber));
      if (q.hasImage) for (const url of q.imageUrls!) {
        expect(q.imageAltTexts).toHaveLength(q.imageUrls!.length);
        const png = readFileSync(path.join(process.cwd(), "public", url));
        expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
        expect(png.readUInt32BE(16)).toBeGreaterThan(30);
      }
    }
  });
});
