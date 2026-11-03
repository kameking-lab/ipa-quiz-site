import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChoiceButton } from "@/components/quiz/ChoiceButton";

describe("ChoiceButton rich question choices", () => {
  it("renders a relation table and still selects it when a cell is clicked", () => {
    const select = vi.fn();
    const { container } = render(<ChoiceButton choiceKey="ウ" text={"| 店 |\n| --- |\n| B |"}
      revealed={false} selected={false} correct={true} disabled={false} onClick={select} />);
    expect(container.querySelector("table")).not.toBeNull();
    expect(container.querySelector("td")?.textContent).toBe("B");
    fireEvent.click(screen.getByText("B"));
    expect(select).toHaveBeenCalledOnce();
    expect(container.textContent).not.toContain("| --- |");
  });

  it("keeps angle brackets in grammar choices and renders primary key emphasis", () => {
    render(<ChoiceButton choiceKey="ア" text={"`<DNA>` と **主キー**"}
      revealed={false} selected={false} correct={false} disabled={false} onClick={() => {}} />);
    expect(screen.getByText("<DNA>").tagName).toBe("CODE");
    expect(screen.getByText("主キー").tagName).toBe("STRONG");
  });
});
