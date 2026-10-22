import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { StudyPresence } from "@/components/StudyPresence";
import { PRESENCE_EVENT } from "@/lib/study-presence";

const zero = { count: 0, exams: [] };
const suggestions = [{ name: "基本情報技術者", href: "/exams/fe" }];
function emit(detail: unknown) {
  act(() => { window.dispatchEvent(new CustomEvent(PRESENCE_EVENT, { detail })); });
}
function expectUnknownGuidance() {
  expect(screen.getByRole("region", { name: "学習のご案内" })).toBeVisible();
  expect(screen.getByRole("link", { name: "資格から問題を探す" })).toHaveAttribute("href", "#home-directory-title");
  expect(screen.getByRole("link", { name: "基本情報技術者の問題を見る" })).toHaveAttribute("href", "/exams/fe");
  expect(screen.queryByText("学習中の資格はまだありません。")).toBeNull();
  expect(screen.queryByText(/人が.*を学んでいます|直近2分/)).toBeNull();
  expect(screen.queryByTitle(/直近2分/)).toBeNull();
}
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("public qualification guidance", () => {
  it("renders neutral guidance on the server and keeps the initial region on unknown updates", () => {
    const html = renderToString(<TotalAnswerCounter suggestions={suggestions} />);
    expect(html).toContain("資格から問題を探す");
    expect(html).not.toMatch(/学習中の資格はまだありません|直近2分/);
    render(<TotalAnswerCounter suggestions={suggestions} />);
    const region = screen.getByRole("region");
    expectUnknownGuidance();
    for (const detail of [null, { count: null, exams: null }, { count: 2, exams: [] }]) {
      emit(detail);
      expectUnknownGuidance();
      expect(screen.getByRole("region")).toBe(region);
    }
    expect(screen.queryByText(/最近|追加しました/)).toBeNull();
  });
  it("distinguishes measured zero, positive counts and a return to unknown", () => {
    render(<TotalAnswerCounter suggestions={suggestions} />);
    const region = screen.getByRole("region");
    emit(zero);
    expect(screen.getByText("学習中の資格はまだありません。")).toBeVisible();
    expect(screen.getByText(/直近2分の学習状況/)).toBeVisible();
    expect(screen.getAllByRole("link")).toHaveLength(2);
    emit({ count: 2, exams: [{ exam: "fe", count: 2 }] });
    expect(screen.getByRole("listitem")).toHaveTextContent("今2人が基本情報技術者を学んでいます。");
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByText("学習中の資格はまだありません。")).toBeNull();
    emit(null);
    expectUnknownGuidance();
    expect(screen.getByRole("region")).toBe(region);
  });
  it("offers the public directory even when no suggestions are provided", () => {
    render(<TotalAnswerCounter />);
    for (const detail of [null, zero, { count: null, exams: null }]) {
      emit(detail);
      expect(screen.getAllByRole("link")).toHaveLength(1);
      expect(screen.getByRole("link")).toHaveTextContent("資格から問題を探す");
    }
  });
  it("retains guidance across API failure, recovery, backgrounding, inactivity and timeout", async () => {
    vi.useFakeTimers();
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0");
    Object.defineProperty(navigator, "webdriver", { configurable: true, value: false });
    let visible = "visible";
    vi.spyOn(document, "visibilityState", "get").mockImplementation(() => visible as DocumentVisibilityState);
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => zero });
    vi.stubGlobal("fetch", fetcher);
    render(<><StudyPresence /><TotalAnswerCounter suggestions={suggestions} /></>);
    expectUnknownGuidance();
    await act(async () => { await vi.advanceTimersByTimeAsync(1); });
    expect(screen.getByText("学習中の資格はまだありません。")).toBeVisible();
    fetcher.mockResolvedValue({ ok: false, status: 503, json: async () => ({ count: null, exams: null }) });
    await act(async () => { await vi.advanceTimersByTimeAsync(30_000); });
    expectUnknownGuidance();
    fetcher.mockResolvedValue({ ok: true, json: async () => zero });
    await act(async () => { await vi.advanceTimersByTimeAsync(30_000); });
    expect(screen.getByText("学習中の資格はまだありません。")).toBeVisible();
    visible = "hidden";
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expectUnknownGuidance();
    const hiddenCalls = fetcher.mock.calls.length;
    await act(async () => { await vi.advanceTimersByTimeAsync(30_000); });
    expect(fetcher).toHaveBeenCalledTimes(hiddenCalls);
    visible = "visible";
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    await act(async () => { await vi.advanceTimersByTimeAsync(30_000); });
    expect(screen.getByText("学習中の資格はまだありません。")).toBeVisible();
    await act(async () => { await vi.advanceTimersByTimeAsync(120_000); });
    expectUnknownGuidance();
    const idleCalls = fetcher.mock.calls.length;
    await act(async () => { await vi.advanceTimersByTimeAsync(30_000); });
    expect(fetcher).toHaveBeenCalledTimes(idleCalls);
    fetcher.mockImplementation((_url: string, init: RequestInit) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(new Error("timeout")));
    }));
    emit(zero);
    act(() => window.dispatchEvent(new Event("pointerdown")));
    await act(async () => { await vi.advanceTimersByTimeAsync(8_000); });
    expect(fetcher.mock.calls.at(-1)?.[1].signal.aborted).toBe(true);
    expectUnknownGuidance();
    fetcher.mockResolvedValue({ ok: true, json: async () => ({ count: 2, exams: [{ exam: "fe", count: 2 }] }) });
    await act(async () => { await vi.advanceTimersByTimeAsync(60_000); });
    expect(screen.getByRole("listitem")).toHaveTextContent("今2人が基本情報技術者を学んでいます。");
    expect(fetcher.mock.calls.every(([, init]) => init.method === "GET")).toBe(true);
  });
});
