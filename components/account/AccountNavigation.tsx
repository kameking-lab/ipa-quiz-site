"use client";

import { createContext, useContext, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import { useSyncIdentity } from "@/lib/sync/use-sync-identity";

const AccountContext = createContext(false);

export function AccountNavigationProvider({ children }: { children: ReactNode }) {
  const { account } = useSyncIdentity();
  return <AccountContext.Provider value={!!account}>{children}</AccountContext.Provider>;
}

export function AccountNavigationLink({ settings = false, ...props }: Omit<ComponentProps<typeof Link>, "href" | "children"> & { settings?: boolean }) {
  const signedIn = useContext(AccountContext);
  return (
    <Link {...props} href={signedIn ? "/account" : "/auth/signin?callbackUrl=/account"} prefetch={false}>
      {signedIn ? settings ? "アカウント（ログアウト・削除）" : "アカウント" : "ログイン"}
    </Link>
  );
}
