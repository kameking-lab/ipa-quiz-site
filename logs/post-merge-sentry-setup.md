# Sentry 本番セットアップ手順書（マージ後・本人作業）

このドキュメントはコードのマージ後に本人が実施すべき手順をまとめたものです。
DSN・Auth Token が未設定の状態でも本番アプリは正常動作します（Sentry送信なし）。

---

## 1. Sentry プロジェクト作成（未作成の場合）

1. https://sentry.io にログインまたは新規登録
2. 左サイドバー「Projects」→「Create Project」
3. プラットフォームで「Next.js」を選択
4. プロジェクト名: `ipa-quiz-site`（推奨）
5. アラート: "Alert me on every new issue" を選択して作成
6. 表示されるDSN（例: `https://xxxxx@o123456.ingest.sentry.io/7890123`）をコピーして保存

---

## 2. Auth Token 発行

1. https://sentry.io → 右上アイコン → 「User Settings」→「Auth Tokens」
2. 「Create New Token」
3. スコープ: `project:read`, `project:releases`, `org:read` を最低限チェック
   - ソースマップアップロード用に `project:write` も追加
4. 発行されたトークンをコピーして保存

---

## 3. Vercel 環境変数の登録

https://vercel.com → ipa-quiz-site プロジェクト → Settings → Environment Variables

以下の環境変数を全環境（Production / Preview / Development）に登録:

NEXT_PUBLIC_SENTRY_DSN = （手順1で取得したDSN）
SENTRY_DSN             = （同上 — サーバー側用）
SENTRY_AUTH_TOKEN      = （手順2で取得したトークン）
SENTRY_ORG             = （sentry.ioのURL中のorg名）
SENTRY_PROJECT         = ipa-quiz-site

環境別に分けたい場合:

SENTRY_ENVIRONMENT = production  （Productionのみ）
NEXT_PUBLIC_SENTRY_ENVIRONMENT = production

---

## 4. アラート設定（Sentry管理画面）

Sentry → Alerts → Create Alert Rule で以下を設定:

### アラート1: 高頻度エラー
- Trigger: "Number of events" is greater than 100 in 1 minute
- 対象: All environments
- 通知: メールまたは Slack Webhook

### アラート2: 新規エラー初回検出
- Trigger: "A new issue is created"
- 重要度: High
- 通知: メールまたは Slack Webhook

### アラート3: エラーレート急増（上級）
- Trigger: "Percent of sessions with errors" is greater than 1%
- 計測期間: 5 minutes
- 通知: Slack Webhook

Slack通知は Sentry → Settings → Integrations → Slack でワークスペース連携後に使用可能。

---

## 5. パフォーマンスアラート（LCP劣化検知）

Sentry → Alerts → Create Alert Rule → "Performance" タブ:

- Metric: Largest Contentful Paint (p75)
- Threshold: > 2500ms
- 計測期間: 5 minutes
- 通知: メール

---

## 6. ソースマップアップロード動作確認

SENTRY_AUTH_TOKEN と SENTRY_ORG / SENTRY_PROJECT が設定されると、
`next build` 時に自動的にソースマップがアップロードされる。

確認手順:
1. Vercel のデプロイログで "Uploading source maps to Sentry" が出ることを確認
2. Sentry → Issues → 任意のエラー → スタックトレースが minify されていないことを確認

ソースマップが不要な場合（コスト削減）:
next.config.ts の withSentryConfig 内に `hideSourceMaps: true` を追加。

---

## 7. 動作確認（DSN設定後）

1. Vercel にデプロイが完了したら本番URLを開く
2. ブラウザのコンソールで意図的エラーを発生させる方法:
   - 開発者ツール → Console → `throw new Error("Sentry test")`
3. Sentry → Issues に数分以内に届いていれば成功
4. サーバー側確認: `/api/health` に GET して 200 が返れば正常

---

## 8. 現在のサンプリング設定（変更不要・参考情報）

Client:
- tracesSampleRate: 1.0(dev) / 0.1(prod)
- replaysSessionSampleRate: 0.1(dev) / 0.01(prod)
- replaysOnErrorSampleRate: 1.0（エラー時は必ず取得）

Server:
- tracesSampleRate: 1.0(dev) / 0.1(prod)
- ボット・スクレイパーのエラーは自動除外

Edge:
- tracesSampleRate: 1.0(dev) / 0.05(prod)（軽量化）

Sentry無料枠（5万イベント/月）の目安:
- 1,000 DAU × 平均5エラー/日 × 30日 = 15万イベント/月
- tracesSampleRate=0.1 なら約1.5万イベント → 無料枠内

---

## 9. オプション: Slack Webhook 登録

CLAUDE.md の API コスト監視用に設定済みの SLACK_WEBHOOK_URL を
Sentry のアラート通知にも流用可能。

Sentry → Settings → Integrations → Slack → Configure → Channel を指定。
