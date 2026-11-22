import { AI_POLICY_VERSION } from "./access-policy";

const POLICY_DENIAL_STATUS: Record<string, number> = {
  ai_login_required: 401, ai_not_included: 403, ai_not_configured: 503,
  ai_unavailable: 503, ai_usage_unavailable: 503, ai_daily_quota_exhausted: 429,
  ai_question_pending: 409,
};

export function aiPolicyDenialMessage(status: number, body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const value = body as { error?: unknown; message?: unknown };
  return typeof value.error === "string" && Object.hasOwn(POLICY_DENIAL_STATUS, value.error)
    && POLICY_DENIAL_STATUS[value.error] === status && typeof value.message === "string" && value.message.trim()
    ? value.message : null;
}

export async function fetchWithAiGuestCookie(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  if (response.status === 428 && response.headers.get("X-AI-Policy-Version") === AI_POLICY_VERSION
    && response.headers.get("X-Error-Type") === "guest_cookie_required") return fetch(url, init);
  return response;
}

const draftKey = (key: string) => `kakomon:ai-checkout-draft:${key}`;
export function readAiCheckoutDraft(key: string) {
  try { return window.sessionStorage.getItem(draftKey(key)); } catch { return null; }
}
export function saveAiCheckoutDraft(key: string, draft: string) {
  try { window.sessionStorage.setItem(draftKey(key), draft); } catch { /* The return URL still works. */ }
}
export function clearAiCheckoutDraft(key: string) {
  try { window.sessionStorage.removeItem(draftKey(key)); } catch { /* Storage is optional. */ }
}
