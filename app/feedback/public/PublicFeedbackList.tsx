"use client";

import * as React from "react";
import { LS_KEYS } from "@/lib/storage/keys";
import type { PublicFeedbackEntry } from "@/components/FeedbackGateModal";

const CHOICE_LABELS: Record<string, { label: string; icon: string; tone: string }> = {
  great: { label: "とても役に立った", icon: "🎉", tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" },
  good: { label: "役に立った", icon: "👍", tone: "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300" },
  neutral: { label: "ふつう", icon: "🙂", tone: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
  "needs-improvement": { label: "改善要望あり", icon: "💡", tone: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300" },
  bug: { label: "不具合報告", icon: "🐛", tone: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300" },
};

// Light client-side masking for any sneaky email/phone leakage
function mask(text: string): string {
  return text
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/gi, "[メール]")
    .replace(/\b0\d{1,3}-\d{2,4}-\d{3,4}\b/g, "[電話番号]")
    .replace(/\b\d{10,}\b/g, "[番号]");
}

export function PublicFeedbackList() {
  const [items, setItems] = React.useState<PublicFeedbackEntry[]>([]);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LS_KEYS.publicFeedback);
      const list: PublicFeedbackEntry[] = raw ? JSON.parse(raw) : [];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(list);
    } catch {
      setItems([]);
    }
  }, []);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        まだあなたの端末からのフィードバックはありません。学習中に表示されるフィードバックゲートからご投稿いただけます。
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const meta = CHOICE_LABELS[item.choice] ?? CHOICE_LABELS.neutral;
        return (
          <li
            key={item.id}
            className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="mb-2 flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${meta.tone}`}
              >
                <span aria-hidden>{meta.icon}</span>
                {meta.label}
              </span>
              <time className="text-[11px] text-zinc-400 dark:text-zinc-500">
                {new Date(item.createdAt).toLocaleString()}
              </time>
            </div>
            {item.comment && (
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {mask(item.comment)}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
