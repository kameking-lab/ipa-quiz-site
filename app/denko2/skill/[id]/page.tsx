import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { DENKO2_SKILL_PROBLEMS, getSkillDefectChecks, getSkillNeighbors, getSkillProblem, skillDateLabel } from "@/lib/denko2/skills";

interface Props { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return isExamPublished("denko2")
    ? DENKO2_SKILL_PROBLEMS.map((problem) => ({ id: problem.id }))
    : [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const problem = getSkillProblem((await params).id);
  if (!problem || !isExamPublished("denko2")) return { robots: { index: false, follow: false } };
  return {
    title: `第二種電気工事士 技能 ${skillDateLabel(problem)} No.${problem.number}`,
    description: "公式試験の問題図・施工条件・概念図・複線図・完成例を一画面で確認できます。",
    alternates: { canonical: `/denko2/skill/${problem.id}` },
  };
}

function diagram(src: string, alt: string) {
  return <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${alt}を拡大して見る`} className="block overflow-hidden rounded-xl border bg-white p-2 hover:border-blue-600"><Image src={src} alt={alt} width={1200} height={1000} className="h-auto w-full object-contain" unoptimized /></a>;
}

export default async function Denko2SkillProblemPage({ params }: Props) {
  if (!isExamPublished("denko2")) notFound();
  const problem = getSkillProblem((await params).id);
  if (!problem) notFound();
  const { previous, next } = getSkillNeighbors(problem);
  const title = `${skillDateLabel(problem)} No.${problem.number}`;
  const conditions = problem.conditionsText.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  const defectChecks = getSkillDefectChecks(problem);
  return (
    <main className="mx-auto max-w-4xl px-4 py-6 text-slate-950">
      <nav aria-label="問題ナビゲーション" className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <Link href={`/denko2/skill#date-${problem.date}`} className="font-semibold text-blue-700 hover:underline">← この試験日の一覧</Link>
        <span>No.{problem.number} / 13</span>
      </nav>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">技能試験 No.{problem.number}</h1>
      <p className="mt-1 text-sm text-slate-700">{skillDateLabel(problem)}・試験時間40分</p>
      <section className="mt-6 rounded-2xl border border-slate-200 p-4">
        <h2 className="text-xl font-bold">問題図</h2>
        <p className="mb-3 mt-1 text-sm text-slate-600">タップすると大きく表示できます。</p>
        {diagram(problem.diagramImage, `${title}の公式問題図`)}
        <p className="mt-3 whitespace-pre-line text-sm leading-7">{problem.instructionText}</p>
        <p className="mt-3 whitespace-pre-line text-xs leading-6 text-slate-600">{problem.diagramNotesText}</p>
        {problem.secondFigureImage && <div className="mt-4"><h3 className="mb-2 font-semibold">図2・端子台などの説明図</h3>{diagram(problem.secondFigureImage, `${title}の公式図2`)}</div>}
      </section>
      <section className="mt-6 rounded-2xl border border-slate-200 p-4">
        <h2 className="text-xl font-bold">施工条件</h2>
        <div className="mt-3 space-y-3">
          {conditions.map((condition, index) => <p key={`${problem.id}-condition-${index}`} className="whitespace-pre-line rounded-lg bg-slate-50 p-3 text-sm leading-7">{condition}</p>)}
        </div>
      </section>
      <details className="mt-6 rounded-2xl border border-slate-200 p-4">
        <summary className="cursor-pointer text-lg font-semibold">支給材料を見る</summary>
        <p className="mt-3 whitespace-pre-line text-sm leading-7">{problem.materialsText}</p>
      </details>
      <details className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <summary className="cursor-pointer text-xl font-bold">公式の解答・完成例を見る</summary>
        <p className="mt-3 text-sm text-slate-700">まず概念図、次に複線図、完成作品例を照らし合わせてください。作品例は一例です。</p>
        <div className="mt-4 grid gap-5">
          <div><h3 className="mb-2 font-semibold">概念図</h3>{diagram(problem.answerConceptImage, `${title}の公式概念図`)}</div>
          <div><h3 className="mb-2 font-semibold">複線図・結線</h3>{diagram(problem.answerWiringImage, `${title}の公式複線図`)}</div>
          <div><h3 className="mb-2 font-semibold">完成作品例</h3>{diagram(problem.answerExampleImage, `${title}の公式完成作品例`)}</div>
        </div>
      </details>
      <section className="mt-6 rounded-2xl border border-slate-200 p-4">
        <h2 className="text-xl font-bold">自己点検</h2>
        <p className="mt-1 text-sm text-slate-700">作った作品を施工条件と照合してください。この画面は作品を自動採点しません。</p>
        <div className="mt-3 space-y-2">{defectChecks.map((check, index) => <label key={`${problem.id}-check-${index}`} className="flex gap-3 rounded-lg bg-slate-50 p-3 text-sm"><input type="checkbox" className="mt-1 h-4 w-4 shrink-0" /><span>{check}</span></label>)}</div>
        <a className="mt-4 inline-block text-sm font-semibold text-blue-700 underline" href={problem.defectCriteriaUrl} target="_blank" rel="noopener noreferrer">試験センターの欠陥判断基準を確認する ↗</a>
      </section>
      <p className="mt-6 text-xs leading-6 text-slate-600">出典：{problem.year}年度{problem.season === "first" ? "上期" : "下期"}第二種電気工事士技能試験・{problem.date}実施・No.{problem.number}（電気技術者試験センター）。本文の改行と空白を画面向けに整え、問題図・解答図・作品写真を原本から切り出しています。<a href={problem.questionPdfUrl} target="_blank" rel="noopener noreferrer" className="ml-1 underline">問題PDF</a>・<a href={problem.answerPdfUrl} target="_blank" rel="noopener noreferrer" className="underline">解答PDF</a></p>
      <nav aria-label="前後の問題" className="mt-8 flex gap-3 border-t pt-5 text-sm font-semibold">
        {previous ? <Link href={`/denko2/skill/${previous.id}`} className="rounded-lg border px-4 py-3 hover:bg-slate-50">← No.{previous.number}</Link> : <span />}
        {next ? <Link href={`/denko2/skill/${next.id}`} className="ml-auto rounded-lg border px-4 py-3 hover:bg-slate-50">No.{next.number} →</Link> : <Link href={`/denko2/skill#date-${problem.date}`} className="ml-auto rounded-lg border px-4 py-3 hover:bg-slate-50">一覧へ戻る</Link>}
      </nav>
    </main>
  );
}
