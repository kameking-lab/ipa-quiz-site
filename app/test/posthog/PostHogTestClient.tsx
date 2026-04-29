"use client";

import { posthogCapture } from "@/lib/posthog";

export function PostHogTestClient() {
  function sendEvent(eventName: Parameters<typeof posthogCapture>[0]) {
    posthogCapture(eventName, { test: true, timestamp: new Date().toISOString() });
    alert(`イベント「${eventName}」を PostHog に送信しました。`);
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => sendEvent("question_answered")}
        className="rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
      >
        question_answered を送信
      </button>
      <button
        onClick={() => sendEvent("ai_query_sent")}
        className="rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
      >
        ai_query_sent を送信
      </button>
      <button
        onClick={() => sendEvent("feedback_submitted")}
        className="rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
      >
        feedback_submitted を送信
      </button>
    </div>
  );
}
