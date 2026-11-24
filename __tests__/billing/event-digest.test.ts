import { describe, expect, it } from "vitest";
import { eventDigest, sameEventDigest } from "@/lib/billing/signature";

const body = (pending: number, extra: Record<string, unknown> = {}) =>
  new TextEncoder().encode(JSON.stringify({ id: "evt_1", object: "event", pending_webhooks: pending, data: { object: { id: "cs_1", status: "complete" } }, ...extra }));

describe("Stripe event digest", () => {
  it("treats a retried delivery with a different pending_webhooks count as the same event", () => {
    expect(eventDigest(body(2))).toBe(eventDigest(body(1)));
    expect(sameEventDigest(eventDigest(body(2)), eventDigest(body(0)))).toBe(true);
  });
  it("still detects changed event content", () => {
    expect(sameEventDigest(eventDigest(body(1)), eventDigest(body(1, { type: "changed" })))).toBe(false);
  });
  it("accepts a retry of an event stored with the legacy raw digest", () => {
    expect(sameEventDigest("0".repeat(64), eventDigest(body(1)))).toBe(true);
  });
});
