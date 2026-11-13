import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KENCHIKU_BANKIN1_QUESTIONS } from "@/data/questions/kenchiku-bankin1";
import { KENCHIKU_BANKIN_DUCT2_QUESTIONS } from "@/data/questions/kenchiku-bankin-duct2";
import { ALL_QUESTIONS } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { Question } from "@/lib/questions/types";

// 問題データとは別に公式正解表の各行を転記。
const editions: { code: Question["exam"]; year: number; answers: string; figures: number[]; all: Question[] }[] = [
  { code: "kenchiku-bankin-duct2", year: 2023, all: KENCHIKU_BANKIN_DUCT2_QUESTIONS,
    answers: "○○××○" + "○×○××" + "××○○×" + "×○×○×" + "○×××○" + "ニロニロハ" + "イイロイイ" + "ハニロハハ" + "ハハニイロ" + "ニハニイロ", figures: [10, 22, 28, 29, 31, 37, 38, 44] },
  { code: "kenchiku-bankin-duct2", year: 2024, all: KENCHIKU_BANKIN_DUCT2_QUESTIONS,
    answers: "○×○○×" + "××○×○" + "○××○○" + "○×○××" + "○×○××" + "ハイロハロ" + "ニハニハイ" + "ニロイイイ" + "ハロロハイ" + "ニロハロロ", figures: [3, 22, 28, 29, 34, 37, 38] },
  { code: "kenchiku-bankin1", year: 2023, all: KENCHIKU_BANKIN1_QUESTIONS,
    answers: "××○××" + "×○○×○" + "○××○×" + "○○×××" + "○×○×○" + "ロハロハニ" + "イハイロニ" + "イロハロロ" + "ハイハニロ" + "ニロイニイ", figures: [3, 4, 13, 35, 37, 38] },
];

describe.each(editions)("$code $year 年度前期", ({ code, year, answers, figures, all }) => {
  const rows = all.filter(q => q.year === year);
  it("公式50問の番号・正答と原本の○×・イロハニ表示を保持する", () => {
    expect(rows).toHaveLength(50);
    expect(new Set(rows.map(q => q.id)).size).toBe(50);
    rows.forEach((q, i) => {
      expect(q.id).toBe(`${code}-${year}-early-gakka-${i < 25 ? "a" : "b"}-${String(i % 25 + 1).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionNumberLabel(q)).toBe(`${i < 25 ? "A" : "B"}群 ${i % 25 + 1}`);
      expect(questionSourceEdition(q)).toBe(`${year}年度前期`);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(Object.values(q.choiceExplanations ?? {}).every(x => x && x.length > 15)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.explanation.length).toBeGreaterThanOrEqual(50);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("www.kentei.javada.or.jp/pdf/");
      expect(EXAM_CONFIGS[code].sessions[0].categories).toContain(q.category);
      expect(ALL_QUESTIONS.filter(x => x.id === q.id)).toHaveLength(1);
    });
  });
  it("図を含む全設問に読める原図と代替テキストを持つ", () => {
    expect(rows.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
    for (const q of rows.filter(q => q.hasImage)) {
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts?.[0].length).toBeGreaterThan(10);
      const bytes = readFileSync(`public${q.imageUrls![0]}`);
      expect(bytes.subarray(1, 4).toString()).toBe("PNG");
      expect(bytes.readUInt32BE(16)).toBeGreaterThan(100);
      expect(bytes.readUInt32BE(20)).toBeGreaterThan(50);
    }
  });
  it("配信・資格一覧・公式出典の構造化データへ接続する", async () => {
    expect(await getQuestionsForExam(code)).toEqual(all);
    expect(getQualificationByExamCode(code)?.status).toBe("live");
    expect(getQualificationByExamCode(code)?.fullName).toContain("ダクト板金作業");
    expect(getQualificationByExamCode(code)?.shortName).not.toContain("曲げ板金");
    expect(EXAM_CONFIGS[code].sessions[0].expectedQuestions).toBe(50);
    expect(EXAM_CONFIGS[code].yearRange.start).toBeLessThanOrEqual(year);
    expect(EXAM_CONFIGS[code].yearRange.end).toBeGreaterThanOrEqual(year);
    expect(usesNumberedChoices(code)).toBe(true);
    expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(code, k as "ア"))).toEqual(["イ", "ロ", "ハ", "ニ"]);
    const jsonLd = buildQuestionJsonLd({ question: rows[0], pageUrlAbs: `https://www.kakomon-ai.jp/q/${code}/${year}-early/gakka/q1`, title: "建築板金", lastUpdatedISO: "2026-11-13" });
    expect(JSON.stringify(jsonLd)).toContain("中央職業能力開発協会");
  });
});
