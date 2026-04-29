"use client";

import * as Sentry from "@sentry/nextjs";

export function SentryTestClient() {
  function triggerError() {
    throw new Error("Sentry テストエラー — ipa-quiz-site " + new Date().toISOString());
  }

  function captureManual() {
    Sentry.captureMessage("Sentry テストメッセージ（手動）", "info");
    alert("Sentry.captureMessage を送信しました。Sentry ダッシュボードを確認してください。");
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={triggerError}
        className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
      >
        テストエラーを throw する
      </button>
      <button
        onClick={captureManual}
        className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
      >
        captureMessage を送信する
      </button>
    </div>
  );
}
