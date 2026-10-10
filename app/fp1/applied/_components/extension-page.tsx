import Link from "next/link";
import type { Fp1AppliedExtension, Fp1AppliedExtensionQuestion } from "@/lib/fp1/applied-extension";
import { AppliedExtensionAnswers, AppliedExtensionQuestionBody, AppliedExtensionSharedCase } from "./extension-view";
export function AppliedExtensionPage({ data, question }: { data: Fp1AppliedExtension; question: Fp1AppliedExtensionQuestion }) {
  const sharedCase = data.sharedCases.find((item) => item.number === question.caseNumber)!;
  const editionLabel = data.edition === "202609" ? "2026年9月" : "2026年5月";
  return <main className="mx-auto w-full min-w-0 max-w-3xl break-words px-4 py-8 sm:py-12">
    <nav className="mb-5 text-sm"><Link href="/fp1">FP1級</Link> / <Link href={`/fp1/applied/${data.edition}`}>{editionLabel} 学科応用編</Link> / 問{question.number}</nav>
    <h1 className="text-2xl font-bold">{editionLabel} 学科応用編 問{question.number}</h1>
    <p className="my-4 text-sm">法令基準日 {data.lawReferenceDate}。{data.edition === "202605" ? "財務指標は本問の定義と設例に従います。問60の住所等変更登記は原問が明示する2026年4月1日施行の制度で解答します。" : "設例と公式問題の条件に従って解答します。"}</p>
    <AppliedExtensionSharedCase sharedCase={sharedCase} pdfUrl={data.sourceQuestionUrl} />
    <section aria-label="問題文" className="mt-5 rounded-2xl border border-border bg-card p-5"><h2 className="font-semibold">問{question.number} {question.title}</h2><AppliedExtensionQuestionBody question={question} pdfUrl={data.sourceQuestionUrl} /></section>
    <details className="mt-5 rounded-2xl border border-primary/30 bg-card p-5"><summary className="cursor-pointer font-bold text-primary">公式模範解答と解説を見る</summary><AppliedExtensionAnswers question={question} /><p className="mt-4 text-xs">□□□・＊＊＊は回答欄ではありません。伏字の補足計算は公式非公表の参考値です。独自解説は当サイトが作成したもので、主催団体の承認・監修を受けたものではありません。</p><ul className="mt-4 space-y-2 text-xs">{question.law.evidenceUrls.map((url) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline">一次資料・法令</a></li>)}</ul></details>
    <section aria-label="出典" className="mt-6 space-y-3 text-xs leading-6"><p>{data.sourceAttribution}</p><p>{data.processingDisclosure}</p><div className="flex flex-wrap gap-4"><a href={`${data.sourceQuestionUrl}#page=${question.source.questionPdfPage}`}>公式問題PDF（問{question.number}）</a><a href={`${data.sourceAnswerUrl}#page=${question.source.answerPdfPage}`}>公式模範解答PDF</a><a href={data.reuseConditionsUrl}>利用条件</a></div></section>
    <nav className="mt-8"><Link href={`/fp1/applied/${data.edition}`} className="text-primary underline">問題一覧へ</Link></nav>
  </main>;
}
