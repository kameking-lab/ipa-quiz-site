# Round 2 Loop 9 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 開始コミット: 9ad793d（Round 2 Loop 8 push 後）

## Phase 1: 過去ループ修正の再検証
- Round 2 Loop 7 (AI API err.message 漏洩) prod 反映確認
- Round 2 Loop 8 (skip-link focusable 化) push 済、Vercel デプロイ進行中
- typecheck / build 直近全成功

## Phase 2: Critical（即修正）
新規 Critical 該当なし。
- next.config.ts CSP 配信済（HSTS/X-Frame/Permissions-Policy/COOP/CORP/CSP すべて）
- /api/webhooks/stripe 署名検証 + Sentry 連携済
- ChatShareView は react-markdown v9 デフォルト sanitize で安全
- ServiceWorker (`public/sw.js`) は cache-first/network-first を pathname で分岐し、/api/* を skip — 設計通り

## Phase 3: Major
新規 Major 該当なし（M2-1〜M2-22 引き続き保留）

## Phase 4: Minor（即修正）2件

### N9-1. PremiumCheckoutButton が API 内部エラーコードをそのまま画面表示
**実測**:
- `app/pricing/PremiumCheckoutButton.tsx:27-30`（旧コード）
  ```ts
  if (!res.ok) {
    const detail = (await res.json().catch(() => ({}))) as { error?: string };
    setError(detail.error ?? `エラー (${res.status})`);
    setLoading(false);
    return;
  }
  ```
- `/api/stripe/checkout` の error フィールドは内部識別子:
  - `stripe_not_configured`, `db_not_configured`, `price_not_configured`,
    `invalid_plan`, `user_not_found`, `already_on_plan`, `checkout_url_missing`
- これらが翻訳されずに直接画面に出る → ユーザーは英語識別子を見せられて困惑

**影響**:
- Premium 申込フローで決済前に英字の内部エラーが出ると、ユーザーは「壊れているのでは」と離脱
- CVR 低下（特に β→Premium 移行期に致命）
- 内部実装（DB/Stripe の構成）が露見し、ソーシャルエンジニアリング材料を提供

**修正**:
- `ERROR_MESSAGES` 辞書を導入し、サーバー側の error コードを日本語ユーザーメッセージへ写像
- `friendlyError(code, status)` ヘルパで未知コードや 500 系を汎用文言へフォールバック
- 既存の 401 → /auth/signin リダイレクト動線は維持

**検証**:
- `pnpm typecheck` ✅
- `pnpm build` ✅
- 全 7 種の error コードを Japanese メッセージに対応付け
- 未知コード/5xx はそれぞれ別の汎用文言

### N9-2. robots.txt に /account/ と /chat/share が disallow 未指定
**実測**:
- `app/robots.ts:10` 旧:
  ```ts
  disallow: ["/api/", "/admin/", "/auth/"]
  ```
- `/account/*`: ログイン必須ユーザーページ。サインイン誘導 → 未ログイン時に /auth/signin リダイレクト。クロール無駄遣い + 検索結果に出る可能性
- `/chat/share`: ユーザーが任意に作る共有 URL（`?d=` で payload encode）。`metadata.robots = { index: false, follow: false }` は設定されているが、Google は disallow されていないとクロールしてしまう

**影響**:
- 検索エンジンのクロール予算を /account/ のリダイレクトに消耗
- 共有チャット URL が `site:` 検索で出ると、ユーザーが「自分の会話が公開されているのでは」と誤解
- 個人情報的内容の Index リスク（payload は base64 だが検索エンジンが復号 / fetch 解析する可能性は低いが、保険）

**修正**:
- `disallow` 配列に `/account/` と `/chat/share` を追加
- `app/robots.ts` のみ変更、他は無影響

**検証**:
- `pnpm build` ✅
- prod デプロイ後 `/robots.txt` の `Disallow:` 行に `/account/` と `/chat/share` 出現を期待

## Phase 5: ビジネス・SEO・差別化評価
- N9-1: Premium 申込画面の信頼性向上 → CVR 改善
- N9-2: 検索エンジンへのクロール優先度を商業/学習導線に集中させ、SEO 効率を改善
- どちらも β→Premium 移行期に効く

## Phase 6: NPS 予測
- Round 2 Loop 8 比 +1 → **+23（baseline）**
- 理由: Premium 申込時の英文エラーが消えるのは離脱率低減に寄与

## Phase 7: ローンチ可否判定
- **Soft Launch / Hard Launch ともに可**
- Loop 9 (Round 2): Critical 0 / Minor 2 → 早期完了条件カウンタは未達

## 本ループで対応する Issue
- N9-1: PremiumCheckoutButton で内部 error コードを日本語 UI メッセージへ写像
- N9-2: robots.ts disallow に /account/ と /chat/share を追加
