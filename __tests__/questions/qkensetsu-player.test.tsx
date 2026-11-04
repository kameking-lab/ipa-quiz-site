import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { KENCHIKU_SETSUBISHI_STUDY_QUESTIONS, KENCHIKU_SETSUBISHI_REFERENCE_QUESTIONS } from "@/data/questions/kenchiku-setsubishi";
import { createHistoryStore } from "@/lib/storage/history";
import { getCards } from "@/lib/learning/spaced-repetition";
import { PracticeSessionTabs } from "@/components/quiz/PracticeSessionTabs";

const reward = vi.hoisted(() => vi.fn());
vi.mock("@/lib/study-reward", async original => ({ ...await original<object>(), recordStudyReward: reward }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
  usePathname: () => "/modes/topic",
  useSearchParams: () => new URLSearchParams("exam=kenchiku-setsubishi"),
}));
beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); reward.mockClear();
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
});
afterEach(cleanup);

describe("Building equipment ordinary player", () => {
  it("offers all three actual subjects using the qualification query context", () => {
    render(<PracticeSessionTabs sessions={["am1", "am2", "pm"]} selected="am1" />);
    for (const [label, session] of [["建築一般知識", "am1"], ["建築法規", "am2"], ["建築設備", "pm"]]) {
      expect(screen.getByRole("link", { name: label }).getAttribute("href")).toContain(`session=${session}`);
    }
  });
  it.each([true, false])("grades an answer (correct=%s) and connects explanations, history, SRS and reward", correct => {
    const question = KENCHIKU_SETSUBISHI_STUDY_QUESTIONS.find(q => q.year === 2025 && q.session === "am2" && q.qNumber === 17)!;
    render(<QuizPlayer question={question} index={0} total={1} mode="year" onNext={vi.fn()} />);
    fireEvent.keyDown(window, { key: correct ? "2" : "1" });
    expect(createHistoryStore().getAllEntries()).toEqual([expect.objectContaining({ id: question.id, correct })]);
    expect(getCards().map(c => c.id)).toContain(question.id);
    expect(reward).toHaveBeenCalledWith(expect.objectContaining({ exam: question.exam, questionId: question.id }));
    for (const reason of Object.values(question.choiceExplanations!)) {
      expect(screen.getAllByText(reason, { exact: false }).length).toBeGreaterThan(0);
    }
  });
  it("prevents legacy direct rendering of Q18 from grading or writing assessment state", () => {
    const [question] = KENCHIKU_SETSUBISHI_REFERENCE_QUESTIONS;
    render(<QuizPlayer question={question} index={0} total={1} mode="year" onNext={vi.fn()} />);
    fireEvent.keyDown(window, { key: "1" });
    expect(createHistoryStore().getAllEntries()).toEqual([]);
    expect(getCards()).toEqual([]);
    expect(reward).not.toHaveBeenCalled();
  });
});
