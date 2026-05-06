"use client";

import { Badge } from "@/components/ui/badge";
import type { Question } from "@/lib/questions/types";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { getSafePdfUrl } from "@/lib/exam-config";
import { QuestionBody } from "./QuestionBody";
import { TTSButton } from "./TTSButton";

const FIGURE_TABLE_RE =
  /図中|表中|図\s*\d|表\s*\d|図[一二三四五六七八九十]|表[一二三四五六七八九十]|下図|下表|次の図|次の表|右図|上図|図[ａ-ｚＡ-Ｚa-zA-Z]/;

function hasFigureTableRef(text: string): boolean {
  return FIGURE_TABLE_RE.test(text);
}

export function QuestionCard({
  question,
  progress,
}: {
  question: Question;
  progress?: { current: number; total: number };
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Badge variant="outline">
          {examLabel(question.exam)} {formatYearSeason(question.year, question.season)}
        </Badge>
        <Badge variant="default">問{question.qNumber}</Badge>
        <Badge variant="default">{question.category}</Badge>
        {question.topicTags.slice(0, 3).map((t) => (
          <Badge key={t} variant="outline">
            #{t}
          </Badge>
        ))}
        {question.isCalculation && <Badge variant="warn">計算</Badge>}
        {progress && (
          <span className="ml-auto font-medium text-zinc-600 dark:text-zinc-300">
            {progress.current + 1}問目 / {progress.total}問中
          </span>
        )}
      </div>
      <div className="selectable-content rounded-2xl border border-zinc-200 bg-white p-5 text-base leading-relaxed text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
        <div className="mb-2 flex justify-end">
          <TTSButton text={question.question} label="読み上げ" />
        </div>
        <QuestionBody text={question.question} />
        {question.hasImage && hasFigureTableRef(question.question) && (
          <div className="mt-3 flex items-start gap-1.5 rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs text-amber-800 dark:border-amber-700/50 dark:bg-amber-950/30 dark:text-amber-200">
            <span className="shrink-0">※</span>
            <span>
              この問題には図表が含まれます。正確な内容は{" "}
              <a
                href={getSafePdfUrl(question.sourcePdfUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-900 dark:hover:text-amber-100"
              >
                IPA公式PDF
              </a>
              をご確認ください。
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
