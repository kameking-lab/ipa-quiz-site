import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ExternalLink, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "エラーモニタリング（管理）",
  description: "Sentry から取得した直近のエラーイベントを表示する管理画面。",
  robots: { index: false, follow: false },
};

// 30 秒キャッシュで頻繁な API コールを抑制
export const revalidate = 30;

interface SentryEvent {
  id: string;
  title: string;
  culprit?: string;
  level?: string;
  count?: string;
  userCount?: number;
  lastSeen?: string;
  permalink?: string;
}

interface FetchResult {
  configured: boolean;
  events: SentryEvent[];
  error?: string;
  fetchedAt: number;
}

async function fetchRecentIssues(): Promise<FetchResult> {
  const token = process.env.SENTRY_AUTH_TOKEN;
  const org = process.env.SENTRY_ORG;
  const project = process.env.SENTRY_PROJECT;
  if (!token || !org || !project) {
    return { configured: false, events: [], fetchedAt: Date.now() };
  }
  try {
    const url = `https://sentry.io/api/0/projects/${org}/${project}/issues/?statsPeriod=24h&limit=20&query=is:unresolved`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      return {
        configured: true,
        events: [],
        error: `Sentry API ${res.status}`,
        fetchedAt: Date.now(),
      };
    }
    const data = (await res.json()) as SentryEvent[];
    return { configured: true, events: data, fetchedAt: Date.now() };
  } catch (err) {
    return {
      configured: true,
      events: [],
      error: err instanceof Error ? err.message : "fetch failed",
      fetchedAt: Date.now(),
    };
  }
}

function formatMinutesAgo(ms: number): string {
  const diff = Math.floor((Date.now() - ms) / 60000);
  if (diff < 1) return "たった今";
  if (diff < 60) return `${diff} 分前`;
  return `${Math.floor(diff / 60)} 時間前`;
}

export default async function ErrorsPage() {
  const result = await fetchRecentIssues();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12 pt-8 sm:px-6">
      <header className="mb-6">
        <Badge variant="outline">管理画面</Badge>
        <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold sm:text-3xl">
          <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          エラーモニタリング
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Sentry から取得した過去 24 時間の未解決イシューを表示します。
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          最終更新: {formatMinutesAgo(result.fetchedAt)}
        </p>
      </header>

      {!result.configured ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldAlert className="h-5 w-5 text-zinc-500" />
              Sentry 未設定
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <code>SENTRY_AUTH_TOKEN</code> / <code>SENTRY_ORG</code> /{" "}
              <code>SENTRY_PROJECT</code> 環境変数が未設定のため、Sentry API
              からのイシュー取得をスキップしています。Vercel 環境変数を設定すると
              直近のエラー一覧がここに表示されます。
            </p>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              ローカル軽量フォールバックとして <code>lib/monitoring/sentry.ts</code>{" "}
              のラッパーがサーバー側 5xx を直接 Envelope API へ送信します
              （SENTRY_DSN のみで動作）。
            </p>
          </CardContent>
        </Card>
      ) : result.error ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-red-600 dark:text-red-400">
              Sentry API エラー
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{result.error}</p>
          </CardContent>
        </Card>
      ) : result.events.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              直近 24 時間に未解決のエラーはありません。
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {result.events.map((ev) => (
            <Card key={ev.id}>
              <CardContent className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-red-700 dark:bg-red-900/40 dark:text-red-300">
                      {ev.level ?? "error"}
                    </span>
                    <span className="text-[11px] text-zinc-500">{ev.lastSeen}</span>
                    {ev.count && (
                      <span className="text-[11px] text-zinc-500">{ev.count} 件</span>
                    )}
                    {typeof ev.userCount === "number" && (
                      <span className="text-[11px] text-zinc-500">{ev.userCount} ユーザー影響</span>
                    )}
                  </div>
                  <p className="break-words text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {ev.title}
                  </p>
                  {ev.culprit && (
                    <p className="mt-1 break-words text-xs text-zinc-500 dark:text-zinc-400">
                      {ev.culprit}
                    </p>
                  )}
                </div>
                {ev.permalink && (
                  <Link
                    href={ev.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 self-start text-xs text-sky-600 hover:underline dark:text-sky-400"
                  >
                    Sentry で開く
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
