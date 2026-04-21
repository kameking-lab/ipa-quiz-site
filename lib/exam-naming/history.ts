/**
 * IPA 情報処理技術者試験の歴史的名称マッピング。
 *
 * 2009年春期の制度改正で多くの試験が改名され、さらに SC（情報処理安全確保支援士）
 * のように 2017年春期に再度改名された区分もある。問題ページのタイトル・パンくず・
 * OGP・JSON-LD では、その問題が出題された当時の正式名称を使うべきである。
 *
 * このマッピングが無いと、たとえば 2016年秋期の SC 問題が「情報処理安全確保支援士」
 * として表示されてしまい、実際に IPA が公式発表していた当時の名称「情報セキュリティ
 * スペシャリスト試験」と食い違う。史料性・信頼性の観点で致命傷。
 */

import type { ExamCode } from "@/lib/questions/types";
import { EXAM_LABELS } from "@/lib/utils";

export interface ExamNameEntry {
  /** 正式名称（末尾の「試験」は含めない） */
  label: string;
  /** 試験区分略号の当時の表記（例: SC → SU、ST → AN） */
  shortLabel?: string;
  /**
   * この名称が有効になった開始日。`year` は西暦、`season` は春/秋。
   * 初回エントリのみ `year: 0` で「それ以前は定義なし」を表現する。
   */
  from: { year: number; season: "spring" | "autumn" };
}

/**
 * 各試験区分コードに対する名称変更の履歴。新しい順ではなく **古い順** に並べる。
 * 検索ロジックは「from 以降のエントリのうち最新のもの」を返す。
 */
const EXAM_NAME_HISTORY: Record<ExamCode, ExamNameEntry[]> = {
  ip: [
    { label: "ITパスポート", from: { year: 2009, season: "spring" } },
  ],
  sg: [
    {
      label: "情報セキュリティマネジメント",
      from: { year: 2016, season: "spring" },
    },
  ],
  fe: [
    { label: "基本情報技術者", from: { year: 2001, season: "spring" } },
  ],
  ap: [
    { label: "ソフトウェア開発技術者", shortLabel: "SW", from: { year: 2001, season: "spring" } },
    { label: "応用情報技術者", from: { year: 2009, season: "spring" } },
  ],
  st: [
    { label: "システムアナリスト", shortLabel: "AN", from: { year: 1994, season: "autumn" } },
    { label: "ITストラテジスト", from: { year: 2009, season: "autumn" } },
  ],
  sa: [
    { label: "アプリケーションエンジニア", shortLabel: "AE", from: { year: 1994, season: "autumn" } },
    { label: "システムアーキテクト", from: { year: 2009, season: "autumn" } },
  ],
  pm: [
    { label: "プロジェクトマネージャ", from: { year: 1994, season: "autumn" } },
  ],
  nw: [
    { label: "テクニカルエンジニア(ネットワーク)", shortLabel: "NW", from: { year: 2001, season: "spring" } },
    { label: "ネットワークスペシャリスト", from: { year: 2009, season: "autumn" } },
  ],
  db: [
    { label: "テクニカルエンジニア(データベース)", shortLabel: "DB", from: { year: 2001, season: "spring" } },
    { label: "データベーススペシャリスト", from: { year: 2009, season: "autumn" } },
  ],
  es: [
    { label: "テクニカルエンジニア(エンベデッドシステム)", shortLabel: "EM", from: { year: 2001, season: "spring" } },
    { label: "エンベデッドシステムスペシャリスト", from: { year: 2009, season: "autumn" } },
  ],
  sc: [
    { label: "テクニカルエンジニア(情報セキュリティ)", shortLabel: "SU", from: { year: 2006, season: "spring" } },
    { label: "情報セキュリティスペシャリスト", from: { year: 2009, season: "spring" } },
    { label: "情報処理安全確保支援士", from: { year: 2017, season: "spring" } },
  ],
  sm: [
    { label: "テクニカルエンジニア(システム管理)", shortLabel: "SV", from: { year: 2001, season: "spring" } },
    { label: "ITサービスマネージャ", from: { year: 2009, season: "autumn" } },
  ],
  au: [
    { label: "システム監査技術者", from: { year: 1986, season: "spring" } },
  ],
};

function seasonRank(season: string): number {
  return season === "spring" ? 0 : 1;
}

function isSameOrAfter(
  target: { year: number; season: string },
  threshold: { year: number; season: "spring" | "autumn" },
): boolean {
  if (target.year !== threshold.year) return target.year > threshold.year;
  return seasonRank(target.season) >= seasonRank(threshold.season);
}

/**
 * 指定の試験区分・年度・期における当時の正式名称を返す。
 * 該当する履歴エントリが無い場合は `EXAM_LABELS` の現行名称にフォールバックする。
 */
export function examLabelAt(exam: ExamCode, year: number, season: string): string {
  const history = EXAM_NAME_HISTORY[exam];
  if (!history || history.length === 0) return EXAM_LABELS[exam] ?? exam.toUpperCase();

  const target = { year, season };
  let match: ExamNameEntry | undefined;
  for (const entry of history) {
    if (isSameOrAfter(target, entry.from)) match = entry;
  }
  return match?.label ?? EXAM_LABELS[exam] ?? exam.toUpperCase();
}

/**
 * デバッグや管理画面で履歴全体を読み取りたい場合の read-only エクスポート。
 */
export function getExamNameHistory(exam: ExamCode): readonly ExamNameEntry[] {
  return EXAM_NAME_HISTORY[exam] ?? [];
}
