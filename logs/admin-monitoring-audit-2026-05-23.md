# /admin/launch-monitoring 健全性監査 — 2026-05-23

read-only audit。コード修正は本レポートでは行わない。

## 対象

- `app/admin/launch-monitoring/page.tsx` (SSR, force-dynamic, robots: noindex)
- `app/admin/launch-monitoring/LiveMonitoringData.tsx` (Client, polling 2min)
- `app/api/admin/launch-monitoring/route.ts` (in-memory cache 2min)
- `lib/admin/launch-monitoring/data.ts` (集約レイヤ)
- 依存: `lib/admin/funnel/posthog.ts`, `lib/stats/gsc.ts`, `lib/rate-limit/server.ts`

## サマリ (3行)

1. ダッシュボード本体は SSR + クライアントポーリング (2min) + サーバ in-memory cache (2min) で適切に構成され、4 系列 (PostHog / Upstash KV / GSC / Vercel Analytics) すべて未設定でもクラッシュせず "未設定 / 0" を返すフォールバック設計が確立している。
2. 外部 fetch のうち Vercel Analytics と Upstash KV は `AbortSignal.timeout` でタイムアウト保護があるが、PostHog Funnel (`lib/admin/funnel/posthog.ts`) と GSC (`lib/stats/gsc.ts`) は **明示的タイムアウトが無く**、外部側が応答しない場合は Next.js のデフォルト fetch 待ち時間まで待つことになる。
3. 環境変数 `envStatus()` の表示は `process.env` 直読みで `force-dynamic` ページ内で評価されるため、再デプロイなしの環境変数追加には追随できないが、Vercel 環境では再デプロイ前提のため実用上の問題はない。

## データソース別評価

### PostHog (Traffic24h)

- 関数: `fetchTraffic24h()` → `fetchFunnelData(1)`
- env: `POSTHOG_API_KEY`, `POSTHOG_PROJECT_ID`, `POSTHOG_HOST` (default us)
- フォールバック: `configured: false` → 全 KPI が 0 を返す、UI は "PostHog 未設定 (モック)" バッジ表示
- 取得 KPI: `$pageview` / `quiz_started` / `quiz_completed` / `ai_query_sent` / `blog_viewed`
- **懸念**: PostHog 側 HogQL クエリへの fetch にタイムアウト設定なし。`fetchFunnelData` が長時間ハングすると `/api/admin/launch-monitoring` 全体が引きずられる (他 3 ソースは Promise.all 並列だが一番遅いものに律速される)
- 改善案 (本タスクでは未実装): `AbortSignal.timeout(8000)` を `lib/admin/funnel/posthog.ts` の fetch に付与

### Upstash KV (ApiUsageSummary)

- 関数: `getApiUsageStats()`, `getApiCallsHourlySeries()`
- env: `KV_REST_API_URL`, `KV_REST_API_TOKEN`
- フォールバック: `enabled: false`, 全カウンタ 0、`hourlySeries` は 24 要素 0 埋め
- **タイムアウト**: `lib/rate-limit/server.ts` で `AbortSignal.timeout(KV_TIMEOUT_MS)` 設定済 ✓
- 取得 KPI: `totalLast1h` / `totalLast24h` / `costJpy24h` / endpoint 別内訳 / 24h hourly sparkline

### GSC (GscSummary)

- 関数: `fetchGsc30dTotals()` via `isGscConfigured()`
- env: `GSC_SITE_URL`, `GSC_OAUTH_CLIENT_ID`, `GSC_OAUTH_CLIENT_SECRET`, `GSC_OAUTH_REFRESH_TOKEN`
- フォールバック: `configured: false` で clicks/impressions = 0、UI は KPI に "未設定" 文字列
- **懸念**: GSC API 呼び出しに明示的タイムアウトが無い。Google 側の OAuth トークンリフレッシュ + クエリの 2 段階で時間がかかる場合あり

### Vercel Analytics (VercelAnalyticsSummary)

- 関数: `fetchVercelAnalytics()`
- env: `VERCEL_ACCESS_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID` (任意)
- フォールバック: `configured: false`, `pageviews24h: 0`
- **タイムアウト**: `AbortSignal.timeout(5000)` 設定済 ✓
- 取得 KPI: pageviews24h のみ。PostHog 未設定時の PV ソース切替に使用 (`LiveMonitoringData.tsx:174`)

## エラーハンドリング・タイムアウト まとめ

- すべての外部 fetch が `try/catch` で囲まれ、失敗時にデフォルト値を返す設計 (graceful degradation)
- `fetchLaunchMonitoringData()` は `Promise.all` で 4 系列を並列実行 → 1 つ遅いと全体律速
- Client 側 `LiveMonitoringData` は `res.ok` チェック + catch で "古いデータを残す" 設計、無限ローディングは発生しない
- API route 側に 2 分 in-memory cache あり → polling 攻撃に対しても LLM/外部 API 呼出は最大 30 req/h で頭打ち

## アラート判定 (`buildAlerts`)

- `costJpy24h >= 500` → warning
- `totalLast1h >= 200` → warning
- `quizConversionPct < 20` (PostHog 設定済時のみ) → info
- 3 系列すべて未設定 → info "観測基盤未設定"

判定閾値は `lib/admin/launch-monitoring/data.ts:191-221` にハードコード。
ローンチ後の実値に応じて再調整候補。

## アクセス制御

- ページに `robots: { index: false, follow: false }` 設定
- "Basic Auth 保護" のバッジ表示あり (実体は別途 middleware / Vercel Password Protection 想定)
- 本ファイル単独では認証強制ロジックなし → middleware.ts またはホスティング層に委任

## 結論

ダッシュボード本体・データ集約レイヤ・API ルートのいずれも**ローンチ運用に耐える品質**。
唯一の改善余地は PostHog / GSC fetch のタイムアウト追加 (各 5-8 秒) で、現状未実装の旨を本レポートに記録するに留める (本タスクは read-only 監査のため)。

次セッション以降の推奨アクション:
- `lib/admin/funnel/posthog.ts` の HogQL fetch に `AbortSignal.timeout(8000)` を付与
- `lib/stats/gsc.ts` の Google API fetch に同様の保護を追加
- 上記により、最悪ケースで `/admin/launch-monitoring` 応答が 8 秒+ で確定する
