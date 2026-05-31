import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { createHistoryStore } from "@/lib/storage/history";
import { readLastQuestion } from "@/lib/storage/last-question";

const baseProps = {
  questionId: "ip-2024s-am-q1",
  choices: { ア: "選択肢アの本文", イ: "選択肢イの本文", ウ: "選択肢ウの本文", エ: "選択肢エの本文" },
  answerKey: "イ" as const,
  answerText: "選択肢イの本文",
  exam: "ip" as const,
  year: 2024,
  season: "spring" as const,
  session: "am" as const,
  qNumber: 1,
  nextHref: "/q/ip/2024-spring/am/q2",
};

beforeEach(() => {
  cleanup();
  // The component writes via window.localStorage; clear that exact store and
  // reset the history through its own API so no state leaks between tests.
  window.localStorage.clear();
  createHistoryStore().reset();
});

describe("QuestionAnswerCard — solve in place", () => {
  it("renders every choice text (so the content is crawlable / readable)", () => {
    render(<QuestionAnswerCard {...baseProps} />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(4);
    expect(screen.getByText("選択肢アの本文")).toBeTruthy();
    expect(screen.getByText("選択肢エの本文")).toBeTruthy();
  });

  it("grades a correct answer, reveals 正解, and records it to history", () => {
    render(<QuestionAnswerCard {...baseProps} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ/ }));

    // result banner
    expect(screen.getByText("正解！")).toBeTruthy();

    // recorded once, correct, no new LS key (uses the shared history store)
    const entries = createHistoryStore().getAllEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ id: baseProps.questionId, selected: "イ", correct: true });

    // last-question continuity is written
    expect(readLastQuestion()?.qNumber).toBe(1);
  });

  it("grades a wrong answer, reveals the correct key, and records correct:false", () => {
    render(<QuestionAnswerCard {...baseProps} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ア/ }));

    expect(screen.getByText(/不正解 — 正解は イ/)).toBeTruthy();
    const entries = createHistoryStore().getAllEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ selected: "ア", correct: false });
  });

  it("'答えだけ見る' reveals without recording (stats stay honest)", () => {
    render(<QuestionAnswerCard {...baseProps} />);
    fireEvent.click(screen.getByRole("button", { name: /答えだけ見る/ }));

    // Revealed: the banner's answer-text span (「：選択肢イの本文」) is unique to
    // the visible banner (the sr-only status has no answerText), and the
    // 解説を読む link only renders once revealed.
    expect(screen.getByText(/：選択肢イの本文/)).toBeTruthy();
    expect(screen.getByRole("link", { name: /解説を読む/ })).toBeTruthy();
    // nothing recorded — it was not a genuine attempt
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
    expect(readLastQuestion()).toBeNull();
  });

  it("disables further selection once revealed (answer is irreversible)", () => {
    render(<QuestionAnswerCard {...baseProps} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ/ }));
    // a second click on another choice must not change the recorded outcome
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ア/ }));
    const entries = createHistoryStore().getAllEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].selected).toBe("イ");
  });

  it("shows the 次の問題へ link after answering when a next question exists", () => {
    render(<QuestionAnswerCard {...baseProps} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ/ }));
    const next = screen.getByRole("link", { name: /次の問題へ/ });
    expect(next.getAttribute("href")).toBe("/q/ip/2024-spring/am/q2");
  });

  it("respects recordHistory=false (no history written)", () => {
    localStorage.setItem("ipa-quiz:settings:v1", JSON.stringify({ recordHistory: false }));
    render(<QuestionAnswerCard {...baseProps} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ/ }));
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
    // banner still shows (UX works regardless of the history setting)
    expect(screen.getByText("正解！")).toBeTruthy();
  });
});

// Number-key 1–4 selection must actually work — the ChoiceButton advertises it
// via aria-keyshortcuts/「数字キーN でも選択できます」 (致命傷⑩).
describe("QuestionAnswerCard — number-key selection", () => {
  it("number key 1 selects the first choice (ア)", () => {
    render(<QuestionAnswerCard {...baseProps} />);
    fireEvent.keyDown(window, { key: "1" });
    const entries = createHistoryStore().getAllEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].selected).toBe("ア");
  });

  it("number key 2 selects the second choice (イ) — the correct one here", () => {
    render(<QuestionAnswerCard {...baseProps} />);
    fireEvent.keyDown(window, { key: "2" });
    expect(screen.getByText("正解！")).toBeTruthy();
    expect(createHistoryStore().getAllEntries()[0].selected).toBe("イ");
  });

  it("ignores number keys while typing in an input field", () => {
    render(
      <>
        <input data-testid="field" />
        <QuestionAnswerCard {...baseProps} />
      </>,
    );
    fireEvent.keyDown(screen.getByTestId("field"), { key: "1" });
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
  });

  it("ignores Ctrl/Cmd+number so browser tab-switch shortcuts are not hijacked", () => {
    render(<QuestionAnswerCard {...baseProps} />);
    // Ctrl+1 / Cmd+1 normally switch browser tabs — must not select a choice.
    fireEvent.keyDown(window, { key: "1", ctrlKey: true });
    fireEvent.keyDown(window, { key: "2", metaKey: true });
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
    // a plain number key still works (the feature is preserved)
    fireEvent.keyDown(window, { key: "1" });
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });

  it("does not re-select once revealed (number key is inert after answering)", () => {
    render(<QuestionAnswerCard {...baseProps} />);
    fireEvent.keyDown(window, { key: "1" }); // selects ア, reveals
    fireEvent.keyDown(window, { key: "2" }); // must be ignored
    const entries = createHistoryStore().getAllEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].selected).toBe("ア");
  });
});
