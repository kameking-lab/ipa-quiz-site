import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ExplanationLayers } from "@/components/quiz/ExplanationLayers";

it("preserves the trailing formula after complete sentences", () => {
  const { container } = render(<ExplanationLayers explanation="正解です。条件を使います。計算します。x=20" />);
  expect(container.textContent).toContain("x=20");
});

it("renders literal BNF and a complete table without splitting them into layers", () => {
  const { container } = render(<ExplanationLayers explanation={'結論です。\n\n```text\n<DNA> ::= A|T\n```\n\n| 値 | 結果 |\n|---|---|\n| 1 | **一致** |'} />);
  expect(container.querySelector("pre code")?.textContent).toBe("<DNA> ::= A|T");
  expect(container.querySelector("table tbody td strong")?.textContent).toBe("一致");
});
