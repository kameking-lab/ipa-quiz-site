import { AppStorePromoClient } from "./AppStorePromoClient";

/** フッターに1か所だけ置く公式バッジ。アプリ内ではクライアント側で非表示。 */
export function AppStorePromo({ className }: { className?: string }) {
  return <AppStorePromoClient className={className} />;
}
