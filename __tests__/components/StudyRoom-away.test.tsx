import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { measuredPresence } from "@/lib/study-presence-contract";

vi.mock("@/lib/home/study-room-mascots.generated.json", async importOriginal => ({ default: {
  ...(await importOriginal<{ default: object }>()).default,
  away: { exams: { ip: { src: "/away.webp", label: "ボール遊び" } }, fields: {}, examFields: {} }, vacant: "/vacant.webp",
} }));
afterEach(() => { cleanup(); sessionStorage.clear(); });

it.each([1, 5, 12, 24, 48, 120, 130])("seats most of %i learners at desks with tools, counting floor dogs exactly once", count => {
  sessionStorage.setItem("study-room-mascot-visit:v1", "2");
  const snapshot = measuredPresence({ count, exams: [{ exam: "ip", count }] }, Date.now());
  const { container } = render(<StudyRoom snapshot={snapshot} suggestions={[]} />);
  expect(container.querySelectorAll(".study-mascot")).toHaveLength(count);
  const buttons = [...container.querySelectorAll('[data-mascot-state]')];
  const floor = buttons.filter(button => button.getAttribute('data-mascot-state') === 'away');
  const study = buttons.filter(button => button.getAttribute('data-mascot-state') === 'study');
  expect(study.length / count).toBeGreaterThanOrEqual(.78);
  expect(floor.length).toBeLessThanOrEqual(Math.floor(count * .1));
  for (const button of buttons) {
    expect(button.querySelectorAll('.study-mascot')).toHaveLength(1);
    expect(button.querySelectorAll('[data-furniture-art]')).toHaveLength(1);
    expect(button.querySelectorAll('img')).toHaveLength(3);
    expect(button.querySelectorAll('[data-layer="desktop"], [data-layer="forepaws"]')).toHaveLength(0);
    expect(button.querySelectorAll('[data-layer="furniture-back"], [data-layer="character"], [data-layer="furniture-front"]')).toHaveLength(3);
    expect(button.querySelector('img')).toHaveAttribute('src', button.getAttribute('data-mascot-state') === 'away' ? '/away.webp' : expect.stringContaining('/study-room-mascots/'));
  }
  // Furniture and character reuse the same qualification's matching coordinates.
  expect(container.querySelectorAll('img[src="/vacant.webp"]')).toHaveLength(0);
  expect(screen.getByTestId("study-room-scene")).toHaveAttribute("data-art-status", "ready");
});
