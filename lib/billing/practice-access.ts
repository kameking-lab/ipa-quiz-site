import "server-only";
import { billingConfig, gateReady } from "./config";
import { monthlyConfig, monthlySelected } from "./subscription/config";
import { strictContentGateEnabled } from "./content-policy";

/** The practice UI and question endpoint must select the same product gate. */
export function practiceGateEnabled(env: Readonly<Record<string, string | undefined>> = process.env) {
  return strictContentGateEnabled(env) || (monthlySelected(env) ? monthlyConfig(env).enabled : gateReady(billingConfig(env)));
}
