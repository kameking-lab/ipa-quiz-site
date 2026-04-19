import type { ExamCode, Season } from "@/lib/questions/types";

/**
 * 午後問題用のデータモデル。
 *
 * 午前四択（lib/questions/types.ts）とは構造が大きく異なるため、
 * 別の型空間に分離している。共通する基本属性（exam/year/season など）は
 * 名称を揃えて互換性を取る。
 */

export type AfternoonQuestionType = "descriptive" | "essay";

/** 設問の解答形式 */
export type SubAnswerType =
  | "short-text"   // 数十字程度の語句記述
  | "long-text"    // 100字程度以上の論述
  | "fill-blank"   // 穴埋め（短い語句）
  | "choice";      // 選択肢から選ぶ（午後でも稀に存在）

/** 1つの大問内のサブ設問 */
export interface SubQuestion {
  /** "設問1", "(1)" など、PDF上の番号表記 */
  label: string;
  /** 設問本文 */
  prompt: string;
  /** 解答形式 */
  type: SubAnswerType;
  /** 字数制限（上限）。fill-blank/choice は省略可 */
  maxLength?: number;
  /** 模範解答（IPA公表 or 編集者作成） */
  modelAnswer: string;
  /** 採点ルーブリック（採点観点）。AIに渡す */
  scoringRubric: string;
  /** 配点（任意。合計が大問の満点になることが望ましい） */
  points?: number;
}

/** 午後問題の大問1問 */
export interface AfternoonQuestion {
  /** "ap-2024a-pm-q1" 形式 */
  id: string;
  exam: ExamCode;
  year: number;
  season: Season;
  /** 大問番号（AP午後は問1〜問11） */
  qNumber: number;
  type: AfternoonQuestionType;
  /** "情報セキュリティ", "システムアーキテクチャ" など */
  category: string;
  /** 大問のタイトル（例: "中堅製造業のSaaS導入"） */
  title: string;
  /** 大問本文（背景説明・図表テキスト・問題文）。Markdown 可 */
  context: string;
  /** サブ設問の配列 */
  subQuestions: SubQuestion[];
  /** 出典 PDF URL */
  pdfUrl: string;
  license: "IPA-public";
  /** 試験全体の制限時間（分）。AP午後は150分。 */
  totalTimeMinutes?: number;
  /** 解説品質が低い・要確認のフラグ。出題プールから除外する用途。 */
  needsReview?: boolean;
}

/** ユーザーが提出した解答（採点API入力） */
export interface AfternoonAnswer {
  /** SubQuestion.label と一致 */
  label: string;
  /** ユーザーの解答テキスト */
  text: string;
}

/** AIが返す採点結果（1サブ設問分） */
export interface SubScoringResult {
  label: string;
  /** 0-100 のスコア */
  score: number;
  /** 良かった点 */
  goodPoints: string[];
  /** 改善点 */
  improvements: string[];
  /** IPA公表または編集者作成の解答例 */
  modelAnswer: string;
}

/** AIが返す採点結果（大問全体） */
export interface AfternoonScoringResult {
  questionId: string;
  /** 0-100 の総合得点（サブ設問のスコアを配点で重み付け平均） */
  totalScore: number;
  subResults: SubScoringResult[];
  /** 全体講評 */
  overallComment: string;
}
