import { describe, expect, it } from "vitest";
import { examNeedsFigure, extractExamChoices } from "@/lib/exam-library-choices";

const text = "問1 正しいものはどれか。\n（1）選択肢一\n続きの行\n（2）選択肢二\n（3）選択肢三\n（4）選択肢四\n（5）選択肢五";

describe("extractExamChoices", () => {
  it("retains all source text while separating ordered choices", () => {
    expect(extractExamChoices(text, 5)).toEqual({
      prompt: "問1 正しいものはどれか。",
      choices: ["選択肢一\n続きの行", "選択肢二", "選択肢三", "選択肢四", "選択肢五"].map((text, index) => ({ number: index + 1, text })),
    });
  });
  it("accepts fullwidth digits, ASCII parentheses, and CRLF", () => {
    const source = "問1\r\n (１) 一\r\n (２) 二\r\n (３) 三\r\n (４) 四\r\n (５) 五";
    expect(extractExamChoices(source, 5)?.choices.map((choice) => choice.text)).toEqual(["一", "二", "三", "四", "五"]);
  });
  it.each([
    text.replace("（2）", "（1）"),
    text.replace("（2）", "（3）"),
    text.replace("（5）選択肢五", ""),
    text.replace("（5）選択肢五", "（5）"),
    text.replace("\n（2）", " （2）"),
    text + "\n（1）別の設問",
    "問1\n（1）\n（2）\n（3）\n（4）\n（5）",
  ])("preserves original presentation when splitting is ambiguous", (source) => {
    expect(extractExamChoices(source, 5)).toBeNull();
  });
  it("does not turn descriptive subquestions into choices", () => {
    expect(extractExamChoices(text, 0)).toBeNull();
  });
  it("keeps diagrams and tables visible", () => {
    expect(examNeedsFigure("次の表に示す測定結果" )).toBe(true);
    expect(examNeedsFigure("下図の装置" )).toBe(true);
    expect(examNeedsFigure("最も適切なものはどれか。" )).toBe(false);
  });
});
