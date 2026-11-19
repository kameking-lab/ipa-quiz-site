import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SafetyLearningProgress } from "@/components/exam-library/SafetyLearningProgress";

vi.mock("@/lib/exam-library-session", () => ({
  listExamLearningSummaries: () => [
    { examId: "wrong", examTitle: "誤答あり", answered: 2, correct: 1, incorrect: 1, total: 10, lastQuestionId: "wrong-q2" },
    { examId: "correct", examTitle: "誤答なし", answered: 2, correct: 2, incorrect: 0, total: 10, lastQuestionId: "correct-q2" },
  ],
}));

afterEach(cleanup);

it("offers exactly one action per paper, prioritizing review when there are wrong answers", () => {
  render(<SafetyLearningProgress />);
  const [wrong, correct] = screen.getAllByRole("listitem");
  expect(within(wrong).getByRole("link", { name: /結果・間違いを復習/ })).toHaveAttribute("href", "/e-learning/exams/wrong?view=results");
  expect(within(correct).getByRole("link", { name: /続きから解く/ })).toHaveAttribute("href", "/e-learning/exams/correct?question=correct-q2");
  expect(screen.getAllByRole("link")).toHaveLength(2);
});
