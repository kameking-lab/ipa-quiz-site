import "server-only";
import { billingConfig } from "./config";
import { monthlyConfig, monthlySelected } from "./subscription/config";

/** Read the existing realm without initializing a provider or opening a DB. */
export function billingTelemetryTestMode(): boolean {
  return (monthlySelected() ? monthlyConfig().mode : billingConfig().mode) !== "stripe-live";
}
