"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "田中 健一",
    role: "応用情報技術者 合格",
    year: "2024年秋",
    body: "AI コパイロットのおかげで、分からない問題もその場で理解できました。従来の参考書より圧倒的に頭に入ります。スキマ時間にスマホで解けるのも最高でした。",
    rating: 5,
  },
  {
    name: "佐藤 美咲",
    role: "基本情報技術者 合格",
    year: "2025年春",
    body: "復習モードで間違えた問題だけを繰り返し解いて、弱点を集中的に潰せました。2週間で正答率が60%から85%に上がりました！",
    rating: 5,
  },
  {
    name: "鈴木 雅彦",
    role: "情報セキュリティマネジメント 合格",
    year: "2024年春",
    body: "解説に「なぜその選択肢が間違いなのか」まで書いてあるのが他のサービスと違います。AIに追加質問もできるし、理解が深まりました。",
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  const [idx, setIdx] = React.useState(0);

  const prev = () => setIdx((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));

  const t = TESTIMONIALS[idx];

  return (
    <div className="relative rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        「{t.body}」
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.name}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {t.role} — {t.year}
          </p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={prev}
            className="rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="前の声"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="次の声"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === idx
                ? "w-4 bg-sky-500"
                : "w-1.5 bg-zinc-300 dark:bg-zinc-700"
            }`}
            aria-label={`${i + 1}件目`}
          />
        ))}
      </div>
    </div>
  );
}
