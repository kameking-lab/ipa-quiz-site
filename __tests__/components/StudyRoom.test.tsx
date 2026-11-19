import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { measuredPresence } from "@/lib/study-presence-contract";

const snapshot = (count: number) => measuredPresence({ count, exams: count ? [{ exam: "fe", count }] : [] }, Date.now());
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); sessionStorage.clear(); localStorage.clear(); });

it("keeps one decorative resting dog in the small room when zero people are measured or the count is unavailable", () => {
  const { rerender } = render(<StudyRoom snapshot={snapshot(60)} current suggestions={[]} />);
  const scene = screen.getByTestId("study-room-scene");
  expect(scene.querySelector('img[src$="/curl-left.png"]')).toBeNull();

  rerender(<StudyRoom snapshot={snapshot(0)} current suggestions={[]} />);
  expect(scene).toHaveAttribute("data-stage", "0");
  expect(screen.getByText("いま勉強中の人はいません")).toBeInTheDocument();
  expect(screen.getByTestId("study-room-total")).toHaveTextContent("いま0人");
  expect(scene.querySelectorAll('img[src$="/curl-left.png"][alt=""]')).toHaveLength(1);
  expect(screen.queryAllByTestId("study-room-seat")).toHaveLength(0);

  rerender(<StudyRoom snapshot={snapshot(0)} suggestions={[]} />);
  expect(screen.getByText("前回は勉強中の人はいませんでした")).toBeInTheDocument();

  rerender(<StudyRoom snapshot={null} suggestions={[]} />);
  expect(screen.getByText("勉強中の人数を表示できません")).toBeInTheDocument();
  expect(screen.queryByTestId("study-room-total")).not.toBeInTheDocument();
  expect(scene.querySelectorAll('img[src$="/curl-left.png"][alt=""]')).toHaveLength(1);
});

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

it("uses the seat artwork itself for inspection and keeps one study link", () => {
  render(<StudyRoom snapshot={snapshot(3)} suggestions={[]} />);
  expect(screen.getAllByTestId("study-room-seat")).toHaveLength(3);
  expect(screen.getAllByRole("button", { name: /チワワを見る/ })).toHaveLength(3);
  expect(screen.getAllByRole("link")).toHaveLength(1);
  expect(screen.getByRole("link", { name: "席について解く" })).toHaveAttribute("href", "/search");
});

it("starts a supported quiz directly and resolves library qualification aliases to their existing hub", () => {
  const { rerender } = render(<StudyRoom snapshot={snapshot(3)} suggestions={[{ exam: "fe", name: "基本情報技術者", href: "/fe" }]} exam="fe" />);
  expect(screen.getByRole("link", { name: "席について解く" })).toHaveAttribute("href", "/quiz?mode=random&exam=fe");
  rerender(<StudyRoom snapshot={snapshot(3)} suggestions={[{ exam: "dai-1-shu-eisei-kanrisha", name: "第一種衛生管理者", href: "/qualifications/dai-1-shu-eisei-kanrisha" }]} exam="eisei1" />);
  expect(screen.getByRole("link", { name: "席について解く" })).toHaveAttribute("href", "/quiz?mode=random&exam=eisei1");
  rerender(<StudyRoom snapshot={snapshot(3)} suggestions={[{ exam: "ni-kyu-boiler-gishi", name: "二級ボイラー技士", href: "/e-learning/exams/qualifications/ni-kyu-boiler-gishi" }]} exam="ni-kyu-boiler-gishi" />);
  expect(screen.getByRole("link", { name: "席について解く" })).toHaveAttribute("href", "/e-learning/exams/qualifications/ni-kyu-boiler-gishi");
});

it("preserves the position and visual label of a premium seat", () => {
  render(<StudyRoom snapshot={snapshot(3)} suggestions={[]} seatDetails={[{ exam: "fe", index: 2, premium: true }]} />);
  const seats = screen.getAllByTestId("study-room-seat");
  expect(seats[0]).toHaveAttribute("data-seat-key", "fe:0");
  expect(seats[2].querySelector('[data-premium="true"]')).not.toBeNull();
  expect(screen.getByLabelText("特等席")).toBeInTheDocument();
});

it("opens and closes the selected qualification artwork from the seat itself", () => {
  render(<StudyRoom snapshot={snapshot(60)} suggestions={[]} />);
  const seat = screen.getByRole("button", { name: "1 基本情報技術者のチワワを見る" });
  const art = within(seat).getByRole("img", { name: /基本情報技術者のチワワ/ });
  fireEvent.click(seat);
  const inspection = screen.getByTestId("study-room-inspected");
  expect(seat).toHaveAttribute("aria-pressed", "true");
  expect(inspection).toHaveTextContent("基本情報技術者");
  expect(inspection.querySelector("img")).toHaveAttribute("src", art.getAttribute("src"));
  fireEvent.click(seat);
  expect(seat).toHaveAttribute("aria-pressed", "false");
  expect(screen.queryByTestId("study-room-inspected")).toBeNull();
});

it("reuses shared pose images, preserves identity poses, and loads only occupied seats", () => {
  sessionStorage.setItem("study-room-mascot-visit:v1", "0");
  const { container, rerender, unmount } = render(<StudyRoom snapshot={snapshot(120)} suggestions={[]} />);
  const sources = () => [...container.querySelectorAll<HTMLImageElement>(".study-mascot img")].map(img => img.getAttribute("src"));
  const initial = sources();
  expect(new Set(initial).size).toBeLessThanOrEqual(72);
  container.querySelectorAll("img").forEach(img => { expect(img).toHaveAttribute("loading", "lazy"); expect(img).toHaveAttribute("decoding", "async"); });
  rerender(<StudyRoom snapshot={snapshot(120)} suggestions={[]} />);
  expect(sources()).toEqual(initial);
  unmount();
  const remount = render(<StudyRoom snapshot={snapshot(120)} suggestions={[]} />);
  expect([...remount.container.querySelectorAll(".study-mascot img")].map(img => img.getAttribute("src"))).toEqual(initial);
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
