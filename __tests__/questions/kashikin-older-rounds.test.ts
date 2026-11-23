import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { KASHIKIN_QUESTIONS } from "@/data/questions/kashikin";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

// 日本貸金業協会の各回正答PDF（15th_answer.pdf～17th_answer.pdf）。
// 問1～50の順。内部のア～エへの変換を公式番号から独立して検証する。
const ANSWERS = {
  2020: [1,2,4,1,3,2,2,4,1,4,3,1,2,4,3,2,1,3,2,4,3,3,4,3,1,1,4,4,1,2,3,1,4,3,4,3,1,3,1,2,4,2,4,3,1,2,3,1,3,2],
  2021: [1,3,2,3,2,4,3,1,4,1,2,4,2,4,2,4,2,4,1,4,2,1,1,4,3,1,3,2,4,2,4,3,1,1,4,2,4,2,3,1,3,4,2,4,1,3,3,1,3,2],
  2022: [1,3,4,4,3,1,2,4,4,3,2,3,4,3,2,2,1,1,3,4,1,3,2,1,4,1,4,3,2,1,4,2,4,4,1,4,4,2,1,3,4,3,1,4,2,3,1,3,2,3],
} as const;

describe("貸金業務取扱主任者 第15～17回", () => {
  it.each([2020, 2021, 2022] as const)("%i年度の全50問を公式正答どおり配信対象に接続する", (year) => {
    const questions = KASHIKIN_QUESTIONS.filter((q) => q.year === year);
    expect(questions.map((q) => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(questions.map((q) => Number(q.officialAnswerNumber))).toEqual(ANSWERS[year]);
    expect(questions.map((q) => q.answer)).toEqual(ANSWERS[year].map((n) => "アイウエ"[n - 1]));
    for (const q of questions) {
      expect(q.id).toBe(`kashikin-${year}-annual-gakka-q${q.qNumber}`);
      expect(ALL_QUESTIONS.some((item) => item.id === q.id)).toBe(true);
      expect(isPracticeReadyQuestion(q)).toBe(true);
      expect(q.lawReferenceDate).toBe(`${year}-04-01`);
      expect(q.sourcePdfUrl).toBe(`https://www.j-fsa.or.jp/chief/doc/qualifying_exam/exam_example/exam_paper_${year - 2005}th.pdf`);
      expect(q.sourceAnswerUrl).toBe(`https://www.j-fsa.or.jp/chief/doc/qualifying_exam/exam_example/${year - 2005}th_answer.pdf`);
      expect(Object.keys(q.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(q.explanationCoverage).toBe("full");
      expect(Object.values(q.choiceExplanations ?? {}).every((text) => (text?.length ?? 0) >= 20)).toBe(true);
    }
  });

  it("第15回の数字の欠落・未解決のPDF文字コードを残さない", () => {
    const paper = KASHIKIN_QUESTIONS.filter((q) => q.year === 2020);
    const text = JSON.stringify(paper);
    expect(text).not.toMatch(/\/c269\d|[\u0a82-\u0a8b\ufffd]/u);
    expect(paper[0].question).toContain("1つだけ");
    expect(paper[0].choices).toEqual({ ア: "1個", イ: "2個", ウ: "3個", エ: "4個" });
    expect(paper[8].question).toContain("0円");
  });

  it("第15回問48の損益計算書を原図と代替テキストで保持する", () => {
    const q = KASHIKIN_QUESTIONS.find((item) => item.id === "kashikin-2020-annual-gakka-q48")!;
    expect(q.hasImage).toBe(true);
    expect(q.imageUrls).toEqual(["/questions/kashikin/2020-annual-q48.png"]);
    expect(existsSync(path.join(process.cwd(), "public", q.imageUrls![0]))).toBe(true);
    expect(q.imageAltTexts?.[0]).toContain("営業外費用20、営業外収益3、空欄ｃ 153");
    expect(q.question).not.toContain("金額3,850");
    expect(q.choices?.ア).toContain("ｃ-経常利益");
  });

  it("第17回の信用情報と書面再交付の説明を公式正答と整合させる", () => {
    const get = (number: number) => KASHIKIN_QUESTIONS.find((q) => q.year === 2022 && q.qNumber === number)!;
    expect(get(15).choices?.イ).toBe("ａｃ");
    expect(get(15).explanation).toContain("適切なのはａ・ｃ");
    expect(get(23).choiceExplanations?.イ).toContain("有利な変更であっても再交付が必要");
  });
});
