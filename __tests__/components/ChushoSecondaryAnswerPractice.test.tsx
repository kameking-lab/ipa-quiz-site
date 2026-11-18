import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AnswerPractice } from "@/components/chusho-secondary/AnswerPractice";
import { reportStudyAnswer } from "@/lib/study-presence-client";
vi.mock("@/lib/study-presence-client", () => ({ reportStudyAnswer: vi.fn() }));
const solutions=[{label:"設問1",maxChars:3,example:"例文",reasoning:"与件を根拠に考える。".repeat(5),checkpoints:["根拠を確認する","結論を確認する"]}];
describe("secondary written self-comparison",()=>{
  beforeEach(()=>{ localStorage.clear(); vi.mocked(reportStudyAnswer).mockClear(); });
  it("saves drafts, shows the limit and reveals an editorial example without scoring",async()=>{
    const {unmount}=render(<AnswerPractice questionId="chusho-test" solutions={solutions}/>);
    const input=screen.getByRole("textbox");
    await waitFor(()=>expect(input).not.toBeDisabled());
    fireEvent.change(input,{target:{value:"四文字だ"}});
    expect(screen.getByText("4字：1字超過しています")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("kakomon-ai:chusho-secondary:chusho-test")!)).toEqual(["四文字だ"]);
    fireEvent.click(screen.getByRole("button",{name:"独自解答例と根拠を確認する"}));
    expect(screen.getByText("設問1：独自解答例")).toBeVisible();
    expect(screen.queryByText(/正解です|不正解です|採点結果/)).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox",{name:"設問1：根拠を確認する"})).toBeEnabled();
    unmount();
    render(<AnswerPractice questionId="chusho-test" solutions={solutions}/>);
    await waitFor(()=>expect(screen.getByRole("textbox")).toHaveValue("四文字だ"));
  });
  it("ignores malformed saved drafts without losing the editor",async()=>{
    localStorage.setItem("kakomon-ai:chusho-secondary:broken","{}");
    render(<AnswerPractice questionId="broken" solutions={solutions}/>);
    await waitFor(()=>expect(screen.getByRole("textbox")).toBeEnabled());
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
  it("records presence only when a newly written answer is compared", async () => {
    localStorage.setItem("kakomon-ai:chusho-secondary:saved", JSON.stringify(["前回答"]));
    render(<AnswerPractice questionId="saved" solutions={solutions} />);
    const open = () => fireEvent.click(screen.getByRole("button", { name: "独自解答例と根拠を確認する" }));
    const close = () => fireEvent.click(screen.getByRole("button", { name: "独自解答例を閉じる" }));
    await waitFor(() => expect(screen.getByRole("textbox")).toHaveValue("前回答"));
    open(); close();
    expect(reportStudyAnswer).not.toHaveBeenCalled();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "新回答" } });
    expect(reportStudyAnswer).not.toHaveBeenCalled();
    open(); close(); open();
    expect(reportStudyAnswer).toHaveBeenCalledExactlyOnceWith("chusho-secondary");
  });
});
