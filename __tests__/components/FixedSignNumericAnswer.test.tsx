import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NumericAnswerInput } from "@/components/quiz/NumericAnswerInput";
import { formatNumericAnswer, isNumericAnswerCorrect, normalizeNumericAnswer } from "@/lib/questions/numeric";
import type { Question } from "@/lib/questions/types";

const specification = { format: "decimal", precision: 1, unit: "mm", fixedSign: "negative" } as const;
const question: Question = {
  id: "shika-ishi-fixed-sign", exam: "shika-ishi", session: "mondai-c", year: 2026, season: "annual", qNumber: 90,
  type: "numeric", numericAnswer: specification, category: "歯科矯正学", topicTags: ["HPC"], difficulty: 3,
  question: "解答：－①．②mm", answer: "2.0", explanation: "解答欄には負号が印刷されている。", hasImage: false,
  license: "MHLW-attributed", sourcePdfUrl: "https://www.mhlw.go.jp/question.pdf",
};
afterEach(cleanup);
describe("printed numeric signs", () => {
  it("grades the entered digits and retains the printed minus in the full answer", () => {
    expect(isNumericAnswerCorrect(question, "２．０")).toBe(true);
    expect(isNumericAnswerCorrect(question, "20")).toBe(false);
    expect(normalizeNumericAnswer("-2.0", specification)).toBeUndefined();
    expect(formatNumericAnswer(question)).toBe("−2.0 mm");
    expect(formatNumericAnswer(question, "1.0")).toBe("−1.0 mm");
  });
  it("shows the fixed sign and clearly requests only the entry portion", () => {
    const onAnswer = vi.fn();
    render(<NumericAnswerInput unit="mm" specification={specification} disabled={false} onAnswer={onAnswer} />);
    expect(screen.getByText("−")).toBeInTheDocument();
    expect(screen.getByText(/負号を除いた数値部分/)).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "2.0" } });
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    expect(onAnswer).toHaveBeenCalledWith("2.0");
  });
});
