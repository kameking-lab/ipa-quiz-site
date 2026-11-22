import "server-only";
import { billingRuntime } from "./runtime";
import { monthlySelected } from "./subscription/config";

async function webStatus(userId: string) {
  const service = monthlySelected()
    ? (await import("./subscription/runtime")).monthlyRuntime().service
    : billingRuntime().service;
  return { service, entitled: (await service.status(userId)).entitled };
}

/** Either store can prove paid access. Only two negative checks establish free access. */
export async function studyMembership(userId: string, independentStores: boolean) {
  const web = await webStatus(userId).catch((error: unknown) => ({ error }));
  if ("error" in web && !independentStores) throw web.error;
  if ("service" in web && web.entitled) return { source: "web", service: web.service } as const;
  const { revenueCatAccess } = await import("@/mobile/server/revenuecat");
  if (await revenueCatAccess(userId, false, independentStores)) return { source: "app-store" } as const;
  if ("error" in web) throw web.error;
  return { source: "free", service: web.service } as const;
}
