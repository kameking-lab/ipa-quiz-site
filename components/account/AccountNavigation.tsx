"use client";

import { createContext, useContext, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import { useSyncIdentity } from "@/lib/sync/use-sync-identity";

type AccountStatus = "loading" | "authenticated" | "unauthenticated";
const AccountContext = createContext<AccountStatus | null>(null);

function identityStatus(identity: ReturnType<typeof useSyncIdentity>): AccountStatus {
  if (identity.checking || identity.unavailable) return "loading";
  return identity.account ? "authenticated" : "unauthenticated";
}

export function AccountNavigationProvider({ children }: { children: ReactNode }) {
  const identity = useSyncIdentity();
  return <AccountContext.Provider value={identityStatus(identity)}>{children}</AccountContext.Provider>;
}

/** The native/offline players can also render outside the site's layout. */
export function useAccountStatus(enabled = true): AccountStatus {
  const inherited = useContext(AccountContext);
  const identity = useSyncIdentity(inherited === null && enabled);
  return inherited ?? identityStatus(identity);
}

export function SignedOutOnly({ children }: { children: ReactNode }) {
  return useAccountStatus() === "unauthenticated" ? children : null;
}

export function AccountNavigationLink({ settings = false, ...props }: Omit<ComponentProps<typeof Link>, "href" | "children"> & { settings?: boolean }) {
  const status = useAccountStatus();
  if (status === "loading") return null;
  const signedIn = status === "authenticated";
  return (
    <Link {...props} href={signedIn ? "/account" : "/auth/signin?callbackUrl=/account"} prefetch={false}>
      {signedIn ? settings ? "アカウント（ログアウト・削除）" : "アカウント" : "ログイン"}
    </Link>
  );
}
