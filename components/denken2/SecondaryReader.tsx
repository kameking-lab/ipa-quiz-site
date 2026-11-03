"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SecondaryQuestion } from "@/lib/denken2/secondary";

type Draft = { answers: Record<string, string>; status: "unreviewed" | "done" | "retry" };
const EMPTY: Draft = { answers: {}, status: "unreviewed" };
const draftKey = (id: string) => `denken2-written-v1:${id}`;
function readDraft(id: string): Draft {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(draftKey(id)) ?? "null");
    if (!value || typeof value !== "object") return EMPTY;
    const candidate = value as Partial<Draft>;
    const answers = candidate.answers && typeof candidate.answers === "object"
      ? Object.fromEntries(Object.entries(candidate.answers).filter((entry): entry is [string, string] => typeof entry[1] === "string")) : {};
    const status = candidate.status === "done" || candidate.status === "retry" ? candidate.status : "unreviewed";
    return { answers, status };
  } catch { return EMPTY; }
}

function SourcePages({ question, answer = false }: { question: SecondaryQuestion; answer?: boolean }) {
  const pages = answer ? question.answerPages : question.sourcePages;
  const pdf = answer ? question.answerPdfUrl : question.sourcePdfUrl;
  return <div className="mt-4 space-y-5">{pages.map((page, index) => <figure key={page.url} className="min-w-0 rounded-xl border border-border bg-card p-3">
    <figcaption className="mb-2 text-sm font-semibold">公式{answer ? "標準解答" : "問題"} PDF p.{page.physicalPage}</figcaption>
    <div role="region" aria-label={`公式${answer ? "標準解答" : "問題"} p.${page.physicalPage} 画像`} tabIndex={0}
      className="max-w-full overflow-x-auto rounded-lg bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      {/* eslint-disable-next-line @next/next/no-img-element -- Preserve the hash-verified source-page rendering and its dimensions. */}
      <img src={page.url} alt={`${question.year}年度 ${question.subject === "power-management" ? "電力・管理" : "機械・制御"} 問${question.number} ${question.topic}の公式${answer ? "標準解答" : "問題"} p.${page.physicalPage}`}
        width={page.width} height={page.height} loading={!answer && index === 0 ? "eager" : "lazy"}
        className="h-auto w-[60rem] max-w-none sm:w-full" />
    </div>
    <div className="mt-2 flex flex-wrap gap-x-5 text-sm text-primary">
      <a href={page.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">画像を大きく開く</a>
      <a href={`${pdf}#page=${page.physicalPage}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">公式PDFで開く</a>
    </div>
  </figure>)}</div>;
}

export function SecondaryReader({ question, previous, next }: { question: SecondaryQuestion; previous?: string; next?: string }) {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [revealed, setRevealed] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [ready, setReady] = useState(false);
  const name = question.subject === "power-management" ? "電力・管理" : "機械・制御";
  useEffect(() => {
    // Restore browser-only study notes after hydration; the server has no localStorage.
    setDraft(readDraft(question.id));
    setReady(true);
  }, [question.id]);
  function save(value: Draft) {
    setDraft(value);
    try { localStorage.setItem(draftKey(question.id), JSON.stringify(value)); setStorageError(false); }
    catch { setStorageError(true); }
  }
  return <main className="mx-auto w-full min-w-0 max-w-4xl px-4 py-8 sm:py-12">
    <nav aria-label="パンくず" className="mb-5 flex flex-wrap gap-2 text-sm text-primary">
      <Link href="/denken2" className="underline">電験二種</Link><span>/</span>
      <Link href={`/denken2/secondary#${question.year}-${question.subject}`} className="underline">{question.year}年度 二次 {name}</Link><span className="text-muted-foreground">/ 問{question.number}</span>
    </nav>
    <h1 className="text-2xl font-bold sm:text-3xl">電験二種 {question.year}年度 二次試験 {name} 問{question.number}</h1>
    <p className="mt-3 font-medium">{question.topic}</p>
    <p className="mt-2 text-sm leading-7 text-muted-foreground">試験日 {question.examDate}。1原問・30点。{name}は{question.subject === "power-management" ? "6問中4問を選択、120分" : "4問中2問を選択、60分"}です。このページでは全小問を練習できます。</p>
    <section aria-labelledby="written-source" className="mt-7">
      <h2 id="written-source" className="text-xl font-bold">問題を読む</h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">図・数式・条件は公式原本のまま掲載しています。スマートフォンでは画像内を横にスクロールするか、大きく開いて確認できます。</p>
      <SourcePages question={question} />
    </section>
    <section aria-labelledby="written-draft" aria-busy={!ready} className="mt-8 rounded-2xl border border-border bg-card p-4 sm:p-6">
      <h2 id="written-draft" className="text-xl font-bold">自分の解答を書く</h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">式の導出・単位・有効数字も記録しましょう。図や波形は手元の紙に描いて比較できます。記述内容と復習状況はこのブラウザに保存されます。</p>
      {storageError && <p role="alert" className="mt-3 text-sm text-destructive">ブラウザに保存できませんでした。ページを離れる前に解答を控えてください。</p>}
      <div className="mt-4 space-y-4">{question.requestedSubparts.map(part => <div key={part}>
        <label htmlFor={`${question.id}-part-${part}`} className="mb-2 block font-semibold">小問（{part}）の解答</label>
        <textarea id={`${question.id}-part-${part}`} rows={4} disabled={!ready} value={draft.answers[String(part)] ?? ""}
          onChange={event => save({ ...draft, answers: { ...draft.answers, [String(part)]: event.target.value } })}
          className="w-full min-w-0 rounded-xl border border-input bg-background p-3 text-base leading-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
      </div>)}</div>
      <button type="button" disabled={!ready} aria-expanded={revealed} aria-controls="written-solutions" onClick={() => setRevealed(value => !value)}
        className="mt-5 min-h-12 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40">
        {revealed ? "解答・解説を閉じる" : "公式標準解答と解説を確認する"}
      </button>
    </section>
    {revealed && <section id="written-solutions" aria-labelledby="written-solutions-title" className="mt-8 space-y-6">
      <h2 id="written-solutions-title" className="text-xl font-bold">小問ごとの解答と考え方</h2>
      {question.solutions.map(part => <article key={part.label} className="min-w-0 rounded-xl border border-border p-4 sm:p-5">
        <h3 className="font-bold">{part.label}</h3>
        <p className="mt-2 break-words font-semibold leading-8 [overflow-wrap:anywhere]">{part.answer}</p>
        <p className="mt-3 break-words leading-8 [overflow-wrap:anywhere]">{part.explanation}</p>
      </article>)}
      <div><h3 className="text-lg font-bold">公式標準解答の原本</h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">図・波形・許容される解答例と照合してください。複数の原問が同じPDFページに載る場合は、対象の問番号を確認します。</p>
        <SourcePages question={question} answer />
      </div>
      <fieldset className="rounded-xl border border-border p-4">
        <legend className="px-2 font-bold">自分で復習状況を記録</legend>
        <p className="text-sm text-muted-foreground">公式標準解答との比較による学習記録です。自動採点は行いません。</p>
        <div className="mt-3 flex flex-wrap gap-2">{([['done', '解けた'], ['retry', '要復習'], ['unreviewed', '未確認']] as const).map(([status, label]) =>
          <button key={status} type="button" aria-pressed={draft.status === status} onClick={() => save({ ...draft, status })}
            className={`min-h-11 rounded-lg border px-4 py-2 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${draft.status === status ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{label}</button>)}
        </div>
      </fieldset>
    </section>}
    <nav aria-label="問題を移動" className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-primary">
      {previous ? <Link href={previous} className="inline-flex min-h-11 items-center underline">← 前の原問</Link> : <span />}
      <Link href="/denken2/secondary" className="inline-flex min-h-11 items-center underline">二次の全20問</Link>
      {next ? <Link href={next} className="inline-flex min-h-11 items-center underline">次の原問 →</Link> : <span />}
    </nav>
    <section aria-label="出典" className="mt-7 text-xs leading-7 text-muted-foreground">
      <p>出典：一般財団法人 電気技術者試験センター「{question.year}年度 第二種電気主任技術者二次試験 {name}」および標準解答。画像は公式PDFをページ単位で描画したものです。小問ごとの学習用解説は当サイトが作成しました。</p>
      <div className="flex flex-wrap gap-x-5">
        <a href={question.sourcePdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">公式問題PDF</a>
        <a href={question.answerPdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">公式標準解答PDF</a>
        <a href="https://www.shiken.or.jp/chief/second/qa/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">公式過去問一覧</a>
      </div>
    </section>
  </main>;
}
