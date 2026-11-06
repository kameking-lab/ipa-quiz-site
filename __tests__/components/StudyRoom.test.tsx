import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { measuredPresence } from "@/lib/study-presence-contract";
vi.mock("@/components/home/StudyRewardCorner", () => ({ StudyRewardCorner: () => null }));
const snapshot = (count: number) => measuredPresence({ count, exams: count ? [{ exam: "fe", count }] : [] }, Date.now());
afterEach(() => { cleanup(); vi.useRealTimers(); });
it("expands one room, delays shrinking and resets on unavailable snapshot", () => {
  vi.useFakeTimers();
  const { container, rerender } = render(<StudyRoom snapshot={snapshot(1)} suggestions={[]} />);
  const scene = () => container.querySelector(".study-room-scene")!;
  expect(scene()).toHaveAttribute("data-stage", "0");
  rerender(<StudyRoom snapshot={snapshot(100)} suggestions={[]} />);
  expect(scene()).toHaveAttribute("data-stage", "4");
  expect(container.querySelectorAll(".study-room-seat")).toHaveLength(12);
  expect(screen.getByText(/ほか 88人/)).toBeInTheDocument();
  rerender(<StudyRoom snapshot={snapshot(1)} suggestions={[]} />);
  expect(scene()).toHaveAttribute("data-stage", "4");
  act(() => vi.advanceTimersByTime(60_000));
  expect(scene()).toHaveAttribute("data-stage", "0");
  rerender(<StudyRoom snapshot={snapshot(100)} suggestions={[]} />);
  expect(scene()).toHaveAttribute("data-stage", "4");
  rerender(<StudyRoom snapshot={null} suggestions={[]} />);
  expect(scene()).toHaveAttribute("data-stage", "0");
});
it("returns focus to the scroll region when a selected focused seat disappears", () => {
  const { container, rerender } = render(<StudyRoom snapshot={snapshot(1)} suggestions={[]} />);
  const seat = container.querySelector<HTMLButtonElement>('[aria-label="自習室の席を選ぶ"] button')!;
  seat.focus(); fireEvent.click(seat);
  rerender(<StudyRoom snapshot={snapshot(0)} suggestions={[]} />);
  expect(container.querySelector(".study-room-scroll")).toHaveFocus();
});

it("keeps the shrink deadline across fresh snapshots and cancels it on growth", () => {
  vi.useFakeTimers();
  const { container, rerender } = render(<StudyRoom snapshot={snapshot(100)} suggestions={[]} />);
  const scene = () => container.querySelector(".study-room-scene")!;
  rerender(<StudyRoom snapshot={snapshot(1)} suggestions={[]} />);
  act(() => vi.advanceTimersByTime(30_000));
  rerender(<StudyRoom snapshot={snapshot(2)} suggestions={[]} />);
  act(() => vi.advanceTimersByTime(29_999));
  expect(scene()).toHaveAttribute("data-stage", "4");
  act(() => vi.advanceTimersByTime(1));
  expect(scene()).toHaveAttribute("data-stage", "0");
  rerender(<StudyRoom snapshot={snapshot(100)} suggestions={[]} />);
  rerender(<StudyRoom snapshot={snapshot(1)} suggestions={[]} />);
  act(() => vi.advanceTimersByTime(30_000));
  rerender(<StudyRoom snapshot={snapshot(100)} suggestions={[]} />);
  act(() => vi.advanceTimersByTime(60_000));
  expect(scene()).toHaveAttribute("data-stage", "4");
});
it("restores focus when an unselected focused seat disappears", () => {
  const { container, rerender } = render(<StudyRoom snapshot={snapshot(1)} suggestions={[]} />);
  container.querySelector<HTMLButtonElement>('[aria-label="自習室の席を選ぶ"] button')!.focus();
  rerender(<StudyRoom snapshot={snapshot(0)} suggestions={[]} />);
  expect(container.querySelector(".study-room-scroll")).toHaveFocus();
});

it("selects the intended qualification from the non-overlapping seat list and restores focus", () => {
  const mixed = measuredPresence({ count: 2, exams: [{ exam: "fe", count: 1 }, { exam: "ip", count: 1 }] }, Date.now());
  const { container } = render(<StudyRoom snapshot={mixed} suggestions={[{ name: "基本情報技術者", href: "/fe" }, { name: "ITパスポート", href: "/ip" }]} />);
  const seats = screen.getByRole("group", { name: "自習室の席を選ぶ" }).querySelectorAll("button");
  expect(container.querySelectorAll(".study-room-scene button")).toHaveLength(0);
  fireEvent.click(seats[1]);
  expect(seats[1]).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("link", { name: "ITパスポートの問題を見る" })).toHaveAttribute("href", "/ip");
  fireEvent.click(screen.getByRole("button", { name: "選択を戻す" }));
  expect(seats[1]).toHaveFocus();
  expect(seats[1]).toHaveAttribute("aria-pressed", "false");
});

it("loads only occupied seat images with accessible qualification/state and keeps the visit on remount", () => {
  sessionStorage.setItem("study-room-mascot-visit:v1", "0"); // room without an away dog
  const mixed = measuredPresence({ count: 12, exams: [{ exam: "ip", count: 6 }, { exam: "yakuzaishi", count: 6 }] }, Date.now());
  const { container, rerender, unmount } = render(<StudyRoom snapshot={mixed} suggestions={[]} />);
  const images = () => [...container.querySelectorAll<HTMLImageElement>(".study-room-seat img")];
  expect(images()).toHaveLength(12);
  const initial = images().map(img => img.outerHTML);
  images().forEach((img, index) => {
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("decoding", "async");
    expect(img.src).toContain(index < 6 ? "/ip-" : "/pharmacy-");
    expect(img.alt).toMatch(index < 6 ? /^ITパスポートのチワワ（(勉強中|あるある：)/ : /^薬剤師のチワワ（(勉強中|あるある：)/);
    expect(img.closest('[aria-hidden="true"]')).toBeNull();
  });
  fireEvent.click(screen.getByRole("group", { name: "自習室の席を選ぶ" }).querySelectorAll("button")[2]);
  rerender(<StudyRoom snapshot={{ ...mixed }} suggestions={[]} />);
  expect(images().map(img => img.outerHTML)).toEqual(initial);
  expect(container.querySelectorAll('[data-mascot-state="break"]').length).toBeLessThanOrEqual(3);
  unmount();
  const remounted = render(<StudyRoom snapshot={mixed} suggestions={[]} />);
  expect([...remounted.container.querySelectorAll(".study-room-seat img")].map(img => img.outerHTML)).toEqual(initial);
  remounted.rerender(<StudyRoom snapshot={snapshot(0)} suggestions={[]} />);
  expect(remounted.container.querySelectorAll(".study-room-seat img")).toHaveLength(0);
});
