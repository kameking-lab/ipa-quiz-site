import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Globe,
  Lock,
  MessageSquare,
  Rocket,
  Search,
  Send,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "ローンチ監視ダッシュボード（管理画面）",
  description: "ローンチ初日 24 時間の監視ハブ。Basic Auth 保護。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface InternalLink {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ExternalLink {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const INTERNAL_DASHBOARDS: InternalLink[] = [
  {
    href: "/admin/api-usage",
    title: "API 使用量ダッシュボード",
    description: "LLM API 呼出回数・推定コスト・IP 別ランキング。月 5 万円上限の監視に必須。",
    icon: <Activity className="h-5 w-5 text-emerald-500" />,
  },
  {
    href: "/admin/funnel",
    title: "ファネルダッシュボード",
    description: "クイズ・論文・ブログ動線の離脱ポイント。PostHog 連携。",
    icon: <BarChart3 className="h-5 w-5 text-sky-500" />,
  },
  {
    href: "/admin/metrics",
    title: "メトリクス概況",
    description: "DAU・解答数・流入元・コンバージョン・エラーを 1 画面で。",
    icon: <BarChart3 className="h-5 w-5 text-indigo-500" />,
  },
  {
    href: "/admin/deployment-status",
    title: "デプロイ状況",
    description: "Vercel 本番デプロイ・PR 反映状態・ビルドクォータ監視。",
    icon: <Rocket className="h-5 w-5 text-amber-500" />,
  },
  {
    href: "/admin/feedback",
    title: "フィードバック受信箱",
    description: "/api/feedback POST 経由のユーザー報告を一覧表示。",
    icon: <MessageSquare className="h-5 w-5 text-rose-500" />,
  },
  {
    href: "/admin/errors",
    title: "エラー監視",
    description: "Sentry / クライアントエラーの集計表示。",
    icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
  },
];

const EXTERNAL_LINKS: ExternalLink[] = [
  {
    href: "https://twitter.com/kakomon_ai_jp",
    title: "Twitter @kakomon_ai_jp",
    description: "公式アカウントタイムライン。リツイート・引用 RT・リプライ監視。",
    icon: <Send className="h-5 w-5 text-sky-400" />,
  },
  {
    href: "https://search.google.com/search-console",
    title: "Google Search Console",
    description: "URL Inspection・Coverage・Performance。Day-0 朝 09:00 に第一優先 8 URL submit。",
    icon: <Search className="h-5 w-5 text-blue-500" />,
  },
  {
    href: "https://www.bing.com/webmasters",
    title: "Bing Webmaster Tools",
    description: "sitemap 再 submit・URL Submission・Site Activity 監視。",
    icon: <Search className="h-5 w-5 text-cyan-500" />,
  },
  {
    href: "https://posthog.com",
    title: "PostHog ダッシュボード",
    description: "リアルタイムイベント・ユーザーパス・カスタムインサイト。",
    icon: <BarChart3 className="h-5 w-5 text-amber-400" />,
  },
  {
    href: "https://sentry.io",
    title: "Sentry プロジェクト",
    description: "本番エラー詳細・スタックトレース・パフォーマンス監視。",
    icon: <AlertTriangle className="h-5 w-5 text-purple-500" />,
  },
  {
    href: "https://vercel.com/dashboard",
    title: "Vercel ダッシュボード",
    description: "deploy 状態・関数ログ・トラフィック概況・帯域使用量。",
    icon: <Rocket className="h-5 w-5 text-foreground" />,
  },
];

function envStatus(): {
  posthog: boolean;
  sentry: boolean;
  indexnow: boolean;
  kv: boolean;
} {
  return {
    posthog: Boolean(process.env.POSTHOG_API_KEY && process.env.POSTHOG_PROJECT_ID),
    sentry: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN),
    indexnow: Boolean(process.env.INDEXNOW_KEY),
    kv: Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN),
  };
}

export default function AdminLaunchMonitoringPage() {
  const env = envStatus();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-8 sm:px-6">
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <Badge variant="primary">
            <Shield className="mr-1 h-3 w-3" />
            管理画面
          </Badge>
          <Badge variant="success">
            <Lock className="mr-1 h-3 w-3" />
            Basic Auth
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-sky-500" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            ローンチ監視ダッシュボード
          </h1>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          ローンチ初日 24 時間の監視ハブ。各種ダッシュボードと外部ツールへの導線、
          観測可能性 (observability) の環境変数設定状況を集約します。
          初日の異常検知時は logs/launch-day-monitoring-checklist.md の対応手順を参照してください。
        </p>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            観測基盤の設定状況
          </CardTitle>
          <CardDescription>
            ローンチ前に下記 4 つが設定済であることを確認してください。未設定でもローンチは可能ですが、
            初日トラブル時の調査が困難になります。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <EnvRow
              label="PostHog (POSTHOG_API_KEY + POSTHOG_PROJECT_ID)"
              configured={env.posthog}
              guidance="未設定時は /admin/metrics・/admin/funnel がモックデータ表示になります。"
            />
            <EnvRow
              label="Sentry (SENTRY_DSN / NEXT_PUBLIC_SENTRY_DSN)"
              configured={env.sentry}
              guidance="未設定時は本番エラーが集約されません。Sentry プロジェクトを作成して DSN を Vercel に登録してください。"
            />
            <EnvRow
              label="IndexNow (INDEXNOW_KEY)"
              configured={env.indexnow}
              guidance="Bing/Yandex への即時 ping 用。logs/bing-sitemap-resubmit-procedure.md 参照。"
            />
            <EnvRow
              label="Upstash KV (KV_REST_API_URL + KV_REST_API_TOKEN)"
              configured={env.kv}
              guidance="未設定時は rate-limit が in-memory フォールバック (cold start でリセット)。"
            />
          </div>
        </CardContent>
      </Card>

      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
          <Activity className="h-5 w-5 text-foreground" />
          内部ダッシュボード
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {INTERNAL_DASHBOARDS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="shrink-0 pt-0.5">{link.icon}</div>
              <div className="min-w-0">
                <div className="font-medium text-foreground">{link.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
          <Globe className="h-5 w-5 text-foreground" />
          外部監視ツール
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="shrink-0 pt-0.5">{link.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 font-medium text-foreground">
                  <span className="truncate">{link.title}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">24 時間監視チェックリスト</CardTitle>
          <CardDescription>
            ローンチ後 24 時間は 4 時間ごとに以下を確認します。詳細は
            logs/launch-day-monitoring-checklist.md を参照してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm leading-relaxed text-foreground">
            <li>
              <strong>本番サイト 200 確認:</strong> /, /about, /transparency, /q/ap, /essays/sc が
              200 で開く
            </li>
            <li>
              <strong>API コスト確認:</strong> /admin/api-usage で当日合計が 1000 円未満
            </li>
            <li>
              <strong>エラー確認:</strong> /admin/errors または Sentry でクリティカル 0 件
            </li>
            <li>
              <strong>フィードバック確認:</strong> /admin/feedback で未対応 5 件以下
            </li>
            <li>
              <strong>Twitter 反応確認:</strong> @kakomon_ai_jp の RT・引用 RT・リプライ
            </li>
            <li>
              <strong>note PV 確認:</strong> note ダッシュボードで投稿 PV・スキ数
            </li>
            <li>
              <strong>GSC Coverage 確認:</strong> Index 化進捗 (24 時間後に第一優先 5/8 件以上)
            </li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}

function EnvRow({
  label,
  configured,
  guidance,
}: {
  label: string;
  configured: boolean;
  guidance: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
      {configured ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
      ) : (
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
      )}
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          {configured ? "設定済" : "未設定"} — {guidance}
        </div>
      </div>
    </div>
  );
}
