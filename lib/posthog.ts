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
  | "page_view"
  | "question_answered"
  | "ai_query_sent"
  | "feedback_submitted"
  | "quiz_started"
  | "quiz_completed";

export type PostHogEventProps = Record<string, string | number | boolean | null | undefined>;

let posthogClient: PostHog | null = null;

export function setPostHogClient(client: PostHog | null): void {
  posthogClient = client;
}

export function getPostHogClient(): PostHog | null {
  return posthogClient;
}

/** クライアント側からイベントを投げる。未初期化なら黙って捨てる。 */
export function posthogCapture(name: PostHogEventName, props?: PostHogEventProps): void {
  if (!posthogClient) return;
  try {
    posthogClient.capture(name, props);
  } catch {
    // analytics は決して例外で UI を壊さない
  }
}
