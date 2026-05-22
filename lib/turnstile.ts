const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const VERIFY_TIMEOUT_MS = 5_000;

export interface TurnstileVerifyResult {
  ok: boolean;
  skipped: boolean;
  errorCodes?: string[];
}

export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp?: string,
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[turnstile] TURNSTILE_SECRET_KEY not set — fail-open");
    }
    return { ok: true, skipped: true };
  }
  if (!token || typeof token !== "string") {
    return { ok: false, skipped: false, errorCodes: ["missing-input-response"] };
  }

  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);
  if (remoteIp) body.append("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.warn(`[turnstile] HTTP ${res.status}`);
      return { ok: false, skipped: false, errorCodes: ["http-error"] };
    }
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data.success === true) {
      return { ok: true, skipped: false };
    }
    return { ok: false, skipped: false, errorCodes: data["error-codes"] };
  } catch (e) {
    console.warn("[turnstile] verify error:", e);
    return { ok: false, skipped: false, errorCodes: ["network-error"] };
  }
}
