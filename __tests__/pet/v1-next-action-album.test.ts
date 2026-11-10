import { expect, it } from "vitest";
import { emptyPetProfiles, newPetProfile, petQuestionSchema } from "@/lib/pet/v1/profile";
import { petNextAction } from "@/lib/pet/v1/next-action";
import { petAlbumEntries } from "@/lib/pet/v1/album";
import { PET_REVIEW_INTERVAL_MS as DAY } from "@/lib/pet/v1/learning";

const at = Date.parse("2026-11-11T10:00:00+09:00");
function setup(count = 30) {
  const doc = emptyPetProfiles("guest", "Asia/Tokyo"), pet = newPetProfile("guest", "ip"); doc.profiles.push(pet);
  pet.unlockedStages.push("partner"); pet.learningDays = ["2026-11-11"];
  pet.questions = Array.from({ length: count }, (_, i) => petQuestionSchema.parse({ questionId: `ip-q${i}`, legacy: false, firstRewarded: true, lastRewardedAt: at }));
  return { doc, pet };
}
it("keeps a concrete next-question target after partner without changing growth", () => {
  const { doc, pet } = setup(5), before = JSON.stringify(doc);
  expect(petNextAction(pet, doc, at)).toEqual({ label: "専門家へ あと25問", action: "新しい問題を解く", href: "/quiz?mode=unanswered&exam=ip" });
  expect(JSON.stringify(doc)).toBe(before);
});
it("waits for both 24h and the actual SRS due date, then links the exact question", () => {
  const { doc, pet } = setup(1);
  // Other questions are already done; this candidate is the remaining spaced target.
  for (let i = 1; i < 30; i++) pet.questions.push(petQuestionSchema.parse({ questionId: `later-${i}`, legacy: false, firstRewarded: true, lastRewardedAt: at + 2 * DAY }));
  const card = { id: "ip-q0", lastReviewedAt: at, dueAt: at + 2 * DAY, ef: 2.5, reps: 1, intervalDays: 2 };
  const early = petNextAction(pet, doc, at + DAY, [card]);
  expect(early.label).toContain("11/13 10:00"); expect(early.href).not.toContain("source=search");
  const due = petNextAction(pet, doc, at + 2 * DAY, [card]);
  expect(due.action).toBe("この1問を復習する"); expect(new URL(due.href, "https://example.test").searchParams.get("ids")).toBe("ip-q0");
  expect(petNextAction(pet, doc, at + DAY - 1).action).not.toBe("この1問を復習する");
});
it("does not offer recently revealed answers as independent recall, and separates qualifications", () => {
  const { doc, pet } = setup();
  for (const q of pet.questions) doc.events.push({ eventId: q.questionId, ownerScope: "guest", qualificationId: "ip", canonicalQuestionId: q.questionId, contentVersion: "v1", sessionId: "s", attemptKind: "revealed", grade: "ungraded", reviewBefore: null, reviewCycleId: null, fieldId: null, occurredAt: at + DAY, policyVersion: 1 });
  expect(petNextAction(pet, doc, at + DAY).action).not.toBe("この1問を復習する");
  for (const event of doc.events) event.qualificationId = "ap";
  expect(petNextAction(pet, doc, at + DAY).action).toBe("この1問を復習する");
});
it("shows achieved learning before the room scene when both happened together", () => {
  const { pet } = setup(5);
  pet.roomEvents.push({ scene: "first-meeting", day: "2026-11-11", occurredAt: at });
  pet.memories.push({ kind: "stage", stage: "partner", occurredAt: at }, { kind: "path", path: "exploration", occurredAt: at });
  const album = petAlbumEntries(pet);
  expect(album).toHaveLength(3); expect(album[0].title).toBe("相棒の姿を解放"); expect(album[0].detail).toBe("5問をいっしょに解いた！");
  expect(album.every(entry => !entry.title.includes("？"))).toBe(true);
});
