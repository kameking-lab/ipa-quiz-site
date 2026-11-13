import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { INSATSU1_QUESTIONS } from "@/data/questions/insatsu1";
import { INSATSU2_QUESTIONS } from "@/data/questions/insatsu2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_DESCRIPTIONS, examMetaDescription } from "@/lib/seo/exam-meta";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import type { ChoiceKey } from "@/lib/questions/types";

// Independently transcribed from the official answer tables, by printed column.
const editions = [
 { exam: "insatsu1" as const, year: 2024, rows: INSATSU1_QUESTIONS.filter(q => q.year === 2024),
 answers: "○×○○××○○○○××○××○×○○×○××××" + "ハハニハイイニイロニイロイニイニロイハロハロハイハ", figures: [37], name: "印刷" },
 { exam: "insatsu1" as const, year: 2025, rows: INSATSU1_QUESTIONS.filter(q => q.year === 2025),
 answers: "×○×○○○○×○×○○×○××○×○××○××○" + "ハロイハニロイイニハニロハニニロニニイロロニハハハ", figures: [16], name: "印刷" },
 { exam: "insatsu2" as const, year: 2023, rows: INSATSU2_QUESTIONS,
 answers: "×○×××○××○○×○××○××○××××○○○" + "ハハニロハハニイニイニハロハイニロハロハイロハハハ", figures: [], name: "印刷" },
];

describe.each(editions)("技能検定 $exam $year 年度前期", ({ exam, year, rows, answers, figures, name }) => {
  it("公式正答で採点し、表示・構造化データ・問題URLで公式記号と問番号を保つ", () => {
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
      expect(questionSourceEdition(q), q.id).toBe(`${year}年度前期`);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id });
      expect(JSON.stringify(graph), q.id).toContain(`${official}: ${q.choices![key]}`);
    }
  });

  it("一覧と年度・分野を選んだ演習から同期・非同期で全問に到達する", async () => {
    const loaded = await getQuestionsForExam(exam);
    expect(loaded.filter(q => q.year === year)).toEqual(rows);
    expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === year)).toEqual(rows);
    expect(EXAM_CONFIGS[exam].nameFull).toContain(name);
    expect(EXAM_DESCRIPTIONS[exam]).toContain("印刷技能士" + exam.slice(-1) + "級（オフセット印刷作業）");
    expect(examMetaDescription(exam, loaded.length)).toContain("印刷技能士" + exam.slice(-1) + "級（オフセット印刷作業）");
    expect(getQualificationByExamCode(exam)?.shortName).toContain(name+"技能士");
    expect(usesNumberedChoices(exam)).toBe(true);
    expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    expect(new Set(loaded.map(q => q.id)).size).toBe(loaded.length);
  });

  it("全問の原本照合記録と必要な図が表示フィールドに揃う", () => {
    const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-early.sources.json`), "utf8"));
    expect(source.review).toHaveLength(rows.length);
    expect(source.sources).toHaveLength(2);
    expect(source.sources.every((s: { httpStatus: number; sha256: string }) => s.httpStatus === 200 && /^[a-f0-9]{64}$/.test(s.sha256))).toBe(true);
    expect(source.figureCount).toBe(figures.length);
    expect(rows.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
    for (const q of rows) {
      expect(q.sourcePdfUrl).toMatch(/https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+#page=\d+$/);
      expect(q.sourceAnswerUrl).toMatch(/https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+\.pdf$/);
      for (const url of q.imageUrls ?? []) {
        const png = readFileSync(path.join(process.cwd(), "public", url));
        expect(png.subarray(1, 4).toString()).toBe("PNG");
        expect(png.length).toBeGreaterThan(1000);
      }
    }
  });
});
