"use client";
import { useEffect, useState, type ReactNode } from "react";
import { nativeClient } from "../shared/contracts";
import { NativeTools } from "./NativeTools";
/** Native StoreKit replaces the entire web checkout surface, including direct URLs. */
export function NativePurchaseBoundary({ children }: { children: ReactNode }) {
  const [native, setNative] = useState<boolean | null>(null);
  useEffect(()=>setNative(nativeClient()), []);
  return native === null ? null : native ? <NativeTools membershipOnly /> : children;
}
