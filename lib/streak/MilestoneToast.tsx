"use client";

import * as React from "react";
import { Flame, Sparkles, Trophy, X, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StreakMilestone } from "./core";

const SHARE_ENABLED_MILESTONES: ReadonlySet<number> = new Set([7, 30, 100]);
const SITE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://ipa-quiz-site.vercel.app";

function buildShareUrl(milestone: StreakMilestone): string {
  const text =
    milestone === 100
      ? `IPA 過去問 AI で 100 日連続学習を達成しました🔥 #IPA過去問AI #100日チャレンジ`
      : milestone === 30
        ? `IPA 過去問 AI で 30 日連続学習を達成しました🔥 #IPA過去問AI`
        : `IPA 過去問 AI で 1 週間連続学習を達成しました🔥 #IPA過去問AI`;
  const url = `${SITE_URL}/og/streak/${milestone}`;
  return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

const MESSAGES: Record<StreakMilestone, { title: string; body: string }> = {
  3: {
    title: "3日連続達成！スタートダッシュ",
    body: "3日続くと習慣化の入口。このまま1週間目指しましょう！",
  },
  7: {
    title: "1週間達成！",
    body: "1週間の継続は本物です。学習リズムが見えてきました。",
  },
  14: {
    title: "2週間マスター！",
    body: "もう立派な合格者マインド。残りの試験範囲を攻めていきましょう。",
  },
  30: {
    title: "1ヶ月達成！",
    body: "1ヶ月続けられる人は全体の数％。合格はもう目前です。",
  },
  100: {
    title: "100日の猛者！",
    body: "100日の継続は圧巻。AI コパイロットも全力でサポートします。",
  },
};

export function MilestoneToast({
  milestone,
  onClose,
}: {
  milestone: StreakMilestone;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const t = window.setTimeout(onClose, 8000);
    return () => window.clearTimeout(t);
  }, [onClose]);

  const msg = MESSAGES[milestone];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-md"
    >
      <div className="relative overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 p-4 shadow-xl dark:border-orange-900/60 dark:from-orange-950/70 dark:via-amber-950/60 dark:to-rose-950/70">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 rounded-lg p-1 text-zinc-500 transition-colors hover:bg-white/40 dark:text-zinc-400 dark:hover:bg-black/20"
          aria-label="閉じる"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3 pr-6">
          <div className="rounded-xl border border-orange-300 bg-white/60 p-2 dark:border-orange-900 dark:bg-black/20">
            {milestone >= 30 ? (
              <Trophy className={cn("h-6 w-6 text-amber-500")} aria-hidden="true" />
            ) : (
              <Flame className={cn("h-6 w-6 text-orange-500")} aria-hidden="true" />
            )}
          </div>
          <div className="flex-1">
            <div className="mb-0.5 flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-200">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              <span>マイルストーン達成</span>
            </div>
            <div className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
              {msg.title}
            </div>
            <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">{msg.body}</p>
            {SHARE_ENABLED_MILESTONES.has(milestone) && (
              <a
                href={buildShareUrl(milestone)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                <Share2 className="h-3 w-3" aria-hidden="true" />
                X でシェアする
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
