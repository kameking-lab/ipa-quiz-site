import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { measuredPresence } from "@/lib/study-presence-contract";
import { STUDY_ROOM_SCENES, studyRoomScene } from "@/lib/home/study-room-scenes";

afterEach(() => { cleanup(); sessionStorage.clear(); localStorage.clear(); });

it.each([[0, 0], [3, 0], [5, 0], [6, 1], [12, 1], [13, 2], [24, 2], [25, 3], [48, 3], [60, 4], [130, 5]])(
  "%i learners draw exactly their chihuahuas at stage %i (including expanded halls)", (count, stage) => {
    const snapshot = measuredPresence({ count, exams: count ? [{ exam: "fe", count }] : [] }, Date.now());
    const { container } = render(<StudyRoom snapshot={snapshot} suggestions={[]} current />);
    const scene = screen.getByTestId("study-room-scene");
    expect(scene).toHaveAttribute("data-stage", String(stage));
    expect(screen.queryAllByTestId("study-room-seat")).toHaveLength(count);
    expect(container.querySelectorAll(".study-mascot")).toHaveLength(count);
    expect(screen.getByTestId("study-room-total")).toHaveTextContent(`いま${count}人`);
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
    expect(screen.getByText(studyRoomScene(stage).name)).toBeInTheDocument();
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

it("samples bounded floor coordinates with depth-scaled sizes instead of rows", () => {
  expect(STUDY_ROOM_SCENES.map(scene => scene.seats.length)).toEqual([5, 12, 24, 48, 120]);
  let previous = Infinity;
  for (const scene of STUDY_ROOM_SCENES) {
    const largest = Math.max(...scene.seats.map(point => point.width / scene.width));
    expect(largest).toBeLessThan(previous); previous = largest;
    expect(new Set(scene.seats.map(point => `${point.x},${point.y}`)).size).toBe(scene.seats.length);
    for (const seat of scene.seats) {
      expect(seat.x - seat.width / 2).toBeGreaterThanOrEqual(0);
      expect(seat.x + seat.width / 2).toBeLessThanOrEqual(scene.width);
      expect(seat.y - seat.width / 2).toBeGreaterThanOrEqual(0);
      expect(seat.floorY).toBeLessThanOrEqual(scene.height);
      expect(seat.y + seat.width / 2).toBeCloseTo(seat.floorY);
    }
    expect(new Set(scene.seats.map(seat => seat.floorY)).size).toBe(scene.seats.length);
    const byDepth = [...scene.seats].sort((a, b) => a.floorY - b.floorY);
    for (let i = 1; i < byDepth.length; i++) expect(byDepth[i].width).toBeGreaterThan(byDepth[i - 1].width);
    expect(scene.background).toBe("/images/home/study-room-white.webp");
    const smallest = Math.min(...scene.seats.map(point => point.width));
    // Full-room overview, including 120 learners, fits the phone without scrolling.
    // A seat tap exposes a full-size portrait below the frame.
    expect(smallest * 358 / scene.width).toBeGreaterThanOrEqual(22);
  }
});
