"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Trash2, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { readEssayHistory, clearEssayHistory } from "@/lib/storage/essay-history";
import { findEssayQuestion } from "@/lib/essay/load";
import type { EssayHistoryEntry, EssayRank } from "@/lib/essay/types";
import { INDUSTRY_LABELS } from "@/lib/essay/types";
import { examLabel } from "@/lib/utils";

const RANK_VARIANT: Record<EssayRank, "success" | "warn" | "danger" | "default"> = {
  A: "success",
  B: "warn",
  C: "danger",
  fail: "danger",
};

const RANK_TEXT: Record<EssayRank, string> = {
  A: "A",
  B: "B",
  C: "C",
  fail: "不合格",
};

export function EssayHistoryView() {
  const [entries, setEntries] = useState<EssayHistoryEntry[] | null>(null);

  useEffect(() => {
     
    setEntries(readEssayHistory());
  }, []);

  const summary = useMemo(() => {
    if (!entries || entries.length === 0) return null;
    const ranks: Record<EssayRank, number> = { A: 0, B: 0, C: 0, fail: 0 };
    let totalScore = 0;
    for (const e of entries) {
      ranks[e.rank] = (ranks[e.rank] ?? 0) + 1;
      totalScore += e.totalScore;
    }
    return {
      ranks,
      avg: Math.round(totalScore / entries.length),
      count: entries.length,
    };
  }, [entries]);

  const handleClear = () => {
    if (!confirm("すべての論述添削履歴を削除します。よろしいですか？")) return;
    clearEssayHistory();
    setEntries([]);
  };

  if (entries === null) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">読み込み中…</p>;
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <FileText className="mx-auto mb-3 h-8 w-8 text-zinc-300 dark:text-zinc-700" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            まだ採点履歴がありません。
          </p>
          <Button asChild variant="primary" size="sm" className="mt-4">
            <Link href="/essay">AI 論述添削を試す</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {summary && (
        <Card>
          <CardContent className="pt-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <Stat label="総採点数" value={`${summary.count}`} />
              <Stat label="平均スコア" value={`${summary.avg}`} />
              <Stat label="A 評価" value={`${summary.ranks.A}`} accent="emerald" />
              <Stat label="B 評価" value={`${summary.ranks.B}`} accent="amber" />
              <Stat
                label="C / 不合格"
                value={`${summary.ranks.C + summary.ranks.fail}`}
                accent="red"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={handleClear}>
          <Trash2 className="h-3.5 w-3.5" /> 履歴を削除
        </Button>
      </div>

      <ul className="space-y-3">
        {entries.map((entry) => {
          const q = findEssayQuestion(entry.questionId);
          return (
            <li key={entry.id}>
              <Link
                href={q ? `/essay/${entry.exam}/${entry.questionId}` : "/essay"}
                className="block"
              >
                <Card className="transition-colors hover:border-sky-400 dark:hover:border-sky-600">
                  <CardContent className="flex items-center gap-4 pt-5">
                    <Badge variant={RANK_VARIANT[entry.rank]} className="h-10 w-12 justify-center text-base">
                      {RANK_TEXT[entry.rank]}
                    </Badge>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {examLabel(entry.exam)} · {INDUSTRY_LABELS[entry.industry]} ·{" "}
                        {formatDate(entry.gradedAt)}
                      </p>
                      <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {q?.title ?? entry.questionId}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        スコア {entry.totalScore} / 合格率予測 {entry.passProbability}%
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-zinc-400" />
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "emerald" | "amber" | "red";
}) {
  const color =
    accent === "emerald"
      ? "text-emerald-600 dark:text-emerald-400"
      : accent === "amber"
        ? "text-amber-600 dark:text-amber-400"
        : accent === "red"
          ? "text-red-600 dark:text-red-400"
          : "text-zinc-900 dark:text-zinc-100";
  return (
    <div className="text-center">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className={`mt-1 text-2xl font-bold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
