"use client";

import * as React from "react";

const SITE_URL = "https://www.kakomon-ai.jp/stats";

export function StatsShareButtons({ impressions }: { impressions: number | null }) {
  const text = impressions
    ? `過去問AI は Google 検索で月 ${impressions.toLocaleString("ja-JP")} 回表示されている、無料の IPA 過去問学習サイトです。 #過去問AI #kakomon_ai`
    : `過去問AI は無料・登録不要・広告なしの IPA 過去問学習サイトです。 #過去問AI #kakomon_ai`;
  const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(SITE_URL)}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-white"
      >
        <XLogo className="h-3.5 w-3.5" />
        この透明性レポートをシェア
      </a>
      <a
        href="https://x.com/intent/follow?screen_name=kakomon_ai_jp"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
      >
        <XLogo className="h-3.5 w-3.5" />
        @kakomon_ai_jp をフォロー
      </a>
    </div>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2H21.5l-7.5 8.566L23 22h-6.844l-5.355-6.998L4.7 22H1.443l8.02-9.156L1 2h7.02l4.842 6.402L18.244 2zm-1.2 18h1.86L7.06 4H5.1l11.944 16z" />
    </svg>
  );
}
