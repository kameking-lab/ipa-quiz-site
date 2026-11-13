import { describe, expect, it } from "vitest";
import { SHASHUTSU2_QUESTIONS } from "@/data/questions/shashutsu2";
import { KIKAI_SHIAGE1_QUESTIONS } from "@/data/questions/kikai-shiage1";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";

describe("c4r-B6 原本と解説の整合性", () => {
  it("第一角法の図に対する第三角法という設問を、公式どおり×と採点する", () => {
    // JAVADA R07-1-B56 2級 問題PDF p.3、A群24（原図は第一角法）。
    const q = SHASHUTSU2_QUESTIONS.find(q => q.qNumber === 24)!;
    expect(q.question).toContain("第三角法");
    expect(q.explanation).toContain("図は第一角法");
    expect(q.imageUrls).toHaveLength(1);
    expect(q.officialAnswerNumber).toBe("×");
    expect(formatQuestionAnswerForDisplay(q, q.answer!)).toBe("×");
    for (const explanation of Object.values(q.choiceExplanations!)) {
      expect(explanation).toContain("図は第一角法");
    }
  });

  it("砥石の比較対象Pを保持し、Hの方が軟らかいという根拠で公式イを説明する", () => {
    // JAVADA R07-1-B32 1級 問題PDF p.4、B群3。
    const q = KIKAI_SHIAGE1_QUESTIONS.find(q => q.qNumber === 28)!;
    expect(q.choices!.ア).toBe("結合度Hは、結合度Pより重研削に適している。");
    expect(q.explanation).toContain("HはPより軟らかく");
    expect(q.choiceExplanations!.ア).toContain("HはPより軟らかく");
    expect(q.officialAnswerNumber).toBe("イ");
    expect(formatQuestionAnswerForDisplay(q, q.answer!)).toBe("イ");
  });
});
