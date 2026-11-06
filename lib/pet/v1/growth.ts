import type { PetProfile } from "./profile";

export type PetPath = PetProfile["unlockedPaths"][number];
export const PET_PATHS: readonly PetPath[] = ["exploration", "memory", "precision", "companionship"];
export const PET_PATH_LABELS: Record<PetPath, string> = {
  exploration: "探究", memory: "記憶", precision: "精密", companionship: "伴走",
};
export function petGrowthProgress(profile: PetProfile) {
  const questions = profile.questions.filter(question => question.lastRewardedAt !== null);
  const fields = new Set(questions.filter(question => question.independentlyCorrect && question.fieldId !== null).map(question => question.fieldId));
  const delayedQuestions = questions.filter(question => question.independentCorrectAts.length > 0).length;
  const delayedAnswers = questions.reduce((total, question) => total + question.independentCorrectAts.length, 0);
  const precise = profile.recentAnswers.length === 20 && profile.recentAnswers.filter(answer => answer.correct).length >= 16;
  return { uniqueQuestions: questions.length, fields: fields.size, delayedQuestions, delayedAnswers,
    learningDays: profile.learningDays.length,
    paths: { exploration: fields.size >= 3, memory: delayedAnswers >= 3,
      precision: precise || delayedQuestions >= 5, companionship: profile.learningDays.length >= 5 } };
}
/** Only called after a semantically effective learning achievement. Never on load/care. */
export function advancePetGrowth(profile: PetProfile, occurredAt: number) {
  const progress = petGrowthProgress(profile);
  if (progress.uniqueQuestions >= 5 && !profile.unlockedStages.includes("partner")) {
    profile.unlockedStages.push("partner");
    profile.memories.push({ kind: "stage", stage: "partner", occurredAt });
  }
  for (const path of PET_PATHS) if (progress.paths[path] && !profile.unlockedPaths.includes(path)) {
    profile.unlockedPaths.push(path); profile.memories.push({ kind: "path", path, occurredAt });
  }
}
