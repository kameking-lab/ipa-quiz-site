import { nativeClient, NATIVE_HEADER } from "@/mobile/shared/contracts";
import type { ClientConversion } from "./conversion-contract";

/** Each call is an occurrence. Daily uniqueness is enforced on the server only for guests. */
export function sendConversion(event: ClientConversion): void {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({ event });
    // Native requests need the platform header; a beacon cannot attach it.
    if (!nativeClient() && typeof navigator.sendBeacon === "function") {
      try { if (navigator.sendBeacon("/api/funnel/conversion", new Blob([body], { type: "text/plain;charset=UTF-8" }))) return; } catch { /* fetch fallback */ }
    }
    void fetch("/api/funnel/conversion", { method: "POST", body, keepalive: true, credentials: "same-origin", headers: { "Content-Type": "application/json", ...(nativeClient() ? { [NATIVE_HEADER]: "ios" } : {}) } }).catch(() => {});
  } catch { /* Measurement never affects navigation or answers. */ }
}
