import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { DailyChallengeClient } from "@/app/challenge/DailyChallengeClient";
import { createHistoryStore } from "@/lib/storage/history";
import type { Question } from "@/lib/questions/types";

function makeQuestion(qNumber: number, answer: "ア" | "イ"): Question {
  return {
    id: `ip-2024s-am-q${qNumber}`,
    exam: "ip",
    session: "am",
    year: 2024,
    season: "spring",
    qNumber,
    type: "multiple-choice",
    category: "テクノロジ系",
    topicTags: [],
    difficulty: 2,
    question: `テスト問題 ${qNumber}`,
    choices: { ア: "選択肢アの本文", イ: "選択肢イの本文", ウ: "選択肢ウの本文", エ: "選択肢エの本文" },
    answer,
    explanation: "テスト解説",
    hasImage: false,
    sourcePdfUrl: "https://example.com/q.pdf",
    license: "IPA-public",
  };
}

// 2 questions so answering the first stays in the quiz view (does not finish).
const questions = [makeQuestion(1, "イ"), makeQuestion(2, "ア")];
const DATE = "2024-04-21";

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
  createHistoryStore().reset();
});

// The visible 正解/不正解 banner is not in a live region; screen-reader users
// need a polite aria-live status to hear the outcome (parity with /quiz・/q).
describe("DailyChallengeClient — screen-reader outcome announcement", () => {
  it("announces 正解 in a polite status region after a correct answer", () => {
    render(<DailyChallengeClient questions={questions} date={DATE} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ/ }));

    const status = screen.getByRole("status");
    expect(status.textContent).toContain("正解です");
    expect(status.getAttribute("aria-live")).toBe("polite");
  });

  it("announces the correct key in the status region after a wrong answer", () => {
    render(<DailyChallengeClient questions={questions} date={DATE} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ア/ }));

    const status = screen.getByRole("status");
    expect(status.textContent).toContain("不正解です。正解は イ");
  });

  it("keeps the status region empty before any answer is revealed", () => {
    render(<DailyChallengeClient questions={questions} date={DATE} />);
    const status = screen.getByRole("status");
    expect(status.textContent?.trim()).toBe("");
  });
});
