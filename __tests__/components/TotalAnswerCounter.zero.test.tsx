import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { StudyPresence } from "@/components/StudyPresence";
import { PRESENCE_EVENT } from "@/lib/study-presence";

const zero = { count: 0, exams: [] };
const suggestions = [{ name: "基本情報技術者", href: "/exams/fe" }];
function emit(detail: unknown) {
  act(() => { window.dispatchEvent(new CustomEvent(PRESENCE_EVENT, { detail })); });
}
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("normal zero presence guidance", () => {
  it("only offers existing qualifications after a successful zero snapshot", () => {
    render(<TotalAnswerCounter suggestions={suggestions} />);
    expect(screen.queryByRole("region")).toBeNull();
    emit(zero);
    expect(screen.getByRole("link", { name: "基本情報技術者の問題を見る" })).toHaveAttribute("href", "/exams/fe");
    expect(screen.getByRole("link", { name: "資格から問題を探す" })).toHaveAttribute("href", "#home-directory-title");
    expect(screen.queryByText(/最近|追加しました/)).toBeNull();
    emit({ count: 2, exams: [{ exam: "fe", count: 2 }] });
    expect(screen.getByRole("listitem")).toHaveTextContent("今2人が基本情報技術者を学んでいます。");
    expect(screen.queryByRole("link")).toBeNull();
    emit(null);
    expect(screen.queryByRole("region")).toBeNull();
  });
  it("falls back to the on-page public directory with no release history or suggestions", () => {
    render(<TotalAnswerCounter />);
    emit(zero);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link")).toHaveTextContent("資格から問題を探す");
    emit({ count: null, exams: null });
    expect(screen.queryByRole("region")).toBeNull();
  });
  it("clears a successful zero on API failure, timeout, hidden tab and inactivity", async () => {
    vi.useFakeTimers();
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0");
    let visible = "visible";
    vi.spyOn(document, "visibilityState", "get").mockImplementation(() => visible as DocumentVisibilityState);
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => zero });
    vi.stubGlobal("fetch", fetcher);
    render(<><StudyPresence /><TotalAnswerCounter /></>);
    await act(async () => { await vi.advanceTimersByTimeAsync(1); });
    expect(screen.getByRole("link")).toBeVisible();
    fetcher.mockRejectedValue(new Error("offline"));
    await act(async () => { await vi.advanceTimersByTimeAsync(30_000); });
    expect(screen.queryByRole("region")).toBeNull();
    fetcher.mockResolvedValue({ ok: true, json: async () => zero });
    await act(async () => { await vi.advanceTimersByTimeAsync(30_000); });
    expect(screen.getByRole("link")).toBeVisible();
    visible = "hidden";
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(screen.queryByRole("region")).toBeNull();
    visible = "visible";
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    await act(async () => { await vi.advanceTimersByTimeAsync(30_000); });
    expect(screen.getByRole("link")).toBeVisible();
    await act(async () => { await vi.advanceTimersByTimeAsync(120_000); });
    expect(screen.queryByRole("region")).toBeNull();
    const calls = fetcher.mock.calls.length;
    await act(async () => { await vi.advanceTimersByTimeAsync(30_000); });
    expect(fetcher).toHaveBeenCalledTimes(calls);
    fetcher.mockImplementation((_url: string, init: RequestInit) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(new Error("timeout")));
    }));
    emit(zero);
    act(() => window.dispatchEvent(new Event("pointerdown")));
    await act(async () => { await vi.advanceTimersByTimeAsync(8_000); });
    expect(screen.queryByRole("region")).toBeNull();
  });
});
