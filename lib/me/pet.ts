import type { PetProfileDocument } from "@/lib/pet/v1/profile";

export const ROOM_STAGES = ["puppy", "partner", "expert"] as const;
export const ROOM_STAGE_LABELS = { puppy: "こいぬ", partner: "若犬", expert: "成犬" } as const;
export const ROOM_STAGE_MINUTES = { puppy: 0, partner: 15, expert: 90 } as const;

/** Cross-qualification lifetime projection. Existing earned stages are a floor,
 * including backups whose old answer history has already been pruned. */
export function lifetimePetStage(document: PetProfileDocument | null, minutes: number) {
  const lifetime = Math.max(minutes, (document?.profiles.reduce((sum, profile) => sum + profile.questions.length, 0) ?? 0) * 3);
  let index = lifetime >= ROOM_STAGE_MINUTES.expert ? 2 : lifetime >= ROOM_STAGE_MINUTES.partner ? 1 : 0;
  for (const profile of document?.profiles ?? []) {
    for (const stage of profile.unlockedStages) index = Math.max(index, ROOM_STAGES.indexOf(stage));
  }
  return ROOM_STAGES[index];
}

export interface MeExamResult { exam: string; result: "passed" | "failed" | "absent" }

/** The planner owns result collection/sync; the room only reads its result. */
export function passedPlanExams(plans: unknown): string[] {
  if (!Array.isArray(plans)) return [];
  return [...new Set(plans.flatMap((plan: unknown) => {
    if (!plan || typeof plan !== "object" || !("result" in plan) || plan.result !== "passed" || !("input" in plan)) return [];
    const input = plan.input;
    return input && typeof input === "object" && "exam" in input && typeof input.exam === "string" ? [input.exam] : [];
  }))];
}
