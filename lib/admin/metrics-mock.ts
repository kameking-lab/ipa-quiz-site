import type { MetricsPeriod, MetricsResponse } from "./metrics-types";

const PERIOD_FACTOR: Record<MetricsPeriod, number> = {
  "24h": 1,
  "7d": 6.4,
  "30d": 25,
  "90d": 70,
};

export function buildMockMetrics(period: MetricsPeriod): MetricsResponse {
  const f = PERIOD_FACTOR[period];
  const r = Math.round;

  return {
    generatedAt: new Date().toISOString(),
    period,
    source: "mock",
    summary: {
      dau: { value: r(420 * 1), delta: 0.084 },
      mau: { value: r(8200 * 1), delta: 0.121 },
      answers: { value: r(13_400 * f), delta: 0.092 },
      aiQuestions: { value: r(2_180 * f), delta: 0.156 },
      feedback: { value: r(38 * f), delta: -0.032 },
    },
    features: [
      { feature: "/quiz (ランダム)", uses: r(9_200 * f), uu: r(640 * Math.sqrt(f)) },
      { feature: "/modes/year (年度別)", uses: r(2_400 * f), uu: r(310 * Math.sqrt(f)) },
      { feature: "/modes/topic (分野別)", uses: r(1_950 * f), uu: r(280 * Math.sqrt(f)) },
      { feature: "/quiz/stream (連続出題)", uses: r(3_100 * f), uu: r(210 * Math.sqrt(f)) },
      { feature: "/quiz/review (復習)", uses: r(880 * f), uu: r(130 * Math.sqrt(f)) },
      { feature: "/quiz/mock-exam (模試)", uses: r(420 * f), uu: r(95 * Math.sqrt(f)) },
      { feature: "AI: 解説を詳しく", uses: r(1_240 * f), uu: r(380 * Math.sqrt(f)) },
      { feature: "AI: 用語を解説", uses: r(720 * f), uu: r(260 * Math.sqrt(f)) },
      { feature: "AI: 類題を生成", uses: r(310 * f), uu: r(140 * Math.sqrt(f)) },
      { feature: "AI: 自由対話", uses: r(950 * f), uu: r(290 * Math.sqrt(f)) },
    ],
    pages: {
      topPages: [
        { url: "/", label: "ホーム", pv: r(11_200 * f), avgDurationSec: 42, bounceRate: 0.41 },
        { url: "/quiz", label: "クイズ", pv: r(9_800 * f), avgDurationSec: 380, bounceRate: 0.18 },
        { url: "/modes/year", label: "年度別一覧", pv: r(3_400 * f), avgDurationSec: 65, bounceRate: 0.32 },
        { url: "/modes/topic", label: "分野別一覧", pv: r(2_900 * f), avgDurationSec: 72, bounceRate: 0.30 },
        { url: "/pricing", label: "料金", pv: r(1_800 * f), avgDurationSec: 58, bounceRate: 0.46 },
        { url: "/faq", label: "FAQ", pv: r(640 * f), avgDurationSec: 88, bounceRate: 0.51 },
      ],
      topExams: [
        { url: "/exam/ap", label: "応用情報技術者", pv: r(4_200 * f), avgDurationSec: 320, bounceRate: 0.21 },
        { url: "/exam/fe", label: "基本情報技術者", pv: r(3_900 * f), avgDurationSec: 295, bounceRate: 0.23 },
        { url: "/exam/ip", label: "ITパスポート", pv: r(3_200 * f), avgDurationSec: 240, bounceRate: 0.26 },
        { url: "/exam/sg", label: "情報セキュリティマネジメント", pv: r(1_400 * f), avgDurationSec: 280, bounceRate: 0.24 },
        { url: "/exam/sc", label: "情報処理安全確保支援士", pv: r(980 * f), avgDurationSec: 310, bounceRate: 0.22 },
        { url: "/exam/nw", label: "ネットワークスペシャリスト", pv: r(720 * f), avgDurationSec: 305, bounceRate: 0.23 },
        { url: "/exam/db", label: "データベーススペシャリスト", pv: r(620 * f), avgDurationSec: 298, bounceRate: 0.24 },
        { url: "/exam/pm", label: "プロジェクトマネージャ", pv: r(540 * f), avgDurationSec: 285, bounceRate: 0.27 },
        { url: "/exam/sa", label: "システムアーキテクト", pv: r(380 * f), avgDurationSec: 270, bounceRate: 0.30 },
        { url: "/exam/st", label: "ITストラテジスト", pv: r(290 * f), avgDurationSec: 265, bounceRate: 0.31 },
        { url: "/exam/sm", label: "ITサービスマネージャ", pv: r(180 * f), avgDurationSec: 250, bounceRate: 0.34 },
        { url: "/exam/au", label: "システム監査技術者", pv: r(140 * f), avgDurationSec: 245, bounceRate: 0.35 },
        { url: "/exam/es", label: "エンベデッドシステム", pv: r(95 * f), avgDurationSec: 230, bounceRate: 0.37 },
      ],
      topBlog: [
        { url: "/blog/ap-strategy", label: "応用情報合格戦略", pv: r(820 * f), avgDurationSec: 210, bounceRate: 0.45 },
        { url: "/blog/fe-cbt", label: "FE CBT 試験対策", pv: r(640 * f), avgDurationSec: 195, bounceRate: 0.48 },
        { url: "/blog/ip-1month", label: "ITパスポート1か月合格", pv: r(580 * f), avgDurationSec: 180, bounceRate: 0.50 },
        { url: "/blog/sg-renewal", label: "SG 試験制度改定", pv: r(420 * f), avgDurationSec: 170, bounceRate: 0.52 },
        { url: "/blog/afternoon-tips", label: "午後試験対策", pv: r(380 * f), avgDurationSec: 220, bounceRate: 0.43 },
        { url: "/blog/sc-routes", label: "SC 受験ルート", pv: r(290 * f), avgDurationSec: 200, bounceRate: 0.46 },
        { url: "/blog/streak", label: "学習継続の科学", pv: r(210 * f), avgDurationSec: 165, bounceRate: 0.55 },
        { url: "/blog/topic-strong", label: "分野別の弱点克服", pv: r(180 * f), avgDurationSec: 190, bounceRate: 0.49 },
        { url: "/blog/freebooks", label: "無料参考書まとめ", pv: r(140 * f), avgDurationSec: 175, bounceRate: 0.51 },
        { url: "/blog/ai-vs-doujou", label: "AI 解説の使い方", pv: r(110 * f), avgDurationSec: 160, bounceRate: 0.53 },
      ],
      topQuestions: Array.from({ length: 20 }, (_, i) => ({
        url: `/q/ap-2024a-am-q${i + 1}`,
        label: `AP 2024春 午前 Q${i + 1}`,
        pv: r((520 - i * 18) * f),
        avgDurationSec: 95 - i,
        bounceRate: 0.18 + i * 0.005,
      })),
    },
    sources: {
      sources: [
        { source: "Google 検索", sessions: r(6_400 * f), share: 0.52 },
        { source: "ダイレクト", sessions: r(2_900 * f), share: 0.24 },
        { source: "X / SNS", sessions: r(1_300 * f), share: 0.11 },
        { source: "メルマガ", sessions: r(680 * f), share: 0.06 },
        { source: "アフィリエイト", sessions: r(420 * f), share: 0.03 },
        { source: "その他", sessions: r(480 * f), share: 0.04 },
      ],
      keywords: [
        { keyword: "応用情報 過去問", impressions: r(38_000 * f), clicks: r(2_900 * f), ctr: 0.076 },
        { keyword: "基本情報 過去問", impressions: r(32_000 * f), clicks: r(2_500 * f), ctr: 0.078 },
        { keyword: "itパスポート 過去問", impressions: r(28_000 * f), clicks: r(2_100 * f), ctr: 0.075 },
        { keyword: "ipa quiz", impressions: r(8_400 * f), clicks: r(1_900 * f), ctr: 0.226 },
        { keyword: "応用情報 ai 解説", impressions: r(4_200 * f), clicks: r(680 * f), ctr: 0.162 },
        { keyword: "情報処理 過去問 サイト", impressions: r(12_000 * f), clicks: r(820 * f), ctr: 0.068 },
        { keyword: "fe cbt 模試", impressions: r(6_800 * f), clicks: r(540 * f), ctr: 0.079 },
        { keyword: "sg 過去問", impressions: r(9_200 * f), clicks: r(620 * f), ctr: 0.067 },
        { keyword: "sc 過去問", impressions: r(7_400 * f), clicks: r(490 * f), ctr: 0.066 },
        { keyword: "nw 過去問 解説", impressions: r(5_100 * f), clicks: r(380 * f), ctr: 0.074 },
      ],
    },
    flow: {
      newUsers: [
        { step: "ホーム到達", users: r(2_400 * f), rate: 1.0 },
        { step: "試験区分選択", users: r(1_680 * f), rate: 0.70 },
        { step: "クイズ開始", users: r(1_320 * f), rate: 0.55 },
        { step: "10問解答完了", users: r(820 * f), rate: 0.34 },
        { step: "AI コパイロット利用", users: r(390 * f), rate: 0.16 },
        { step: "再訪 (翌日以降)", users: r(290 * f), rate: 0.12 },
      ],
      returningUsers: [
        { step: "再訪問", users: r(1_800 * f), rate: 1.0 },
        { step: "クイズ開始", users: r(1_580 * f), rate: 0.88 },
        { step: "10問解答完了", users: r(1_240 * f), rate: 0.69 },
        { step: "AI コパイロット利用", users: r(720 * f), rate: 0.40 },
        { step: "ストリーク達成", users: r(540 * f), rate: 0.30 },
        { step: "プレミアム検討 (/pricing)", users: r(160 * f), rate: 0.09 },
      ],
    },
    conversion: {
      amazonClicks: r(180 * f),
      amazonCtr: 0.018,
      rakutenClicks: r(64 * f),
      rakutenCtr: 0.012,
      topBooks: [
        { product: "応用情報技術者 合格教本", channel: "amazon", clicks: r(48 * f), ctr: 0.022 },
        { product: "基本情報技術者 合格教本", channel: "amazon", clicks: r(36 * f), ctr: 0.020 },
        { product: "ITパスポート 教科書&問題集", channel: "amazon", clicks: r(28 * f), ctr: 0.019 },
        { product: "情報処理安全確保支援士 標準教本", channel: "amazon", clicks: r(18 * f), ctr: 0.024 },
        { product: "ネスペ 教科書", channel: "amazon", clicks: r(15 * f), ctr: 0.021 },
        { product: "応用情報 午後問題の重点対策", channel: "rakuten", clicks: r(14 * f), ctr: 0.014 },
        { product: "DB スペシャリスト 標準教本", channel: "amazon", clicks: r(12 * f), ctr: 0.020 },
        { product: "PM 合格論文の書き方", channel: "rakuten", clicks: r(10 * f), ctr: 0.012 },
        { product: "SG 公式テキスト", channel: "amazon", clicks: r(8 * f), ctr: 0.018 },
        { product: "ST 論文事例集", channel: "rakuten", clicks: r(6 * f), ctr: 0.011 },
      ],
    },
    errors: {
      totalLast24h: 23,
      errorRate: 0.0009,
      topErrors: [
        {
          message: "TypeError: Cannot read properties of undefined (reading 'choices')",
          count: 8,
          lastSeen: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
          url: "/quiz",
        },
        {
          message: "AbortError: signal is aborted without reason",
          count: 6,
          lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          url: "/api/copilot",
        },
        {
          message: "FetchError: rate limit exceeded",
          count: 5,
          lastSeen: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          url: "/api/copilot",
        },
        {
          message: "ChunkLoadError: Loading chunk app/quiz/page failed",
          count: 3,
          lastSeen: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          url: "/quiz",
        },
        {
          message: "TypeError: Failed to fetch (network)",
          count: 1,
          lastSeen: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
          url: "/api/account",
        },
      ],
    },
    insights: {
      underused: [
        {
          title: "/quiz/mock-exam (模試モード)",
          detail: "週間 UU が全機能 UU の 4% 未満。導線がホームから 2 タップ深く、訴求も弱い。",
          metric: `${Math.round(420 * f)} 回 / ${Math.round(95 * Math.sqrt(f))} UU`,
        },
        {
          title: "AI: 類題を生成",
          detail: "AI クイックアクション中で最低利用率。ボタン位置が右端で発見されにくい。",
          metric: `${Math.round(310 * f)} 回`,
        },
        {
          title: "/blog/ai-vs-doujou",
          detail: "PV/分が 0.7 と低く、TOC への導線も限定的。SEO タイトルの再検討余地あり。",
          metric: `${Math.round(110 * f)} PV`,
        },
      ],
      highChurn: [
        {
          title: "ホーム → 試験区分選択",
          detail: "30% が試験を選ばず離脱。試験未選定ユーザー向けの「迷ったら AP」訴求が必要。",
          metric: "離脱率 30%",
        },
        {
          title: "10問解答完了 → AI 利用",
          detail: "解答完了直後の AI 訴求が弱い。解説カード上部に CTA を出して反転させたい。",
          metric: "離脱率 53%",
        },
        {
          title: "/pricing 訪問 → メアド登録",
          detail: "プレミアム検討者の 91% がメアド未登録のまま離脱。フォーム位置とコピーを再検証。",
          metric: "離脱率 91%",
        },
      ],
      growing: [
        {
          title: "AI コパイロット質問数",
          detail: "前期間比 +15.6%。プレミアム以外も伸びており、無料枠の上限引き上げ検討余地。",
          metric: "+15.6%",
        },
        {
          title: "MAU",
          detail: "前期間比 +12.1%。Google 検索流入が主因（ロングテール強化が効いている）。",
          metric: "+12.1%",
        },
        {
          title: "高度試験 (NW/SC/DB) 流入",
          detail: "高度試験ページ群の合計 PV が前期間比 +18% で伸長。午後 AI 採点訴求のチャンス。",
          metric: "+18%",
        },
      ],
    },
  };
}
