import type { ExamCode } from "@/lib/questions/types";
import type { TaskItem } from "./types";

/** Resolve old saved task links at display time without rewriting plan IDs/data. */
export function studyTaskLink(task: TaskItem, exam?: ExamCode, planId?: string): string | undefined {
  if (!exam) return task.link;
  const returnTo = `/account/dashboard${planId ? `?plan=${encodeURIComponent(planId)}` : ""}#study-plan`;
  if (task.kind === "questions" || task.kind === "review") {
    const params = new URLSearchParams({ mode: task.kind === "review" ? "review" : "topic", exam });
    if (task.kind === "review") params.set("scope", "exam");
    else if (task.category) params.set("category", task.category);
    params.set("returnTo", returnTo);
    return `/quiz?${params}`;
  }
  if (task.kind === "mock") {
    const params = new URLSearchParams({ exam, returnTo });
    if (/ミニ模試/.test(task.title)) params.set("count", "20");
    return `/mock-exam?${params}`;
  }
  return task.link;
}
