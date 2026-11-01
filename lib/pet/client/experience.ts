import { z } from "zod";
import type { PetOutfit } from "../types";

export const wardrobeSchema = z.enum(["none", "bandana", "bow", "scarf"]);
export type PetWardrobe = z.infer<typeof wardrobeSchema>;
export const careGestureSchema = z.enum(["pet", "nuzzle", "cheer"]);
export type PetCareGesture = z.infer<typeof careGestureSchema>;
const count = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
/** Device decoration only; never added to an immutable account import snapshot. */
export const experienceSchema = z.object({
  wardrobe: wardrobeSchema,
  careCounts: z.object({ pet: count, nuzzle: count, cheer: count }).strict(),
  lastVisitDay: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
}).strict();
export type PetExperience = z.infer<typeof experienceSchema>;
export type PetFeedReaction = "content" | "eager" | "delighted";
export const WARDROBE_ANSWERS: Record<PetWardrobe, number> = { none: 0, bandana: 5, bow: 10, scarf: 30 };
export const CARE_ANSWERS: Record<PetCareGesture, number> = { pet: 0, nuzzle: 10, cheer: 30 };
export function wardrobeUnlocked(answers: number, wardrobe: PetWardrobe) { return answers >= WARDROBE_ANSWERS[wardrobe]; }
export function careUnlocked(answers: number, gesture: PetCareGesture) { return answers >= CARE_ANSWERS[gesture]; }
export function learningPetExperience(document: { outfit: PetOutfit; experience?: PetExperience }): PetExperience {
  return document.experience ? structuredClone(document.experience) : {
    wardrobe: document.outfit, careCounts: { pet: 0, nuzzle: 0, cheer: 0 }, lastVisitDay: null,
  };
}
/** Select from the committed meal and learning milestone, never from wall-clock randomness. */
export function petFeedReaction(answers: number, meals: number): PetFeedReaction {
  const stage = answers < 10 ? 0 : answers < 30 ? 1 : 2;
  return (["content", "eager", "delighted"] as const)[((Math.max(1, meals) - 1) % 3 + stage) % 3];
}
