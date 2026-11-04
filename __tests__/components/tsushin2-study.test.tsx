import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
vi.mock("next/navigation", () => ({useRouter:()=>({push:vi.fn(),replace:vi.fn(),prefetch:vi.fn()})}));
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import { createHistoryStore } from "@/lib/storage/history";
import { getCards } from "@/lib/learning/spaced-repetition";

beforeEach(()=>{cleanup();localStorage.clear();});
describe("integrated tsushin2 normal study in isolated jsdom storage",()=>{
  it.each([2025,2026])("%i Q1 answer → explanation → next → revisit retains ordinary history",year=>{
    const q=TSUSHIN2_QUESTIONS.find(q=>q.year===year && q.qNumber===1)!;
    const next=TSUSHIN2_QUESTIONS.find(q=>q.year===year && q.qNumber===2)!;
    const onNext=vi.fn();
    const view=render(<QuizPlayer question={q} index={0} total={65} mode="year" onNext={onNext}/>);
    fireEvent.click(screen.getByRole("radio",{name:new RegExp(`^選択肢 ${q.answer}:`)}));
    expect(screen.getByRole("region",{name:"正解の解説"})).toBeTruthy();
    expect(createHistoryStore().getAllEntries()).toEqual([expect.objectContaining({id:q.id,correct:true,selected:q.answer})]);
    expect(getCards().map(c=>c.id)).toContain(q.id);
    fireEvent.click(screen.getByRole("button",{name:"次の問題へ"}));
    expect(onNext).toHaveBeenCalledOnce();
    view.rerender(<QuizPlayer question={next} index={1} total={65} mode="year" onNext={onNext}/>);
    expect(screen.getAllByRole("radio")).toHaveLength(4);
    view.unmount();
    render(<QuizPlayer question={q} index={0} total={65} mode="year" onNext={onNext}/>);
    expect(createHistoryStore().getStats()).toEqual(expect.objectContaining({total:1,correct:1,accuracy:1}));
    expect(createHistoryStore().getAnsweredIds()).toEqual([q.id]);
  });
  it("Q21 exposes four original choices without grading, review or history mutation",()=>{
    const q=TSUSHIN2_QUESTIONS.find(q=>q.year===2025 && q.qNumber===21)!;
    const before=JSON.stringify(localStorage);
    render(<QuestionAnswerCard question={q} questionId={q.id} choices={q.choices} answerKey={q.answer} exam={q.exam} year={q.year} season={q.season} session={q.session} qNumber={q.qNumber}/>);
    expect(screen.getByRole("region",{name:"参照専用の選択肢"})).toBeTruthy();
    for(const text of Object.values(q.choices!)) expect(screen.getByText(text!)).toBeTruthy();
    expect(screen.queryAllByRole("radio")).toHaveLength(0);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(JSON.stringify(localStorage)).toBe(before);
  });
});
