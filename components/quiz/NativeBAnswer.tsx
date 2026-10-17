"use client";

/* eslint-disable @next/next/no-img-element -- Original paper crops retain their intrinsic aspect ratio and exact bytes. */

import * as React from "react";
import type { NativeBData, NativeBGrade } from "@/lib/questions/types";
import type { NativeBSelections } from "@/lib/questions/native-b";
import { QuestionBody } from "./QuestionBody";

export function NativeBAnswerInput({ data, disabled, onAnswer, displayedImageUrls = [] }: {
  data: NativeBData; disabled: boolean; onAnswer: (selections: NativeBSelections) => void; displayedImageUrls?: readonly string[];
}) {
  const [selections, setSelections] = React.useState<Record<string, string>>({});
  const submitted = React.useRef(false);
  const id = React.useId();
  const visibleBankImages = [...new Set(data.bankImageUrls ?? [])].filter((url) => !displayedImageUrls.includes(url));
  return <form aria-label="五つの空欄の回答" className="space-y-4 rounded-xl border bg-background p-4 text-foreground" onSubmit={(event) => {
    event.preventDefault();
    if (disabled || submitted.current) return;
    submitted.current = true;
    onAnswer(selections);
  }}>
    <p className="text-sm">各枠に一つずつ選んでください。同じ候補を複数の枠で選べます。未回答の枠があっても採点できます。</p>
    {visibleBankImages.map((url) => <img key={url} src={url} alt={data.bankImageAltTexts?.[data.bankImageUrls!.indexOf(url)] ?? "公式問題の共通語群・数式表"} className="max-h-none max-w-full rounded border" />)}
    {data.candidates.some((candidate) => candidate.imageUrl) && <div aria-label="候補の原図" className="space-y-3">{data.candidates.map((candidate) => candidate.imageUrl && !displayedImageUrls.includes(candidate.imageUrl) && !visibleBankImages.includes(candidate.imageUrl) && <figure key={candidate.id}><figcaption>{candidate.id}: {candidate.label}</figcaption><img src={candidate.imageUrl} alt={`候補 ${candidate.id} の原図`} className="max-w-full" /></figure>)}</div>}
    <fieldset disabled={disabled} className="space-y-3">
      <legend className="sr-only">五つの独立した回答枠</legend>
      {data.slots.map((slot, index) => <div key={slot.label}>
        <label htmlFor={`${id}-${index}`} className="block font-semibold">{slot.label}{slot.prompt && <QuestionBody text={slot.prompt} />}</label>
        <select id={`${id}-${index}`} value={selections[slot.label] ?? ""} onChange={(event) => setSelections((previous) => ({ ...previous, [slot.label]: event.target.value }))} className="min-h-11 w-full rounded border border-input bg-background px-3 text-foreground">
          <option value="">未回答</option>
          {data.candidates.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.id}: {candidate.label}</option>)}
        </select>
      </div>)}
    </fieldset>
    <button type="submit" disabled={disabled} className="min-h-11 rounded-lg bg-primary px-5 py-2 font-semibold text-primary-foreground disabled:opacity-60">回答を採点する</button>
  </form>;
}

export function NativeBFeedback({ data, result }: { data: NativeBData; result?: NativeBGrade }) {
  return <section aria-label="五枠の結果と解説" className="space-y-4 rounded-xl border bg-background p-4 text-foreground">
    <p role="status" className="font-semibold">{result ? `正答枠数 ${result.correctSlots}/5${result.isCorrect ? "（全枠正解）" : ""}` : "各枠の正答と解説"}</p>
    {data.officialScoring && <p className="text-sm">公式配点情報: {[data.officialScoring.maxPoints !== undefined && `満点 ${data.officialScoring.maxPoints}点`, data.officialScoring.pointsPerSlot !== undefined && `1枠 ${data.officialScoring.pointsPerSlot}点`, data.officialScoring.note].filter(Boolean).join(" / ")}</p>}
    <ol className="space-y-4">
      {data.slots.map((slot) => {
        const outcome = result?.slotResults.find((entry) => entry.label === slot.label);
        const candidate = data.candidates.find((entry) => entry.id === slot.answer)!;
        return <li key={slot.label}>
          <h3 className="font-semibold">{slot.label}: 正答 {candidate.id}: {candidate.label}</h3>
          {outcome && <p>あなたの回答: {outcome.status === "unanswered" ? "未回答" : outcome.selectedCandidateId} / {outcome.status === "correct" ? "正解" : outcome.status === "invalid" ? "無効な候補" : outcome.status === "unanswered" ? "未回答" : "不正解"}</p>}
          {slot.prompt && <QuestionBody text={slot.prompt} />}
          <QuestionBody text={slot.explanation} />
          {slot.candidateExplanations && <dl>{data.candidates.map((entry) => slot.candidateExplanations?.[entry.id] && <div key={entry.id} className="mt-2"><dt className="font-semibold">{entry.id}: {entry.label}</dt><dd><QuestionBody text={slot.candidateExplanations[entry.id]} /></dd></div>)}</dl>}
        </li>;
      })}
    </ol>
    <dl aria-label="共通候補の説明" className="space-y-3">{data.candidates.map((candidate) => <div key={candidate.id}>
      <dt className="font-semibold">{candidate.id}: {candidate.label}</dt>
      {candidate.imageUrl && <img src={candidate.imageUrl} alt={`候補 ${candidate.id} の原図`} className="max-w-full" />}
      {candidate.explanation && <dd><QuestionBody text={candidate.explanation} /></dd>}
    </div>)}</dl>
  </section>;
}
