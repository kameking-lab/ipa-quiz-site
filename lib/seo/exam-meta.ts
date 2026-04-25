import { QUESTIONS_BY_EXAM } from "@/data/questions";
import type { ExamCode, Question } from "@/lib/questions/types";
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

export function getQuestionsByExamStrict(exam: ExamCode): Question[] {
  return QUESTIONS_BY_EXAM[exam] ?? [];
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

export function examMetaDescription(
  exam: ExamCode,
  questionCount: number,
  mode?: "year" | "topic",
): string {
  const name = EXAM_FULL_NAMES[exam];
  const modePart =
    mode === "year"
      ? "を年度別にAIコパイロットで解説"
      : mode === "topic"
        ? "を分野別にAIコパイロットで解説"
        : "をAIコパイロットで解説";
  return `${name}の過去問${modePart}。全${questionCount}問収録。`;
}

export function countByExam(exam: ExamCode): number {
  return getQuestionsByExamStrict(exam).length;
}
