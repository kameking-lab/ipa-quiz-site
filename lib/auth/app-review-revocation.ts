// Server / owner CLI only. The persistent ledger must share the production KV.
// Never expire/delete this key: retired versions cannot be restored by env rollback.
export const REVIEW_REVOCATION_KEY = "auth:app-review:revocations:v1";
export const REVIEW_REVOCATION_LUA = `
if #KEYS ~= 1 or #ARGV ~= 1 then return redis.error_reply('invalid review arguments') end
local candidate = ARGV[1]
if candidate ~= '' and (#candidate ~= 64 or not string.match(candidate, '^[a-f0-9]+$')) then
  return redis.error_reply('invalid review version')
end
local active = redis.call('HGET', KEYS[1], 'active')
if active and (#active ~= 64 or not string.match(active, '^[a-f0-9]+$')) then
  return redis.error_reply('invalid review ledger')
end
if candidate == '' then
  if active then redis.call('HSET', KEYS[1], 'retired:' .. active, '1') end
  redis.call('HDEL', KEYS[1], 'active')
  return 1
end
if redis.call('HEXISTS', KEYS[1], 'retired:' .. candidate) == 1 then return 0 end
if active ~= candidate then
  if active then redis.call('HSET', KEYS[1], 'retired:' .. active, '1') end
  redis.call('HSET', KEYS[1], 'active', candidate)
end
return 1
`;

async function updateLedger(version: string): Promise<boolean> {
  const url = process.env.KV_REST_API_URL?.replace(/\/$/, "");
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("review_revocation_unavailable");
  try {
    const response = await fetch(url, {
      method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["EVAL", REVIEW_REVOCATION_LUA, 1, REVIEW_REVOCATION_KEY, version]),
      signal: AbortSignal.timeout(3000), cache: "no-store",
    });
    if (!response.ok) throw new Error();
    const body: unknown = await response.json();
    if (!body || typeof body !== "object" || !("result" in body) || "error" in body ||
        (body.result !== 0 && body.result !== 1)) throw new Error();
    return body.result === 1;
  } catch { throw new Error("review_revocation_unavailable"); }
}

export async function activateReviewVersion(version: string) {
  if (!/^[a-f0-9]{64}$/.test(version)) throw new Error("invalid_review_version");
  return updateLedger(version);
}

export async function revokeReviewSessions() {
  if (!await updateLedger("")) throw new Error("review_revocation_unavailable");
}
