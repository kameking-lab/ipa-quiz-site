import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { emptyPetProfiles, newPetProfile } from "@/lib/pet/v1/profile";
import PetCareSheet from "@/components/pet/PetCareSheet";
import { savePetCare } from "@/lib/pet/v1/browser-care";
import { petArtFor, petPortraitFor } from "@/lib/pet/v1/art";

vi.mock("@/lib/pet/v1/browser-care", () => ({ savePetCare: vi.fn(), exportCurrentPetBackup: vi.fn(), restoreCurrentPetBackup: vi.fn(), writeCurrentPetBackup: vi.fn() }));
beforeEach(() => vi.mocked(savePetCare).mockReset());
afterEach(() => { cleanup(); vi.useRealTimers(); });
function setup(initialAppearanceOpen = false) {
  const doc = emptyPetProfiles("guest", "Asia/Tokyo"); doc.profiles.push(newPetProfile("guest", "ap"), newPetProfile("guest", "ip"));
  doc.profiles[0].unlockedStages.push("partner");
  const props = { document: doc, qualificationId: "ap", initialAppearanceOpen, onClose: vi.fn(), returnFocus: vi.fn(), onPose: vi.fn() };
  return { doc, props, view: render(<PetCareSheet {...props} />) };
}
it("keeps four sections collapsed, exposes care and return first, and opens appearance only when requested", () => {
  const { props, view } = setup();
  expect(document.querySelectorAll('details')).toHaveLength(4); expect(document.querySelectorAll('details[open]')).toHaveLength(0);
  expect(screen.getByRole("button", { name: "学習へ戻る" })).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "学習へ戻る" })); expect(props.onClose).toHaveBeenCalledOnce();
  view.unmount(); setup(true); expect(document.querySelector('details')?.open).toBe(true);
});
it("reports both precision routes with partial recent-answer counts and preserves disclosure across saves", async () => {
  const { doc, props, view } = setup();
  doc.profiles[0].recentAnswers = [{ questionId: "q1", correct: true }, { questionId: "q2", correct: false }];
  const details = [...document.querySelectorAll('details')].find(el => el.querySelector('summary')?.textContent === "特技")!;
  act(() => { details.open = true; fireEvent(details, new Event("toggle")); });
  view.rerender(<PetCareSheet {...props} document={{ ...doc, revision: 1 }} />);
  expect(details.open).toBe(true);
  expect(screen.getByText("直近20問中16正解 または 日をあけて5問")).toBeInTheDocument();
  expect(screen.getByText("最近2/20問・正解1/16")).toBeInTheDocument(); expect(screen.getByText("復習0/5問")).toBeInTheDocument();
});
it("never writes for petting/rest and never claims a failed feed succeeded", async () => {
  const { doc, props, view } = setup(); const before = JSON.stringify(doc);
  fireEvent.click(screen.getByRole("button", { name: "なでる" })); fireEvent.click(screen.getByRole("button", { name: "休む" }));
  expect(savePetCare).not.toHaveBeenCalled(); expect(JSON.stringify(doc)).toBe(before);
  doc.profiles[0].care.meals.push({ rewardId: "2026-11-10", earnedAt: 100, consumedAt: null }); view.rerender(<PetCareSheet {...props} document={{ ...doc }} />);
  vi.mocked(savePetCare).mockRejectedValueOnce(new Error("stale_revision"));
  fireEvent.click(screen.getByRole("button", { name: "ごほうびごはんを食べる" }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("保存を確認できませんでした"));
  expect(doc.profiles[0].care.meals[0].consumedAt).toBeNull(); expect(props.onPose).not.toHaveBeenCalledWith("meal", expect.anything(), expect.anything());
});
it("does not send a meal reaction back after its owner has left", async () => {
  const { doc, props, view } = setup(); doc.profiles[0].care.meals.push({ rewardId: "2026-11-10", earnedAt: 100, consumedAt: null }); view.rerender(<PetCareSheet {...props} document={{ ...doc }} />);
  let resolve!: () => void; vi.mocked(savePetCare).mockImplementationOnce(() => new Promise<Awaited<ReturnType<typeof savePetCare>>>(done => { resolve = () => done(doc); }));
  fireEvent.click(screen.getByRole("button", { name: "ごほうびごはんを食べる" })); view.unmount();
  await act(async () => resolve()); expect(props.onPose).not.toHaveBeenCalled();
});
it("resets pose and disclosures when switching qualifications", () => {
  setup(true); fireEvent.click(screen.getByRole("button", { name: "休む" }));
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "ip" } });
  expect(document.querySelectorAll('details[open]')).toHaveLength(0);
  expect(screen.getByText("ITパスポートのチワワ")).toBeVisible();
  expect(document.querySelector('img')?.getAttribute('src')).toBe(petArtFor("ip", "puppy", "study"));
});

it("previews a joyful unlocked partner without changing the chosen puppy or saved facts", () => {
  const { doc } = setup(true), before = JSON.stringify(doc);
  expect(document.querySelector('img')).toHaveAttribute('src', petArtFor("ap", "partner", "correct"));
  expect(doc.profiles[0].selectedStage).toBe("puppy");
  expect(JSON.stringify(doc)).toBe(before); expect(savePetCare).not.toHaveBeenCalled();
});

it("gives IP and FP3 distinct finite greetings, cancels on qualification switch, and never writes progress", () => {
  vi.useFakeTimers();
  const doc = emptyPetProfiles("guest", "Asia/Tokyo"); doc.profiles.push(newPetProfile("guest", "ip"), newPetProfile("guest", "fp3"));
  const before = JSON.stringify(doc);
  render(<PetCareSheet document={doc} qualificationId="ip" onClose={vi.fn()} returnFocus={vi.fn()} onPose={vi.fn()} />);
  const art = () => document.querySelector('img');
  fireEvent.click(screen.getByRole("button", { name: "なでる" }));
  expect(art()).toHaveAttribute('src', petArtFor("ip", "puppy", "study"));
  act(() => vi.advanceTimersByTime(700));
  expect(art()).toHaveAttribute('src', "/images/home/study-room-mascots/idle/ip-wave.webp");
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "fp3" } });
  fireEvent.click(screen.getByRole("button", { name: "なでる" }));
  expect(art()).toHaveAttribute('src', "/images/home/study-room-mascots/idle/fp3-book.webp");
  act(() => vi.advanceTimersByTime(700)); expect(art()).toHaveAttribute('src', petPortraitFor("fp3", "puppy", "petted"));
  fireEvent.click(screen.getByRole("button", { name: "なでる" }));
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "ip" } });
  act(() => vi.advanceTimersByTime(6000)); expect(art()).toHaveAttribute('src', petArtFor("ip", "puppy", "study"));
  expect(JSON.stringify(doc)).toBe(before); expect(savePetCare).not.toHaveBeenCalled();
});

it("uses the final static greeting when motion is disabled and returns to the chosen portrait", () => {
  vi.useFakeTimers();
  const doc = emptyPetProfiles("guest", "Asia/Tokyo"), pet = newPetProfile("guest", "ip");
  pet.unlockedStages.push("partner"); pet.selectedStage = "partner"; doc.profiles.push(pet);
  render(<PetCareSheet document={doc} qualificationId="ip" allowMotion={false} onClose={vi.fn()} returnFocus={vi.fn()} onPose={vi.fn()} />);
  fireEvent.click(screen.getByRole("button", { name: "なでる" }));
  expect(document.querySelector('img')).toHaveAttribute('src', petPortraitFor("ip", "partner", "petted"));
  act(() => vi.advanceTimersByTime(6000)); expect(document.querySelector('img')).toHaveAttribute('src', petPortraitFor("ip", "partner", "study"));
});
