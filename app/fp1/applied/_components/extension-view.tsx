import type { ReactElement } from "react";
import type { AppliedBlock, Fp1AppliedExtension, Fp1AppliedExtensionQuestion } from "@/lib/fp1/applied-extension";

/** 原問形式を保つ追加表示部品。route・generateStaticParams からは未接続（統合手順で明示的に接続する）。 */
const withUnit = (answer: string, unit: string | undefined): string => (unit ? `${answer}（${unit}）` : answer);

export function AppliedBlocks({ blocks, pdfUrl }: { blocks: readonly AppliedBlock[]; pdfUrl?: string | undefined }): ReactElement {
  return <div className="min-w-0 space-y-4">{blocks.map((item, index) => {
    switch (item.type) {
      case "paragraph": return <p key={index} className="text-base leading-[1.9]">{item.text}</p>;
      case "list": return <ul key={index} className="list-disc space-y-2 pl-5 text-sm leading-7">{item.items.map((entry, i) => <li key={i}>{entry}</li>)}</ul>;
      case "table": return <div key={index} role="region" aria-label={item.caption} tabIndex={0} className="overflow-x-auto rounded-xl border border-border bg-background">
        <table className="w-full min-w-[32rem] border-collapse text-sm">
          <caption className="p-3 text-left font-semibold">{item.caption}{item.unitNote ? <span className="block text-xs font-normal text-muted-foreground">{item.unitNote}</span> : null}</caption>
          <thead><tr><th scope="col" className="border-b border-border p-2 text-left">{item.rowHeaderLabel}</th>{item.columns.map((column, i) => <th key={i} scope="col" className="border-b border-border p-2 text-left">{column}</th>)}</tr></thead>
          <tbody>{item.rows.map((row, r) => <tr key={r}>
            <th scope="row" className="sticky left-0 border-b border-border bg-background p-2 text-left font-medium">{row.group ? <span className="block text-xs text-muted-foreground">{row.group}</span> : null}{row.label}</th>
            {row.cells.map((entry, k) => <td key={k} className="border-b border-border p-2 text-left tabular-nums">{entry.text}{entry.blank && !entry.text.includes(entry.blank) ? <><span className="sr-only"> 空欄</span><span className="ml-1 font-bold">{entry.blank}</span></> : null}</td>)}
          </tr>)}</tbody>
        </table>
      </div>;
      case "formula": return <figure key={index} className="rounded-xl border border-border bg-background p-4">{item.caption ? <figcaption className="font-semibold">{item.caption}</figcaption> : null}<p className="mt-2 whitespace-pre-wrap break-words font-mono text-sm leading-7">{item.expression}</p>{item.notes.map((note, i) => <p key={i} className="mt-2 text-sm leading-7">{note}</p>)}</figure>;
      case "figure": return <figure key={index} className="rounded-xl border border-border bg-background p-4">
        <figcaption className="font-semibold">{item.caption}</figcaption>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">{item.facts.map((fact, i) => <li key={i}>{fact}</li>)}</ul>
        {item.notes.length > 0 ? <ol aria-label="図の注記" className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7">{item.notes.map((note, i) => <li key={i}>{note}</li>)}</ol> : null}
        <p className="mt-3 text-xs leading-6 text-muted-foreground">{item.processingNotice}{pdfUrl ? <> <a href={`${pdfUrl}#page=${item.originalPdfPage}`} target="_blank" rel="noopener noreferrer" className="text-primary underline">原紙の図（PDF p.{item.originalPdfPage}）</a></> : null}</p>
      </figure>;
    }
  })}</div>;
}

export function AppliedExtensionQuestionBody({ question, pdfUrl }: { question: Fp1AppliedExtensionQuestion; pdfUrl?: string | undefined }): ReactElement {
  return <>
    <p className="mt-3 text-base leading-[1.9]">{question.instruction}</p>
    {question.law.temporalOverride ? <p className="mt-3 text-sm leading-7">{question.law.temporalOverride.text}（基準日 {question.law.referenceDate}・適用日 {question.law.temporalOverride.effectiveDate}）</p> : null}
    {question.type === "originalmixedcloze"
      ? <div className="mt-4 space-y-5">{question.sections.map((section, i) => <section key={i}>
          {section.heading ? <h3 className="font-semibold">〈{section.heading}〉</h3> : null}
          <div className="mt-3 space-y-4 text-base leading-[1.9]">{section.paragraphs.map((paragraph, j) => <p key={j}>{j === 0 && section.numeral ? `${section.numeral} ` : ""}{paragraph}</p>)}</div>
        </section>)}</div>
      : <>
        <dl aria-label="計算問題" className="mt-4 space-y-3">{question.answers.map((answer) => <div key={answer.label} className="flex min-w-0 gap-3 text-base leading-7"><dt className="shrink-0 font-bold">{answer.label}</dt><dd className="min-w-0">{answer.prompt}</dd></div>)}</dl>
        {question.dependsOn ? <p className="mt-3 text-sm leading-7">問{question.dependsOn.question}の空欄{question.dependsOn.label}の値を用います。</p> : null}
      </>}
    {question.conditions.length > 0 ? <section aria-label="条件" className="mt-5"><h3 className="font-semibold">〈条件〉</h3>{question.conditions.map((condition, i) => <section key={i} className="mt-4">{condition.heading ? <h4 className="font-semibold">{condition.heading}</h4> : null}<ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7">{condition.lines.map((line, j) => <li key={j}>{line}</li>)}</ul></section>)}</section> : null}
    {question.blocks.length > 0 ? <div className="mt-5"><AppliedBlocks blocks={question.blocks} pdfUrl={pdfUrl} /></div> : null}
  </>;
}

export function AppliedExtensionAnswers({ question }: { question: Fp1AppliedExtensionQuestion }): ReactElement {
  const { rounding } = question;
  const fields: readonly { label: string; officialAnswer: string; unit?: string | undefined; occurrences: number; explanation: string }[] = question.type === "originalmixedcloze" ? question.fields : question.answers;
  return <>
    <section aria-label="公式模範解答" className="mt-4">
      <h2 className="font-semibold">公式模範解答</h2>
      <dl className="mt-3 space-y-2">{fields.map((field) => <div key={field.label} className="flex gap-3 text-lg font-bold"><dt>{field.label}</dt><dd>{withUnit(field.officialAnswer, field.unit)}</dd></div>)}</dl>
      {fields.some((field) => field.occurrences > 1) ? <p className="mt-3 text-xs leading-6 text-muted-foreground">同じ丸数字が複数回現れても回答欄は一つで、同じ値または語句を入れます。</p> : null}
      {rounding.rule !== "none" ? <p className="mt-3 text-xs leading-6 text-muted-foreground">{rounding.text}{rounding.rule === "round-half-up" && rounding.intermediateNote ? <span className="block">{rounding.intermediateNote}</span> : null}</p> : null}
    </section>
    <section aria-label="独自解説" className="mt-5 border-t border-border pt-5">
      <h2 className="font-semibold">独自解説</h2>
      <div className="mt-3 space-y-4">{question.type === "originalworkedcalculation" ? question.answers.map((answer) => <section key={answer.label}><h3 className="font-semibold text-primary">計算{answer.label}</h3><ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-7">{answer.calculationSteps.map((step, i) => <li key={i}>{step}</li>)}</ol><p className="mt-3 text-sm leading-7">{answer.explanation}</p></section>) : fields.map((field) => <section key={field.label}><h3 className="font-semibold text-primary">空欄{field.label}</h3><p className="mt-2 text-sm leading-7">{field.explanation}</p></section>)}</div>
    </section>
  </>;
}

export function AppliedExtensionSharedCase({ sharedCase, pdfUrl }: { sharedCase: Fp1AppliedExtension["sharedCases"][number]; pdfUrl: string }): ReactElement {
  return <section aria-label="共通設例" className="rounded-2xl border border-border bg-card p-5 sm:p-6"><h2 className="text-lg font-semibold">{sharedCase.title}</h2>{sharedCase.instruction ? <p className="mt-3 text-sm leading-7">{sharedCase.instruction}</p> : null}<p className="mt-2 text-xs leading-6 text-muted-foreground">原問範囲: 問{sharedCase.officialQuestionRange[0]}～{sharedCase.officialQuestionRange[1]} / 収録: {sharedCase.includedQuestionNumbers.map((number) => `問${number}`).join("・")}</p><div className="mt-4"><AppliedBlocks blocks={sharedCase.blocks} pdfUrl={pdfUrl} /></div></section>;
}
