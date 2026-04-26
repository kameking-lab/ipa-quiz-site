"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2, Target, ArrowRight, TrendingDown } from "lucide-react";
import { createHistoryStore } from "@/lib/storage/history";
import { Button } from "@/components/ui/button";
import { examLabel } from "@/lib/utils";

interface QuestionMeta {
  id: string;
  exam: string;
  category: string;
}

interface WeakCategory {
  exam: string;
  category: string;
  total: number;
  wrong: number;
  wrongRate: number;
  ids: string[];
}

export function WeaknessClient() {
  const [loading, setLoading] = React.useState(true);
  const [weakCategories, setWeakCategories] = React.useState<WeakCategory[]>([]);
  const [hasHistory, setHasHistory] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      const history = createHistoryStore();
      const entries = history.getAllEntries();
      if (entries.length === 0) {
        if (!cancelled) {
          setHasHistory(false);
          setLoading(false);
        }
        return;
      }
      setHasHistory(true);

      const ids = [...new Set(entries.map((e) => e.id))];
      const correctById = new Map<string, boolean>();
      for (const e of entries) {
        const prev = correctById.get(e.id);
        correctById.set(e.id, prev === false ? false : e.correct);
      }

      let meta: QuestionMeta[] = [];
      try {
        const res = await fetch("/api/questions/meta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: ids.slice(0, 1000) }),
        });
        if (res.ok) {
          const data = (await res.json()) as { meta?: QuestionMeta[] };
          meta = data.meta ?? [];
        }
      } catch {
        // fall through with empty meta
      }

      const groups = new Map<string, WeakCategory>();
      for (const m of meta) {
        const key = `${m.exam}::${m.category}`;
        const correct = correctById.get(m.id) ?? true;
        const g =
          groups.get(key) ??
          { exam: m.exam, category: m.category, total: 0, wrong: 0, wrongRate: 0, ids: [] };
        g.total += 1;
        if (!correct) {
          g.wrong += 1;
          g.ids.push(m.id);
        }
        groups.set(key, g);
      }

      const ranked = [...groups.values()]
        .filter((g) => g.wrong >= 1)
        .map((g) => ({ ...g, wrongRate: g.total > 0 ? g.wrong / g.total : 0 }))
        .sort((a, b) => b.wrong - a.wrong || b.wrongRate - a.wrongRate)
        .slice(0, 5);

      if (!cancelled) {
        setWeakCategories(ranked);
        setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
        <Loader2 className="h-4 w-4 animate-spin text-sky-500" />
        履歴を分析中…
      </div>
    );
  }

  if (!hasHistory) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
        <p className="mb-3">
          まだ回答履歴がありません。問題をいくつか解いてから戻ってきてください。
        </p>
        <Button asChild variant="primary" size="sm">
          <Link href="/">
            問題を解きにいく
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  if (weakCategories.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100">
        <p className="mb-2 font-semibold">素晴らしい！明確な苦手分野は見つかりませんでした。</p>
        <p className="text-xs">
          このまま継続して回答数を増やすと、より精度の高い苦手分析ができます。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {weakCategories.map((w, i) => (
        <article
          key={`${w.exam}-${w.category}`}
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700 dark:bg-red-900 dark:text-red-100">
              {i + 1}
            </span>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              {w.category}
            </h2>
            <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
              {examLabel(w.exam)}
            </span>
          </div>
          <div className="mb-3 flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              誤答 {w.wrong}/{w.total}（{Math.round(w.wrongRate * 100)}%）
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" variant="primary">
              <Link
                href={`/quiz?mode=random&exam=${encodeURIComponent(w.exam)}&category=${encodeURIComponent(w.category)}`}
              >
                <Target className="h-3.5 w-3.5" />
                この分野を集中演習
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href={`/quiz?mode=review`}>
                誤答だけ復習
              </Link>
            </Button>
          </div>
        </article>
      ))}

      <p className="px-2 pt-2 text-xs text-zinc-500 dark:text-zinc-400">
        ※ 苦手判定はあなたのブラウザの履歴のみから計算しています（サーバーに送信されません）。
      </p>
    </div>
  );
}
