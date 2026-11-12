import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { KINZOKU_NETSUSHORI1_QUESTIONS } from "@/data/questions/kinzoku-netsushori1";
import { KINZOKU_NETSUSHORI3_QUESTIONS } from "@/data/questions/kinzoku-netsushori3";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, choiceDisplayLabel, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ChoiceKey, ExamCode } from "@/lib/questions/types";

// Official answer sheets independently read from their rendered tables.
const SITTINGS = [{ exam: "kinzoku-netsushori1" as ExamCode, year: 2025, count: 50,
  answers: "×○××○" + "×○××○" + "×○×○×" + "×○○○×" + "×○○○×"
    + "ハハロロニ" + "ニニハハニ" + "イハロイハ" + "ニニロロハ" + "ニハロロハ",
}, { exam: "kinzoku-netsushori3" as ExamCode, year: 2025, count: 30,
  answers: "××××○○○○○○" + "○○×○××××○○" + "○××○××○○×○",
}, { exam: "kinzoku-netsushori1" as ExamCode, year: 2024, count: 50,
  answers: "××○○×" + "○○○××" + "○○×○×" + "××○○○" + "○×○×○"
    + "ハハハハハ" + "ニニロロロ" + "イイハニハ" + "ハイロロニ" + "ロロハハニ",
}];

describe("一般熱処理作業の公式原本・採点・学習経路", () => {
  for (const { exam, year, count, answers } of SITTINGS) {
    const questions = [...KINZOKU_NETSUSHORI1_QUESTIONS, ...KINZOKU_NETSUSHORI3_QUESTIONS].filter(q => q.exam === exam && q.year === year);
    it(`${exam} ${year}: 原本の番号と正答を保持して採点・表示できる`, () => {
      expect(questions).toHaveLength(count);
      expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: count }, (_, i) => i + 1));
      expect(questions.map(q => q.officialAnswerNumber).join("")).toBe(answers);
      expect(usesNumberedChoices(exam)).toBe(true);
      for (const q of questions) {
        const official = answers[q.qNumber - 1];
        const key = official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)];
        expect(q.answer, q.id).toBe(key);
        expect(formatQuestionAnswerForDisplay(q, q.answer as ChoiceKey), q.id).toBe(official);
        expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(questionSourceEdition(q)).toBe(`${year}年度前期`);
        const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
        const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id });
        expect(JSON.stringify(graph)).toContain(`${official}: ${q.choices![key as ChoiceKey]}`);
      }
    });
    it(`${exam} ${year}: 本文・出典・必要な原図が揃う`, () => {
      const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-early.sources.json`), "utf8"));
      expect(source.questions).toHaveLength(count);
      expect(source.officialSources).toHaveLength(2);
      for (const q of questions) {
        expect(q.question).not.toMatch(/\\n/);
        expect(q.sourceAnswerUrl).toContain("kentei.javada.or.jp/pdf/");
        if (!q.hasImage) continue;
        expect(q.imageUrls, q.id).toHaveLength(1);
        expect(q.imageAltTexts?.[0], q.id).toBeTruthy();
        expect(readFileSync(path.join(process.cwd(), "public", q.imageUrls![0])).subarray(8, 12).toString()).toBe("WEBP");
      }
    });
  }
  it("一覧と非同期ローダーから演習へ到達できる", async () => {
    expect(QUESTIONS_BY_EXAM["kinzoku-netsushori1"]).toEqual(KINZOKU_NETSUSHORI1_QUESTIONS);
    expect(await getQuestionsForExam("kinzoku-netsushori1")).toEqual(KINZOKU_NETSUSHORI1_QUESTIONS);
    expect(getQualificationByExamCode("kinzoku-netsushori1")?.status).toBe("live");
    expect(QUESTIONS_BY_EXAM["kinzoku-netsushori3"]).toEqual(KINZOKU_NETSUSHORI3_QUESTIONS);
    expect(await getQuestionsForExam("kinzoku-netsushori3")).toEqual(KINZOKU_NETSUSHORI3_QUESTIONS);
    expect(getQualificationByExamCode("kinzoku-netsushori3")?.status).toBe("live");
    expect(choiceDisplayLabel("kinzoku-netsushori3", "ア")).toBe("○");
    expect(choiceDisplayLabel("kinzoku-netsushori3", "イ")).toBe("×");
    expect(choiceDisplayLabel("kinzoku-netsushori1", "ア")).toBe("イ");
    expect(choiceDisplayLabel("kinzoku-netsushori1", "エ")).toBe("ニ");
  });
  it("耐火モルタルと断熱材を区別して公式正答ニを保持する", () => {
    const q = KINZOKU_NETSUSHORI1_QUESTIONS.find(q => q.year === 2025 && q.qNumber === 32)!;
    expect(q.choices?.エ).toBe("耐火モルタルは、炉壁の断熱材としても用いられる。");
    expect(q.officialAnswerNumber).toBe("ニ");
    expect(q.explanation).toContain("目地");
  });
});
