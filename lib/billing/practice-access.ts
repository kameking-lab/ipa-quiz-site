import "server-only";
import { billingConfig, gateReady } from "./config";
import { monthlyConfig, monthlySelected } from "./subscription/config";
import { strictContentGateEnabled } from "./content-policy";
import { NATIVE_HEADER } from "@/mobile/shared/contracts";

/** The practice UI and question endpoint must select the same product gate. */
export function practiceGateEnabled(env: Readonly<Record<string, string | undefined>> = process.env) {
  return strictContentGateEnabled(env) || (monthlySelected(env) ? monthlyConfig(env).enabled : gateReady(billingConfig(env)));
}

/** Route protected content through the grant handler even if billing configuration cannot be read. */
export function requiresPracticeContentGrant(request: Request, app = false) {
  if (app && request.headers.get(NATIVE_HEADER) === "ios") return true;
  try { return practiceGateEnabled(); }
  catch { return true; }
}
