import "server-only";
import { createHash,createHmac,timingSafeEqual, randomBytes } from "node:crypto";
import { encode } from "next-auth/jwt";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth";
import { BillingError } from "@/lib/billing/domain";
import { billingFailure } from "@/lib/billing/runtime";
const digest = (s: string) => createHash("sha256").update(s).digest("base64url");
function consentProof(user:string,nonce:string,challenge:string,state:string){
  const secret=process.env.AUTH_SECRET;if(!secret)throw new BillingError("auth_unavailable",503);
  return createHmac("sha256",secret).update(JSON.stringify(["native-consent-v1",user,nonce,challenge,state])).digest("hex");
}
export async function complete(request: Request) {
  try {
    const session = await auth(), url = new URL(request.url);
    if (!session?.user?.id) return Response.redirect(new URL(`/auth/signin?callbackUrl=${encodeURIComponent(url.pathname + url.search)}`, url));
    const challenge = url.searchParams.get("challenge"), state = url.searchParams.get("state");
    if (!challenge || !/^[\w-]{43}$/.test(challenge) || !state || !/^[\w-]{43}$/.test(state)) throw new BillingError("invalid_auth_request", 400);
    const secure=url.protocol==="https:",cookie=`${secure?"__Host-":""}mobile-auth-consent`;
    if(request.method==="GET") {
      const nonce=randomBytes(32).toString("base64url"),proof=consentProof(session.user.id,nonce,challenge,state);
      const html=`<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>アプリへのログイン確認</title><body><main><h1>過去問AIアプリにログイン</h1><p>ログイン中のアカウントでiPhoneアプリを利用します。アプリへ戻って学習を続けますか？</p><form method="post" action="${url.pathname}?challenge=${challenge}&state=${state}"><input type="hidden" name="proof" value="${proof}"><button type="submit">確認してアプリに戻る</button></form><p><a href="/auth/signout">別のアカウントでログインする</a></p></main></body></html>`;
      return new Response(html,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","Referrer-Policy":"no-referrer","Content-Security-Policy":"default-src 'none'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'","Set-Cookie":`${cookie}=${nonce}; Path=/; HttpOnly; SameSite=Lax; Max-Age=300${secure?"; Secure":""}`}});
    }
    if(request.headers.get("origin")!==url.origin)throw new BillingError("invalid_origin",403);
    const nonce=request.headers.get("cookie")?.split(";").map(x=>x.trim()).find(x=>x.startsWith(cookie+"="))?.slice(cookie.length+1);
    const form=await request.text();if(form.length>4096)throw new BillingError("invalid_auth_request",400);
    const proof=new URLSearchParams(form).get("proof");
    if(!nonce||!/^[\w-]{43}$/.test(nonce)||!proof||!/^\w{64}$/.test(proof)||!timingSafeEqual(Buffer.from(proof),Buffer.from(consentProof(session.user.id,nonce,challenge,state))))throw new BillingError("invalid_consent",403);
    const code = randomBytes(32).toString("base64url");
    await prisma.$executeRawUnsafe('DELETE FROM "MobileAuthCode" WHERE "expiresAt" < NOW()');
    await prisma.$executeRawUnsafe('INSERT INTO "MobileAuthCode" ("codeHash", "userId", "challenge", "expiresAt") VALUES ($1,$2,$3,$4)', digest(code), session.user.id, challenge, new Date(Date.now() + 60000));
    return new Response(null, { status: 302, headers: { Location: `kakomonai://auth?code=${code}&state=${state}`, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer","Set-Cookie":`${cookie}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure?"; Secure":""}` } });
  } catch (error) { return billingFailure(error); }
}
export async function exchange(request: Request) {
  try {
    const url = new URL(request.url);
    const origin=request.headers.get("origin");
    if(request.headers.get("X-Kakomon-Native")!=="ios" || origin&&origin!==url.origin&&origin!=="capacitor://localhost")throw new BillingError("invalid_origin",403);
    const body=await request.text();if(body.length>4096)throw new BillingError("invalid_auth_request",400);
    const value=JSON.parse(body) as {code?:string;verifier?:string;returnTo?:string};
    const code=value.code,verifier=value.verifier;
    if (!code || !verifier || !/^[\w-]{43}$/.test(code) || !/^[\w-]{43}$/.test(verifier)) throw new BillingError("invalid_auth_request", 400);
    const rows = await prisma.$queryRawUnsafe<Array<{ userId: string }>>('DELETE FROM "MobileAuthCode" WHERE "codeHash"=$1 AND "challenge"=$2 AND "expiresAt">NOW() RETURNING "userId"', digest(code), digest(verifier));
    if (!rows[0]) throw new BillingError("auth_code_expired", 401);
    const user=await prisma.user.findUnique({where:{id:rows[0].userId},select:{id:true,name:true,email:true,image:true,plan:true}});
    if(!user)throw new BillingError("auth_account_unavailable",401);
    const secret = process.env.AUTH_SECRET;
    if (!secret) throw new BillingError("auth_unavailable", 503);
    const secure = url.protocol === "https:", cookie = `${secure ? "__Secure-" : ""}authjs.session-token`;
    const maxAge = 30 * 86400;
    const token = await encode({ secret, salt: cookie, token: { id:user.id,sub:user.id,name:user.name,email:user.email,picture:user.image,plan:user.plan }, maxAge });
    const requested=typeof value.returnTo==="string"?value.returnTo:"/";
    const destination=requested.startsWith("/")&&!requested.startsWith("//")&&!requested.startsWith("/\\")?new URL(requested,url):new URL("/",url);
    return Response.json({redirectTo:destination.origin===url.origin?destination.href:new URL("/",url).href}, { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer",
      "Set-Cookie": `${cookie}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? "; Secure" : ""}` } });
  } catch (error) { return billingFailure(error); }
}
