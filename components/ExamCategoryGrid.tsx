import Link from "next/link";
import type { ExamCode } from "@/lib/questions/types";

interface ExamCardDef {
  id: ExamCode;
  abbr: string;
  name: string;
  sub?: string;
}

const EXAM_CARDS: ExamCardDef[] = [
  { id: "ip", abbr: "IP", name: "ITパスポート" },
  { id: "sg", abbr: "SG", name: "セキュリティ", sub: "マネジメント" },
  { id: "fe", abbr: "FE", name: "基本情報", sub: "技術者" },
  { id: "ap", abbr: "AP", name: "応用情報", sub: "技術者" },
  { id: "sc", abbr: "SC", name: "情報処理", sub: "安全確保支援士" },
  { id: "nw", abbr: "NW", name: "ネットワーク", sub: "スペシャリスト" },
  { id: "db", abbr: "DB", name: "データベース", sub: "スペシャリスト" },
  { id: "es", abbr: "ES", name: "エンベデッド", sub: "システム" },
  { id: "st", abbr: "ST", name: "ITストラテジスト" },
  { id: "sa", abbr: "SA", name: "システム", sub: "アーキテクト" },
  { id: "pm", abbr: "PM", name: "プロジェクト", sub: "マネージャ" },
  { id: "sm", abbr: "SM", name: "ITサービス", sub: "マネージャ" },
  { id: "au", abbr: "AU", name: "システム監査", sub: "技術者" },
];

interface Props {
  /** Question counts per exam code, computed server-side from QUESTIONS_BY_EXAM. */
  questionCounts: Partial<Record<ExamCode, number>>;
  /** When provided, available cards become buttons that call onSelect instead of navigating. */
  onSelect?: (exam: ExamCode) => void;
  /** Currently highlighted exam when onSelect is wired. */
  selected?: ExamCode | null;
}

export function ExamCategoryGrid({ questionCounts, onSelect, selected }: Props) {
  const availableExams = EXAM_CARDS.filter((e) => (questionCounts[e.id] ?? 0) > 0);
  const comingSoonExams = EXAM_CARDS.filter((e) => (questionCounts[e.id] ?? 0) === 0);

  return (
    <>
      {availableExams.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {availableExams.map((exam) => {
            const count = questionCounts[exam.id] ?? 0;
            const isSelected = selected === exam.id;
            const cardClass = `group flex flex-col gap-1.5 rounded-2xl border-2 p-3.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow sm:p-4 ${
              isSelected
                ? "border-sky-500 bg-sky-100 ring-2 ring-sky-400/40 dark:border-sky-400 dark:bg-sky-900/60 dark:ring-sky-500/30"
                : "border-sky-300 bg-sky-50 hover:border-sky-400 dark:border-sky-700 dark:bg-sky-950/40 dark:hover:border-sky-500"
            }`;
            const inner = (
              <>
                <div className="flex items-start justify-between gap-1">
                  <span className="rounded-lg bg-sky-600 px-2 py-0.5 text-sm font-bold text-white">
                    {exam.abbr}
                  </span>
                  <span
                    className={
                      isSelected
                        ? "rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-semibold text-white"
                        : "rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                    }
                  >
                    {isSelected ? "選択中" : "利用可能"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {exam.name}
                  </p>
                  {exam.sub && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{exam.sub}</p>
                  )}
                </div>
                <p className="text-[11px] text-sky-700 dark:text-sky-300">{count}問収録</p>
              </>
            );
            if (onSelect) {
              return (
                <button
                  key={exam.id}
                  type="button"
                  onClick={() => onSelect(exam.id)}
                  aria-pressed={isSelected}
                  className={cardClass}
                >
                  {inner}
                </button>
              );
            }
            return (
              <Link
                key={exam.id}
                href={`/quiz?mode=random&exam=${exam.id}`}
                className={cardClass}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      )}

      {comingSoonExams.length > 0 && (
        <>
          <p className="mb-2 mt-4 text-xs font-medium text-zinc-400 dark:text-zinc-500">
            近日公開
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {comingSoonExams.map((exam) => (
              <div
                key={exam.id}
                aria-disabled="true"
                className="flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5 opacity-55 dark:border-zinc-800 dark:bg-zinc-900 sm:p-4"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="rounded-lg bg-zinc-400 px-2 py-0.5 text-sm font-bold text-white dark:bg-zinc-600">
                    {exam.abbr}
                  </span>
                  <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                    近日公開
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {exam.name}
                  </p>
                  {exam.sub && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">{exam.sub}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
