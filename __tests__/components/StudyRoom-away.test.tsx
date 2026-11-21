import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { CAFE_POSE_FILES } from "@/lib/home/study-room-cafe-mascots";
import { measuredPresence } from "@/lib/study-presence-contract";

afterEach(() => { cleanup(); vi.useRealTimers(); });

it("draws one pose per learner, keeps active markers and shows two resting dogs playing together", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-21T12:00:00+09:00"));
  const snapshot = measuredPresence({ count: 3, exams: [{ exam: "civil1", count: 3 }] }, Date.now(), Infinity,
    { count: 12, activeCount: 3, exams: [{ exam: "civil1", count: 12, activeCount: 3 }] });
  render(<StudyRoom snapshot={snapshot} current suggestions={[]} poseFiles={CAFE_POSE_FILES} />);
  const scene = screen.getByTestId("study-room-scene");
  const seats = screen.getAllByTestId("study-room-seat");
  expect(seats).toHaveLength(12);
  expect(scene.querySelectorAll('[data-studying-now="true"]')).toHaveLength(3);
  expect(scene.querySelector('[data-pose="bow"] img')).toHaveAttribute("src", expect.stringContaining("civil1-bow.webp"));
  expect(scene.querySelector('[data-pose="paw"] img')).toHaveAttribute("src", expect.stringContaining("civil1-paw.webp"));
  expect(new Set(seats.map(seat => seat.dataset.pose)).size).toBeGreaterThanOrEqual(8);
  for (const seat of seats) expect(seat.querySelectorAll("img")).toHaveLength(1);
});
