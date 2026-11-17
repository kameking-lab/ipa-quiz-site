import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { measuredPresence } from "@/lib/study-presence-contract";
import { STUDY_ROOM_SCENES } from "@/lib/home/study-room-scenes";

afterEach(() => { cleanup(); sessionStorage.clear(); localStorage.clear(); });

it.each([[0, 0], [3, 0], [5, 0], [6, 1], [12, 1], [13, 2], [24, 2], [25, 3], [48, 3], [60, 4], [130, 4]])(
  "%i learners draw exactly their chihuahuas at stage %i (up to 120)", (count, stage) => {
    const snapshot = measuredPresence({ count, exams: count ? [{ exam: "fe", count }] : [] }, Date.now());
    const { container } = render(<StudyRoom snapshot={snapshot} suggestions={[]} current />);
    const scene = screen.getByTestId("study-room-scene");
    expect(scene).toHaveAttribute("data-stage", String(stage));
    expect(screen.queryAllByTestId("study-room-seat")).toHaveLength(Math.min(count, 120));
    expect(container.querySelectorAll(".study-mascot")).toHaveLength(Math.min(count, 120));
    expect(screen.getByTestId("study-room-total")).toHaveTextContent(`いま${count}人`);
    if (count > 120) expect(screen.getByLabelText("ほか10人が勉強中")).toHaveTextContent("+10");
    else expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
    expect(screen.getByText(STUDY_ROOM_SCENES[stage].name)).toBeInTheDocument();
  },
);

it("filters the same qualification before counting, allocating seats, and choosing the room", () => {
  const snapshot = measuredPresence({ count: 25, exams: [{ exam: "ip", count: 22 }, { exam: "fe", count: 3 }] }, Date.now());
  const { container } = render(<StudyRoom snapshot={snapshot} suggestions={[]} exam="fe" current />);
  fireEvent.click(screen.getByRole("button", { name: "同じ資格" }));
  expect(screen.getByTestId("study-room-total")).toHaveTextContent("いま3人");
  expect(screen.getAllByTestId("study-room-seat")).toHaveLength(3);
  expect(container.querySelectorAll(".study-mascot")).toHaveLength(3);
  // Shrinking keeps the previous room for sixty seconds, but never keeps extra dogs.
  expect(screen.getByTestId("study-room-scene")).toHaveAttribute("data-stage", "3");
  fireEvent.click(screen.getByRole("button", { name: "みんな" }));
  expect(screen.getAllByTestId("study-room-seat")).toHaveLength(25);
});

it("has one bounded coordinate for every seat, decreasing sizes, and no substitute background", () => {
  expect(STUDY_ROOM_SCENES.map(scene => scene.seats.length)).toEqual([5, 12, 24, 48, 120]);
  let previous = Infinity;
  for (const scene of STUDY_ROOM_SCENES) {
    expect(scene.seats[0].width).toBeLessThan(previous); previous = scene.seats[0].width;
    expect(new Set(scene.seats.map(point => `${point.x},${point.y}`)).size).toBe(scene.seats.length);
    for (const seat of scene.seats) {
      expect(seat.x - seat.width / 2).toBeGreaterThanOrEqual(0);
      expect(seat.x + seat.width / 2).toBeLessThanOrEqual(scene.width);
      expect(seat.y - seat.width * 1.15 / 2).toBeGreaterThanOrEqual(0);
      expect(seat.y + seat.width * 1.15 / 2).toBeLessThanOrEqual(scene.height);
    }
    expect(scene.background).toBeNull(); // ar-2 approved artwork has not arrived.
  }
});
