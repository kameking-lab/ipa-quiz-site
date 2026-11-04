export interface Lease { version: 1; userId: string; entitlement: string; issuedAt: number; expiresAt: number }
function bytes(s: string) { return Uint8Array.from(atob(s.replace(/-/g,"+").replace(/_/g,"/")), c=>c.charCodeAt(0)); }
export async function verifyLease(token: string | null, publicKey: string, owner: string, now = Date.now(), lastSeen = 0): Promise<Lease> {
  if (!token || !publicKey || now + 60000 < lastSeen) throw new Error("有料会員の権利をオンラインで再確認してください。");
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) throw new Error("権利証明が不正です。");
  const key = await crypto.subtle.importKey("spki", bytes(publicKey.replace(/-----[^-]+-----|\s/g,"")), {name:"ECDSA",namedCurve:"P-256"}, false, ["verify"]);
  if (!await crypto.subtle.verify({name:"ECDSA",hash:"SHA-256"}, key, bytes(signature), new TextEncoder().encode(payload))) throw new Error("権利証明を確認できません。");
  const lease = JSON.parse(new TextDecoder().decode(bytes(payload))) as Lease;
  if (lease.version !== 1 || lease.userId !== owner || lease.entitlement !== "kakomon_pro" || !Number.isFinite(lease.issuedAt) || !Number.isFinite(lease.expiresAt)
    || lease.issuedAt > now + 60000 || lease.expiresAt <= now || lease.expiresAt > lease.issuedAt + 86400000) throw new Error("有料会員の権利期限が切れました。オンラインで再確認してください。");
  return lease;
}
