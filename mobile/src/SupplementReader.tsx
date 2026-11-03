import type { Material } from "../shared/material-types";
import { CachedImage } from "../shared/CachedImage";
export function SupplementReader({material:m}:{material:Extract<Material,{kind:"denko2-skill"|"annotated-note"}>}) {
  if(m.kind === "denko2-skill") {
    const p=m.problem;
    return <article className="space-y-5"><h1>{m.title}</h1><p>技能試験・自己点検教材（自動採点なし）</p>
      <h2>問題図・施工条件</h2><CachedImage src={p.diagramImage} alt="公式問題図"/>{p.secondFigureImage&&<CachedImage src={p.secondFigureImage} alt="公式図2"/>}
      {[p.instructionText,p.diagramNotesText,p.conditionsText,p.materialsText].map((text,i)=><p className="whitespace-pre-wrap" key={i}>{text}</p>)}
      <details><summary>公式解答・完成例</summary>{[[p.answerConceptImage,"概念図"],[p.answerWiringImage,"複線図"],[p.answerExampleImage,"完成例"]].map(([src,alt])=><CachedImage key={src} src={src} alt={alt}/>)}</details>
      <h2>自己点検</h2>{m.checks.map(check=><label className="block" key={check}><input type="checkbox"/> {check}</label>)}
      <p><a href={p.questionPdfUrl}>公式問題PDF</a> · <a href={p.answerPdfUrl}>公式解答PDF</a> · <a href={p.defectCriteriaUrl}>欠陥判断基準</a></p>
    </article>;
  }
  const n=m.note,s=n.accepted;
  if(n.scoringEnabled!==false || n.registerInQuestionPool!==false || !n.notice || !m.learningNotice)throw new Error("教材の注記を確認できません。");
  return <article className="space-y-5" data-scoring="disabled"><h1>{n.title}</h1>
    <aside aria-label="常時表示の学習注記" className="rounded border p-4"><p>{m.learningNotice}</p><p>{n.notice}</p></aside>
    <h2>原紙の参照が必要です</h2><p><a href={s.sourcePdfUrl}>公式問題PDF・{n.questionPage}ページ</a> · <a href={n.answerPdfUrl}>公式解答PDF・{n.answerPage}ページ</a></p>
    <p className="whitespace-pre-wrap">{s.question}</p><dl>{Object.entries(s.choices).map(([key,text])=><div key={key}><dt>{key}</dt><dd>{text}</dd></div>)}</dl>
    <h2>公式解答と注記付解説</h2><p>公式解答：{s.answer}</p><p>{n.notice}</p><p className="whitespace-pre-wrap">{s.explanation}</p>
    {Object.entries(s.choiceExplanations??{}).map(([key,text])=><p key={key}>{key}：{text}</p>)}<p>{m.learningNotice} {n.notice}</p>
  </article>;
}
