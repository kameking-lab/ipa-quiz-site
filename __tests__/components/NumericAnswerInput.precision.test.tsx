import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NumericAnswerInput } from "@/components/quiz/NumericAnswerInput";

afterEach(cleanup);

describe("原問指定の小数桁数で数値を入力する", () => {
  it.each([1, 2] as const)("小数第%i位の案内と入力検証が一致する", (precision) => {
    const onAnswer = vi.fn();
    render(<NumericAnswerInput unit="m³ₙ/kg-f" specification={{ format: "decimal", precision, unit: "m³ₙ/kg-f" }} disabled={false} onAnswer={onAnswer} />);
    expect(screen.getByText(`単位を除いた小数第${precision}位までの数値を入力してください。`)).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: precision === 1 ? "2.35" : "2.354" } });
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    expect(screen.getByRole("alert")).toHaveTextContent(`小数第${precision}位まで`);
    expect(onAnswer).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: precision === 1 ? "２．３" : "２．３５" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onAnswer).toHaveBeenCalledExactlyOnceWith(precision === 1 ? "2.3" : "2.35");
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
