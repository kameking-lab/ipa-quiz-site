import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { ExamCatalogBrowser, type ExamCatalogItem } from "@/components/exam-library/exam-catalog-browser";
import { EXAM_GROUPS } from "@/lib/exam-library-model";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";

const items: ExamCatalogItem[] = EXAM_CATALOG.map((entry) => ({
  ...entry, href: `/e-learning/exams/${entry.id}`, dateText: entry.date,
  questionCount: entry.questionCount ?? 20, scoredCount: entry.scoredCount ?? 0,
}));
afterEach(cleanup);
describe("consistent qualification selection", () => {
  it("separates the two consultant qualifications without category tabs", () => {
    render(<ExamCatalogBrowser groups={EXAM_GROUPS} items={items} initialGroup="lckohyo" initialSubject={null} />);
    expect(screen.queryByRole("tablist")).toBeNull();
    const safety = screen.getByRole("region", { name: "労働安全コンサルタント" });
    const health = screen.getByRole("region", { name: "労働衛生コンサルタント" });
    expect(within(safety).getByRole("link", { name: /産業安全一般/ })).toHaveAttribute("href", expect.stringContaining("group=cskohyo"));
    expect(within(safety).queryByRole("link", { name: /労働衛生一般/ })).toBeNull();
    expect(within(health).getByRole("link", { name: /労働衛生一般/ })).toBeInTheDocument();
    expect(within(health).queryByRole("link", { name: /産業安全一般/ })).toBeNull();
  });
  it("keeps old consultant subject links and shows only the selected subject papers", () => {
    render(<ExamCatalogBrowser groups={EXAM_GROUPS} items={items} initialGroup="cskohyo" initialSubject="労働衛生一般" />);
    expect(screen.getByRole("heading", { name: "労働衛生一般の過去問" })).toBeInTheDocument();
    const paperLinks = screen.getAllByRole("link").filter((link) => link.getAttribute("href")?.startsWith("/e-learning/exams/cskohyo-"));
    expect(paperLinks.length).toBeGreaterThan(0);
    for (const link of paperLinks) {
      const item = items.find((entry) => entry.href === link.getAttribute("href"));
      expect(item?.subject).toBe("労働衛生一般");
    }
  });
});
