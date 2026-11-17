import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import type { Question } from "@/lib/questions/types";
import { useQuestionActivity } from "@/lib/study-plan/use-question-activity";
import { getLearningActions } from "@/lib/study-plan/pace-storage";
import { dailyLearningPoints } from "@/lib/study-plan/activity";
import { LS_KEYS } from "@/lib/storage/keys";

const question = { id: "ap-2026-test", exam: "ap", type: "multiple-choice" } as Question;
function Harness() {
  const [revealed, reveal] = useState(false);
  const { recordAnswer, recordExplanation, endRef } = useQuestionActivity(question, revealed);
  return <><button onClick={() => { recordAnswer(true); reveal(true); }}>解答</button>
    {revealed && <span ref={endRef} />}
    <button onClick={recordExplanation}>次へ</button></>;
}
let now: number;
let observerCallback: IntersectionObserverCallback;
beforeEach(() => {
  localStorage.clear(); now = 0;
  vi.spyOn(performance, "now").mockImplementation(() => now);
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { observerCallback = callback; }
    observe() {} disconnect() {}
  });
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
describe("existing quiz instrumentation", () => {
  it("does not award idle minutes and records an answer exactly once", () => {
    render(<Harness />); now = 3_600_000;
    expect(getLearningActions()).toEqual([]);
    fireEvent.click(screen.getByText("解答")); fireEvent.click(screen.getByText("解答"));
    expect(getLearningActions()).toHaveLength(1);
    expect(dailyLearningPoints(getLearningActions())[0].minutes).toBe(3);
  });
  it("excludes hidden time and sub-five-second answers", () => {
    render(<Harness />); now = 1000;
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
    fireEvent(document, new Event("visibilitychange")); now = 3_600_000;
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    fireEvent(document, new Event("visibilitychange")); now += 3999;
    fireEvent.click(screen.getByText("解答"));
    expect(dailyLearningPoints(getLearningActions())).toEqual([]);
  });
  it("requires reading the visible end plus interaction; observer/idle alone is zero", () => {
    render(<Harness />); now = 6000; fireEvent.click(screen.getByText("解答"));
    act(() => observerCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    now += 60000;
    expect(getLearningActions()).toHaveLength(1);
    fireEvent.click(screen.getByText("次へ")); fireEvent.scroll(window);
    expect(dailyLearningPoints(getLearningActions())[0].minutes).toBe(4);
  });
  it("respects the existing record-history preference", () => {
    localStorage.setItem(LS_KEYS.settings, JSON.stringify({ recordHistory: false }));
    render(<Harness />); now = 10000; fireEvent.click(screen.getByText("解答"));
    expect(getLearningActions()).toEqual([]);
  });
});
