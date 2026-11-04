import type { ReactNode } from "react";
import { NativePurchaseBoundary } from "@/mobile/src/NativePurchaseBoundary";
export default function BillingLayout({children}:{children:ReactNode}) {
  return <NativePurchaseBoundary>{children}</NativePurchaseBoundary>;
}
