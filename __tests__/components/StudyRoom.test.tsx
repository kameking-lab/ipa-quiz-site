import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { measuredPresence } from "@/lib/study-presence-contract";

const snapshot = (count: number) => measuredPresence({ count, exams: count ? [{ exam: "fe", count }] : [] }, Date.now());
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); sessionStorage.clear(); localStorage.clear(); });

it("keeps one decorative resting dog when zero people are measured or the count is unavailable", () => {
  const { rerender } = render(<StudyRoom snapshot={snapshot(60)} current suggestions={[]} />);
  const scene = screen.getByTestId("study-room-scene");
  expect(screen.queryByTestId("study-room-sleeper")).not.toBeInTheDocument();

  rerender(<StudyRoom snapshot={snapshot(0)} current suggestions={[]} />);
  expect(screen.getByText("まだ誰もいません。一番乗りしよう")).toBeInTheDocument();
  expect(screen.queryByTestId("study-room-total")).not.toBeInTheDocument();
  expect(scene.querySelectorAll('img[src$="/sleep-empty.webp"][alt=""]')).toHaveLength(1);
  expect(screen.queryAllByTestId("study-room-seat")).toHaveLength(0);

  rerender(<StudyRoom snapshot={snapshot(0)} suggestions={[]} />);
  expect(screen.getByText("前回は勉強中の人はいませんでした")).toBeInTheDocument();

  rerender(<StudyRoom snapshot={null} suggestions={[]} />);
  expect(screen.getByText("勉強中の人数を表示できません")).toBeInTheDocument();
  expect(screen.queryByTestId("study-room-total")).not.toBeInTheDocument();
  expect(scene.querySelectorAll('img[src$="/sleep-empty.webp"][alt=""]')).toHaveLength(1);
});

it("keeps the same room as the learner count changes", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-21T11:00:00+09:00"));
  const { rerender } = render(<StudyRoom snapshot={snapshot(3)} suggestions={[]} />);
  const scene = () => screen.getByTestId("study-room-scene");
  expect(scene()).toHaveAttribute("data-room", "p1");
  rerender(<StudyRoom snapshot={snapshot(60)} suggestions={[]} />);
  expect(scene()).toHaveAttribute("data-room", "p1");
  expect(screen.getAllByTestId("study-room-seat")).toHaveLength(60);
  rerender(<StudyRoom snapshot={snapshot(2)} suggestions={[]} />);
  expect(scene()).toHaveAttribute("data-room", "p1");
  expect(screen.getAllByTestId("study-room-seat")).toHaveLength(2);
  rerender(<StudyRoom snapshot={null} suggestions={[]} />);
  expect(scene()).toHaveAttribute("data-room", "p1");
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

it("chooses a region after selecting a parent in the standalone study room", () => {
  render(<StudyRoom standalone snapshot={snapshot(3)} suggestions={[
    { exam: "chori-hokkaido", name: "調理師試験（北海道）", href: "/chori-hokkaido" },
    { exam: "chori-gunma", name: "調理師試験（群馬県）", href: "/chori-gunma" },
  ]} />);
  fireEvent.click(screen.getByText("資格を選ぶ", { selector: "summary" }));
  fireEvent.change(screen.getByLabelText("資格"), { target: { value: "group:chori" } });
  expect(screen.queryByRole("link", { name: "席について解く" })).toBeNull();
  fireEvent.change(screen.getByLabelText("地域"), { target: { value: "chori-hokkaido" } });
  expect(screen.getByRole("link", { name: "席について解く" })).toHaveAttribute("href", "/quiz?mode=random&exam=chori-hokkaido");
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
  const { container, rerender, unmount } = render(<StudyRoom snapshot={snapshot(120)} suggestions={[]} />);
  const sources = () => screen.getAllByTestId("study-room-seat").map(seat => seat.querySelector("img")?.getAttribute("src"));
  const initial = sources();
  expect(new Set(initial).size).toBeLessThanOrEqual(72);
  container.querySelectorAll("img").forEach(img => { expect(img).toHaveAttribute("loading", "lazy"); expect(img).toHaveAttribute("decoding", "async"); });
  rerender(<StudyRoom snapshot={snapshot(120)} suggestions={[]} />);
  expect(sources()).toEqual(initial);
  unmount();
  render(<StudyRoom snapshot={snapshot(120)} suggestions={[]} />);
  expect(sources()).toEqual(initial);
});

it("returns focus to the room when a focused learner leaves", () => {
  const { rerender } = render(<StudyRoom snapshot={snapshot(3)} suggestions={[]} />);
  screen.getByRole("button", { name: "3 基本情報技術者のチワワを見る" }).focus();
  rerender(<StudyRoom snapshot={snapshot(2)} suggestions={[]} />);
  expect(screen.getByTestId("study-room-scene")).toHaveFocus();
});
