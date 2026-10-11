import { describe, expect, it } from "vitest";
import { choiceDisplayLabel, choiceImageAlt } from "@/lib/questions/display";
import { formatOrderingAnswer } from "@/lib/questions/ordering";

describe("dentist original answer labels", () => {
  it("preserves lowercase Latin labels including six-to-eight-choice questions", () => {
    expect(choiceDisplayLabel("shika-ishi", "ア")).toBe("a");
    expect(choiceDisplayLabel("shika-ishi", "カ")).toBe("f");
    expect(choiceDisplayLabel("shika-ishi", "ク")).toBe("h");
    expect(choiceImageAlt("shika-ishi", "イ")).toContain("選択肢b");
    expect(formatOrderingAnswer("shika-ishi", ["オ", "ウ", "イ", "ア", "エ"])).toBe("e→c→b→a→d");
    expect(choiceDisplayLabel("kangoshi", "ア")).toBe("1");
  });
});
