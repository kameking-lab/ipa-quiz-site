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
vi.mock("next/dynamic", () => ({ default: () => function Sheet({ initialAppearanceOpen, onClose }: { initialAppearanceOpen: boolean; onClose(): void }) {
  return <div data-testid="care-sheet" data-appearance-open={initialAppearanceOpen}><button onClick={onClose}>シートを閉じる</button></div>;
} }));
beforeEach(() => {
  localStorage.clear(); vi.useFakeTimers();
  document.profiles[0].memories = []; document.profiles[0].unlockedStages = ["puppy"]; document.profiles[0].unlockedPaths = [];
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
it("consumes a fresh stage CTA on opening and never promotes a chosen puppy again", () => {
  const view = render(<LearningPetCorner qualificationId="ap" questionId="ap-q1" />);
  document.profiles[0].unlockedStages.push("partner");
  document.profiles[0].unlockedPaths.push("exploration");
  document.profiles[0].memories.push({ kind: "stage", stage: "partner", occurredAt: Date.now() }, { kind: "path", path: "exploration", occurredAt: Date.now() });
  act(() => notify(fresh()));
  expect(screen.getByRole("button", { name: "相棒の姿を見る" })).toBeEnabled();
  expect(view.container.querySelector('[aria-live="polite"]')).toHaveTextContent("相棒の姿が選べるよ");
  expect(screen.queryByText("+3 ♥+1")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "相棒の姿を見る" }));
  expect(screen.getByTestId("care-sheet")).toHaveAttribute("data-appearance-open", "true");
  fireEvent.click(screen.getByRole("button", { name: "シートを閉じる" }));
  expect(screen.queryByRole("button", { name: "相棒の姿を見る" })).toBeNull();
  expect(screen.queryByText("相棒まで あと0問")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: /育成を見る.*姿2種類/ }));
  expect(screen.getByTestId("care-sheet")).toHaveAttribute("data-appearance-open", "false");
});
it("keeps an unread appearance across questions and reloads without replaying celebrations", () => {
  const view = render(<LearningPetCorner qualificationId="ap" questionId="ap-q1" />);
  document.profiles[0].unlockedStages.push("partner"); document.profiles[0].memories.push({ kind: "stage", stage: "partner", occurredAt: Date.now() });
  act(() => notify(fresh()));
  view.rerender(<LearningPetCorner qualificationId="ap" questionId="ap-q2" />);
  expect(screen.getByRole("button", { name: "相棒の姿を見る" })).toBeEnabled();
  expect(view.container.querySelector('[aria-live="polite"]')).toBeEmptyDOMElement();
  // Two saved events can share the same millisecond. An older memory is not a new unlock.
  act(() => notify(fresh({ questionId: "ap-q2", eventId: "two" })));
  expect(screen.getByRole("button", { name: "相棒の姿を見る" })).toBeEnabled();
  expect(view.container.querySelector('[aria-live="polite"]')).toBeEmptyDOMElement();
  document.profiles[0].unlockedStages.push("expert"); document.profiles[0].memories.push({ kind: "stage", stage: "expert", occurredAt: Date.now() });
  act(() => notify(fresh({ questionId: "ap-q2", eventId: "three" })));
  expect(screen.getByRole("button", { name: "専門家の姿を見る" })).toBeEnabled();
  fireEvent.click(screen.getByRole("button", { name: "チワワのひと休みを閉じる" }));
  fireEvent.click(screen.getByRole("button", { name: "チワワのひと休みを開く" }));
  expect(screen.getByRole("button", { name: "専門家の姿を見る" })).toBeEnabled();
  fireEvent.click(screen.getByRole("button", { name: "専門家の姿を見る" }));
  fireEvent.click(screen.getByRole("button", { name: "シートを閉じる" }));
  view.unmount();
  const reloaded = render(<LearningPetCorner qualificationId="ap" questionId="ap-q2" />);
  expect(screen.queryByRole("button", { name: "専門家の姿を見る" })).toBeNull();
  expect(reloaded.container.querySelector('[aria-live="polite"]')).toBeEmptyDOMElement();
});
it("stops gestures and removes transient feedback while the page is hidden, without replay on return", () => {
  const view = render(<LearningPetCorner qualificationId="ap" questionId="ap-q1" />);
  act(() => notify(fresh()));
  expect(view.container.querySelector("section")).toHaveAttribute("data-pet-pose", "correct");
  try {
    Object.defineProperty(window.document, "hidden", { configurable: true, value: true });
    act(() => { window.document.dispatchEvent(new Event("visibilitychange")); });
    expect(view.container.querySelector("section")).toHaveAttribute("data-pet-pose", "study");
    expect(screen.queryByText("+3 ♥+1")).toBeNull();
    Object.defineProperty(window.document, "hidden", { configurable: true, value: false });
    act(() => { window.document.dispatchEvent(new Event("visibilitychange")); });
    expect(view.container.querySelector("section")).toHaveAttribute("data-pet-pose", "study");
    expect(screen.queryByText("+3 ♥+1")).toBeNull();
  } finally { Reflect.deleteProperty(window.document, "hidden"); }
});
