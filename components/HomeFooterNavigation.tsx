"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./HomeFooterNavigation.module.css";
export function HomeFooterNavigation({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (path === "/billing") return null;
  return <details className={styles.navigation}><summary>サイトマップ・運営情報</summary><div className="pt-6 text-left">{children}</div></details>;
}
