"use client";
import { useEffect, useState, type ReactNode } from "react";
import { nativeClient } from "./contracts";
import { fetchPracticeQuestion } from "@/lib/billing/guest-client";
import Link from "next/link";
import { PracticeDailyLimit } from "@/components/quiz/PracticeTransition";
import { QuestionPracticeGate } from "@/components/quiz/QuestionPracticeGate";
interface Permission { id: string; allowed: boolean; error: string }
export function useNativeQuestionGrant(id?: string, paper?: string) {
  const [permission,setPermission]=useState<Permission>({ id:"",allowed:false,error:"" });
  const [attempt,setAttempt]=useState(0);
  useEffect(()=>{
    const refresh=()=>{setPermission({id:"",allowed:false,error:""});setAttempt(n=>n+1);};
    window.addEventListener("mobile:entitlement-changed",refresh);
    window.addEventListener("mobile:offline-rights-changed",refresh);
    return()=>{window.removeEventListener("mobile:entitlement-changed",refresh);window.removeEventListener("mobile:offline-rights-changed",refresh);};
  },[]);
  useEffect(()=>{
    if (!nativeClient() || !id) return;
    setPermission({id,allowed:false,error:""});
    let cancelled=false,expiryTimer:ReturnType<typeof setTimeout>|undefined;
    const work = location.protocol === "capacitor:"
      ? import("../src/downloads").then(m=>m.downloads.authorize())
      : fetchPracticeQuestion(id,false,undefined,paper);
    void work.then(result=>{
      if(cancelled)return;
      setPermission({id,allowed:true,error:""});
      if("validatedUntil"in result&&typeof result.validatedUntil==="number")expiryTimer=setTimeout(()=>setPermission({id,allowed:false,error:"保存問題の利用期限が切れました。オンラインで会員状態を再確認してください。"}),Math.max(0,result.validatedUntil-Date.now()));
    }).catch(e=>{if(!cancelled)setPermission({id,allowed:false,error:e instanceof Error?e.message:"会員状態を確認できません。"});});
    return()=>{cancelled=true;if(expiryTimer)clearTimeout(expiryTimer);};
  },[id,paper,attempt]);
  // Show the question immediately and check the quota in the background. Only a
  // server answer that the free quota is used up (or, for saved offline
  // questions, missing rights) replaces it; offline/unknown never blocks.
  const error=permission.id===id?permission.error:"";
  const blocked=!!error && (error==="daily_limit" || (typeof location!=="undefined" && location.protocol==="capacitor:"));
  return { allowed:!nativeClient() || !id || !blocked, error, retry:()=>setAttempt(n=>n+1) };
}
export function NativeAccessState({ permission }: { permission: ReturnType<typeof useNativeQuestionGrant> }) {
  // Legacy players keep keyboard handlers while their content is gated.
  // Stop those handlers during the gate, preserving native button activation.
  useEffect(()=>{ const block=(event:KeyboardEvent)=>event.stopImmediatePropagation();window.addEventListener("keydown",block,true);return()=>window.removeEventListener("keydown",block,true); },[]);
  // Same path as the web after the free 10: feedback once for +10 (login only there), then the plan.
  if(permission.error==="daily_limit") return <PracticeDailyLimit reset={null} resumeHref={typeof location==="undefined"?"/":location.pathname+location.search} backHref="/" freeDaily={10} onUnlocked={permission.retry}/>;
  const action="flex min-h-11 w-full items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium";
  return <section className="mx-auto max-w-lg space-y-4 p-6" aria-live="polite"><h2 className="text-lg font-bold">保存した問題を開けません</h2>{permission.error&&<><p className="break-words">{permission.error === "daily_limit" ? "本日の無料10問を使い切りました。日本時間0時に更新されます。有料会員は全問題を無制限で利用できます。" : permission.error}</p><button className={action} onClick={permission.retry}>再確認</button><Link className="flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground" href="/billing">App Storeの月額プラン・購入復元</Link><Link className={action} href="/review">学習メニューへ</Link></>}</section>;
}
/** webQuota: a standalone study page (essay, reader) that also counts toward the web's shared daily free 10. */
export function NativeQuestionGate({id,paper,webQuota=false,children}:{id?:string;paper?:string;webQuota?:boolean;children:ReactNode}) {
  const permission=useNativeQuestionGrant(id,paper);
  // Web: same quota as /q pages (full text for crawlers, declared paywalled). Players inside an already-counted page leave webQuota off.
  if(!nativeClient()) return webQuota && id ? <QuestionPracticeGate id={id} paper={paper} enabled declarePaywall>{children}</QuestionPracticeGate> : children;
  return permission.allowed ? children : <NativeAccessState permission={permission}/>;
}
