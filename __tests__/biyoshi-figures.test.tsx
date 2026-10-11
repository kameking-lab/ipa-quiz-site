import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { BIYOSHI_CANDIDATES } from "@/data/questions/biyoshi";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ChoiceButton } from "@/components/quiz/ChoiceButton";
import { choiceDisplayLabel } from "@/lib/questions/display";
import type { ChoiceKey } from "@/lib/questions/types";

afterEach(cleanup);
describe("美容師の原図と学習前表示", () => {
  it("shows all three integrated official figures with readable edition and alternative text", () => {
    for (const q of BIYOSHI_CANDIDATES.filter(q => q.imageUrls?.length)) {
      const result = render(<QuestionCard question={q} />);
      expect(result.container.textContent).toContain(q.season === "first" ? "第53回" : "第54回");
      for (const [i, url] of q.imageUrls!.entries()) {
        expect(q.imageAltTexts?.[i]).toBeTruthy();
        expect(result.getByAltText(q.imageAltTexts![i]!)).toHaveAttribute("src", url);
      }
      expect(result.container.textContent).not.toContain("正解");
      result.unmount();
    }
  });
  it("keeps numeric labels 1 to 4 and hides the correct-answer state before response", () => {
    const q = BIYOSHI_CANDIDATES.find(q => q.season === "second" && q.qNumber === 55)!;
    const result = render(<div>{Object.entries(q.choices!).map(([key, text]) => {
      const k = key as ChoiceKey;
      return <ChoiceButton key={key} choiceKey={k} displayLabel={choiceDisplayLabel(q.exam, k)} text={text} revealed={false} selected={false} correct={q.answer === k} disabled={false} onClick={() => {}} />;
    })}</div>);
    expect(result.getAllByRole("radio")).toHaveLength(4);
    for (const label of ["1", "2", "3", "4"]) expect(result.getByText(label)).toBeTruthy();
    expect(result.container.textContent).not.toMatch(/正解|不正解/);
  });
});
