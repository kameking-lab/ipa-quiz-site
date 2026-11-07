import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import EssayGradingDemoPage, { metadata } from "@/app/demo/essay-grading/page";

describe("editorial essay example", () => {
  it("provides review guidance without representing fabricated scoring as a measured outcome", () => {
    const { container } = render(<EssayGradingDemoPage />);
    expect(screen.getByRole("heading", { name: "論述の見直し例" })).toBeTruthy();
    expect(container.textContent).not.toMatch(/合格率予測|実際の採点結果|ランク B|論理性 \+5/);
    expect(container.textContent).toContain("設問・答案・コメントはすべて編集部作成");
    expect(container.querySelectorAll('table th[scope="col"]')).toHaveLength(2);
    const answers = [...container.querySelectorAll("details > p")];
    for (const answer of answers) {
      const card = answer.closest('[data-slot="card"]') ?? answer.closest("details")?.parentElement?.parentElement;
      expect(card?.textContent).toContain(`${Array.from(answer.textContent ?? "").length} 字`);
    }
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
