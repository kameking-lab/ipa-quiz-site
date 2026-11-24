import { questionSourceEdition, questionSourceExam } from "@/lib/questions/source-label";
import { QuestionFigures } from "./QuestionFigures";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";
import { P3Mascot } from "@/components/ui/P3Mascot";
import { Badge } from "@/components/ui/badge";
import type { Question } from "@/lib/questions/types";
import { questionNumberLabel } from "@/lib/questions/display";
import { getSafePdfUrl, ipaSourceLabel } from "@/lib/exam-config";
import { QuestionBody } from "./QuestionBody";
import { QuestionSourcePresentation } from "./QuestionSourcePresentation";
import { TTSButton } from "./TTSButton";
import { cn } from "@/lib/utils";

export function QuestionCard({
  question,
  progress,
  illustrated = false,
}: {
  question: Question;
  progress?: { current: number; total: number };
  illustrated?: boolean;
}) {
  const sourceUrl = getSafePdfUrl(question.sourceArchiveUrl ?? question.sourcePdfUrl);
  return (
    <div data-study-presence-exam={question.exam} className="space-y-3">
      <div className={illustrated ? "p3-quiz-hero p3-landscape p3-hero" : undefined}>
        <div className="flex min-w-0 flex-wrap items-center gap-1.5 self-center text-xs">
          <Badge variant="outline">
            {questionSourceExam(question)} {questionSourceEdition(question)}
          </Badge>
          {illustrated
            ? <strong className="basis-full font-display text-3xl leading-tight tabular-nums">問{questionNumberLabel(question)}</strong>
            : <Badge variant="default">問{questionNumberLabel(question)}</Badge>}
          {question.explanationCoverage === "official-summary" && <Badge variant="outline">公式正答と一般解説</Badge>}
          <Badge variant="default">{question.category}</Badge>
          {question.topicTags.slice(0, 3).map((t) => (
            <Badge key={t} variant="outline">
              #{t}
            </Badge>
          ))}
          {question.isCalculation && <Badge variant="warn">計算</Badge>}
          {progress && (
            <span className={illustrated ? "font-medium text-muted-foreground tabular-nums" : "ml-auto font-medium text-zinc-600 dark:text-zinc-300"}>
              {progress.current + 1}問目 / {progress.total}問中
            </span>
          )}
        </div>
        {illustrated && <P3Mascot exam={question.exam} />}
      </div>
      <div className={cn("selectable-content rounded-2xl border bg-card text-base leading-relaxed text-card-foreground shadow-sm",
        illustrated ? "border-hairline p-3.5" : "border-border p-5")}>
        {question.lawReferenceDate && (
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            法令基準日: {question.lawReferenceDate}（この日の制度で解答）
          </p>
        )}
        <QuestionSourcePresentation question={question} phase="before" />
        <QuestionBody text={question.question} />
        {question.questionAudioUrl ? (
          <audio key={question.id} src={question.questionAudioUrl} controls preload="none" aria-label="聞き取り音声" className="my-3 w-full" />
        ) : null}
        <QuestionFigures question={question} />
        <TTSButton text={question.question} />
        {hasUnrenderableContent(question) && (
          <div className="mt-3 flex items-start gap-1.5 rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs text-amber-800 dark:border-amber-700/50 dark:bg-amber-950/30 dark:text-amber-200">
            <span className="shrink-0">※</span>
            <span>
              この問題には図表が含まれます。正確な内容は{" "}
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-900 dark:hover:text-amber-100"
              >
                {question.sourceArchiveUrl ? "公式PDF（保存版）" : ipaSourceLabel(sourceUrl, "question")}
              </a>
              をご確認ください。
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
