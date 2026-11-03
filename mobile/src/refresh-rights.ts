import { Capacitor, CapacitorHttp } from "@capacitor/core";
import { Network } from "@capacitor/network";
import { downloads } from "./downloads";
import type { MobileConfiguration, MobileEntitlement } from "../shared/contracts";
export async function refreshDeviceRights() {
  if (!Capacitor.isNativePlatform() || !(await Network.getStatus()).connected) return;
  const r=await downloads.rights();if(!r?.access.userId)return;
  const response=await CapacitorHttp.get({url:"https://www.kakomon-ai.jp/api/mobile/entitlement",headers:{Accept:"application/json"},responseType:"json",disableRedirects:true,connectTimeout:10000,readTimeout:15000});
  if(response.status!==200)throw new Error("オンラインの権利確認を完了できませんでした。");
  const result=(typeof response.data==="string"?JSON.parse(response.data):response.data) as {entitlement:MobileEntitlement;configuration:MobileConfiguration};
  if(!result.entitlement.entitled||result.entitlement.userId!==r.access.userId){await downloads.invalidate();throw new Error("会員権利を確認できないため保存問題を無効にしました。オンライン画面でログインしてください。");}
  await downloads.updateRights(result.entitlement,result.configuration.leasePublicKey);
}
