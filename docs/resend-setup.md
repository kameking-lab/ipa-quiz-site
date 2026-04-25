# Resend セットアップ手順書

法人問い合わせ通知 (`/api/contact/enterprise`) の通知メール送信に Resend を利用する。

`RESEND_API_KEY` が未設定でもエンドポイントは 200 を返し、`console.log` にフォールバックする。本番運用では設定推奨。

---

## 0. 前提

- 通知先メールアドレス: `kakomon.ai.jp@gmail.com`（`ENTERPRISE_CONTACT_TO` で上書き可能）
- 送信元（From）: `no-reply@ipa-quiz-site.vercel.app`（`ENTERPRISE_CONTACT_FROM` で上書き可能）
- 月 100 通までは Resend 無料枠で十分カバー可能

## 1. アカウント作成

1. <https://resend.com/signup> にアクセス
2. GitHub または Google でサインアップ（メール+パスワードでも可）
3. メール認証を完了する
4. ログイン後、左下のチームアイコンから Workspace 名を `ipa-quiz` に設定（任意）

## 2. ドメイン追加（推奨）

検証済みドメインから送ることでスパム判定を避けられる。Vercel ドメインのままでも動くが、独自ドメイン化したら必ず設定する。

### Vercel ドメイン (`ipa-quiz-site.vercel.app`) を使い続ける場合

ドメイン検証はスキップしてよい。Resend は `onboarding@resend.dev` をデフォルト From として使えるため、

```
ENTERPRISE_CONTACT_FROM=onboarding@resend.dev
```

を Vercel に設定する。**ただしユーザー視点の信頼性が下がる**ので、独自ドメイン取得後に切り替えるのを推奨。

### 独自ドメインを取得済みの場合

1. Resend Dashboard 左メニューの `Domains` → `Add Domain`
2. ドメイン入力（例: `ipa-quiz.jp`）
3. リージョン: `Tokyo (ap-northeast-1)`
4. 表示される DNS レコード（TXT × 1, MX × 1, CNAME × 1）を DNS プロバイダ（Vercel DNS / Cloudflare 等）に追加
5. Resend 側で `Verify` ボタン → 全部緑になるまで待つ（通常 5 分以内）

## 3. API Key 作成

1. 左メニュー `API Keys` → `Create API Key`
2. Name: `ipa-quiz-site-prod`
3. Permission: **Sending access**（最小権限）
4. Domain: `Full Access`（複数ドメイン使う予定がなければそのまま）
5. `Add` クリック後、表示される `re_...` で始まるキーを **すぐコピー**（再表示不可）

## 4. Vercel 環境変数登録

Vercel Project → `Settings` → `Environment Variables`:

| Key | Value | Environments |
|---|---|---|
| `RESEND_API_KEY` | `re_...` の Key | Production |
| `ENTERPRISE_CONTACT_TO` | `kakomon.ai.jp@gmail.com` | Production |
| `ENTERPRISE_CONTACT_FROM` | `no-reply@ipa-quiz.jp`（独自ドメイン）or `onboarding@resend.dev` | Production |

Preview 環境にも同じ Key を入れておくと、PR 動作確認時にもメール送信できる。

## 5. 動作確認

ローカルから本番 API へ POST:

```bash
curl -sS --ssl-no-revoke -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"テスト","email":"test@example.com","company":"テスト株式会社","message":"動作確認テスト"}' \
  https://ipa-quiz-site.vercel.app/api/contact/enterprise
```

期待: `200 {"ok":true}`

5 分以内に `kakomon.ai.jp@gmail.com` に件名「[IPA Quiz] 法人問い合わせ受信」のメールが届けば成功。

## 6. トラブルシューティング

| 症状 | 原因 / 対処 |
|---|---|
| メールが届かない | (1) Vercel ログで `Resend send error` を検索 (2) Resend Dashboard `Logs` で送信履歴確認 (3) Gmail 迷惑メールフォルダ確認 |
| 401 Unauthorized | API Key が間違っているか、本番 key を Preview に入れていないか確認 |
| 422 Validation | From アドレスが検証済みドメインでない。`onboarding@resend.dev` か検証済みドメインに変更 |
| API は 200 だがメール来ない | Resend の `Logs` で `bounced` / `complained` を確認。Gmail 側のスパム判定なら SPF/DKIM の DNS 再確認 |

## 7. 月次運用

- Resend Dashboard → `Logs` で月初に送信失敗率をチェック
- 100 通/月 を超えたら `Pro` プラン（$20/月、50,000 通）への切り替え検討
- 法人問い合わせが急増したら Slack Webhook 通知も検討（`SLACK_WEBHOOK_URL` を実装追加）
