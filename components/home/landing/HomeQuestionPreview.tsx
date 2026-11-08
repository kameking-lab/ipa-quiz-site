/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation avoids a stale prefetched quiz shell and keeps browser study storage. */

import { ArrowRight } from "lucide-react";
import { QuestionBody } from "@/components/quiz/QuestionBody";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { getSafePdfUrl } from "@/lib/exam-config";

export function HomeQuestionPreview() {
  const q = getQuestionsByExamStrict("ip").find((q) => q.id === "ip-2011a-am-q1");
  if (!q) return null;
  return <section aria-labelledby="home-example" className="study-example">
    <p className="study-kicker">問題の見本</p>
    <h2 id="home-example">ITパスポート</h2>
    <p className="study-caption">2011年 秋期 · 問1</p>
    <div className="study-example-question"><QuestionBody text={q.question} /></div>
    <ol aria-label="選択肢の見本" className="study-example-choices">{Object.entries(q.choices ?? {}).map(([key, text]) => <li key={key}><span>{key}</span><QuestionBody text={text} /></li>)}</ol>
    <a href="/quiz?mode=year&exam=ip&year=2011&season=autumn&session=am&question=ip-2011a-am-q1" className="study-primary w-full whitespace-normal text-center sm:w-auto">この問題で1問体験<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
    <p className="study-footnote"><a href={getSafePdfUrl(q.sourcePdfUrl)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">公式問題（PDF）</a></p>
  </section>;
}