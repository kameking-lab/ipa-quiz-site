export type MetricsPeriod = "24h" | "7d" | "30d" | "90d";

export interface DeltaValue {
  value: number;
  delta: number;
}

export interface SummarySection {
  dau: DeltaValue;
  mau: DeltaValue;
  answers: DeltaValue;
  aiQuestions: DeltaValue;
  feedback: DeltaValue;
}

export interface FeatureUsage {
  feature: string;
  uses: number;
  uu: number;
}

export interface PageStat {
  url: string;
  label?: string;
  pv: number;
  avgDurationSec: number;
  bounceRate: number;
}

export interface PageSection {
  topPages: PageStat[];
  topExams: PageStat[];
  topBlog: PageStat[];
  topQuestions: PageStat[];
}

export interface SourceRow {
  source: string;
  sessions: number;
  share: number;
}

export interface KeywordRow {
  keyword: string;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface SourceSection {
  sources: SourceRow[];
  keywords: KeywordRow[];
}

export interface FunnelStep {
  step: string;
  users: number;
  rate: number;
}

export interface FlowSection {
  newUsers: FunnelStep[];
  returningUsers: FunnelStep[];
}

export interface ConversionRow {
  product: string;
  channel: "amazon" | "rakuten";
  clicks: number;
  ctr: number;
}

export interface ConversionSection {
  amazonClicks: number;
  amazonCtr: number;
  rakutenClicks: number;
  rakutenCtr: number;
  topBooks: ConversionRow[];
}

export interface ErrorRow {
  message: string;
  count: number;
  lastSeen: string;
  url?: string;
}

export interface ErrorSection {
  totalLast24h: number;
  errorRate: number;
  topErrors: ErrorRow[];
}

export interface InsightItem {
  title: string;
  detail: string;
  metric: string;
}

export interface InsightSection {
  underused: InsightItem[];
  highChurn: InsightItem[];
  growing: InsightItem[];
}

export interface MetricsResponse {
  generatedAt: string;
  period: MetricsPeriod;
  source: "posthog" | "mock";
  summary: SummarySection;
  features: FeatureUsage[];
  pages: PageSection;
  sources: SourceSection;
  flow: FlowSection;
  conversion: ConversionSection;
  errors: ErrorSection;
  insights: InsightSection;
}
