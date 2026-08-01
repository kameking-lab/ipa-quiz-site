// 日次ヘルスチェックと E2E スモークが共有する「あるべきステータス」の定義。
//
// 恒久削除したルートは middleware の GONE_PATHS が 410 Gone を返す（クロール
// 資産回復のため 404 より強いシグナル）。一方 /tokutei・/checkout は後継も
// 痕跡も無い純・意図的 404 で、両者は別物として検証する。
//
// この 2 つを一括で「404 のはず」と扱うと、410 を返す側が毎回不一致になり、
// 日次ヘルスチェックが常時失敗する（＝本物の障害と区別がつかなくなる）。
// 定義をここに一本化して、監視側と実装側がズレないようにする。

/** 必ず 200 を返すルート。 */
export const REQUIRED_200_ROUTES = [
  "/",
  "/about",
  "/faq",
  "/privacy",
  "/terms",
  "/operator",
  "/settings",
  "/modes/year",
  "/modes/topic",
  "/referral",
  "/transparency",
  "/review",
  "/recommended-books",
  "/robots.txt",
  "/sitemap.xml",
] as const;

export const EXAM_CODES = [
  "ip", "sg", "fe", "ap", "sc", "nw", "db",
  "es", "st", "sa", "pm", "sm", "au",
] as const;

/** 恒久削除ルート。middleware が 410 Gone を返す。 */
export const GONE_410_ROUTES = ["/pricing", "/commerce"] as const;

/** 後継の無い純・意図的 404。 */
export const INTENTIONAL_404_ROUTES = ["/tokutei", "/checkout"] as const;

/** 200 を期待する全ルート（固定ページ + 試験区分 + 書籍ページ）。 */
export const ALL_REQUIRED_200_ROUTES: string[] = [
  ...REQUIRED_200_ROUTES,
  ...EXAM_CODES.map((c) => `/${c}`),
  ...EXAM_CODES.map((c) => `/recommended-books/${c}`),
];

export type ExpectedStatus = 200 | 404 | 410;

/** 監視対象ルートと、そのルートが返すべきステータスの一覧。 */
export function expectedRouteStatuses(): Array<{ path: string; expected: ExpectedStatus }> {
  return [
    ...ALL_REQUIRED_200_ROUTES.map((path) => ({ path, expected: 200 as const })),
    ...GONE_410_ROUTES.map((path) => ({ path, expected: 410 as const })),
    ...INTENTIONAL_404_ROUTES.map((path) => ({ path, expected: 404 as const })),
  ];
}
