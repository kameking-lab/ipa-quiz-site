import "server-only";
import { billingConfig, gateReady } from "./config";
import { billingIdentity, billingRuntime } from "./runtime";
import { monthlyConfig, monthlySelected } from "./subscription/config";
/** Existing stream remains untouched while off. Errors never grant paid access. */
export async function streamAccess() {
  if (process.env.MOBILE_IAP_ENABLED === "true") {
    const id = await (await import("./runtime")).optionalBillingIdentity();
    if (id && await (await import("@/mobile/server/revenuecat")).revenueCatAccess(id)) return true;
  }
  if (monthlySelected()) {
    try {
      if (!monthlyConfig().enabled) return true;
      return (await (await import("./subscription/runtime")).monthlyRuntime().service.status(await billingIdentity())).entitled;
    } catch { return false; }
  }
  if (!gateReady(billingConfig())) return true;
  try { return (await billingRuntime().service.status(await billingIdentity())).entitled; }
  catch { return false; }
}
