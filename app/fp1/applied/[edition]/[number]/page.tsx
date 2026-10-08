import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FP1_APPLIED_EDITIONS, fp1AppliedQuestionPath, getFp1AppliedEdition } from "@/lib/fp1/applied";

interface RouteParams { edition: string; number: string }
export const dynamicParams = false;
export function generateStaticParams() {
  return FP1_APPLIED_EDITIONS.flatMap((edition) => getFp1AppliedEdition(edition)!.questions.map((question) => ({ edition, number: String(question.number) })));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { edition, number } = await params;
  const data = getFp1AppliedEdition(edition);
  const question = data?.questions.find((item) => String(item.number) === number);
  if (!data || !question) return { title: "問題が見つかりません", robots: { index: false } };
  return { title: `FP1級 ${data.label} 学科応用編 問${question.number}｜問題・模範解答`, description: `問${question.number} ${question.title}。${question.type === "originalcalculation" ? "共通設例、2つの計算問題、公式模範解答と計算過程を確認できます。" : "共通設例、空欄①〜④と空欄④の3肢、公式模範解答と独自解説を確認できます。"}法令基準日は${data.lawReferenceDate}です。`, alternates: { canonical: fp1AppliedQuestionPath(edition, question.number) } };
}

export default async function Fp1AppliedQuestionPage({ params }: { params: Promise<RouteParams> }) {
  const { edition, number } = await params;
  const data = getFp1AppliedEdition(edition);
  const question = data?.questions.find((item) => String(item.number) === number);
  if (!data || !question) notFound();
  return <main className="mx-auto w-full min-w-0 max-w-3xl break-words px-4 py-8 sm:py-12">
    <nav className="mb-5 text-sm text-muted-foreground"><Link href="/fp1" className="hover:underline">FP1級</Link> / <Link href="/fp1/applied" className="hover:underline">学科応用編</Link> / <Link href={`/fp1/applied/${edition}`} className="hover:underline">{data.label}</Link> / 問{question.number}</nav>
    <header><h1 className="text-2xl font-bold sm:text-3xl">{data.label} 学科応用編 問{question.number}</h1><p className="mt-2 text-sm font-medium text-muted-foreground">法令基準日 {data.lawReferenceDate}（この日の制度で解答）</p></header>
    <section aria-label="共通設例" className="mt-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-lg font-semibold">共通設例</h2>
      <p className="mt-3 text-sm leading-7">{question.sharedCase.instruction}</p>
      <div className="mt-3 space-y-3 text-base leading-[1.9]">{question.sharedCase.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      <h3 className="mt-5 font-semibold">{question.sharedCase.dataHeading}</h3>
      {question.sharedCase.persons.map((person) => <section key={person.label} className="mt-4 rounded-xl border border-border bg-background p-4">
        <h4 className="font-semibold">{person.label}</h4><p className="mt-2 text-sm leading-7">{person.birthAndAge}</p>
        <p className="mt-3 text-sm font-semibold">{person.pensionHeading}</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7">{person.pensionPeriods.map((period) => <li key={period}>{period}</li>)}</ul>
        {person.otherInsurance.map((insurance) => <p key={insurance} className="mt-3 text-sm leading-7">{insurance}</p>)}
      </section>)}
      <div className="mt-4 space-y-2 text-sm leading-7">{question.sharedCase.conditions.map((condition) => <p key={condition}>{condition}</p>)}</div>
    </section>
    <section aria-label="問題文" className="mt-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-lg font-semibold">問{question.number}</h2><p className="mt-3 text-base leading-[1.9]">{question.instruction}</p>
      <div className="mt-4 space-y-4 text-base leading-[1.9]">{question.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      {question.type === "originalcloze" ? <>
      <h3 className="mt-5 font-semibold">{question.choicesHeading}</h3>
      <dl aria-label="空欄④の選択肢" className="mt-3 space-y-3">{question.choicesForBlank4.map((choice) => <div key={choice.label} className="flex min-w-0 gap-3 rounded-xl border border-border bg-background p-4 text-base leading-7"><dt className="shrink-0 font-bold text-primary">{choice.label}</dt><dd className="min-w-0">{choice.text}</dd></div>)}</dl>
      </> : <>
        <dl aria-label="計算問題" className="mt-4 space-y-3">{question.prompts.map((prompt) => <div key={prompt.label} className="flex gap-3 text-base leading-7"><dt className="font-bold">{prompt.label}</dt><dd>{prompt.text}</dd></div>)}</dl>
        <section aria-label="計算条件" className="mt-5"><h3 className="font-semibold">〈条件〉</h3>{question.conditions.map((condition) => <section key={condition.heading} className="mt-4"><h4 className="font-semibold">{condition.heading}</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7">{condition.lines.map((line) => <li key={line}>{line}</li>)}</ul></section>)}</section>
      </>}
    </section>
    <details className="mt-5 rounded-2xl border border-primary/30 bg-card p-5 sm:p-6">
      <summary className="cursor-pointer text-lg font-bold text-primary">公式模範解答と解説を見る</summary>
      {question.type === "originalcloze" ? <>
      <section aria-label="公式模範解答" className="mt-4"><h2 className="font-semibold">公式模範解答</h2><dl className="mt-3 space-y-2">{question.blanks.map((blank) => <div key={blank.label} className="flex gap-3 text-lg font-bold"><dt>{blank.label}</dt><dd>{blank.officialAnswer}</dd></div>)}</dl><p className="mt-3 text-xs leading-6 text-muted-foreground">公式模範解答の表記を保持しています。③の「1年6」は18カ月と同じ期間ですが、18という表記の本番採点上の扱いを示すものではありません。</p></section>
      <section aria-label="空欄ごとの独自解説" className="mt-5 border-t border-border pt-5"><h2 className="font-semibold">空欄ごとの独自解説</h2><div className="mt-3 space-y-4">{question.blanks.map((blank) => <section key={blank.label}><h3 className="font-semibold text-primary">空欄{blank.label}</h3><p className="mt-2 text-sm leading-7">{blank.explanation}</p></section>)}</div></section>
      <section aria-label="空欄④の全3肢の理由" className="mt-5 border-t border-border pt-5"><h2 className="font-semibold">空欄④の全3肢の理由</h2><div className="mt-3 space-y-3">{question.choicesForBlank4.map((choice) => <section key={choice.label} className="rounded-xl border border-border bg-background p-4"><h3 className="font-semibold"><span className="mr-2 text-primary">{choice.label}</span>{choice.correct ? "正しい" : "この設例では誤り"}</h3><p className="mt-2 text-sm leading-7">{choice.text}</p><p className="mt-2 text-sm leading-7">{choice.explanation}</p></section>)}</div></section>
      <ul className="mt-5 flex flex-wrap gap-3 text-xs">{question.officialReferenceUrls.map((url, index) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{["厚生年金保険法（基準日版）", "国民年金法（基準日版）", "障害認定日の説明", "公式障害認定基準"][index]}</a></li>)}</ul>
      </> : <>
        <section aria-label="公式模範解答" className="mt-4"><h2 className="font-semibold">公式模範解答</h2><dl className="mt-3 space-y-2">{question.answers.map((answer) => <div key={answer.label} className="flex gap-3 text-lg font-bold"><dt>{answer.label}</dt><dd>{answer.officialAnswer}</dd></div>)}</dl></section>
        <section aria-label="計算過程と独自解説" className="mt-5 border-t border-border pt-5"><h2 className="font-semibold">計算過程と独自解説</h2>{question.answers.map((answer) => <section key={answer.label} className="mt-5"><h3 className="font-semibold text-primary">計算{answer.label}</h3><ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-7">{answer.calculationSteps.map((step) => <li key={step}>{step}</li>)}</ol><p className="mt-3 text-sm leading-7">{answer.explanation}</p></section>)}</section>
        <ul className="mt-5 flex flex-wrap gap-3 text-xs">{question.references.map((reference) => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{reference.label}</a></li>)}</ul>
      </>}
    </details>
    <section aria-label="出典" className="mt-6 space-y-3 text-xs leading-6 text-muted-foreground"><p>{question.type === "originalcalculation" ? question.sourceAttribution : data.sourceAttribution}</p><p>{question.type === "originalcalculation" ? question.processingDisclosure : data.processingDisclosure}</p><p>独自解説は当サイトが作成したもので、主催団体の推薦や責任を示すものではありません。</p><div className="flex flex-wrap gap-4"><a href={`${data.sourceQuestionUrl}#page=${question.sourcePages[1]}`} target="_blank" rel="noopener noreferrer" className="text-primary underline">公式問題PDF（問{question.number}）</a><a href={`${data.sourceAnswerUrl}#page=${question.sourceAnswerPage}`} target="_blank" rel="noopener noreferrer" className="text-primary underline">公式模範解答PDF</a><a href={data.sourceIndexUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">公式問題掲載ページ</a></div></section>
    <nav className="mt-8 border-t border-border pt-5 text-sm"><Link href={`/fp1/applied/${edition}`} className="text-primary hover:underline">{data.label} 学科応用編の問題一覧へ</Link></nav>
  </main>;
}
