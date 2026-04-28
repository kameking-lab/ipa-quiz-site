import type { ExamCode, Session, Season } from "@/lib/questions/types";

export interface SessionConfig {
  session: Session;
  urlSlug: string;
  expectedQuestions: number;
  label: string;
  categories: string[];
  /** IP exam: files are qs.pdf/ans.pdf without session prefix */
  noSessionPrefix?: boolean;
}

export interface ExamConfig {
  code: ExamCode;
  nameFull: string;
  urlSlug: string;
  level: "basic" | "advanced" | "specialist";
  sessions: SessionConfig[];
  seasons: Array<Season>;
  yearRange: { start: number; end: number };
  /** 2009-2011 pre-reform period had different seasons for most specialist exams */
  legacyYearRange?: { start: number; end: number };
  legacySeasons?: Array<Season>;
  /** CBT-format years (IP 2021+, FE/SG 2023+) */
  cbtYearRange?: { start: number; end: number };
  /** CBT sessions differ from regular (e.g. FE: kamoku-a/b instead of am) */
  cbtSessions?: SessionConfig[];
}

// ------- Shared category lists -------

const BASIC_CATEGORIES = [
  "基礎理論",
  "アルゴリズムとプログラミング",
  "コンピュータシステム",
  "ネットワーク",
  "データベース",
  "セキュリティ",
  "開発技術",
  "マネジメント",
  "ストラテジ",
];

const ADVANCED_CATEGORIES = [
  "基礎理論",
  "アルゴリズムとプログラミング",
  "コンピュータシステム",
  "ネットワーク",
  "データベース",
  "セキュリティ",
  "開発技術",
  "プロジェクトマネジメント",
  "サービスマネジメント",
  "システム戦略",
  "経営戦略",
  "企業と法務",
];

const HIGH_LEVEL_AM1_CATEGORIES = [
  "基礎理論",
  "コンピュータシステム",
  "ネットワーク",
  "データベース",
  "セキュリティ",
  "開発技術",
  "プロジェクトマネジメント",
  "サービスマネジメント",
  "システム戦略",
  "経営戦略",
  "企業と法務",
];

// ------- Session presets -------

function am80(categories = ADVANCED_CATEGORIES): SessionConfig {
  return { session: "am", urlSlug: "am", expectedQuestions: 80, label: "午前", categories };
}

function am50(categories: string[]): SessionConfig {
  return { session: "am", urlSlug: "am", expectedQuestions: 50, label: "午前", categories };
}

function am1(): SessionConfig {
  return {
    session: "am1",
    urlSlug: "am1",
    expectedQuestions: 30,
    label: "午前I",
    categories: HIGH_LEVEL_AM1_CATEGORIES,
  };
}

function am2(categories: string[]): SessionConfig {
  return { session: "am2", urlSlug: "am2", expectedQuestions: 25, label: "午前II", categories };
}

// ------- Exam configs -------

export const EXAM_CONFIGS: Record<ExamCode, ExamConfig> = {
  ip: {
    code: "ip",
    nameFull: "ITパスポート試験",
    urlSlug: "ip",
    level: "basic",
    // IP files are always qs.pdf / ans.pdf — no session prefix in filename
    sessions: [{ session: "am", urlSlug: "am", expectedQuestions: 100, label: "試験",
                 categories: BASIC_CATEGORIES, noSessionPrefix: true }],
    seasons: ["spring", "autumn"],
    yearRange: { start: 2009, end: 2020 },
    cbtYearRange: { start: 2021, end: 2025 },
  },
  sg: {
    code: "sg",
    nameFull: "情報セキュリティマネジメント試験",
    urlSlug: "sg",
    level: "basic",
    sessions: [
      am50(["情報セキュリティ", "リスクマネジメント", "情報セキュリティ管理", "情報セキュリティ対策", "セキュリティ技術", "法務・規程"]),
    ],
    seasons: ["spring", "autumn"],
    yearRange: { start: 2016, end: 2019 },
    cbtYearRange: { start: 2023, end: 2025 },
    cbtSessions: [
      { session: "kamoku-a", urlSlug: "kamoku-a", expectedQuestions: 48, label: "科目A",
        categories: ["情報セキュリティ", "リスクマネジメント", "情報セキュリティ管理", "情報セキュリティ対策", "セキュリティ技術", "法務・規程"] },
    ],
  },
  fe: {
    code: "fe",
    nameFull: "基本情報技術者試験",
    urlSlug: "fe",
    level: "basic",
    sessions: [am80(BASIC_CATEGORIES)],
    seasons: ["spring", "autumn"],
    yearRange: { start: 2009, end: 2019 },
    cbtYearRange: { start: 2023, end: 2025 },
    cbtSessions: [
      { session: "kamoku-a", urlSlug: "kamoku-a", expectedQuestions: 60, label: "科目A", categories: BASIC_CATEGORIES },
      { session: "kamoku-b", urlSlug: "kamoku-b", expectedQuestions: 20, label: "科目B",
        categories: ["アルゴリズムとプログラミング"] },
    ],
  },
  ap: {
    code: "ap",
    nameFull: "応用情報技術者試験",
    urlSlug: "ap",
    level: "advanced",
    sessions: [am80(ADVANCED_CATEGORIES)],
    seasons: ["spring", "autumn"],
    yearRange: { start: 2009, end: 2025 },
  },
  st: {
    code: "st",
    nameFull: "ITストラテジスト試験",
    urlSlug: "st",
    level: "specialist",
    sessions: [
      am1(),
      am2(["ITストラテジスト専門", "情報戦略", "業務改革", "システム化計画", "プロジェクト推進"]),
    ],
    seasons: ["spring"],
    yearRange: { start: 2012, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2011 },
  },
  sa: {
    code: "sa",
    nameFull: "システムアーキテクト試験",
    urlSlug: "sa",
    level: "specialist",
    sessions: [
      am1(),
      am2(["システムアーキテクチャ", "要件定義", "システム設計", "ソフトウェア設計", "品質管理"]),
    ],
    seasons: ["spring"],
    yearRange: { start: 2012, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2011 },
  },
  pm: {
    code: "pm",
    nameFull: "プロジェクトマネージャ試験",
    urlSlug: "pm",
    level: "specialist",
    sessions: [
      am1(),
      am2(["プロジェクトマネジメント", "スコープ管理", "コスト管理", "スケジュール管理", "リスク管理", "品質管理", "EVM"]),
    ],
    seasons: ["autumn"],
    yearRange: { start: 2012, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2011 },
  },
  nw: {
    code: "nw",
    nameFull: "ネットワークスペシャリスト試験",
    urlSlug: "nw",
    level: "specialist",
    sessions: [
      am1(),
      am2(["ネットワーク設計", "TCP/IP", "プロトコル", "ネットワークセキュリティ", "ルーティング", "無線LAN"]),
    ],
    seasons: ["spring"],
    yearRange: { start: 2012, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2011 },
  },
  db: {
    code: "db",
    nameFull: "データベーススペシャリスト試験",
    urlSlug: "db",
    level: "specialist",
    sessions: [
      am1(),
      am2(["データベース設計", "SQL", "正規化", "トランザクション", "障害回復", "データウェアハウス"]),
    ],
    seasons: ["autumn"],
    yearRange: { start: 2012, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2011 },
  },
  es: {
    code: "es",
    nameFull: "エンベデッドシステムスペシャリスト試験",
    urlSlug: "es",
    level: "specialist",
    sessions: [
      am1(),
      am2(["組込みシステム", "リアルタイムOS", "ハードウェア設計", "IoT", "信頼性設計", "安全性設計"]),
    ],
    seasons: ["autumn"],
    yearRange: { start: 2012, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2011 },
  },
  sc: {
    code: "sc",
    nameFull: "情報処理安全確保支援士試験",
    urlSlug: "sc",
    level: "specialist",
    sessions: [
      am1(),
      am2(["情報セキュリティ", "暗号技術", "認証技術", "ネットワークセキュリティ", "セキュリティ管理", "インシデント対応", "法規"]),
    ],
    seasons: ["spring", "autumn"],
    yearRange: { start: 2009, end: 2025 },
  },
  sm: {
    code: "sm",
    nameFull: "ITサービスマネージャ試験",
    urlSlug: "sm",
    level: "specialist",
    sessions: [
      am1(),
      am2(["ITサービスマネジメント", "ITIL", "SLA", "インシデント管理", "問題管理", "変更管理", "キャパシティ管理"]),
    ],
    seasons: ["spring"],
    yearRange: { start: 2012, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2011 },
  },
  au: {
    code: "au",
    nameFull: "システム監査技術者試験",
    urlSlug: "au",
    level: "specialist",
    sessions: [
      am1(),
      am2(["システム監査", "内部統制", "監査手続", "ITガバナンス", "リスク評価", "コンプライアンス"]),
    ],
    seasons: ["autumn"],
    yearRange: { start: 2012, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2011 },
  },
};

export const ALL_EXAM_CODES = Object.keys(EXAM_CONFIGS) as ExamCode[];

/** Fallback URL shown when a question has no specific PDF URL. */
export const IPA_EXAM_INFO_URL = "https://www.ipa.go.jp/shiken/mondai-kaiotu/";

/**
 * Returns a valid IPA source URL for the given raw value.
 * Falls back to the IPA exam materials page when the URL is absent or clearly a placeholder.
 */
export function getSafePdfUrl(sourcePdfUrl: string | undefined): string {
  if (sourcePdfUrl && sourcePdfUrl.startsWith("https://")) return sourcePdfUrl;
  return IPA_EXAM_INFO_URL;
}

/**
 * Returns the IPA official answer PDF URL for a question.
 * Derived from sourcePdfUrl by swapping "_qs.pdf" → "_ans.pdf" (the IPA naming convention).
 * Falls back to the safe info page when derivation is impossible.
 */
export function getOfficialAnswerPdfUrl(
  sourcePdfUrl: string | undefined,
): string {
  if (!sourcePdfUrl || !sourcePdfUrl.startsWith("https://")) {
    return IPA_EXAM_INFO_URL;
  }
  if (sourcePdfUrl.endsWith("_qs.pdf")) {
    return sourcePdfUrl.replace(/_qs\.pdf$/, "_ans.pdf");
  }
  // CBT or non-standard URLs: fall back to source link itself
  return sourcePdfUrl;
}

// ------- URL builders -------

export function buildPdfUrl(
  cfg: ExamConfig,
  year: number,
  season: Season,
  sessionCfg: SessionConfig,
  type: "qs" | "ans",
): string {
  // CBT exams have a different URL structure — return empty string as a safe fallback
  if (season === "cbt") return "";
  const rr = String(year - 2018).padStart(2, "0");
  const sn = season === "spring" ? "1" : "2";
  const sc = season === "spring" ? "h" : "a";
  return (
    `https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_${year}h${rr}_${sn}/` +
    `${year}h${rr}${sc}_${cfg.urlSlug}_${sessionCfg.urlSlug}_${type}.pdf`
  );
}

export function buildRawPdfPath(
  exam: ExamCode,
  year: number,
  season: Season,
  session: Session,
  type: "qs" | "ans",
  noSessionPrefix = false,
): string {
  if (noSessionPrefix) return `${exam}/${year}-${season}/${type}.pdf`;
  return `${exam}/${year}-${season}/${session}_${type}.pdf`;
}

// ------- Prompt builder -------

export function buildExtractionPrompt(
  cfg: ExamConfig,
  year: number,
  season: "spring" | "autumn" | "cbt",
  sessionCfg: SessionConfig,
): string {
  const seasonLabel = season === "spring" ? "春期" : season === "autumn" ? "秋期" : "CBT";
  const categoryList = sessionCfg.categories
    .map((c, i) => `${i + 1}. ${c}`)
    .join("\n");

  return `This is the IPA (情報処理技術者試験) ${cfg.nameFull} ${sessionCfg.label} exam question PDF for ${year}年度 ${seasonLabel}.

Extract ALL ${sessionCfg.expectedQuestions} multiple-choice questions. Each question has:
- 問番号 (question number)
- 問題文 (question text)
- 選択肢 labeled ア, イ, ウ, エ

Return ONLY a valid JSON array (no markdown, no explanation text):
[
  {
    "qNumber": 1,
    "question": "問題文の全文",
    "choices": { "ア": "...", "イ": "...", "ウ": "...", "エ": "..." },
    "category": "カテゴリ名",
    "hasImage": false
  }
]

For category, use one of these values:
${categoryList}

Set hasImage to true if the question references a figure or table that cannot be expressed in text.
Extract questions exactly as written. Do not paraphrase.`;
}

export function buildAnswerExtractionPrompt(sessionCfg: SessionConfig): string {
  return `This is the answer sheet for the IPA exam (${sessionCfg.label}, ${sessionCfg.expectedQuestions} questions).

Extract all ${sessionCfg.expectedQuestions} answers. Return ONLY a valid JSON object:
{
  "1": "ア",
  "2": "イ",
  ...
}

Answers are one of: ア, イ, ウ, エ`;
}

export function buildExplanationPrompt(
  cfg: ExamConfig,
  sessionCfg: SessionConfig,
  qList: string,
): string {
  return `以下はIPA ${cfg.nameFull} ${sessionCfg.label}問題です。各問について、正解の根拠を日本語で2〜3文で説明してください。

回答形式: 問題番号をキー、説明文を値とするJSONオブジェクト（マークダウン不要、JSONのみ）:
{
  "1": "問1の解説文",
  "2": "問2の解説文",
  ...
}

問題リスト:
${qList}`;
}
