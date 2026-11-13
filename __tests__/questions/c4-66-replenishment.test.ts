import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey, ExamCode } from "@/lib/questions/types";

// 公式正答表を原本画像で確認した固定値。群内番号と配信用の通し番号の対応も検査する。
const editions = [
  { exam: "block-kenchiku3", count: 30, split: 30, answers: "××○○○×○○×○"+"×××○○○○×○×"+"××○○×○×○○○", pages: [...Array(14).fill(2),...Array(11).fill(3),...Array(5).fill(4)], figures: [5,6,21,24,25] },
  { exam: "block-kenchiku1", count: 50, split: 25, answers: "×○○××"+"○○×××"+"○×××○"+"○○×××"+"×××○×"+"ロロハイロ"+"ハロイロニ"+"ニロニイニ"+"ニイハニロ"+"イロハイハ", pages: [...Array(9).fill(2),...Array(12).fill(3),...Array(4).fill(4),...Array(5).fill(5),...Array(5).fill(6),...Array(5).fill(7),...Array(3).fill(8),...Array(6).fill(9),10], figures: [5,8,22,29,30,32,41,43,46] },
];
describe.each(editions)("c4-66 $exam", ({ exam: code, count, split, answers, pages, figures }) => {
  const exam=code as ExamCode;
  it("公式正答・原本記号・出典ページ・図と配信ルートを保持する", async () => {
    const rows=QUESTIONS_BY_EXAM[exam]!;
    expect(rows).toHaveLength(count);
    expect(answers).toHaveLength(count);
    expect(new Set(rows.map(q=>q.id)).size).toBe(count);
    expect(await getQuestionsForExam(exam)).toEqual(rows);
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(count);
    const evidence=JSON.parse(readFileSync(path.join(process.cwd(),`data/questions/${exam}/2025-early.sources.json`),"utf8"));
    expect(evidence.review).toHaveLength(count);
    expect(evidence.figureCount).toBe(figures.length);
    for(const [i,q] of rows.entries()) {
      const official=answers[i];
      const key=(official==="○" ? "ア" : official==="×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.qNumber).toBe(i+1);
      expect(q.officialAnswerNumber,q.id).toBe(official);
      expect(q.answer,q.id).toBe(key);
      expect(q.officialQuestionLabel).toBe(count===30 ? String(i+1) : `${i<split ? "A" : "B"}群 ${i%split+1}`);
      expect(formatQuestionAnswerForDisplay(q,key),q.id).toBe(official);
      expect(choiceDisplayLabel(exam,key)).toBe(count===30 ? official : "イロハニ"["アイウエ".indexOf(key)]);
      expect(questionSourceEdition(q)).toBe("2025年度前期");
      expect(isPracticeReadyQuestion(q),q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices!));
      expect(q.sourcePdfUrl,q.id).toBe(`${evidence.sources[0].url}#page=${pages[i]}`);
      const [, , routeExam, yearSeason, section, qnum]=questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows,{exam:routeExam,yearSeason,section,qnum})?.id).toBe(q.id);
      const graph=JSON.stringify(buildQuestionJsonLd({question:q,pageUrlAbs:`https://www.kakomon-ai.jp${questionPagePath(q)}`,title:q.id}));
      expect(graph).toContain(`${official}: ${q.choices![key]}`);
      expect(graph).toContain("中央職業能力開発協会");
      expect(q.hasImage).toBe(figures.includes(q.qNumber));
      if(q.hasImage) for(const url of q.imageUrls!) {
        expect(q.imageAltTexts).toHaveLength(q.imageUrls!.length);
        const png=readFileSync(path.join(process.cwd(),"public",url));
        expect(png.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
        expect(png.readUInt32BE(16)).toBeGreaterThan(30);
      }
    }
  });
});
