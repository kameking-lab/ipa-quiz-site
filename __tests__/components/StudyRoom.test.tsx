import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { measuredPresence } from "@/lib/study-presence-contract";

const snapshot = (count: number) => measuredPresence({ count, exams: count ? [{ exam: "fe", count }] : [] }, Date.now());
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); sessionStorage.clear(); localStorage.clear(); });

it("grows immediately, shrinks only after 60 seconds, and cancels shrinking on growth", () => {
  vi.useFakeTimers();
  const { rerender } = render(<StudyRoom snapshot={snapshot(3)} suggestions={[]} />);
  const scene = () => screen.getByTestId("study-room-scene");
  expect(scene()).toHaveAttribute("data-stage", "0");
  rerender(<StudyRoom snapshot={snapshot(60)} suggestions={[]} />);
  expect(scene()).toHaveAttribute("data-stage", "4");
  rerender(<StudyRoom snapshot={snapshot(1)} suggestions={[]} />);
  act(() => vi.advanceTimersByTime(30_000));
  rerender(<StudyRoom snapshot={snapshot(2)} suggestions={[]} />);
  act(() => vi.advanceTimersByTime(29_999));
  expect(scene()).toHaveAttribute("data-stage", "4");
  expect(screen.getAllByTestId("study-room-seat")).toHaveLength(2);
  act(() => vi.advanceTimersByTime(1));
  expect(scene()).toHaveAttribute("data-stage", "0");
  rerender(<StudyRoom snapshot={snapshot(60)} suggestions={[]} />);
  rerender(<StudyRoom snapshot={snapshot(1)} suggestions={[]} />);
  act(() => vi.advanceTimersByTime(30_000));
  rerender(<StudyRoom snapshot={snapshot(60)} suggestions={[]} />);
  act(() => vi.advanceTimersByTime(60_000));
  expect(scene()).toHaveAttribute("data-stage", "4");
  rerender(<StudyRoom snapshot={null} suggestions={[]} />);
  expect(scene()).toHaveAttribute("data-stage", "0");
  expect(screen.queryAllByTestId("study-room-seat")).toHaveLength(0);
});

it("throttles cheers per seat and across seats without adding explanation or extra actions", () => {
  vi.useFakeTimers();
  const onCheer = vi.fn();
  render(<StudyRoom snapshot={snapshot(3)} suggestions={[]} onCheer={onCheer} />);
  const seats = screen.getAllByRole("button", { name: /のチワワを応援$/ });
  fireEvent.click(seats[0]); fireEvent.click(seats[0]); fireEvent.click(seats[1]);
  expect(onCheer).toHaveBeenCalledExactlyOnceWith({ exam: "fe", index: 0 });
  expect(screen.getByLabelText("応援")).toBeInTheDocument();
  act(() => vi.advanceTimersByTime(1200));
  expect(screen.queryByLabelText("応援")).not.toBeInTheDocument();
  fireEvent.click(seats[0]); expect(onCheer).toHaveBeenCalledTimes(1);
  fireEvent.click(seats[1]); expect(onCheer).toHaveBeenCalledTimes(2);
  act(() => vi.advanceTimersByTime(8800));
  fireEvent.click(seats[0]); expect(onCheer).toHaveBeenCalledTimes(3);
  expect(screen.getAllByRole("link")).toHaveLength(1);
  expect(screen.getByRole("link", { name: "席について解く" })).toHaveAttribute("href", "/#choose-qualification");
});

it("restores focus to the room when the currently focused seat disappears", () => {
  const { rerender } = render(<StudyRoom snapshot={snapshot(3)} suggestions={[]} />);
  screen.getAllByRole("button", { name: /のチワワを応援$/ })[2].focus();
  rerender(<StudyRoom snapshot={snapshot(1)} suggestions={[]} />);
  expect(screen.getByTestId("study-room-scene")).toHaveFocus();
});

it("starts a supported quiz directly and resolves library qualification aliases to their existing hub", () => {
  const { rerender } = render(<StudyRoom snapshot={snapshot(3)} suggestions={[{ exam: "fe", name: "基本情報技術者", href: "/fe" }]} exam="fe" />);
  expect(screen.getByRole("link", { name: "席について解く" })).toHaveAttribute("href", "/quiz?mode=random&exam=fe");
  rerender(<StudyRoom snapshot={snapshot(3)} suggestions={[{ exam: "dai-1-shu-eisei-kanrisha", name: "第一種衛生管理者", href: "/qualifications/dai-1-shu-eisei-kanrisha" }]} exam="eisei1" />);
  expect(screen.getByRole("link", { name: "席について解く" })).toHaveAttribute("href", "/quiz?mode=random&exam=eisei1");
  rerender(<StudyRoom snapshot={snapshot(3)} suggestions={[{ exam: "ni-kyu-boiler-gishi", name: "二級ボイラー技士", href: "/e-learning/exams/qualifications/ni-kyu-boiler-gishi" }]} exam="ni-kyu-boiler-gishi" />);
  expect(screen.getByRole("link", { name: "席について解く" })).toHaveAttribute("href", "/e-learning/exams/qualifications/ni-kyu-boiler-gishi");
});

it("puts server-supplied premium seats first and displays only supplied daily answers", () => {
  render(<StudyRoom snapshot={snapshot(3)} suggestions={[]} seatDetails={[{ exam: "fe", index: 2, premium: true, todayAnswers: 17 }]} />);
  const seats = screen.getAllByTestId("study-room-seat");
  expect(seats[0]).toHaveAttribute("data-seat-key", "fe:2");
  expect(seats[0].querySelector("button")).toHaveAttribute("data-premium", "true");
  expect(screen.getByLabelText("特等席")).toBeInTheDocument();
  expect(screen.getByText("今日17問")).toBeInTheDocument();
  expect(screen.queryByText("今日0問")).not.toBeInTheDocument();
});

it("reuses the same qualification images, preserves visit poses, and loads only occupied seats", () => {
  sessionStorage.setItem("study-room-mascot-visit:v1", "0");
  const { container, rerender, unmount } = render(<StudyRoom snapshot={snapshot(120)} suggestions={[]} />);
  const sources = () => [...container.querySelectorAll<HTMLImageElement>(".study-mascot")].map(img => img.getAttribute("src"));
  const initial = sources();
  expect(new Set(initial).size).toBeLessThanOrEqual(2);
  container.querySelectorAll("img").forEach(img => { expect(img).toHaveAttribute("loading", "lazy"); expect(img).toHaveAttribute("decoding", "async"); });
  rerender(<StudyRoom snapshot={snapshot(120)} suggestions={[]} />);
  expect(sources()).toEqual(initial);
  unmount();
  const remount = render(<StudyRoom snapshot={snapshot(120)} suggestions={[]} />);
  expect([...remount.container.querySelectorAll(".study-mascot")].map(img => img.getAttribute("src"))).toEqual(initial);
});

it("observes each seat so a tall hall does not animate offscreen dogs or hidden documents", () => {
  const callbacks: Array<{ callback: IntersectionObserverCallback; elements: Element[]; disconnect: () => void }> = [];
  vi.stubGlobal("IntersectionObserver", class {
    record: typeof callbacks[number];
    constructor(callback: IntersectionObserverCallback) { this.record = { callback, elements: [], disconnect: vi.fn() }; callbacks.push(this.record); }
    observe(element: Element) { this.record.elements.push(element); }
    disconnect() { this.record.disconnect(); }
  });
  const { unmount } = render(<StudyRoom snapshot={snapshot(60)} suggestions={[]} />);
  const observer = callbacks.at(-1)!;
  expect(observer.elements).toHaveLength(61);
  const scene = screen.getByTestId("study-room-scene"), seats = screen.getAllByTestId("study-room-seat");
  const show = (target: Element, isIntersecting: boolean) => ({ target, isIntersecting }) as IntersectionObserverEntry;
  act(() => observer.callback([show(scene, true), show(seats[0], true)], {} as IntersectionObserver));
  expect(seats[0]).toHaveAttribute("data-animate", "true");
  expect(seats[59]).toHaveAttribute("data-animate", "false");
  const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
  act(() => document.dispatchEvent(new Event("visibilitychange")));
  expect(seats[0]).toHaveAttribute("data-animate", "false");
  hidden.mockRestore();
  act(() => document.dispatchEvent(new Event("visibilitychange")));
  expect(seats[0]).toHaveAttribute("data-animate", "true");
  unmount(); expect(observer.disconnect).toHaveBeenCalledOnce();
});
