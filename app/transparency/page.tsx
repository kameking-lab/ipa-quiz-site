import type { Metadata } from "next";
import { HISTORY_PRIVACY_COPY, AI_RATE_LIMIT_PRIVACY_COPY } from "@/lib/privacy/disclosure";
import { EDITORIAL_REVIEW_SAMPLES, EDITORIAL_REVIEW_OBSERVED_AT } from "@/data/editorial-review-scope";
import Link from "next/link";
import { AMAZON_ASSOCIATE_DISCLOSURE } from "@/data/recommended-books";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { StatsCharts } from "./StatsCharts";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { buildWebPageNode } from "@/lib/seo/structured-data";

const TRANSPARENCY_OG_URL = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
  type: "default",
  title: "運営の透明性レポート",
  subtitle: "月次更新",
  body: "API コスト・収益構造・意思決定プロセスをすべてオープンに公開。教育貢献の証として。",
}).toString()}`;

export const metadata: Metadata = {
  title: "運営の透明性レポート",
  description:
    "過去問 AI の運営方針・教材の確認範囲・取得できたコスト指標を公開しています。収益構造・アフィリエイト方針・開発ロードマップなど、教育貢献プロジェクトとして確認できる範囲と未確認事項を区別して公開。",
  alternates: { canonical: "/transparency" },
  openGraph: {
    title: "運営の透明性レポート | 過去問AI",
    description:
      "API コスト・収益構造・意思決定プロセスをすべてオープンに公開。教育貢献プロジェクトとしての月次レポート。",
    url: `${SITE_BASE_URL}/transparency`,
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    images: [{ url: TRANSPARENCY_OG_URL, width: 1200, height: 630, alt: "運営の透明性レポート" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "運営の透明性レポート | 過去問AI",
    description:
      "API コスト・収益構造・意思決定プロセスをすべてオープンに公開。教育貢献プロジェクトとしての月次レポート。",
    images: [TRANSPARENCY_OG_URL],
  },
};

const EXAM_LABEL: Record<string, string> = {
  ip: "IT パスポート",
  sg: "情報セキュリティ M",
  fe: "基本情報",
  ap: "応用情報",
  st: "ストラテジスト",
  sa: "システムアーキテクト",
  pm: "プロジェクト M",
  nw: "ネットワーク",
  db: "データベース",
  es: "エンベデッド",
  sc: "情報処理安全確保",
  sm: "サービス M",
  au: "システム監査",
};

interface MonthlySeries {
  month: string;
  users: number;
  aiCalls: number;
}

async function fetchPostHogMetrics(): Promise<MonthlySeries[]> {
  const apiKey = process.env.POSTHOG_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = process.env.POSTHOG_HOST ?? "https://us.posthog.com";
  if (!apiKey || !projectId) return [];

  try {
    const url = `${host}/api/projects/${projectId}/insights/trend/?events=${encodeURIComponent(
      JSON.stringify([
        { id: "page_view", math: "dau" },
        { id: "ai_query_sent", math: "total" },
      ]),
    )}&date_from=-150d&interval=month`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      result?: Array<{ data?: number[]; labels?: string[] }>;
    };
    const usersSeries = data.result?.[0]?.data ?? [];
    const aiSeries = data.result?.[1]?.data ?? [];
    const labels = data.result?.[0]?.labels ?? [];
    return labels.flatMap((label, i) => Number.isFinite(usersSeries[i]) && Number.isFinite(aiSeries[i]) ? [{
      month: label,
      users: usersSeries[i]!,
      aiCalls: aiSeries[i]!,
    }] : []);
  } catch {
    return [];
  }
}

const REPORTS = [
  {
    month: "2026-10",
    highlights: [
      "収録問題の独自解説と公式資料の役割、抜き取り確認の範囲を公開",
      "任意ログインによる履歴同期とIP制限用データの保存期限を説明",
      "重複する学習記事を資格別の具体的な過去問解法へ統合",
    ],
    cost: "請求・集計証跡を未確認のため、費用実績は未掲載",
    next: [
      "未確認の教材・資料の確認範囲と訂正状況を更新",
      "実施団体ごとの利用条件・必要手続きの確認状況を更新",
    ],
  },
];

export const revalidate = 300;

export default async function TransparencyPage() {
  const domains = getHomeDirectory();
  const total = domains.reduce((sum, domain) => sum + domain.totalQuestions, 0);
  const qualificationCount = domains.reduce((sum, domain) => sum + domain.qualificationCount, 0);
  const byExam = Object.entries(QUESTIONS_BY_EXAM)
    .map(([code, list]) => ({
      exam: code,
      label: EXAM_LABEL[code] ?? code.toUpperCase(),
      count: list?.length ?? 0,
    }))
    .filter((e) => e.count > 0)
    .sort((a, b) => b.count - a.count);
  const monthlySeries = await fetchPostHogMetrics();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageNode(
        `${SITE_BASE_URL}/transparency`,
        "運営の透明性レポート — 過去問AI",
        "過去問 AI の運営方針・コスト・意思決定を��次で公開しています。教育貢献プロジェクトとしての透明性レポート。",
      ),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "運営の透明性レポート",
            item: `${SITE_BASE_URL}/transparency`,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <JsonLd data={jsonLd} />
      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="inline-block py-1.5 hover:text-foreground hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            運営の透明性レポート
          </li>
        </ol>
      </nav>
      <header className="mb-6">
        <Badge variant="success">教育貢献プロジェクト</Badge>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">運営の透明性レポート</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          運営方針・確認範囲・取得できたコストや利用指標を公開しています。
          利用者から運営が見える状態を保つことが、教育貢献プロジェクトとしての説明責任だと考えています。
        </p>
        <Link
          href="/stats"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
        >
          リアルタイム公開ダッシュボード /stats を見る →
        </Link>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">運営方針（不変項目）</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>無料の学習機能と月額プランを提供する。</strong>
              受験生の経済状況に関わらず、最善の対策ツールを使えるようにします。
            </li>
            <li>
              <strong>シェア・フィードバックと月額プランで運営を支える。</strong>
              個別問題・原紙・保存済み履歴の閲覧と復習は無料です。連続演習には1日10問の無料枠と税込980円の月額プランがあります。AI コパイロットは月額対象外で、連続利用や大量送信には適正利用制限があります。
            </li>
            <li>
              <strong>意思決定を公開する。</strong>
              問題データの取り扱い・AI モデルの選定・運営費の使い道を本ページで月次公開します。
            </li>
            <li>
              <strong>個人情報は必要最小限に。</strong>
              {HISTORY_PRIVACY_COPY} {AI_RATE_LIMIT_PRIVACY_COPY}
            </li>
          </ul>
        </CardContent>
      </Card>

      <h2 className="mb-3 text-lg font-semibold">月次レポート</h2>
      <div className="space-y-4">
        {REPORTS.map((r) => (
          <Card key={r.month}>
            <CardHeader>
              <CardTitle className="text-base">{r.month} 月次レポート</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">主なアップデート</p>
                <ul className="mt-1 list-disc pl-5 text-zinc-700 dark:text-zinc-300">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">運営費の概算</p>
                <p className="mt-1 text-zinc-700 dark:text-zinc-300">{r.cost}</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">来月以降の予定</p>
                <ul className="mt-1 list-disc pl-5 text-zinc-700 dark:text-zinc-300">
                  {r.next.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section id="ai-policy" className="mt-10 scroll-mt-20">
        <h2 className="mb-3 text-lg font-semibold">AI 利用範囲と責任分界</h2>
        <Card>
          <CardContent className="space-y-3 pt-4 text-sm text-zinc-700 dark:text-zinc-300">
            <p>
              過去問 AI では、コンテンツの種別ごとに AI 活用の範囲と確認体制を以下のとおり定めています。
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>AI コパイロット（問題解説・質問応答）</strong>：
                生成AIがリアルタイムで応答します。各応答を人が事前査読する方式ではなく、
                誤りを含む可能性があります。各解説画面にその旨を明示しています。
              </li>
              <li>
                <strong>業種別合格答案サンプル（essays）</strong>：
                AI が生成した答案例を掲載しています。人による全件確認・専門家監修の証跡は提示していません。
                IPA 公式の合格答案ではなく参考用途に限定し、各ページにその旨を表示しています。
              </li>
              <li>
                <strong>ブログ記事</strong>：
                運営者が作成・編集した記事です。AI 支援を利用した場合は記事内に明示します。
              </li>
            </ul>
            <p>
              誤情報を発見された場合は{" "}
              <Link href="/contact" className="underline hover:text-foreground">
                お問い合わせフォーム
              </Link>
              よりご報告ください。確認次第、訂正または削除します。
              詳細は <Link href="/about" className="underline hover:text-foreground">/about</Link> の「AI コンテンツ取扱方針・査読体制」もご覧ください。
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="static-explanations" className="mt-10 scroll-mt-20">
        <h2 className="mb-3 text-lg font-semibold">収録問題の静的解説：制作・確認範囲・訂正</h2>
        <Card>
          <CardContent className="space-y-4 pt-4 text-sm leading-relaxed">
            <p>公式問題・図版と公式正答を出典として記録し、AIの支援を用いて学習用の独自解説を制作します。原文・必要図版・正答形式・原問ID・出典の機械検査と、解説の論理・誤答理由の内容確認は別の工程です。自動テストやAIによる照合を、人による全件査読・専門家監修の証拠とは扱いません。</p>
            <p>運営者は公開・編集・訂正を管理します。確認範囲は実施回・問題ごとに異なり、出典リンク、解説更新日、収録数だけで「全内容の確認済み」を示すものではありません。人による全件確認や専門家監修の証跡は、このページでは提示していません。</p>
            <p>以下は<time dateTime={EDITORIAL_REVIEW_OBSERVED_AT}>{EDITORIAL_REVIEW_OBSERVED_AT}</time>の独立したAIレビューによる本番の抜き取り観測です。確認していない範囲を併記し、資格全体の認定へ広げません。</p>
            <ul className="space-y-3">
              {EDITORIAL_REVIEW_SAMPLES.map(sample => <li key={sample.path} className="rounded-xl border border-border p-3">
                <Link href={sample.path} className="font-semibold underline">{sample.label}</Link>
                <p className="mt-1">確認した範囲：{sample.checked}</p>
                <p className="mt-1 text-xs text-muted-foreground">未確認・限界：{sample.limit}</p>
              </li>)}
            </ul>
            <p>訂正では、問題番号と報告内容を受け取り、対象回の公式問題・図版・最新の正答訂正を照合します。法令・診療指針等は出題時点と改訂後を区別し、影響する解説・回答形式・関連する同型問題を再点検します。確認できない点は未確認として残し、内容に欠陥がある問題は演習対象から外します。訂正した解説には実際の更新日を付けます。</p>
            <p>誤りは<Link href="/contact?type=error" className="underline">訂正窓口</Link>へ問題URL・番号・相違点を添えて報告できます。確認状況が不明な記事や教材を広告対象へ自動的に追加しません。出典表示と掲載権利の確認も別で、<Link href="/license" className="underline">資格別の利用条件</Link>をご覧ください。</p>
          </CardContent>
        </Card>
      </section>

      <section id="metrics" className="mt-10 scroll-mt-20">
        <h2 className="mb-3 text-lg font-semibold">公開メトリクス</h2>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          収録問題数・利用状況などの運営実態を公開しています。
        </p>
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCard label="公開中の問題数" value={total.toLocaleString("ja-JP")} sub="ホーム掲載資格・区分の合計" />
          <MetricCard label="資格・区分" value={qualificationCount.toLocaleString("ja-JP")} sub="ホームと同じ公開範囲" />
          <MetricCard label="利用料" value="無料枠 / 月額980円" sub="月額は税込・毎月自動更新。詳細は /billing" />
          <MetricCard label="運営スタイル" value="kameking-lab（公開運営ハンドル）" sub="教育貢献" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">試験区分別の収録問題数・月次利用状況</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlySeries.length > 0 ? (
              <StatsCharts byExam={byExam} monthlySeries={monthlySeries} />
            ) : (
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <p>
                  リアルタイムの月次利用状況は <Link href="/stats" className="underline hover:text-foreground">公開ダッシュボード /stats</Link> で見られます。
                </p>
                <p className="text-xs">
                  ※ かつてサンプル数値を表示していましたが、誤解を招かないため撤去し、
                  実データのみを表示する方針に切り替えました。
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section id="affiliate" className="mt-10 scroll-mt-20">
        <h2 className="mb-3 text-lg font-semibold">アフィリエイトリンクの使用箇所</h2>
        <Card>
          <CardContent className="space-y-3 pt-4 text-sm text-zinc-700 dark:text-zinc-300">
            <p>
              本サービスでは以下のページの一部にアフィリエイトリンクを使用しています。{AMAZON_ASSOCIATE_DISCLOSURE}
              すべてのアフィリエイトリンクには <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">rel=&quot;sponsored&quot;</code> 属性を付与し、リンク近くに「PR」と明示しています。
            </p>
            <p>
              Amazonの紹介タグ付きリンクは、ITパスポートの推薦書一覧・試験トップ・2011年度秋期の午前問1に掲載しています。
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>/recommended-books/[試験区分]</strong> — 書籍カードの「Amazonで見る」「楽天で見る」ボタン（Amazon 商品リンク / 楽天 <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">hb.afl.rakuten.co.jp</code> 経由）
              </li>
              <li>
                <strong>/[試験区分]（試験区分別トップページ）</strong> — おすすめ参考書一覧の「Amazon →」ボタン（Amazon 商品リンク）
              </li>
              <li>
                <strong>クイズ解説ページ内 InlineBookHint</strong> — 問題解説下部の参考書ヒント「Amazon で見る」リンク（Amazon 商品リンク）
              </li>
            </ul>
            <p>
              紹介する書籍の選定はアフィリエイト報酬の有無に関係なく、受験者にとっての学習効果を優先しています。
              アフィリエイト収入は教育コンテンツの維持・改善に充てています。
              詳細は{" "}
              <Link href="/privacy#8" className="underline hover:text-foreground">
                プライバシーポリシー Section 8
              </Link>
              {" "}もご覧ください。
            </p>
          </CardContent>
        </Card>
      </section>

      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        運営者情報は <Link href="/operator" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">/operator</Link>。
      </p>
    </main>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
        <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
        {sub && <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">{sub}</div>}
      </CardContent>
    </Card>
  );
}
