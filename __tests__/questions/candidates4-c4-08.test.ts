import { describe, expect, it } from "vitest";
import { KASHIKIN_QUESTIONS } from "@/data/questions/kashikin";
import { YAMAGUCHI_SEIKA_QUESTIONS } from "@/data/questions/yamaguchi-seika";
import { existsSync } from "node:fs";
import path from "node:path";

// 日本貸金業協会 平成28年度の公式正答PDFを問1～50の順に転記。
const KASHIKIN_2016 = [1,3,2,2,4,4,3,2,3,4,1,3,4,1,2,1,4,2,3,1,4,3,1,4,2,1,3,2,4,4,1,3,1,3,2,3,1,2,1,4,3,2,2,4,4,3,2,3,1,4];
// 山口県の問題・正答PDF p24。共通57問→和菓子3問→洋菓子3問→製パン3問。
const SEIKA_2023 = [4,1,4,4,2,1,2,4,4,2,4,2,2,4,4,2,3,3,4,3,1,3,2,1,3,4,3,1,4,3,3,1,2,4,2,2,2,4,1,3,3,2,4,1,1,3,4,2,3,2,4,4,2,1,4,3,2,3,1,2,2,4,3,2,1,1];
const SEIKA_2022 = [2,3,3,3,2,3,1,2,3,3,2,4,2,3,2,2,3,3,3,4,3,1,2,1,4,3,4,3,4,2,4,1,2,3,1,3,1,4,3,4,1,2,1,2,3,3,4,1,2,3,1,1,2,4,3,2,4,4,3,4,3,4,3,1,4,2];

describe("CANDIDATES4 c4-08 公式原本", () => {
  it("貸金2016年度50問の公式番号・採点キーを保持する", () => {
    const paper = KASHIKIN_QUESTIONS.filter((q) => q.year === 2016);
    expect(paper.map((q) => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(paper.map((q) => Number(q.officialAnswerNumber))).toEqual(KASHIKIN_2016);
    expect(paper.map((q) => q.answer)).toEqual(KASHIKIN_2016.map((n) => "アイウエ"[n - 1]));
    for (const q of paper) {
      expect(q.id).toBe(`kashikin-2016-annual-gakka-q${q.qNumber}`);
      expect(q.lawReferenceDate).toBe("2016-04-01");
      expect(q.sourceAnswerUrl).toBe("https://www.j-fsa.or.jp/chief/doc/qualifying_exam/exam_example/11th_answer.pdf");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
    }
  });

  it("フォント別の数字の復元と本文注記を保持する", () => {
    const paper = KASHIKIN_QUESTIONS.filter((q) => q.year === 2016);
    expect(paper[0].choices).toEqual({ ア: "1個", イ: "2個", ウ: "3個", エ: "4個" });
    expect(paper[1].question).toContain("貸金業法第8条");
    expect(paper[4].question).toContain("第12 条の6");
    expect(paper[41].choices?.ウ).toContain("7年間");
    expect(paper[41].choices?.エ).toContain("7年間");
    expect(paper[46].question).toContain("(注)景品表示法とは");
    expect(paper[46].choices?.エ).not.toContain("(注)景品表示法とは");
    expect(JSON.stringify(paper)).not.toMatch(/[\u0000-\u0008\u000b-\u001f\ufffd]/u);
  });

  it.each([2023, 2022])("製菓%i年度は科目別の66問と公式正答を保持する", (year) => {
    const paper = YAMAGUCHI_SEIKA_QUESTIONS.filter((q) => q.year === year);
    const answers = year === 2023 ? SEIKA_2023 : SEIKA_2022;
    expect(paper.map((q) => Number(q.officialAnswerNumber))).toEqual(answers);
    expect(paper.map((q) => q.answer)).toEqual(answers.map((n) => "アイウエ"[n - 1]));
    expect(new Set(paper.map((q) => q.id)).size).toBe(66);
    for (const session of ["wagashi", "yogashi", "seipan"]) {
      expect(paper.filter((q) => q.session === session).map((q) => q.qNumber)).toEqual([58, 59, 60]);
    }
    expect(paper.filter((q) => q.session === "gakka").map((q) => q.qNumber)).toEqual(Array.from({ length: 57 }, (_, i) => i + 1));
    expect(paper.every((q) => q.examDate === (year === 2023 ? "2023-08-19" : "2022-08-21"))).toBe(true);
    for (const q of paper) {
      expect(q.id).toBe(`yamaguchi-seika-${year}-annual-${q.session}-q${q.qNumber}`);
      expect(q.sourceAnswerUrl).toBe(`https://www.pref.yamaguchi.lg.jp/uploaded/attachment/${year === 2023 ? 208498 : 208499}.pdf#page=24`);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
    }
  });

  it("製菓2023年度の食品成分図を原図と代替テキストで保持する", () => {
    const q = YAMAGUCHI_SEIKA_QUESTIONS.find((q) => q.year === 2023 && q.qNumber === 13)!;
    expect(q.hasImage).toBe(true);
    expect(q.imageUrls).toEqual(["/questions/yamaguchi-seika/2023-annual-gakka-q13.png"]);
    expect(existsSync(path.join(process.cwd(), "public", q.imageUrls![0]))).toBe(true);
    expect(q.imageAltTexts?.[0]).toContain("固形物は有機物と無機物（灰分）");
    expect(q.question).not.toContain("たんぱく質有機物");
    const food = YAMAGUCHI_SEIKA_QUESTIONS.filter((q) => q.year === 2023);
    expect(food[18].question).not.toContain("おうと");
    expect(food[40].choices?.イ).not.toContain("もち");
  });
});
