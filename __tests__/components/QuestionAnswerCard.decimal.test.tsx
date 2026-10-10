import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { nurseDecimalQuestion as question } from "@/__tests__/fixtures/nurse-decimal-question";
import { createHistoryStore } from "@/lib/storage/history";
import { readLastQuestion } from "@/lib/storage/last-question";

const props = {
  question, questionId: question.id, answerKey: question.answer,
  exam: question.exam, year: question.year, season: question.season,
  session: question.session, qNumber: question.qNumber,
  nextHref: "/q/kangoshi/2024-annual/pm/q91",
};
beforeEach(() => { cleanup(); localStorage.clear(); });

describe("decimal solve-in-place reader",()=>{
  it.each([["２３．４",true],["23.3",false]])("grades decimal %j once and preserves history and reader position",(value,correct)=>{
    const reader=render(<QuestionAnswerCard {...props}/>);
    const input=screen.getByRole("textbox");
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("inputmode","decimal");
    fireEvent.change(input,{target:{value}});
    fireEvent.keyDown(input,{key:"Enter"});
    expect(createHistoryStore().getAllEntries()).toMatchObject([{id:question.id,selected:correct?"23.4":"23.3",correct}]);
    expect(readLastQuestion()).toMatchObject({year:2024,qNumber:90});
    expect(screen.getByRole("link",{name:/次の問題/})).toHaveAttribute("href",props.nextHref);
    expect(screen.getAllByText(/23.4 BMI/).length).toBeGreaterThan(0);
    reader.unmount();render(<QuestionAnswerCard {...props}/>);
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });
  it("rejects extra decimal precision without recording an attempt",()=>{
    render(<QuestionAnswerCard {...props}/>);
    fireEvent.change(screen.getByRole("textbox"),{target:{value:"23.4375"}});
    fireEvent.keyDown(screen.getByRole("textbox"),{key:"Enter"});
    expect(screen.getByRole("alert")).toHaveTextContent("小数第1位");
    expect(createHistoryStore().getAllEntries()).toEqual([]);
  });
});
