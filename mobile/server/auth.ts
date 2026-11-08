import "server-only";
import { createHash,createHmac,timingSafeEqual, randomBytes } from "node:crypto";
import { encode } from "next-auth/jwt";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth";
import { BillingError } from "@/lib/billing/domain";
import { billingFailure } from "@/lib/billing/runtime";
import { reviewSessionClaims, reviewSessionValid } from "@/lib/auth/app-review";
const digest = (s: string) => createHash("sha256").update(s).digest("base64url");
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
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
    if(request.method==="GET") {
      // The nonce travels in the form itself (expiry + random, signed into the proof). A cookie copy
      // broke on real iPhones: reopening the page via back/forward replaced the cookie, so the
      // displayed form no longer matched it (invalid_consent on TestFlight build 15).
      const nonce=`${Date.now()+300000}.${randomBytes(24).toString("base64url")}`,proof=consentProof(session.user.id,nonce,challenge,state);
      const who=escapeHtml(session.user.name||session.user.email||"");
      const html=`<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>過去問AIアプリに戻る</title><style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#fdf6ec;font-family:-apple-system,"Hiragino Sans",sans-serif;color:#2b2118}main{width:min(100% - 40px,380px);text-align:center;padding:32px 0}img{width:112px;height:112px;border-radius:28px;box-shadow:0 8px 24px rgba(120,80,30,.18)}h1{font-size:22px;margin:20px 0 6px}p{margin:0 0 24px;color:#6b5a48;font-size:15px}button{width:100%;min-height:56px;border:0;border-radius:16px;background:#e8547a;color:#fff;font-size:18px;font-weight:700}a{display:inline-block;margin-top:18px;color:#8a7764;font-size:14px}</style><body><main><img src="/brand/chihuahua-icon-192.png" alt=""><h1>ログインできました</h1><p>${who?`${who} さんとして`:""}アプリで続きを学習しましょう。</p><form method="post" action="${url.pathname}?challenge=${challenge}&state=${state}"><input type="hidden" name="nonce" value="${nonce}"><input type="hidden" name="proof" value="${proof}"><button type="submit">アプリに戻る</button></form><a href="/auth/signout">別のアカウントでログイン</a></main></body></html>`;
      // same-origin, not no-referrer: with no-referrer Safari posts the consent form with Origin: null,
      // which the origin check below rejects as invalid_origin (seen on TestFlight build 14).
      // form-action must allow kakomonai: — CSP form-action also governs the redirect after submit, and
      // 'self' alone silently blocked the 302 back to the app (owner "can't return" on build 15).
      return new Response(html,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","Referrer-Policy":"same-origin","Content-Security-Policy":"default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; form-action 'self' kakomonai:; frame-ancestors 'none'; base-uri 'none'"}});
    }
    // CSRF: same-origin POST only, the session cookie is SameSite=Lax, and the proof binds user, challenge, state and expiry.
    if(request.headers.get("origin")!==url.origin)throw new BillingError("invalid_origin",403);
    const form=await request.text();if(form.length>4096)throw new BillingError("invalid_auth_request",400);
    const fields=new URLSearchParams(form),nonce=fields.get("nonce"),proof=fields.get("proof");
    const expires=Number(nonce?.split(".")[0]);
    if(!nonce||!/^\d{13}\.[\w-]{32}$/.test(nonce)||!(expires>Date.now()&&expires<=Date.now()+300000)||!proof||!/^\w{64}$/.test(proof)||!timingSafeEqual(Buffer.from(proof),Buffer.from(consentProof(session.user.id,nonce,challenge,state))))throw new BillingError("invalid_consent",403);
    const code = randomBytes(32).toString("base64url");
    await prisma.$executeRawUnsafe('DELETE FROM "MobileAuthCode" WHERE "expiresAt" < NOW()');
    // Bind review authorization version to the existing TEXT challenge column.
    // No new columns/tables: old pending codes cannot survive code rotation.
    const boundChallenge = session.reviewVersion ? `${challenge}.${session.reviewVersion}` : challenge;
    await prisma.$executeRawUnsafe('INSERT INTO "MobileAuthCode" ("codeHash", "userId", "challenge", "expiresAt", "authenticatedAt") VALUES ($1,$2,$3,$4,$5)', digest(code), session.user.id, boundChallenge, new Date(Date.now() + 60000), session.authenticatedAt ?? 0);
    return new Response(null, { status: 302, headers: { Location: `kakomonai://auth?code=${code}&state=${state}`, "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
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
    const rows = await prisma.$queryRawUnsafe<Array<{ userId: string; authenticatedAt: bigint | number | null; challenge: string }>>('DELETE FROM "MobileAuthCode" WHERE "codeHash"=$1 AND split_part("challenge",\'.\',1)=$2 AND "expiresAt">NOW() RETURNING "userId", "authenticatedAt", "challenge"', digest(code), digest(verifier));
    if (!rows[0]) throw new BillingError("auth_code_expired", 401);
    const user=await prisma.user.findUnique({where:{id:rows[0].userId},select:{id:true,name:true,email:true,image:true,plan:true}});
    if(!user)throw new BillingError("auth_account_unavailable",401);
    const boundVersion = rows[0].challenge?.split(".")[1];
    // Observe disable/expiry before returning on a configuration mismatch, so
    // even a PKCE-only request permanently retires the original review version.
    if (!await reviewSessionValid({ id: user.id, reviewVersion: boundVersion })) throw new BillingError("auth_account_unavailable",401);
    const reviewClaims = await reviewSessionClaims(user.id);
    if ((boundVersion || reviewClaims.reviewVersion) && boundVersion !== reviewClaims.reviewVersion) throw new BillingError("auth_account_unavailable",401);
    const secret = process.env.AUTH_SECRET;
    if (!secret) throw new BillingError("auth_unavailable", 503);
    const secure = url.protocol === "https:", cookie = `${secure ? "__Secure-" : ""}authjs.session-token`;
    const maxAge = 30 * 86400;
    const token = await encode({ secret, salt: cookie, token: { id:user.id,sub:user.id,name:user.name,email:user.email,picture:user.image,plan:user.plan,authenticatedAt:Number(rows[0].authenticatedAt??0), ...reviewClaims }, maxAge });
    const requested=typeof value.returnTo==="string"?value.returnTo:"/";
    const destination=requested.startsWith("/")&&!requested.startsWith("//")&&!requested.startsWith("/\\")?new URL(requested,url):new URL("/",url);
    return Response.json({redirectTo:destination.origin===url.origin?destination.href:new URL("/",url).href}, { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer",
      "Set-Cookie": `${cookie}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? "; Secure" : ""}` } });
  } catch (error) { return billingFailure(error); }
}
