import { appStoreLive } from "@/lib/app-store";
import { AppStorePromoClient, type AppStorePromoVariant } from "./AppStorePromoClient";

/**
 * 「App Storeでもどうぞ」の小さな案内。フラグ OFF のときはクライアント JS ごと出さない。
 * iOS アプリ内での非表示判定はクライアント側（AppStorePromoClient）で行う。
 */
export function AppStorePromo({ variant, className }: { variant: AppStorePromoVariant; className?: string }) {
  if (!appStoreLive()) return null;
  return <AppStorePromoClient variant={variant} className={className} />;
}
