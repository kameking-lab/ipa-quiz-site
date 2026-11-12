import { describe, expect, it } from "vitest";
import { KASHIKIN_QUESTIONS } from "@/data/questions/kashikin";

// 日本貸金業協会 平成28年度の公式正答PDFを問1～50の順に転記。
const KASHIKIN_2016 = [1,3,2,2,4,4,3,2,3,4,1,3,4,1,2,1,4,2,3,1,4,3,1,4,2,1,3,2,4,4,1,3,1,3,2,3,1,2,1,4,3,2,2,4,4,3,2,3,1,4];

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
});
