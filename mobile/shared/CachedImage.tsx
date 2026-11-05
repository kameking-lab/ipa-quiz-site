"use client";
import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { nativeClient } from "./contracts";
export function CachedImage({src,alt="",onError,onLoad,...props}:ImgHTMLAttributes<HTMLImageElement>) {
  const [cached,setCached]=useState<{source:string;url:string}|null>(null);
  const [failedSource,setFailedSource]=useState<ImgHTMLAttributes<HTMLImageElement>["src"]|null>(null);
  useEffect(()=>{
    if(typeof src!=="string" || !nativeClient())return;
    let active=true;
    void import("../src/images").then(m=>m.cachedImage(src)).then(url=>{if(active)setCached({source:src,url});}).catch(()=>{});
    return()=>{active=false;};
  },[src]);
  // Native files and official crops must retain original bytes and proportions.
  // eslint-disable-next-line @next/next/no-img-element
  return <><img {...props} src={cached&&cached.source===src?cached.url:src} alt={alt}
    onError={event=>{setFailedSource(src??null);onError?.(event);}}
    onLoad={event=>{setFailedSource(null);onLoad?.(event);}}/>{src&&failedSource===src&&<p role="note">図表を表示できません。オンラインで一度表示すると端末に保存されます。</p>}</>;
}
