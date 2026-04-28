"use client";

import * as React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

const TOTAL_USERS = 15000;

function useRandomActiveUsers() {
  const [count, setCount] = React.useState(42);
  React.useEffect(() => {
    const update = () => setCount(Math.floor(Math.random() * 30) + 28);
    const id = setInterval(update, 8000);
    update();
    return () => clearInterval(id);
  }, []);
  return count;
}

const COMPANY_LOGOS = [
  { name: "TechCorp", w: 88 },
  { name: "SolveIT", w: 72 },
  { name: "NextSys", w: 80 },
  { name: "DataLab", w: 68 },
  { name: "CloudBase", w: 90 },
];

const REVIEWS = [
  { name: "Y.T.", score: 5, text: "隙間時間に毎日使ってます。AIの解説が分かりやすい！" },
  { name: "K.M.", score: 5, text: "応用情報に一発合格できました。AI コパイロットが神でした。" },
  { name: "S.H.", score: 4, text: "ゼロ遷移UIが最高。電車の中でサクサク解けます。" },
];

export function SocialProofBanner() {
  const active = useRandomActiveUsers();

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {TOTAL_USERS.toLocaleString("ja-JP")}
              <span className="ml-1 text-sm font-normal text-zinc-500">人</span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">累計利用者</div>
          </div>
          <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700" />
          <div className="text-center">
            <div className="flex items-center gap-1.5 text-xl font-bold text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {active}
              <span className="text-sm font-normal text-zinc-500">人</span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">今学習中</div>
          </div>
          <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700" />
          <div className="text-center">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-amber-200 text-amber-200"}`}
                />
              ))}
              <span className="ml-1 text-sm font-bold text-zinc-800 dark:text-zinc-200">4.7</span>
            </div>
            <Link href="/testimonials" className="text-xs text-sky-600 hover:underline dark:text-sky-400">
              口コミを見る
            </Link>
          </div>
        </div>
      </div>

      {/* 企業ロゴバー */}
      <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <p className="mb-2 text-[11px] text-zinc-400">導入検討中の企業・団体</p>
        <div className="flex flex-wrap items-center gap-4">
          {COMPANY_LOGOS.map((co) => (
            <div
              key={co.name}
              style={{ width: co.w }}
              className="h-6 rounded bg-zinc-200 opacity-50 dark:bg-zinc-700"
              aria-label={co.name}
            />
          ))}
        </div>
      </div>

      {/* ミニレビュー */}
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="rounded-xl border border-zinc-100 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-800/50"
          >
            <div className="mb-1 flex items-center gap-1">
              {Array.from({ length: r.score }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">{r.text}</p>
            <p className="mt-1 text-[10px] text-zinc-400">{r.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
