import { Map as MapIcon } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { EXAM_ROADMAP } from "@/lib/seo/exam-resources";

export function ExamRoadmap({ exam }: { exam: ExamCode }) {
  const steps = EXAM_ROADMAP[exam];
  if (!steps || steps.length === 0) return null;

  return (
    <section
      aria-label="学習ロードマップ"
      className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
          <MapIcon className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            学習ロードマップ
          </h2>
          <p className="text-[11px] text-muted-foreground">
            試験本番から逆算した、月単位の進め方の目安
          </p>
        </div>
      </div>
      <ol className="relative space-y-4 border-l-2 border-violet-500/20 pl-5">
        {steps.map((s) => (
          <li key={`${s.monthsBefore}-${s.title}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[26px] top-1 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-violet-500 bg-card"
            />
            <div className="text-[11px] font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              {s.monthsBefore === 0 ? "試験直前" : `${s.monthsBefore} ヶ月前`}
            </div>
            <h3 className="mt-0.5 text-sm font-semibold text-foreground">
              {s.title}
            </h3>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
        ※ ロードマップは IPA 公開統計と一般的な学習ペースを基にした目安です。受験者個々の前提知識・可処分時間に応じて調整してください。
      </p>
    </section>
  );
}
