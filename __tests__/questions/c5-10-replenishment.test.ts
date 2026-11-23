import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey, ExamCode } from "@/lib/questions/types";

// 公式正答表の画像を5問ごとに読み直した固定値。元のイロハニと配信記号の対応も検査する。
const editions = [
  { exam: "tekkin-zumen3", year: 2023, season: "late", domain: "construction",
    answers: "×○×○×" + "○×○○○" + "○××××" + "○×○×○" + "×○××○" + "×○○○○",
    pages: [...Array(11).fill(2), ...Array(10).fill(3), ...Array(9).fill(4)],
    figures: [5, 7, 9, 12, 18, 23, 24] },
  { exam: "kinzoku-press1", year: 2024, season: "early", domain: "electrical",
    answers: "○○○○○" + "○×○○×" + "○×○×○" + "○○○×○" + "○×○○×"
      + "ハロイハイ" + "イニハニニ" + "ニロハイロ" + "ハイニロロ" + "ロニハハハ",
    pages: [...Array(16).fill(2), ...Array(9).fill(3), ...Array(6).fill(4), ...Array(5).fill(5), ...Array(5).fill(6), ...Array(6).fill(7), ...Array(3).fill(8)],
    figures: [33, 46, 48] },
  { exam: "kinzoku-press2", year: 2024, season: "early", domain: "electrical",
    answers: "×××○×" + "○○○○○" + "○○○○×" + "×○×○○" + "×○○×○"
      + "イニニイイ" + "ハハハハハ" + "ハロロイニ" + "ハハハロハ" + "ハイロイロ",
    pages: [...Array(16).fill(2), ...Array(9).fill(3), ...Array(5).fill(4), ...Array(5).fill(5), ...Array(5).fill(6), ...Array(5).fill(7), ...Array(5).fill(8)],
    figures: [31, 35, 36, 46, 49] },
];

describe.each(editions)("c5-10 $exam $year", ({ exam: code, year, season, domain, answers, pages, figures }) => {
  const exam = code as ExamCode;
  it("公式正答と図・出典・通し番号を保持し配信経路から解ける", async () => {
    const rows = QUESTIONS_BY_EXAM[exam]!.filter(q => q.year === year && q.season === season);
    expect(rows).toHaveLength(answers.length);
    expect(answers.length).toBe(exam === "tekkin-zumen3" ? 30 : 50);
    expect(new Set(rows.map(q => q.id)).size).toBe(answers.length);
    expect((await getQuestionsForExam(exam)).filter(q => q.year === year && q.season === season)).toEqual(rows);
    expect(getQualificationByExamCode(exam)?.domain).toBe(domain);
    expect(getQualificationByExamCode(exam)?.fullName).toContain(exam === "tekkin-zumen3" ? "鉄筋施工図作成作業" : "金属プレス作業");
    expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(year);
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(answers.length);
    const evidence = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-${season}.sources.json`), "utf8"));
    expect(evidence.review).toHaveLength(answers.length);
    expect(evidence.choiceExplanationCount).toBe(exam === "tekkin-zumen3" ? 60 : 150);
    expect(evidence.figureCount).toBe(figures.length);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(key);
      expect(q.officialQuestionLabel).toBe(exam === "tekkin-zumen3" ? String(i + 1) : `${i < 25 ? "A" : "B"}群 ${i % 25 + 1}`);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(choiceDisplayLabel(exam, key)).toBe(exam === "tekkin-zumen3" ? official : "イロハニ"["アイウエ".indexOf(key)]);
      expect(questionSourceEdition(q)).toBe(`${year}年度${season === "early" ? "前期" : "後期"}`);
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
