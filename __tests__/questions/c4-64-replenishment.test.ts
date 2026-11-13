import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { KOGAKU_GLASS1_QUESTIONS } from "@/data/questions/kogaku-glass1";
import { SANGYO_SHARYO1_QUESTIONS } from "@/data/questions/sangyo-sharyo1";
import { YOGASHI1_QUESTIONS } from "@/data/questions/yogashi1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答表を画像でも確認した固定値。原本のA/B群各25問と照合する。
const editions = [
  { exam: "kogaku-glass1" as const, rows: KOGAKU_GLASS1_QUESTIONS, season: "early" as const, answers: "×○○×××××○×○×○○○×○×××××○○×ハハロロニハロハニハハイイニハニロニハロハニイイロ", pages: [...Array(17).fill(2),...Array(8).fill(3),...Array(6).fill(4),...Array(5).fill(5),...Array(5).fill(6),...Array(6).fill(7),...Array(3).fill(8)], figures: [39] },
  { exam: "sangyo-sharyo1" as const, rows: SANGYO_SHARYO1_QUESTIONS, season: "early" as const, answers: "○××××○○○×××××○×○○×○○○××××ハハニイイニロハハハニニイイロロイハロニハニニイロ", pages: [...Array(12).fill(2),...Array(10).fill(3),...Array(3).fill(4),...Array(5).fill(5),...Array(5).fill(6),...Array(3).fill(7),...Array(5).fill(8),...Array(4).fill(9),...Array(3).fill(10)], figures: [19,21,44,45,46] },
  { exam: "yogashi1" as const, rows: YOGASHI1_QUESTIONS, season: "late" as const, answers: "○○○×××○○×○○×××○×○××○○××××ハハハニイニニハイイハロロニニイハニハイハハハイニ", pages: [...Array(16).fill(2),...Array(9).fill(3),...Array(6).fill(4),...Array(6).fill(5),...Array(6).fill(6),...Array(6).fill(7),8], figures: [] as number[] }
];

describe.each(editions)("c4-64 $exam", ({ exam, rows, season, answers, pages, figures }) => {
  it("公式正答・出典ページ・全選択肢と図を保ち、画面と構造化データで元の記号を表示する", () => {
    expect(rows).toHaveLength(50);
    expect(answers).toHaveLength(50);
    expect(new Set(rows.map(q => q.id)).size).toBe(50);
    const evidence = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/2025-${season}.sources.json`), "utf8"));
    expect(evidence.review).toHaveLength(50);
    expect(evidence.figureCount).toBe(figures.length);
    for (const [i,q] of rows.entries()) {
      const official=answers[i];
      const key=(official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.qNumber).toBe(i+1);
      expect(q.officialAnswerNumber,q.id).toBe(official);
      expect(q.answer,q.id).toBe(key);
      expect(q.officialQuestionLabel).toBe(`${i<25 ? "A" : "B"}群 ${i%25+1}`);
      expect(formatQuestionAnswerForDisplay(q,key),q.id).toBe(official);
      expect(questionSourceEdition(q)).toBe(`2025年度${String(season)==="late" ? "後期" : "前期"}`);
      expect(isPracticeReadyQuestion(q),q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices!));
      expect(q.sourcePdfUrl,q.id).toBe(`${evidence.sources[0].url}#page=${pages[i]}`);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows,{exam:routeExam,yearSeason,section,qnum})?.id).toBe(q.id);
      const graph=JSON.stringify(buildQuestionJsonLd({question:q,pageUrlAbs:`https://www.kakomon-ai.jp${questionPagePath(q)}`,title:q.id}));
      expect(graph).toContain(`${official}: ${q.choices![key]}`);
      expect(graph).toContain("中央職業能力開発協会");
      expect(q.hasImage).toBe(figures.includes(q.qNumber));
      if(q.hasImage) {
        expect(q.imageAltTexts).toHaveLength(q.imageUrls!.length);
        for(const url of q.imageUrls!) {
          const png=readFileSync(path.join(process.cwd(),"public",url));
          expect(png.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
          expect(png.readUInt32BE(16)).toBeGreaterThan(30);
        }
      }
    }
  });
  it("一覧・演習で50問を配信し、原本の選択肢記号を保持する", async () => {
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(rows);
    expect(await getQuestionsForExam(exam)).toEqual(rows);
    expect(EXAM_CONFIGS[exam].nameFull).toContain("技能検定 1級");
    expect(EXAM_CONFIGS[exam].nameFull).not.toContain("?");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(50);
    expect(EXAM_CONFIGS[exam].seasons).toContain(season);
    expect(rows.every(q=>EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    expect(["ア","イ","ウ","エ"].map(k=>choiceDisplayLabel(exam,k as ChoiceKey))).toEqual(["イ","ロ","ハ","ニ"]);
  });
});


it("下線部の対応と公式原文の短い設問を保つ", () => {
  expect(SANGYO_SHARYO1_QUESTIONS[36].question).toContain("【ニ：10秒以上経過してから電流値】");
  expect(SANGYO_SHARYO1_QUESTIONS[38].choices?.ア).toBe("炭素");
  expect(SANGYO_SHARYO1_QUESTIONS[45].choices?.ウ).toBe("図のハ");
  expect(YOGASHI1_QUESTIONS[43].question).toBe("次のうち、有彩色はどれか。");
  expect(YOGASHI1_QUESTIONS[41].officialAnswerNumber).toBe("ハ");
  expect(KOGAKU_GLASS1_QUESTIONS[10].question).toContain("np管理図");
});
