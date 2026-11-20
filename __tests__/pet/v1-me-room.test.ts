import { expect, it } from "vitest";
import { applyPetLearningFact } from "@/lib/pet/v1/learning";
import { applyPetCare } from "@/lib/pet/v1/care";
import { emptyPetProfiles, parsePetProfileDocument, serializePetProfileDocument } from "@/lib/pet/v1/profile";
import { emptyPetCloudState, localPetCloudEnvelope, mergePetCloudEnvelopes } from "@/lib/pet/v1/cloud-merge";
const at = Date.parse("2026-11-17T12:00:00+09:00");
const fact = (q: number, exam = "ap") => ({ eventId: `${exam}-${q}`, ownerScope: "guest", qualificationId: exam, canonicalQuestionId: `${exam}-q${q}`, contentVersion: "v1", sessionId: "s1", attemptKind: "answer", grade: "correct", reviewCycleId: null, occurredAt: at + q * 10000, policyVersion: 1 });
it("earns one daily-goal meal across qualifications and replays never add another", () => {
  let doc = emptyPetProfiles("guest", "Asia/Tokyo");
  for (let q = 0; q < 9; q++) doc = applyPetLearningFact(doc, fact(q, q % 2 ? "fp2" : "ap"), 10).document;
  expect(doc.profiles.flatMap(profile => profile.care.meals)).toHaveLength(0);
  doc = applyPetLearningFact(doc, fact(9, "fp2"), 10).document;
  expect(doc.profiles.flatMap(profile => profile.care.meals)).toHaveLength(1);
  for (let q = 10; q < 20; q++) doc = applyPetLearningFact(doc, fact(q), 10).document;
  expect(doc.profiles.flatMap(profile => profile.care.meals)).toHaveLength(1);
  const repeated = applyPetLearningFact(doc, fact(9, "fp2"), 10);
  expect(repeated.outcome).toBe("duplicate");
});
it("keeps optional room clothes in the existing backup and a commutative cloud merge", () => {
  const old = applyPetLearningFact(emptyPetProfiles("guest", "Asia/Tokyo"), fact(1)).document;
  const unchanged = serializePetProfileDocument(old);
  expect(unchanged).not.toContain("appearance");
  const changed = structuredClone(old);
  applyPetCare(changed, "ap", { type: "appearance", costume: "formal", accessory: "star" }, at);
  expect(parsePetProfileDocument(serializePetProfileDocument(changed)).profiles[0].care.appearance).toEqual({ costume: "formal", accessory: "star", updatedAt: at });
  expect(changed.profiles[0].growth).toBe(old.profiles[0].growth);
  const a = localPetCloudEnvelope(changed, emptyPetCloudState(), "device-aaaaaaaa", at);
  const b = localPetCloudEnvelope(old, emptyPetCloudState(), "device-bbbbbbbb", at);
  expect(mergePetCloudEnvelopes(a, b).document.profiles[0].care.appearance?.accessory).toBe("star");
  expect(mergePetCloudEnvelopes(a, b)).toEqual(mergePetCloudEnvelopes(b, a));
});
it("counts same-day practice toward the configured goal without awarding growth again", () => {
  let doc = applyPetLearningFact(emptyPetProfiles("guest", "Asia/Tokyo"), fact(1), 10).document;
  const growth = doc.profiles[0].growth;
  doc = applyPetLearningFact(doc, { ...fact(1), eventId: "practice-again" }, { target: 10, answeredToday: 10 }).document;
  expect(doc.profiles[0].care.meals).toHaveLength(1);
  expect(doc.profiles[0].growth).toBe(growth);
});
