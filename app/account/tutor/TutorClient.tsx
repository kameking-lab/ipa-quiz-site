"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createHistoryStore } from "@/lib/storage/history";
import { aggregateByCategory, daysUntil } from "@/lib/learning/analytics";
import { summarize as summarizeSrs } from "@/lib/learning/spaced-repetition";
import { LS_KEYS } from "@/lib/storage/keys";

const DAY_MS = 86_400_000;

interface Props {
  categoryById: Record<string, string>;
}

export function TutorClient({ categoryById }: Props) {
  return <Inner categoryById={categoryById} />;
}

function Inner({ categoryById }: Props) {
  const [report, setReport] = React.useState<ReturnType<typeof buildReport> | null>(null);

  React.useEffect(() => {
    setReport(buildReport(categoryById));
  }, [categoryById]);

  if (!report) {
    return <div className="h-64 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />;
  }

  if (report.totalAttempts < 5) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-zinc-600 dark:text-zinc-400">
          まだ十分な学習データがありません。20 問程度解くと、AI が月次レポートを生成します。
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{report.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {report.summary.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </CardContent>
      </Card>

      {report.examMessage && (
        <Card className="border-amber-300 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/30">
          <CardHeader>
            <CardTitle className="text-base text-amber-900 dark:text-amber-200">
              試験直前メッセージ
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-amber-900 dark:text-amber-100">
            {report.examMessage}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">直近30日の演習量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={report.weeklyBuckets}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0ea5e9" name="解いた問題数" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">SRS 定着度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat label="登録カード" value={`${report.srs.total}`} />
              <Stat label="本日復習" value={`${report.srs.dueNow}`} highlight={report.srs.dueNow > 0} />
              <Stat label="24h以内" value={`${report.srs.dueIn24h}`} />
              <Stat label="定着済み" value={`${report.srs.matureCount}`} />
            </div>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              ※ 定着済み = 再認間隔が 21 日以上のカード（長期記憶到達の目安）。
            </p>
            <Button asChild size="sm" variant="primary" className="mt-3">
              <Link href="/quiz?mode=review&exam=ap">復習モードを開始</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">今月の重点分野</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {report.focusCategories.length === 0 && (
              <li className="text-sm text-zinc-500 dark:text-zinc-400">
                バランス良く学習できています。
              </li>
            )}
            {report.focusCategories.map((c) => (
              <li
                key={c.category}
                className="flex items-center justify-between rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm dark:border-rose-900/60 dark:bg-rose-950/30"
              >
                <span className="font-medium">{c.category}</span>
                <Badge variant="outline">
                  正答率 {Math.round(c.accuracy * 100)}%
                </Badge>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link href="/account/dashboard?tab=weakness">弱点ヒートマップで詳細を見る</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
      <div
        className={
          highlight
            ? "text-lg font-bold text-sky-700 dark:text-sky-300"
            : "text-lg font-bold"
        }
      >
        {value}
      </div>
    </div>
  );
}

function buildReport(categoryById: Record<string, string>) {
  const history = createHistoryStore();
  const entries = history.getAllEntries();
  const stats = history.getStats();
  const lookup = new Map<string, { category: string }>();
  for (const [id, category] of Object.entries(categoryById)) {
    lookup.set(id, { category });
  }
  const categoryStats = aggregateByCategory(entries, lookup);
  const focusCategories = categoryStats
    .filter((s) => s.attempts >= 3 && s.accuracy < 0.6)
    .slice(0, 3);

  const now = Date.now();
  const monthStart = now - 30 * DAY_MS;
  const monthlyEntries = entries.filter((e) => e.at >= monthStart);
  const monthlyCorrect = monthlyEntries.filter((e) => e.correct).length;
  const monthlyAccuracy = monthlyEntries.length
    ? monthlyCorrect / monthlyEntries.length
    : 0;

  const weeklyBuckets = bucketByWeek(entries);
  const srs = summarizeSrs();

  const examDate = readExamDate();
  const examDays = examDate ? daysUntil(examDate) : null;

  const ym = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long" });
  const summary = generateSummary({
    monthlyEntries: monthlyEntries.length,
    monthlyAccuracy,
    overallAccuracy: stats.accuracy,
    overallUnique: stats.uniqueAnswered,
    focusCategoriesCount: focusCategories.length,
    matureCount: srs.matureCount,
    dueNow: srs.dueNow,
  });

  const examMessage = examDays !== null && examDays <= 30 ? buildExamMessage(examDays) : null;

  return {
    title: `${ym}の学習レポート`,
    summary,
    examMessage,
    totalAttempts: stats.total,
    focusCategories,
    weeklyBuckets,
    srs,
  };
}

function readExamDate(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(LS_KEYS.examDate) ?? "";
  } catch {
    return "";
  }
}

function bucketByWeek(entries: { at: number }[]) {
  const now = Date.now();
  const buckets: { label: string; count: number; start: number }[] = [];
  for (let i = 3; i >= 0; i--) {
    const start = now - (i + 1) * 7 * DAY_MS;
    const end = now - i * 7 * DAY_MS;
    const count = entries.filter((e) => e.at >= start && e.at < end).length;
    buckets.push({
      label: i === 0 ? "今週" : `${i}週前`,
      count,
      start,
    });
  }
  return buckets;
}

function generateSummary(input: {
  monthlyEntries: number;
  monthlyAccuracy: number;
  overallAccuracy: number;
  overallUnique: number;
  focusCategoriesCount: number;
  matureCount: number;
  dueNow: number;
}): string[] {
  const lines: string[] = [];
  lines.push(
    `今月は${input.monthlyEntries}問を演習し、月間正答率は${Math.round(input.monthlyAccuracy * 100)}%でした。通算正答率は${Math.round(input.overallAccuracy * 100)}%（ユニーク${input.overallUnique}問）です。`,
  );

  if (input.focusCategoriesCount > 0) {
    lines.push(
      `${input.focusCategoriesCount}つの分野で正答率が60%を下回っています。来月はこれらの分野を集中的に演習し、弱点ヒートマップで進捗を確認しましょう。`,
    );
  } else {
    lines.push(
      "現時点で60%を下回る分野はありません。引き続き全分野をバランスよく演習し、SRS 定着済みカードを増やしていきましょう。",
    );
  }

  if (input.dueNow > 5) {
    lines.push(
      `本日${input.dueNow}枚の SRS カードが復習タイミングです。短期間の復習が長期定着への近道です。`,
    );
  } else if (input.matureCount > 50) {
    lines.push(
      `${input.matureCount}枚のカードが長期記憶に到達しています。土台が固まってきました。`,
    );
  }

  return lines;
}

function buildExamMessage(daysLeft: number): string {
  if (daysLeft <= 0) return "本日が試験日です。深呼吸して、これまでの努力を信じましょう。";
  if (daysLeft <= 3) {
    return `試験まであと${daysLeft}日。新しい分野に手を出さず、復習モードで間違えた問題を確実に潰しましょう。前日は早めに休息を。`;
  }
  if (daysLeft <= 7) {
    return `試験まで1週間。ここからは弱点分野の演習＋過去問模試で時間配分を調整するフェーズです。`;
  }
  if (daysLeft <= 14) {
    return `試験まで2週間。重点分野の集中演習に切り替えるタイミングです。模試スコアの推移も確認しましょう。`;
  }
  return `試験まで${daysLeft}日。計画的に学習を継続しましょう。週ごとの演習量と正答率の推移を月次レポートで確認できます。`;
}
