import type { PetProfile } from "./profile";
import type { PetLearningResult } from "./learning";
import { petLearningDay } from "./learning";
import { PET_PATHS, PET_PATH_LABELS, PET_STAGE_GOALS, petGrowthProgress } from "./growth";

export const PET_STAGE_LABELS = { puppy: "こいぬ", partner: "相棒", expert: "専門家" } as const;

/** Presentation only: never changes a profile or infers unlocks from the selected look. */
export function petPartnerRemaining(profile: PetProfile) {
  return profile.unlockedStages.includes("partner") ? null : Math.max(0, PET_STAGE_GOALS.partner.questions - petGrowthProgress(profile).uniqueQuestions);
}

export function petFreshPresentation(result: PetLearningResult, qualification: string, occurredAt: number) {
  const memories = result.document.profiles.find(item => item.qualificationId === qualification)?.memories.filter(memory => memory.occurredAt === occurredAt) ?? [];
  const stage = (["expert", "partner"] as const).find(stage => memories.some(memory => memory.kind === "stage" && memory.stage === stage)) ?? null;
  const path = PET_PATHS.find(path => memories.some(memory => memory.kind === "path" && memory.path === path));
  const caption = stage ? `${PET_STAGE_LABELS[stage]}の姿が選べるよ` : result.overcame ? "前に迷った問題を、克服！" : path ? `${PET_PATH_LABELS[path]}の特技を覚えた！` :
    result.comboMilestone ? `${result.comboMilestone}問つながった！` : result.reaction === "read" ? "いっしょに答えを確認。" : result.reaction === "incorrect" ? "だいじょうぶ。解説を読もう。" : "やった、正解！";
  return { stage, caption };
}

export function petStudyCaption(profile: PetProfile, timeZone: string, now: number) {
  const today = petLearningDay(now, timeZone), days = new Set(profile.learningDays);
  if (days.size > 0 && !days.has(today) && ![...days].some(day => day > today)) return "おかえり。今日も1問。";
  const captions: Record<string, string> = {
    ap: "図のつながりを、もう一度。", ip: "ノートの続きを、いっしょに。", takken: "図面を広げて、もう一問。",
    fp3: "家計簿の続きを、いっしょに。", civil2: "定規をそろえて、もう一問。", yakuzaishi: "ノートを見直して、もう一問。",
  };
  return captions[profile.qualificationId] ?? "いっしょに、一問ずつ。";
}
