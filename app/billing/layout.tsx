import type { ReactNode } from "react";
import { NativePurchaseBoundary } from "@/mobile/src/NativePurchaseBoundary";
export default function BillingLayout({children}:{children:ReactNode}) {
  return <NativePurchaseBoundary><div className="mx-auto w-full max-w-2xl space-y-4 px-4 py-8">{children}</div></NativePurchaseBoundary>;
}
