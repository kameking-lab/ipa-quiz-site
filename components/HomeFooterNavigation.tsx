"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
export function HomeFooterNavigation({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (path !== "/") return children;
  return <details className="text-center"><summary className="cursor-pointer py-2 text-xs">サイトマップ・運営情報</summary><div className="pt-6 text-left">{children}</div></details>;
}
