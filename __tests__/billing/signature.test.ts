import { createHmac } from "node:crypto";
import { describe, it, expect } from "vitest";
import { verifyStripeEvent } from "@/lib/billing/signature";
const now = 1792886400000, secret = "whsec_local-test-fixture-not-a-real-secret";
const raw = Buffer.from('{"id":"evt_fixture","livemode":false}');
const signature = (body = raw, t = now / 1000) => `t=${t},v1=${createHmac("sha256", secret).update(`${t}.`).update(body).digest("hex")}`;
describe("Stripe raw signature", () => {
  it("accepts exact bytes, including a rotated matching v1", () => {
    expect(verifyStripeEvent(raw, signature(), secret, now)).toEqual({ id: "evt_fixture", livemode: false });
    expect(verifyStripeEvent(raw, signature() + ",v1=" + "0".repeat(64), secret, now)).toBeTruthy();
  });
  it("rejects changed body, absent/bad signature, stale/future timestamp and wrong key", () => {
    for (const header of [null, "t=bad,v1=abc", signature(raw, now / 1000 - 301), signature(raw, now / 1000 + 301), signature() + `,t=${now / 1000}`]) expect(() => verifyStripeEvent(raw, header, secret, now)).toThrow();
    expect(() => verifyStripeEvent(Buffer.from('{ "id":"evt_fixture","livemode":false}'), signature(), secret, now)).toThrow();
    expect(() => verifyStripeEvent(raw, signature(), "whsec_wrong", now)).toThrow();
    expect(() => verifyStripeEvent(Buffer.alloc(262145), signature(), secret, now)).toThrow();
  });
});
