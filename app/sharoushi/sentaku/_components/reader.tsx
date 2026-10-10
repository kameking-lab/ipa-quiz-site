import Link from "next/link";
import { FIELD_LABELS, sentakuParagraphs, sentakuPath, type SentakuQuestion } from "@/lib/sharoushi/sentaku";

function WordBank({ words }: { words: { id:number; label:string; text:string }[] }) {
  return <ol className="grid min-w-0 gap-x-6 gap-y-3 sm:grid-cols-2">{words.map(word=><li key={word.id} className="flex min-w-0 gap-2 text-sm leading-7"><span className="shrink-0 font-semibold">{word.label}</span><span className="min-w-0 break-words [overflow-wrap:anywhere]">{word.text}</span></li>)}</ol>;
}
export function SentakuReader({ question:q }: { question:SentakuQuestion }) {
 const paragraphs=sentakuParagraphs(q.rawSourceText).map(part=>part.replace("次の文中のの部分", "次の文中の空欄の部分"));
 return <main className="mx-auto w-full min-w-0 max-w-3xl break-words px-4 py-8 sm:py-12">
  <nav className="mb-5 flex flex-wrap gap-2 text-sm"><Link href="/sharoushi" className="underline">社労士</Link><span>/</span><Link href={sentakuPath(q.year)} className="underline">第{q.examRound}回 選択式</Link><span>/ 問{q.questionNumber}</span></nav>
  <h1 className="text-2xl font-bold sm:text-3xl">第{q.examRound}回 選択式 問{q.questionNumber}</h1><p className="mt-3 text-lg">{q.subject}</p>
  <p className="mt-3 text-sm text-muted-foreground">{q.year}年度・法令基準日 {q.lawAsOf} ／ 1原問・5空欄</p>
  <section aria-label="問題文" className="mt-6 border-y border-border py-6"><h2 className="sr-only">問題文</h2>
   <div className="space-y-5">{paragraphs.map((stem,index)=><p key={index} className="text-base leading-[2.1]">{stem.split(/(\{\{[A-E]\}\})/).map((part,i)=>/^\{\{[A-E]\}\}$/.test(part)?<span key={i} className="mx-1 inline-block min-w-10 border border-current px-2 text-center font-bold" aria-label={`空欄${part[2]}`}>{part[2]}</span>:part)}</p>)}</div>
  </section>
  <section aria-label="語群" className="mt-6 min-w-0"><h2 className="mb-4 text-lg font-semibold">{q.wordBankMode==="shared-20"?"共通の語群（①〜⑳）":"空欄ごとの語群（各①〜④）"}</h2>
   {q.wordBankMode==="shared-20"?<WordBank words={q.sharedWordBank}/>:<div className="space-y-6">{FIELD_LABELS.map(label=><section key={label} aria-label={`空欄${label}の語群`}><h3 className="mb-2 font-semibold">空欄 {label}</h3><WordBank words={q.blankWordBanks[label]}/></section>)}</div>}
  </section>
  <details className="mt-8 rounded-xl border border-primary/30 bg-card p-4 sm:p-5" data-testid="sentaku-answers"><summary className="min-h-11 cursor-pointer py-2 font-bold text-primary">公式正答と解説を見る</summary>
   <div className="mt-4 space-y-6">{q.blanks.map(b=><section key={b.id}><h2 className="font-semibold">空欄 {b.id}　{String.fromCodePoint(0x2460+b.answerOptionId-1)} {b.answerText}</h2><p className="mt-2 text-sm leading-7">{b.explanation}</p></section>)}</div>
  </details>
  <section aria-label="出典" className="mt-8 space-y-3 text-xs leading-6 text-muted-foreground"><h2 className="font-semibold">出典</h2><p>全国社会保険労務士会連合会 試験センターの第{q.examRound}回公式問題・正答。原問の5空欄と語群番号を保持しています。文字間・改行・数字表記と空欄の表示を整え、解説は過去問AIが独自に作成しています。</p>
   <div className="flex flex-wrap gap-x-4 gap-y-2">{q.sourcePdfPhysicalPages.map(page=><a key={page} href={`${q.sourceUrl}#page=${page}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">公式問題PDF p.{page}</a>)}<a href={q.officialAnswerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">公式正答PDF</a></div>
   {q.review.evidenceUrls.length>0?<details><summary className="cursor-pointer py-2">解説の一次資料</summary><ul>{q.review.evidenceUrls.map((url,i)=><li key={url}><a href={url} className="inline-flex min-h-11 items-center underline" target="_blank" rel="noopener noreferrer">一次資料 {i+1}</a></li>)}</ul></details>:null}
  </section><nav className="mt-8"><Link className="inline-flex min-h-11 items-center text-primary underline" href={sentakuPath(q.year)}>年度の問題一覧へ</Link></nav>
 </main>;
}
