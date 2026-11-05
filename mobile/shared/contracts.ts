export interface MobileEntitlement {
  userId: string | null;
  appUserId: string | null;
  entitled: boolean;
  source: "web" | "app-store" | "free";
  expiresAt: string | null;
  checkedAt: string;
  lease: string | null;
}
export interface CatalogEntry {
  code: string; name: string; count: number;
  years: number[]; categories: string[]; sessions: string[];
  bytes: number; revision: string;
  paper?: import("@/lib/exam-library-model").ExamCatalogEntry;
  material?: boolean;
  qualification?: string;
  href?: string;
}
export interface MobileConfiguration {
  sdkKey: string; productId: string; offeringId: string;
  entitlement: string; expectedPriceYen: number; leasePublicKey: string;
}
export const NATIVE_HEADER = "X-Kakomon-Native";
export function nativeClient(): boolean {
  return typeof window !== "undefined" && !!(window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.();
}
