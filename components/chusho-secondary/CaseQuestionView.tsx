import {NativeQuestionGate} from "@/mobile/shared/NativeQuestionGate";
import Link from "next/link";
import {CaseSource} from "./CaseSource";
import {AnswerPractice} from "./AnswerPractice";
import {chushoCasePath,chushoQuestionPath,INDEPENDENT_EXAMPLE_NOTICE} from "@/lib/chusho-secondary/format";
import type {ChushoCase,ChushoQuestion} from "@/lib/chusho-secondary/data";
function CaseQuestionViewBody({paper:p,question:q}:{paper:ChushoCase;question:ChushoQuestion}) {
  const previous = p.questions.find(row => row.number === q.number - 1);
  const next = p.questions.find(row => row.number === q.number + 1);
  return <main data-study-presence-exam="chusho-secondary" className="mx-auto max-w-4xl px-4 pb-20 pt-8">
    <Link href={chushoCasePath(p.year, p.case)} className="text-sm font-semibold text-primary hover:underline">← {p.year}年度 {p.caseTitle}の原問一覧</Link>
    <h1 className="mt-5 text-2xl font-bold sm:text-3xl">{p.year}年度 {p.caseTitle} 第{q.number}問：{q.topic}</h1>
    <p className="mt-3 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-7">{INDEPENDENT_EXAMPLE_NOTICE}</p>
    <section className="mt-6 rounded-xl border border-border p-4" aria-labelledby="official-question-title">
      <h2 id="official-question-title" className="text-xl font-bold">公式原問（配点{q.points}点）</h2>
      <p className="mt-4 whitespace-pre-line text-sm leading-8">{q.questionText}</p>
    </section>
    <CaseSource paper={p} />
    <AnswerPractice questionId={q.id} solutions={q.solutions} />
    <section className="mt-6 rounded-xl border border-border p-4" aria-labelledby="intent-title">
      <h2 id="intent-title" className="font-bold">出題趣旨を踏まえた学習ポイント</h2>
      <p className="mt-2 text-sm leading-7">{q.intentSummary}</p><p className="mt-2 text-xs text-muted-foreground">公式の出題趣旨を当サイトが要約したものです。独自解答例は上のボタンから確認できます。</p>
    </section>
    <nav aria-label="同じ事例の原問" className="mt-8 flex flex-wrap justify-between gap-4">
      {previous ? <Link className="min-h-11 py-3 font-semibold text-primary hover:underline" href={chushoQuestionPath(p.year, p.case, previous.number)}>← 第{previous.number}問</Link> : <Link className="min-h-11 py-3 text-primary hover:underline" href={chushoCasePath(p.year, p.case)}>事例の一覧</Link>}
      {next && <Link className="min-h-11 py-3 font-semibold text-primary hover:underline" href={chushoQuestionPath(p.year, p.case, next.number)}>第{next.number}問 →</Link>}
    </nav>
  </main>;
}

export function CaseQuestionView(props:Parameters<typeof CaseQuestionViewBody>[0]) { return <NativeQuestionGate id={props.question.id}><CaseQuestionViewBody {...props}/></NativeQuestionGate>; }
