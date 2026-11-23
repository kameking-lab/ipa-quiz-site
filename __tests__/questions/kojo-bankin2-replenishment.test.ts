import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { KOJO_BANKIN2_QUESTIONS } from "@/data/questions/kojo-bankin2";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ChoiceKey } from "@/lib/questions/types";

// Read independently from the rendered 2024 official answer table, five per row.
const ANSWERS = "××××○" + "×○×○○" + "○×○×○" + "○○○×○" + "××○×○"
  + "ニロロロハ" + "ニニイロハ" + "イニニロニ" + "ハハロロニ" + "ロハイイロ";

describe("工場板金2級2024年度の公式原本と学習経路", () => {
  const questions = KOJO_BANKIN2_QUESTIONS.filter(q => q.year === 2024);
  it("50問を原本の真偽法・択一法の正答どおり表示・採点する", () => {
    expect(questions).toHaveLength(50);
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(questions.map(q => q.officialAnswerNumber).join("")).toBe(ANSWERS);
    for (const q of questions) {
      const official = ANSWERS[q.qNumber - 1];
      const answer = official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)];
      expect(q.answer, q.id).toBe(answer);
      expect(formatQuestionAnswerForDisplay(q, q.answer as ChoiceKey), q.id).toBe(official);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(questionSourceEdition(q)).toBe("2024年度前期");
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(KOJO_BANKIN2_QUESTIONS, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
    expect(usesNumberedChoices("kojo-bankin2")).toBe(true);
  });
  it("必要な原図7点と出典、代替文が揃う", () => {
    const source = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/kojo-bankin2/2024-early.sources.json"), "utf8"));
    expect(source.questions).toHaveLength(50);
    expect(questions.filter(q => q.hasImage)).toHaveLength(7);
    for (const q of questions.filter(q => q.hasImage)) {
      expect(q.imageUrls, q.id).toHaveLength(1);
      expect(q.imageAltTexts?.[0], q.id).toBeTruthy();
      expect(readFileSync(path.join(process.cwd(), "public", q.imageUrls![0])).subarray(8, 12).toString()).toBe("WEBP");
    }
  });
  it("一覧・非同期ローダーから演習に到達できる", async () => {
    expect(QUESTIONS_BY_EXAM["kojo-bankin2"]).toEqual(KOJO_BANKIN2_QUESTIONS);
    expect(await getQuestionsForExam("kojo-bankin2")).toEqual(KOJO_BANKIN2_QUESTIONS);
    expect(getQualificationByExamCode("kojo-bankin2")?.status).toBe("live");
  });
  it("真偽法の構造化データも公式の○・×で表示する", () => {
    for (const q of questions.filter(q => q.qNumber <= 25)) {
      const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id });
      expect(JSON.stringify(graph)).toContain(`${q.officialAnswerNumber}: ${q.choices![q.answer as ChoiceKey]}`);
    }
  });
  it("並列抵抗の和とそり・スプリングバックを取り違えない", () => {
    expect(questions.find(q => q.qNumber === 14)?.explanation).toContain("12/11");
    expect(questions.find(q => q.qNumber === 1)?.explanation).toContain("スプリングバック");
    const q = questions.find(q => q.qNumber === 9)!;
    expect(q.officialAnswerNumber).toBe("○");
    expect(q.explanation).toContain("連続した偏り");
  });
});
