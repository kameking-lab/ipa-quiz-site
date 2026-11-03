"use client";
import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { nativeClient } from "./contracts";
export function CachedImage({src,alt="",...props}:ImgHTMLAttributes<HTMLImageElement>) {
  const [cached,setCached]=useState<string|null>(null),[failed,setFailed]=useState(false);
  useEffect(()=>{
    if(typeof src!=="string" || !nativeClient())return;
    let active=true;
    void import("../src/images").then(m=>m.cachedImage(src)).then(url=>{if(active)setCached(url);});
    return()=>{active=false;};
  },[src]);
  // Native files and official crops must retain original bytes and proportions.
  // eslint-disable-next-line @next/next/no-img-element
  return <><img {...props} src={cached??src} alt={alt} onError={()=>setFailed(true)}/>{failed&&<p role="note">図表を表示できません。オンラインで一度表示すると端末に保存されます。</p>}</>;
}
