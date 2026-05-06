# Stripe Restricted Key 分離手順書

`STRIPE_SECRET_KEY` には Stripe Standard secret (`sk_live_...`) ではなく、
最小権限の **Restricted Key** (`rk_live_...`) を使用する。
理由: 漏洩時の被害範囲を限定（Subscription/Customer 操作のみ許可、ログ消去や残高引き出しを阻止）。

## 1. Restricted Key 作成

1. <https://dashboard.stripe.com/apikeys> にログイン（本番モード）
2. `Create restricted key` をクリック
3. Name: `ipa-quiz-site-prod`
4. 以下の権限のみ `Write` に設定:

| Resource | Permission |
|---|---|
| Checkout Sessions | Write |
| Customers | Write |
| Subscriptions | Write |
| Prices | Read |
| Products | Read |
| Invoices | Read |
| Webhook Endpoints | None |

5. その他は全て `None`
6. 作成後表示される `rk_live_...` をコピー

## 2. Webhook Signing Secret

Webhook 受信用の Signing Secret は別途必要:

1. <https://dashboard.stripe.com/webhooks> → `Add endpoint`
2. Endpoint URL: `https://kakomon-ai.jp/api/webhooks/stripe`
3. Events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
4. 作成後 `Signing secret` (`whsec_...`) をコピー

## 3. Vercel 環境変数登録

| Key | Value | Environment |
|---|---|---|
| `STRIPE_SECRET_KEY` | `rk_live_...` | Production |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Production |
| `STRIPE_PRICE_ID_PREMIUM` | `price_...` (Premium 月額 ¥980) | Production |
| `STRIPE_PRICE_ID_TEAM` | `price_...` (Team 月額 ¥50,000) | Production |

Preview 環境向けにはテストモード鍵 (`rk_test_...`, `whsec_test_...`) を別途登録する。

## 4. 鍵ローテーション運用

- 半年ごと、または不審なアクセスを検知した際に新しい Restricted Key を発行
- 古い鍵は新鍵を Vercel に登録した直後に Stripe ダッシュボードで `Revoke`
- Revoke 後 5 分以内に Production の `/api/stripe/checkout` を curl で 401（未認証）または 200（Checkout URL 取得）が返ることを確認

## 5. 確認 curl（鍵設定後）

```bash
# 未認証 → 401
curl -sS --ssl-no-revoke -o - -w "\nHTTP %{http_code}\n" \
  -X POST -H 'Content-Type: application/json' -d '{"plan":"premium"}' \
  https://kakomon-ai.jp/api/stripe/checkout

# 署名なし Webhook → 400
curl -sS --ssl-no-revoke -o - -w "\nHTTP %{http_code}\n" \
  -X POST -H 'Content-Type: application/json' -d '{}' \
  https://kakomon-ai.jp/api/webhooks/stripe
```
