import { readFileSync } from "node:fs";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExamBrowseTabs } from "@/components/exam/ExamBrowseTabs";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { MOCK_EXAM_CONFIGS } from "@/lib/mock-exam/config";
import type { ExamCode } from "@/lib/questions/types";

const route = vi.hoisted(() => ({ pathname: "/denko2" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
// Cover every qualification accepted by the question schema, including future additions.
const declaration = readFileSync("scripts/validate-questions.ts", "utf8").match(/exam: z\.enum\(\[([^\]]+)\]\)/)!;
const schemaExams = JSON.parse(`[${declaration[1]}]`) as ExamCode[];
afterEach(cleanup);

describe("qualification mock eligibility from the question schema", () => {
  it.each(schemaExams)("%s hub only links a mock when it has a config", (exam) => {
    render(<ExamBrowseTabs exam={exam} years={[]} categories={[]} />);
    fireEvent.click(screen.getByRole("tab", { name: /模試|演習/ }));
    const mockLinks = screen.queryAllByRole("link").filter((link) => link.getAttribute("href")?.startsWith("/mock-exam"));
    expect(mockLinks).toHaveLength(Object.hasOwn(MOCK_EXAM_CONFIGS, exam) ? 1 : 0);
    if (!Object.hasOwn(MOCK_EXAM_CONFIGS, exam)) {
      expect(screen.queryByText("実試験と同じ問題数・制限時間で受験")).not.toBeInTheDocument();
      expect(screen.getByRole("link", { name: /ランダム短時間演習/ })).toHaveAttribute("href", `/quiz?mode=random&exam=${exam}`);
    }
  });
  it.each(schemaExams)("%s mobile mock keeps the qualification or is absent", (exam) => {
    route.pathname = `/${exam}`;
    render(<MobileBottomNav />);
    const link = screen.queryByRole("link", { name: "模試" });
    if (Object.hasOwn(MOCK_EXAM_CONFIGS, exam)) {
      expect(link).toHaveAttribute("href", `/mock-exam?${new URLSearchParams({ exam, returnTo: route.pathname })}`);
    } else expect(link).not.toBeInTheDocument();
  });
  it("SG describes subject A practice without claiming a full exam", () => {
    render(<ExamBrowseTabs exam="sg" years={[]} categories={[]} />);
    fireEvent.click(screen.getByRole("tab", { name: "演習" }));
    expect(screen.getByRole("link", { name: /科目A 演習/ })).toHaveAttribute("href", "/mock-exam?exam=sg");
    expect(screen.queryByText("実試験と同じ問題数・制限時間で受験")).not.toBeInTheDocument();
  });
});
