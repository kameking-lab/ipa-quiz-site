// PostHog 軽量ラッパー。
//
// NEXT_PUBLIC_POSTHOG_KEY が未設定の環境では完全 no-op で動作し、
// 開発・テスト・OSS フォーク先でも追加コストゼロで安全に走らせられる。
//
// 使い方:
//   import { posthogCapture } from "@/lib/posthog";
//   posthogCapture("question_answered", { exam: "ap", correct: true });
//
// プロバイダ初期化はクライアント側 PostHogProvider で行う。

import type { PostHog } from "posthog-js";
import { captureActivity } from "@/lib/analytics/activity-client";
import { hasReferralStage, markReferralStage, currentReferral, referralProps } from "@/lib/analytics/referral";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export const isPostHogConfigured = Boolean(POSTHOG_KEY);

export const POSTHOG_CONFIG = {
  key: POSTHOG_KEY,
  host: POSTHOG_HOST,
} as const;

// 主要イベント名は型で固める（タイポ防止）。
// Vercel Analytics 既存イベント (lib/analytics/events.ts) とは独立に
// PostHog 単体でも分析できるよう、ファネル別の名称を素直に揃える。
export type PostHogEventName =
  | "practice_limit_viewed"
  | "practice_feedback_submitted"
  | "practice_feedback_bonus_used"
  | "practice_feedback_customer_confirmation_viewed"
  | "page_view"
  | "referral_landed"
  | "referral_practice_clicked"
  | "practice_free_limit_reached"
  | "practice_upgrade_clicked"
  | "checkout_started"
  | "checkout_completed"
  | "question_answered"
  | "ai_query_sent"
  | "feedback_submitted"
  | "quiz_started"
  | "quiz_completed"
  | "faq_expanded"
  | "blog_viewed"
  | "blog_practice_answered"
  | "blog_practice_continued"
  | "blog_article_scrolled"
  | "essay_viewed"
  | "essay_industry_switched"
  | "stats_viewed"
  | "copilot_response_received"
  | "copilot_response_stopped"
  | "copilot_citation_clicked"
  | "copilot_citation_detail_opened"
  | "copilot_citation_full_opened"
  | "copilot_related_question_clicked"
  | "copilot_question_example_clicked"
  | "contact_form_submitted"
  | "book_click"
  | "exam_library_answered"
  | "exam_library_ai_query"
  | "referrer_with_utm";

export type PostHogEventProps = Record<string, string | number | boolean | null | undefined>;

let posthogClient: PostHog | null = null;
const pending: { name: PostHogEventName; props?: PostHogEventProps }[] = [];
const landed = new Set<string>();
const deliveredStages = new Set<string>();

function deliver(name: PostHogEventName, props?: PostHogEventProps): void {
  if (!posthogClient) {
    if (isPostHogConfigured && pending.length < 100) pending.push({ name, props });
    return;
  }
  const referralId = typeof props?.referral_id === "string" ? props.referral_id : null;
  const stage = name === "referral_landed" ? "landed"
    : name === "practice_free_limit_reached" ? `free_limit:${props?.reset_at ?? "unknown"}`
    : name === "checkout_completed" ? "checkout_completed" : null;
  const key = referralId && stage ? `${referralId}:${stage}` : null;
  if (key && (deliveredStages.has(key) || hasReferralStage(referralId!, stage!))) return;
  try {
    posthogClient.capture(name, props);
    if (key) {
      deliveredStages.add(key);
      markReferralStage(referralId!, stage!);
    }
  } catch {
    if (name === "referral_landed" && referralId) landed.delete(referralId);
    // A later milestone may retry its landing; analytics never blocks UI.
  }
}

export function setPostHogClient(client: PostHog | null): void {
  posthogClient = client;
  if (client) for (const event of pending.splice(0)) deliver(event.name, event.props);
}

export function getPostHogClient(): PostHog | null {
  return posthogClient;
}

/** Configured clients buffer hydration events until the lazy SDK is ready. */
export function posthogCapture(name: PostHogEventName, props?: PostHogEventProps): void {
  // Page views have an independent root tracker, so SDK readiness cannot lose or double them.
  if (name !== "page_view") captureActivity(name, props);
  if (!posthogClient && !isPostHogConfigured) return;
  try {
    const referral = currentReferral();
    const attribution = referralProps();
    if (referral && !landed.has(referral.referral_id)) {
      landed.add(referral.referral_id);
      deliver("referral_landed", attribution);
    }
    deliver(name, referral ? { ...attribution, ...props } : props);
  } catch {
    // analytics は決して例外で UI を壊さない
  }
}
