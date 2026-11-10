import { Capacitor, CapacitorHttp } from "@capacitor/core";
import { Network } from "@capacitor/network";
import { downloads } from "./downloads";
import type { MobileConfiguration, MobileEntitlement } from "../shared/contracts";
export async function refreshDeviceRights() {
  if (!Capacitor.isNativePlatform() || !(await Network.getStatus().catch(()=>({connected:false}))).connected) return;
  const r=await downloads.rights();if(!r?.access.userId)return;
  // Temporary network failures do not revoke an already signed lease. The
  // caller still authorizes its signature, owner and expiry before loading.
  const response=await CapacitorHttp.get({url:"https://www.kakomon-ai.jp/api/mobile/entitlement",headers:{Accept:"application/json"},responseType:"json",disableRedirects:true,connectTimeout:10000,readTimeout:15000}).catch(()=>null);
  if (!response) return;
  if([401,403].includes(response.status)){await downloads.invalidate();throw new Error("オンライン画面でログインし、会員権利を再確認してください。");}
  if(response.status!==200)return;
  let data: unknown;
  try { data = typeof response.data === "string" ? JSON.parse(response.data) : response.data; }
  catch { return; }
  if (!data || typeof data !== "object" || !("entitlement" in data)) return;
  const access = data.entitlement;
  // An incomplete/invalid 200 response is not an authoritative revocation.
  if (!access || typeof access !== "object" || !("entitled" in access) || typeof access.entitled !== "boolean"
    || !("userId" in access) || !(access.userId === null || typeof access.userId === "string" && access.userId.length > 0)) return;
  if ("lease" in access && access.lease !== null && typeof access.lease !== "string") return;
  const result=data as {entitlement:MobileEntitlement;configuration?:MobileConfiguration};
  if(!result.entitlement.entitled||result.entitlement.userId!==r.access.userId){await downloads.invalidate();throw new Error("会員権利を確認できないため保存問題を無効にしました。オンライン画面でログインしてください。");}
  if(result.entitlement.lease && typeof result.configuration?.leasePublicKey === "string" && result.configuration.leasePublicKey)
    await downloads.updateRights(result.entitlement,result.configuration.leasePublicKey);
}
