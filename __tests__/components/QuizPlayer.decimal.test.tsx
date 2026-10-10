import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }) }));
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { nurseDecimalQuestion as question } from "@/__tests__/fixtures/nurse-decimal-question";
import { createHistoryStore } from "@/lib/storage/history";
import { readLastQuestion } from "@/lib/storage/last-question";
import { LS_KEYS } from "@/lib/storage/keys";

beforeEach(() => {
  cleanup();
  localStorage.clear();
  push.mockClear();
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  Object.defineProperty(HTMLElement.prototype, "scrollTo", { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
});

describe("QuizPlayer original decimal", () => {
  it("does not reveal the decimal answer initially, reject extra precision, or grade during IME", () => {
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={vi.fn()} />);
    const input=screen.getByRole("textbox",{name:"解答（BMI）"});
    expect(input).toHaveAttribute("inputmode","decimal");
    expect(input).toHaveValue("");
    expect(screen.queryByRole("region",{name:"正解の解説"})).toBeNull();
    fireEvent.keyDown(input,{key:"Enter"});
    fireEvent.change(input,{target:{value:"23.4375"}});
    fireEvent.keyDown(input,{key:"Enter"});
    expect(screen.getByRole("alert")).toHaveTextContent("小数第1位");
    expect(createHistoryStore().getAllEntries()).toEqual([]);
    fireEvent.change(input,{target:{value:"２３．４"}});
    fireEvent.keyDown(input,{key:"Enter",isComposing:true,keyCode:229});
    expect(createHistoryStore().getAllEntries()).toEqual([]);
  });
  it("grades full-width decimal once on Enter, keeps its position, and resumes without exposing the previous answer", () => {
    const onNext=vi.fn();
    const player=render(<QuizPlayer question={question} index={0} total={2} mode="year" backHref="/kangoshi/2024-annual" backLabel="年度に戻る" onNext={onNext} />);
    const input=screen.getByRole("textbox");
    fireEvent.change(input,{target:{value:"　２３．４　"}});
    fireEvent.keyDown(input,{key:"Enter"});
    expect(onNext).not.toHaveBeenCalled();
    expect(screen.getByRole("region",{name:"正解の解説"})).toHaveTextContent("23.4 BMI");
    expect(createHistoryStore().getAllEntries()).toMatchObject([{id:question.id,selected:"23.4",correct:true}]);
    expect(readLastQuestion()).toMatchObject({exam:"kangoshi",year:2024,qNumber:90});
    expect(localStorage.getItem(LS_KEYS.spacedRepetition)).toContain(question.id);
    fireEvent.keyDown(input,{key:"Enter"});
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
    expect(onNext).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button",{name:"年度に戻る"}));
    expect(push).toHaveBeenCalledWith("/kangoshi/2024-annual");
    player.unmount();
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={onNext} />);
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.queryByRole("region",{name:"正解の解説"})).toBeNull();
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });
  it("records a valid incorrect decimal and proceeds only via the next action", () => {
    const onNext=vi.fn();render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={onNext} />);
    fireEvent.change(screen.getByRole("textbox"),{target:{value:"23.3"}});
    fireEvent.keyDown(screen.getByRole("textbox"),{key:"Enter"});
    expect(screen.getByRole("region",{name:"不正解の解説"})).toHaveTextContent("あなた: 23.3 BMI");
    expect(createHistoryStore().getWrongIds()).toEqual([question.id]);
    expect(onNext).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button",{name:"次の問題へ"}));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
