import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { AnswerPractice } from "@/components/chusho-secondary/AnswerPractice";
const solutions=[{label:"設問1",maxChars:3,example:"例文",reasoning:"与件を根拠に考える。".repeat(5),checkpoints:["根拠を確認する","結論を確認する"]}];
describe("secondary written self-comparison",()=>{
  beforeEach(()=>localStorage.clear());
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
});
