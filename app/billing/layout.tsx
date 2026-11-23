import type { ReactNode } from "react";
import { NativePurchaseBoundary } from "@/mobile/src/NativePurchaseBoundary";
export default function BillingLayout({children}:{children:ReactNode}) {
  return <NativePurchaseBoundary><main className="mx-auto w-full max-w-2xl space-y-6 px-4 pb-20 pt-8 sm:px-6 sm:pt-10 [&_a]:rounded-sm [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-ring">{children}</main></NativePurchaseBoundary>;
}
