// クライアント側のアナリティクスイベント定義。
//
// CVR ファネルの主要ステップ:
//   pricing_view → checkout_started → checkout_completed
//                                   ↘ checkout_canceled
//   signin_started → signin_completed → checkout_started ...
//   subscription_canceled / payment_failed は Webhook 由来
//   （server-side は lib/analytics/server-events.ts へ）
//
// すべてのイベントは破壊的に投げない。track() が失敗しても黙殺する。

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
  | { name: "exam_select"; exam: string }
  // ----- CVR funnel -----
  | { name: "signin_started"; provider: "google" | "github" | "email"; source?: string }
  | { name: "signin_completed"; provider: string; firstTime?: boolean }
  | {
      name: "checkout_started";
      plan: "premium" | "team";
      source: "pricing" | "upsell" | "account";
    }
  | { name: "checkout_completed"; plan: "premium" | "team"; sessionId?: string }
  | { name: "checkout_canceled"; plan?: "premium" | "team"; source?: string }
  | { name: "billing_portal_opened"; plan: string };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  const { name, ...rest } = event;
  try {
    track(name, rest as Record<string, string | number | boolean | null>);
  } catch {
    // analytics must never throw
  }
}
