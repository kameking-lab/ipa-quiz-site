import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { KAGU1_QUESTIONS } from "@/data/questions/kagu1";
import { KAGU3_QUESTIONS } from "@/data/questions/kagu3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import type { ChoiceKey, Question } from "@/lib/questions/types";

// Read independently from the official answer tables, in printed column order.
const editions = [
  { exam: "kagu1" as const, year: 2023, season: "early", rows: KAGU1_QUESTIONS.filter(q => q.year === 2023),
    answers: "○×○×○" + "×××○○" + "○×○○×" + "×××××" + "○○○××"
      + "ハハロニイ" + "ロイハロロ" + "ニロロロニ" + "ロニロハニ" + "ハニイニハ", figures: [3, 4, 11, 20, 28, 45], edition: "2023年度前期" },
  { exam: "kagu1" as const, year: 2024, season: "early", rows: KAGU1_QUESTIONS.filter(q => q.year === 2024),
    answers: "○××○×" + "○○×○○" + "×○○××" + "○○○×○" + "×××○○"
      + "イハロイイ" + "ニロイニロ" + "イイハハロ" + "ハハニハニ" + "イニイハハ", figures: [3, 4, 13, 28, 39], edition: "2024年度前期" },
  { exam: "kagu3" as const, year: 2024, season: "late", rows: KAGU3_QUESTIONS,
    answers: "○○×○×○×○○○" + "○○○××××○○○" + "××○○×○○○○×", figures: [16, 25, 26, 28], edition: "2024年度後期" },
];

describe.each(editions)("家具製作 $exam $edition", ({ exam, year, season, rows, answers, figures, edition }) => {
  it("公式の問番号・正答で採点し、同じ公式記号を解説ページにも表示する", () => {
    expect(rows).toHaveLength(answers.length);
    expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: answers.length }, (_, i) => i + 1));
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(key);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
      expect(questionSourceEdition(q), q.id).toBe(edition);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id });
      expect(JSON.stringify(graph), q.id).toContain(`${official}: ${q.choices![key]}`);
    }
  });

  it("同期・非同期の一覧と年度・分野の演習経路で全問に到達する", async () => {
    const loaded = await getQuestionsForExam(exam);
    expect(loaded.filter(q => q.year === year && q.season === season)).toEqual(rows);
    expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === year && q.season === season)).toEqual(rows);
    const config = EXAM_CONFIGS[exam];
    expect(config.nameFull).toContain("家具製作（家具手加工作業）");
    expect(getQualificationByExamCode(exam)?.shortName).toContain("家具製作技能士");
    expect(usesNumberedChoices(exam)).toBe(true);
    expect(config.seasons).toContain(season);
    expect(rows.every(q => config.sessions[0].categories!.includes(q.category))).toBe(true);
    expect(new Set(loaded.map(q => q.id)).size).toBe(loaded.length);
  });

  it("全問の公式出典と図が揃い、PNGが表示用フィールドから参照される", () => {
    const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-${season}.sources.json`), "utf8"));
    expect(source.review).toHaveLength(rows.length);
    expect(source.sources).toHaveLength(2);
    expect(source.figureCount).toBe(figures.length);
    expect(rows.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
    for (const q of rows as Question[]) {
      expect(q.sourcePdfUrl).toMatch(/https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+#page=\d+$/);
      expect(q.sourceAnswerUrl).toMatch(/https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+\.pdf$/);
      if (q.hasImage) {
        expect(q.imageUrls?.length, q.id).toBeGreaterThan(0);
        expect(q.imageAltTexts?.length, q.id).toBe(q.imageUrls?.length);
      }
      for (const url of q.imageUrls ?? []) {
        const png = readFileSync(path.join(process.cwd(), "public", url));
        expect(png.subarray(1, 4).toString()).toBe("PNG");
        expect(png.length).toBeGreaterThan(1000);
      }
    }
  });
});
