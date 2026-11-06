import files from "./art.generated.json";
import type { PetProfile } from "./profile";
export type PetPose = "study" | "correct" | "incorrect" | "revealed" | "rest" | "meal" | "petted" | "slack";
export function petPathArtFor(path: NonNullable<PetProfile["selectedPath"]>): string {
  return files[`lineage-${path}`];
}
const fallback: Record<string, string> = {
  fp3: "/images/home/study-room-mascots/fp3-study.webp",
  civil2: "/images/home/study-room-mascots/civil2-study.webp",
  yakuzaishi: "/images/home/study-room-mascots/pharmacy-study.webp",
};
export function petArtFor(qualificationId: string | null, stage: PetProfile["selectedStage"], pose: PetPose): string {
  const qualification = qualificationId === "pharmacy" ? "yakuzaishi" : qualificationId;
  const art = files as Record<string, string>;
  if (qualification) {
    for (const key of [`${qualification}-${stage}-${pose}`, `${qualification}-${stage}-study`,
      `${qualification}-puppy-${pose}`, `${qualification}-puppy-study`, `takken-anim-${pose}`, "takken-anim-study"]) {
      if (key.startsWith("takken-") && qualification !== "takken") continue;
      if (Object.hasOwn(art, key)) return art[key];
    }
    if (Object.hasOwn(fallback, qualification)) return fallback[qualification];
  }
  return "/mascot/chihuahua-guide.webp";
}
