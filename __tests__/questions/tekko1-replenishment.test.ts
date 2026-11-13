import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { TEKKO1_QUESTIONS } from "@/data/questions/tekko1";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ChoiceKey } from "@/lib/questions/types";

// Independently transcribed from the rendered official answer sheet, five per row.
const SITTINGS = [{
  year: 2024,
  answers: "○×○○×" + "○○○○○" + "×○×○○" + "×○×××" + "×○○×○"
    + "イハロニハ" + "ハロニハハ" + "ロイロハイ" + "ニニイニロ" + "イハニハハ",
}, {
  year: 2023,
  answers: "○○×××" + "○××○×" + "○×○××" + "○○××○" + "××××○"
    + "ハイイイハ" + "ニイロハロ" + "ハロニニロ" + "ハロイロロ" + "ハハロニハ",
}];

describe("鉄工1級の公式原本と学習経路", () => {
  for (const { year, answers } of SITTINGS) {
    const questions = TEKKO1_QUESTIONS.filter(q => q.year === year);
    it(`${year}: 真偽法と択一法を公式正答どおり表示・採点できる`, () => {
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
        const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(TEKKO1_QUESTIONS, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
      }
      expect(usesNumberedChoices("tekko1")).toBe(true);
    });
    it(`${year}: 出典と必要な原図が揃う`, () => {
      const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/tekko1/${year}-early.sources.json`), "utf8"));
      expect(source.questions).toHaveLength(50);
      for (const q of questions.filter(q => q.hasImage)) {
        expect(q.imageUrls, q.id).toHaveLength(1);
        expect(q.imageAltTexts?.[0], q.id).toBeTruthy();
        expect(readFileSync(path.join(process.cwd(), "public", q.imageUrls![0])).subarray(8, 12).toString()).toBe("WEBP");
      }
    });
  }
  it("一覧と非同期ローダーから演習へ到達できる", async () => {
    expect(QUESTIONS_BY_EXAM.tekko1).toEqual(TEKKO1_QUESTIONS);
    expect(await getQuestionsForExam("tekko1")).toEqual(TEKKO1_QUESTIONS);
    expect(getQualificationByExamCode("tekko1")?.status).toBe("live");
  });
  it("クレーンの例外を注記して公式正答○を保持する", () => {
    const q = TEKKO1_QUESTIONS.find(q => q.year === 2024 && q.qNumber === 15)!;
    expect(q.officialAnswerNumber).toBe("○");
    expect(q.explanation).toContain("床上操作式");
    expect(q.explanation).toContain("技能講習");
  });
  it("構造化データでも真偽法を○・×で表す", () => {
    for (const q of TEKKO1_QUESTIONS.filter(q => q.qNumber <= 25)) {
      const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id });
      expect(JSON.stringify(graph)).toContain(`${q.officialAnswerNumber}: ${q.choices![q.answer as ChoiceKey]}`);
    }
  });
  it("円すい展開の母線長と丸棒の断面積を使って計算する", () => {
    const questions = TEKKO1_QUESTIONS.filter(q => q.year === 2023);
    expect(questions.find(q => q.qNumber === 35)?.explanation).toContain("314 mm²");
    expect(questions.find(q => q.qNumber === 47)?.explanation).toContain("150√2");
    expect(questions.find(q => q.qNumber === 47)?.explanation).toContain("254.6°");
  });
});
