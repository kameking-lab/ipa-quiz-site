export type PlanId = "free" | "premium" | "team";

export interface PlanFeature {
  label: string;
  included: boolean;
  detail?: string;
}

export interface PlanLimits {
  aiDailyRequests: number;
  aiMinuteLimit: number;
  aiModel: string;
  responseMode: "basic" | "detailed";
  multiTurn: boolean;
  similarQuestions: boolean;
  mistakeAnalysis: boolean;
  studyPlan: boolean;
  cloudHistory: boolean;
  teamDashboard: boolean;
  userManagement: boolean;
  reports: boolean;
  adsDisabled: boolean;
  characterChoice: "haru-only" | "all";
  heatmapDays: number;
  essayGrading: "none" | "limited" | "unlimited";
}

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPriceJpy: number;
  annualPriceJpy?: number;
  /** Marker for per-seat pricing displays. */
  pricingUnit?: "month" | "seat-month";
  /** Minimum seats for per-seat plans. */
  minSeats?: number;
  billing: "free" | "monthly" | "enterprise";
  unlimitedSeats?: boolean;
  description: string;
  limits: PlanLimits;
  features: PlanFeature[];
  cta: string;
  ctaHref?: string;
  highlight?: boolean;
}

export const FREE_PLAN: Plan = {
  id: "free",
  name: "Free",
  tagline: "まずは無料で全試験に触れる",
  monthlyPriceJpy: 0,
  billing: "free",
  description:
    "ログイン不要・全試験・全機能アクセス可能。AI コパイロットは 1 日 15 回まで無料で利用できます。",
  limits: {
    aiDailyRequests: 15,
    aiMinuteLimit: 5,
    aiModel: "gemini-2.5-flash-lite",
    responseMode: "basic",
    multiTurn: false,
    similarQuestions: false,
    mistakeAnalysis: false,
    studyPlan: false,
    cloudHistory: false,
    teamDashboard: false,
    userManagement: false,
    reports: false,
    adsDisabled: false,
    characterChoice: "haru-only",
    heatmapDays: 7,
    essayGrading: "limited",
  },
  features: [
    { label: "全試験区分の過去問", included: true },
    { label: "ゼロ遷移クイズ UI", included: true },
    { label: "AI コパイロット 1日15回", included: true, detail: "Flash-Lite" },
    { label: "学習ヒートマップ（直近7日）", included: true },
    { label: "連続モード・試験区分診断", included: true },
    { label: "AIキャラ「ハル」", included: true, detail: "冷静で知的" },
    { label: "AI 論述添削（午後II）", included: true, detail: "月3回まで" },
    { label: "弱点克服・成長加速モード", included: false },
    { label: "クラウド履歴同期", included: false },
    { label: "AIキャラ全種選択", included: false },
  ],
  cta: "無料ではじめる",
};

export const PREMIUM_PLAN: Plan = {
  id: "premium",
  name: "Pro",
  tagline: "本気で合格を狙う個人向け",
  monthlyPriceJpy: 1480,
  pricingUnit: "month",
  billing: "monthly",
  description:
    "AI コパイロットが 1 日 200 回まで使える個人向けプラン。弱点克服モード・類題生成・AI論述添削まで無制限で使えます。",
  limits: {
    aiDailyRequests: 200,
    aiMinuteLimit: 15,
    aiModel: "gemini-2.5-flash",
    responseMode: "detailed",
    multiTurn: true,
    similarQuestions: true,
    mistakeAnalysis: true,
    studyPlan: true,
    cloudHistory: true,
    teamDashboard: false,
    userManagement: false,
    reports: false,
    adsDisabled: true,
    characterChoice: "all",
    heatmapDays: 365,
    essayGrading: "unlimited",
  },
  features: [
    { label: "Free の全機能", included: true },
    { label: "AI コパイロット 1日200回", included: true, detail: "Flash-Lite + Flash boost" },
    { label: "弱点克服・成長加速モード", included: true },
    { label: "類題自動生成・誤答パターン分析", included: true },
    { label: "AIキャラ「モモ／ハル／ザン」全種", included: true },
    { label: "学習ヒートマップ（365日）", included: true },
    { label: "ダッシュボード＋レーダーチャート", included: true },
    { label: "AI 論述添削（午後II） 無制限", included: true },
    { label: "クラウド履歴同期", included: true },
    { label: "広告非表示", included: true },
  ],
  cta: "Pro で始める",
  highlight: true,
};

export const TEAM_PLAN: Plan = {
  id: "team",
  name: "Team",
  tagline: "法人・研修担当者向け",
  monthlyPriceJpy: 2980,
  pricingUnit: "seat-month",
  minSeats: 5,
  billing: "enterprise",
  description:
    "Pro の全機能に加え、法人ダッシュボードでメンバーの学習進捗・正答率・試験別進捗を一元管理できます。最低 5 席から、請求書払い対応。",
  limits: {
    aiDailyRequests: 200,
    aiMinuteLimit: 15,
    aiModel: "gemini-2.5-flash",
    responseMode: "detailed",
    multiTurn: true,
    similarQuestions: true,
    mistakeAnalysis: true,
    studyPlan: true,
    cloudHistory: true,
    teamDashboard: true,
    userManagement: true,
    reports: true,
    adsDisabled: true,
    characterChoice: "all",
    heatmapDays: 365,
    essayGrading: "unlimited",
  },
  features: [
    { label: "Pro の全機能", included: true },
    { label: "法人ダッシュボード", included: true },
    { label: "席数管理・メンバー招待", included: true, detail: "最低5席" },
    { label: "進捗レポート（試験別／部署別）", included: true },
    { label: "CSV エクスポート", included: true },
    { label: "請求書払い対応", included: true },
    { label: "優先サポート", included: true },
  ],
  cta: "お問い合わせ",
  ctaHref: "/contact/enterprise",
};

export const PLANS: Record<PlanId, Plan> = {
  free: FREE_PLAN,
  premium: PREMIUM_PLAN,
  team: TEAM_PLAN,
};

export const PLAN_ORDER: PlanId[] = ["free", "premium", "team"];

const DEFAULT_PLAN: PlanId = "free";

export function getCurrentPlan(): PlanId {
  return DEFAULT_PLAN;
}

export function getPlan(id: PlanId): Plan {
  return PLANS[id];
}

export function formatPlanPrice(plan: Plan): string {
  if (plan.monthlyPriceJpy === 0) return "無料";
  const suffix = plan.pricingUnit === "seat-month" ? "/ 席 / 月" : "/ 月";
  return `¥${plan.monthlyPriceJpy.toLocaleString()} ${suffix}`;
}

export function formatAnnualPrice(plan: Plan): string | null {
  if (!plan.annualPriceJpy) return null;
  const monthly = Math.round(plan.annualPriceJpy / 12);
  return `¥${plan.annualPriceJpy.toLocaleString()} / 年（¥${monthly.toLocaleString()}/月相当）`;
}

export function hasFeature(plan: PlanId, feature: keyof PlanLimits): boolean {
  const value = PLANS[plan].limits[feature];
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value > 0;
  return true;
}
