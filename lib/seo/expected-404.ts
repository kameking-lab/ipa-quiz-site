/**
 * 意図的に 404 を返すルートの一覧。
 *
 * IPA Quiz は教育貢献プロジェクトとして運営しており、料金プランや
 * 特定商取引法ベースの商業ページを公開しないという方針に基づき、
 * 以下のルートはあえて 404 を返しています。
 *
 * スモークテスト・404 監視 cron では本リストに含まれるパスを除外します。
 */
export const EXPECTED_404_ROUTES: ReadonlyArray<{ path: string; reason: string }> = [
  {
    path: "/pricing",
    reason: "教育貢献プロジェクト方針により料金プランは非公開（/about の料金についてセクション参照）",
  },
  {
    path: "/commerce",
    reason: "特定商取引法ページは商業運営でないため非公開",
  },
  {
    path: "/tokutei",
    reason: "特定商取引法ページのエイリアスも非公開",
  },
  {
    path: "/checkout",
    reason: "決済導線は提供していない",
  },
];

export function isExpected404(path: string): boolean {
  return EXPECTED_404_ROUTES.some((r) => r.path === path);
}
