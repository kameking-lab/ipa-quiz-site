import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { MeClient } from "@/components/me/MeClient";

const state = vi.hoisted(() => ({ safetyAnswers: 0 }));
vi.mock("@/components/me/MePetRoom", () => ({ MePetRoom: () => null }));
vi.mock("@/components/me/WeaknessReport", () => ({ WeaknessReport: () => null }));
vi.mock("@/components/account/AccountNavigation", () => ({ AccountNavigationLink: () => null }));
vi.mock("@/lib/exam-library-session", () => ({ listExamLearningSummaries: () => [{ answered: state.safetyAnswers }] }));

afterEach(() => { cleanup(); localStorage.clear(); });

it.each([0, 1])("keeps one monthly plan entry and shows safety progress when there is history (%i)", (answers) => {
  state.safetyAnswers = answers;
  render(<MeClient />);
  const menu = within(screen.getByRole("navigation", { name: "わたしのメニュー" }));
  expect(menu.getByRole("link", { name: "料金・月額プラン" })).toHaveAttribute("href", "/billing");
  const progress = screen.queryByRole("link", { name: "安全衛生の進捗・復習" });
  if (answers) expect(progress).toHaveAttribute("href", "/e-learning/progress");
  else expect(progress).toBeNull();
});
