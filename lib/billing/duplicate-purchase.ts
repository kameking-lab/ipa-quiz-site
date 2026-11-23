import "server-only";
import { BillingError } from "./domain";
import type { SqlSession } from "./postgres-store";
import { purchaseNeedsSignIn } from "./purchase-messages";
import { normalizedPurchaseEmail, privateRelayEmail, PURCHASE_EMAIL_WHITESPACE } from "@/lib/auth/purchase-email";

type Member = { id: string; providers: string[] };
type Rights = { stripe: boolean; appStore: boolean };
export class DuplicatePurchaseGuard {
  constructor(private db: SqlSession, private rights: (userId: string) => Promise<Rights>) {}

  private async purchaseEmail(userId: string) {
    const [current] = await this.db.query<{ email: string | null; emailVerified: Date | null }>(
      `SELECT email,"emailVerified" FROM "User" WHERE id=$1`, [userId]);
    if (!current) throw new BillingError("sign_in_required", 401);
    if (!current.email || privateRelayEmail(current.email)) return null;
    const email = normalizedPurchaseEmail(current.email);
    return email ? { email, verified: current.emailVerified !== null } : null;
  }

  private members(email: string): Promise<Member[]> {
    return this.db.query<Member>(`SELECT u.id,
      ARRAY(SELECT a.provider FROM "Account" a WHERE a."userId"=u.id AND a.provider IN ('google','apple') ORDER BY a.provider) AS providers
      FROM "User" u WHERE lower(btrim(u.email,$2))=$1 ORDER BY u.id`, [email, PURCHASE_EMAIL_WHITESPACE]);
  }

  async assertCanPurchase(userId: string) {
    try {
      const current = await this.purchaseEmail(userId);
      if (!current) return;
      let duplicate = false;
      const methods = new Set<string>();
      for (const member of await this.members(current.email)) {
        if (member.id === userId) continue;
        const paid = await this.rights(member.id);
        if (!paid.stripe && !paid.appStore) continue;
        // Existing sessions can predate email verification. Only ask them to
        // sign in again on a paid match, and keep the other login method private.
        if (!current.verified) throw new BillingError("purchase_email_unverified", 409);
        duplicate = true;
        for (const provider of member.providers) methods.add(provider);
      }
      if (duplicate) {
        const suffix = ["google", "apple"].filter(provider => methods.has(provider)).join("_");
        throw new BillingError(suffix ? `duplicate_purchase_${suffix}` : "duplicate_purchase", 409);
      }
    } catch (error) {
      if (error instanceof BillingError && (purchaseNeedsSignIn(error.code) || error.code === "sign_in_required")) throw error;
      // Do not log database errors: they can contain emails, IDs or connection details.
      console.warn("purchase_check_unavailable");
      throw new BillingError("purchase_check_unavailable", 503);
    }
  }

  async appStoreUsers(userId: string) {
    const current = await this.purchaseEmail(userId);
    const ids = current ? (await this.members(current.email)).map(member => member.id) : [userId];
    const appStoreUsers: string[] = [];
    for (const id of ids) if ((await this.rights(id)).appStore) appStoreUsers.push(id);
    return appStoreUsers;
  }
}
