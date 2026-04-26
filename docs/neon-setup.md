# Neon Postgres セットアップ手順書

過去問AI の本番 DB は Neon Postgres を想定する（NextAuth セッション永続化・Stripe Subscription / 学習履歴クラウド同期）。

DATABASE_URL が未設定でもアプリは動作するように `graceful degradation` を組み込んでいる:

- `/api/auth/session` は AUTH_SECRET 未設定でも 200 で空セッションを返す
- `/api/stripe/webhooks` は DB 未接続でも署名検証は実行し、永続化はスキップして 200 を返す（Stripe Retry を回避）
- `/api/stripe/checkout` は認証チェックを最優先にし、未ログインなら 401 を返す

DB を有効化することで Subscription / User / StudyRecord / Streak などが永続化される。

## 1. Neon プロジェクト作成

1. <https://neon.tech> にアクセスし GitHub 認証でサインアップ
2. `New Project` → リージョンを `Asia Pacific (Tokyo)` に設定
3. Project name: `ipa-quiz-site`
4. Postgres バージョン: 16 (デフォルト)

## 2. ブランチ戦略

- `main` ブランチ — 本番用
- `dev` ブランチ — Vercel Preview 用（`main` から複製）

Neon UI の `Branches` から `Create branch` で `dev` を作成。

## 3. 接続文字列の取得

Project → `Dashboard` → `Connection Details`
- **Pooled connection** を選択（Vercel Edge / Lambda 接続向け）
- `psql` 形式ではなく `postgresql://...` 形式の URI をコピー

末尾に `?sslmode=require&pgbouncer=true&connect_timeout=10` を必ず付ける。

例:
```
postgresql://USER:PASSWORD@ep-xxxx.ap-northeast-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=10
```

Prisma migrate 用には `?sslmode=require&connect_timeout=10` のみのダイレクト接続文字列も用意する（`DIRECT_URL`）。

## 4. Vercel 環境変数登録

Vercel Project → Settings → Environment Variables:

| Key | Value | Environments |
|---|---|---|
| `DATABASE_URL` | `main` ブランチのプール接続 URI | Production |
| `DIRECT_URL` | `main` のダイレクト URI | Production |
| `DATABASE_URL` | `dev` ブランチのプール接続 URI | Preview |
| `DIRECT_URL` | `dev` のダイレクト URI | Preview |

## 5. 初回マイグレーション

ローカルで `.env.local` に Production の DATABASE_URL/DIRECT_URL を一時的に設定し:

```bash
pnpm prisma migrate deploy
```

確認:
```bash
pnpm prisma studio
```

## 6. 確認 curl

```bash
curl -sS --ssl-no-revoke -o - https://ipa-quiz-site.vercel.app/api/auth/session
# → 200 {} （AUTH_SECRET 未設定でも空セッションを返す graceful 動作）

curl -sS --ssl-no-revoke -X POST -H 'Content-Type: application/json' -d '{}' \
  https://ipa-quiz-site.vercel.app/api/stripe/checkout
# → 401 unauthorized （認証必須）
```

## 7. ロールバック

Neon は最大 7 日間の point-in-time restore を保持する。
- `Branches` → 該当ブランチ → `Restore` から日時指定で復元可能
- 復元はブランチを別名で作成するため、復元後に DATABASE_URL を切り替える運用
