import type { ExamCode, Session, Season } from "@/lib/questions/types";
import officialSources from "@/data/questions/corrections/official-sources.json";
import { isExamPublished } from "@/lib/qualifications/catalog";

const officialAnswerUrls = new Map(Object.values(officialSources).map(source => [source.question, source.answer]));

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
  /** Before the 2020/2021 schedule changes, most specialist exams used the opposite season */
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
    yearRange: { start: 2021, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2019 },
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
    yearRange: { start: 2021, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2019 },
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
    yearRange: { start: 2020, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2019 },
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
    yearRange: { start: 2021, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2019 },
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
    yearRange: { start: 2020, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2019 },
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
    yearRange: { start: 2020, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2019 },
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
    yearRange: { start: 2021, end: 2025 },
    legacySeasons: ["autumn"],
    legacyYearRange: { start: 2009, end: 2019 },
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
    yearRange: { start: 2020, end: 2025 },
    legacySeasons: ["spring"],
    legacyYearRange: { start: 2009, end: 2019 },
  },
  fp2: {
    code: "fp2",
    nameFull: "2級ファイナンシャル・プランニング技能検定",
    urlSlug: "fp2",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 60,
      label: "学科",
      categories: ["ライフプランニングと資金計画", "リスク管理", "金融資産運用", "タックスプランニング", "不動産", "相続・事業承継"],
    }],
    seasons: ["may", "september", "january", "published"],
    yearRange: { start: 2024, end: 2026 },
  },
  fp3: {
    code: "fp3",
    nameFull: "3級ファイナンシャル・プランニング技能検定",
    urlSlug: "fp3",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 60,
      label: "学科",
      categories: ["ライフプランニングと資金計画", "リスク管理", "金融資産運用", "タックスプランニング", "不動産", "相続・事業承継"],
    }],
    seasons: ["published"],
    yearRange: { start: 2024, end: 2025 },
  },
  denken3: {
    code: "denken3",
    nameFull: "第三種電気主任技術者試験",
    urlSlug: "denken3",
    level: "advanced",
    sessions: [
      { session: "riron", urlSlug: "riron", expectedQuestions: 20, label: "理論", categories: ["電気理論", "電子理論", "電気計測", "電子計測"] },
      { session: "denryoku", urlSlug: "denryoku", expectedQuestions: 20, label: "電力", categories: ["発電", "変電", "送配電", "電気材料"] },
      { session: "kikai", urlSlug: "kikai", expectedQuestions: 20, label: "機械", categories: ["電気機器", "パワーエレクトロニクス", "照明", "情報"] },
      { session: "houki", urlSlug: "houki", expectedQuestions: 20, label: "法規", categories: ["電気事業法", "電気設備技術基準", "電気施設管理"] },
    ],
    seasons: ["first", "second"],
    yearRange: { start: 2024, end: 2025 },
  },
  denko2: {
    code: "denko2",
    nameFull: "第二種電気工事士学科試験",
    urlSlug: "denko2",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 50,
      label: "学科",
      categories: ["電気理論・配電", "電気機器・材料・工具", "施工・法規・検査", "配線図"],
    }],
    seasons: ["first", "second"],
    yearRange: { start: 2024, end: 2025 },
  },
  takken: {
    code: "takken",
    nameFull: "宅地建物取引士資格試験",
    urlSlug: "takken",
    level: "advanced",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 50,
      label: "本試験",
      categories: ["権利関係", "法令上の制限", "税・価格評定", "宅建業法", "免除科目"],
    }],
    seasons: ["october"],
    yearRange: { start: 2025, end: 2025 },
  },
  civil2: {
    code: "civil2",
    nameFull: "2級土木施工管理技術検定",
    urlSlug: "civil2",
    level: "basic",
    sessions: [{
      session: "gakka",
      urlSlug: "gakka",
      expectedQuestions: 66,
      label: "第一次検定（前期・土木）",
      categories: ["土木一般（必須）", "土木一般（選択）", "専門土木（選択）", "法規（選択）", "施工管理（必須）"],
    }],
    seasons: ["early"],
    yearRange: { start: 2026, end: 2026 },
  },
};

/** IPA-only list retained for fetch/import tooling and legacy IPA invariants. */
export const ALL_EXAM_CODES = Object.keys(EXAM_CONFIGS).filter(
  (code): code is Exclude<ExamCode, "fp2" | "fp3" | "denken3" | "denko2" | "takken" | "civil2"> => code !== "fp2" && code !== "fp3" && code !== "denken3" && code !== "denko2" && code !== "takken" && code !== "civil2",
);

/** Every exam playable in the application, including external qualifications. */
export const ALL_QUIZ_EXAM_CODES = (Object.keys(EXAM_CONFIGS) as ExamCode[]).filter(isExamPublished);

/** Fallback URL shown when a question has no specific PDF URL. */
export const IPA_EXAM_INFO_URL = "https://www.ipa.go.jp/shiken/mondai-kaiotu/";

// www.jitec.ipa.go.jp was IPA's old exam-materials subdomain. IPA decommissioned
// it — the host no longer resolves (NXDOMAIN as of 2026-06) — so every stored
// sourcePdfUrl pointing there is a dead 出典 link. The replacement PDFs live under
// www.ipa.go.jp/shiken/mondai-kaiotu/ but in opaque CMS-hashed directories
// (…/gmcbt80000009sgk-att/…), so the old path cannot be remapped deterministically
// and IPA keeps only a limited window of years online. Rather than serve a dead
// link (or guess a new one that 404s), route these to the live IPA exam-materials
// index, which is always 200 and lists the current PDFs — keeping the 出典 link
// honest per CLAUDE.md §8. Already-migrated www.ipa.go.jp URLs pass through.
const DEAD_PDF_HOST = "jitec.ipa.go.jp";

function isLivePdfUrl(url: string | undefined): url is string {
  return (
    !!url && url.startsWith("https://") && !url.includes(DEAD_PDF_HOST)
  );
}

/** True when a link points directly to a PDF document, rather than an index page. */
export function isPdfDocumentUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    return new URL(url).pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return false;
  }
}

/** Honest user-facing label for an IPA source link after fallback handling. */
export function ipaSourceLabel(url: string | undefined, kind: "question" | "answer"): string {
  if (!isPdfDocumentUrl(url)) return "IPA公式の過去問一覧";
  return kind === "question" ? "問題PDF" : "公式解答PDF";
}

/**
 * Returns a valid, live IPA source URL for the given raw value.
 * Falls back to the IPA exam materials index when the URL is absent, a
 * placeholder, or points to the decommissioned jitec.ipa.go.jp host.
 */
export function getSafePdfUrl(sourcePdfUrl: string | undefined): string {
  return isLivePdfUrl(sourcePdfUrl) ? sourcePdfUrl : IPA_EXAM_INFO_URL;
}

/**
 * Returns the IPA official answer PDF URL for a question.
 * Derived from sourcePdfUrl by swapping "_qs.pdf" → "_ans.pdf" (the IPA naming convention).
 * Falls back to the safe info page when the URL is missing, a placeholder, or
 * on the decommissioned jitec.ipa.go.jp host (deriving from a dead URL stays dead).
 */
export function getOfficialAnswerPdfUrl(
  sourcePdfUrl: string | undefined,
  sourceAnswerUrl?: string,
): string {
  if (sourceAnswerUrl?.startsWith("https://")) return sourceAnswerUrl;
  if (sourcePdfUrl && officialAnswerUrls.has(sourcePdfUrl)) return officialAnswerUrls.get(sourcePdfUrl)!;
  if (!isLivePdfUrl(sourcePdfUrl)) {
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

/**
 * Returns the 出典 (source) URL to STORE in question data for a given exam slot.
 *
 * buildPdfUrl() still emits the legacy www.jitec.ipa.go.jp deep path (the fetch
 * crawler uses it to locate the raw file), but that host is decommissioned
 * (NXDOMAIN), so persisting its output as-is re-injects a dead 出典 link on every
 * parse run. getSafePdfUrl() degrades the dead host to the live IPA index —
 * matching exactly what the serve layer already shows — so parsed data stays
 * honest at rest, not just behind the runtime gate. See CLAUDE.md §8.
 */
export function buildSourcePdfUrl(
  cfg: ExamConfig,
  year: number,
  season: Season,
  sessionCfg: SessionConfig,
): string {
  return getSafePdfUrl(buildPdfUrl(cfg, year, season, sessionCfg, "qs"));
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
  season: Season,
  sessionCfg: SessionConfig,
): string {
  const seasonLabel = season === "spring" ? "春期" : season === "autumn" ? "秋期" : season === "cbt" ? "CBT" : season;
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
