import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GAS_EXAMS, GAS_ESSAY_SUBJECT_LABELS, getGasEssays, isGasExam } from "@/data/questions/gas/essays";
import { examLabel } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return GAS_EXAMS.map((exam) => ({ exam }));
}

export async function generateMetadata({ params }: { params: Promise<{ exam: string }> }): Promise<Metadata> {
  const { exam } = await params;
  if (!isGasExam(exam)) return { title: "試験区分が見つかりません", robots: { index: false } };
  return {
    title: `${examLabel(exam)} 論述過去問・解答例`,
    description: `${examLabel(exam)}の2026・2025年度の論述原問8題を収録。法令とガス技術の独自解答例、確認項目、公式問題PDFで答案の要点を学べます。`,
    alternates: { canonical: `/${exam}/essay` },
  };
}

export default async function GasEssayPage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam } = await params;
  if (!isGasExam(exam)) notFound();
  const questions = getGasEssays(exam);
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10">
      <nav aria-label="パンくず" className="text-sm text-zinc-600 dark:text-zinc-400">
        <Link href="/" className="underline">過去問AI</Link>
        <span className="mx-2">/</span>
        <Link href={`/${exam}`} className="underline">{examLabel(exam)}</Link>
        <span className="mx-2">/</span>論述問題
      </nav>
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{examLabel(exam)} 論述問題</h1>
        <p>2026・2025年度の原問{questions.length}題。各年度の法令1題とガス技術3題を、公式問題PDFと照合して学べます。</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">本試験の論述は60分。法令は必須で35点、ガス技術は製造・供給・消費の3題から1題を選び35点です。</p>
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">論述の公式解答は公表されていません。以下の解答例と確認項目は過去問AIが作成した学習資料です。確認項目は公式の採点基準ではありません。</p>
      </header>
      {[2026, 2025].map((year) => (
        <section key={year} aria-labelledby={`year-${year}`} className="space-y-4">
          <h2 id={`year-${year}`} className="text-2xl font-bold">{year}年度（令和{year - 2018}年度）</h2>
          {questions.filter((q) => q.year === year).map((q) => (
            <article key={q.id} id={q.id} className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
              <h3 className="text-xl font-semibold">{GAS_ESSAY_SUBJECT_LABELS[q.subject]} 問{q.qNumber} <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">{q.subject === "law" ? "必須" : "選択"}</span></h3>
              <p className="whitespace-pre-line leading-8">{q.question}</p>
              <a href={q.sourcePdfUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-sm underline">日本ガス機器検査協会・公式問題PDF（{q.sourcePage}ページ）</a>
              <details className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900">
                <summary className="cursor-pointer font-semibold">独自解答例と確認項目を読む</summary>
                <div className="mt-4 space-y-5">
                  <p className="whitespace-pre-line leading-8">{q.modelAnswer}</p>
                  <div>
                    <h4 className="font-semibold">答案の確認項目</h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5">{q.checkpoints.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div className="text-sm">
                    <h4 className="font-semibold">参考一次資料</h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5">{q.references.map((url, i) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="break-all underline">{url.includes("329AC") ? "ガス事業法（e-Gov）" : url.includes("345M") ? "ガス事業法施行規則（e-Gov）" : `参考資料 ${i + 1}`}</a></li>)}</ul>
                  </div>
                </div>
              </details>
            </article>
          ))}
        </section>
      ))}
      <Link href={`/${exam}`} className="inline-block rounded-xl border px-5 py-3 font-semibold">択一式の原問・全肢解説へ戻る</Link>
    </main>
  );
}
