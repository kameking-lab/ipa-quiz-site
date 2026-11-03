import type { ChoiceKey, Question } from "@/lib/questions/types";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { QuestionBody } from "./QuestionBody";

function safeHttpsUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

/** Printed source and independently written commentary remain separate. */
export function QuestionSourcePresentation({
  question,
  phase,
}: {
  question: Question;
  phase: "before" | "after";
}) {
  const original = question.originalContent;
  const source = question.sourcePresentation;
  const notice = question.questionNotice;
  const sections = question.explanationSections ?? [];
  if (!original && !source && !notice && sections.length === 0) return null;

  return (
    <div className="space-y-3 text-sm leading-relaxed" data-source-presentation={phase}>
      {notice && (
        <aside role="note" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-950 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-100">
          <QuestionBody text={notice} />
        </aside>
      )}
      {phase === "before" && original && (
        <section aria-label="原問の資料" className="space-y-3">
          {original.sharedPassages?.map((passage, index) => (
            <section key={`${index}-${passage.label}`} className="rounded-lg border border-border p-3">
              <h3 className="font-semibold">{passage.label}</h3>
              <QuestionBody text={passage.text} />
            </section>
          ))}
          {original.tables?.map((table, index) => (
            <div key={`${index}-${table.caption}`} className="overflow-x-auto rounded-lg border border-border p-3">
              <table className="w-full border-collapse text-left">
                <caption className="mb-2 text-left font-semibold">{table.caption}</caption>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="whitespace-pre-wrap border border-border p-2 align-top">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <details className="rounded-lg border border-border p-3">
            <summary className="cursor-pointer font-semibold">原問本文（全文）</summary>
            <div className="mt-2"><QuestionBody text={original.body} /></div>
          </details>
          {original.choices && Object.keys(original.choices).length > 0 && (
            <details className="rounded-lg border border-border p-3">
              <summary className="cursor-pointer font-semibold">原問の選択肢（全文）</summary>
              <dl className="mt-2 space-y-2">
                {Object.entries(original.choices).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[2rem_1fr] gap-2">
                    <dt className="font-semibold">{choiceDisplayLabel(question.exam, key as ChoiceKey)}</dt>
                    <dd><QuestionBody text={value} /></dd>
                  </div>
                ))}
              </dl>
            </details>
          )}
          {original.postOptionNote && (
            <section aria-label="原問の選択肢後の注記" className="rounded-lg border border-border p-3">
              <QuestionBody text={original.postOptionNote} />
            </section>
          )}
        </section>
      )}
      {phase === "after" && sections.length > 0 && (
        <section aria-label="補足解説" className="space-y-3">
          {sections.map((section, index) => (
            <div key={`${index}-${section.label}`} className="rounded-lg border border-border p-3">
              <h3 className="font-semibold">{section.label}</h3>
              <QuestionBody text={section.text} />
            </div>
          ))}
        </section>
      )}
      {source && (
        <aside aria-label="原問の出典と加工表示" className="rounded-lg border border-border bg-muted/40 p-3 text-xs">
          <p>出典: {source.documentTitle}</p>
          <p>原作成者: {source.originalAuthor}</p>
          <p>加工者: {source.processor}</p>
          <p>加工内容: {source.processedParts.join("、")}</p>
          <p>解説は当サイトが独自に作成したもので、原作成者・政府機関が作成したものではありません。</p>
          <div className="flex flex-wrap gap-3">
            {safeHttpsUrl(question.sourcePdfUrl) && <a href={safeHttpsUrl(question.sourcePdfUrl)} target="_blank" rel="noopener noreferrer" className="underline">問題PDF</a>}
            {safeHttpsUrl(question.sourceAnswerUrl) && <a href={safeHttpsUrl(question.sourceAnswerUrl)} target="_blank" rel="noopener noreferrer" className="underline">公式正答PDF</a>}
            {safeHttpsUrl(source.termsUrl) && <a href={safeHttpsUrl(source.termsUrl)} target="_blank" rel="noopener noreferrer" className="underline">利用条件</a>}
            {safeHttpsUrl(source.licenseUrl) && <a href={safeHttpsUrl(source.licenseUrl)} target="_blank" rel="noopener noreferrer" className="underline">公共データ利用規約（PDL）</a>}
          </div>
        </aside>
      )}
    </div>
  );
}
