import "server-only";
import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/db/prisma";
import { BillingError } from "@/lib/billing/domain";
/** Apple requires revocation before discarding the tokens needed to revoke. */
export async function revokeApple(accounts:{provider:string;refresh_token:string|null;access_token:string|null}[],transport:typeof fetch=fetch) {
  for(const account of accounts.filter(a=>a.provider==="apple")) {
    const token=account.refresh_token??account.access_token;
    if(!token || !process.env.AUTH_APPLE_ID || !process.env.AUTH_APPLE_SECRET)throw new BillingError("apple_reauthentication_required",409);
    const response=await transport("https://appleid.apple.com/auth/revoke",{method:"POST",redirect:"error",cache:"no-store",signal:AbortSignal.timeout(10000),headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({client_id:process.env.AUTH_APPLE_ID,client_secret:process.env.AUTH_APPLE_SECRET,token,token_type_hint:account.refresh_token?"refresh_token":"access_token"})});
    if(!response.ok)throw new BillingError("apple_revocation_unavailable",503);
  }
}
/** Keep only unlinked transaction records needed for accounting/refunds. */
export function redactBilling(value:unknown,archiveId:string):unknown {
  if(Array.isArray(value))return value.map(v=>redactBilling(v,archiveId));
  if(value&&typeof value==="object")return Object.fromEntries(Object.entries(value).flatMap(([key,v])=>{
    if(/^(email|name|address|phone|billing_details|customer_details|grants|metadata)$/i.test(key))return [];
    return [[key,key==="userId"?archiveId:redactBilling(v,archiveId)]];
  }));
  return value;
}
export async function deleteAccount(userId:string,transport:typeof fetch=fetch) {
  const accounts=await prisma.account.findMany({where:{userId},select:{provider:true,refresh_token:true,access_token:true}});
  await revokeApple(accounts,transport);
  await prisma.$transaction(async tx=>{
    const user=await tx.$queryRawUnsafe<{id:string;email:string|null}[]>('SELECT id,email FROM "User" WHERE id=$1 FOR UPDATE',userId);
    if(!user[0])throw new BillingError("sign_in_required",401);
    const exists=async(table:string)=>(await tx.$queryRawUnsafe<{present:boolean}[]>('SELECT to_regclass($1) IS NOT NULL AS present',table))[0]?.present;
    const archivedId=`deleted-billing-${randomUUID()}`;
    let archiveCreated=false;
    for(const table of ["billing_purchase","billing_subscription_account"]) {
      if(!await exists(table))continue;
      const rows=await tx.$queryRawUnsafe<{payload:unknown}[]>(`SELECT payload FROM ${table} WHERE user_id=$1 FOR UPDATE`,userId);
      if(!rows.length)continue;
      if(!archiveCreated) {
        await tx.user.create({data:{id:archivedId}});
        await tx.$executeRawUnsafe('INSERT INTO "DeletedBillingRetention" ("archiveId","purgeAfter") VALUES ($1,NOW()+INTERVAL \'7 years\')',archivedId);
        archiveCreated=true;
      }
      for(const row of rows) {
        // One aggregate per realm; replace its payload without retaining profile or practice history.
        await tx.$executeRawUnsafe(`UPDATE ${table} SET payload=$3::jsonb WHERE user_id=$1 AND payload=$2::jsonb`,userId,JSON.stringify(row.payload),JSON.stringify(redactBilling(row.payload,archivedId)));
      }
      await tx.$executeRawUnsafe(`UPDATE ${table} SET user_id=$2 WHERE user_id=$1`,userId,archivedId);
    }
    if(await exists("billing_subscription_identity")) {
      if(archiveCreated)await tx.$executeRawUnsafe('UPDATE billing_subscription_identity SET user_id=$2 WHERE user_id=$1',userId,archivedId);
      else await tx.$executeRawUnsafe('DELETE FROM billing_subscription_identity WHERE user_id=$1',userId);
    }
    if(await exists("billing_daily_grant"))await tx.$executeRawUnsafe('DELETE FROM billing_daily_grant WHERE user_id=$1',userId);
    if(await exists("feedback_unlock")) {
      await tx.$executeRawUnsafe('DELETE FROM feedback_unlock_grant WHERE event_id IN (SELECT event_id FROM feedback_unlock WHERE user_id=$1)',userId);
      await tx.$executeRawUnsafe('DELETE FROM feedback_unlock WHERE user_id=$1',userId);
    }
    if(user[0].email)await tx.verificationToken.deleteMany({where:{identifier:user[0].email}});
    // Auth accounts/sessions, all study sync models, RC account and PKCE codes cascade.
    await tx.user.delete({where:{id:userId}});
  },{maxWait:5000,timeout:15000});
}
