import "server-only";
import { billingConfig, gateReady } from "./config";
import { optionalBillingSession } from "./runtime";
import { monthlyConfig, monthlySelected } from "./subscription/config";
import { studyMembership } from "./study-membership";
import { aiQuotaEnabled } from "@/lib/ai/access-config";
/** Existing stream remains untouched while off. Errors never grant paid access. */
export async function streamAccess() {
  try {
    const enabled = monthlySelected() ? monthlyConfig().enabled : gateReady(billingConfig());
    if (!enabled) return true;
    const session = await optionalBillingSession();
    if (!session?.user?.id) return false;
    // The app's server-rendered navigation carries its signed session cookie.
    const status = await studyMembership(session.user.id, aiQuotaEnabled(), session.mobileSession ? "app" : "web");
    return status.source !== "free";
  } catch { return false; }
}
