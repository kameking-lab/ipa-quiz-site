import type { PetProfileDocument, PetProfile } from "./profile";
import { normalizePetName } from "./name";

export type PetCareAction =
  | { type: "name"; name: string }
  | { type: "stage"; stage: "puppy" | "partner" | "expert" }
  | { type: "path"; path: PetProfile["selectedPath"] }
  | { type: "autoFeed"; enabled: boolean }
  | { type: "feed"; rewardId: string };
/** Store.update supplies an exclusive, detached document and revalidates ownership. */
export function applyPetCare(document: PetProfileDocument, qualificationId: string, action: PetCareAction, now: number) {
  const profile = document.profiles.find(item => item.qualificationId === qualificationId);
  if (!profile) throw new Error("pet_not_found");
  switch (action.type) {
    case "name": {
      const result = normalizePetName(action.name);
      if (!result.ok) throw new Error("pet_name_invalid");
      profile.name = result.name; break;
    }
    case "stage":
      if (!profile.unlockedStages.includes(action.stage)) throw new Error("pet_stage_locked");
      profile.selectedStage = action.stage; break;
    case "path":
      if (action.path !== null && !profile.unlockedPaths.includes(action.path)) throw new Error("pet_path_locked");
      profile.selectedPath = action.path; break;
    case "autoFeed":
      profile.care.autoFeed = action.enabled;
      if (action.enabled) for (const meal of profile.care.meals) if (meal.consumedAt === null) meal.consumedAt = Math.max(now, meal.earnedAt);
      break;
    case "feed": {
      const meal = profile.care.meals.find(item => item.rewardId === action.rewardId);
      if (!meal) throw new Error("pet_meal_not_found");
      if (meal.consumedAt === null) meal.consumedAt = Math.max(now, meal.earnedAt);
      break;
    }
  }
  return document;
}
