import type { ExamCode, Season } from "@/lib/questions/types";

/**
 * 論述式（午後II）問題の型定義。
 * 対象試験: ST / SA / PM / SM / AU
 *
 * 設問ア・イ・ウ の三段構成に最適化している。
 */

export interface EssaySubPrompt {
  /** "ア" | "イ" | "ウ" */
  key: "ア" | "イ" | "ウ";
  /** 設問本文 */
  prompt: string;
  /** 推奨字数（目安） */
  targetChars: number;
  /** 字数下限（目安） */
  minChars: number;
  /** 字数上限（目安） */
  maxChars: number;
  /** IPA公表または編集者作成の解答骨子 */
  modelOutline: string;
  /**
   * 採点根拠データ（強み1）。汎用LLMが持てない「根拠ある採点」のための構造化ルーブリック。
   * いずれも任意。IPA 出題趣旨・採点講評の要点を編集部が自前で構造化したもの（原文の長文転載はしない）。
   */
  /** 部分点の核になる語・概念。採点AIはこの有無を部分点判定の核とする。 */
  requiredKeywords?: string[];
  /** 採点の勘所（配点の指針・典型的な減点観点）。各評価軸の根拠として用いる。 */
  scoringPoints?: string[];
}

export interface EssayQuestion {
  /** "st-2024a-pm2-q1" 形式 */
  id: string;
  exam: Extract<ExamCode, "st" | "sa" | "pm" | "sm" | "au">;
  year: number;
  season: Season;
  /** 大問番号（午後IIは問1または問2） */
  qNumber: number;
  /** 大問のタイトル */
  title: string;
  /** 設問の前提となる本文（背景・テーマ説明）。Markdown 可 */
  context: string;
  /** 設問ア・イ・ウ */
  subPrompts: EssaySubPrompt[];
  /** IPA公式の出題趣旨・採点講評（公表されている場合） */
  officialReview: string;
  /** 出典 PDF URL */
  pdfUrl: string;
  license: "IPA-public";
}

/** 受験生が選択する業種 */
export type Industry =
  | "manufacturing"
  | "finance"
  | "retail"
  | "it"
  | "public"
  | "healthcare"
  | "logistics"
  | "construction"
  | "education"
  | "other";

export const INDUSTRY_LABELS: Record<Industry, string> = {
  manufacturing: "製造業",
  finance: "金融",
  retail: "小売",
  it: "IT・情報通信",
  public: "公共・官公庁",
  healthcare: "医療・ヘルスケア",
  logistics: "物流",
  construction: "建設",
  education: "教育",
  other: "その他",
};

/** ユーザーが提出する論述（採点API入力） */
export interface EssayAnswer {
  questionId: string;
  industry: Industry;
  answers: {
    ア: string;
    イ: string;
    ウ: string;
  };
}

/** 1設問分の評価 */
export interface EssaySubResult {
  key: "ア" | "イ" | "ウ";
  /** 0-100 のスコア */
  score: number;
  /** 適合度・論理性・具体性・業種事例の適切さ */
  axes: {
    relevance: number;
    logic: number;
    concreteness: number;
    industryFit: number;
  };
  goodPoints: string[];
  improvements: string[];
  missingElements: string[];
  charCount: number;
}

/** 全体ランク */
export type EssayRank = "A" | "B" | "C" | "fail";

/** 採点結果 */
export interface EssayGradingResult {
  questionId: string;
  industry: Industry;
  /** 全体ランク判定 */
  rank: EssayRank;
  /** 合格率予測 (0-100) */
  passProbability: number;
  /** 設問ごとの評価 */
  subResults: EssaySubResult[];
  /** 全体的な改善アドバイス */
  overallAdvice: string;
  /** 不要だった要素 */
  unnecessaryElements: string[];
  /** 改善版論述例（参考、設問アのみ簡潔に） */
  improvedExample?: string;
  /** 採点モデル名 */
  model?: string;
  /** 採点した時刻（ISO） */
  gradedAt: string;
}

/** ローカルに保存する採点履歴1件 */
export interface EssayHistoryEntry {
  id: string;
  questionId: string;
  exam: EssayQuestion["exam"];
  industry: Industry;
  rank: EssayRank;
  passProbability: number;
  totalScore: number;
  gradedAt: string;
  /** 後で振り返れるように、提出した本文も保存する */
  submission: {
    ア: string;
    イ: string;
    ウ: string;
  };
}
