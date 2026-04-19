import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | { name: "quiz_start"; exam: string; mode: string }
  | { name: "quiz_answer"; exam: string; correct: boolean }
  | { name: "quiz_complete"; exam: string; total: number; accuracy: number }
  | { name: "copilot_send"; exam: string; premium: boolean; actionId?: string }
  | { name: "copilot_limit_reached"; remaining: 0 }
  | { name: "pricing_view"; source: "home" | "upsell" | "direct" }
  | { name: "email_signup"; source: "pricing" | "upsell-dialog" | "other"; plan?: string }
  | { name: "streak_milestone"; days: 3 | 7 | 14 | 30 | 100 }
  | { name: "exam_select"; exam: string };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  const { name, ...rest } = event;
  try {
    track(name, rest as Record<string, string | number | boolean | null>);
  } catch {
    // analytics must never throw
  }
}
