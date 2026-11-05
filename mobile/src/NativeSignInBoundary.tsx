"use client";
import {useEffect,useState,type ReactNode} from "react";
import {nativeClient} from "../shared/contracts";
import {beginLogin} from "./login";
export function NativeSignInBoundary({children,returnTo}:{children:ReactNode;returnTo:string}) {
  const [native,setNative]=useState(false),[error,setError]=useState("");
  useEffect(()=>setNative(nativeClient()),[]);
  if(!native)return children;
  return <section className="mx-auto max-w-lg space-y-4 p-6"><h1 className="text-xl font-bold">過去問AIにログイン</h1><p>安全なシステムブラウザでログインし、学習中の画面に戻ります。</p><button onClick={()=>void beginLogin(location.origin,returnTo).catch(e=>setError(String(e)))}>ログイン画面を開く</button>{error&&<p role="alert">{error}</p>}</section>;
}
