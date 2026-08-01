import Link from "next/link";
import { Code2, ArrowRight } from "lucide-react";

import type { ExamCode, Session } from "@/lib/questions/types";

/**
 * 土台＝基本情報 科目B（アルゴリズム・擬似言語）の完全対策ピラーへの導線。
 * FE の科目B (session === "kamoku-b") 問題ページにのみ表示する。FE 午前MC の
 * 「アルゴリズムとプログラミング」分野は擬似言語そのものではないため、分野では
 * なく session で厳密にゲートして誇大表現を避ける（科目B＝擬似言語の実データ）。
 * /q/* は最大のクロール面なので、SSR の <Link href="/blog/fe-kamoku-b-taisaku">
 * で土台ピラー（indexable）へのクローラブル内部リンクを張る。
 * 旗艦側の AfternoonEssayHint と対称の null-gate サーバーコンポーネント。
 */
const KAMOKU_B_EXAM: ExamCode = "fe";
const KAMOKU_B_SESSION: Session = "kamoku-b";

export function KamokuBStudyHint({
  exam,
  session,
}: {
  exam: ExamCode;
  session: Session;
}) {
  if (exam !== KAMOKU_B_EXAM || session !== KAMOKU_B_SESSION) return null;

  return (
    <aside
      aria-label="基本情報 科目B（アルゴリズム・擬似言語）の対策"
      className="mt-4 flex items-start gap-3 rounded-2xl border border-indigo-300/70 bg-indigo-50/60 p-4 dark:border-indigo-800/60 dark:bg-indigo-950/30 sm:p-5"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
        <Code2 className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          科目Bは擬似言語のトレース力で決まる
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">
          基本情報 科目B（アルゴリズム）を体系的に攻略
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          擬似言語が読めない・トレースで詰まるなら、読み方の型から最短で整理。AI
          コパイロットに「1 行ずつトレースして」と聞きながら解けます。
        </p>
        <Link
          href="/blog/fe-kamoku-b-taisaku"
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-indigo-700 hover:underline dark:text-indigo-400"
        >
          科目B 完全対策を読む
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
