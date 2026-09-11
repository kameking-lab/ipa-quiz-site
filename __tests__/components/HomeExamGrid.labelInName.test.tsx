import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import { HomeExamGrid } from "@/components/home/HomeExamGrid";

afterEach(cleanup);
describe("HomeExamGrid qualification selection", () => {
  it("opens the selected qualification before choosing a study mode", () => {
    const { container } = render(<HomeExamGrid questionCounts={{ ip: 100, ap: 200 }} />);
    expect(screen.getByRole("link", { name: /ITパスポートの過去問を選ぶ/ })).toHaveAttribute("href", "/ip");
    expect(screen.getByRole("link", { name: /応用情報技術者の過去問を選ぶ/ })).toHaveAttribute("href", "/ap");
    expect(container.querySelector('a[href^="/quiz"]')).toBeNull();
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
