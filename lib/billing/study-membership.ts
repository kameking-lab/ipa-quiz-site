import "server-only";
import { billingRuntime } from "./runtime";
import { monthlySelected } from "./subscription/config";
import { BillingError } from "./domain";

type StudyService = ReturnType<typeof billingRuntime>["service"]
  | ReturnType<typeof import("./subscription/runtime").monthlyRuntime>["service"];
type WebStatus = { service: StudyService; source: "web" | "recent-web" | "free" };
const verifiedUntil = new Map<string, number>();
const checking = new Map<string, Promise<WebStatus>>();

async function readWebStatus(service: StudyService, userId: string, key?: string): Promise<WebStatus> {
  try {
    const status = await service.status(userId);
    if (key) {
      verifiedUntil.delete(key);
      const now = Date.now();
      const until = Math.min(Date.parse(status.expiresAt ?? ""), now + 60_000);
      if (status.entitled && until > now) {
        if (verifiedUntil.size >= 1024) verifiedUntil.delete(verifiedUntil.keys().next().value!);
        verifiedUntil.set(key, until);
      }
    }
    return { service, source: status.entitled ? "web" : "free" };
  } catch (error) {
    // A billing policy or identity conflict can also be reported as 503.
    if (key && error instanceof BillingError) verifiedUntil.delete(key);
    if (key && (verifiedUntil.get(key) ?? 0) > Date.now()) return { service, source: "recent-web" };
    throw error;
  }
}

async function webStatus(userId: string, independentStores: boolean) {
  const monthly = monthlySelected();
  const runtime = monthly ? (await import("./subscription/runtime")).monthlyRuntime() : billingRuntime();
  // A study-only proof is bound to the configured store and authenticated account. A
  // normal lookup always wins. Coalescing prevents an older read undoing a revocation.
  if (!independentStores || !runtime.config?.sourceInstance) return readWebStatus(runtime.service, userId);
  const key = JSON.stringify([monthly, runtime.config.mode, runtime.config.sourceInstance, userId]);
  const pending = checking.get(key);
  if (pending) return pending;
  const lookup = readWebStatus(runtime.service, userId, key).finally(() => checking.delete(key));
  checking.set(key, lookup);
  return lookup;
}

async function iosStatus(userId: string, independentStores: boolean) {
  const { revenueCatAccess } = await import("@/mobile/server/revenuecat");
  return await revenueCatAccess(userId, false, independentStores) ? { source: "app-store" } as const : null;
}

/** Either store can prove paid access. Only two negative checks establish free access. */
export async function studyMembership(userId: string, independentStores: boolean) {
  const web = webStatus(userId, independentStores);
  if (!independentStores) {
    const status = await web;
    return status.source === "free" ? await iosStatus(userId, false) ?? status : status;
  }

  // Fast Web members do not need a RevenueCat lookup. If Web stalls, either
  // store may still prove membership without waiting for the slower one.
  const webResult = web.catch((error: unknown) => ({ error }));
  let timer: ReturnType<typeof setTimeout> | undefined;
  const headStart = new Promise<null>(resolve => { timer = setTimeout(() => resolve(null), 300); });
  const first = await Promise.race([webResult, headStart]);
  clearTimeout(timer);
  if (first && "source" in first && first.source !== "free") return first;
  const iosResult = iosStatus(userId, true).catch((error: unknown) => ({ error }));
  const firstStore = await Promise.race([webResult, iosResult]);
  if (firstStore && "source" in firstStore && firstStore.source !== "free") return firstStore;
  const [webFinal, iosFinal] = await Promise.all([webResult, iosResult]);
  if ("source" in webFinal && webFinal.source !== "free") return webFinal;
  if (iosFinal && "source" in iosFinal) return iosFinal;
  if ("error" in webFinal) throw webFinal.error;
  if (iosFinal && "error" in iosFinal) throw iosFinal.error;
  return webFinal;
}
