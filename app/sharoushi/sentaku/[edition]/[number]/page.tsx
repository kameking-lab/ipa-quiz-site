import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PUBLISHED_SENTAKU, getSentakuQuestion, sentakuPath } from "@/lib/sharoushi/sentaku";
import { SentakuReader } from "../../_components/reader";
export const dynamicParams=false;
export const generateStaticParams=()=>PUBLISHED_SENTAKU.map(q=>({edition:String(q.year),number:String(q.questionNumber)}));
type Props={params:Promise<{edition:string;number:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {edition,number}=await params;const q=getSentakuQuestion(edition,number);return q?{title:`社労士 第${q.examRound}回 選択式 問${q.questionNumber} ${q.subject}`,description:`原問の5空欄と語群、公式正答・独自解説。法令基準日${q.lawAsOf}。`,alternates:{canonical:sentakuPath(q.year,q.questionNumber)}}:{title:"問題が見つかりません",robots:{index:false}};}
export default async function Page({params}:Props){const {edition,number}=await params;const q=getSentakuQuestion(edition,number);if(!q)notFound();return <SentakuReader question={q}/>;}
