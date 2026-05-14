# Analytics Readiness Report — 2026-05-14

タスクP1 用の調査レポート。投入先: main HEAD = 3183039。
本Dispatchではブランチ `investigate/analytics-readiness` を新規切らず、既存 worktree
`claude/optimistic-ardinghelli-d7dee6` 内の logs/ に出力する。

---

## 1. PostHog

- 依存: `posthog-js: ^1.372.3` (package.json)
- 初期化: `components/PostHogProvider.tsx` が `app/layout.tsx` で全ページラップ
- ヘルパ: `lib/posthog.ts` の `posthogCapture(name, props)` 経由で送信
- DNS prefetch: `https://us.i.posthog.com` が `app/layout.tsx` に追加済み
- CSP: `connect-src` / `script-src` で `us.i.posthog.com` / `us-assets.i.posthog.com` 許可済 (next.config.ts)

### Capture 済みイベント (5種類)

- `page_view` — `components/PostHogProvider.tsx:49` (path)
- `ai_query_sent` — `components/copilot/CopilotPanel.tsx:303`
- `question_answered` — `components/quiz/QuizPlayer.tsx:123` (exam, correct 等)
- `feedback_submitted` — `components/FeedbackGateModal.tsx:81`
- テスト用イベント — `app/test/posthog/PostHogTestClient.tsx`

### サーバー側集計 (HogQL)

- `lib/admin/metrics/posthog.ts` (`fetchMetrics`) が `/app/admin/metrics`, `/app/api/admin/metrics`,
  `/app/transparency/page.tsx` から呼ばれる
- `app/admin/retention/page.tsx` は `${POSTHOG_HOST}/api/projects/{id}/insights/trend/` を直接叩く

### 環境変数

- `NEXT_PUBLIC_POSTHOG_KEY` (キー名のみ — 値は記録しない)
- `NEXT_PUBLIC_POSTHOG_HOST` (デフォルト `https://us.i.posthog.com`)
- `POSTHOG_API_KEY` (サーバー側 personal API key)
- `POSTHOG_PROJECT_ID`
- `POSTHOG_HOST` (サーバー側、デフォルト `https://us.posthog.com`)

未設定時の挙動: クライアントは静かに no-op、サーバーは mock / demo 系列にフォールバック。

---

## 2. Google Search Console (GSC)

- 依存: **未組込** — `googleapis` なし
- API 接続コード: PR #194 で追加された `lib/stats/gsc.ts` が Node 標準 `crypto` で
  Service Account JWT を署名し OAuth2 → `searchAnalytics:query` を叩く実装
  (googleapis 等の追加依存なしを意図)
- 環境変数 (PR #194 提案): `GSC_SITE_URL`, `GSC_SERVICE_ACCOUNT_EMAIL`, `GSC_SERVICE_ACCOUNT_KEY`
- 現在 main では `/api/stats/gsc` ルートも `lib/stats/gsc.ts` も存在しない
- GSC verification meta は `claude/intelligent-morse-dba859` (PR #171) で env 経由追加済み

未設定時の挙動: graceful fallback として「Search Console 連携準備中」表示が PR #194 内に実装されている

---

## 3. Google Analytics 4 (GA4)

- 依存: **未組込** — `gtag` / `react-ga` / `next-ga` いずれもなし
- `app/layout.tsx` に `@vercel/analytics/next` の `<Analytics />` のみ
- GA4 は本Dispatch対象外、別タスクで判断

---

## 4. Vercel 環境変数キー一覧 (本Dispatch時点で参照しているもの)

値は伏せ、キー名のみを列挙:

- LLM: `GEMINI_API_KEY`, `OPENAI_API_KEY` (将来), `ANTHROPIC_API_KEY` (将来)
- PostHog: 上記参照
- GSC: 上記参照 (PR #194 で導入予定)
- Stripe (未使用): なし。Stripeはフェーズ4まで本実装しないこと
- Sentry: `o4511300167860224.ingest.us.sentry.io` (CSP 内、DSN は別途)
- Vercel Analytics: ビルド時自動注入のため env vars 不要

---

## 5. /stats /analytics /transparency 関連ファイル位置

- `/stats` — main には未存在。`next.config.ts` で `/stats` → `/transparency#metrics` に
  308 redirect。PR #194 で新規ページ作成中
- `/transparency` — `app/transparency/page.tsx` (Server Component、PostHog 取得 + DEMO_SERIES fallback)
- `/admin/metrics` — `app/admin/metrics/page.tsx` (社内向け詳細メトリクス)
- `/admin/retention` — `app/admin/retention/page.tsx`

---

## 6. 大型タスク (/stats) 投入に必要な情報まとめ

- PostHog: 既存 `lib/posthog.ts` の流儀と HogQL 互換、PR #194 の `lib/stats/posthog.ts` で問題なし
- GSC: 本Dispatchのコード変更のみで動かない (Service Account 発行が本人作業)
- 共通: ドメイン誤記 (.com / .jp) を整合させ、`next.config.ts` の旧 redirect を撤去する必要あり
- transparency 内の DEMO_SERIES / モック表記は撤去し /stats に誘導する方針

(本レポートはコード変更を伴わない調査のみ。実装は タスク大型 PR #194 で行う)
