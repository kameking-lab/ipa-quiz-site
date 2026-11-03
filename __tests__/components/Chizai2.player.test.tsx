import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }) }));
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { CHIZAI2_QUESTIONS as questions } from "@/data/questions/chizai2";
import { createHistoryStore } from "@/lib/storage/history";
import { readLastQuestion } from "@/lib/storage/last-question";
import type { ChoiceKey } from "@/lib/questions/types";

beforeEach(() => {
  cleanup(); localStorage.clear();
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  Object.defineProperty(HTMLElement.prototype, "scrollTo", { configurable:true, value:vi.fn() });
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable:true, value:vi.fn() });
});

const samples = [
  questions.find(q => Object.keys(q.choices ?? {}).length === 4)!,
  questions.find(q => Object.keys(q.choices ?? {}).length === 2)!,
  questions.find(q => Object.keys(q.choices ?? {}).length === 9)!,
  ...questions.filter(q => q.type === "numeric"),
];

describe("知財2級の通常プレイヤーと履歴", () => {
  it.each(samples.flatMap(q => [true,false].map(correct => ({q,correct}))))("grades $q.id (correct=$correct), retains original content and persists once", ({q,correct}) => {
    render(<QuizPlayer question={q} index={0} total={2} mode="year" onNext={vi.fn()} />);
    if (q.type === "numeric") {
      expect(screen.queryByRole("radiogroup")).toBeNull();
      if (q.answer === "208000") {
        expect(screen.getByRole("table")).toHaveTextContent("納付しなければならない者");
        expect(screen.getByRole("table")).toHaveTextContent("138000");
      }
      fireEvent.change(within(screen.getByRole("form", {name:"数値記入の解答"})).getByRole("textbox"), {target:{value:correct ? String(q.answer) : "0"}});
      fireEvent.click(screen.getByRole("button",{name:"採点する"}));
    } else {
      const keys = Object.keys(q.choices!) as ChoiceKey[];
      expect(screen.getAllByRole("radio")).toHaveLength(keys.length);
      // Shared cases and statement numbering are part of the actual rendered stem.
      expect(screen.getByText(/法令基準日:/)).toHaveTextContent(q.lawReferenceDate!);
      const key = correct ? q.answer as ChoiceKey : keys.find(k => k !== q.answer)!;
      fireEvent.click(screen.getAllByRole("radio")[keys.indexOf(key)]);
    }
    const result = screen.getByRole("region", {name:correct ? "正解の解説" : "不正解の解説"});
    expect(result).toHaveTextContent(q.explanation);
    for (const reason of Object.values(q.choiceExplanations ?? {})) expect(result).toHaveTextContent(reason!);
    expect(createHistoryStore().getAllEntries()).toMatchObject([{id:q.id,correct}]);
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
    expect(readLastQuestion()).toMatchObject({exam:"chizai2",season:q.season,session:q.session,qNumber:q.qNumber});
    expect(createHistoryStore().getWrongIds()).toEqual(correct ? [] : [q.id]);
    // A fresh store reads the persisted result, as it would on revisit.
    expect(createHistoryStore().getAnsweredIds()).toContain(q.id);
  });

  it.each(samples)("reader grades $id with the same stored official key", q => {
    render(<QuestionAnswerCard question={q} questionId={q.id} choices={q.choices} answerKey={q.answer}
      exam={q.exam} year={q.year} season={q.season} session={q.session} qNumber={q.qNumber} />);
    if (q.type === "numeric") {
      fireEvent.change(within(screen.getByRole("form", {name:"数値記入の解答"})).getByRole("textbox"), {target:{value:String(q.answer)}});
      fireEvent.click(screen.getByRole("button",{name:"採点する"}));
    } else {
      const keys = Object.keys(q.choices!);
      fireEvent.click(screen.getAllByRole("radio")[keys.indexOf(String(q.answer))]);
    }
    expect(createHistoryStore().getAllEntries()).toMatchObject([{id:q.id,correct:true}]);
    expect(readLastQuestion()?.exam).toBe("chizai2");
  });
});
