# Sentry セットアップ手順書

本番のエラートラッキング（5xx 例外、フロント JS エラー）を Sentry で行う。

`SENTRY_DSN` 未設定時は `lib/monitoring/sentry.ts` が `noop` 動作するため、設定なしでもアプリは動く。

---

## 0. 前提

- プラン: Developer（無料、月 5K errors / 10K performance units）でスタート
- 通知先: `kakomon.ai.jp@gmail.com`
- リージョン: US（無料枠最大）

## 1. アカウント作成

1. <https://sentry.io/signup/> にアクセス
2. **Sign up with GitHub** を選択（推奨。後で Source map 連携が楽）
3. Organization 名: `ipa-quiz`（任意。グローバルで一意である必要あり、衝突したら `ipa-quiz-jp` 等）
4. プラン選択画面: **Developer**（無料）を選ぶ

## 2. プロジェクト作成

1. ダッシュボード上部 `+ Create Project`
2. Platform: **Next.js** を選択
3. Alert frequency: `Alert me on every new issue`
4. Project name: `ipa-quiz-site`
5. Team: `#ipa-quiz`（既定でOK）
6. `Create Project` クリック

## 3. DSN 取得

プロジェクト作成直後、`Configure SDK` 画面に DSN が表示される。

形式:
```
https://abcdef1234567890@o1234567.ingest.sentry.io/9876543
```

後から確認する場合: 左メニュー `Settings` → `Projects` → `ipa-quiz-site` → `Client Keys (DSN)`。

## 4. Vercel 環境変数登録

Vercel Project → `Settings` → `Environment Variables`:

| Key | Value | Environments |
|---|---|---|
| `SENTRY_DSN` | DSN（サーバー側計測用） | Production |
| `NEXT_PUBLIC_SENTRY_DSN` | 同 DSN（クライアント計測用） | Production |
| `SENTRY_ENVIRONMENT` | `production` | Production |
| `SENTRY_DSN` | 別プロジェクトの DSN（任意。Preview 専用にしたい場合） | Preview |
| `SENTRY_ENVIRONMENT` | `preview` | Preview |

**注意:** `SENTRY_DSN` と `NEXT_PUBLIC_SENTRY_DSN` は **同じ値** で良い。`NEXT_PUBLIC_` 接頭辞付きはブラウザに露出するが、DSN は公開前提なので問題なし（CSP 等で制約される）。

## 5. 通知ルール設定

左メニュー `Alerts` → `Create Alert Rule`:

1. **What should we alert you about?** → `Issues`
2. **When an event matches the conditions:** → `A new issue is created`
3. **And these filters match:**（任意）
   - `Level` → `error or fatal`
4. **Then perform these actions:** → `Send a notification to Email` → `kakomon.ai.jp@gmail.com`
5. Rule name: `New error in production`
6. `Save Rule`

## 6. サンプリング率の調整

`lib/monitoring/sentry.ts` で初期化されるサンプリング率は以下:

```ts
tracesSampleRate: 0.1,       // 10% パフォーマンス
replaysSessionSampleRate: 0, // セッションリプレイは無効
replaysOnErrorSampleRate: 0,
```

無料枠（10K performance units/月）を超えそうなら `0.05`（5%）に下げる。
逆に問題追跡時は一時的に `1.0`（100%）に上げてリリース後 1 日だけ計測する運用も可。

変更箇所: `lib/monitoring/sentry.ts` を編集 → 通常 PR で main へ。

## 7. 動作確認

### サーバー側

```bash
# 故意に 5xx を出すには、AUTH_SECRET を一旦削除して /api/auth/session を叩く
# （ただし本 PR の修正で 200 が返るので、専用の test endpoint で行う）
```

簡易確認:

```bash
curl -sS --ssl-no-revoke -o /dev/null -w "HTTP %{http_code}\n" \
  https://kakomon-ai.jp/api/_test/throw
# → 500 (test エンドポイント未実装の場合は 404)
```

5 分以内に Sentry の `Issues` 一覧にエラーが表示されれば成功。

### クライアント側

ブラウザで開発者ツール → Console:

```js
throw new Error("Sentry test error from console");
```

ページリロード前にエラーが Sentry に送信される。

## 8. リリース連携（任意）

Vercel デプロイごとに `release` を Sentry に通知すると、エラーをコミット単位で追跡できる。

Vercel → Settings → `Integrations` → `Browse Marketplace` → `Sentry` → `Add Integration`。

セットアップ後、`SENTRY_AUTH_TOKEN` が自動で Vercel に追加される。Source map もアップロードされ、minified なエラーが原因コミットまで遡って解決する。

## 9. トラブルシューティング

| 症状 | 原因 / 対処 |
|---|---|
| エラーが Sentry に出ない | (1) DSN typo (2) `lib/monitoring/sentry.ts` で init が呼ばれているか確認 (3) Sentry Dashboard `Stats` → 受信は来ているか |
| 5K errors/月 を超えた | (1) Issue を `Resolve` (2) 大量発火している issue は `Ignore` (3) Team プラン $26/月 にアップグレード |
| Source map が解決されない | リリース連携を有効化（手順 8） |
| 個人情報が出る | `beforeSend` フックで PII（email/IP）を sanitize。`lib/monitoring/sentry.ts` で `sendDefaultPii: false` 確認 |
