import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { createExamProgress } from "@/lib/exam-library-progress";
import { writeExamTabProgress } from "@/lib/exam-library-session";
import type { ExamQuestion } from "@/lib/exam-library-model";

const record = vi.hoisted(() => vi.fn());
vi.mock("@/lib/study-reward", async original => ({...await original<object>(), recordStudyReward: record}));
const entry = EXAM_CATALOG.find(item => item.subject === "潜水士")!;
const questions: ExamQuestion[] = [1,2].map(number => ({id:`${entry.id}-q${number}`,number,text:`問${number}`,images:[],correctChoice:1,choiceCount:2,answerAuthority:"official",sourcePages:[1]}));
function mount(items = questions, initialView: "question"|"summary" = "question") {
  return render(<ExamQuestionPlayer examId={entry.id} examTitle={entry.subject} pdfUrl="https://www.exam.or.jp/sample.pdf" indexUrl="https://www.exam.or.jp/" questions={items} initialView={initialView} />);
}
beforeEach(() => { localStorage.clear(); sessionStorage.clear(); record.mockClear(); Object.defineProperty(HTMLElement.prototype,"scrollIntoView",{configurable:true,value:vi.fn()}); });
afterEach(cleanup);
describe("real diver player submission contract", () => {
  it("does not reward skips or summary, but an actual choice resolves the exact catalog subject", () => {
    mount();
    fireEvent.click(screen.getByRole("button",{name:"スキップして次へ"}));
    expect(record).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button",{name:"前へ"}));
    const choice = screen.getByRole("radio",{name:/^選択肢 1:/});
    fireEvent.click(choice); fireEvent.click(choice);
    expect(record).toHaveBeenCalledTimes(1);
    expect(record).toHaveBeenCalledWith({scope:`library:${entry.id}`,questionId:questions[0].id,exam:"library:潜水士",label:"潜水士"});
    fireEvent.click(screen.getByRole("button",{name:"結果を見る"}));
    expect(record).toHaveBeenCalledTimes(1);
  });
  it("restored answer/summary does not issue a fresh reward", () => {
    writeExamTabProgress(createExamProgress(entry.id,{[questions[0].id]:{choice:1,memo:"",submitted:true}},questions[0].id),questions,entry.subject);
    mount(questions,"summary");
    expect(record).not.toHaveBeenCalled();
  });
  it("opening a descriptive model answer is not a completed answer", () => {
    mount([{...questions[0],choiceCount:0,answerAuthority:"descriptive",correctChoice:null}]);
    fireEvent.click(screen.getByRole("button",{name:"模範解答を見る"}));
    expect(record).not.toHaveBeenCalled();
  });
});
