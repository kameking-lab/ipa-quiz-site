import "server-only";
import { billingConfig, gateReady } from "./config";
import { billingIdentity, billingRuntime } from "./runtime";
import { monthlyConfig, monthlySelected } from "./subscription/config";
/** Existing stream remains untouched while off. Errors never grant paid access. */
export async function streamAccess() {
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
