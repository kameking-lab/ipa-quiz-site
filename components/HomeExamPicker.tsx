"use client";

import * as React from "react";
import Link from "next/link";
import { BookmarkCheck, CalendarDays, CircleHelp, Shuffle, Tags } from "lucide-react";
import { ExamCategoryGrid } from "./ExamCategoryGrid";
import { EXAM_LABELS } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";

interface Props {
  questionCounts: Partial<Record<ExamCode, number>>;
}

export function HomeExamPicker({ questionCounts }: Props) {
  const [selected, setSelected] = React.useState<ExamCode | null>(null);

  const modesRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (selected && modesRef.current) {
      modesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  return (
    <>
      <h2 className="mb-3 mt-8 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        試験区分を選んでください
      </h2>
      <ExamCategoryGrid
        questionCounts={questionCounts}
        selected={selected}
        onSelect={setSelected}
      />

      <div ref={modesRef} className="scroll-mt-16">
        {selected ? (
          <ExamModes exam={selected} />
        ) : (
          <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
            ↑ 試験区分を選ぶと、出題モードが表示されます
          </p>
        )}
      </div>
    </>
  );
}

function ExamModes({ exam }: { exam: ExamCode }) {
  const label = EXAM_LABELS[exam] ?? exam.toUpperCase();
  return (
    <section aria-labelledby="exam-modes-heading" className="mt-8">
      <h2
        id="exam-modes-heading"
        className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
      >
        {label}の出題モード
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ModeCard
          href={`/quiz?mode=random&exam=${exam}`}
          icon={<Shuffle className="h-5 w-5" />}
          title="ランダム出題"
          desc="全範囲からランダムに出題します。"
        />
        <ModeCard
          href={`/quiz?mode=unanswered&exam=${exam}`}
          icon={<CircleHelp className="h-5 w-5" />}
          title="未回答モード"
          desc="まだ解いていない問題だけを出題。"
        />
        <ModeCard
          href={`/quiz?mode=review&exam=${exam}`}
          icon={<BookmarkCheck className="h-5 w-5" />}
          title="復習モード"
          desc="間違えた問題と★付き問題だけ。"
        />
        <ModeCard
          href={`/modes/year?exam=${exam}`}
          icon={<CalendarDays className="h-5 w-5" />}
          title="年度別"
          desc="令和X年度春/秋 を選んで出題。"
        />
        <ModeCard
          href={`/modes/topic?exam=${exam}`}
          icon={<Tags className="h-5 w-5" />}
          title="分野別"
          desc="セキュリティ/ネットワーク等の分野別。"
        />
      </div>
    </section>
  );
}

function ModeCard({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700"
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span className="rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          {icon}
        </span>
        <span className="text-base font-semibold">{title}</span>
      </div>
      <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{desc}</p>
    </Link>
  );
}
