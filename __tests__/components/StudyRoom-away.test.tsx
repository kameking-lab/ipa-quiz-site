import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { measuredPresence } from "@/lib/study-presence-contract";

vi.mock("@/components/home/StudyRewardCorner", () => ({ StudyRewardCorner: () => null }));
vi.mock("@/lib/home/study-room-mascots.generated.json", async importOriginal => ({ default: {
  ...(await importOriginal<{ default: object }>()).default,
  away: { exams: { ip: { src: "/away.webp", label: "ボール遊び" } }, fields: {}, examFields: {} }, vacant: "/vacant.webp",
} }));
afterEach(() => { cleanup(); sessionStorage.clear(); });

it("leaves an open-book desk, keeps one dog on a separate floor and preserves its selection and visit", () => {
  sessionStorage.setItem("study-room-mascot-visit:v1", "2"); // away slot 0
  const snapshot = measuredPresence({ count: 12, exams: [{ exam: "ip", count: 12 }] }, Date.now());
  const { container, rerender } = render(<StudyRoom snapshot={snapshot} suggestions={[]} />);
  const away = container.querySelector(".study-room-away")!;
  expect(container.querySelectorAll(".study-room-away")).toHaveLength(1);
  expect(away.closest(".study-room-seat")).toBeNull();
  expect(screen.getByRole("img", { name: "ITパスポートのチワワ（席を立って遊んでいる：ボール遊び）" })).toHaveAttribute("src", "/away.webp");
  expect(screen.getByRole("img", { name: "ITパスポートの空席（椅子と机、開いたままの本）" })).toHaveAttribute("src", "/vacant.webp");
  expect(container.querySelectorAll(".study-room-scene .study-mascot")).toHaveLength(12);
  fireEvent.click(screen.getByRole("group", { name: "自習室の席を選ぶ" }).querySelectorAll("button")[0]);
  expect(away).toHaveAttribute("data-selected", "true");
  const initial = away.innerHTML;
  rerender(<StudyRoom snapshot={{ ...snapshot }} suggestions={[]} />);
  expect(container.querySelector(".study-room-away")!.innerHTML).toEqual(initial);
  rerender(<StudyRoom snapshot={measuredPresence({ count: 0, exams: [] }, Date.now())} suggestions={[]} />);
  expect(container.querySelectorAll(".study-room-scene img")).toHaveLength(0);
});
