import { QUALIFICATION_HUBS } from "@/lib/exam-qualification-hubs";

export const JOURNEY_PAGES = ["home", "quiz", "question", "exam_library", "qualification", "pricing", "signin", "billing", "billing_success", "billing_cancel", "other"] as const;
export const JOURNEY_STAGES = ["learning", "offer", "plan_click", "signin", "billing", "checkout", "canceled", "purchased"] as const;
export type JourneyPage = typeof JOURNEY_PAGES[number];
export type JourneyStage = typeof JOURNEY_STAGES[number];
export const JOURNEY_QUALIFICATIONS = ["unknown", "ip", "sg", "fe", "ap", "sc", "nw", "db", "pm", "sa", "st", "es", "sm", "au", ...QUALIFICATION_HUBS.map(h => h.slug)];
export function journeyQualification(value: unknown): string {
  return typeof value === "string" && JOURNEY_QUALIFICATIONS.includes(value) ? value : "unknown";
}

/** Discard all arbitrary URLs, query values, question IDs and free text. */
export function journeyPage(path: string): JourneyPage {
  if (path === "/") return "home";
  if (path === "/billing/success") return "billing_success";
  if (path === "/billing/cancel") return "billing_cancel";
  if (path.startsWith("/billing")) return "billing";
  if (path.startsWith("/auth/")) return "signin";
  if (path === "/pricing") return "pricing";
  if (path.startsWith("/q/")) return "question";
  if (path.startsWith("/quiz")) return "quiz";
  if (path.startsWith("/e-learning/exams/qualifications/")) return "qualification";
  if (path.startsWith("/e-learning/")) return "exam_library";
  return "other";
}

export interface JourneySnapshot {
  day: string;
  qualification: string;
  page: JourneyPage;
  offer: JourneyPage | "none";
  stage: JourneyStage;
  answers: number;
  outcome: "unconfirmed" | "purchased";
}
export interface JourneyChange extends JourneySnapshot { delta: 1 | -1 }

/** Each tab/session contributes exactly one count and its pre-purchase answers per qualification. */
export function journeyChanges(previous: JourneySnapshot[], next: JourneySnapshot[]): JourneyChange[] {
  const same = (a: JourneySnapshot, b: JourneySnapshot) => JSON.stringify(a) === JSON.stringify(b);
  return [
    ...previous.filter(a => !next.some(b => same(a, b))).map(a => ({ ...a, delta: -1 as const })),
    ...next.filter(a => !previous.some(b => same(a, b))).map(a => ({ ...a, delta: 1 as const })),
  ];
}
