import { expect, it } from "vitest";
import { emptyPetProfiles, newPetProfile } from "@/lib/pet/v1/profile";
import type { PetLearningResult } from "@/lib/pet/v1/learning";
import { petFreshPresentation, petPartnerRemaining, petStudyCaption } from "@/lib/pet/v1/presentation";

it("selects stage before overcome, paths, combo and grade, independent of memory order", () => {
  const document = emptyPetProfiles("guest", "Asia/Tokyo"), profile = newPetProfile("guest", "ap"); document.profiles.push(profile);
  const result: PetLearningResult = { document, outcome: "applied", reward: { growth: 3, bond: 1 }, reaction: "correct", overcame: true, comboMilestone: 5 };
  profile.memories = [{ kind: "stage", stage: "partner", occurredAt: 100 }, { kind: "path", path: "memory", occurredAt: 100 }, { kind: "path", path: "exploration", occurredAt: 100 }];
  expect(petFreshPresentation(result, "ap", 100)).toEqual({ stage: "partner", caption: "相棒の姿が選べるよ" });
  profile.memories.push({ kind: "stage", stage: "expert", occurredAt: 100 });
  expect(petFreshPresentation(result, "ap", 100).stage).toBe("expert");
  expect(petFreshPresentation(result, "ap", 101).caption).toContain("克服");
  result.overcame = false; profile.memories = profile.memories.filter(memory => memory.kind === "path");
  expect(petFreshPresentation(result, "ap", 100).caption).toContain("探究");
  expect(petFreshPresentation(result, "ap", 100, { unlockedStages: ["puppy", "partner"], unlockedPaths: ["exploration", "memory"] }).caption).toBe("5問つながった！");
  expect(petFreshPresentation(result, "ap", 101).caption).toBe("5問つながった！");
});

it("does not treat a deliberately selected puppy as a locked partner or invent an expert goal", () => {
  const profile = newPetProfile("guest", "ap");
  expect(petPartnerRemaining(profile)).toBe(5);
  profile.unlockedStages.push("partner");
  expect(profile.selectedStage).toBe("puppy"); expect(petPartnerRemaining(profile)).toBeNull();
  profile.unlockedStages.push("expert"); expect(petPartnerRemaining(profile)).toBeNull();
});

it("uses saved timezone, unordered days and future-day fallback without writes", () => {
  const profile = newPetProfile("guest", "ap"), now = Date.parse("2026-11-10T16:00:00Z"); // November 11 in Tokyo
  const ordinary = "図のつながりを、もう一度。";
  for (const days of [[], ["2026-11-11"], ["2026-11-10", "2026-11-11"], ["2026-11-12", "2026-11-09"], ["2026-11-09", "2026-11-12"]]) {
    profile.learningDays = days; const before = JSON.stringify(profile);
    expect(petStudyCaption(profile, "Asia/Tokyo", now)).toBe(ordinary); expect(JSON.stringify(profile)).toBe(before);
  }
  profile.learningDays = ["2026-11-10", "2026-11-09"];
  expect(petStudyCaption(profile, "Asia/Tokyo", now)).toBe("おかえり。今日も1問。");
  expect(petStudyCaption(profile, "America/Los_Angeles", now)).toBe(ordinary);
});
