import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DashboardWeakness } from "@/components/account/tabs/DashboardWeakness";
vi.mock("@/app/account/weakness/WeaknessHeatmapClient", () => ({ WeaknessHeatmapClient: () => null }));
vi.mock("@/components/account/MockExamInsight", () => ({ MockExamInsight: () => null }));
afterEach(cleanup);
describe("weakness review entry point", () => {
  it("opens the review section of the learner’s record", () => {
    render(<DashboardWeakness categoryById={{}} />);
    expect(screen.getByRole("heading", { name: "弱点克服モード" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "わたしの記録で復習する" })).toHaveAttribute("href", "/me#study-progress");
  });
});
