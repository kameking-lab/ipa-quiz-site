import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "翌週リテンション（管理画面）",
  description: "PostHog のイベントから翌週リテンションを集計するダッシュボード。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TARGET_RETENTION_RATIO = 0.3;

interface WeeklyCohort {
  cohort: string;
  cohortStart: string;
  cohortSize: number;
  returned: number;
  retention: number;
}

interface RetentionResult {
  source: "posthog" | "demo";
  weeks: WeeklyCohort[];
  fetchedAt: number;
  error?: string;
}

const DEMO_WEEKS: WeeklyCohort[] = [
  { cohort: "W-5", cohortStart: "2026-03-23", cohortSize: 612, returned: 138, retention: 0.225 },
  { cohort: "W-4", cohortStart: "2026-03-30", cohortSize: 814, returned: 199, retention: 0.244 },
  { cohort: "W-3", cohortStart: "2026-04-06", cohortSize: 922, returned: 244, retention: 0.265 },
  { cohort: "W-2", cohortStart: "2026-04-13", cohortSize: 1085, returned: 311, retention: 0.287 },
  { cohort: "W-1", cohortStart: "2026-04-20", cohortSize: 1290, returned: 396, retention: 0.307 },
];

async function fetchPostHogRetention(): Promise<RetentionResult> {
  const apiKey = process.env.POSTHOG_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = process.env.POSTHOG_HOST ?? "https://us.posthog.com";

  if (!apiKey || !projectId) {
    return { source: "demo", weeks: DEMO_WEEKS, fetchedAt: Date.now() };
  }

  try {
    const url = `${host}/api/projects/${projectId}/insights/retention/?target_entity=${encodeURIComponent(
      JSON.stringify({ id: "question_answered", type: "events" }),
    )}&returning_entity=${encodeURIComponent(
      JSON.stringify({ id: "question_answered", type: "events" }),
    )}&period=Week&total_intervals=8&retention_type=retention_first_time`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`posthog ${res.status}`);
    const data = (await res.json()) as {
      result?: Array<{
        date?: string;
        label?: string;
        values?: Array<{ count: number }>;
      }>;
    };

    const rows = data.result ?? [];
    const weeks: WeeklyCohort[] = rows
      .map((row, i) => {
        const cohortSize = row.values?.[0]?.count ?? 0;
        const week1 = row.values?.[1]?.count ?? 0;
        const retention = cohortSize > 0 ? week1 / cohortSize : 0;
        return {
          cohort: row.label ?? `週${i + 1}`,
          cohortStart: row.date ?? "",
          cohortSize,
          returned: week1,
          retention,
        };
      })
      .filter((w) => w.cohortSize > 0)
      .slice(-6);

    if (weeks.length === 0) {
      return { source: "demo", weeks: DEMO_WEEKS, fetchedAt: Date.now() };
    }
    return { source: "posthog", weeks, fetchedAt: Date.now() };
  } catch (err) {
    return {
      source: "demo",
      weeks: DEMO_WEEKS,
      fetchedAt: Date.now(),
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export default async function AdminRetentionPage() {
  const result = await fetchPostHogRetention();
  const latest = result.weeks[result.weeks.length - 1];
  const latestRetention = latest?.retention ?? 0;
  const reachedTarget = latestRetention >= TARGET_RETENTION_RATIO;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12 pt-8 sm:px-6 sm:pt-10">
      <Link
        href="/admin/stats"
        className="mb-4 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        <ArrowLeft className="h-3 w-3" /> 管理画面に戻る
      </Link>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <Badge variant="primary">
            <BarChart3 className="mr-1 h-3 w-3" />
            管理画面
          </Badge>
          <Badge variant={result.source === "posthog" ? "success" : "outline"}>
            {result.source === "posthog" ? "PostHog 実データ" : "デモデータ"}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          翌週リテンション
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          初回 <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[11px] dark:bg-zinc-800">question_answered</code> イベントを基準に、
          翌週の同イベント発生率を週次コホートで集計します。目標は <strong>30%</strong> 突破。
        </p>
      </header>

      <section className="mb-6 grid gap-3 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              直近コホート
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums">
              {(latestRetention * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {latest?.cohort ?? "-"} / 開始 {latest?.cohortStart ?? "-"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              目標達成
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold tabular-nums ${
                reachedTarget
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400"
              }`}
            >
              {reachedTarget ? "達成" : "未達"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              目標 {(TARGET_RETENTION_RATIO * 100).toFixed(0)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              直近コホートサイズ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums">
              {(latest?.cohortSize ?? 0).toLocaleString("ja-JP")}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              ユニーク回答者
            </p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            <Users className="mr-1 inline h-4 w-4" />
            週次コホート（直近6週）
          </CardTitle>
          <CardDescription>
            横軸: コホート週 / 縦軸: コホートサイズ・翌週復帰数・リテンション率
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-4">コホート</th>
                  <th className="py-2 pr-4">開始日</th>
                  <th className="py-2 pr-4 text-right">サイズ</th>
                  <th className="py-2 pr-4 text-right">翌週復帰</th>
                  <th className="py-2 pr-4 text-right">リテンション</th>
                  <th className="py-2 pr-4">推移</th>
                </tr>
              </thead>
              <tbody>
                {result.weeks.map((w) => {
                  const pct = w.retention * 100;
                  const reached = w.retention >= TARGET_RETENTION_RATIO;
                  return (
                    <tr
                      key={w.cohort}
                      className="border-b border-zinc-100 last:border-0 dark:border-zinc-900"
                    >
                      <td className="py-2 pr-4 font-medium">{w.cohort}</td>
                      <td className="py-2 pr-4 text-zinc-600 dark:text-zinc-400">{w.cohortStart}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{w.cohortSize.toLocaleString("ja-JP")}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{w.returned.toLocaleString("ja-JP")}</td>
                      <td
                        className={`py-2 pr-4 text-right font-semibold tabular-nums ${
                          reached
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {pct.toFixed(1)}%
                      </td>
                      <td className="py-2 pr-4">
                        <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                          <div
                            className={
                              reached
                                ? "h-full bg-emerald-500"
                                : "h-full bg-amber-500"
                            }
                            style={{ width: `${Math.min(100, pct)}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {result.error && (
            <p className="mt-3 text-[11px] text-amber-600 dark:text-amber-400">
              ※ PostHog 取得失敗 ({result.error}) — デモデータを表示しています。
            </p>
          )}
        </CardContent>
      </Card>

      <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
        集計仕様: 初回 question_answered の週を「コホート」として、その翌週に同じユーザーが
        question_answered を発火させた割合を「翌週リテンション」と定義。POSTHOG_API_KEY/PROJECT_ID
        が未設定の場合はデモデータを表示します。
      </p>
    </main>
  );
}
