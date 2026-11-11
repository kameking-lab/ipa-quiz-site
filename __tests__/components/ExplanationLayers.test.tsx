import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ExplanationLayers, ExplanationStructureLabel } from "@/components/quiz/ExplanationLayers";

it("preserves the trailing formula after complete sentences", () => {
  const { container } = render(<ExplanationLayers explanation="正解です。条件を使います。計算します。x=20" />);
  expect(container.textContent).toContain("x=20");
});

it("renders literal BNF and a complete table without splitting them into layers", () => {
  const { container } = render(<ExplanationLayers explanation={'結論です。\n\n```text\n<DNA> ::= A|T\n```\n\n| 値 | 結果 |\n|---|---|\n| 1 | **一致** |'} />);
  expect(container.querySelector("pre code")?.textContent).toBe("<DNA> ::= A|T");
  expect(container.querySelector("table tbody td strong")?.textContent).toBe("一致");
});


import { IP_QUESTIONS_2009_AUTUMN_AM } from "@/data/questions/ip/by-year/2009-autumn-am";
import { AP_QUESTIONS_2016_AUTUMN } from "@/data/questions/ap/by-year/2016-autumn";
import { AP_QUESTIONS_2024_AUTUMN } from "@/data/questions/ap/by-year/2024-autumn";
import { applyIpaCorrections } from "@/data/questions/corrections";

it("does not promise missing details or supplements for the published IP2009 question", () => {
  const q = applyIpaCorrections("ip", IP_QUESTIONS_2009_AUTUMN_AM).find(q => q.id === "ip-2009a-am-q1")!;
  const { container } = render(<><ExplanationStructureLabel explanation={q.explanation} /><ExplanationLayers explanation={q.explanation} /></>);
  expect(screen.getByText("解説本文")).toBeInTheDocument();
  expect(container.textContent).not.toContain("3 層構成");
  expect(screen.queryByText("詳細")).not.toBeInTheDocument();
  expect(screen.queryByText("補足")).not.toBeInTheDocument();
  expect(container.querySelectorAll("article")).toHaveLength(1);
  expect(container.querySelector(".selectable-content")?.textContent).toBe(q.explanation);
});

it("renders the restored AP2016 explanation as its two complete paragraphs", () => {
  const q = applyIpaCorrections("ap", AP_QUESTIONS_2016_AUTUMN).find(q => q.id === "ap-2016a-am-q1")!;
  const { container } = render(<><ExplanationStructureLabel explanation={q.explanation} /><ExplanationLayers explanation={q.explanation} /></>);
  expect(screen.getByText("結論 → 詳細 の 2 層構成")).toBeInTheDocument();
  expect(screen.queryByText("補足")).not.toBeInTheDocument();
  expect(container.querySelectorAll("article")).toHaveLength(2);
  expect(container.querySelectorAll("details")).toHaveLength(1);
  expect([...container.querySelectorAll(".selectable-content")].map(body => body.textContent))
    .toEqual(q.explanation.split("\n\n"));
  expect(container.textContent).toContain("(¬A)・X");
  expect(container.textContent).toContain("エの(¬A)・Y");
});

it("retains three sections and readable bodies when the source has three paragraphs", () => {
  const paragraphs = ["結論の本文です。", "詳細の本文です。", "補足の本文です。"];
  const explanation = paragraphs.join("\n\n");
  const { container } = render(<><ExplanationStructureLabel explanation={explanation} /><ExplanationLayers explanation={explanation} /></>);
  expect(screen.getByText("結論 → 詳細 → 補足 の 3 層構成")).toBeInTheDocument();
  expect(screen.getByText("結論")).toBeInTheDocument();
  expect(screen.getByText("詳細")).toBeInTheDocument();
  expect(screen.getByText("補足")).toBeInTheDocument();
  expect(container.querySelectorAll("article")).toHaveLength(3);
  const details = container.querySelectorAll("details");
  expect(details).toHaveLength(2);
  expect([...details].every(detail => detail.open)).toBe(true);
  expect([...container.querySelectorAll(".selectable-content")].map(body => body.textContent)).toEqual(paragraphs);
  fireEvent.click(details[0].querySelector("summary")!);
  expect(container.textContent).toContain(paragraphs[1]);
});

it("describes the existing sentence split as two sections rather than inventing a supplement", () => {
  const q = AP_QUESTIONS_2024_AUTUMN.find(q => q.id === "ap-2024a-am-q1")!;
  const { container } = render(<><ExplanationStructureLabel explanation={q.explanation} /><ExplanationLayers explanation={q.explanation} /></>);
  expect(screen.getByText("結論 → 詳細 の 2 層構成")).toBeInTheDocument();
  expect(container.querySelectorAll("article")).toHaveLength(2);
  expect(screen.queryByText("補足")).not.toBeInTheDocument();
  expect(container.textContent).toContain("2倍になります");
});

it("does not advertise paragraph layers when a complete code block or table must stay together", () => {
  const explanation = "結論です。\n\n```text\n<DNA> ::= A|T\n```\n\n| 値 | 結果 |\n|---|---|\n| 1 | **一致** |";
  const { container } = render(<><ExplanationStructureLabel explanation={explanation} /><ExplanationLayers explanation={explanation} /></>);
  expect(screen.getByText("解説本文")).toBeInTheDocument();
  expect(container.querySelectorAll("article")).toHaveLength(1);
  expect(container.querySelector("pre code")?.textContent).toBe("<DNA> ::= A|T");
  expect(container.querySelector("table tbody td strong")?.textContent).toBe("一致");
});

it("makes no structure claim for missing content", () => {
  const { container } = render(<ExplanationStructureLabel explanation="  " />);
  expect(container).toBeEmptyDOMElement();
});
