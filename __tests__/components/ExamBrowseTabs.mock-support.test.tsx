import { EXAM_CONFIGS } from "@/lib/exam-config";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExamBrowseTabs } from "@/components/exam/ExamBrowseTabs";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { MOCK_EXAM_CONFIGS } from "@/lib/mock-exam/config";
import type { ExamCode } from "@/lib/questions/types";
import { EXAM_LABELS } from "@/lib/utils";

const route = vi.hoisted(() => ({ pathname: "/denko2" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
// Cover every qualification accepted by the question schema, including future additions.
const schemaExams = Object.keys(EXAM_CONFIGS) as ExamCode[];
afterEach(cleanup);

describe("qualification mock eligibility from the question schema", () => {
  it("宅建の年度一覧を直接表示する", () => {
    const { container } = render(<ExamBrowseTabs exam="takken" years={[{ key: "2026-autumn", label: "2026年度", count: 50 }]} categories={[]} />);
    const years = screen.getByRole("region", { name: "年度別の過去問" });
    expect(within(years).getByRole("link", { name: /2026年度/ })).toHaveAttribute("href", "/takken/2026-autumn");
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(container.querySelector("details#topics")).not.toHaveAttribute("open");
  });
  it.each(schemaExams)("%s hub only links a mock when it has a config", (exam) => {
    const { container } = render(<ExamBrowseTabs exam={exam} years={[]} categories={[]} />);
    const mockLinks = container.querySelectorAll('details a[href^="/mock-exam"]');
    expect(mockLinks).toHaveLength(Object.hasOwn(MOCK_EXAM_CONFIGS, exam) ? 1 : 0);
    if (!Object.hasOwn(MOCK_EXAM_CONFIGS, exam)) {
      expect(screen.queryByText("実試験と同じ問題数・制限時間で受験")).not.toBeInTheDocument();
    }
  });
  // Publication-gated staging codes have no public label or qualification page.
  // The generic 404 navigation is not that qualification's mobile navigation.
  it.each(schemaExams.filter(exam => Object.hasOwn(EXAM_LABELS, exam)))("%s mobile navigation keeps the three shared tabs", (exam) => {
    route.pathname = `/${exam}`;
    render(<MobileBottomNav />);
    const navigation = within(screen.getByRole("navigation", { name: "モバイル底タブ" }));
    expect(navigation.getAllByRole("link").map(link => [link.textContent, link.getAttribute("href")])).toEqual([
      ["ホーム", "/"], ["さがす", "/search"], ["メニュー", "/me"],
    ]);
    expect(navigation.queryByRole("link", { name: "模試" })).not.toBeInTheDocument();
  });
  it("SG describes subject A practice without claiming a full exam", () => {
    const { container } = render(<ExamBrowseTabs exam="sg" years={[]} categories={[]} />);
    expect(container.querySelector("details#mock a")).toHaveAttribute("href", "/mock-exam?exam=sg");
    expect(screen.queryByText("実試験と同じ問題数・制限時間で受験")).not.toBeInTheDocument();
  });
});
