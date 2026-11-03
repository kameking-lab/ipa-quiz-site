import {Capacitor,CapacitorHttp} from "@capacitor/core";
import {Network} from "@capacitor/network";
/** The shared web components keep their relative API paths in the local shell. */
export function installLocalApi() {
  if(!Capacitor.isNativePlatform() || location.protocol!=="capacitor:")return ()=>{};
  const original=window.fetch;
  window.fetch=async(input,init)=>{
    const request=new Request(new URL(input instanceof Request?input.url:String(input),location.href),init);
    const url=new URL(request.url);
    if(url.protocol!==location.protocol || url.host!==location.host || !url.pathname.startsWith("/api/"))return original(input,init);
    if(!(await Network.getStatus()).connected)throw new Error("この機能はオンラインで利用できます。");
    request.signal.throwIfAborted();
    const text=request.method==="GET"?undefined:await request.text();
    const data=text?JSON.parse(text):undefined;
    const result=await CapacitorHttp.request({url:"https://www.kakomon-ai.jp"+url.pathname+url.search,method:request.method,
      headers:Object.fromEntries(request.headers),data,responseType:"text",disableRedirects:true,connectTimeout:15000,readTimeout:60000});
    request.signal.throwIfAborted();
    const headers=new Headers(result.headers);
    return new Response(result.status===204?null:typeof result.data==="string"?result.data:JSON.stringify(result.data),{status:result.status,headers});
  };
  return ()=>{window.fetch=original;};
}
