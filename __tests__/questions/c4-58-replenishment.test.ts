import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { ZOEN_GINO2_QUESTIONS } from "@/data/questions/zoen-gino2";
import { ZOEN_GINO3_QUESTIONS } from "@/data/questions/zoen-gino3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答表の画像を5問ずつ読み取り固定した照合用の正答。
const editions = [
  { exam: "zoen-gino2" as const, rows: ZOEN_GINO2_QUESTIONS.filter(q => q.year === 2025), season: "early" as const,
    answers: "×○×○×" + "○××○×" + "×××○○" + "○×○××" + "○×○×○"
      + "ハニロニロ" + "イイロイロ" + "ハハニロハ" + "ニイロイニ" + "ニイハロイ",
    pages: [...Array(18).fill(2), ...Array(7).fill(3), ...Array(6).fill(4), ...Array(6).fill(5), ...Array(6).fill(6), ...Array(6).fill(7), 8],
    figures: [] as number[] },
  { exam: "zoen-gino3" as const, rows: ZOEN_GINO3_QUESTIONS.filter(q => q.year === 2025 && q.season === "early"), season: "early" as const,
    answers: "○××○○" + "×○×○×" + "○×○○×" + "○○×○○" + "××○○×" + "×○×○×",
    pages: [...Array(17).fill(2), ...Array(13).fill(3)],
    figures: [] as number[] },
  { exam: "zoen-gino3" as const, rows: ZOEN_GINO3_QUESTIONS.filter(q => q.year === 2025 && q.season === "late"), season: "late" as const,
    answers: "××○○○" + "○××○○" + "×××○○" + "×○○××" + "×○×○×" + "○○○××",
    pages: [...Array(19).fill(2), ...Array(11).fill(3)],
    figures: [] as number[] },
];

describe.each(editions)("c4-58 $exam", ({ exam, rows, season, answers, pages, figures }) => {
  it("公式正答・出典ページ・図と、画面および構造化データの表示を保持する", () => {
    expect(rows).toHaveLength(answers.length);
    expect(new Set(rows.map(q => q.id)).size).toBe(answers.length);
    const evidence = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/2025-${season}.sources.json`), "utf8"));
    expect(evidence.review).toHaveLength(rows.length);
    expect(evidence.figureCount).toBe(figures.length);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(key);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(questionSourceEdition(q), q.id).toBe(`2025年度${String(season) === "late" ? "後期" : "前期"}`);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
      expect(q.sourcePdfUrl, q.id).toBe(`${evidence.sources[0].url}#page=${pages[i]}`);
      expect(q.sourceAnswerUrl, q.id).toBe(evidence.sources[1].url);
      expect(q.officialQuestionLabel).toBe(rows.length === 30 ? String(i + 1) : i < 25 ? `A群 ${i + 1}` : `B群 ${i - 24}`);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = JSON.stringify(buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id }));
      expect(graph).toContain(`${official}: ${q.choices![key]}`);
      expect(graph).toContain("中央職業能力開発協会");
      expect(q.hasImage).toBe(figures.includes(q.qNumber));
      if (q.hasImage) {
        expect(q.imageAltTexts).toHaveLength(q.imageUrls!.length);
        for (const url of q.imageUrls!) {
          const png = readFileSync(path.join(process.cwd(), "public", url));
          expect(png.subarray(0, 8).toString("hex"), url).toBe("89504e470d0a1a0a");
          expect(png.readUInt32BE(16)).toBeGreaterThan(20);
          expect(png.readUInt32BE(20)).toBeGreaterThan(20);
        }
      }
    }
  });
  it("一覧・演習の両ローダーで全問を配信し、級に応じて原本の記号を使う", async () => {
    expect(QUESTIONS_BY_EXAM[exam]!.filter(q => q.year === 2025 && q.season === season)).toEqual(rows);
    expect((await getQuestionsForExam(exam)).filter(q => q.year === 2025 && q.season === season)).toEqual(rows);
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(rows.length);
    expect(EXAM_CONFIGS[exam].seasons).toContain(season);
    expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    const labels = rows.length === 30 ? ["○", "×"] : ["イ", "ロ", "ハ", "ニ"];
    expect((rows.length === 30 ? ["ア", "イ"] : ["ア", "イ", "ウ", "エ"]).map(k => choiceDisplayLabel(exam, k as ChoiceKey))).toEqual(labels);
  });
});

