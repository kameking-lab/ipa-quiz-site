import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import type { Question } from "@/lib/questions/types";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

const question: Question = {
  id: "ap-2024a-am-q1", exam: "ap", session: "am", year: 2024,
  season: "autumn", qNumber: 1, type: "multiple-choice", category: "テクノロジ",
  topicTags: [], difficulty: 3, question: "タイマー確認問題",
  choices: { ア: "一", イ: "二", ウ: "三", エ: "四" }, answer: "イ",
  explanation: "イが正解です。", hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html", license: "IPA-public",
};

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => vi.useRealTimers());

describe("QuizPlayerの後回し完了タイマー", () => {
  it("親の最終deferで完了中は止まり、後回し再開で動き出す", () => {
    const view = render(<QuizPlayer question={question} index={0} total={1} mode="year" onNext={vi.fn()} onDeferQuestion={vi.fn()} deferredQuestionCount={1} onResumeDeferred={vi.fn()} />);
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByLabelText("経過時間 0:01")).toBeInTheDocument();

    view.rerender(<QuizPlayer question={null} index={1} total={1} mode="year" onNext={vi.fn()} onDeferQuestion={vi.fn()} deferredQuestionCount={1} onResumeDeferred={vi.fn()} />);
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByText("0:01")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "後回しの問題を解く（1問）" }));
    view.rerender(<QuizPlayer question={question} index={0} total={1} mode="year" onNext={vi.fn()} onDeferQuestion={vi.fn()} deferredQuestionCount={0} onResumeDeferred={vi.fn()} />);
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByLabelText("経過時間 0:02")).toBeInTheDocument();
  });
});
