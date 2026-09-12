import { describe, expect, it } from "vitest";
import { isAcceptedAnswer, formatAcceptedAnswers } from "@/lib/questions/answers";

describe("official multiple accepted answers", () => {
  it("accepts either published answer without accepting the remaining choices", () => {
    expect(isAcceptedAnswer(["ア", "ウ"], "ア")).toBe(true);
    expect(isAcceptedAnswer(["ア", "ウ"], "ウ")).toBe(true);
    expect(isAcceptedAnswer(["ア", "ウ"], "イ")).toBe(false);
    expect(isAcceptedAnswer(["ア", "ウ"], undefined)).toBe(false);
    expect(formatAcceptedAnswers(["ア", "ウ"])).toBe("ア・ウ");
  });
});
