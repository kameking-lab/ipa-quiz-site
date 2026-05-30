import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";

// QuizPlayer uses next/navigation's useRouter; stub it so it renders in jsdom.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
}));

import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";
import type { Question } from "@/lib/questions/types";

const question: Question = {
  id: "ap-2024a-am-q1",
  exam: "ap",
  session: "am",
  year: 2024,
  season: "autumn",
  qNumber: 1,
  type: "multiple-choice",
  category: "テクノロジ",
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

// The global keydown handler must not hijack browser/OS shortcuts. "r" toggles
// the star, so Ctrl/Cmd+R (reload) must NOT touch the star, while plain "r" does.
describe("QuizPlayer — keyboard does not hijack browser shortcuts", () => {
  it("Ctrl+R does not toggle the star (reload stays intact)", () => {
    render(<QuizPlayer question={question} index={0} total={10} mode="random" onNext={() => {}} />);
    // A single Ctrl+R must leave the star untouched (without the guard it would
    // toggle it on — two events would cancel out and hide the bug, so use one).
    fireEvent.keyDown(window, { key: "r", ctrlKey: true });
    expect(createHistoryStore().isStarred(question.id)).toBe(false);
  });

  it("Cmd+R does not toggle the star (mac reload stays intact)", () => {
    render(<QuizPlayer question={question} index={0} total={10} mode="random" onNext={() => {}} />);
    fireEvent.keyDown(window, { key: "r", metaKey: true });
    expect(createHistoryStore().isStarred(question.id)).toBe(false);
  });

  it("plain 'r' still toggles the star (shortcut preserved)", () => {
    render(<QuizPlayer question={question} index={0} total={10} mode="random" onNext={() => {}} />);
    fireEvent.keyDown(window, { key: "r" });
    expect(createHistoryStore().isStarred(question.id)).toBe(true);
  });

  it("Ctrl+1 does not select a choice (browser tab-switch stays intact)", () => {
    render(<QuizPlayer question={question} index={0} total={10} mode="random" onNext={() => {}} />);
    fireEvent.keyDown(window, { key: "1", ctrlKey: true });
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
  });
});
