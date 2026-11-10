import files from "./art.generated.json";
import outfits from "./outfits.generated.json";
// Reaction poses drawn for qualifications whose study/break pair comes from the
// study room (same round style and outfit); their study/slack poses use that pair.
import extra from "./art-extra.json";
// Qualifications without a dedicated character share their field's drawn set
// (same field outfit as their study-room seat). Mirrors the study room's field map.
import fields from "./fields.json";
import type { PetProfile } from "./profile";
const art: Record<string, string> = { ...files, ...extra };
export type PetPose = "study" | "correct" | "incorrect" | "revealed" | "rest" | "meal" | "petted" | "slack";
export function petPathArtFor(path: NonNullable<PetProfile["selectedPath"]>): string {
  return files[`lineage-${path}`];
}
const ROOM = "/images/home/study-room-mascots/";
/** Round, fluffy study-room style only (never the slimmer early guide art).
 * Atlas tiles without a headband: 8 studies at a laptop, 9 naps on a book. */
export const PET_GENERIC_ART = { study: `${ROOM}generic-8.webp`, rest: `${ROOM}generic-9.webp` } as const;
const resting = (pose: PetPose) => pose === "rest" || pose === "slack";
export function petArtFor(qualificationId: string | null, stage: PetProfile["selectedStage"], pose: PetPose): string {
  const qualification = qualificationId === "pharmacy" ? "yakuzaishi" : qualificationId;
  if (qualification) {
    for (const key of [`${qualification}-${stage}-${pose}`, `${qualification}-${stage}-study`,
      `${qualification}-puppy-${pose}`, `${qualification}-puppy-study`, `takken-anim-${pose}`, "takken-anim-study"]) {
      if (key.startsWith("takken-") && qualification !== "takken") continue;
      if (Object.hasOwn(art, key)) return art[key];
    }
    // Field-shared set. The puppy's study/slack are not drawn here on purpose: the
    // qualification's own study-room pair (field outfit + its own desk prop) is used.
    if (Object.hasOwn(fields, qualification)) {
      const key = `field-${(fields as Record<string, string>)[qualification]}-${stage}-${pose}`;
      if (Object.hasOwn(art, key)) return art[key];
    }
    // Every qualification keeps its own study-room outfit (study + break pair).
    const outfit = (outfits as Record<string, string>)[qualification];
    if (Object.hasOwn(outfits, qualification)) return `${ROOM}${outfit}-${resting(pose) ? "break" : "study"}.webp`;
  }
  return resting(pose) ? PET_GENERIC_ART.rest : PET_GENERIC_ART.study;
}

/** Reuse the existing joyful portrait so a chosen partner stays recognisable at 64px. */
export function petPortraitFor(qualificationId: string | null, stage: PetProfile["selectedStage"], pose: PetPose): string {
  if (qualificationId === "ip" && pose === "petted") return `${ROOM}idle/ip-wave.webp`;
  return petArtFor(qualificationId, stage, stage === "partner" && pose === "study" ? "correct" : pose);
}

/** A short, character-specific lead-in, followed by its static happy reaction. */
export function petGreetingLeadIn(qualificationId: string, stage: PetProfile["selectedStage"]): string {
  if (qualificationId === "fp3") return `${ROOM}idle/fp3-book.webp`;
  return petArtFor(qualificationId, stage, "study");
}
