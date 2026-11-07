"use client";
import { useEffect, useState, type ComponentType } from "react";
import { nativeClient } from "@/mobile/shared/contracts";
import { usePathname } from "next/navigation";
export function NativeAppHost() {
  const [Tools, setTools] = useState<ComponentType | null>(null);
  const pathname=usePathname();
  useEffect(() => {
    if (!nativeClient()) return;
    // Safe-area rules for the edge-to-edge iOS WebView (app/globals.css).
    document.documentElement.classList.add("native-app");
    void import("@/mobile/src/NativeTools").then(m=>setTools(()=>m.NativeTools)).catch(error=>console.error("[native] tools failed to load",error));
  }, []);
  return Tools && !pathname.startsWith("/billing") ? <Tools /> : null;
}
