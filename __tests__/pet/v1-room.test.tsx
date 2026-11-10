import { petArtFor } from "@/lib/pet/v1/art";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { emptyPetProfiles, newPetProfile, petLearningFactSchema, serializePetProfileDocument, parsePetProfileDocument } from "@/lib/pet/v1/profile";
import { applyPetLearningFact } from "@/lib/pet/v1/learning";
import { applyPetCare } from "@/lib/pet/v1/care";
import { PET_ROOM_SCENES, petRoomGag } from "@/lib/pet/v1/room";
import { PetOwnStudySeat } from "@/components/pet/PetOwnStudySeat";
const at = Date.parse("2026-10-01T12:00:00+09:00"), DAY = 86_400_000;
function fact(day: number, extra: Record<string, unknown> = {}) { return petLearningFactSchema.parse({ eventId: `day-${day}`, ownerScope: "guest", qualificationId: "ap", canonicalQuestionId: `q-${day}`, contentVersion: "v1", sessionId: `s-${day}`, attemptKind: "answer", grade: "correct", reviewCycleId: null, occurredAt: at + day * DAY, policyVersion: 1, ...extra }); }
const empty = () => emptyPetProfiles("guest", "Asia/Tokyo");
afterEach(cleanup);
it("records one previously unseen scene per useful day, guarantees all six without consecutive days or a lottery", () => {
  let doc = empty();
  for (const day of [0, 2, 4, 8, 20, 40, 80]) doc = applyPetLearningFact(doc, fact(day)).document;
  expect(doc.profiles[0].roomEvents.map(event => event.scene)).toEqual([...PET_ROOM_SCENES]);
  expect(doc.profiles[0].roomEvents.map(event => event.day)).toEqual(["2026-10-01", "2026-10-03", "2026-10-05", "2026-10-09", "2026-10-21", "2026-11-10"]);
  const raw = serializePetProfileDocument(doc), reloaded = parsePetProfileDocument(raw);
  expect(serializePetProfileDocument(reloaded)).toBe(raw);
  expect(applyPetLearningFact(reloaded, fact(80)).outcome).toBe("duplicate");
  applyPetCare(reloaded, "ap", { type: "name", name: "こむぎ" }, at);
  expect(reloaded.profiles[0].roomEvents).toEqual(doc.profiles[0].roomEvents);
});
it("revealing, immediate retries, and extra questions the same day never reroll a scene", () => {
  let doc = applyPetLearningFact(empty(), fact(0, { attemptKind: "revealed", grade: "ungraded" })).document;
  expect(doc.profiles[0].roomEvents).toEqual([]);
  doc = applyPetLearningFact(doc, fact(1)).document;
  const original = structuredClone(doc.profiles[0].roomEvents);
  for (let i = 0; i < 6; i++) doc = applyPetLearningFact(doc, fact(1, { eventId: `retry-${i}`, canonicalQuestionId: `extra-${i}` })).document;
  expect(doc.profiles[0].roomEvents).toEqual(original);
});
it("separates qualifications and never reconstructs unseen past days from old profiles", () => {
  let doc = empty(); doc.profiles.push(newPetProfile("guest", "ap")); doc.profiles[0].learningDays = ["2026-09-01", "2026-09-02"];
  doc = applyPetLearningFact(doc, fact(0)).document;
  doc = applyPetLearningFact(doc, fact(0, { eventId: "ip", qualificationId: "ip" })).document;
  expect(doc.profiles.map(profile => profile.roomEvents.length)).toEqual([1, 1]);
  expect(doc.profiles[0].roomEvents[0].scene).toBe("first-meeting");
  expect(doc.profiles[0].petId).not.toBe(doc.profiles[1].petId);
});
it("renders the same private pet appearance and saved scene without a public-person claim or storage writes", () => {
  const doc = applyPetLearningFact(empty(), fact(0)).document, pet = doc.profiles[0];
  pet.name = "こむぎ"; pet.unlockedStages.push("partner"); pet.selectedStage = "partner"; pet.unlockedPaths.push("memory"); pet.selectedPath = "memory";
  const before = serializePetProfileDocument(doc), view = render(<PetOwnStudySeat view={{ status: "ready", document: doc }} />);
  expect(view.container.querySelector("section")).toHaveAttribute("data-own-pet-id", pet.petId);
  expect(view.container.querySelector("img")).toHaveAttribute("src", petArtFor("ap", "partner", "study"));
  expect(screen.getByRole("button", { name: "こむぎ・応用情報技術者（名前を変える）" })).toBeVisible(); expect(screen.queryByText(/いつもの机/)).toBeNull(); expect(screen.getByRole("button", { name: /育成を見る/ })).toBeEnabled();
  expect(view.container.querySelector("section")).toHaveAttribute("data-room-scene", "first-meeting");
  expect(serializePetProfileDocument(doc)).toBe(before);
  view.rerender(<PetOwnStudySeat view={{ status: "unavailable", document: null }} />);
  expect(view.container.querySelector("img")).toHaveAttribute("src", petArtFor(null, "puppy", "study")); expect(screen.queryByText(/こむぎ/)).toBeNull();
});
it("uses an actual overcoming memory for continuity without inferring a failure from grades", () => {
  const doc = applyPetLearningFact(empty(), fact(0)).document, pet = doc.profiles[0];
  expect(petRoomGag(pet)).toContain("図をつなぐ");
  pet.memories.push({ kind: "overcome", questionId: "prior", occurredAt: at }); expect(petRoomGag(pet)).toContain("前に迷ったノート");
});
