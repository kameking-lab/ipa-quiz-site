"use client";
import { useEffect, useState, type ReactNode } from "react";
import { nativeClient } from "./contracts";
import { fetchPracticeQuestion } from "@/lib/billing/guest-client";
import dynamic from "next/dynamic";
import Link from "next/link";
const FeedbackUnlock=dynamic(()=>import("@/components/quiz/FeedbackUnlock").then(m=>m.FeedbackUnlock),{ssr:false});
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
  return { allowed:!nativeClient() || !id || permission.id===id && permission.allowed,
    error:permission.id===id?permission.error:"",retry:()=>setAttempt(n=>n+1) };
}
export function NativeAccessState({ permission }: { permission: ReturnType<typeof useNativeQuestionGrant> }) {
  // Legacy players keep keyboard handlers while their content is gated.
  // Stop those handlers during the gate, preserving native button activation.
  useEffect(()=>{ const block=(event:KeyboardEvent)=>event.stopImmediatePropagation();window.addEventListener("keydown",block,true);return()=>window.removeEventListener("keydown",block,true); },[]);
  return <section className="mx-auto max-w-lg space-y-4 p-6" aria-live="polite"><h2>演習の利用枠を確認しています</h2>{permission.error&&<><p>{permission.error === "daily_limit" ? "本日の無料枠を使い切りました。意見送信で追加10問、有料会員は全問題を無制限で利用できます。" : permission.error}</p>{permission.error==="daily_limit"&&<FeedbackUnlock onUnlocked={permission.retry}/>}<button onClick={permission.retry}>再確認</button><p><Link href="/billing">App Storeの月額プラン・購入復元</Link></p><p><Link href="/review">学習メニューへ</Link></p></>}</section>;
}
export function NativeQuestionGate({id,paper,children}:{id?:string;paper?:string;children:ReactNode}) {
  const permission=useNativeQuestionGrant(id,paper);
  return permission.allowed ? children : <NativeAccessState permission={permission}/>;
}
