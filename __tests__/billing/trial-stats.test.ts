import { describe, expect, it } from "vitest";
import { emptyAccount, type Account, type Contract, type Signup } from "@/lib/billing/subscription/domain";
import { trialStats } from "@/lib/billing/subscription/trial-stats";

const signup = (id: string, trialDays?: number): Signup => ({ id, createdAt: "2026-11-15T00:00:00Z", terms: "t", amount: 980, priceId: "price",
  state: "attached", sessionId: null, url: null, subscriptionId: null, ...(trialDays ? { trialDays } : {}) });
const contract = (id: string, signupId: string, extra: Partial<Contract> = {}): Contract => ({ id, customerId: "cus", signupId, priceId: "price", amount: 980,
  status: "trialing", periodStart: 0, periodEnd: 7 * 86400, cancelAtPeriodEnd: false, renewalBlocked: false, ...extra });
const account = (userId: string, fill: (a: Account) => void) => { const a = emptyAccount(userId, "stripe-live", "src"); fill(a); return a; };

describe("trialStats", () => {
  it("counts offers, starts, cancels, conversions and revoked cards; ignores non-trial contracts", () => {
    const accounts = [
      account("trialing", a => { a.signups.s1 = signup("s1", 7); a.contracts.c1 = contract("c1", "s1"); }),
      account("canceled", a => { a.signups.s2 = signup("s2", 7); a.contracts.c2 = contract("c2", "s2", { cancelAtPeriodEnd: true }); }),
      account("converted", a => {
        a.signups.s3 = signup("s3", 7); a.contracts.c3 = contract("c3", "s3", { status: "active" });
        a.invoices.i0 = { id: "i0", subscriptionId: "c3", customerId: "cus", priceId: "price", periodStart: 0, periodEnd: 1, amount: 0, paid: true, payments: [] };
        a.invoices.i1 = { id: "i1", subscriptionId: "c3", customerId: "cus", priceId: "price", periodStart: 1, periodEnd: 2, amount: 980, paid: true, payments: [] };
      }),
      account("revoked", a => { a.signups.s4 = signup("s4", 7); a.contracts.c4 = contract("c4", "s4", { trialRevoked: true }); }),
      account("abandoned", a => { a.signups.s5 = signup("s5", 7); }),
      account("legacy", a => { a.signups.s6 = signup("s6"); a.contracts.c6 = contract("c6", "s6", { status: "active" }); }),
    ];
    expect(trialStats(accounts)).toEqual({ offered: 5, started: 3, trialing: 1, canceledInTrial: 1, converted: 1, revoked: 1 });
  });

  it("returns zeros with no accounts", () => {
    expect(trialStats([])).toEqual({ offered: 0, started: 0, trialing: 0, canceledInTrial: 0, converted: 0, revoked: 0 });
  });
});
