"use client";

import * as React from "react";
import { readUserContext } from "@/lib/storage/user-context";
import { readLastQuestion } from "@/lib/storage/last-question";

// 5 秒ループの AI 解説デモ。動画ではなく CSS アニメーションのみで実装するため
// 転送量はマークアップ + tailwind 数 KB で <500KB を確実に下回る。
// セミアクセシビリティ: prefers-reduced-motion を尊重して停止する。
// 役割: 初訪問者の信用獲得用なので、再訪 (visitCount >= 1 かつ lastSolvedAt
// が存在) では非表示にして再訪者の認知負荷を減らす (削除候補 #4)。

export function HeroAiDemo() {
  const [mounted, setMounted] = React.useState(false);
  const [hide, setHide] = React.useState(false);

  React.useEffect(() => {
    const ctx = readUserContext();
    const last = readLastQuestion();
    setHide(ctx.visitCount >= 1 && last !== null);
    setMounted(true);
  }, []);

  if (!mounted || hide) return null;

  return (
    <div
      aria-hidden="true"
      className="hero-ai-demo relative my-4 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-sky-50 to-violet-50 p-3 shadow-sm dark:border-zinc-800 dark:from-sky-950/30 dark:to-violet-950/20"
    >
      <span className="absolute right-2 top-2 rounded-full bg-zinc-900/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white dark:bg-zinc-100/90 dark:text-zinc-900">
        サンプル
      </span>
      <div className="flex items-center gap-2 text-[11px] font-semibold text-sky-700 dark:text-sky-300">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
        AI 解説デモ
      </div>
      <div className="mt-2 grid gap-2">
        <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
          Q: 公開鍵暗号方式の特徴として正しいのは?
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { k: "ア", t: "暗号化と復号で同じ鍵", correct: false },
            { k: "イ", t: "公開鍵で暗号化、秘密鍵で復号", correct: true },
            { k: "ウ", t: "鍵配送が不要なのが特徴", correct: false },
            { k: "エ", t: "共通鍵より速い", correct: false },
          ].map((c) => (
            <div
              key={c.k}
              className={`rounded-md border px-2 py-1.5 text-[11px] ${
                c.correct
                  ? "hero-ai-demo__correct border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
                  : "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
              }`}
            >
              <span className="mr-1 font-bold">{c.k}.</span>
              {c.t}
            </div>
          ))}
        </div>
        <div className="hero-ai-demo__bubble rounded-lg border border-violet-200 bg-violet-50/80 px-3 py-2 text-[11px] text-violet-900 shadow-sm dark:border-violet-900/60 dark:bg-violet-950/30 dark:text-violet-100">
          <span className="font-semibold">AI:</span> 公開鍵で<strong>暗号化</strong>し、対応する秘密鍵で<strong>復号</strong>するのが特徴と整理できます。
          <span className="hero-ai-demo__caret">▍</span>
        </div>
      </div>
    </div>
  );
}
