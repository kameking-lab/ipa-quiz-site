import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { KANKOJI2_2026_QUESTIONS } from "@/data/questions/kankoji2";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import { createHistoryStore } from "@/lib/storage/history";
import type { ChoiceKey } from "@/lib/questions/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
}));
const original = KANKOJI2_2026_QUESTIONS.find(question => question.qNumber === 49)!;
const question = { ...original, id: "accepted-two-of-three-fixture", answer: ["ア", "イ", "エ"] as ChoiceKey[], requiredSelections: 2 };
beforeEach(() => { cleanup(); window.localStorage.clear(); createHistoryStore().reset(); });
describe("official any two of three correction", () => {
  it("accepts every pair and rejects wrong counts, foreign choices and duplicates", () => {
    for (const selected of [["ア", "イ"], ["ア", "エ"], ["エ", "イ"]])
      expect(isCompleteSelectionCorrect(question.answer, selected, 2)).toBe(true);
    for (const selected of [["ア"], ["ア", "イ", "エ"], ["ア", "ア"], ["ア", "ウ"]])
      expect(isCompleteSelectionCorrect(question.answer, selected, 2)).toBe(false);
    expect(isCompleteSelectionCorrect(question.answer, ["ア", "イ"])).toBe(false);
    expect(isCompleteSelectionCorrect(question.answer, ["エ", "イ", "ア"])).toBe(true);
  });
  it("the question card waits for two and records an accepted pair", () => {
    render(<QuestionAnswerCard questionId={question.id} choices={question.choices!} answerKey={question.answer}
      exam={question.exam} year={question.year} season={question.season} session={question.session}
      qNumber={question.qNumber} requiredSelections={2} />);
    expect(screen.getByTestId("multi-select-hint").textContent).toContain("3肢のうち、2肢");
    fireEvent.click(screen.getByRole("checkbox", { name: /選択肢 ア/ }));
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
    fireEvent.click(screen.getByRole("checkbox", { name: /選択肢 エ/ }));
    expect(createHistoryStore().getAllEntries()[0]).toMatchObject({ selected: "ア・エ", correct: true });
  });
  it("the quiz player records two accepted choices without requiring the third", () => {
    render(<QuizPlayer question={question} index={0} total={1} mode="year" onNext={() => {}} />);
    fireEvent.keyDown(window, { key: "2" });
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
    fireEvent.keyDown(window, { key: "4" });
    expect(createHistoryStore().getAllEntries()[0]).toMatchObject({ selected: "イ・エ", correct: true });
  });
});
