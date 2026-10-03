import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { QuestionBody } from "@/components/quiz/QuestionBody";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { questionPagePath } from "@/lib/seo/question-url";
import { getOfficialAnswerPdfUrl, getSafePdfUrl, isPdfDocumentUrl } from "@/lib/exam-config";

/** A genuine published example; text/explanation/source come from the same protected question. */
export function HomeQuestionPreview({ idSuffix = "desktop" }: { idSuffix?: string }) {
  const q = getQuestionsByExamStrict("ip").find((q) => q.id === "ip-2011a-am-q1");
  if (!q) return null;
  return <section aria-labelledby={`home-example-${idSuffix}`} className="mt-6 rounded-2xl border border-indigo-200 bg-card p-4 dark:border-indigo-900">
    <div className="flex items-center justify-between gap-2"><h2 id={`home-example-${idSuffix}`} className="text-sm font-bold">こんなふうに学べます</h2><span className="text-[10px] font-semibold text-muted-foreground">ITパスポート · 2011年 秋期 問1</span></div>
    <div className="mt-3 text-sm leading-relaxed"><QuestionBody text={q.question} /></div>
    <Link href={questionPagePath(q)} className="mt-3 flex min-h-11 items-center justify-between gap-3 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground">この過去問を解いてみる<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
    <details className="mt-3"><summary className="min-h-11 cursor-pointer py-3 text-xs font-semibold text-primary">正答と学習用解説を先に読む</summary><div className="rounded-xl bg-muted/30 p-3 text-xs leading-relaxed"><p className="mb-2 font-bold">公式正答：{Array.isArray(q.answer) ? q.answer.join("・") : q.answer}</p><QuestionBody text={q.explanation} /><p className="mt-2 text-[10px] text-muted-foreground">学習支援用の解説です。公式解説ではありません。</p></div></details>
    <div className="flex flex-wrap gap-x-3 text-[11px]"><a href={getSafePdfUrl(q.sourcePdfUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-muted-foreground underline underline-offset-4">{isPdfDocumentUrl(getSafePdfUrl(q.sourcePdfUrl)) ? "公式問題PDF" : "公式問題の公開ページ"}</a><a href={getOfficialAnswerPdfUrl(q.sourcePdfUrl, q.sourceAnswerUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-muted-foreground underline underline-offset-4">{isPdfDocumentUrl(getOfficialAnswerPdfUrl(q.sourcePdfUrl, q.sourceAnswerUrl)) ? "公式正答PDF" : "公式正答の公開ページ"}</a></div>
  </section>;
}
