import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { MEKKI2_QUESTIONS } from "@/data/questions/mekki2";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, choiceDisplayLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ChoiceKey, ExamCode } from "@/lib/questions/types";

// Independently transcribed from the official answer tables, five per row.
const SITTINGS = [{ exam: "mekki2" as ExamCode, year: 2024,
  answers: "○○○×○" + "×○○○○" + "○○×○×" + "○×○×○" + "○○×○○"
    + "ニイニイニ" + "ロハハハハ" + "ロロハハニ" + "イロイロハ" + "ハニロロイ",
}];

describe("電気めっきの公式正答・表示・演習経路", () => {
  for (const { exam, year, answers } of SITTINGS) {
    const questions = MEKKI2_QUESTIONS.filter(q => q.exam === exam && q.year === year);
    it(`${exam} ${year}: 50問を原本の番号・正答で採点する`, () => {
      expect(questions).toHaveLength(50);
      expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
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
        expect(findQuestionByRoute(questions, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
        const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id });
        expect(JSON.stringify(graph), q.id).toContain(`${official}: ${q.choices![key as ChoiceKey]}`);
      }
    });
    it(`${exam} ${year}: 公式出典と照合記録が揃う`, () => {
      const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-early.sources.json`), "utf8"));
      expect(source.review).toHaveLength(50);
      expect(source.sources).toHaveLength(2);
      for (const q of questions) {
        expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/.*#page=\d+$/);
        expect(q.sourceAnswerUrl).toContain("kentei.javada.or.jp/pdf/");
        expect(q.question).not.toMatch(/\\n/);
      }
    });
  }
  it("一覧と非同期ローダーから演習へ到達できる", async () => {
    expect(QUESTIONS_BY_EXAM.mekki2).toEqual(MEKKI2_QUESTIONS);
    expect(await getQuestionsForExam("mekki2")).toEqual(MEKKI2_QUESTIONS);
    expect(getQualificationByExamCode("mekki2")?.status).toBe("live");
    expect(choiceDisplayLabel("mekki2", "ア")).toBe("イ");
    expect(choiceDisplayLabel("mekki2", "エ")).toBe("ニ");
  });
  it("表面処理の本文を欠落した表と誤認せず、本当の表の欠落は検出する", () => {
    const q = MEKKI2_QUESTIONS.find(q => q.year === 2024 && q.qNumber === 46)!;
    expect(q.question).toContain("次の表面処理");
    expect(hasUnrenderableContent(q)).toBe(false);
    expect(hasUnrenderableContent({ ...q, question: "次の表に示す数値を選べ。" })).toBe(true);
  });
});
