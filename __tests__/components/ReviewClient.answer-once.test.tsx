import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ReviewClient } from "@/app/review/ReviewClient";
import { IP_QUESTIONS } from "@/data/questions/ip";
import { getChoiceKeys, isAcceptedAnswer } from "@/lib/questions/answers";
import { LS_KEYS } from "@/lib/storage/keys";
import type { Question } from "@/lib/questions/types";

const base = IP_QUESTIONS.find((question) => question.id === "ip-2009a-am-q1")!;
const first: Question = { ...base, id: "review-first", question: "First review question", answer: "イ" };
const second: Question = { ...base, id: "review-second", question: "Second review question", answer: "イ" };

function due(...questions: Question[]) {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({
    questions, seenCount: questions.length, scheduledCount: 0, nextReviewDate: null,
  })));
}
function schedules(): Record<string, { level: number; correctStreak: number; nextReviewAt: string }> {
  return JSON.parse(localStorage.getItem(LS_KEYS.reviewSchedule) ?? "{}") as Record<string, { level: number; correctStreak: number; nextReviewAt: string }>;
}

beforeEach(() => { cleanup(); localStorage.clear(); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("ReviewClient choice grading", () => {
  it("records correct and incorrect choices once, then advances only after the explanation", async () => {
    due(first, second);
    render(<ReviewClient examFromQuery="ip" />);
    await screen.findByText(first.question);
    const firstKey = getChoiceKeys(first.choices).find((key) => isAcceptedAnswer(first.answer, key))!;
    fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${firstKey} `) }));
    expect(screen.getByText(first.question)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("正解");
    expect(schedules()[first.id]).toMatchObject({ level: 1, correctStreak: 1 });
    expect(screen.getByText(/次の復習予定:/)).toHaveTextContent(`次の復習予定: ${schedules()[first.id].nextReviewAt}`);
    expect(screen.queryByRole("button", { name: /正解した|間違えた/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "次へ" }));
    expect(await screen.findByText(second.question)).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.queryByText(/次の復習予定:/)).not.toBeInTheDocument();
    const wrongKey = getChoiceKeys(second.choices).find((key) => !isAcceptedAnswer(second.answer, key))!;
    fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${wrongKey} `) }));
    expect(screen.getByRole("status")).toHaveTextContent("不正解");
    expect(schedules()[second.id]).toMatchObject({ level: 0, correctStreak: 0 });
    expect(screen.getByText(/次の復習予定:/)).toHaveTextContent(`次の復習予定: ${schedules()[second.id].nextReviewAt}`);
    expect(schedules()[first.id]).toMatchObject({ level: 1, correctStreak: 1 });
    fireEvent.click(screen.getByRole("button", { name: "次へ" }));
    expect(await screen.findByRole("button", { name: "もう一度" })).toBeInTheDocument();
    expect(localStorage.getItem(LS_KEYS.history)).toBeNull();
  });

  it("waits for every required selection and accepts multiple correct answers", async () => {
    const multi: Question = { ...base, id: "review-multi", question: "Choose two", answer: ["ア", "ウ"], requiredSelections: 2 };
    due(multi);
    render(<ReviewClient examFromQuery="ip" />);
    await screen.findByText(multi.question);
    fireEvent.click(screen.getByRole("button", { name: /^ア / }));
    expect(screen.getByText(multi.question)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "次へ" })).not.toBeInTheDocument();
    expect(schedules()[multi.id]).toBeUndefined();
    fireEvent.click(screen.getByRole("button", { name: /^ウ / }));
    expect(screen.getByRole("status")).toHaveTextContent("正解");
    expect(schedules()[multi.id]).toMatchObject({ level: 1, correctStreak: 1 });
  });

  it("shows the official numeric choice labels while grading the stored keys", async () => {
    const numbered: Question = { ...base, id: "review-denken", exam: "denken3", question: "Numbered choice review", answer: "イ" };
    due(numbered);
    render(<ReviewClient examFromQuery="denken3" />);
    await screen.findByText(numbered.question);
    expect(screen.getByRole("button", { name: /^\(1\) / })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^\(2\) / }));
    expect(screen.getByRole("status")).toHaveTextContent("正解：あなたの回答 (2)");
    expect(screen.getByText("正解: (2)")).toBeInTheDocument();
    expect(schedules()[numbered.id]).toMatchObject({ level: 1, correctStreak: 1 });
  });

});
