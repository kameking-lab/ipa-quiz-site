import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, Lock, Shield, Trophy, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  EXAM_USAGE_METRIC_KEYS,
  EXAM_USAGE_RANGE_OPTIONS,
  fetchExamUsageData,
  isExamUsageConfigured,
  type ExamUsageMetricKey,
  type ExamUsageRange,
  type QualificationUsageRow,
} from "@/lib/admin/exam-usage/posthog";

export const metadata: Metadata = {
  title: "資格別 e ラーニング利用状況（管理画面）",
  description: "資格ごとの回答数ランキング・閲覧数・AI質問数。Basic Auth 保護。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams?: Promise<{ range?: string; sort?: string }>;
}

const SOURCE_LABEL: Record<QualificationUsageRow["source"], string> = {
  ipa: "IPA試験",
  "qualification-catalog": "外部資格",
  "exam-library-hub": "公表試験問題ライブラリ",
};

const METRIC_LABEL: Record<ExamUsageMetricKey, string> = {
  pageViews: "閲覧数",
  quizStarted: "クイズ開始",
  questionAnswered: "問題回答",
  quizCompleted: "クイズ完了",
  aiQuerySent: "AI質問",
  copilotResponseReceived: "AI応答完了",
  essayViewed: "論文問題閲覧",
  blogViewed: "ブログ閲覧",
  examLibraryAnswered: "ライブラリ回答",
  examLibraryAiQuery: "ライブラリAI質問",
};

function parseRange(raw: string | undefined): ExamUsageRange {
  if (raw === "all") return "all";
  const n = Number(raw);
  return n === 7 || n === 30 || n === 90 ? n : 30;
}

function rangeLabel(range: ExamUsageRange): string {
  return range === "all" ? "全期間" : `${range}日`;
}

function rangeHref(range: ExamUsageRange, sort: string): string {
  return `/admin/exam-usage?range=${range}&sort=${sort}`;
}

function metricSortHref(range: ExamUsageRange, sort: string): string {
  return `/admin/exam-usage?range=${range}&sort=${sort}`;
}

function fmtCount(n: number): string {
  return n.toLocaleString("ja-JP");
}

function ChangeBadge({ pct }: { pct: number | null }) {
  if (pct === null) return <span className="text-muted-foreground">—</span>;
  const positive = pct > 0;
  const zero = pct === 0;
  return (
    <span
      className={
        zero
          ? "text-muted-foreground"
          : positive
            ? "font-semibold text-emerald-700 dark:text-emerald-300"
            : "font-semibold text-red-700 dark:text-red-300"
      }
    >
      {zero ? "±0%" : `${positive ? "+" : ""}${pct}%`}
    </span>
  );
}

function sortRowsByAnswered(rows: QualificationUsageRow[]): QualificationUsageRow[] {
  return [...rows].sort((a, b) => {
    const av = a.answered.status === "measured" ? (a.answered.total ?? 0) : -1;
    const bv = b.answered.status === "measured" ? (b.answered.total ?? 0) : -1;
    if (av !== bv) return bv - av;
    return a.label.localeCompare(b.label, "ja");
  });
}

function sortRowsByMetric(rows: QualificationUsageRow[], metric: ExamUsageMetricKey): QualificationUsageRow[] {
  return [...rows].sort((a, b) => {
    const ac = a.metrics[metric];
    const bc = b.metrics[metric];
    const av = ac.status === "measured" ? (ac.count ?? 0) : -1;
    const bv = bc.status === "measured" ? (bc.count ?? 0) : -1;
    if (av !== bv) return bv - av;
    return a.label.localeCompare(b.label, "ja");
  });
}

export default async function AdminExamUsagePage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const range = parseRange(params.range);
  const requestedSort = params.sort ?? "answered";
  const metricSort = (EXAM_USAGE_METRIC_KEYS as readonly string[]).includes(requestedSort)
    ? (requestedSort as ExamUsageMetricKey)
    : null;

  const configured = isExamUsageConfigured();
  const data = await fetchExamUsageData(range);

  const rankingRows = sortRowsByAnswered(data.rows);
  const detailRows = metricSort ? sortRowsByMetric(data.rows, metricSort) : sortRowsByAnswered(data.rows);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-8 sm:px-6">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <Badge variant="primary">
              <Shield className="mr-1 h-3 w-3" />
              管理画面
            </Badge>
            <Badge variant="success">
              <Lock className="mr-1 h-3 w-3" />
              Basic Auth
            </Badge>
            {configured ? (
              <Badge variant="success">PostHog 連携中</Badge>
            ) : (
              <Badge variant="warn">PostHog 未設定</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-sky-500" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              資格別 e ラーニング利用状況
            </h1>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            資格ごとの回答数ランキング（クイズ・/q/ 個別問題・公表試験問題ライブラリの合算）を中心に、
            閲覧数・AI質問数・完了数を確認できます。PostHog HogQL API 集計（サーバ側 20 分キャッシュ）。
          </p>
        </div>
      </header>

      <nav aria-label="期間切替" className="mb-6 flex flex-wrap gap-2">
        {EXAM_USAGE_RANGE_OPTIONS.map((opt) => (
          <Link
            key={String(opt)}
            href={rangeHref(opt, requestedSort)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              opt === range
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            {rangeLabel(opt)}
          </Link>
        ))}
      </nav>

      {data.source === "unavailable" ? (
        <div className="rounded-2xl border border-amber-300/60 bg-amber-50 p-6 text-sm leading-6 text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-100">
          <p className="font-bold">データを取得できませんでした。</p>
          <p className="mt-1">
            {data.reason === "not_configured"
              ? "POSTHOG_API_KEY / POSTHOG_PROJECT_ID が設定されていません。Vercel の環境変数を確認してください。"
              : "PostHog への問い合わせに失敗しました（タイムアウトまたはAPIエラー）。時間をおいて再読み込みしてください。"}
          </p>
          <p className="mt-2 text-xs text-amber-800/80 dark:text-amber-200/80">
            0件で表示を偽装することはありません（欠測を0にしない方針）。
          </p>
        </div>
      ) : (
        <>
          <section aria-labelledby="ranking-heading" className="mb-10">
            <h2 id="ranking-heading" className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
              <Trophy className="h-5 w-5 text-amber-500" aria-hidden="true" />
              回答数ランキング（{rangeLabel(range)}）
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-left">
                    <th className="px-3 py-2 font-semibold">順位</th>
                    <th className="px-3 py-2 font-semibold">資格</th>
                    <th className="px-3 py-2 text-right font-semibold">回答数</th>
                    <th className="px-3 py-2 text-right font-semibold">
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" aria-hidden="true" />
                        ユニーク回答者
                      </span>
                    </th>
                    <th className="px-3 py-2 text-right font-semibold">前期間比</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingRows.map((row, i) => (
                    <tr key={row.key} className="border-b border-border/60 last:border-0">
                      <td className="px-3 py-2 text-muted-foreground">{row.answered.status === "measured" ? i + 1 : "—"}</td>
                      <td className="px-3 py-2">
                        <span className="font-medium text-foreground">{row.label}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{SOURCE_LABEL[row.source]}</span>
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        {row.answered.status === "measured" ? (
                          fmtCount(row.answered.total ?? 0)
                        ) : (
                          <span className="text-muted-foreground">未計測</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        {row.answered.status === "measured" && row.answered.uniqueUsers !== null
                          ? fmtCount(row.answered.uniqueUsers)
                          : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        <ChangeBadge pct={row.answered.status === "measured" ? row.answered.changePct : null} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              「未計測」はこの資格にまだ回答イベントの計測経路が無いことを表します（0件の実測とは区別しています）。
              前期間比は直前の同じ長さの期間との比較です。全期間表示では前期間比は出しません。
            </p>
          </section>

          <details className="rounded-2xl border border-border p-4">
            <summary className="cursor-pointer text-lg font-bold text-foreground">
              <span className="inline-flex items-center gap-2">
                <Gauge className="h-5 w-5 text-sky-500" aria-hidden="true" />
                その他の指標（閲覧数・AI質問数など）
              </span>
            </summary>
            <nav aria-label="指標ソート" className="my-3 flex flex-wrap gap-2 text-xs">
              {EXAM_USAGE_METRIC_KEYS.map((key) => (
                <Link
                  key={key}
                  href={metricSortHref(range, key)}
                  className={`rounded-full border px-3 py-1 font-semibold transition ${
                    metricSort === key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {METRIC_LABEL[key]}順
                </Link>
              ))}
            </nav>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[900px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-left">
                    <th className="px-3 py-2 font-semibold">資格</th>
                    {EXAM_USAGE_METRIC_KEYS.map((key) => (
                      <th key={key} className="px-3 py-2 text-right font-semibold">
                        {METRIC_LABEL[key]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {detailRows.map((row) => (
                    <tr key={row.key} className="border-b border-border/60 last:border-0">
                      <td className="px-3 py-2">
                        <span className="font-medium text-foreground">{row.label}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{SOURCE_LABEL[row.source]}</span>
                      </td>
                      {EXAM_USAGE_METRIC_KEYS.map((key) => {
                        const cell = row.metrics[key];
                        return (
                          <td key={key} className="px-3 py-2 text-right tabular-nums">
                            {cell.status === "measured" ? fmtCount(cell.count ?? 0) : <span className="text-muted-foreground">未計測</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          <p className="mt-6 text-xs text-muted-foreground">
            資格に紐付かなかった page_view: {fmtCount(data.unattributedPageViews)} 件（トップページ・ブログ一覧など）。
            <br />
            取得時刻: <time dateTime={data.generatedAt}>{data.generatedAt}</time> / キャッシュ時刻:{" "}
            <time dateTime={data.cachedAt}>{data.cachedAt}</time>
          </p>
        </>
      )}
    </main>
  );
}
