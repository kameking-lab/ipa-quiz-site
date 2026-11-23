import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchClient } from "@/components/search/SearchClient";

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

describe("問題文の検索", () => {
  it("既存URLの資格・並び順を検索に反映する", async () => {
    nav.params = new URLSearchParams("exam=ip&recent=1&sort=year_desc");
    render(<SearchClient />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(expect.stringContaining("exam=ip&sort=year_desc"), expect.anything()));
    await screen.findByText(/該当する問題は見つかりませんでした/);
    expect(screen.queryByLabelText("並び順")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "すべての条件をクリア" }));
    expect(nav.replace).toHaveBeenLastCalledWith("/search", { scroll: false });
  });

  it("条件のないときは問題一覧を取得せず、必要な操作だけを出す", () => {
    nav.params = new URLSearchParams();
    render(<SearchClient />);
    expect(fetch).not.toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: /保存済み/ })).toBeNull();
    expect(screen.getByRole("searchbox", { name: "キーワード" })).not.toHaveAttribute("aria-autocomplete");
  });
});
