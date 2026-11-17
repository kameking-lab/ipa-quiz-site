import "server-only";
import { BillingError } from "./domain";
import type { SqlSession } from "./postgres-store";
import { normalizedPurchaseEmail, privateRelayEmail } from "@/lib/auth/purchase-email";

type Member = { id: string; email: string | null; emailVerified: Date | null; providers: string[] };
type Rights = { stripe: boolean; appStore: boolean };
export class DuplicatePurchaseGuard {
  constructor(private db: SqlSession, private rights: (userId: string) => Promise<Rights>) {}

  private async members(userId: string, requireVerified: boolean): Promise<Member[]> {
    const [current] = await this.db.query<Member>(`SELECT u.id,u.email,u."emailVerified",
      ARRAY(SELECT a.provider FROM "Account" a WHERE a."userId"=u.id AND a.provider IN ('google','apple')) AS providers
      FROM "User" u WHERE u.id=$1`, [userId]);
    if (!current) throw new BillingError("sign_in_required", 401);
    if (!current.email || privateRelayEmail(current.email)) return [];
    if (requireVerified && !current.emailVerified) {
      if (current.providers.length) throw new BillingError("purchase_email_unverified", 409);
      return [];
    }
    return this.db.query<Member>(`SELECT u.id,u.email,u."emailVerified",
      ARRAY(SELECT a.provider FROM "Account" a WHERE a."userId"=u.id AND a.provider IN ('google','apple') ORDER BY a.provider) AS providers
      FROM "User" u WHERE lower(btrim(u.email))=$1 ORDER BY u.id`, [normalizedPurchaseEmail(current.email)]);
  }

  async assertCanPurchase(userId: string) {
    try {
      const methods = new Set<string>();
      for (const member of await this.members(userId, true)) {
        if (member.id === userId || !member.providers.length) continue;
        const paid = await this.rights(member.id);
        if (paid.stripe || paid.appStore) for (const provider of member.providers) methods.add(provider);
      }
      if (methods.size) {
        const suffix = ["google", "apple"].filter(provider => methods.has(provider)).join("_");
        throw new BillingError(`duplicate_purchase_${suffix}`, 409);
      }
    } catch (error) {
      if (error instanceof BillingError && (error.code.startsWith("duplicate_purchase_") || error.code === "purchase_email_unverified" || error.code === "sign_in_required")) throw error;
      // Do not log database errors: they can contain emails, IDs or connection details.
      console.warn("purchase_check_unavailable");
      throw new BillingError("purchase_check_unavailable", 503);
    }
  }

  /** Monitoring cannot change purchase rights or make a successfully saved webhook fail. */
  async audit(userId: string) {
    try {
      let stripe = false, appStore = false;
      for (const member of await this.members(userId, false)) {
        const paid = await this.rights(member.id);
        stripe ||= paid.stripe; appStore ||= paid.appStore;
      }
      if (stripe && appStore) console.warn("duplicate_purchase_stripe_app_store_same_email");
    } catch { console.warn("duplicate_purchase_audit_unavailable"); }
  }
}
