import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { REITO_SEKO2_QUESTIONS } from "@/data/questions/reito-seko2";
import { REITO_SEKO3_QUESTIONS } from "@/data/questions/reito-seko3";
import { REITO_SEKO1_QUESTIONS } from "@/data/questions/reito-seko1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答PDFを5問ずつ確認して固定。内部キーとの対応を独立して検証する。
const editions = [
  { exam: "reito-seko1" as const, year: 2023, all: REITO_SEKO1_QUESTIONS,
    answers: "××××○" + "×○×××" + "○○○○×" + "○○××○" + "○○○×○" + "ハイロニハ" + "イイロイイ" + "ハイハイロ" + "ハニハニハ" + "ニイニイロ", figures: 4 },
  { exam: "reito-seko2" as const, year: 2023, all: REITO_SEKO2_QUESTIONS,
    answers: "○○○○○" + "×××○○" + "×××○○" + "○○×○×" + "○○×○×" + "イニロハロ" + "ロロイロロ" + "イニハハハ" + "ロイイニニ" + "ニロハニロ", figures: 3 },
  { exam: "reito-seko3" as const, year: 2023, all: REITO_SEKO3_QUESTIONS,
    answers: "○×○○×" + "×○×○○" + "×○○○○" + "×××××" + "○××○○" + "○××○×", figures: 2 },
];

describe.each(editions)("c5-40 $exam $year 後期", ({ exam, year, all, answers, figures }) => {
  const rows = all.filter(q => q.year === year && q.season === "late");
  it("全問の公式正答・原本記号・出典・図を保持し、全肢解説を配信する", () => {
    expect(rows).toHaveLength(exam === "reito-seko3" ? 30 : 50);
    expect(new Set(rows.map(q => q.id)).size).toBe(rows.length);
    expect(rows.filter(q => q.hasImage)).toHaveLength(figures);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = ((exam === "reito-seko3" || i < 25) ? official === "○" ? "ア" : "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.answer, q.id).toBe(key);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialQuestionLabel).toBe(exam === "reito-seko3" ? String(i + 1) : i < 25 ? `A群 ${i + 1}` : `B群 ${i - 24}`);
      expect(questionSourceEdition(q)).toBe(`${year}年度後期`);
      expect(isPracticeReadyQuestion(q)).toBe(true);
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      expect(q.explanation.length).toBeGreaterThanOrEqual(50);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/R05-2-.+\.pdf#page=\d+$/);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+\.pdf$/);
      expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
      for (const path of q.imageUrls ?? []) expect(existsSync(join(process.cwd(), "public", path))).toBe(true);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(all, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = JSON.stringify(buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id }));
      expect(graph).toContain(`${official}: ${q.choices![key]}`);
      expect(graph).toContain("中央職業能力開発協会");
    }
  });
  it("一覧と演習で読み込め、正しい資格名・年度・選択肢記号を表示する", async () => {
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(all);
    expect(await getQuestionsForExam(exam)).toEqual(all);
    expect(EXAM_CONFIGS[exam].nameFull).toContain("冷凍空気調和機器施工（冷凍空気調和機器施工作業）");
    expect(EXAM_CONFIGS[exam].seasons).toEqual(["late"]);
    expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(year);
    expect(EXAM_CONFIGS[exam].yearRange.end).toBeGreaterThanOrEqual(year);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(getQualificationByExamCode(exam)?.fullName).toContain("冷凍空気調和機器施工");
    const keys: ChoiceKey[] = exam === "reito-seko3" ? ["ア", "イ"] : ["ア", "イ", "ウ", "エ"];
    expect(keys.map(k => choiceDisplayLabel(exam, k))).toEqual(exam === "reito-seko3" ? ["○", "×"] : ["イ", "ロ", "ハ", "ニ"]);
  });
});
