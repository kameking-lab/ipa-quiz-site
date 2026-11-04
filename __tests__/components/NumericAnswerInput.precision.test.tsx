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
  it("仮数と指数の形式を案内し、余分な桁や途中入力を採点しない", () => {
    const onAnswer = vi.fn();
    render(<NumericAnswerInput unit="kJ" specification={{ format: "scientific", precision: 2, unit: "kJ" }} disabled={false} onAnswer={onAnswer} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("inputmode", "text");
    expect(screen.getByText(/a.bc×10\^d の形式/)).toBeInTheDocument();
    for (const value of ["1.234e3", "1.23e", "0.23e3", "1.23e10", "1.23e3foo"]) {
      fireEvent.change(input, { target: { value } });
      fireEvent.click(screen.getByRole("button", { name: "採点する" }));
      expect(screen.getByRole("alert")).toHaveTextContent("仮数");
    }
    expect(onAnswer).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: "１．２３e３" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onAnswer).toHaveBeenCalledExactlyOnceWith("1.23×10^3");
  });

});
