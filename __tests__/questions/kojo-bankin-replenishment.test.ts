import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { KOJO_BANKIN1_QUESTIONS } from "@/data/questions/kojo-bankin1";
import { KOJO_BANKIN3_QUESTIONS } from "@/data/questions/kojo-bankin3";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ChoiceKey } from "@/lib/questions/types";

// Independently read from the rendered official answer table, five per row.
const SITTINGS = [{
  exam: "kojo-bankin1" as const, year: 2024, data: KOJO_BANKIN1_QUESTIONS, figures: 1,
  answers: "○○○○×" + "××○××" + "○××○○" + "○××○○" + "○×○××"
    + "ロハニイイ" + "ニハロロニ" + "イイハニイ" + "ハイロハハ" + "イニイロロ",
}, {
  exam: "kojo-bankin3" as const, year: 2024, data: KOJO_BANKIN3_QUESTIONS, figures: 1,
  answers: "××○○×○○×××" + "○○○○○○×××○" + "○×○○○○×○○×",
}];

describe.each(SITTINGS)("$exam $year 公式原本と学習経路", ({ exam, year, data, figures, answers }) => {
  const questions = data.filter(q => q.year === year);
  it("公式正答を表示・採点し、全肢の解説と年度を保持する", () => {
    expect(questions).toHaveLength(answers.length);
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: answers.length }, (_, i) => i + 1));
    expect(questions.map(q => q.officialAnswerNumber).join("")).toBe(answers);
    for (const q of questions) {
      const official = answers[q.qNumber - 1];
      const key = official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)];
      expect(q.answer, q.id).toBe(key);
      expect(formatQuestionAnswerForDisplay(q, q.answer as ChoiceKey), q.id).toBe(official);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(questionSourceEdition(q)).toBe(`${year}年度前期`);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(data, { exam: routeExam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
    expect(usesNumberedChoices(exam)).toBe(true);
    const keys: ChoiceKey[] = exam === "kojo-bankin3" ? ["ア", "イ"] : ["ア", "イ", "ウ", "エ"];
    expect(keys.map(k => choiceDisplayLabel(exam, k))).toEqual(exam === "kojo-bankin3" ? ["○", "×"] : ["イ", "ロ", "ハ", "ニ"]);
  });
  it("公式出典と必要な図表を揃える", () => {
    const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-early.sources.json`), "utf8"));
    expect(source.questions).toHaveLength(answers.length);
    expect(questions.filter(q => q.hasImage)).toHaveLength(figures);
    for (const q of questions) {
      expect(q.sourceAnswerUrl).toBe(source.officialSources[1].url);
      if (!q.hasImage) continue;
      expect(q.imageAltTexts?.[0], q.id).toBeTruthy();
      expect(readFileSync(path.join(process.cwd(), "public", q.imageUrls![0])).subarray(8, 12).toString()).toBe("WEBP");
    }
  });
  it("一覧と非同期ローダーから演習に到達できる", async () => {
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(data);
    expect(await getQuestionsForExam(exam)).toEqual(data);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
  });
  it("構造化データの正答を公式記号で表す", () => {
    for (const q of questions) {
      const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id });
      expect(JSON.stringify(graph), q.id).toContain(`${q.officialAnswerNumber}: ${q.choices![q.answer as ChoiceKey]}`);
    }
  });
});
