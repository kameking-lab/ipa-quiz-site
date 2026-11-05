import "server-only";
import { POST } from "@/app/api/billing/question/route";
import { strictContentGateEnabled } from "./content-policy";
/** Adapter for older GET/batch APIs: same identity, same transaction, same IDs. */
export async function contentGrant(request: Request, id: string, paper?: string) {
  const headers = new Headers(request.headers);
  headers.set("Content-Type","application/json");
  if (!headers.has("origin")) headers.set("origin",new URL(request.url).origin);
  if (paper) headers.set("X-Kakomon-Paper",paper);
  return POST(new Request(new URL("/api/billing/question",request.url), {method:"POST",headers,body:JSON.stringify({id,shuffle:false})}));
}
export async function permittedBatch<T extends {id:string}>(request: Request, rows: T[]) {
  if(!strictContentGateEnabled())return {rows,response:null};
  const allowed:T[]=[];
  for(const row of rows) {
    const grant=await contentGrant(request,row.id);
    if(!grant.ok) {
      if(grant.status===429 && allowed.length)return {rows:allowed,response:null};
      return {rows:[],response:grant};
    }
    allowed.push(row);
  }
  return {rows:allowed,response:null};
}
