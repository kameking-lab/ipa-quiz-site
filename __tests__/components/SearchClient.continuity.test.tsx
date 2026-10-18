import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchClient } from "@/components/search/SearchClient";
import { LS_KEYS } from "@/lib/storage/keys";

const nav = vi.hoisted(() => ({ params: new URLSearchParams(), replace: vi.fn() }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: nav.replace }),
  useSearchParams: () => nav.params,
}));

beforeEach(() => {
  cleanup();
  localStorage.clear();
  nav.params = new URLSearchParams("exam=ip&recent=1");
  nav.replace.mockReset();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ total: 0, hits: [], facets: { exam: {}, year: {}, season: {}, category: {}, difficulty: {} }, limit: 50, offset: 0 }),
  }));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("search continuity and accessible saved searches", () => {
  it("keeps the recent-only filter while changing sort", async () => {
    render(<SearchClient />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(expect.stringContaining("exam=ip"), expect.anything()));
    await screen.findByText(/該当する問題は見つかりませんでした/);
    fireEvent.change(screen.getByLabelText("並び順"), { target: { value: "year_desc" } });
    expect(nav.replace).toHaveBeenLastCalledWith("/search?exam=ip&sort=year_desc&recent=1", { scroll: false });
  });

  it("gives each saved-search delete control a useful name and visible touch target", async () => {
    nav.params = new URLSearchParams();
    localStorage.setItem(LS_KEYS.savedSearches, JSON.stringify([
      { id: "saved-1", label: "情報セキュリティ", params: "exam=sg", savedAt: 1 },
    ]));
    render(<SearchClient />);
    await screen.findByText(/該当する問題は見つかりませんでした/);
    fireEvent.click(screen.getByRole("button", { name: /保存済み/ }));
    const remove = screen.getByRole("button", { name: "情報セキュリティを削除" });
    expect(remove).toHaveClass("min-h-11", "min-w-11");
    expect(remove).not.toHaveClass("opacity-0");
    expect(screen.getByRole("searchbox", { name: "キーワード" })).not.toHaveAttribute("aria-autocomplete");
  });
});
