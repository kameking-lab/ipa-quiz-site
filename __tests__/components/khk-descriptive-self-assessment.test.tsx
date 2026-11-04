import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { DescriptiveAnswerCard } from "@/components/quiz/DescriptiveAnswerCard";
import { KHK_KAGAKU_QUESTIONS } from "@/data/questions/khk-kagaku";

afterEach(cleanup);

describe("KHK descriptive self assessment", () => {
  it("adds and removes only explicitly checked rubric points and names the correct source", () => {
    const question = KHK_KAGAKU_QUESTIONS.find((q) => q.year === 2025 && q.session === "khk-az" && q.qNumber === 1)!;
    render(<DescriptiveAnswerCard question={question} defaultOpen />);
    expect(screen.getByRole("status")).toHaveTextContent("自己採点 0 / 15 点");
    expect(screen.getByRole("link", { name: "高圧ガス保安協会の公式問題PDF" })).toHaveAttribute("href", question.sourcePdfUrl);
    expect(screen.queryByText(/法務省/)).toBeNull();
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    expect(screen.getByRole("status")).toHaveTextContent("自己採点 8 / 15 点");
    fireEvent.click(checkboxes[1]);
    expect(screen.getByRole("status")).toHaveTextContent("自己採点 15 / 15 点");
    fireEvent.click(checkboxes[0]);
    expect(screen.getByRole("status")).toHaveTextContent("自己採点 7 / 15 点");
    expect(screen.getByText(/公式の採点基準や合否判定ではありません/)).toBeInTheDocument();
  });
});
