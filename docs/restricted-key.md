# Stripe Restricted Key 作成手順書

本番の `STRIPE_SECRET_KEY` には Standard secret (`sk_live_...`) ではなく、
最小権限の **Restricted Key** (`rk_live_...`) を使用する。

理由: 漏洩時の被害を Subscription/Customer 操作のみに限定し、ログ削除や残高引き出しを阻止できる。

> 既に `docs/stripe-keys-restricted.md` がある場合はそちらが一次資料。本書は同内容を独立した手順書として再掲する（リファレンス用）。

---

## 0. 前提

- Stripe アカウントは作成済み（Premium プランの Price も登録済み）
- Live モードに切り替え済み（Dashboard 右上のトグルが `Live`）
- Webhook Endpoint も Live 用に作成済み（`https://ipa-quiz-site.vercel.app/api/webhooks/stripe`）

未作成の場合は先に `docs/AUTH_AND_BILLING_SETUP.md` の Stripe 章を完了させること。

## 1. Restricted Key 作成

1. <https://dashboard.stripe.com/apikeys> にログイン（**Live モード**）
2. ページ下部の `Restricted keys` セクション → **`+ Create restricted key`**
3. **Name**: `ipa-quiz-site-prod`
4. 以下の権限のみ設定（その他は **None**）:

   | Resource | Permission |
   |---|---|
   | Checkout Sessions | **Write** |
   | Customers | **Write** |
   | Subscriptions | **Write** |
   | Billing Portal Sessions | **Write** |
   | Prices | **Read** |
   | Products | **Read** |
   | Invoices | **Read** |
   | Webhook Endpoints | **None** |
   | Connected Accounts | **None** |
   | API keys | **None** |
   | Events | **None** |

5. `Create key` クリック
6. 表示される `rk_live_...` をすぐコピー（再表示不可、紛失したら作り直し）

## 2. Webhook Signing Secret の取得

Restricted Key と Webhook Signing Secret は **別物**。Webhook 用は別途必要。

1. <https://dashboard.stripe.com/webhooks> （Live モード）
2. 既存の `https://ipa-quiz-site.vercel.app/api/webhooks/stripe` をクリック
3. `Signing secret` の `Click to reveal` → `whsec_...` をコピー

## 3. Price ID の取得

Premium プランの 2 種（月額・年額）の Price ID:

1. <https://dashboard.stripe.com/products>（Live モード）
2. `過去問AI Premium` をクリック
3. `Pricing` セクションに月額 / 年額 2 つ表示される。それぞれの `price_...` をコピー

Team プランも同様（公開後に必要）。

## 4. Vercel 環境変数登録

Vercel Project → `Settings` → `Environment Variables` → `Production`:

| Key | Value | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | `rk_live_...` | **必ず Restricted Key**（Standard `sk_live_` を使わない） |
| `STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Standard publishable は権限が低いのでそのまま使う |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | 手順 2 で取得 |
| `STRIPE_PREMIUM_MONTHLY_PRICE_ID` | `price_...` | Premium 月額 |
| `STRIPE_PREMIUM_YEARLY_PRICE_ID` | `price_...` | Premium 年額 |
| `STRIPE_TEAM_MONTHLY_PRICE_ID` | `price_...` | Team 月額（公開時） |
| `STRIPE_TEAM_YEARLY_PRICE_ID` | `price_...` | Team 年額（公開時） |

設定後 **Redeploy** が必要（既存ビルドには反映されない）:
- Vercel → Deployments → 最新 → `...` → `Redeploy`

## 5. 動作確認

```bash
# (a) 未認証は 401（認証チェックが先に走る）
curl -sS --ssl-no-revoke -X POST -H 'Content-Type: application/json' \
  -d '{"plan":"premium_monthly"}' \
  https://ipa-quiz-site.vercel.app/api/stripe/checkout
# → 401 {"error":"unauthorized"}

# (b) Webhook（署名なし）は 400
curl -sS --ssl-no-revoke -X POST -H 'Content-Type: application/json' \
  -d '{}' \
  https://ipa-quiz-site.vercel.app/api/webhooks/stripe
# → 400 {"error":"missing_signature"}
```

両方が期待通りに返れば設定 OK。

## 6. Stripe CLI で End-to-End テスト（任意）

ローカルから本番 Webhook へのテストは禁止（実顧客の Webhook 遅延を起こすため）。
代わりに Vercel Preview デプロイでテスト:

```bash
# Stripe CLI をインストール
# https://docs.stripe.com/stripe-cli

stripe login
stripe listen --forward-to https://<preview-deploy>.vercel.app/api/webhooks/stripe
# 別タブで:
stripe trigger checkout.session.completed
```

Preview の Vercel ログで Webhook 処理ログ（`webhook_received` など）が出れば OK。

## 7. ローテーション

Restricted Key は 90 日ごとに Rotate を推奨:

1. 新しい Key を作成（手順 1）
2. Vercel に新 Key を登録 → Redeploy
3. 動作確認（手順 5）
4. Stripe Dashboard で旧 Key を **Disable**

Webhook Signing Secret は Endpoint を新規作成して切り替える形になる。
両 Endpoint を同時に有効化 → Vercel 切替 → 旧 Endpoint Disable の順で 0 ダウンタイムで切り替わる。

## 8. インシデント対応（Key 漏洩時）

1. Stripe Dashboard → 該当 Key の `Roll key`（即座に新 Key 発行 + 旧 Key 失効）
2. Vercel に新 Key 登録 → Redeploy
3. 動作確認
4. ログ調査:
   - Stripe Dashboard → `Developers` → `Logs` で該当 Key 経由の API 呼び出しを全件確認
   - 不正な Subscription / Refund がないか確認
5. インシデントレポートを `kakomon.ai.jp@gmail.com` に記録（PR 化）

## 9. トラブルシューティング

| 症状 | 原因 / 対処 |
|---|---|
| `Invalid API Key provided` | (1) `rk_live_` が Vercel に正しく入っているか (2) Test Mode の `rk_test_` を入れていないか確認 |
| Webhook で 400 が返らず 503 | `STRIPE_WEBHOOK_SECRET` 未設定。手順 2 を完了させる |
| Checkout で `permission_denied` | Restricted Key の権限不足。手順 1 の権限表どおりに設定し直す |
| Webhook が届くが永続化されない | DB 未設定（`DATABASE_URL` 未登録）。意図通りなら問題なし。永続化したいなら `docs/neon-setup.md` 参照 |
