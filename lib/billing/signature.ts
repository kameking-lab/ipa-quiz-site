import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { BillingError } from "./domain";

export function verifyStripeEvent(raw: Uint8Array, header: string | null, secret: string, now = Date.now()): unknown {
  if (!secret.startsWith("whsec_") || !header || raw.length > 262144) throw new BillingError("invalid_signature", 400);
  const parts = header.split(",").map(s => s.split("="));
  const times = parts.filter(([k]) => k === "t");
  if (times.length !== 1 || !/^\d+$/.test(times[0][1] ?? "")) throw new BillingError("invalid_signature", 400);
  const timestamp = times[0][1];
  if (Math.abs(now / 1000 - Number(timestamp)) > 300) throw new BillingError("stale_signature", 400);
  const expected = createHmac("sha256", secret).update(`${timestamp}.`).update(raw).digest();
  const matched = parts.filter(([k, v]) => k === "v1" && /^[a-f0-9]{64}$/.test(v ?? ""))
    .some(([, v]) => timingSafeEqual(expected, Buffer.from(v, "hex")));
  if (!matched) throw new BillingError("invalid_signature", 400);
  try { return JSON.parse(Buffer.from(raw).toString("utf8")); } catch { throw new BillingError("invalid_event", 400); }
}
/** Fields Stripe changes between deliveries of the same event (retries, redelivery). */
const DELIVERY_FIELDS = ["pending_webhooks"] as const;
/**
 * Digest of a verified event's content. Stripe resends the same event with a
 * different `pending_webhooks` count, so hashing the raw body would turn every
 * retry into a false conflict. Versioned so stored raw digests stay comparable.
 */
export function eventDigest(raw: Uint8Array) {
  try {
    const parsed: unknown = JSON.parse(Buffer.from(raw).toString("utf8"));
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const event = { ...(parsed as Record<string, unknown>) };
      for (const field of DELIVERY_FIELDS) delete event[field];
      return `v2:${createHash("sha256").update(JSON.stringify(event)).digest("hex")}`;
    }
  } catch { /* Not JSON: fall back to the raw body. */ }
  return createHash("sha256").update(raw).digest("hex");
}
export { sameEventDigest } from "./event-identity";
