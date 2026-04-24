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
}

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPriceJpy: number;
  annualPriceJpy?: number;
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
    "ログイン不要・全試験・全機能アクセス可能。AI コパイロットは 1 日 50 回まで無料で利用できます。",
  limits: {
    aiDailyRequests: 50,
    aiMinuteLimit: 10,
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
  },
  features: [
    { label: "全試験区分の過去問", included: true },
    { label: "ゼロ遷移クイズ UI", included: true },
    { label: "AI コパイロット 1日50回", included: true },
    { label: "学習履歴（ブラウザ保存）", included: true, detail: "localStorage" },
    { label: "マルチターン会話", included: false },
    { label: "誤答分析・学習プラン", included: false },
    { label: "クラウド履歴同期", included: false },
  ],
  cta: "無料ではじめる",
};

export const PREMIUM_PLAN: Plan = {
  id: "premium",
  name: "Premium",
  tagline: "本気で合格を狙う個人向け",
  monthlyPriceJpy: 980,
  billing: "monthly",
  description:
    "AI コパイロットが 1 日 500 回まで使える個人向けプラン。詳細解説・類題生成・学習プランで弱点を潰し切る。",
  limits: {
    aiDailyRequests: 500,
    aiMinuteLimit: 20,
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
  },
  features: [
    { label: "Free の全機能", included: true },
    { label: "AI コパイロット 1日500回", included: true, detail: "Gemini 2.5 Flash" },
    { label: "詳細応答モード", included: true },
    { label: "マルチターン会話", included: true },
    { label: "類題自動生成", included: true },
    { label: "誤答パターン分析", included: true },
    { label: "AI 学習プラン作成", included: true },
    { label: "クラウド履歴同期", included: true },
    { label: "広告非表示", included: true },
  ],
  cta: "使ってみる",
  ctaHref: "/mock-exam",
  highlight: true,
};

export const TEAM_PLAN: Plan = {
  id: "team",
  name: "Team",
  tagline: "法人・研修担当者向け",
  monthlyPriceJpy: 50000,
  annualPriceJpy: 540000,
  billing: "enterprise",
  unlimitedSeats: true,
  description:
    "Premium の全機能に加え、法人ダッシュボードでメンバーの学習進捗・正答率・試験別進捗を一元管理できます。席数無制限・請求書払い対応。",
  limits: {
    aiDailyRequests: 500,
    aiMinuteLimit: 20,
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
  },
  features: [
    { label: "Premium の全機能", included: true },
    { label: "席数無制限", included: true },
    { label: "法人ダッシュボード", included: true },
    { label: "メンバー・部署管理", included: true },
    { label: "試験別進捗レポート", included: true },
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
  return `¥${plan.monthlyPriceJpy.toLocaleString()} / 月`;
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
