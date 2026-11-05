"use client";
import { useEffect, useState, type ComponentType } from "react";
import { nativeClient } from "@/mobile/shared/contracts";
import { usePathname } from "next/navigation";
export function NativeAppHost() {
  const [Tools, setTools] = useState<ComponentType | null>(null);
  const pathname=usePathname();
  useEffect(() => { if (nativeClient()) void import("@/mobile/src/NativeTools").then(m=>setTools(()=>m.NativeTools)); }, []);
  return Tools && !pathname.startsWith("/billing") ? <Tools /> : null;
}
