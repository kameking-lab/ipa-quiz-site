import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";

// StreamQuizPlayer uses next/navigation's useRouter; stub it for jsdom.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
}));

import { StreamQuizPlayer } from "@/components/quiz/stream/StreamQuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";
import type { Question } from "@/lib/questions/types";

const questions: Question[] = [
  {
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
  },
];

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
  createHistoryStore().reset();
});

// The stream player's number-key handler must not hijack Ctrl/Cmd+1–4
// (browser tab switching). Selections are recorded to history, so absence of a
// recorded entry proves the choice was not selected.
describe("StreamQuizPlayer — keyboard does not hijack browser shortcuts", () => {
  it("Ctrl+1 does not select a choice (tab-switch stays intact)", () => {
    render(<StreamQuizPlayer questions={questions} />);
    fireEvent.keyDown(window, { key: "1", ctrlKey: true });
    fireEvent.keyDown(window, { key: "2", metaKey: true });
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
  });

  it("plain number key still selects a choice (shortcut preserved)", () => {
    render(<StreamQuizPlayer questions={questions} />);
    fireEvent.keyDown(window, { key: "1" });
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });
});
