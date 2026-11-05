"use client";
import Link from "next/link";
import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { ExamQuestionPlayer } from "@/components/exam-library/exam-question-player";
import type { Question } from "@/lib/questions/types";
import type { Material } from "./material-types";
import type { ExamQuestion } from "@/lib/exam-library-model";
import type { PaperQuestionIndex } from "./paper-index";
const MaterialReader=lazy(()=>import("../src/MaterialReader"));
interface Props {items:{id:string;title:string}[];paper?:string;paperIndex?:PaperQuestionIndex[];paperTitle?:string;material?:boolean;initialId?:string;initialView?:"question"|"summary";pdfUrl?:string;indexUrl?:string}
export function AuthorizedContent(props: Props) {
  return props.paper ? <AuthorizedPaper key={props.paper} {...props} paper={props.paper}/> : <AuthorizedSingleContent {...props}/>;
}
function AuthorizedPaper({paper,paperIndex=[],paperTitle=paper,initialId,initialView,pdfUrl="",indexUrl=""}: Props & {paper:string}) {
  const resolveResults = useCallback(async (answers: {id:string;choice:number|null;proof?:string}[], signal:AbortSignal) => {
    const response = await fetch("/api/mobile/paper-results", {method:"POST",credentials:"same-origin",cache:"no-store",signal,
      headers:{"Content-Type":"application/json"},body:JSON.stringify({paper,answers})});
    const body = await response.json();
    if (!response.ok) throw new Error(body.error);
    return body.results as {id:string;choice:number|null;result:"correct"|"incorrect"|"unscored"}[];
  }, [paper]);
  const resolveQuestion = useCallback(async (id:string,signal:AbortSignal) => {
    if (!paperIndex.some(q=>q.id===id)) throw new Error("この試験紙にない問題です。");
    const response = await fetch("/api/billing/question", {method:"POST",credentials:"same-origin",cache:"no-store",signal,
      headers:{"Content-Type":"application/json","X-Kakomon-Paper":paper},body:JSON.stringify({id,shuffle:false})});
    const body = await response.json();
    if (!response.ok) throw new Error(body.error);
    return body.question as ExamQuestion;
  }, [paper,paperIndex]);
  return <main className="mx-auto max-w-4xl space-y-5 p-5"><h1>{paperTitle}</h1>
    <p>ウェブとアプリで共通の1日10問です。有料会員は無制限です。</p>
    <ExamQuestionPlayer examId={paper} examTitle={paperTitle} questions={[]} questionIndex={paperIndex} resolveQuestion={resolveQuestion} resolveResults={resolveResults}
      initialQuestionId={initialId} initialView={initialView} pdfUrl={pdfUrl} indexUrl={indexUrl}/>
  </main>;
}
function AuthorizedSingleContent({items,paper,material=false,initialId,pdfUrl="",indexUrl=""}:Props) {
  const [id,setId]=useState(items.some(i=>i.id===initialId)?initialId!:items[0]?.id??"");
  const [value,setValue]=useState<{id:string;data:unknown}|null>(null),[error,setError]=useState(""),[attempt,setAttempt]=useState(0);
  useEffect(()=>{
    const controller=new AbortController();setValue(null);setError("");
    void fetch("/api/billing/question",{method:"POST",credentials:"same-origin",cache:"no-store",signal:controller.signal,
      headers:{"Content-Type":"application/json",...(paper?{"X-Kakomon-Paper":paper}:{}),...(material?{"X-Kakomon-Material":"1"}:{})},body:JSON.stringify({id,shuffle:false})
    }).then(async r=>{const b=await r.json();if(!r.ok)throw new Error(b.error);if(!controller.signal.aborted)setValue({id,data:b.question});}).catch(e=>{if(!controller.signal.aborted)setError(e instanceof Error?e.message:"会員状態を確認できません。");});
    return()=>controller.abort();
  },[id,paper,material,attempt]);
  const index=items.findIndex(i=>i.id===id),next=()=>{if(index+1<items.length)setId(items[index+1].id);};
  const current=value?.id===id?value.data:null;
  return <main className="mx-auto max-w-4xl space-y-5 p-5"><h1>問題・教材の演習</h1><p>ウェブとアプリで共通の1日10問です。ログインして利用してください。有料会員は無制限です。</p>
    {items.length>1&&<label>問題を選択<select value={id} onChange={e=>setId(e.target.value)}>{items.map(i=><option key={i.id} value={i.id}>{i.title}</option>)}</select></label>}
    {error?<section role="alert"><p>{error==="daily_limit"?"本日の無料10問を使い切りました。日本時間0時に更新されます。":error==="sign_in_required"?"無料枠を端末間で共有するためログインが必要です。":error}</p><a href={`/auth/signin?callbackUrl=${encodeURIComponent(typeof location==="undefined"?"/quiz?mode=random":location.pathname+location.search)}`}>ログイン・本人確認</a><p><Link href="/billing">有料会員・購入復元</Link></p><button onClick={()=>setAttempt(n=>n+1)}>再確認</button></section>:!current?<p role="status">利用枠を確認しています…</p>:material?<Suspense fallback={<p>教材を準備しています…</p>}><MaterialReader key={id} material={current as Material}/></Suspense>:<QuizPlayer key={id} question={current as Question} index={0} total={1} mode="year" exam={(current as Question).exam} backHref="/" onNext={next}/>}
    {items.length>1&&<nav className="flex gap-4"><button disabled={index<=0} onClick={()=>setId(items[index-1].id)}>前の問題</button><button disabled={index+1>=items.length} onClick={next}>次の問題</button></nav>}
  </main>;
}
