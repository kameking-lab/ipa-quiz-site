import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { measuredPresence } from "@/lib/study-presence-contract";

afterEach(() => { cleanup(); vi.useRealTimers(); });

it.each([0, 3, 12, 25, 45, 60, 120, 130])("renders up to 12 occupants for %i learners without changing the room", count => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-22T10:00:00+09:00"));
  const snapshot = measuredPresence({ count, exams: count ? [{ exam: "fe", count }] : [] }, Date.now());
  render(<StudyRoom snapshot={snapshot} suggestions={[]} current />);
  const scene = screen.getByTestId("study-room-scene");
  expect(scene).toHaveAttribute("data-room", "p2");
  expect(screen.queryAllByTestId("study-room-seat")).toHaveLength(Math.min(12, count));
  expect(scene).toHaveAttribute("aria-label", "本棚のブックカフェ");
  expect(screen.queryByText("本棚のブックカフェ")).not.toBeInTheDocument();
  if (count > 0) expect(screen.getByTestId("study-room-total")).toHaveTextContent(`いま${count}人`);
  else expect(screen.getByTestId("study-room-sleeper")).toHaveTextContent("");
  if (count > 12) expect(screen.getByText(`＋${count - 12}人`)).toBeInTheDocument();
  else expect(screen.queryByText(/^＋/)).not.toBeInTheDocument();
});
