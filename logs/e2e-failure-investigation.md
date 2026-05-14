# E2E ワークフロー失敗 調査ログ

Investigation date: 2026-05-14
Investigator: Claude (dispatch session busy-hugle-56c7a3)

## 失敗ラン (PR #194 と直近4本)

PR #194 (feat/public-stats-dashboard) に紐づくランは4本ではなく、リトライ含めて以下:

| run id      | created_at           | trigger      | branch                       | result  | duration |
|-------------|----------------------|--------------|------------------------------|---------|----------|
| 25855576185 | 2026-05-14T10:39:44Z | push to main | main (after #194 merge)      | failure | 2m55s    |
| 25855557093 | 2026-05-14T10:39:15Z | pull_request | feat/public-stats-dashboard  | failure | 2m56s    |
| 25853643080 | 2026-05-14T09:52:52Z | pull_request | feat/public-stats-dashboard  | failure | 5m1s     |
| 25853635638 | 2026-05-14T09:52:41Z | pull_request | feat/public-stats-dashboard  | failure | 2m59s    |

## 失敗の発生時期

E2E の最初の失敗: **2026-05-01T09:11:47Z** commit 31588724
タイトル: "refactor: brand cleanup - remove enterprise/stripe/i18n, unify volunteer branding"

直前の green run: **2026-04-26T13:31:01Z** commit 2db0b700
タイトル: "feat: 高度試験コンテンツ可視化 + 法人信頼性強化"

→ **失敗は PR #194 / /stats ダッシュボード起因ではない**。2026-05-01 の PR #100 (brand cleanup) でルートを削除して以来、E2E は **連続100本以上 failure** が続いている既存問題。

## 失敗ステップ

すべての失敗ランで `Run E2E` (`pnpm e2e` = `playwright test`) ステップが失敗。
typecheck / build / playwright install は green。

## 失敗テストケース (run 25855576185 = 直近)

### 1. tests/e2e/admin-auth.spec.ts:22 — `/admin/team with valid credentials returns 200`

```
Expected: 200
Received: 404
```

理由: `/admin/team` ページは PR #100 で削除済み。Basic Auth ミドルウェアは
未認証時 401 を返すため tests 1〜3 はパス(該当ルート存在を確認しないため)。
有効認証時は実ページに到達→ Next.js は 404 を返す。

### 2. tests/e2e/stripe-checkout.spec.ts:26 — `POST /api/stripe/checkout returns 404 with paid_mode_disabled`

```
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
  at await res.json()
```

理由: `app/api/stripe/checkout/route.ts` は PR #100 で削除済み。
ルート不在のため Next.js のデフォルト 404 HTML が返り、`res.json()` 失敗。

### 3. tests/e2e/stripe-webhook.spec.ts:4 — `POST /api/webhooks/stripe missing stripe-signature returns 400`

```
Expected: 400
Received: 404
```

理由: `app/api/webhooks/stripe/route.ts` は PR #100 で削除済み。

### 4. tests/e2e/stripe-webhook.spec.ts:14 — `POST /api/webhooks/stripe invalid signature returns 400`

```
Expected: [400, 503]
Received: 404
```

理由: 同上。

## 推定原因 (仮説)

### (a) PR #100 brand cleanup でテスト未削除 — **確度 95%**

PR #100 (2026-05-01 merged) は以下のルートを意図的に 404 化したが、対応するテストを更新しなかった:

- `/admin/team` (削除)
- `/api/stripe/checkout` (削除)
- `/api/stripe/portal` (削除)
- `/api/webhooks/stripe` (削除)
- `/api/contact/enterprise` (削除)
- `/contact/enterprise` (削除)

PR #100 のコミットメッセージに「削除（404 化）」セクションがあり、明示的に
これらのルートを削除している。一方、`tests/e2e/admin-auth.spec.ts` /
`stripe-checkout.spec.ts` / `stripe-webhook.spec.ts` は同じ PR の差分に
含まれていないか、含まれても更新が不完全だった可能性が高い。

**根拠**:
- 削除コミット日時 2026-05-01T09:11Z と最初の E2E 失敗 2026-05-01T09:11:47Z が一致
- 失敗テストが参照している URL がすべて PR #100 のコミットメッセージ「削除（404 化）」
  セクションに列挙されている
- 失敗の Expected/Received パターンが「削除ルートに対する 404 応答」と整合

### (b) Playwright 設定の変更 — 確度 5%

playwright.config.ts に baseURL / timeout / retries の変更があった可能性。
直接の証拠なし。tests/e2e/canonical.spec.ts, smoke-routes.spec.ts などは
パスしているため、config レベルでの障害ではない。

### (c) 環境変数の不足 — 確度 0%

ADMIN_BASIC_USER / ADMIN_BASIC_PASS は workflow で設定済み。Stripe 関連の
ENV はテストでスキップされる前提(PAID_MODE=false の `test.skip`)なので
不足の影響は無い。

## PR #194 (/stats) との関係

PR #194 は **無関係**。/stats 関連のテストは追加されておらず、smoke-routes の
ルート総数(45)も変化していない (45 = REQUIRED_200×15 + EXAM×13 + BOOKS×13 + 404×4)。
スモークテストは PR #194 後も green。

## 結論

E2E 失敗の根本原因は **PR #100 (2026-05-01) でのテスト負債**:
削除されたルート (`/admin/team`, `/api/stripe/*`, `/api/webhooks/stripe`)
に対応するテストが残ったまま放置されていた。100 本以上の連続失敗にも関わらず
誰も対応せず、PR #194 の作業まで気づかれなかった。

## 修正方針

1. `tests/e2e/admin-auth.spec.ts`: `/admin/team` テストを削除、有効認証時の 200
   検証は実在する `/admin/stats` に切り替え。
2. `tests/e2e/stripe-checkout.spec.ts`: 削除（ルート不在）。
   または smoke-routes.spec.ts の INTENTIONAL_404_ROUTES に追加して 404 のみ検証。
3. `tests/e2e/stripe-webhook.spec.ts`: 削除（ルート不在）。
4. `tests/e2e/contact-enterprise.spec.ts`: 現状維持
   (educational モードで `/contact/enterprise` が 404 を返すテストはパス済)。
