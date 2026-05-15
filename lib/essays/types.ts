export type EssayIndustryId =
  | "it"
  | "finance"
  | "construction"
  | "healthcare"
  | "public"
  | "manufacturing"
  | "retail"
  | "telecom";

export const ESSAY_INDUSTRY_LABELS: Record<EssayIndustryId, string> = {
  it: "IT・情報サービス業",
  finance: "金融業",
  construction: "建設業",
  healthcare: "医療・ヘルスケア",
  public: "公共・自治体",
  manufacturing: "製造業",
  retail: "流通・小売業",
  telecom: "通信業",
};

export interface SCEssayAnswer {
  industryId: EssayIndustryId;
  industryName: string;
  /** 序論 200-300字 */
  intro: string;
  /** 本論 1400-1600字 */
  body: string;
  /** 結論 300-500字 */
  conclusion: string;
}

export interface SCpm2Question {
  /** "sc-2023h-pm2-q1" */
  id: string;
  year: number;
  season: "spring" | "autumn";
  qNumber: number;
  theme: string;
  context: string;
  pdfUrl: string;
  license: "IPA-public";
  industries: SCEssayAnswer[];
}
