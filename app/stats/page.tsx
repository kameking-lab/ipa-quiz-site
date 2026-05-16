import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  ExternalLink,
  Globe,
  Heart,
  LineChart,
  Megaphone,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getContentCounts } from "@/lib/stats/content-count";
import {
  fetchGsc30dTotals,
  fetchGscDailyTrend,
  fetchGscTopQueries,
} from "@/lib/stats/gsc";
import {
  fetchFeatureBreakdown,
  fetchReferrerBreakdown,
} from "@/lib/stats/posthog";
import { examLabel } from "@/lib/utils";

import {
  ContentByExamChart,
  FeatureBreakdownChart,
  ImpressionsTrendChart,
  ReferrerBreakdownChart,
} from "./StatsCharts";
import { StatsShareButtons } from "./ShareButtons";
import { ViewTracker } from "@/components/analytics/ViewTracker";

export const metadata: Metadata = {
  title: "公開統計ダッシュボード",
  description:
    "過去問AI の Google 検索表示回数・収録問題数・利用状況を公開しています。教育貢献プロジェクトの透明性レポート。",
  alternates: { canonical: "/stats" },
};

export const revalidate = 1800; // 30 min

export default async function StatsPage() {
  const counts = getContentCounts();

  const [totals, trendRaw, topQueriesRaw, featuresRaw, referrersRaw] = await Promise.all([
    fetchGsc30dTotals(),
    fetchGscDailyTrend(90),
    fetchGscTopQueries(10),
    fetchFeatureBreakdown(),
    fetchReferrerBreakdown(),
  ]);

  const impressions = totals?.impressions ?? null;
  const clicks = totals?.clicks ?? null;
  const trend = trendRaw ?? [];
  const topQueries = topQueriesRaw ?? [];
  const features = featuresRaw ?? [];
  const referrers = referrersRaw ?? [];

  const examRows = counts.byExam
    .filter((r) => r.total > 0)
    .map((r) => ({ label: examLabel(r.exam), total: r.total, code: r.exam }));

  return (
    <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <ViewTracker event="stats_viewed" />
      {/* Hero */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <Badge variant="primary">
            <Sparkles className="mr-1 h-3 w-3" />
            公開統計
          </Badge>
          <Badge variant="success">教育貢献プロジェクト</Badge>
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          過去問AI の公開統計
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          無料・登録不要・広告なしで運営している IPA 過去問学習サイト「過去問AI」の利用状況を公開しています。
          数値は Google Search Console と PostHog の実データです。
        </p>

        <div className="mt-6 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <Globe className="h-3.5 w-3.5" />
            Google 検索での表示回数（直近 30 日間）
          </div>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            {impressions !== null ? (
              <>
                <div className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                  {impressions.toLocaleString("ja-JP")}
                </div>
                <div className="pb-2 text-sm text-muted-foreground">回 / 月</div>
              </>
            ) : (
              <div className="text-2xl font-semibold text-muted-foreground sm:text-3xl">
                Search Console 連携準備中
              </div>
            )}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {impressions !== null ? (
              <>
                クリック数は {clicks?.toLocaleString("ja-JP") ?? 0} 回。
                Google 検索結果に表示された累計回数を Search Console から自動取得しています。
              </>
            ) : (
              <>
                Google Search Console の API 連携が完了次第、月間表示回数を本ページに自動表示します。
                セットアップ手順: <code className="rounded bg-muted px-1.5 py-0.5 text-[11px]">logs/gsc-setup-guide.md</code>
              </>
            )}
          </p>
          <div className="mt-5">
            <StatsShareButtons impressions={impressions} />
          </div>
        </div>
      </header>

      {/* Section 1: Content count */}
      <Section icon={<BarChart3 className="h-3.5 w-3.5" />} title="収録問題数" subtitle="リポジトリ内の問題データから自動集計">
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCard label="総収録問題" value={counts.total.toLocaleString("ja-JP")} sub="午前 + 午後 + 論文" />
          <MetricCard label="午前四択" value={counts.morning.toLocaleString("ja-JP")} sub="13 試験区分" />
          <MetricCard label="午後記述" value={counts.afternoon.toLocaleString("ja-JP")} sub="AP / DB / NW など" />
          <MetricCard label="論文" value={counts.essay.toLocaleString("ja-JP")} sub="ST / PM / SA / AU / SM" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">試験区分別の収録問題数</CardTitle>
            <CardDescription>{counts.publishedExams} 区分公開中。バーは収録量を相対比較しています。</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentByExamChart rows={examRows} />
          </CardContent>
        </Card>
      </Section>

      {/* Section 2: 90-day trend */}
      {trend.length > 0 ? (
        <Section
          icon={<LineChart className="h-3.5 w-3.5" />}
          title="Google 検索表示の推移"
          subtitle="直近 90 日間のインプレッション"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">90 日間の表示回数推移</CardTitle>
              <CardDescription>
                Google Search Console から取得した日次インプレッション。検索結果に表示された回数です。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImpressionsTrendChart trend={trend} />
            </CardContent>
          </Card>
        </Section>
      ) : null}

      {/* Section 3: Top queries (privacy-preserved) */}
      {topQueries.length > 0 ? (
        <Section
          icon={<Search className="h-3.5 w-3.5" />}
          title="検索キーワード TOP 10"
          subtitle="どんなキーワードで見つけてもらっているか（プライバシー配慮のためレンジ表示）"
        >
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <th className="px-5 py-3">#</th>
                      <th className="px-5 py-3">検索キーワード</th>
                      <th className="px-5 py-3">表示回数（30日）</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topQueries.map((q, i) => (
                      <tr key={q.query} className="border-b border-border">
                        <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{i + 1}</td>
                        <td className="px-5 py-3 font-medium">{q.query}</td>
                        <td className="px-5 py-3 text-sm text-muted-foreground">{q.impressionsBucket}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="border-t border-border px-5 py-3 text-[11px] text-muted-foreground">
                数値は「数千回」などの幅で表示し、個別ユーザーの検索行動が特定されないようにしています。
              </p>
            </CardContent>
          </Card>
        </Section>
      ) : null}

      {/* Section 4: Feature usage */}
      {features.length > 0 ? (
        <Section
          icon={<Activity className="h-3.5 w-3.5" />}
          title="機能別アクセス比率"
          subtitle="直近 30 日のページビューを機能別にバケット化"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">どの機能がよく使われているか</CardTitle>
              <CardDescription>PostHog の $pageview を URL パス別に集計しています。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
                <FeatureBreakdownChart rows={features} />
                <ul className="space-y-1.5 text-sm">
                  {features.map((f) => (
                    <li key={f.feature} className="flex items-center justify-between gap-4">
                      <span className="text-foreground">{f.feature}</span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">{f.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </Section>
      ) : null}

      {/* Section 5: Referrers */}
      {referrers.length > 0 ? (
        <Section
          icon={<Megaphone className="h-3.5 w-3.5" />}
          title="流入元の構成"
          subtitle="どこからユーザーが来ているか"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Search / Direct / Referrer / Social</CardTitle>
              <CardDescription>PostHog の $referring_domain を 4 バケットに正規化しています。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
                <ReferrerBreakdownChart rows={referrers} />
                <ul className="space-y-1.5 text-sm">
                  {referrers.map((r) => (
                    <li key={r.source} className="flex items-center justify-between gap-4">
                      <span className="text-foreground">{r.source}</span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">{r.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </Section>
      ) : null}

      {/* Section 6: Support / Engagement */}
      <Section
        icon={<Heart className="h-3.5 w-3.5" />}
        title="応援してください"
        subtitle="個人ボランティア運営のため、シェアやフィードバックが何よりの支えになります"
      >
        <Card>
          <CardContent className="grid gap-3 p-5 sm:grid-cols-2">
            <SupportLink
              icon={<MessageSquare className="h-4 w-4" />}
              title="フィードバックを送る"
              body="バグ報告・機能要望・誤答指摘などお気軽に。"
              href="/contact"
            />
            <SupportLink
              icon={<XLogo className="h-4 w-4" />}
              title="@kakomon_ai_jp をフォロー"
              body="新機能アップデートやキャンペーンを告知しています。"
              href="https://x.com/intent/follow?screen_name=kakomon_ai_jp"
              external
            />
            <SupportLink
              icon={<XLogo className="h-4 w-4" />}
              title="X でシェア"
              body="#過去問AI #kakomon_ai のタグでシェアしていただけると嬉しいです。"
              href="https://x.com/intent/tweet?text=%23%E9%81%8E%E5%8E%BB%E5%95%8FAI%20%23kakomon_ai%20%E7%84%A1%E6%96%99%E3%81%A7%20IPA%20%E9%81%8E%E5%8E%BB%E5%95%8F%E3%82%92%E5%8B%89%E5%BC%B7%E3%81%A7%E3%81%8D%E3%82%8B%E3%82%B5%E3%82%A4%E3%83%88&url=https%3A%2F%2Fwww.kakomon-ai.jp%2F"
              external
            />
            <SupportLink
              icon={<ExternalLink className="h-4 w-4" />}
              title="運営方針について"
              body="月次の透明性レポートを /transparency で公開しています。"
              href="/transparency"
            />
          </CardContent>
        </Card>
      </Section>

      {/* Section 7: Policy */}
      <Section
        icon={<ShieldCheck className="h-3.5 w-3.5" />}
        title="運営方針"
        subtitle="このサイトをどのように運営しているか"
      >
        <Card>
          <CardContent className="space-y-3 p-5 text-sm text-foreground">
            <PolicyRow label="運営形態" value="個人ボランティア運営（教育貢献プロジェクト）" />
            <PolicyRow label="利用料金" value="完全無料（全機能）" />
            <PolicyRow label="会員登録" value="不要" />
            <PolicyRow label="広告" value="掲載なし" />
            <PolicyRow
              label="個人情報"
              value="学習履歴は端末の localStorage のみ。AI 呼び出し時の IP は非可逆ハッシュとして保存。"
            />
            <PolicyRow label="出典" value="IPA 情報処理技術者試験の公開過去問（IPA-public ライセンス）" />
            <div className="pt-2">
              <Link
                href="/transparency"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                月次の運営費・意思決定レポートを見る
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </Section>

      <p className="mt-10 text-center text-[11px] text-muted-foreground">
        データソース: Google Search Console / PostHog / リポジトリ内コンテンツデータ。 30 分キャッシュ。
      </p>
    </main>
  );
}

function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <header className="mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
            {icon}
          </span>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="mt-1 ml-9 text-xs text-muted-foreground">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight text-foreground">{value}</div>
      {sub && <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

function SupportLink({
  icon,
  title,
  body,
  href,
  external,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  href: string;
  external?: boolean;
}) {
  const className =
    "block rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md";
  const content = (
    <>
      <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
        {icon}
      </div>
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function PolicyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 sm:grid-cols-[140px_1fr]">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2H21.5l-7.5 8.566L23 22h-6.844l-5.355-6.998L4.7 22H1.443l8.02-9.156L1 2h7.02l4.842 6.402L18.244 2zm-1.2 18h1.86L7.06 4H5.1l11.944 16z" />
    </svg>
  );
}
