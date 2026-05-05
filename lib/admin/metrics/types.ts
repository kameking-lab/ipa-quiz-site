export type MetricsRange = "today" | "7d" | "30d" | "mtd" | "custom";

export interface MetricsRangeMeta {
  range: MetricsRange;
  from: string;
  to: string;
  label: string;
  comparedFrom: string;
  comparedTo: string;
}

export interface KpiValue {
  current: number;
  previous: number;
  unit?: string;
}

export interface SummarySection {
  dau: KpiValue;
  mau: KpiValue;
  answers: KpiValue;
  aiQuestions: KpiValue;
  feedback: KpiValue;
  series: Array<{ date: string; dau: number; answers: number }>;
}

export interface FeatureUsage {
  feature: string;
  path: string;
  uses: number;
  uniqueUsers: number;
}

export interface FeatureUsageSection {
  features: FeatureUsage[];
}

export interface PageAccess {
  url: string;
  title: string;
  pv: number;
  avgDurationSec: number;
  bounceRate: number;
}

export interface PageAccessSection {
  byExam: PageAccess[];
  byBlog: PageAccess[];
  byQuestion: PageAccess[];
}

export interface SourceShare {
  source: string;
  sessions: number;
  share: number;
}

export interface SearchKeyword {
  keyword: string;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface TrafficSection {
  sources: SourceShare[];
  keywords: SearchKeyword[];
}

export interface FunnelStep {
  step: string;
  users: number;
  passRate: number;
}

export interface FlowSection {
  newUserFunnel: FunnelStep[];
  returningUserFunnel: FunnelStep[];
}

export interface AffiliateLink {
  product: string;
  vendor: "amazon" | "rakuten";
  views: number;
  clicks: number;
  ctr: number;
}

export interface ConversionSection {
  totals: {
    amazonClicks: KpiValue;
    rakutenClicks: KpiValue;
    overallCtr: KpiValue;
  };
  topProducts: AffiliateLink[];
}

export interface ErrorEntry {
  message: string;
  count: number;
  lastSeen: string;
  url?: string;
  level: "error" | "warning" | "fatal";
}

export interface ErrorSection {
  totalEvents24h: number;
  topErrors: ErrorEntry[];
  source: "sentry" | "mock";
}

export interface InsightItem {
  title: string;
  detail: string;
  metric: string;
}

export interface InsightSection {
  unused: InsightItem[];
  highDropoff: InsightItem[];
  growth: InsightItem[];
  aiComment: string;
}

export interface MetricsResponse {
  meta: MetricsRangeMeta;
  source: "posthog" | "mock";
  generatedAt: string;
  cachedAt?: string;
  summary: SummarySection;
  features: FeatureUsageSection;
  pages: PageAccessSection;
  traffic: TrafficSection;
  flow: FlowSection;
  conversions: ConversionSection;
  errors: ErrorSection;
  insights: InsightSection;
}
