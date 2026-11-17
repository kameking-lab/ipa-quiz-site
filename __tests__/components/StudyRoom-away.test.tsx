import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { measuredPresence } from "@/lib/study-presence-contract";

vi.mock("@/lib/home/study-room-mascots.generated.json", async importOriginal => ({ default: {
  ...(await importOriginal<{ default: object }>()).default,
  away: { exams: { ip: { src: "/away.webp", label: "ボール遊び" } }, fields: {}, examFields: {} }, vacant: "/vacant.webp",
} }));
afterEach(() => { cleanup(); sessionStorage.clear(); });

it.each([25, 60, 130])("counts scattered resting and playing chihuahuas among %i learners, never an additional dog", count => {
  sessionStorage.setItem("study-room-mascot-visit:v1", "2");
  const snapshot = measuredPresence({ count, exams: [{ exam: "ip", count }] }, Date.now());
  const { container } = render(<StudyRoom snapshot={snapshot} suggestions={[]} />);
  expect(container.querySelectorAll(".study-mascot")).toHaveLength(Math.min(count, 120));
  expect(screen.getAllByRole("img", { name: /遊ぶ|歩く/ }).length).toBeGreaterThan(1);
  // The room artwork supplies the vacant desk; never draw a second desk over it.
  expect(container.querySelectorAll('img[src="/vacant.webp"]')).toHaveLength(0);
  expect(screen.getByTestId("study-room-scene")).toHaveAttribute("data-art-status", "ready");
});
