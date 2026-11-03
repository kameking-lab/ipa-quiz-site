import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const route = vi.hoisted(() => ({ pathname: "/", search: "" }));
vi.mock("next/navigation", () => ({
  usePathname: () => route.pathname,
  useSearchParams: () => new URLSearchParams(route.search),
}));
vi.mock("@/lib/streak/StreakBadge", () => ({ StreakBadge: () => null }));
vi.mock("@/components/ThemeToggle", () => ({ ThemeToggle: () => null }));
import { SiteHeader } from "@/components/SiteHeader";

afterEach(cleanup);
describe("SiteHeader qualification context", () => {
  for (const exam of ["fp3", "shika-ishi", "chosashi"]) {
    it(`keeps ${exam} in desktop and mobile learning links and omits unsupported modes`, () => {
      route.pathname = `/q/${exam}/2026-published/gakka/q11`;
      route.search = "exam=ap"; // The question route is authoritative.
      render(<SiteHeader />);
      fireEvent.click(screen.getByRole("button", { name: "問題を解く" }));
      const desktop = screen.getByRole("list", { name: "問題を解くメニュー" });
      for (const name of ["通常クイズ", "復習モード", "弱点克服"]) {
        const href = within(desktop).getByRole("link", { name }).getAttribute("href")!;
        expect(new URL(href, "https://local.invalid").searchParams.get("exam")).toBe(exam);
      }
      expect(screen.queryByRole("link", { name: "模試" })).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "メニューを開く" }));
      const mobile = screen.getByRole("navigation", { name: "モバイルナビゲーション" });
      for (const name of ["通常クイズ", "復習モード", "弱点克服"]) {
        expect(new URL(within(mobile).getByRole("link", { name }).getAttribute("href")!, "https://local.invalid").searchParams.get("exam")).toBe(exam);
      }
      expect(within(mobile).queryByRole("link", { name: "模試" })).not.toBeInTheDocument();
      if (exam === "shika-ishi") expect(within(mobile).queryByRole("link", { name: "ストリームモード" })).not.toBeInTheDocument();
    });
  }
  it("follows a changed query qualification without changing pathname", () => {
    route.pathname = "/quiz";
    route.search = "exam=fp3&session=gakka&question=fp3-q11&year=2026&season=published";
    const view = render(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: "問題を解く" }));
    const normal = () => screen.getByRole("link", { name: "通常クイズ" });
    expect(new URL(normal().getAttribute("href")!, "https://local.invalid").searchParams.get("question")).toBe("fp3-q11");
    route.search = "exam=shika-ishi&session=mondai-a";
    view.rerender(<SiteHeader />);
    expect(new URL(normal().getAttribute("href")!, "https://local.invalid").searchParams.get("exam")).toBe("shika-ishi");
    expect(new URL(normal().getAttribute("href")!, "https://local.invalid").searchParams.get("session")).toBe("mondai-a");
  });
  it("keeps a supported IPA mock and labels the generic mock as IPA only", () => {
    route.pathname = "/fe/2025-cbt";
    route.search = "";
    const view = render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "模試" })).toHaveAttribute("href", "/mock-exam?exam=fe&returnTo=%2Ffe%2F2025-cbt");
    route.pathname = "/about";
    view.rerender(<SiteHeader />);
    expect(screen.getByRole("link", { name: "IPA 模試" })).toHaveAttribute("href", "/mock-exam");
  });
});
