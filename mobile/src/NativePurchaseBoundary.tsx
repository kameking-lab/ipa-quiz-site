"use client";
import { useEffect, useState, type ReactNode } from "react";
import { nativeClient } from "../shared/contracts";
import { NativeTools } from "./NativeTools";
import { usePathname } from "next/navigation";
import { NativeBillingTerms } from "./NativeBillingTerms";
/** Native StoreKit replaces the entire web checkout surface, including direct URLs. */
export function NativePurchaseBoundary({ children }: { children: ReactNode }) {
  const [native, setNative] = useState<boolean | null>(null);
  const pathname = usePathname();
  useEffect(()=>setNative(nativeClient()), []);
  return native === null ? null : native ? pathname === "/billing/terms" ? <NativeBillingTerms /> : <NativeTools membershipOnly /> : children;
}
