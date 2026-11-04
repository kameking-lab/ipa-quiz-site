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

describe("QuizPlayer after article retirement", () => {
  it.each(["au", "ap"] as const)("keeps %s answer → explanation → history without external article links", (exam) => {
    const { container } = render(<QuizPlayer question={{ ...auQuestion, exam }} index={0} total={10} mode="random" onNext={() => {}} />);
    fireEvent.keyDown(window, { key: "2" });
    expect(screen.getByText("正解はイです。")).toBeInTheDocument();
    const entries = createHistoryStore().getAllEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0]?.correct).toBe(true);
    expect(container.querySelector('a[href*="tsugino-shikaku.jp/articles"], a[href^="https://note.com/"]')).toBeNull();
  });
});
