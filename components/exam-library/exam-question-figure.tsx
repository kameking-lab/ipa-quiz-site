import type { ExamQuestion } from "@/lib/exam-library-model";

interface ExamQuestionFigureProps {
  question: ExamQuestion;
  prompt?: string;
}

/** Body text stays selectable and readable; only actual diagrams/tables use images. */
export function ExamQuestionFigure({ question, prompt }: ExamQuestionFigureProps) {
  const figures = question.presentation?.figures ?? [];
  return (
    <div className="min-w-0 space-y-4">
      <p className="whitespace-pre-line text-base leading-8 [overflow-wrap:anywhere]">
        {(question.presentation?.prompt ?? prompt ?? question.text).replace(/^問\s*[0-9０-９]+[\s　]*/, "")}
      </p>
      {figures.map((figure) => (
        <figure key={figure.src} className="overflow-hidden rounded-xl border border-slate-300 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element -- Source diagram crops must retain exact labels and proportions. */}
          <img src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} loading="lazy" className="mx-auto block h-auto max-w-full" />
          <figcaption className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-3 text-sm text-slate-800">
            <span>{figure.alt}</span>
            <a href={figure.src} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-sky-900 underline underline-offset-4">図表を拡大<span className="sr-only">（新しいタブ）</span></a>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
