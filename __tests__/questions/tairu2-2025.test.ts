import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { formatQuestionAnswerForDisplay, choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { TAIRU2_QUESTIONS as rows } from "@/data/questions/tairu2";
import evidence from "@/data/questions/tairu2/2025-early.sources.json";
const exam = "tairu2";
const key = "○○○○×○×××××○○×××○××○○○×○○イイロニハロロニハイロイロハニロニニニイイハハイロ";
const pages = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8];
describe("tairu2 2025年度前期の公式50問", () => {
  it("原本の群・番号・正答・ページを出題データまで保持する", async () => {
    expect(rows).toHaveLength(50);
    expect(new Set(rows.map(q => q.id)).size).toBe(50);
    expect(rows.map(q => q.qNumber)).toEqual(Array.from({length:50}, (_,i) => i+1));
    expect(await getQuestionsForExam(exam)).toEqual(rows);
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(rows);
    expect(rows.filter(isPracticeReadyQuestion)).toHaveLength(50);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(50);
    rows.forEach((q,i) => {
      expect(q.id).toBe(`${exam}-2025-early-gakka-${i<25?'a':'b'}-${String(i%25+1).padStart(3,'0')}`);
      expect(q.officialQuestionLabel).toBe(`${i<25?'A':'B'}群 ${i%25+1}`);
      expect(q.officialAnswerNumber).toBe(key[i]);
      expect(formatQuestionAnswerForDisplay(q,q.answer)).toBe(key[i]);
      expect(q.sourcePdfUrl).toBe(`${evidence.sources[0].url}#page=${pages[i]}`);
      expect(q.sourceAnswerUrl).toBe(evidence.sources[1].url);
      expect(Object.keys(q.choices!)).toHaveLength(i<25?2:4);
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
      expect(questionSourceEdition(q)).toBe("2025年度前期");
    });
    expect(["ア","イ","ウ","エ"].map(k => choiceDisplayLabel(exam,k as "ア"))).toEqual(["イ","ロ","ハ","ニ"]);
  });
  it("原図の参照と画像ハッシュを保持する", () => {
    expect(rows.filter(q=>q.hasImage).map(q=>q.qNumber)).toEqual([22, 28, 41, 42, 46]);
    evidence.review.forEach(r=>expect(r.officialAnswer).toBe(key[rows.findIndex(q=>q.id===r.id)]));
    evidence.figures.forEach(f=>{
      const bytes=readFileSync(`public${f.file}`);
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(f.sha256);
    });
    rows.filter(q=>q.hasImage).forEach(q=>{
      expect(q.imageUrls?.length).toBe(q.imageAltTexts?.length);
      q.imageUrls?.forEach(u=>expect(evidence.figures.some(f=>f.file===u)).toBe(true));
    });
  });
});
