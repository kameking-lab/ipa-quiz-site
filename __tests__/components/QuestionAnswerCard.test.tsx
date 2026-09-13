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
  it("renders a table in the revealed answer without raw Markdown", () => {
    const table = "| 店 |\n| --- |\n| B |";
    const { container } = render(<QuestionAnswerCard {...baseProps} answerText={table} />);
    fireEvent.click(screen.getByRole("button", { name: /答えだけ見る/ }));
    expect(container.querySelector("table td")?.textContent).toBe("B");
    expect(container.textContent).not.toContain("| --- |");
  });
  it("renders ten choices and supports the zero shortcut for コ", () => {
    render(<QuestionAnswerCard {...baseProps} answerKey="コ" choices={{...baseProps.choices, オ:"選択肢オ",カ:"選択肢カ",キ:"選択肢キ",ク:"選択肢ク",ケ:"選択肢ケ",コ:"選択肢コ"}} />);
    expect(screen.getAllByRole("radio")).toHaveLength(10);
    fireEvent.keyDown(window, {key:"0"});
    expect(screen.getByText("正解！")).toBeTruthy();
    expect(createHistoryStore().getAllEntries()[0]).toMatchObject({ selected:"コ", correct:true });
  });
  it("accepts the second official answer and records a correct attempt", () => {
    render(<QuestionAnswerCard {...baseProps} answerKey={["ア", "ウ"]} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ウ/ }));
    expect(screen.getByText("正解！")).toBeTruthy();
    expect(createHistoryStore().getAllEntries()[0]).toMatchObject({ selected: "ウ", correct: true });
  });
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

// The AU note guide (verified: reports/revenue-eco-20260913/receipts/free-01-au-am2.json)
// must only ever appear after the reader has actually answered/revealed, never before,
// and must not appear for exams without a registered guide. Nothing about the existing
// answer/navigation/storage logic changes here.
describe("QuestionAnswerCard — after-answer note guide placement", () => {
  const auProps = { ...baseProps, exam: "au" as const };

  it("does not show the AU note-guide link before selection/reveal", () => {
    render(<QuestionAnswerCard {...auProps} />);
    expect(screen.queryByRole("link", { name: /無料ガイドを読む/ })).not.toBeInTheDocument();
    expect(screen.queryByText("noteの無料ガイド")).not.toBeInTheDocument();
  });

  it("shows the AU note-guide link after answering, pointing at the verified URL", () => {
    render(<QuestionAnswerCard {...auProps} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ/ }));
    expect(screen.getByRole("link", { name: /無料ガイドを読む/ })).toHaveAttribute(
      "href",
      "https://note.com/sikaku_rakutoru/n/n573e38ac5dea",
    );
  });

  it("shows the AU note-guide link after 答えだけ見る (reveal-only) too", () => {
    render(<QuestionAnswerCard {...auProps} />);
    fireEvent.click(screen.getByRole("button", { name: /答えだけ見る/ }));
    expect(screen.getByRole("link", { name: /無料ガイドを読む/ })).toBeInTheDocument();
  });

  it("shows no note guide for an exam without a registered guide (ip), even after reveal", () => {
    render(<QuestionAnswerCard {...baseProps} />); // baseProps.exam === "ip"
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ/ }));
    expect(screen.getByText("正解！")).toBeTruthy(); // reveal did happen
    expect(screen.queryByText("noteの無料ガイド")).not.toBeInTheDocument();
  });

  it("shows the SC note-guide link after answering, same route as AU", () => {
    render(<QuestionAnswerCard {...baseProps} exam="sc" />);
    expect(screen.queryByText("noteの無料ガイド")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ/ }));
    expect(screen.getByRole("link", { name: /無料ガイドを読む/ })).toHaveAttribute(
      "href",
      "https://note.com/sikaku_rakutoru/n/nee848928ccb7",
    );
  });

  it("shows the PM note-guide link after answering, same route as AU/SC", () => {
    render(<QuestionAnswerCard {...baseProps} exam="pm" />);
    expect(screen.queryByText("noteの無料ガイド")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ/ }));
    expect(screen.getByRole("link", { name: /無料ガイドを読む/ })).toHaveAttribute(
      "href",
      "https://note.com/sikaku_rakutoru/n/n20f719f019ac",
    );
  });

  it("shows the DB note-guide link after answering, same route as AU/SC/PM", () => {
    render(<QuestionAnswerCard {...baseProps} exam="db" />);
    expect(screen.queryByText("noteの無料ガイド")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ/ }));
    expect(screen.getByRole("link", { name: /無料ガイドを読む/ })).toHaveAttribute(
      "href",
      "https://note.com/sikaku_rakutoru/n/n8b0780e3c3b8",
    );
  });

  it("does not change existing answer counting/history instrumentation", () => {
    render(<QuestionAnswerCard {...auProps} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 イ/ }));
    // Same recording contract as the non-guide exams: exactly one entry, correct.
    const entries = createHistoryStore().getAllEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ id: auProps.questionId, selected: "イ", correct: true });
    // The guide's presence does not add a second/duplicate history write.
    expect(screen.getByRole("link", { name: /無料ガイドを読む/ })).toBeInTheDocument();
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
