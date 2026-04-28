# 認証・課金セットアップガイド

フェーズ4 で導入した NextAuth.js v5 + Stripe + Prisma の環境変数・外部サービス設定手順。

本番 Vercel / ローカル開発 の両方を想定。未設定の環境でも未ログイン機能は全て動く defensive 設計になっているので、一度に全部用意する必要はない。

---

## 1. 環境変数 全体マップ

`.env.local`（ローカル）と Vercel 環境変数（本番・Preview）に同じキーを設定する。

```bash
# ===== NextAuth =====
AUTH_SECRET=                   # 必須。openssl rand -base64 32 で生成
AUTH_URL=                      # 本番のみ必須。ex: https://ipa-quiz-site.vercel.app
AUTH_TRUST_HOST=true           # Vercel では推奨

# Google OAuth（任意、設定すれば有効化）
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# GitHub OAuth（任意）
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# Email Magic Link（任意）
AUTH_EMAIL_SERVER=             # ex: smtp://apikey:<sendgrid_api_key>@smtp.sendgrid.net:587
AUTH_EMAIL_FROM=               # ex: noreply@ipa-quiz.app

# ===== Database =====
DATABASE_URL=                  # Postgres URL。Vercel Postgres or Supabase 等

# ===== Stripe（テスト鍵で先に動かす）=====
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PREMIUM=price_...   # 月980円
STRIPE_PRICE_ID_TEAM=price_...      # 月30,000円

# ===== 共通 =====
NEXT_PUBLIC_SITE_URL=          # 任意。本番 URL。未設定時は VERCEL_URL 自動

# ===== Admin Basic 認証（/admin/* を保護）=====
ADMIN_BASIC_USER=              # 管理画面ユーザー名（例: admin）
ADMIN_BASIC_PASS=              # 管理画面パスワード（長めのランダム文字列推奨）
```

### Admin Basic 認証 補足

- 未設定時は `/admin/*` へのアクセスが **503 Service Unavailable** になる（`/admin/team`, `/admin/stats` 共通）。
- ブラウザが Basic 認証ダイアログを出さず 401 で弾かれ続ける場合、Vercel 環境変数の末尾改行/空白が原因であることが多い。middleware 側で `.trim()` 処理済み。
- UTF-8 を含むパスワードも `TextDecoder` で復号するため、日本語パスワードも利用可。ただし管理用途ではASCII 20文字以上のランダム文字列を推奨。

---

## 2. Google OAuth

### 2-1. OAuth クライアント作成

1. [Google Cloud Console](https://console.cloud.google.com/) → プロジェクト作成
2. 左メニュー「APIs & Services」→「OAuth consent screen」
   - User Type: External
   - アプリ名 / サポートメール / Developer contact を入力
   - Scopes: `userinfo.email`, `userinfo.profile`, `openid`
3. 「Credentials」→「Create Credentials」→「OAuth client ID」
   - Application type: Web application
   - Authorized JavaScript origins:
     - `http://localhost:3000`（開発）
     - `https://ipa-quiz-site.vercel.app`（本番）
     - `https://*-kameking-lab.vercel.app`（Preview。Vercel CLI で調整）
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://ipa-quiz-site.vercel.app/api/auth/callback/google`

### 2-2. 環境変数に入れる

```bash
AUTH_GOOGLE_ID=<Client ID>
AUTH_GOOGLE_SECRET=<Client Secret>
```

---

## 3. GitHub OAuth

1. GitHub → Settings → Developer settings → OAuth Apps → "New OAuth App"
2. 入力:
   - Application name: `過去問AI`
   - Homepage URL: `https://ipa-quiz-site.vercel.app`
   - Authorization callback URL:
     - 本番: `https://ipa-quiz-site.vercel.app/api/auth/callback/github`
     - 開発用には別アプリを作り `http://localhost:3000/api/auth/callback/github`
3. Client ID / Client Secret を取得し環境変数へ

```bash
AUTH_GITHUB_ID=<Client ID>
AUTH_GITHUB_SECRET=<Client Secret>
```

---

## 4. Email Magic Link（SendGrid / Resend / Mailgun 等）

Nodemailer 経由の SMTP でメール送信する。SendGrid で例示。

### 4-1. SendGrid

1. SendGrid でアカウント作成 → API Keys → Full Access の API Key 発行
2. Sender Identity: Single Sender Verification でメールアドレスを認証
3. 環境変数:

```bash
AUTH_EMAIL_SERVER=smtp://apikey:SG.xxxxx@smtp.sendgrid.net:587
AUTH_EMAIL_FROM=noreply@ipa-quiz.app
```

### 4-2. Resend（推奨: Next.js 親和性高）

代替として [Resend](https://resend.com) も使える。NextAuth 側のプロバイダ実装を `next-auth/providers/nodemailer` から `next-auth/providers/resend` に切替が必要（本 PR 時点では未実装）。

---

## 5. Database（Postgres）

### 5-1. Vercel Postgres（本番・Preview 推奨）

1. Vercel プロジェクト → Storage → Create → Postgres
2. プロジェクトにリンク → 環境変数が自動注入される（`POSTGRES_URL` 等）
3. `DATABASE_URL` キー名で使いたいので、Settings → Environment Variables で
   `DATABASE_URL = {{POSTGRES_URL}}` のように再参照するか、`POSTGRES_URL` の値をコピー

### 5-2. Supabase（無料枠が大きい代替）

1. [Supabase](https://supabase.com) → New Project
2. Project Settings → Database → Connection string (URI) をコピー
3. `DATABASE_URL` に貼る

### 5-3. マイグレーション適用

```bash
# ローカルで .env.local に DATABASE_URL を入れた後:
pnpm db:migrate:deploy    # 本番マイグレーション
# もしくは開発中にスキーマ変更するときは:
pnpm db:migrate:dev --name <migration_name>
```

本番 Vercel でマイグレーションが実行されないため、デプロイ時には以下のいずれかで適用:
- `package.json` の `build` スクリプトに `prisma migrate deploy &&` を前置（安全）
- GitHub Actions で migrate を先に流す

---

## 6. Stripe（テストモード）

### 6-1. アカウント作成 + テスト鍵取得

1. [Stripe](https://dashboard.stripe.com) でアカウント作成
2. 右上「テストモード」に切替
3. Developers → API keys から
   - Publishable key（`pk_test_...`）※クライアント利用時のみ必要
   - Secret key（`sk_test_...`）→ `STRIPE_SECRET_KEY`

### 6-2. Product / Price 作成

Stripe Dashboard → Product catalog → "Add product":

- **PREMIUM 月980円**
  - 名前: 過去問AI Premium
  - 料金: ¥980 / 月 / 定期支払い
  - 作成後の Price ID（`price_xxx`）を `STRIPE_PRICE_ID_PREMIUM` に設定
- **TEAM 月30,000円**
  - 名前: 過去問AI Team
  - 料金: ¥30,000 / 月 / 定期支払い
  - Price ID を `STRIPE_PRICE_ID_TEAM` に設定

### 6-3. Webhook 設定

**本番 (Vercel):**
1. Stripe → Developers → Webhooks → Add endpoint
2. URL: `https://ipa-quiz-site.vercel.app/api/webhooks/stripe`
3. 以下のイベントを選択:
   - `checkout.session.completed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Signing secret（`whsec_...`）を `STRIPE_WEBHOOK_SECRET` に設定

**ローカル開発 (Stripe CLI):**
```bash
# インストール（Mac）: brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
起動時に表示される `whsec_...` を `.env.local` の `STRIPE_WEBHOOK_SECRET` に入れる。

### 6-4. テストカード

| カード番号             | 動作                       |
| ---------------------- | -------------------------- |
| `4242 4242 4242 4242`  | 成功                       |
| `4000 0000 0000 9995`  | 即時失敗（残高不足）        |
| `4000 0025 0000 3155`  | 3D Secure 要求            |

有効期限: 任意の未来、CVC: 任意 3 桁。

### 6-5. Customer Portal の有効化

Stripe Dashboard → Settings → Billing → Customer portal で:
- プラン変更・解約・支払い方法変更を許可するか選択
- ビジネス情報（会社名・利用規約 URL）を入力
- Save

---

## 7. Vercel 環境変数の入れ方

```bash
# Vercel CLI 経由
vercel env add AUTH_SECRET production
# prompt で値を入力

# 一括で入れる（.env.production.local などを用意して）
vercel env pull .env.vercel
# 手動で dashboard にペーストが一番楽
```

Environment ごとに分けるのを忘れない:
- **Production**: 本番鍵
- **Preview**: テスト鍵 or Preview 用鍵
- **Development**: ローカルでは通常 `.env.local` のみで十分

---

## 8. 動作確認チェックリスト

セットアップ完了後:

- [ ] `/auth/signin` にアクセス → 設定済みプロバイダのボタンが出ている
- [ ] Google でログイン → `/account` にリダイレクトし、名前・メールが表示
- [ ] `/auth/signout` からログアウトできる
- [ ] （DB 設定済み）`prisma studio` で User テーブルに行が生成されている
- [ ] `/pricing` から Checkout に遷移し、テストカードで決済完了
- [ ] Stripe CLI / 本番 Webhook で `checkout.session.completed` を受け、
      Subscription が DB に作られ、User.plan が `premium` に更新される
- [ ] Customer Portal から解約 → Webhook で User.plan が `free` に戻る

---

## 9. トラブルシューティング

| 症状                                                           | 原因 / 対処                                                                          |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `/auth/signin` でプロバイダが1つも出ない                      | 環境変数が未反映。Vercel では再デプロイが必要                                       |
| OAuth callback で `redirect_uri_mismatch`                      | Google/GitHub 側の Redirect URI 登録ミス。末尾 `/` の有無まで一致させる              |
| Webhook が 400 `invalid_signature`                             | `STRIPE_WEBHOOK_SECRET` が本番 / テストで混在。Stripe CLI で出た whsec とズレてないか |
| Webhook が 503 `db_not_configured` / `stripe_not_configured`  | 環境変数の名前ミス。本ドキュメント §1 を再確認                                       |
| `prisma migrate` が "Database schema is not empty" で失敗     | 既存 DB とマイグレーション履歴が不一致。`prisma migrate resolve` で解決             |
| Magic Link メールが届かない                                    | SendGrid の Sender Identity 未認証 / SPF 未設定。迷惑メールも確認                   |

---

## 10. 本番リリース前に必ず確認

- [ ] `AUTH_SECRET` がランダム 32 バイト以上で、本番とローカルで **別の値** を使っている
- [ ] Stripe のテスト鍵 / 本番鍵を間違えて入れ替えていない（Live key: `sk_live_...`）
- [ ] 本番 Webhook エンドポイントの Signing Secret が本番環境変数に入っている
- [ ] `NEXT_PUBLIC_SITE_URL` = 本番 URL
- [ ] プライバシーポリシー / 利用規約に「OAuth 連携で氏名・メールを取得する」旨を追記
