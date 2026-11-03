import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SENTAKU_EDITIONS, getSentakuEdition, sentakuPath } from "@/lib/sharoushi/sentaku";
export const dynamicParams=false;
export const generateStaticParams=()=>SENTAKU_EDITIONS.map(edition=>({edition}));
export async function generateMetadata({params}:{params:Promise<{edition:string}>}):Promise<Metadata>{const {edition}=await params;return getSentakuEdition(edition).length?{title:`社労士 ${edition}年度 選択式`,alternates:{canonical:sentakuPath(edition)}}:{title:"問題が見つかりません",robots:{index:false}};}
export default async function Page({params}:{params:Promise<{edition:string}>}){const {edition}=await params;const questions=getSentakuEdition(edition);if(!questions.length)notFound();return <main className="mx-auto max-w-3xl px-4 py-8"><Link href="/sharoushi/sentaku" className="text-primary underline">選択式の年度一覧へ</Link><h1 className="mt-6 text-2xl font-bold">第{Number(edition)-1968}回（{edition}年度） 選択式</h1><p className="mt-4 leading-8">全8原問のうち{questions.length}原問・{questions.length*5}空欄を掲載。法令基準日 {questions[0].lawAsOf}。各問題の語群からA〜Eに入る語句を考え、正答と解説で確認できます。</p><ul className="mt-6 divide-y divide-border">{questions.map(q=><li key={q.id}><Link className="block py-5 text-primary underline" href={sentakuPath(q.year,q.questionNumber)}>問{q.questionNumber} {q.subject}（5空欄）</Link></li>)}</ul></main>;}
