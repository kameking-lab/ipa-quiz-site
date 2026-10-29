import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { nativeBQuestion } from "@/__tests__/fixtures/native-b-question";
import { KANKOJI2_2026_QUESTIONS } from "@/data/questions/kankoji2";
import type { ChoiceKey } from "@/lib/questions/types";

const record = vi.hoisted(() => vi.fn());
vi.mock("@/lib/study-reward", async original => ({...await original<object>(), recordStudyReward:record}));
vi.mock("next/navigation", () => ({useRouter:() => ({push:vi.fn(),replace:vi.fn(),prefetch:vi.fn(),back:vi.fn()})}));
beforeEach(() => {localStorage.clear();sessionStorage.clear();record.mockClear();vi.spyOn(window,"scrollTo").mockImplementation(() => {});Object.defineProperty(HTMLElement.prototype,"scrollIntoView",{configurable:true,value:vi.fn()});});
afterEach(cleanup);
describe("quiz reward uses actual committed answers", () => {
  it("does not reward an all-blank native-B submission", () => {
    render(<QuizPlayer question={nativeBQuestion("binary")} index={0} total={1} mode="year" onNext={vi.fn()} />);
    fireEvent.click(screen.getByRole("button",{name:"回答を採点する"}));
    expect(record).not.toHaveBeenCalled();
  });
  it("rewards a fully selected native-B answer only once", () => {
    render(<QuizPlayer question={nativeBQuestion("binary")} index={0} total={1} mode="year" onNext={vi.fn()} />);
    screen.getAllByRole("combobox").forEach(select => fireEvent.change(select,{target:{value:"1"}}));
    const submit = screen.getByRole("button",{name:"回答を採点する"});
    fireEvent.click(submit);fireEvent.click(submit);
    expect(record).toHaveBeenCalledTimes(1);
  });
  it("waits for the required selection count and uses the question exam, not the default prop", () => {
    const original = KANKOJI2_2026_QUESTIONS.find(question => question.qNumber === 49)!;
    const question = {...original,id:"reward-multi",answer:["ア","イ","エ"] as ChoiceKey[],requiredSelections:2};
    render(<QuizPlayer question={question} index={0} total={1} mode="year" onNext={vi.fn()} />);
    fireEvent.keyDown(window,{key:"2"});
    expect(record).not.toHaveBeenCalled();
    fireEvent.keyDown(window,{key:"4"});
    expect(record).toHaveBeenCalledTimes(1);
    expect(record.mock.calls[0][0]).toMatchObject({scope:"quiz:kankoji2",exam:"kankoji2",questionId:"reward-multi"});
  });
});
