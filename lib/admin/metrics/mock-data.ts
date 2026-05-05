import type {
  ConversionSection,
  ErrorSection,
  FeatureUsageSection,
  FlowSection,
  InsightSection,
  KpiValue,
  MetricsRangeMeta,
  MetricsResponse,
  PageAccessSection,
  SummarySection,
  TrafficSection,
} from "./types";
import { dateSeries, rangeSpanDays } from "./range";

function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function seedFromString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function kpi(current: number, previous: number, unit?: string): KpiValue {
  return { current: Math.round(current), previous: Math.round(previous), unit };
}

function buildSummary(meta: MetricsRangeMeta, rand: () => number): SummarySection {
  const span = rangeSpanDays(meta);
  const dates = dateSeries(meta.from, meta.to);

  const baseDau = 320 + Math.floor(rand() * 60);
  const series = dates.map((date, idx) => {
    const dow = new Date(date + "T00:00:00Z").getUTCDay();
    const weekdayBoost = dow === 0 || dow === 6 ? 0.85 : 1.05;
    const trend = 1 + idx * 0.004;
    const noise = 0.85 + rand() * 0.3;
    const dau = Math.round(baseDau * weekdayBoost * trend * noise);
    const answers = Math.round(dau * (4.2 + rand() * 1.4));
    return { date, dau, answers };
  });

  const totalAnswers = series.reduce((a, b) => a + b.answers, 0);
  const avgDau = series.reduce((a, b) => a + b.dau, 0) / series.length;
  const mau = Math.round(avgDau * 11 + rand() * 200);
  const aiQuestions = Math.round(totalAnswers * (0.18 + rand() * 0.05));
  const feedback = Math.round(span * (12 + rand() * 8));

  const prevFactor = 0.86 + rand() * 0.18;

  return {
    dau: kpi(avgDau, avgDau * prevFactor, "人/日"),
    mau: kpi(mau, mau * (0.9 + rand() * 0.1), "人"),
    answers: kpi(totalAnswers, totalAnswers * prevFactor, "問"),
    aiQuestions: kpi(aiQuestions, aiQuestions * (0.78 + rand() * 0.18), "回"),
    feedback: kpi(feedback, feedback * (0.85 + rand() * 0.2), "件"),
    series,
  };
}

function buildFeatures(meta: MetricsRangeMeta, rand: () => number): FeatureUsageSection {
  const span = rangeSpanDays(meta);
  const base = (factor: number) => Math.round(span * factor * (0.85 + rand() * 0.3));
  const features = [
    { feature: "クイズ（通常）", path: "/quiz", uses: base(2200), uniqueUsers: base(380) },
    { feature: "ストリーム学習", path: "/quiz?mode=stream", uses: base(900), uniqueUsers: base(180) },
    { feature: "復習モード", path: "/quiz?mode=review", uses: base(560), uniqueUsers: base(140) },
    { feature: "模試モード", path: "/modes/mock-exam", uses: base(220), uniqueUsers: base(80) },
    { feature: "AI コパイロット（用語解説）", path: "/api/copilot#explain", uses: base(720), uniqueUsers: base(210) },
    { feature: "AI コパイロット（選択肢分析）", path: "/api/copilot#choices", uses: base(540), uniqueUsers: base(180) },
    { feature: "AI コパイロット（類題生成）", path: "/api/copilot#similar", uses: base(310), uniqueUsers: base(120) },
    { feature: "AI コパイロット（誤答分析）", path: "/api/copilot#wrong", uses: base(280), uniqueUsers: base(110) },
    { feature: "年度別一覧", path: "/modes/year", uses: base(640), uniqueUsers: base(220) },
    { feature: "分野別一覧", path: "/modes/topic", uses: base(420), uniqueUsers: base(160) },
  ];
  return { features };
}

const EXAM_PAGES: Array<{ url: string; title: string }> = [
  { url: "/exam/ap", title: "応用情報技術者" },
  { url: "/exam/fe", title: "基本情報技術者" },
  { url: "/exam/ip", title: "ITパスポート" },
  { url: "/exam/sg", title: "情報セキュリティマネジメント" },
  { url: "/exam/sc", title: "情報処理安全確保支援士" },
  { url: "/exam/nw", title: "ネットワークスペシャリスト" },
  { url: "/exam/db", title: "データベーススペシャリスト" },
  { url: "/exam/es", title: "エンベデッドシステムスペシャリスト" },
  { url: "/exam/pm", title: "プロジェクトマネージャ" },
  { url: "/exam/sa", title: "システムアーキテクト" },
  { url: "/exam/st", title: "ITストラテジスト" },
  { url: "/exam/sm", title: "ITサービスマネージャ" },
  { url: "/exam/au", title: "システム監査技術者" },
];

const BLOG_PAGES: Array<{ url: string; title: string }> = [
  { url: "/blog/ap-strategy-2026", title: "応用情報 2026 春 攻略ロードマップ" },
  { url: "/blog/fe-algorithms", title: "基本情報 アルゴリズム 完全マスター" },
  { url: "/blog/sc-tls-mtls", title: "支援士 で問われる TLS / mTLS 整理" },
  { url: "/blog/nw-bgp-cheatsheet", title: "ネスペ BGP チートシート" },
  { url: "/blog/sg-2026-spring-recap", title: "SG 2026 春 出題傾向まとめ" },
  { url: "/blog/db-er-modeling", title: "DBスペシャリスト ER 設計の落とし穴" },
  { url: "/blog/pm-evm", title: "PM 受験者のための EVM 速習" },
  { url: "/blog/ip-saturday-study", title: "ITパスポート 土日 30 時間で受かる方法" },
  { url: "/blog/ap-afternoon-pick", title: "応用情報 午後 選択戦略 2026" },
  { url: "/blog/sa-essay-template", title: "システムアーキテクト 論述テンプレート" },
];

function buildPages(meta: MetricsRangeMeta, rand: () => number): PageAccessSection {
  const span = rangeSpanDays(meta);
  const examPv = (idx: number) => Math.round(span * (560 - idx * 28) * (0.85 + rand() * 0.3));
  const byExam = EXAM_PAGES.map((p, i) => ({
    ...p,
    pv: examPv(i),
    avgDurationSec: 90 + Math.round(rand() * 70),
    bounceRate: 0.32 + rand() * 0.18,
  })).sort((a, b) => b.pv - a.pv);

  const blogPv = (idx: number) => Math.round(span * (220 - idx * 14) * (0.85 + rand() * 0.3));
  const byBlog = BLOG_PAGES.map((p, i) => ({
    ...p,
    pv: blogPv(i),
    avgDurationSec: 180 + Math.round(rand() * 220),
    bounceRate: 0.42 + rand() * 0.25,
  })).sort((a, b) => b.pv - a.pv);

  const byQuestion = Array.from({ length: 20 }).map((_, i) => {
    const exam = ["ap", "fe", "ip", "sg", "sc"][i % 5];
    const year = 2024 - (i % 4);
    const season = i % 2 === 0 ? "h" : "s";
    const q = (i % 80) + 1;
    return {
      url: `/q/${exam}-${year}${season}-am-q${q}`,
      title: `${exam.toUpperCase()} ${year}${season === "h" ? "秋" : "春"} 午前 問${q}`,
      pv: Math.round(span * (140 - i * 4) * (0.8 + rand() * 0.4)),
      avgDurationSec: 60 + Math.round(rand() * 90),
      bounceRate: 0.28 + rand() * 0.22,
    };
  }).sort((a, b) => b.pv - a.pv);

  return { byExam, byBlog, byQuestion };
}

function buildTraffic(meta: MetricsRangeMeta, rand: () => number): TrafficSection {
  const span = rangeSpanDays(meta);
  const total = Math.round(span * 4200 * (0.85 + rand() * 0.3));
  const slices = [
    { source: "Google 検索", weight: 0.52 },
    { source: "Direct", weight: 0.21 },
    { source: "X (Twitter)", weight: 0.09 },
    { source: "メルマガ", weight: 0.07 },
    { source: "Bing 検索", weight: 0.04 },
    { source: "アフィリエイト", weight: 0.04 },
    { source: "その他 SNS", weight: 0.03 },
  ];
  const sources = slices.map((s) => {
    const sessions = Math.round(total * s.weight * (0.9 + rand() * 0.2));
    return { source: s.source, sessions, share: 0 };
  });
  const sessionsSum = sources.reduce((a, b) => a + b.sessions, 0);
  for (const s of sources) s.share = sessionsSum === 0 ? 0 : s.sessions / sessionsSum;

  const keywords = [
    "応用情報 過去問",
    "基本情報 過去問道場 代替",
    "ITパスポート 過去問 無料",
    "情報処理安全確保支援士 過去問",
    "ネスペ 過去問",
    "応用情報 午後 解説",
    "SG 過去問 アプリ",
    "DBスペシャリスト 過去問",
    "PM 過去問",
    "AP 計算問題",
  ].map((keyword, i) => {
    const impressions = Math.round(span * (3200 - i * 220) * (0.85 + rand() * 0.3));
    const ctr = 0.04 + rand() * 0.06;
    const clicks = Math.round(impressions * ctr);
    return { keyword, impressions, clicks, ctr };
  });

  return { sources, keywords };
}

function buildFlow(_meta: MetricsRangeMeta, rand: () => number): FlowSection {
  const newSteps = [
    { step: "ランディング訪問", users: 10000 },
    { step: "試験区分選択", users: 6800 },
    { step: "1 問目を回答", users: 4200 },
    { step: "5 問連続回答", users: 2600 },
    { step: "AI コパイロット起動", users: 1100 },
    { step: "翌日再訪", users: 720 },
  ];
  const retSteps = [
    { step: "再訪問", users: 4500 },
    { step: "未回答モード突入", users: 3200 },
    { step: "10 問連続回答", users: 2400 },
    { step: "復習モード起動", users: 1500 },
    { step: "AI コパイロット起動", users: 980 },
    { step: "1 週間連続学習達成", users: 540 },
  ];
  function withPass(steps: Array<{ step: string; users: number }>) {
    const first = steps[0]?.users ?? 1;
    return steps.map((s) => ({
      step: s.step,
      users: Math.round(s.users * (0.92 + rand() * 0.16)),
      passRate: first === 0 ? 0 : s.users / first,
    }));
  }
  return {
    newUserFunnel: withPass(newSteps),
    returningUserFunnel: withPass(retSteps),
  };
}

function buildConversions(meta: MetricsRangeMeta, rand: () => number): ConversionSection {
  const span = rangeSpanDays(meta);
  const amazon = Math.round(span * 38 * (0.85 + rand() * 0.3));
  const rakuten = Math.round(span * 22 * (0.85 + rand() * 0.3));
  const totalViews = Math.round(span * 4800 * (0.85 + rand() * 0.3));
  const overall = (amazon + rakuten) / Math.max(1, totalViews);

  const products = [
    { product: "応用情報 教科書 2026 版", vendor: "amazon" as const, base: 760 },
    { product: "キタミ式 基本情報", vendor: "amazon" as const, base: 540 },
    { product: "情報処理安全確保支援士 合格教本", vendor: "rakuten" as const, base: 410 },
    { product: "ネスペ 教科書 2026", vendor: "amazon" as const, base: 360 },
    { product: "ITパスポート 完全対策", vendor: "amazon" as const, base: 320 },
    { product: "DBスペシャリスト 午後問題", vendor: "rakuten" as const, base: 240 },
    { product: "PM 教科書", vendor: "amazon" as const, base: 220 },
    { product: "SG 速習テキスト", vendor: "rakuten" as const, base: 180 },
    { product: "応用情報 午後 重点対策", vendor: "amazon" as const, base: 160 },
    { product: "システムアーキテクト 論文集", vendor: "rakuten" as const, base: 120 },
  ];
  const topProducts = products.map((p) => {
    const views = Math.round(p.base * span * 0.3 * (0.85 + rand() * 0.3));
    const ctr = 0.03 + rand() * 0.05;
    const clicks = Math.round(views * ctr);
    return { product: p.product, vendor: p.vendor, views, clicks, ctr };
  });

  return {
    totals: {
      amazonClicks: kpi(amazon, amazon * (0.85 + rand() * 0.2), "件"),
      rakutenClicks: kpi(rakuten, rakuten * (0.85 + rand() * 0.2), "件"),
      overallCtr: kpi(overall * 1000, overall * 1000 * (0.85 + rand() * 0.2), "‰"),
    },
    topProducts,
  };
}

function buildErrors(rand: () => number): ErrorSection {
  const baseTime = Date.now();
  const topErrors: ErrorSection["topErrors"] = [
    {
      message: "TypeError: Cannot read properties of undefined (reading 'choices')",
      count: 18 + Math.round(rand() * 6),
      lastSeen: new Date(baseTime - 1000 * 60 * 32).toISOString(),
      url: "/q/ap-2024h-am-q42",
      level: "error",
    },
    {
      message: "AbortError: signal is aborted without reason",
      count: 11 + Math.round(rand() * 4),
      lastSeen: new Date(baseTime - 1000 * 60 * 60 * 2).toISOString(),
      url: "/api/copilot",
      level: "warning",
    },
    {
      message: "Gemini API 429 Too Many Requests",
      count: 7 + Math.round(rand() * 3),
      lastSeen: new Date(baseTime - 1000 * 60 * 60 * 5).toISOString(),
      url: "/api/copilot",
      level: "error",
    },
    {
      message: "Hydration failed because the initial UI does not match",
      count: 4 + Math.round(rand() * 2),
      lastSeen: new Date(baseTime - 1000 * 60 * 60 * 9).toISOString(),
      url: "/quiz",
      level: "error",
    },
    {
      message: "NetworkError when fetching /api/copilot",
      count: 3 + Math.round(rand() * 2),
      lastSeen: new Date(baseTime - 1000 * 60 * 60 * 14).toISOString(),
      url: "/api/copilot",
      level: "warning",
    },
  ];
  const totalEvents24h = topErrors.reduce((a, b) => a + b.count, 0);
  return { topErrors, totalEvents24h, source: "mock" };
}

function buildInsights(): InsightSection {
  return {
    unused: [
      { title: "段級ランキング", detail: "ホームから 1 タップで到達できるが起動率 0.4%。", metric: "起動率 0.4%" },
      { title: "選択肢ランダム化トグル", detail: "設定画面の埋もれ。利用者比率 1.1%。", metric: "利用率 1.1%" },
      { title: "CSV エクスポート", detail: "アクティブユーザー比 0.6% にとどまる。", metric: "利用率 0.6%" },
    ],
    highDropoff: [
      { title: "模試モード設定 → 開始", detail: "問題数選択画面で 38% が離脱。", metric: "離脱率 38%" },
      { title: "AI コパイロット 1 回目応答後", detail: "初回レスポンス後の追問率が 22%。", metric: "継続率 22%" },
      { title: "復習モード結果画面", detail: "結果画面到達後の翌日再訪が 19%。", metric: "リテンション 19%" },
    ],
    growth: [
      { title: "ストリーム学習", detail: "前期比 +42% で利用増。連続正答演出が効いている可能性。", metric: "+42%" },
      { title: "ITパスポート 受験層", detail: "新規ユーザー比 +28%。土日学習層が増加。", metric: "+28%" },
      { title: "AI コパイロット 類題生成", detail: "前期比 +19%。類題タブの導線改善が奏功。", metric: "+19%" },
    ],
    aiComment:
      "ストリーム学習と類題生成が伸びている一方、模試の問題数選択で 38% が脱落しています。模試の初期設定をデフォルト 20 問にプリセットし、設定画面を 1 タップで完了できる UI に変更することで、模試完走率を +10pt 押し上げられる見込みです。AI コパイロットは初回応答後の追問率が低いため、応答末尾に「次に試したい質問」を 2〜3 案提示する小さな追加で会話継続率を改善できます。",
  };
}

export function buildMockMetrics(meta: MetricsRangeMeta): MetricsResponse {
  const seed = seedFromString(`${meta.from}-${meta.to}-${meta.range}`);
  const rand = rng(seed);
  return {
    meta,
    source: "mock",
    generatedAt: new Date().toISOString(),
    summary: buildSummary(meta, rand),
    features: buildFeatures(meta, rand),
    pages: buildPages(meta, rand),
    traffic: buildTraffic(meta, rand),
    flow: buildFlow(meta, rand),
    conversions: buildConversions(meta, rand),
    errors: buildErrors(rand),
    insights: buildInsights(),
  };
}
