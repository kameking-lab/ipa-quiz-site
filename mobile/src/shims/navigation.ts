export function useRouter() { return { push: (url:string)=>{ if (url.startsWith("/?done") || url==="/") window.dispatchEvent(new Event("mobile:home")); else location.assign(new URL(url,"https://www.kakomon-ai.jp").href); },replace:(url:string)=>location.replace(url),refresh:()=>location.reload(),back:()=>history.back(),prefetch:()=>{} }; }
export function usePathname() { return location.pathname; }
export function useSearchParams() { return new URLSearchParams(location.search); }
