import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/SiteHeader";

const state = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => state.pathname }));
vi.mock("@/lib/streak/StreakBadge", () => ({ StreakBadge: () => null }));
afterEach(cleanup);

it.each(["/fp3", "/shika-ishi", "/fe/2025-cbt"])("keeps the same menu destination on %s", (pathname) => {
  state.pathname = pathname;
  render(<SiteHeader />);
  expect(screen.getByRole("link", { name: "メニュー" })).toHaveAttribute("href", "/me");
  expect(screen.queryByRole("link", { name: "ブックマーク" })).toBeNull();
  expect(screen.queryByRole("link", { name: "模試" })).toBeNull();
});

it("uses the shared menu on safety pages", () => {
  state.pathname = "/e-learning/exams";
  render(<SiteHeader />);
  expect(screen.queryByRole("link", { name: "進捗・復習" })).toBeNull();
  expect(screen.getByRole("link", { name: "メニュー" })).toHaveAttribute("href", "/me");
});
