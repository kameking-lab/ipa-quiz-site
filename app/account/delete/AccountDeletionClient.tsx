"use client";
import { useState } from "react";
import { nativeClient } from "@/mobile/shared/contracts";
export function AccountDeletionClient(){
  const [confirmation,setConfirmation]=useState(""),[busy,setBusy]=useState(false),[notice,setNotice]=useState("");
  const [deleted,setDeleted]=useState(false),[reauth,setReauth]=useState(false);
  async function remove(){
    if(busy || confirmation!=="DELETE")return;
    setBusy(true);setNotice("");
    let serverDeleted=deleted;
    try {
      if(!deleted){
        const r=await fetch("/api/account/delete",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({confirmation})});
        const data=await r.json();
        if(!r.ok){if(["reauthentication_required","apple_reauthentication_required","sign_in_required"].includes(data.error))setReauth(true);throw new Error(data.error);}
        setDeleted(true);
        serverDeleted=true;
      }
      window.dispatchEvent(new Event("mobile:account-deleted"));
      if(nativeClient())await (await import("@/mobile/src/delete-device-data")).deleteDeviceData();
      for(const key of Object.keys(localStorage))if(/^(ipa-quiz|kakomon)/.test(key))localStorage.removeItem(key);
      setNotice("アカウントとこの端末のデータを削除しました。");
    }catch(e){setNotice(serverDeleted?"サーバーの削除は完了しています。端末データの消去を再試行してください。":e instanceof Error?e.message:"削除できませんでした。");}
    finally{setBusy(false);}
  }
  return <section className="space-y-4">{notice&&<p role="status">{notice}</p>}{reauth&&<><p>削除前に5分以内の再ログインが必要です。Apple連携の場合はAppleで再ログインしてください。</p><button disabled={busy} onClick={()=>{if(nativeClient())void import("@/mobile/src/login").then(m=>m.beginLogin(location.origin,"/account/delete"));else location.assign("/auth/signin?callbackUrl=/account/delete");}}>再ログインして本人確認</button></>}
    <label className="block">削除を確認するため DELETE と入力<input className="block rounded border p-2" value={confirmation} onChange={e=>setConfirmation(e.target.value)} autoComplete="off"/></label>
    <button disabled={busy || confirmation!=="DELETE"} onClick={()=>void remove()}>{busy?"削除中…":deleted?"端末データ消去を再試行":"アカウントとデータを完全に削除"}</button>
  </section>;
}
