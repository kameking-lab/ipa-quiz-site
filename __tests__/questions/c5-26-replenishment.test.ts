import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey, ExamCode } from "@/lib/questions/types";

// 公式正答表を直接読み取った値。配信データから期待値を生成しない。
const editions = [
  { exam: "zoen-gino2", year: 2024, season: "early", name: "造園", domain: "construction",
    answers: "×○○○×" + "○○××○" + "○×××○" + "××○×○" + "××××○" + "ハニハニハ" + "ロハロニハ" + "イロイニイ" + "ロロハロイ" + "ハロイニニ",
    pages: [...Array(19).fill(2), ...Array(6).fill(3), ...Array(6).fill(4), ...Array(6).fill(5), ...Array(6).fill(6), ...Array(6).fill(7), 8], figures: [] as number[] },
  { exam: "zoen-gino3", year: 2024, season: "early", name: "造園", domain: "construction",
    answers: "○○××○" + "×××○○" + "○×○×○" + "×××○×" + "×○××○" + "×○○○○",
    pages: [...Array(19).fill(2), ...Array(11).fill(3)], figures: [] as number[] },
  { exam: "zoen-gino1", year: 2023, season: "early", name: "造園", domain: "construction",
    answers: "○×○××" + "○×○×○" + "○×○○○" + "××○××" + "○○○○×" + "ハイハニニ" + "ハイニロハ" + "ロニニイハ" + "ロイロハニ" + "ロハニイロ",
    pages: [...Array(17).fill(2), ...Array(8).fill(3), ...Array(6).fill(4), ...Array(6).fill(5), ...Array(6).fill(6), ...Array(6).fill(7), 8], figures: [19] },
];

describe.each(editions)("c5-26 $exam $year", ({ exam: code, year, season, name, domain, answers, pages, figures }) => {
  const exam = code as ExamCode;
  it("公式正答と出典を保持し、全問が配信・表示・ルート解決できる", async () => {
    const allRows = QUESTIONS_BY_EXAM[exam]!;
    const rows = allRows.filter(q => q.year === year && q.season === season);
    expect(rows).toHaveLength(answers.length);
    expect(new Set(allRows.map(q => q.id)).size).toBe(allRows.length);
    expect(await getQuestionsForExam(exam)).toEqual(allRows);
    expect(getQualificationByExamCode(exam)?.domain).toBe(domain);
    expect(getQualificationByExamCode(exam)?.fullName).toContain(name);
    expect(EXAM_CONFIGS[exam].yearRange).toEqual({ start: Math.min(...allRows.map(q => q.year)), end: Math.max(...allRows.map(q => q.year)) });
    const evidence = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-${season}.sources.json`), "utf8"));
    expect(evidence.review).toHaveLength(answers.length);
    expect(evidence.choiceExplanationCount).toBe(answers.length === 30 ? 60 : 150);
    expect(evidence.figureCount).toBe(figures.length);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.qNumber, q.id).toBe(i + 1);
      expect(q.id).toBe(`${exam}-${year}-${season}-gakka-${answers.length === 30 ? "" : i < 25 ? "a-" : "b-"}${String(answers.length === 30 ? i + 1 : i % 25 + 1).padStart(3, "0")}`);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(key);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(questionSourceEdition(q)).toBe(`${year}年度${season === "late" ? "後期" : "前期"}`);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices!));
      expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
      expect(q.sourcePdfUrl, q.id).toBe(`${evidence.sources[0].url}#page=${pages[i]}`);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(allRows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
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
