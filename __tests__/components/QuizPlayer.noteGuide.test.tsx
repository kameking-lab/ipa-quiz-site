import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

// QuizPlayer uses next/navigation's useRouter; stub it so it renders in jsdom.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
}));

import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";
import type { Question } from "@/lib/questions/types";

const auQuestion: Question = {
  id: "au-2024a-am2-q1",
  exam: "au",
  session: "am",
  year: 2024,
  season: "autumn",
  qNumber: 1,
  type: "multiple-choice",
  category: "監査",
  topicTags: [],
  difficulty: 3,
  question: "これはテスト問題です。",
  choices: { ア: "選択肢ア", イ: "選択肢イ", ウ: "選択肢ウ", エ: "選択肢エ" },
  answer: "イ",
  explanation: "正解はイです。",
  hasImage: false,
  sourcePdfUrl: "https://example.com/q.pdf",
  license: "IPA-public",
};

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
  createHistoryStore().reset();
});

// Same after-answer-only placement rule as QuestionAnswerCard, applied to the
// main /quiz player (components/quiz/QuizPlayer.tsx). Existing answer/nav/
// storage logic (verified by QuizPlayer.keyboard.test.tsx etc.) is untouched.
describe("QuizPlayer — after-answer note guide placement", () => {
  it("does not show the AU note-guide link before an answer is revealed", () => {
    render(<QuizPlayer question={auQuestion} index={0} total={10} mode="random" onNext={() => {}} />);
    expect(screen.queryByRole("link", { name: /無料ガイドを読む/ })).not.toBeInTheDocument();
  });

  it("shows the AU note-guide link after answering, without changing the recorded outcome", () => {
    render(<QuizPlayer question={auQuestion} index={0} total={10} mode="random" onNext={() => {}} />);
    fireEvent.keyDown(window, { key: "2" }); // selects イ, the correct choice
    expect(screen.getByRole("link", { name: /無料ガイドを読む/ })).toHaveAttribute(
      "href",
      "https://note.com/sikaku_rakutoru/n/n573e38ac5dea",
    );
    const entries = createHistoryStore().getAllEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0]?.correct).toBe(true);
  });

  it("shows no note guide for an exam without a registered guide (ap)", () => {
    render(
      <QuizPlayer
        question={{ ...auQuestion, id: "ap-2024a-am-q1", exam: "ap" }}
        index={0}
        total={10}
        mode="random"
        onNext={() => {}}
      />,
    );
    fireEvent.keyDown(window, { key: "2" });
    expect(screen.queryByRole("link", { name: /無料ガイドを読む/ })).not.toBeInTheDocument();
  });
});
