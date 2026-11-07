import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NumericAnswerInput } from "@/components/quiz/NumericAnswerInput";
import { formatNumericAnswer, isNumericAnswerCorrect, normalizeNumericAnswer, numericQuestionIssue } from "@/lib/questions/numeric";
import { nurseNumericQuestion } from "@/__tests__/fixtures/nurse-numeric-question";
import type { Question } from "@/lib/questions/types";

const specification = { format: "scientific", precision: 2, unit: "kJ" } as const;
const question: Question = { ...nurseNumericQuestion, answer: "1.72×10^3", numericAnswer: specification };
afterEach(cleanup);

describe("原問の仮数と指数を記入する", () => {
  it.each(["1.72×10^3", "1.72e3", "１．７２e３", "1.72E3"])("%sを公式表記へ正規化する", (value) => {
    expect(normalizeNumericAnswer(value, specification)).toBe("1.72×10^3");
    expect(isNumericAnswerCorrect(question, value)).toBe(true);
  });
  it.each(["", "1.723e3", "17.2e2", "0.172e4", "1720", "1.72e", "1.72e-3", "1.72e10", "1.72e3foo", "1.72e3 kJ", "NaN", "Infinity"])("未完成・桁超過・別形式の%sを丸めず拒否する", (value) => {
    expect(normalizeNumericAnswer(value, specification)).toBeUndefined();
  });
  it("指数の違いを誤答とし、原問形式を表示する", () => {
    expect(numericQuestionIssue(question)).toBeUndefined();
    expect(isNumericAnswerCorrect(question, "1.72e2")).toBe(false);
    expect(normalizeNumericAnswer("2e0", specification)).toBe("2.00×10^0");
    expect(formatNumericAnswer(question)).toBe("1.72×10^3 kJ");
    expect(numericQuestionIssue({ ...question, answer: "1.720e3" })).toBeDefined();
  });
  it("指数の不足を案内し、仮数と指数をそろえて送信する", () => {
    const onAnswer = vi.fn();
    render(<NumericAnswerInput unit="kJ" specification={specification} disabled={false} onAnswer={onAnswer} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("inputmode", "text");
    fireEvent.change(input, { target: { value: "1.72e" } });
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    expect(screen.getByRole("alert")).toHaveTextContent("仮数");
    expect(onAnswer).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: "１．７２e３" } });
    fireEvent.keyDown(input, { key: "Enter", isComposing: true });
    expect(onAnswer).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onAnswer).toHaveBeenCalledExactlyOnceWith("1.72×10^3");
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
