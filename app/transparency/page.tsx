import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
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
    "過去問 AI の運営方針・API コスト・意思決定プロセスを月次で公開しています。収益構造・アフィリエイト方針・開発ロードマップなど、教育貢献プロジェクトとして運営のすべてをオープンに。",
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
    return labels.map((label, i) => ({
      month: label,
      users: usersSeries[i] ?? 0,
      aiCalls: aiSeries[i] ?? 0,
    }));
  } catch {
    return [];
  }
}

const REPORTS = [
  {
    month: "2026-05",
    highlights: [
      "AI 解説 disclaimer の視認性向上（ExplanationCard の文字サイズ拡大・枠線追加）",
      "AI コパイロット応答末尾に責任分界注記を追加",
      "/about に「AI コンテンツ取扱方針・査読体制」セクションを新設",
      "/transparency に AI 利用範囲・責任分界セクションを追加（E-E-A-T 強化）",
    ],
    cost: "AI 利用費 集計中（月末公開予定）",
    next: [
      "PostHog 連携による /stats の実データ化",
      "blog 記事の年次自動更新ロジック整備",
    ],
  },
  {
    month: "2026-04",
    highlights: [
      "全機能無料化を完了し、課金システムを完全非表示化",
      "フィードバック駆動型のレート制限に切り替え（初回 10 回 + フィードバック投稿後ほぼ無制限）",
      "公開フィードバック・応援・透明性ページを公開",
    ],
    cost: "AI 利用費 約 ¥3,800（Gemini Flash-Lite）",
    next: [
      "API メトリクス連携で /stats を実データ化",
      "@vercel/og を導入して問題別 OGP 自動生成",
      "AI モデレーション（スパム/個人情報チェック）の強化",
    ],
  },
  {
    month: "2026-03",
    highlights: [
      "全 13 試験区分の問題データ統合",
      "午後 AI 採点機能を全試験区分で公開",
      "解説リファクタ（3 層構造）を AP 2024 秋分まで完了",
    ],
    cost: "AI 利用費 約 ¥2,400",
    next: [
      "解説リファクタを残り 12,094 問に展開",
      "教育貢献プロジェクト体裁への全面ピボット",
    ],
  },
];

export const revalidate = 300;

export default async function TransparencyPage() {
  const total = ALL_QUESTIONS.length;
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
          月次で運営方針・コスト・意思決定を公開しています。
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
              <strong>全機能を無料で公開し続ける。</strong>
              受験生の経済状況に関わらず、最善の対策ツールを使えるようにします。
            </li>
            <li>
              <strong>運営コストはシェア・フィードバックで支える。</strong>
              金銭的負担はお願いしません。AI 利用は初回 10 回 + フィードバック投稿後ほぼ無制限です。
            </li>
            <li>
              <strong>意思決定を公開する。</strong>
              問題データの取り扱い・AI モデルの選定・運営費の使い道を本ページで月次公開します。
            </li>
            <li>
              <strong>個人情報は必要最小限に。</strong>
              学習履歴は localStorage、AI 呼び出しは IP の非可逆ハッシュのみ保持します。
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
                生成 AI がリアルタイムで応答します。自動的な安全審査を通過していますが、
                誤りを含む可能性があります。各解説画面にその旨を明示しています。
              </li>
              <li>
                <strong>業種別合格答案サンプル（essays）</strong>：
                AI が生成した答案例を運営者が確認・公開しています。
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

      <section id="metrics" className="mt-10 scroll-mt-20">
        <h2 className="mb-3 text-lg font-semibold">公開メトリクス</h2>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          収録問題数・利用状況などの運営実態を公開しています。
        </p>
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCard label="総収録問題" value={total.toLocaleString("ja-JP")} sub="全試験区分合計" />
          <MetricCard label="試験区分" value="13 区分" sub="IP / SG / FE / AP / ほか" />
          <MetricCard label="利用料" value="¥0" sub="全機能無料" />
          <MetricCard label="運営スタイル" value="ボランティア有志による運営" sub="教育貢献" />
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
              本サービスでは以下のページに Amazon アソシエイト・楽天アフィリエイトのリンクを使用しています。
              すべてのアフィリエイトリンクには <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">rel=&quot;sponsored&quot;</code> 属性を付与し、リンク近くに「PR」と明示しています。
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>/recommended-books/[試験区分]</strong> — 書籍カードの「Amazonで見る」「楽天で見る」ボタン（Amazon アソシエイト <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">safeaisite22-22</code> / 楽天 <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">hb.afl.rakuten.co.jp</code> 経由）
              </li>
              <li>
                <strong>/[試験区分]（試験区分別トップページ）</strong> — おすすめ参考書一覧の「Amazon →」ボタン（Amazon アソシエイト）
              </li>
              <li>
                <strong>クイズ解説ページ内 InlineBookHint</strong> — 問題解説下部の参考書ヒント「Amazon で見る」リンク（Amazon アソシエイト）
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
