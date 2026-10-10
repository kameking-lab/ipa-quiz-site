import Link from "next/link";
import type { NativeQuestion } from "@/lib/denken2/native";
import { NATIVE_EDITIONS, nativeSubjectPath } from "@/lib/denken2/native";
import { NativeAnswer } from "./NativeAnswer";

const subjectName = { theory: "理論", power: "電力", machine: "機械", law: "法規" };
type ChoiceGroups = NativeQuestion["choiceGroups"];
const flat = (groups: ChoiceGroups): groups is Record<string, string> =>
  Object.values(groups).every(value => typeof value === "string");

function WordBanks({ question }: { question: NativeQuestion }) {
  if (flat(question.choiceGroups)) {
    return <section aria-label="解答群" className="mt-8">
      <h2 className="text-lg font-bold">原本の解答群</h2>
      <ul className="mt-3 grid min-w-0 gap-3 sm:grid-cols-2">
        {Object.entries(question.choiceGroups).map(([label, value]) =>
          <li key={label} className="min-w-0 rounded-lg border border-border p-3 text-sm leading-7">
            <span className="mr-2 font-bold">{label}</span><span className="break-words [overflow-wrap:anywhere]">{value}</span>
          </li>)}
      </ul>
    </section>;
  }
  return <section aria-label="原本の表と解答群" className="mt-8 space-y-6">
    <h2 className="text-lg font-bold">原本の表と解答群</h2>
    {Object.entries(question.choiceGroups).map(([group, options]) =>
      <div key={group} role="region" aria-label={group} tabIndex={0}
        className="max-w-full overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <caption className="p-3 text-left font-semibold">{group}</caption>
          <tbody>{Object.entries(options).map(([label, text]) =>
            <tr key={label}><th scope="row" className="w-20 border-t border-border p-3 align-top">{label}</th>
              <td className="border-t border-border p-3 leading-7">{text}</td></tr>)}</tbody>
        </table>
      </div>)}
  </section>;
}

export function NativeReader({ question }: { question: NativeQuestion }) {
  const edition = NATIVE_EDITIONS.find(item => item.year === question.year);
  if (!edition) throw new Error("Native edition missing");
  const name = subjectName[question.subject];
  return <main className="mx-auto w-full min-w-0 max-w-4xl px-4 py-8 sm:py-12">
    <nav className="mb-6 flex flex-wrap gap-2 text-sm">
      <Link href="/denken2" className="text-primary underline">電験二種</Link>
      <span>/</span>
      <Link href={nativeSubjectPath(question.year, question.subject)} className="text-primary underline">{question.year}年度 {name}</Link>
      <span>/ 問{question.number}</span>
    </nav>
    <h1 className="text-2xl font-bold sm:text-3xl">電験二種 {question.year}年度 一次試験 {name} 問{question.number}</h1>
    <p className="mt-3 text-sm text-muted-foreground">試験日 {question.examDate}。1原問・{question.subject === "machine" && question.year === 2026 && question.number === 7 ? "定義5欄＋単位5欄" : "5欄"}。{question.alternateQuestionRule ? "問7と問8は選択問題で、実際の試験ではどちらか一方を解答します。" : ""}</p>
    <section aria-label="問題本文" className="mt-7 border-t border-border pt-6">
      <h2 className="sr-only">問題本文</h2>
      <p className="whitespace-pre-wrap break-words text-base leading-8 [overflow-wrap:anywhere]">{question.questionText}</p>
    </section>
    {question.figures.length ? <section aria-label="図の読み取り補助" className="mt-6 rounded-xl border border-border bg-card p-4">
      <h2 className="font-semibold">図の読み取り補助</h2>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7">
        {question.figures.map((figure, index) => <li key={index}>{figure}</li>)}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">図・数式・表は次の公式原本画像も確認してください。</p>
    </section> : null}
    <section aria-label="公式問題原本画像" className="mt-8 space-y-5">
      <h2 className="text-lg font-bold">公式問題の原本画像</h2>
      {question.sourcePages.map(page => <figure key={page.url} className="rounded-xl border border-border p-3">
        <figcaption className="mb-3 text-sm font-semibold">公式PDF p.{page.physicalPage}</figcaption>
        <div role="region" aria-label={`公式PDF p.${page.physicalPage} 画像`} tabIndex={0}
          className="max-w-full overflow-x-auto rounded-lg bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element -- Keep the verified source page at its original ratio without image optimizer changes. */}
          <img src={page.url} alt={`${name} 問${question.number}の公式問題 PDF p.${page.physicalPage}`}
            className="h-auto w-[60rem] max-w-none sm:w-full" loading="lazy" />
        </div>
        <a href={`${question.sourcePdfUrl}#page=${page.physicalPage}`} target="_blank"
          rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm text-primary underline">公式PDFでこのページを開く</a>
      </figure>)}
    </section>
    <WordBanks question={question} />
    <NativeAnswer question={question} />
    <section aria-label="出典" className="mt-8 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
      <h2 className="font-semibold">出典と加工</h2>
      <p className="mt-2">出典：一般財団法人 電気技術者試験センター「{question.year}年度 第二種電気主任技術者一次試験 {name}」。原問は5欄単位のまま掲載し、文章の整形と各欄の解説は当サイトが作成しました。図・数式・表は公式問題PDFの画像です。</p>
      <div className="mt-2 flex flex-wrap gap-4">
        <a href={question.sourcePdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">公式問題PDF</a>
        <a href={edition.sourceAnswerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">公式正答PDF</a>
        <a href={edition.sourceIndexUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">公式過去問一覧</a>
      </div>
    </section>
  </main>;
}
