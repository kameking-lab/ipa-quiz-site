import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { nurseNumericQuestion as question } from "@/__tests__/fixtures/nurse-numeric-question";
import { createHistoryStore } from "@/lib/storage/history";
import { readLastQuestion } from "@/lib/storage/last-question";

const props = {
  question, questionId: question.id, answerKey: question.answer,
  exam: question.exam, year: question.year, season: question.season,
  session: question.session, qNumber: question.qNumber,
  explanation: <section aria-label="解説">計算の解説</section>,
};
beforeEach(() => { cleanup(); localStorage.clear(); });

describe("numeric solve-in-place reader", () => {
  it("has no invented choices and rejects invalid input without recording", () => {
    render(<QuestionAnswerCard {...props} />);
    expect(screen.queryByRole("radiogroup")).toBeNull();
    expect(screen.getByRole("button", { name: "採点する" })).toBeDisabled();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "42滴/分" } });
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    expect(screen.getByRole("alert")).toHaveTextContent("数字だけ");
    expect(createHistoryStore().getAllEntries()).toEqual([]);
  });
  it.each([["　４２　", true], ["41", false]])("grades %j, records once and leaves the explanation readable", (value, correct) => {
    render(<QuestionAnswerCard {...props} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value } });
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
    expect(createHistoryStore().getAllEntries()).toMatchObject([{ id: question.id, selected: correct ? "42" : "41", correct }]);
    expect(readLastQuestion()).toMatchObject({ qNumber: 90 });
    expect(screen.getByRole("region", { name: "解説" })).toBeVisible();
    expect(screen.getAllByText(/42 滴\/分/).length).toBeGreaterThan(0);
    fireEvent.submit(screen.getByRole("form"));
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });
  it("lets a reader open the explanation without recording an attempt", () => {
    render(<QuestionAnswerCard {...props} />);
    expect(screen.getByRole("region", { name: "解説" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "採点せずに答えだけ見る" }));
    expect(screen.getByText("正解は 42 滴/分")).toBeVisible();
    expect(createHistoryStore().getAllEntries()).toEqual([]);
    expect(readLastQuestion()).toBeNull();
  });
  it("clears the previous original's outcome when navigation reuses the reader component", () => {
    const reader = render(<QuestionAnswerCard {...props} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "42" } });
    fireEvent.click(screen.getByRole("button", { name: "採点する" }));
    reader.rerender(<QuestionAnswerCard {...props} question={{ ...question, id: "fixture-next", qNumber: 91 }} questionId="fixture-next" qNumber={91} />);
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.getByRole("button", { name: "採点する" })).toBeDisabled();
    expect(screen.queryByRole("link", { name: "解説を読む" })).toBeNull();
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });
});
