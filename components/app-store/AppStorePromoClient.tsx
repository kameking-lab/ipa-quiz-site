"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { APP_STORE } from "@/lib/app-store";
import { nativeClient } from "@/mobile/shared/contracts";
import { cn } from "@/lib/utils";

export type AppStorePromoVariant = "card" | "footer";

const subscribe = () => () => {};
// サーバー描画とハイドレーション直後は「未判定 = 出さない」。iOS アプリ内で一瞬でも見えないようにする。
const getServerSnapshot = () => false;
const getBrowserSnapshot = () => !nativeClient();

export function AppStorePromoClient({ variant, className }: { variant: AppStorePromoVariant; className?: string }) {
  const browser = useSyncExternalStore(subscribe, getBrowserSnapshot, getServerSnapshot);
  if (!browser) return null;

  if (variant === "footer") {
    return (
      <p className={cn("flex items-center gap-2 text-[11px]", className)} data-testid="app-store-promo-footer">
        <Image src="/brand/chihuahua-icon-192.png" alt="" width={24} height={24} className="h-6 w-6 rounded-full" />
        <a href={APP_STORE.url} target="_blank" rel="noopener noreferrer" className="py-2 underline-offset-2 hover:text-foreground hover:underline">
          過去問AIはiPhoneアプリでも使えます — App Storeでダウンロード
        </a>
      </p>
    );
  }

  return (
    <a
      href={APP_STORE.url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="app-store-promo-card"
      className={cn(
        "mx-auto flex w-full max-w-md items-center gap-3 rounded-full border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Image src="/brand/chihuahua-icon-192.png" alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full" />
      <span className="min-w-0 flex-1 leading-snug">
        <span className="block font-semibold">iPhoneアプリでも使えます</span>
        <span className="block text-xs text-muted-foreground">App Storeでダウンロード</span>
      </span>
      <span aria-hidden="true" className="shrink-0 text-muted-foreground">›</span>
    </a>
  );
}
