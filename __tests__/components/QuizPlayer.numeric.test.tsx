import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }) }));
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { nurseNumericQuestion as question } from "@/__tests__/fixtures/nurse-numeric-question";
import { createHistoryStore } from "@/lib/storage/history";
import { readLastQuestion } from "@/lib/storage/last-question";
import { LS_KEYS } from "@/lib/storage/keys";

beforeEach(() => {
  cleanup();
  localStorage.clear();
  push.mockClear();
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  Object.defineProperty(HTMLElement.prototype, "scrollTo", { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
});

describe("QuizPlayer numeric original", () => {
  it("keeps an unfilled original ungraded and blocks a partially numeric input", () => {
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={vi.fn()} />);
    expect(screen.queryByRole("radiogroup")).toBeNull();
    expect(screen.getByRole("button", { name: "採点する" })).toBeDisabled();
    fireEvent.submit(screen.getByRole("form", { name: "数値記入の解答" }));
    expect(createHistoryStore().getAllEntries()).toEqual([]);
    const input = screen.getByRole("textbox", { name: "解答（滴/分）" });
    fireEvent.change(input, { target: { value: "42foo" } });
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    expect(screen.getByRole("alert")).toHaveTextContent("数字だけ");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(createHistoryStore().getAllEntries()).toEqual([]);
    expect(screen.queryByRole("region", { name: "正解の解説" })).toBeNull();
  });

  it("grades full-width digits on Enter exactly once without advancing and records resume/review state", () => {
    const onNext = vi.fn();
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={onNext} />);
    const input = screen.getByRole("textbox", { name: "解答（滴/分）" });
    fireEvent.change(input, { target: { value: "　４２　" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onNext).not.toHaveBeenCalled();
    expect(screen.getByRole("region", { name: "正解の解説" })).toHaveTextContent("42 滴/分");
    expect(createHistoryStore().getAllEntries()).toMatchObject([{ id: question.id, selected: "42", correct: true }]);
    expect(readLastQuestion()).toMatchObject({ exam: "kangoshi", year: 2025, qNumber: 90 });
    expect(localStorage.getItem(LS_KEYS.spacedRepetition)).toContain(question.id);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onNext).not.toHaveBeenCalled();
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("shows the official answer for a wrong integer, then resets input and feedback at the next original", () => {
    const player = render(<QuizPlayer question={question} index={0} total={2} mode="year" backHref="/kangoshi/2025-annual" backLabel="年度に戻る" onNext={vi.fn()} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "41" } });
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    expect(screen.getByRole("region", { name: "不正解の解説" })).toHaveTextContent("あなた: 41 滴/分");
    expect(createHistoryStore().getWrongIds()).toEqual([question.id]);
    fireEvent.click(screen.getByRole("button", { name: "年度に戻る" }));
    expect(push).toHaveBeenCalledWith("/kangoshi/2025-annual");
    player.rerender(<QuizPlayer question={{ ...question, id: "fixture-next", qNumber: 91 }} index={1} total={2} mode="year" onNext={vi.fn()} />);
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.queryByRole("region", { name: "不正解の解説" })).toBeNull();
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });

  it("uses the completion screen after grading the final numeric original and permits rereading it", () => {
    render(<QuizPlayer question={question} index={0} total={1} mode="year" onNext={vi.fn()} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "42" } });
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    fireEvent.click(screen.getByRole("button", { name: "結果を見る" }));
    expect(screen.getByRole("heading", { name: "クイズ完了！" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "最後の問題をAIに質問" }));
    expect(screen.getByRole("region", { name: "正解の解説" })).toHaveTextContent(question.explanation);
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });

  it("does not grade during IME composition", () => {
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={vi.fn()} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "４２" } });
    fireEvent.keyDown(input, { key: "Enter", isComposing: true, keyCode: 229 });
    expect(createHistoryStore().getAllEntries()).toEqual([]);
  });
});
