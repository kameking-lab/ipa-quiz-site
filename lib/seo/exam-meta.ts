import { QUESTIONS_BY_EXAM } from "@/data/questions";
import type { ExamCode, Question } from "@/lib/questions/types";
import { isPlaceholderExplanation } from "@/lib/questions/filter";
import { examLabel, formatYearSeason } from "@/lib/utils";

export const EXAM_DESCRIPTIONS: Partial<Record<ExamCode, string>> = {
  ip: "ITパスポート試験はIT全般の基礎知識を幅広く問う、職種を問わずITを活用するすべての社会人・学生向けの国家試験です。",
  sg: "情報セキュリティマネジメント試験は、企業内の情報セキュリティ対策を推進する人材の能力を認定する国家試験です。",
  fe: "基本情報技術者試験は、ITエンジニアの登竜門として位置づけられる国家試験で、プログラミング基礎とIT全般の知識を問います。",
  ap: "応用情報技術者試験は、ワンランク上のITエンジニアを目指す人向けの国家試験で、技術から管理・経営まで幅広い範囲を出題します。",
  st: "ITストラテジスト試験は、経営戦略に基づきIT戦略を策定・実行できる上位プロフェッショナルを認定する国家試験です。",
  sa: "システムアーキテクト試験は、情報システム全体のアーキテクチャ設計を担うITスペシャリストのための国家試験です。",
  pm: "プロジェクトマネージャ試験は、情報システム開発プロジェクトを統括するプロジェクトマネージャの能力を認定する国家試験です。",
  nw: "ネットワークスペシャリスト試験は、ネットワーク分野の専門技術者に向けた国家試験で、高度な設計・構築・運用知識を問います。",
  db: "データベーススペシャリスト試験は、データベースの設計・構築・運用・保守の専門家に向けた国家試験です。",
  es: "エンベデッドシステムスペシャリスト試験は、組込みシステム分野の専門技術者に向けた国家試験です。",
  sc: "情報処理安全確保支援士試験は、サイバーセキュリティ分野の国家資格で、専門的知識と実践力を認定します。",
  sm: "ITサービスマネージャ試験は、ITサービスの安定運用とマネジメントを担うプロフェッショナル向けの国家試験です。",
  au: "システム監査技術者試験は、情報システムの信頼性・安全性・効率性を監査する監査人向けの国家試験です。",
};

export function getAvailableExams(): ExamCode[] {
  return (Object.keys(QUESTIONS_BY_EXAM) as ExamCode[]).filter(
    (e) => (QUESTIONS_BY_EXAM[e]?.length ?? 0) > 0,
  );
}

/**
 * Indexable questions for an exam — the single canonical basis for every
 * user-facing count and listing (exam hub, year/category pages, sitemap).
 *
 * Phase 11 / F-6: per-exam/category counts previously used the raw module
 * length while the home headline + sitemap used the indexable count, so
 * summing the category badges produced a third, larger number. Deriving
 * everything from the indexable set makes all breakdowns reconcile to the
 * headline. needsReview questions 404 at /q and placeholder-explanation
 * questions are noindex, so neither should be advertised in counts/listings.
 */
export function getQuestionsByExamStrict(exam: ExamCode): Question[] {
  return (QUESTIONS_BY_EXAM[exam] ?? []).filter(
    (q) => !q.needsReview && !isPlaceholderExplanation(q),
  );
}

/**
 * /[exam]/topic/[category] ページが実在するか（= strict プールに同分野の
 * 問題が 1 件以上あるか）。topic ルートは dynamicParams=false かつ pool 空で
 * notFound() するため、空分野へのリンクは 404 になる。問題詳細ページが分野
 * リンクを張ってよいかの単一の判定源。
 */
export function examTopicPageExists(exam: ExamCode, category: string): boolean {
  return getQuestionsByExamStrict(exam).some((q) => q.category === category);
}

export interface YearSeasonGroup {
  year: number;
  season: Question["season"];
  key: string;
  label: string;
  count: number;
}

export function groupByYearSeason(questions: Question[]): YearSeasonGroup[] {
  const map = new Map<string, YearSeasonGroup>();
  for (const q of questions) {
    const key = `${q.year}-${q.season}`;
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(key, {
        year: q.year,
        season: q.season,
        key,
        label: formatYearSeason(q.year, q.season),
        count: 1,
      });
    }
  }
  return [...map.values()].sort((a, b) =>
    b.year !== a.year ? b.year - a.year : a.season.localeCompare(b.season),
  );
}

export function groupByCategory(
  questions: Question[],
): { category: string; count: number }[] {
  const map = new Map<string, number>();
  for (const q of questions) map.set(q.category, (map.get(q.category) ?? 0) + 1);
  return [...map.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function examTopTitle(exam: ExamCode): string {
  return `${examLabel(exam)} 過去問一覧・AI解説`;
}

export function examTopDescription(exam: ExamCode, questionCount: number): string {
  const base = EXAM_DESCRIPTIONS[exam] ?? "";
  return `${base}${examLabel(exam)}の過去問${questionCount}問を年度別・分野別に収録。AIコパイロット付きで効率的に学習。`;
}

const EXAM_FULL_NAMES: Record<ExamCode, string> = {
  ip: "ITパスポート試験",
  sg: "情報セキュリティマネジメント試験",
  fe: "基本情報技術者試験",
  ap: "応用情報技術者試験",
  st: "ITストラテジスト試験",
  sa: "システムアーキテクト試験",
  pm: "プロジェクトマネージャ試験",
  nw: "ネットワークスペシャリスト試験",
  db: "データベーススペシャリスト試験",
  es: "エンベデッドシステムスペシャリスト試験",
  sc: "情報処理安全確保支援士試験",
  sm: "ITサービスマネージャ試験",
  au: "システム監査技術者試験",
};

export function examFullName(exam: ExamCode): string {
  return EXAM_FULL_NAMES[exam];
}

const EXAM_META_DESC_DIVERSE: Record<
  ExamCode,
  (c: string, y: number, k: number) => string
> = {
  ip: (c, y, k) =>
    `職種・年齢を問わずITを活用するすべての社会人・就活生が対象のIT基礎国家試験。CBT通年受験に対応、${c}問・${y}期分・${k}分野を実問題AI解説で体系的に対策。合格率は比較的高く、ビジネス現場のIT活用力を証明できる。`,
  sg: (c, y, k) =>
    `組織のセキュリティ管理を担う担当者・管理職向けの国家試験、情報セキュリティマネジメント試験はCBT通年実施。${c}問・${y}期分・${k}分野をAI解説で完全習得。情報漏洩・不正アクセス・ランサムウェアへの組織的対応力を実問題で段階的に養成。`,
  fe: (c, y, k) =>
    `エンジニア志望の学生・新人IT職の第一歩、基本情報技術者試験はCBTで科目A・B別受験が可能。${c}問・${y}期分・${k}分野をAI解説で体系的に対策。アルゴリズム・プログラミング基礎からネットワーク・セキュリティまで幅広く段階的に習得。`,
  ap: (c, y, k) =>
    `高度試験への登竜門、応用情報技術者は午前80問＋午後記述の両軸でエンジニア中堅力を証明する。${c}問・${y}期分・${k}分野をAI解説で効率対策。テクノロジーから経営戦略・プロジェクト管理まで横断した幅広い実力を実問題で段階的にマスター。`,
  sc: (c, y, k) =>
    `唯一の登録制セキュリティ国家資格、情報処理安全確保支援士(RISS)は午前Ⅱ・午後記述で専門技術を問う。${c}問・${y}期分・${k}分野をAI解説で対策。サイバー攻撃への実践的防御力・脆弱性管理力とセキュリティ関連法規の知識を同時に育成。`,
  nw: (c, y, k) =>
    `ネットワーク設計・構築・運用を担う専門技術者の最高峰、ネットワークスペシャリストは午後記述で実践力を審査する。${c}問・${y}期分・${k}分野をAI解説で対策。CCNA/CCNP資格と連動した深いプロトコル・セキュリティの専門知識を実問題で習得。`,
  db: (c, y, k) =>
    `データモデリング・SQL・物理設計まで問うデータベーススペシャリストは、データ基盤を担う専門技術者の登竜門。${c}問・${y}期分・${k}分野をAI解説で対策。ER図・正規化から物理設計・パフォーマンスチューニングまで実務即戦力を体系的に養成。`,
  st: (c, y, k) =>
    `経営戦略に基づきIT投資を判断するCIO・DX推進リーダー向け、ITストラテジストは論述で構想力を審査する最高峰試験。${c}問・${y}期分・${k}分野をAI解説で対策。経営層に求められるIT投資判断力とビジネス変革の構想力を実問題で養成する。`,
  sa: (c, y, k) =>
    `情報システム全体の基本設計・非機能要件を統括するシステムアーキテクト試験は、論述で設計力を問う高度試験。${c}問・${y}期分・${k}分野をAI解説で対策。大規模システムのアーキテクチャ選択と性能・可用性トレードオフを判断する実力を育成。`,
  pm: (c, y, k) =>
    `コスト・スコープ・リスクを統括するプロジェクトマネージャ試験は、PMBOK連動の論述で実践管理力を審査。${c}問・${y}期分・${k}分野をAI解説で対策。IT開発プロジェクトを確実に完遂するコスト・品質・スコープ統合管理の専門マネジメント力を養成。`,
  es: (c, y, k) =>
    `組込みシステム・IoTデバイスの設計から評価まで担うエンベデッドシステムスペシャリストは、ハードウェア制御を問う専門試験。${c}問・${y}期分・${k}分野をAI解説で対策。組込み開発の要件定義・ハードウェア設計・実装から結合テストまで全域を習得。`,
  sm: (c, y, k) =>
    `SLA管理・変更管理・インシデント対応を担うITサービスマネージャ試験は、ITIL準拠の論述で運用マネジメント力を審査。${c}問・${y}期分・${k}分野をAI解説で対策。変化するビジネス要件に対応しながら安定したITサービスを継続する専門力を養成。`,
  au: (c, y, k) =>
    `内部統制・J-SOX・IT全般統制を評価するシステム監査技術者試験は、論述で監査人としての判断力を問う高度試験。${c}問・${y}期分・${k}分野をAI解説で対策。財務・情報システムのリスクベースドアプローチによる実務監査力を体系的に習得。`,
};

export function examMetaDescription(
  exam: ExamCode,
  questionCount: number,
  mode?: "year" | "topic",
): string {
  const name = EXAM_FULL_NAMES[exam];
  const questions = getQuestionsByExamStrict(exam);
  const yearCount = groupByYearSeason(questions).length;
  const categoryCount = groupByCategory(questions).length;
  const countFmt = questionCount.toLocaleString("ja-JP");

  if (mode === "year") {
    return `${name}の年度別過去問を${countFmt}問収録。AI コパイロットが選択肢ごとに即解説。全${yearCount}期分・${categoryCount}分野を完全無料公開。会員登録不要。`;
  }
  if (mode === "topic") {
    return `${name}の分野別過去問を${countFmt}問収録。AI コパイロットが選択肢ごとに即解説。${categoryCount}分野・${yearCount}期分を完全無料公開。会員登録不要。`;
  }
  return EXAM_META_DESC_DIVERSE[exam](countFmt, yearCount, categoryCount);
}

export function countByExam(exam: ExamCode): number {
  return getQuestionsByExamStrict(exam).length;
}
