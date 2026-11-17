import type { ReactNode } from "react";
import { NativePurchaseBoundary } from "@/mobile/src/NativePurchaseBoundary";
export default function BillingLayout({children}:{children:ReactNode}) {
  return <NativePurchaseBoundary><main className="mx-auto w-full max-w-2xl space-y-4 px-4 py-8">{children}</main></NativePurchaseBoundary>;
}
