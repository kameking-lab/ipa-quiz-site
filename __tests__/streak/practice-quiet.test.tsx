import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { StreakTracker } from "@/lib/streak/StreakTracker";

const mock = vi.hoisted(() => ({ pathname: "/quiz", record: vi.fn() }));
vi.mock("next/navigation", () => ({ usePathname: () => mock.pathname }));
vi.mock("@/lib/storage/history", () => ({ createHistoryStore: () => ({ getStats: () => ({ total: 1 }) }) }));
vi.mock("@/lib/streak/storage", () => ({ recordStudyToday: mock.record }));
beforeEach(() => {
  localStorage.clear();
  mock.record.mockReset().mockReturnValue({ reachedMilestone: 7 });
});
afterEach(cleanup);
it.each(["/quiz", "/q/ip/2011a/am/1"])("records the streak on %s without an automatic milestone popup", pathname => {
  mock.pathname = pathname;
  render(<StreakTracker />);
  expect(mock.record).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole("status")).toBeNull();
  expect(screen.queryByRole("button")).toBeNull();
});
