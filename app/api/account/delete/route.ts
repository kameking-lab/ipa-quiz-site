import { auth } from "@/lib/auth";
import { deleteAccount } from "@/lib/auth/delete-account";
import { BillingError } from "@/lib/billing/domain";
import { billingFailure,json } from "@/lib/billing/runtime";
export const runtime="nodejs";
export async function POST(request:Request) {
  try {
    if(request.headers.get("origin")!==new URL(request.url).origin)throw new BillingError("invalid_origin",403);
    const session=await auth();
    if(!session?.user?.id)throw new BillingError("sign_in_required",401);
    if(!session.authenticatedAt || Date.now()-session.authenticatedAt>5*60000 || session.authenticatedAt>Date.now()+30000)throw new BillingError("reauthentication_required",401);
    const body=await request.text();
    if(body.length>1000 || JSON.parse(body).confirmation!=="DELETE")throw new BillingError("confirmation_required",400);
    if(!process.env.DATABASE_URL)throw new BillingError("deletion_unavailable",503);
    await deleteAccount(session.user.id);
    const response=json({deleted:true});
    for(const name of ["authjs.session-token","__Secure-authjs.session-token"])response.headers.append("Set-Cookie",`${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${new URL(request.url).protocol==="https:"?"; Secure":""}`);
    return response;
  }catch(e){return billingFailure(e);}
}
