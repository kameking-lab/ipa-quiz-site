import { act, cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { StudyPresence } from "@/components/StudyPresence";
import { PRESENCE_EVENT, type StudyPresenceSnapshot } from "@/lib/study-presence";
import { measuredPresence, PRESENCE_STATE_EVENT } from "@/lib/study-presence-contract";

const zero: StudyPresenceSnapshot = { count: 0, exams: [] };
const positive = { count: 2, exams: [{ exam: "fe", count: 2 }] };
const suggestions = [{ name: "基本情報技術者", href: "/exams/fe" }];
const fallbackLabel = "資格紹介";
function emit(detail: unknown, name = PRESENCE_STATE_EVENT) {
  act(() => { window.dispatchEvent(new CustomEvent(name, { detail })); });
}
function measured(value = zero) {
  return { mode: "measured", snapshot: measuredPresence(value, Date.now()), previous: null };
}
function expectGuidance() {
  expect(screen.getByRole("region", { name: "学習のご案内" })).toBeVisible();
  expect(screen.getByText(fallbackLabel)).toBeVisible();
  expect(screen.getByRole("link", { name: "ほかの資格を探す" })).toHaveAttribute("href", "#choose-qualification");
  expect(screen.getByRole("link", { name: "基本情報技術者" })).toHaveAttribute("href", "/exams/fe");
  expect(screen.queryByText(/実際の学習人数では|利用者個人や実際の行動/)).toBeNull();
  expect(screen.queryByText(/人が.*を学習しました|学習人数は0人|直近2分/)).toBeNull();
}
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("public qualification guidance", () => {
  it("renders labeled guidance on the server and rejects legacy or unverified counts", () => {
    const html = renderToString(<TotalAnswerCounter suggestions={suggestions} />);
    expect(html).toContain(fallbackLabel);
    expect(html).not.toMatch(/学習人数は0人|直近2分/);
    render(<TotalAnswerCounter suggestions={suggestions} />);
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("data-study-presence-viewer");
    for (const detail of [null, { mode: "measured", snapshot: positive }, { mode: "demo", snapshot: positive }]) {
      emit(detail); expectGuidance(); expect(screen.getByRole("region")).toBe(region);
    }
    emit(positive, PRESENCE_EVENT); expectGuidance();
  });
  it("distinguishes fresh zero and positive measurements, stale history and expiration", async () => {
    vi.useFakeTimers();
    render(<TotalAnswerCounter suggestions={suggestions} />);
    const region = screen.getByRole("region");
    emit(measured());
    expect(screen.getByText("直近5分の学習人数は0人です。")).toBeVisible();
    expect(screen.getAllByRole("link")).toHaveLength(2);
    emit(measured(positive));
    expect(screen.getByRole("listitem")).toHaveTextContent("直近5分に2人が基本情報技術者を学習しました。");
    expect(screen.queryByRole("link")).toBeNull();
    emit({ mode: "stale", snapshot: null, previous: measured(positive).snapshot, reason: "unavailable" });
    expectGuidance();
    expect(screen.queryByText("学習状況の更新を待っています。")).toBeNull();
    emit(measured(positive));
    await act(async () => { await vi.advanceTimersByTimeAsync(90_000); });
    expectGuidance();
    expect(screen.getByRole("region")).toBe(region);
  });
  it("offers the directory without suggestions", () => {
    render(<TotalAnswerCounter />);
    for (const detail of [null, measured(), { mode: "promotion", snapshot: null }]) {
      emit(detail);
      expect(screen.getAllByRole("link")).toHaveLength(1);
      expect(screen.getByRole("link")).toHaveAttribute("href", detail?.mode === "measured" ? "#home-directory-title" : "#choose-qualification");
    }
  });
  it("paginates real aggregates without adding seats or retaining stale people", () => {
    render(<TotalAnswerCounter suggestions={suggestions} />);
    emit(measured({ count: 25, exams: [{ exam: "fe", count: 14 }, { exam: "ip", count: 11 }] }));
    expect(screen.getAllByRole("button", { name: /チワワ/ })).toHaveLength(12);
    act(() => screen.getByRole("button", { name: "次の部屋" }).click());
    expect(screen.getAllByRole("button", { name: /基本情報技術者のチワワ/ })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: /ITパスポートのチワワ/ })).toHaveLength(10);
    act(() => screen.getByRole("button", { name: "次の部屋" }).click());
    expect(screen.getAllByRole("button", { name: /チワワ/ })).toHaveLength(1);
    expect(screen.getByRole("button", { name: "次の部屋" })).toBeDisabled();
    emit({ mode: "stale", previous: measured(positive).snapshot, reason: "unavailable" });
    expectGuidance();
    expect(screen.queryByRole("navigation", { name: "自習室の部屋を選ぶ" })).toBeNull();
    expect(screen.queryByText(/全25人|この部屋.*人/)).toBeNull();
    emit(measured());
    expect(screen.queryByRole("button", { name: /チワワ/ })).toBeNull();
    expect(screen.getByText("直近5分の学習人数は0人です。")).toBeVisible();
  });
  it("offers real qualification selection without motion controls in promotion", () => {
    render(<TotalAnswerCounter suggestions={suggestions} />);
    expectGuidance();
    const seat = screen.getAllByRole("button", { name: /基本情報技術者のチワワ（資格紹介）/ })[0];
    act(() => seat.click());
    expect(seat).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "基本情報技術者の問題を見る" })).toHaveAttribute("href", "/exams/fe");
    expect(screen.queryByRole("button", { name: /動き/ })).toBeNull();
    expect(screen.queryByText("静止表示")).toBeNull();
    expect(screen.queryByRole("spinbutton")).toBeNull();
    expect(screen.queryByRole("button", { name: /人数デモ|取得失敗|反映/ })).toBeNull();
  });
  it("integrates real client events across failure, recovery, backgrounding, idle and timeout", async () => {
    vi.useFakeTimers();
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0");
    let visible = "visible";
    vi.spyOn(document, "visibilityState", "get").mockImplementation(() => visible as DocumentVisibilityState);
    const response = (value = zero) => ({ ok: true, status: 200, headers: new Headers(), json: async () => measuredPresence(value, Date.now()) });
    const fetcher = vi.fn().mockImplementation(async () => response());
    vi.stubGlobal("fetch", fetcher);
    render(<><StudyPresence /><TotalAnswerCounter suggestions={suggestions} /></>);
    expectGuidance();
    await act(async () => { await vi.advanceTimersByTimeAsync(1); });
    expect(screen.getByText("直近5分の学習人数は0人です。")).toBeVisible();
    fetcher.mockResolvedValue({ ok: false, status: 503, headers: new Headers(), json: async () => ({ count: null, exams: null }) });
    act(() => window.dispatchEvent(new Event("pointerdown")));
    await act(async () => { await vi.advanceTimersByTimeAsync(90_000); });
    expectGuidance();
    fetcher.mockImplementation(async () => response(positive));
    act(() => window.dispatchEvent(new Event("pointerdown")));
    await act(async () => { await vi.advanceTimersByTimeAsync(90_000); });
    expect(screen.getByRole("listitem")).toHaveTextContent("直近5分に2人が基本情報技術者を学習しました。");
    visible = "hidden";
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expectGuidance();
    const hiddenCalls = fetcher.mock.calls.length;
    await act(async () => { await vi.advanceTimersByTimeAsync(90_000); });
    expect(fetcher).toHaveBeenCalledTimes(hiddenCalls);
    visible = "visible";
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    await act(async () => { await vi.advanceTimersByTimeAsync(1); });
    expect(screen.getByRole("listitem")).toHaveTextContent("直近5分に2人が基本情報技術者を学習しました。");
    await act(async () => { await vi.advanceTimersByTimeAsync(120_000); });
    expectGuidance();
    const idleCalls = fetcher.mock.calls.length;
    await act(async () => { await vi.advanceTimersByTimeAsync(90_000); });
    expect(fetcher).toHaveBeenCalledTimes(idleCalls);
    fetcher.mockImplementation((_url: string, init: RequestInit) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(new Error("timeout")));
    }));
    act(() => window.dispatchEvent(new Event("pointerdown")));
    await act(async () => { await vi.advanceTimersByTimeAsync(8_001); });
    expect(fetcher.mock.calls.at(-1)?.[1].signal.aborted).toBe(true);
    expectGuidance();
    fetcher.mockImplementation(async () => response(positive));
    act(() => window.dispatchEvent(new Event("pointerdown")));
    await act(async () => { await vi.advanceTimersByTimeAsync(90_000); });
    expect(screen.getByRole("listitem")).toHaveTextContent("直近5分に2人が基本情報技術者を学習しました。");
    expect(fetcher.mock.calls.every(([, init]) => init.method === "GET")).toBe(true);
  });
  it("never carries a selection between introduction and measured qualifications", () => {
    render(<TotalAnswerCounter suggestions={[...suggestions, ...suggestions, { name: "ITパスポート", href: "/ip" }]} />);
    expect(screen.getAllByRole("button", { name: /チワワ/ })).toHaveLength(2);
    act(() => screen.getByRole("button", { name: /基本情報技術者のチワワ/ }).click());
    emit(measured({ count: 1, exams: [{ exam: "ip", count: 1 }] }));
    expect(screen.getByRole("region", { name: "直近5分の学習状況" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "選択を戻す" })).toBeNull();
    expect(screen.getByRole("button", { name: /ITパスポートのチワワ/ })).toHaveAttribute("aria-pressed", "false");
    emit({ mode: "promotion", snapshot: null });
    expect(screen.queryByRole("button", { name: "選択を戻す" })).toBeNull();
    emit(measured());
    expect(screen.queryByRole("button", { name: /動き/ })).toBeNull();
  });
  it("bounds a million-person fixture to twelve visible seats", () => {
    render(<TotalAnswerCounter suggestions={suggestions} />);
    emit(measured({ count: 1_000_000, exams: [{ exam: "fe", count: 1_000_000 }] }));
    expect(screen.getAllByRole("button", { name: /チワワ/ })).toHaveLength(12);
    expect(screen.getAllByText("1,000,000")).toHaveLength(2);
    expect(screen.getAllByText("部屋 1 / 83,334")).toHaveLength(2);
  });
});

// Browser evidence checks actual animation and the reduced-motion stylesheet.
describe("study room visibility", () => {
  function setup() {
    let intersect: (entries: Partial<IntersectionObserverEntry>[]) => void = () => {};
    const disconnect = vi.fn();
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: typeof intersect) { intersect = callback; }
      observe() {}
      disconnect = disconnect;
    });
    const view = render(<TotalAnswerCounter suggestions={suggestions} />);
    const scene = view.container.querySelector(".study-room-scene")!;
    const visibility = (visible: boolean) => act(() => intersect([{ isIntersecting: visible, intersectionRatio: visible ? 1 : 0 }]));
    return { ...view, scene, visibility, disconnect };
  }
  it("rests offscreen through data changes and resumes when visible", () => {
    const { scene, visibility } = setup();
    expect(scene).toHaveAttribute("data-motion-visible", "false");
    visibility(true);
    expect(scene).toHaveAttribute("data-motion-visible", "true");
    visibility(false);
    emit(measured({ count: 13, exams: [{ exam: "fe", count: 13 }] }));
    act(() => screen.getByRole("button", { name: "次の部屋" }).click());
    expect(scene).toHaveAttribute("data-motion-visible", "false");
    visibility(true);
    act(() => screen.getByRole("button", { name: /チワワ/ }).click());
    expect(scene).toHaveAttribute("data-motion-visible", "true");
  });
  it("rests while the document is hidden and removes observation on unmount", () => {
    const { scene, visibility, unmount, disconnect } = setup();
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    visibility(true);
    expect(scene).toHaveAttribute("data-motion-visible", "false");
    hidden.mockReturnValue(false);
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(scene).toHaveAttribute("data-motion-visible", "true");
    hidden.mockReturnValue(true);
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(scene).toHaveAttribute("data-motion-visible", "false");
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
