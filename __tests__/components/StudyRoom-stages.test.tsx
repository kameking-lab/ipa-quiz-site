import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { StudyRoom } from "@/components/home/StudyRoom";
import { measuredPresence } from "@/lib/study-presence-contract";
import { presenceExamName } from "@/lib/study-presence";

vi.mock("@/components/home/StudyRewardCorner", () => ({ StudyRewardCorner: () => null }));
afterEach(cleanup);

// These are DOM assertions, not browser geometry or visual overlap checks.
it.each([
  [0, 0], [1, 0], [5, 0], [6, 1], [12, 1], [13, 2],
  [24, 2], [25, 3], [48, 3], [49, 4], [100, 4],
])("renders the measured room for %i learners at stage %i", (count, stage) => {
  const snapshot = measuredPresence({ count, exams: count ? [{ exam: "fe", count }] : [] }, Date.UTC(2026, 9, 30));
  const { container } = render(<StudyRoom snapshot={snapshot} suggestions={[]} />);
  const scene = screen.getByRole("group", { name: "前回取得時点の集計に基づくチワワの自習室" });
  expect(scene).toHaveAttribute("data-stage", String(stage));
  const visible = Math.min(count, 12);
  // Images expose qualification and illustration state; seat controls stay outside the scene.
  expect(within(scene).queryAllByRole("button")).toHaveLength(0);
  const illustrations = scene.querySelectorAll(".study-room-seat");
  expect(illustrations).toHaveLength(visible);
  for (const illustration of illustrations) {
    expect(illustration).not.toHaveAttribute("aria-hidden", "true");
    expect(within(illustration as HTMLElement).getByRole("img")).toHaveAccessibleName(/^基本情報技術者の(?:チワワ（(?:勉強中|あるある：.+)）|空席（椅子と机、開いたままの本）)$/);
  }
  const seatList = screen.queryByRole("group", { name: "自習室の席を選ぶ" });
  const seats = seatList ? within(seatList).getAllByRole("button") : [];
  expect(seats).toHaveLength(visible);
  if (visible === 0) expect(seatList).not.toBeInTheDocument();
  seats.forEach((seat, index) => {
    expect(seat).toHaveAccessibleName(`${index + 1} ${presenceExamName("fe")}`);
    expect(seat).toHaveAttribute("aria-controls", "study-room-selection");
    expect(seat).toHaveAttribute("aria-pressed", "false");
  });
  const foot = container.querySelector(".study-room-foot")!;
  expect(foot).toHaveTextContent(`イラスト ${visible}体`);
  expect(foot).toHaveTextContent(`全${count}人の集計を一部イラストで表示`);
  if (count > visible) expect(foot).toHaveTextContent(`ほか ${count - visible}人`);
  else expect(foot).not.toHaveTextContent("ほか");
  expect(container.querySelector(".study-room-total")).toHaveTextContent(`${count}人`);
  if (count) {
    const counts = screen.getByRole("list", { name: "資格別の学習人数" });
    expect(within(counts).getByRole("listitem")).toHaveTextContent(`${count}人が${presenceExamName("fe")}を学習しました。`);
  } else {
    expect(screen.queryByRole("list", { name: "資格別の学習人数" })).not.toBeInTheDocument();
    expect(screen.getByText("前回取得時点の直近5分の学習人数は0人です。")).toBeInTheDocument();
  }
});
