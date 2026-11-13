import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { KAGU2_QUESTIONS as ALL_KAGU2_QUESTIONS } from "@/data/questions/kagu2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ChoiceKey } from "@/lib/questions/types";

// The official table has separate true/false and multiple-choice columns.
const ANSWERS = "○×○○×" + "○×○○○" + "××○○×" + "○×○×○" + "××○×○"
  + "ハロロハハ" + "ニニニハイ" + "ハハニイロ" + "イニニロニ" + "イイハイハ";
const KAGU2_QUESTIONS = ALL_KAGU2_QUESTIONS.filter(q => q.year === 2024 && q.season === "early");

describe("家具手加工作業2級2024年度の原本正答・図・演習経路", () => {
  it("50問を公式正答と公式の記号で採点できる", () => {
    expect(KAGU2_QUESTIONS).toHaveLength(50);
    expect(KAGU2_QUESTIONS.map(q => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(KAGU2_QUESTIONS.map(q => q.officialAnswerNumber).join("")).toBe(ANSWERS);
    for (const q of KAGU2_QUESTIONS) {
      const official = ANSWERS[q.qNumber - 1];
      const answer = official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)];
      expect(q.answer, q.id).toBe(answer);
      expect(formatQuestionAnswerForDisplay(q, q.answer as ChoiceKey), q.id).toBe(official);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(questionSourceEdition(q)).toBe("2024年度前期");
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(KAGU2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id });
      expect(JSON.stringify(graph), q.id).toContain(`${official}: ${q.choices![answer as ChoiceKey]}`);
    }
  });
  it("一覧・非同期読込み・分野から50問に到達する", async () => {
    expect(QUESTIONS_BY_EXAM.kagu2).toEqual(ALL_KAGU2_QUESTIONS);
    expect(await getQuestionsForExam("kagu2")).toEqual(ALL_KAGU2_QUESTIONS);
    expect(getQualificationByExamCode("kagu2")?.status).toBe("live");
    const config = EXAM_CONFIGS.kagu2;
    expect(config.yearRange.start).toBeLessThanOrEqual(2024);
    expect(KAGU2_QUESTIONS.every(q => config.sessions[0].categories!.includes(q.category))).toBe(true);
    expect(choiceDisplayLabel("kagu2", "エ")).toBe("ニ");
  });
  it("電動機の用途と引出し構造の名称を原本どおり保持する", () => {
    expect(KAGU2_QUESTIONS.find(q => q.qNumber === 31)?.choices?.エ).toBe("三相用の電動機は、主に産業用の機械に用いられる。");
    expect(KAGU2_QUESTIONS.find(q => q.qNumber === 48)?.choices?.イ).toContain("上げ底構造");
  });
  it("公式出典と全問の照合記録が揃い、記号・接合図が欠けない", () => {
    const source = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/kagu2/2024-early.sources.json"), "utf8"));
    expect(source.review).toHaveLength(50);
    expect(source.sources).toHaveLength(2);
    expect(source.figureCount).toBe(2);
    expect(KAGU2_QUESTIONS.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([28, 45]);
    for (const q of KAGU2_QUESTIONS) {
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/.*#page=\d+$/);
      expect(q.sourceAnswerUrl).toContain("kentei.javada.or.jp/pdf/");
      expect(q.question).not.toMatch(/\\n/);
      for (const image of q.imageUrls ?? []) {
        expect(readFileSync(path.join(process.cwd(), "public", image)).length).toBeGreaterThan(1000);
      }
    }
  });
});
