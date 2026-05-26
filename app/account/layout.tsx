import type { Metadata } from "next";
import type { ReactNode } from "react";

// Every /account/* route is per-user and must never be indexed. robots.txt no
// longer Disallows /account/ (it contradicted the header's "学習進捗" link, see
// review C-3), so noindex here is the authoritative signal and covers child
// routes that don't declare their own metadata (badges, notifications, tutor,
// weakness, api-keys).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
