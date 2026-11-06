import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { LearningPetCorner } from "@/components/pet/LearningPetCorner";
import type { PetCommittedDetail } from "@/components/pet/usePetProfileView";
import { emptyPetProfiles, newPetProfile, petProfileStorageKey } from "@/lib/pet/v1/profile";
import { LS_KEYS } from "@/lib/storage/keys";
let notify: (event: PetCommittedDetail) => void;
const document = emptyPetProfiles("guest", "Asia/Tokyo"); document.profiles.push(newPetProfile("guest", "ap"));
document.profiles.push(newPetProfile("guest", "yakuzaishi"));
vi.mock("@/components/pet/usePetProfileView", () => ({ usePetProfileView: (listener: typeof notify) => {
  notify = listener; return { status: "ready", document };
} }));
beforeEach(() => {
  localStorage.clear(); vi.useFakeTimers();
  vi.stubGlobal("IntersectionObserver", class { constructor(private callback: (entries: { isIntersecting: boolean }[]) => void) {} observe() { this.callback([{ isIntersecting: true }]); } disconnect() {} });
  localStorage.setItem(petProfileStorageKey("guest"), "unchanged-profile");
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
function fresh(patch: Partial<PetCommittedDetail> = {}): PetCommittedDetail {
  return { ownerScope: "guest", qualificationId: "ap", questionId: "ap-q1", eventId: "one", occurredAt: Date.now(), result: {
    outcome: "applied", document, reward: { growth: 3, bond: 1 }, reaction: "correct", comboMilestone: null, overcame: false,
  }, ...patch };
}
it("mount/reload stays still; fresh same-question/qualification commits react for at most 800ms", () => {
  const view = render(<LearningPetCorner qualificationId="ap" questionId="ap-q1" />);
  const panel = () => view.container.querySelector("section")!;
  expect(panel()).toHaveAttribute("data-pet-pose", "study");
  act(() => notify(fresh({ qualificationId: "ip" }))); expect(panel()).toHaveAttribute("data-pet-pose", "study");
  act(() => notify(fresh())); expect(panel()).toHaveAttribute("data-pet-pose", "correct");
  act(() => vi.advanceTimersByTime(800)); expect(panel()).toHaveAttribute("data-pet-pose", "study");
  expect(localStorage.getItem(petProfileStorageKey("guest"))).toBe("unchanged-profile");
});
it("manual rest is finite, close/reopen and question switches never replay, and none grants growth", () => {
  const view = render(<LearningPetCorner qualificationId="ap" questionId="ap-q1" />);
  fireEvent.click(screen.getByRole("button", { name: "ひと休み" }));
  expect(view.container.querySelector("section")).toHaveAttribute("data-pet-pose", "rest");
  act(() => vi.advanceTimersByTime(6000)); expect(view.container.querySelector("section")).toHaveAttribute("data-pet-pose", "study");
  act(() => notify(fresh()));
  fireEvent.click(screen.getByRole("button", { name: "チワワのひと休みを閉じる" }));
  act(() => notify(fresh()));
  fireEvent.click(screen.getByRole("button", { name: "チワワのひと休みを開く" }));
  expect(view.container.querySelector("section")).toHaveAttribute("data-pet-pose", "study");
  view.rerender(<LearningPetCorner qualificationId="ap" questionId="ap-q2" />);
  act(() => notify(fresh())); expect(view.container.querySelector("section")).toHaveAttribute("data-pet-pose", "study");
  expect(localStorage.getItem(petProfileStorageKey("guest"))).toBe("unchanged-profile");
});
it("reduced motion keeps finite reactions static", () => {
  vi.stubGlobal("matchMedia", () => ({ matches: true, addEventListener() {}, removeEventListener() {} }));
  const view = render(<LearningPetCorner qualificationId="ap" questionId="ap-q1" />);
  act(() => notify(fresh())); expect(view.container.querySelector("section")).toHaveAttribute("data-moving", "false");
});
it("resolves pharmacy to the same saved yakuzaishi individual before matching reactions", () => {
  const view = render(<LearningPetCorner qualificationId="pharmacy" questionId="pharmacy-q1" />);
  expect(view.container.querySelector("section")).toHaveAttribute("data-pet-id", document.profiles[1].petId);
  act(() => notify(fresh({ qualificationId: "yakuzaishi", questionId: "pharmacy-q1" })));
  expect(view.container.querySelector("section")).toHaveAttribute("data-pet-pose", "correct");
});
it("keeps keyboard focus on the replacement control when closing and reopening", () => {
  render(<LearningPetCorner qualificationId="ap" questionId="ap-q1" />);
  const close = screen.getByRole("button", { name: "チワワのひと休みを閉じる" });
  close.focus(); fireEvent.click(close);
  const reopen = screen.getByRole("button", { name: "チワワのひと休みを開く" });
  expect(reopen).toHaveFocus();
  fireEvent.click(reopen);
  expect(screen.getByRole("button", { name: "チワワのひと休みを閉じる" })).toHaveFocus();
  expect(localStorage.getItem(petProfileStorageKey("guest"))).toBe("unchanged-profile");
});
it("restores a saved closed preference without taking focus from learning", () => {
  localStorage.setItem(LS_KEYS.studyRewardPreferences, JSON.stringify({ closed: true, paused: false }));
  const view = render(<><button type="button">学習操作</button></>);
  const learning = screen.getByRole("button", { name: "学習操作" }); learning.focus();
  view.rerender(<><button type="button">学習操作</button><LearningPetCorner qualificationId="ap" questionId="ap-q1" /></>);
  expect(screen.getByRole("button", { name: "チワワのひと休みを開く" })).toBeInTheDocument();
  expect(learning).toHaveFocus();
  expect(localStorage.getItem(petProfileStorageKey("guest"))).toBe("unchanged-profile");
});
