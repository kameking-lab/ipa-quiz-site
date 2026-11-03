import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
import type { Question } from "@/lib/questions/types";
import { isOrderingAnswerCorrect, isOrderingAnswerComplete, orderingQuestionIssue } from "@/lib/questions/ordering";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";
import { readLastQuestion } from "@/lib/storage/last-question";

const question: Question = {
  id: "ordering-test", exam: "kangoshi", session: "am", year: 2025, season: "annual", qNumber: 89,
  type: "ordering", category: "test", topicTags: [], difficulty: 2, question: "正しい順に並べる",
  choices: { ア: "第一", イ: "第二", ウ: "第三" }, answer: ["ウ", "ア", "イ"],
  explanation: "順序を確認する。", hasImage: false, license: "MHLW-attributed", sourcePdfUrl: "https://example.test/questions.pdf",
};

beforeEach(() => { cleanup(); localStorage.clear(); createHistoryStore().reset(); });

describe("ordering answers", () => {
  it("requires a complete permutation and distinguishes identical sets in different order", () => {
    expect(orderingQuestionIssue(question)).toBeUndefined();
    expect(isOrderingAnswerComplete(["ア", "イ"], question.choices)).toBe(false);
    expect(isOrderingAnswerComplete(["ア", "ア", "ウ"], question.choices)).toBe(false);
    expect(isOrderingAnswerCorrect(question, ["ア", "イ", "ウ"])).toBe(false);
    expect(isOrderingAnswerCorrect(question, ["ウ", "ア", "イ"])).toBe(true);
    expect(orderingQuestionIssue({ ...question, answer: ["ア", "ア", "ウ"] })).toMatch(/permutation/);
    expect(orderingQuestionIssue({ ...question, answer: ["ア", "イ"] })).toMatch(/every choice/);
  });

  it("blocks an incomplete submission, clears and revises slots, then records the ordered answer", () => {
    render(<QuestionAnswerCard question={question} questionId={question.id} choices={question.choices} answerKey={question.answer} exam={question.exam} year={question.year} season={question.season} session={question.session} qNumber={question.qNumber} />);
    const slots = screen.getAllByRole("combobox");
    const submit = screen.getByRole("button", { name: "採点する" });
    expect(submit).toBeDisabled();
    fireEvent.change(slots[0]!, { target: { value: "ア" } });
    fireEvent.change(slots[1]!, { target: { value: "ア" } });
    expect(slots[0]).toHaveValue("");
    expect(submit).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "クリア" }));
    expect(slots[1]).toHaveValue("");
    fireEvent.change(slots[0]!, { target: { value: "ウ" } });
    fireEvent.change(slots[1]!, { target: { value: "ア" } });
    fireEvent.change(slots[2]!, { target: { value: "イ" } });
    expect(submit).toBeEnabled();
    fireEvent.click(submit);
    expect(createHistoryStore().getAllEntries()).toMatchObject([{ id: question.id, selected: "ウ→ア→イ", correct: true }]);
    expect(readLastQuestion()).toMatchObject({ qNumber: 89 });
    expect(screen.getByText(/正答は 3→1→2/)).toBeInTheDocument();
    fireEvent.submit(screen.getByRole("form", { name: "順序を並べる" }));
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });

  it("does not advance an unanswered ordering question via body keys and leaves select keys native", () => {
    const onNext = vi.fn();
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={onNext} />);
    const body = screen.getByText(question.question);
    for (const key of ["Enter", " ", "ArrowRight"]) {
      fireEvent.keyDown(body, { key });
      fireEvent.keyDown(window, { key });
    }
    const firstSlot = screen.getAllByRole("combobox")[0]!;
    for (const key of ["Enter", " ", "ArrowRight", "ArrowDown"]) {
      expect(fireEvent.keyDown(firstSlot, { key })).toBe(true);
    }
    expect(onNext).not.toHaveBeenCalled();
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
  });

  it("grades the same choices in a wrong order in the full player and preserves the ordered history", () => {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={vi.fn()} />);
    const slots = screen.getAllByRole("combobox");
    fireEvent.change(slots[0]!, { target: { value: "ア" } });
    fireEvent.change(slots[1]!, { target: { value: "イ" } });
    fireEvent.change(slots[2]!, { target: { value: "ウ" } });
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    expect(createHistoryStore().getAllEntries()).toMatchObject([{ selected: "ア→イ→ウ", correct: false }]);
    expect(readLastQuestion()).toMatchObject({ exam: question.exam, qNumber: 89 });
    expect(screen.getByRole("region", { name: "不正解の解説" })).toHaveTextContent("3→1→2");
  });
});
