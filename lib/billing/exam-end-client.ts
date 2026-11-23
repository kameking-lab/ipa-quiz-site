"use client";

import { listPacePlans } from "@/lib/study-plan/pace-storage";
import { dayNumber } from "@/lib/study-plan/pace";
import { listPlans } from "@/lib/study-plan/storage";
import type { ExamDatePlan } from "./exam-end";

export function readExamDatePlans(pacePlans = listPacePlans()): ExamDatePlan[] {
  const plans: ExamDatePlan[] = [...pacePlans];
  try {
    for (const legacy of listPlans()) {
      if (typeof legacy?.input?.exam === "string" && typeof legacy.input.examDate === "string" && dayNumber(legacy.input.examDate) !== null)
        plans.push({ exam: legacy.input.exam, examDate: legacy.input.examDate });
    }
  } catch { /* An older local plan may be missing or invalid. */ }
  return plans;
}
