"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { APP_STORE } from "@/lib/app-store";
import { nativeClient } from "@/mobile/shared/contracts";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};
// 判定前は非表示にして、アプリ内での初期表示も防ぐ。
const getServerSnapshot = () => false;
const getBrowserSnapshot = () => !nativeClient();

export function AppStorePromoClient({ className }: { className?: string }) {
  const browser = useSyncExternalStore(subscribe, getBrowserSnapshot, getServerSnapshot);
  if (!browser) return null;

  return (
    <div className={cn("native-app-hidden", className)}>
      <a
        href={APP_STORE.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex p-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Image
          src="/brand/download-on-the-app-store-ja.svg"
          alt="過去問AIをApp Storeでダウンロード"
          width={109}
          height={40}
          className="h-10 w-auto"
          unoptimized
        />
      </a>
    </div>
  );
}
