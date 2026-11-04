import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MockExamRunner } from "@/app/mock-exam/MockExamRunner";
import { getMockConfig } from "@/lib/mock-exam/config";
import { getMockExamHistory } from "@/lib/mock-exam/storage";
import { getMockScores } from "@/lib/learning/mock-scores";
import { createHistoryStore } from "@/lib/storage/history";
import { getCards } from "@/lib/learning/spaced-repetition";
import { LS_KEYS } from "@/lib/storage/keys";
import type { SlimMockQuestion } from "@/lib/mock-exam/types";

vi.mock("@/lib/gamification/economy", () => ({ addXp: vi.fn(), addGold: vi.fn() }));
vi.mock("@/lib/gamification/achievements", () => ({ evaluateAchievementsAfterMock: vi.fn() }));
const questions: SlimMockQuestion[] = [
  { id: "ap-progress-q1", question: "DNSの用途は？", choices: { ア: "名前解決", イ: "送信" }, answer: "ア", category: "ネットワーク" },
  { id: "ap-progress-q2", question: "主キーの性質は？", choices: { ア: "一意", イ: "重複可" }, answer: "ア", category: "データベース" },
];
beforeEach(() => { localStorage.clear(); vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-04T14:00:00Z")); });
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("mock submission → progress, review and score history", () => {
  it("auto-submits the latest answer once and records blanks as misses", async () => {
    render(<MockExamRunner questions={questions} config={{ ...getMockConfig("ap"), minutes: 1 / 60 }} onFinish={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "ア 名前解決" }));
    await act(async () => { await vi.advanceTimersByTimeAsync(1100); });
    const result = getMockExamHistory()[0];
    expect(result).toMatchObject({ answered: 1, correct: 1, scorePct: 50, wrongQuestionIds: [questions[1].id] });
    expect(createHistoryStore().getAllEntries()).toEqual([
      expect.objectContaining({ id: questions[0].id, correct: true, selected: "ア" }),
      expect.objectContaining({ id: questions[1].id, correct: false, selected: "" }),
    ]);
    expect(getCards().map((card) => card.id)).toEqual(questions.map((q) => q.id));
    expect(getMockScores()).toEqual([expect.objectContaining({ id: result.id, score: 1, total: 2 })]);
    expect(screen.getByRole("link", { name: "今回の間違い・未回答を復習" }).getAttribute("href")).toContain(`mock=${result.id}`);
    await act(async () => { await vi.advanceTimersByTimeAsync(3000); });
    expect(getMockExamHistory()).toHaveLength(1);
    expect(createHistoryStore().getAllEntries()).toHaveLength(2);
  });
  it("respects history-off while preserving existing history and saving the mock result", () => {
    const history = createHistoryStore();
    history.record({ id: "old-answer", selected: "ア", correct: true, at: 1 });
    const before = localStorage.getItem(LS_KEYS.history);
    localStorage.setItem(LS_KEYS.settings, JSON.stringify({ recordHistory: false }));
    vi.stubGlobal("confirm", () => true);
    render(<MockExamRunner questions={questions} config={getMockConfig("ap")} onFinish={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "次へ" }));
    fireEvent.click(screen.getByRole("button", { name: "提出する" }));
    expect(getMockExamHistory()).toHaveLength(1);
    expect(localStorage.getItem(LS_KEYS.history)).toBe(before);
  });
});
