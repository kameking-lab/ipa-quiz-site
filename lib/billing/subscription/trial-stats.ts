import type { Account } from "./domain";

/** Counts for the first-contract free trial, derived only from stored billing facts (no PII). */
export interface TrialStats {
  /** Checkout pages opened with the trial offer. */
  offered: number;
  /** Trial subscriptions created (card registered), excluding cards that already had a trial. */
  started: number;
  /** Still inside the free period and set to renew. */
  trialing: number;
  /** Cancelled before the first charge (cancel scheduled or already ended without a paid month). */
  canceledInTrial: number;
  /** Paid the first month after the trial. */
  converted: number;
  /** Card already used for a trial on another account: charged immediately instead. */
  revoked: number;
}

export function trialStats(accounts: readonly Account[]): TrialStats {
  const s: TrialStats = { offered: 0, started: 0, trialing: 0, canceledInTrial: 0, converted: 0, revoked: 0 };
  for (const a of accounts) {
    for (const signup of Object.values(a.signups)) if ((signup.trialDays ?? 0) > 0) s.offered++;
    for (const c of Object.values(a.contracts)) {
      if (!((a.signups[c.signupId]?.trialDays ?? 0) > 0)) continue;
      if (c.trialRevoked) { s.revoked++; continue; }
      s.started++;
      const paid = Object.values(a.invoices).some(i => i.subscriptionId === c.id && i.paid && i.amount > 0);
      if (paid) s.converted++;
      else if (c.cancelAtPeriodEnd || c.status === "canceled" || c.status === "incomplete_expired") s.canceledInTrial++;
      else if (c.status === "trialing") s.trialing++;
    }
  }
  return s;
}
