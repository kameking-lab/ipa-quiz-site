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
  | "essay-text"   // 2000-3000字の小論文（ST/PM/SA/AU/SM 午後II）
  | "fill-blank"   // 穴埋め（短い語句）
  | "choice";      // 選択肢から選ぶ（午後でも稀に存在）

/**
 * 業種カテゴリID（午後II 論述式の業種別模範解答で使用）
 *
 * 受験生の業務経験で論述内容が変わるため、業種ごとの合格答案サンプルを提供する。
 */
export type IndustryId =
  | "manufacturing"  // 製造業（MES、IoT工場、生産管理）
  | "construction"   // 建設業（ICT施工、BIM/CIM、建設DX）
  | "finance"        // 金融業（勘定系、フィンテック）
  | "retail"         // 流通・小売（EC、POS、サプライチェーン）
  | "telecom"        // 通信業（キャリア、ISP、5G）
  | "public"         // 公共・自治体（行政DX、住民サービス）
  | "it"             // IT・情報サービス業（SaaS、SI、クラウドベンダ）
  | "healthcare";    // 医療・ヘルスケア（電子カルテ、地域医療連携、医療DX）

/** 業種別の論述バリアント（設問ア・イ・ウの3点セット） */
export interface IndustryVariant {
  industryId: IndustryId;
  /** タブ表示用ラベル */
  industryName: string;
  /** 設問ア（事業／プロジェクト概要・前提）の論述例 */
  essayA: string;
  /** 設問イ（戦略・施策・本論）の論述例 */
  essayI: string;
  /** 設問ウ（評価・改善・学び）の論述例 */
  essayU: string;
}

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
  /** 字数下限（essay-text 等で使用） */
  minLength?: number;
  /** 模範解答（IPA公表 or 編集者作成） */
  modelAnswer: string;
  /** 採点ルーブリック（採点観点）。AIに渡す */
  scoringRubric: string;
  /** 配点（任意。合計が大問の満点になることが望ましい） */
  points?: number;
  /** 論述式の構成のポイント（章立て・論じる順序など）。essay-text で使用 */
  compositionPoints?: string[];
  /** 論述式の採点基準カテゴリ（例: 設問への適合性 / 論述の具体性 / 一貫性）。essay-text で使用 */
  scoringCriteria?: { name: string; description: string }[];
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
  /**
   * 業種別の模範論述バリアント（essay型のみ）。
   * subQuestions[].modelAnswer は「共通／汎用」論述として扱い、
   * このフィールドが存在する場合は UI 上で業種タブを切り替えられるようにする。
   * 設問ア・イ・ウの順で essayA / essayI / essayU に対応する。
   */
  industryVariants?: IndustryVariant[];
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
  /**
   * 採点の出どころ。"ai" は AI が採点した結果、"simplified" は AI 応答を
   * 使えず解答の記入状況だけから機械的に出した簡易判定。
   * simplified でも AI 呼び出しの課金は発生しうるため、利用者に必ず開示する。
   * 省略時は "ai" 相当（この項目が無い時期に保存された履歴との後方互換）。
   */
  gradingMode?: "ai" | "simplified";
}
