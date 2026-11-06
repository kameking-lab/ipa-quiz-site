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
/** Design §4: partner after 5 distinct questions; expert after 30 distinct
 * questions, 5 learning days and 5 spaced (24h+) independent correct answers. */
export const PET_STAGE_GOALS = {
  partner: { questions: 5 },
  expert: { questions: 30, days: 5, spaced: 5 },
} as const;
export function petNextStageProgress(profile: PetProfile) {
  const progress = petGrowthProgress(profile);
  if (!profile.unlockedStages.includes("partner"))
    return { stage: "partner" as const, parts: [{ unit: "問", now: Math.min(progress.uniqueQuestions, PET_STAGE_GOALS.partner.questions), goal: PET_STAGE_GOALS.partner.questions }] };
  if (!profile.unlockedStages.includes("expert")) {
    const goal = PET_STAGE_GOALS.expert;
    return { stage: "expert" as const, parts: [
      { unit: "問", now: Math.min(progress.uniqueQuestions, goal.questions), goal: goal.questions },
      { unit: "日", now: Math.min(progress.learningDays, goal.days), goal: goal.days },
      { unit: "回復習", now: Math.min(progress.delayedAnswers, goal.spaced), goal: goal.spaced },
    ] };
  }
  return null;
}
/** Only called after a semantically effective learning achievement. Never on load/care. */
export function advancePetGrowth(profile: PetProfile, occurredAt: number) {
  const progress = petGrowthProgress(profile);
  if (progress.uniqueQuestions >= PET_STAGE_GOALS.partner.questions && !profile.unlockedStages.includes("partner")) {
    profile.unlockedStages.push("partner");
    profile.memories.push({ kind: "stage", stage: "partner", occurredAt });
  }
  const expert = PET_STAGE_GOALS.expert;
  if (profile.unlockedStages.includes("partner") && !profile.unlockedStages.includes("expert") &&
    progress.uniqueQuestions >= expert.questions && progress.learningDays >= expert.days && progress.delayedAnswers >= expert.spaced) {
    profile.unlockedStages.push("expert");
    profile.memories.push({ kind: "stage", stage: "expert", occurredAt });
  }
  for (const path of PET_PATHS) if (progress.paths[path] && !profile.unlockedPaths.includes(path)) {
    profile.unlockedPaths.push(path); profile.memories.push({ kind: "path", path, occurredAt });
  }
}
