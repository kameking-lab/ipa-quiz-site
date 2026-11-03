"use client";

import { useEffect, useMemo, useState } from "react";
import { KISHO_PRIVATE_ASSETS, KISHO_PRIVATE_COUNTS, KISHO_PRIVATE_QUESTIONS, gradeKishoAcademic, resolveKishoPrivateImage } from "@/lib/kisho-private";
import { KISHO_PRIVATE_DRAFT_KEY, parseKishoDraft, serializeKishoDraft } from "@/lib/kisho-private/drafts";
import type { ImageAsset, ImageResolver, PageReference, PrivateQuestion } from "@/lib/kisho-private/types";

interface Props { resolvePrivateImage: ImageResolver; initialQuestionId?: string }
const textStyle = { whiteSpace: "pre-wrap" as const, overflowWrap: "anywhere" as const };
const sectionName = { ippan: "学科一般", senmon: "学科専門", pm1: "実技1", pm2: "実技2" } as const;

function ImagePages({ pages, resolver, title }: { pages: readonly PageReference[]; resolver: ImageResolver; title: string }) {
  const [failedAssetIds, setFailedAssetIds] = useState<string[]>([]);
  const unique = [...new Map(pages.map((page) => [page.assetId, page])).values()];
  return <div className="space-y-4">{unique.map((page) => {
    const asset = KISHO_PRIVATE_ASSETS.get(page.assetId);
    if (!asset) return <p key={page.assetId} role="alert">画像参照が見つかりません: {page.assetId}</p>;
    let src = "";
    try { src = resolveKishoPrivateImage(asset, resolver); }
    catch { return <p key={page.assetId} role="alert">ローカル画像を読み込めません: {page.assetId}</p>; }
    if (failedAssetIds.includes(page.assetId)) return <p key={page.assetId} role="alert">画像を表示できません: {page.assetId}</p>;
    return <figure key={page.assetId} className="rounded border p-2">
      <div role="region" aria-label={`${title} PDF ${page.physicalPage}頁の拡大表示`} tabIndex={0} className="overflow-auto">
        {/* Private data/blob bytes only; native size keeps dense weather charts legible when scrolled. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={`${title}、PDF ${page.physicalPage}頁`} width={asset.width} height={asset.height}
          onError={() => setFailedAssetIds((before) => [...before, page.assetId])}
          style={{ width: "auto", maxWidth: "none", height: "auto", minWidth: Math.min(asset.width, 850) }} />
      </div>
      <figcaption className="text-sm">{title} / PDF {page.physicalPage}頁 / 原寸 {asset.width}×{asset.height}px。横スクロールで細部を確認できます。</figcaption>
    </figure>;
  })}</div>;
}

function ExtraImage({ asset, resolver }: { asset: ImageAsset; resolver: ImageResolver }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <p role="alert">解答図を表示できません: {asset.assetId}</p>;
  let src = "";
  try { src = resolveKishoPrivateImage(asset, resolver); }
  catch { return <p role="alert">図を読み込めません: {asset.assetId}</p>; }
  return <figure className="rounded border p-2"><div role="region" aria-label="解答図の拡大表示" tabIndex={0} className="overflow-auto">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt="公式解答例の作図" width={asset.width} height={asset.height} onError={() => setFailed(true)} style={{ width: "auto", maxWidth: "none", height: "auto" }} />
  </div><figcaption>公式解答例の作図 / {asset.width}×{asset.height}px</figcaption></figure>;
}

/** Local private review surface; caller supplies local image bytes and owns its access boundary. */
export function KishoPrivateReader({ resolvePrivateImage, initialQuestionId }: Props) {
  const [activeId, setActiveId] = useState(KISHO_PRIVATE_QUESTIONS.some((item) => item.raw.id === initialQuestionId)
    ? initialQuestionId! : KISHO_PRIVATE_QUESTIONS[0]!.raw.id);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
  const [reviewedFields, setReviewedFields] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [saveStatus, setSaveStatus] = useState("");
  useEffect(() => {
    try {
      const draft = parseKishoDraft(localStorage.getItem(KISHO_PRIVATE_DRAFT_KEY));
      setSelections(draft.selections); setWrittenAnswers(draft.writtenAnswers); setReviewedFields(draft.reviewedFields);
    } catch { setSaveStatus("このブラウザでは下書きを読み込めません。"); }
  }, []);
  const active = KISHO_PRIVATE_QUESTIONS.find((item) => item.raw.id === activeId)!;
  const activeIndex = KISHO_PRIVATE_QUESTIONS.indexOf(active);
  const answered = useMemo(() => KISHO_PRIVATE_QUESTIONS.filter((item) => item.raw.type === "multiple-choice"
    ? Boolean(selections[item.raw.id]) : item.fields.some(({ raw }) => Boolean(writtenAnswers[`${raw.questionId}/${raw.field}`]?.trim()))).length,
  [selections, writtenAnswers]);
  const save = () => {
    try {
      localStorage.setItem(KISHO_PRIVATE_DRAFT_KEY, serializeKishoDraft(selections, writtenAnswers, reviewedFields));
      setSaveStatus("このブラウザに下書きと照合済み印を保存しました。");
    } catch { setSaveStatus("保存できません。ブラウザのローカル保存設定を確認してください。"); }
  };
  const changeQuestion = (question: PrivateQuestion) => { setActiveId(question.raw.id); setSaveStatus(""); };
  return <main data-private-kisho-reader data-public-go="false" data-publication-allowed="false" className="mx-auto max-w-7xl space-y-6 p-4">
    <h1 className="text-2xl font-bold">気象予報士 第65・66回 私的閲覧</h1>
    <p>私的閲覧用の{KISHO_PRIVATE_COUNTS.candidates}原問（学科60・実技18）、実技{KISHO_PRIVATE_COUNTS.answerFields}回答欄。公開不可。学科は選択肢で判定し、実技は公式解答例と図を見て手動照合してください。</p>
    <p aria-live="polite">入力済み {answered}/{KISHO_PRIVATE_COUNTS.candidates}問 / 実技照合済み {reviewedFields.length}/{KISHO_PRIVATE_COUNTS.answerFields}欄</p>
    <nav aria-label="全78問の移動" className="space-y-3">{([65, 66] as const).map((round) => <div key={round}>
      <h2 className="font-semibold">第{round}回</h2>
      {(["ippan", "senmon", "pm1", "pm2"] as const).map((session) => <div key={session} className="my-2">
        <span className="mr-2">{sectionName[session]}</span>
        <div className="inline-flex flex-wrap gap-1">{KISHO_PRIVATE_QUESTIONS.filter((item) => item.source.round === round && item.raw.session === session)
          .map((item) => <button type="button" key={item.raw.id} aria-label={`第${round}回 ${sectionName[session]} 問${item.raw.qNumber}`} aria-current={activeId === item.raw.id ? "page" : undefined}
            onClick={() => changeQuestion(item)} className={`rounded border px-2 py-1 ${activeId === item.raw.id ? "font-bold ring-2" : ""}`}>
            問{item.raw.qNumber}{selections[item.raw.id] || item.fields.some(({ raw }) => writtenAnswers[`${raw.questionId}/${raw.field}`]?.trim()) ? " ✓" : ""}
          </button>)}</div>
      </div>)}</div>)}</nav>
    <section className="space-y-4" aria-label="選択中の原問" data-question-id={active.raw.id}>
      <h2 className="text-xl font-semibold">第{active.source.round}回 {sectionName[active.raw.session]} 問{active.raw.qNumber}</h2>
      <p style={textStyle}>{active.raw.question}</p>
      <details><summary>原典問題・図表（拡大表示）</summary>
        <ImagePages pages={[...active.source.questionPages, ...active.source.figurePages]} resolver={resolvePrivateImage} title="原典問題・図表" />
      </details>
      {active.raw.type === "multiple-choice" ? <section className="space-y-3" aria-label="学科の選択と判定">
        <fieldset><legend className="font-semibold">選択肢</legend>{Object.entries(active.raw.choices ?? {}).map(([symbol, label]) => <label key={symbol} className="block rounded border p-2">
          <input type="radio" name={active.raw.id} value={symbol} checked={selections[active.raw.id] === symbol}
            onChange={() => setSelections((before) => ({ ...before, [active.raw.id]: symbol }))} /> {symbol} {label}
        </label>)}</fieldset>
        <button type="button" className="rounded border p-2" onClick={() => setRevealed((before) => ({ ...before, [active.raw.id]: true }))}>答え合わせ</button>
        {revealed[active.raw.id] && <div role="status" className="rounded border p-3">
          <strong>{selections[active.raw.id] ? gradeKishoAcademic(active, selections[active.raw.id] ?? "") ? "正解" : "不正解" : "選択してください"}</strong>
          <p>正答: {active.raw.answer}（公式番号 {active.raw.officialAnswerNumber}）</p>
          <p style={textStyle}>{active.raw.explanation}</p>
          {selections[active.raw.id] && <p style={textStyle}>{active.raw.choiceExplanations?.[selections[active.raw.id] ?? ""]}</p>}
          <details><summary>全5肢の理由</summary>{Object.entries(active.raw.choiceExplanations ?? {}).map(([symbol, explanation]) =>
            <p key={symbol} style={textStyle}><strong>{symbol}:</strong> {explanation}</p>)}</details>
        </div>}
      </section> : <section aria-label="実技の記述と手動照合" className="space-y-6">
        <p>記述答案は自動採点しません。各欄の例解・理由と公式解答例画像を照合し、自分で照合済みにしてください。</p>
        <details><summary>問題全体の例解・解説・照合基準</summary>
          <p style={textStyle}><strong>例解:</strong> {active.raw.modelAnswer}</p>
          <p style={textStyle}><strong>全体の解説:</strong> {active.raw.explanation}</p>
          <p style={textStyle}><strong>照合基準:</strong> {active.raw.scoringCriteria}</p>
        </details>
        {active.fields.map(({ raw, source }) => {
          const key = `${raw.questionId}/${raw.field}`;
          return <div key={key} data-answer-field-id={key} className="space-y-2 rounded border p-3">
            <label htmlFor={`kisho-${key}`} className="font-semibold">{raw.field} {raw.prompt}</label>
            <textarea id={`kisho-${key}`} rows={3} value={writtenAnswers[key] ?? ""} style={textStyle}
              onChange={(event) => { setWrittenAnswers((before) => ({ ...before, [key]: event.target.value }));
                setReviewedFields((before) => before.filter((id) => id !== key)); }} className="block w-full rounded border p-2" />
            <details><summary>例解と根拠を見る</summary>
              <p><strong>原稿の例解:</strong> {raw.officialAnswer}</p>
              <p style={textStyle}><strong>理由:</strong> {raw.explanation}</p>
              <p>公式解答例: PDF {source.officialAnswerPages.map((page) => page.physicalPage).join("・")}頁{source.officialAnswerPages.length > 1 ? "（欄ごとの頁を特定せず候補頁を表示）" : ""}</p>
              <ImagePages pages={source.officialAnswerPages} resolver={resolvePrivateImage} title="公式解答例" />
              {source.officialAnswerImageAssetId && KISHO_PRIVATE_ASSETS.get(source.officialAnswerImageAssetId)
                ? <ExtraImage asset={KISHO_PRIVATE_ASSETS.get(source.officialAnswerImageAssetId)!} resolver={resolvePrivateImage} /> : null}
            </details>
            <label><input type="checkbox" checked={reviewedFields.includes(key)} disabled={!writtenAnswers[key]?.trim()}
              onChange={(event) => setReviewedFields((before) => event.target.checked ? [...before, key] : before.filter((id) => id !== key))} /> 手動で照合済み</label>
          </div>;
        })}
      </section>}
      <div className="flex gap-2"><button type="button" className="rounded border p-2" disabled={activeIndex === 0}
        onClick={() => setActiveId(KISHO_PRIVATE_QUESTIONS[activeIndex - 1]!.raw.id)}>前の問</button>
        <button type="button" className="rounded border p-2" disabled={activeIndex === KISHO_PRIVATE_QUESTIONS.length - 1}
          onClick={() => setActiveId(KISHO_PRIVATE_QUESTIONS[activeIndex + 1]!.raw.id)}>次の問</button></div>
    </section>
    <button type="button" className="rounded border p-2" onClick={save}>下書きを保存</button><p role="status">{saveStatus}</p>
    <p>原典権利確認前の私的閲覧専用です。公開・配信・共有用には使用しないでください。</p>
  </main>;
}
