import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
vi.mock("next/navigation", () => ({useRouter:()=>({push:vi.fn(),replace:vi.fn(),prefetch:vi.fn()})}));
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { BIYOSHI_QUESTIONS } from "@/data/questions/biyoshi";
import { QUESTIONS as OT1 } from "@/data/questions/kikenbutsu-otsu1";
import { QUESTIONS as OT2 } from "@/data/questions/kikenbutsu-otsu2";
import { QUESTIONS as OT6 } from "@/data/questions/kikenbutsu-otsu6";
import { createHistoryStore } from "@/lib/storage/history";
import { getCards } from "@/lib/learning/spaced-repetition";

beforeEach(() => { cleanup(); localStorage.clear(); });
describe("LQ5 ordinary quiz consumers", () => {
  it.each([BIYOSHI_QUESTIONS, OT1, OT2, OT6].map(qs => ({exam: qs[0].exam, qs})))("$exam scores the accepted original, reveals every reason and persists history", ({qs}) => {
    const q=qs[0];
    const view=render(<QuizPlayer question={q} index={0} total={qs.length} mode="year" onNext={vi.fn()}/>);
    expect(screen.getAllByRole("radio")).toHaveLength(Object.keys(q.choices!).length);
    fireEvent.click(screen.getAllByRole("radio")[Object.keys(q.choices!).indexOf(q.answer as string)]);
    expect(screen.getByRole("region", {name:"正解の解説"})).toBeTruthy();
    const rendered = document.body.textContent!.replace(/\s/g, "");
    for(const reason of Object.values(q.choiceExplanations!)) expect(rendered).toContain(reason!.replace(/\s/g, ""));
    expect(createHistoryStore().getAllEntries()).toEqual([expect.objectContaining({id:q.id,correct:true,selected:q.answer})]);
    expect(getCards().map(c=>c.id)).toContain(q.id);
    view.unmount();
    render(<QuizPlayer question={qs[1]} index={1} total={qs.length} mode="year" onNext={vi.fn()}/>);
    expect(createHistoryStore().getAnsweredIds()).toEqual([q.id]);
  });
});
