import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { RIYOSHI_CANDIDATES } from "@/data/questions/riyoshi";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ChoiceButton } from "@/components/quiz/ChoiceButton";
import { choiceDisplayLabel, choiceImageAlt } from "@/lib/questions/display";
import type { ChoiceKey } from "@/lib/questions/types";
afterEach(cleanup);
describe("Riyoshi original diagrams", () => {
  it("shows every stem diagram with edition and meaningful alternative text", () => {
    for(const q of RIYOSHI_CANDIDATES.filter(q=>q.imageUrls?.length)) {
      const result=render(<QuestionCard question={q} />);
      expect(result.container.textContent).toContain(q.season === "first" ? "第53回" : "第54回");
      for(const [i,url] of (q.imageUrls ?? []).entries()) {
        const alt=q.imageAltTexts?.[i];
        expect(alt).toBeTruthy();
        expect(result.getByAltText(alt!)).toHaveAttribute("src",url);
      }
      expect(result.container.textContent).not.toContain("正解");
      result.unmount();
    }
  });
  it("shows all four angle diagrams with numeric option labels before revealing the answer", () => {
    const q=RIYOSHI_CANDIDATES.find(x=>x.season === "second" && x.qNumber === 48)!;
    const result=render(<div>{Object.entries(q.choices ?? {}).map(([key,text])=>{
      const k=key as ChoiceKey;
      return <ChoiceButton key={key} choiceKey={k} displayLabel={choiceDisplayLabel(q.exam,k)} text={text} imageUrl={q.choiceImageUrls?.[k]} imageAlt={choiceImageAlt(q.exam,k)} revealed={false} selected={false} correct={q.answer===k} disabled={false} onClick={()=>{}} />;
    })}</div>);
    expect(screen.getAllByRole("radio")).toHaveLength(4);
    expect(screen.getAllByRole("img")).toHaveLength(4);
    for(const number of [1,2,3,4])expect(screen.getByRole("img",{name:"選択肢"+number+"の図（公式問題PDFより）"})).toHaveAttribute("src",q.choiceImageUrls?.[["ア","イ","ウ","エ"][number-1] as ChoiceKey]);
    expect(result.container.textContent).not.toContain("正解");
  });
});
