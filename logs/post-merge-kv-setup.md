# Vercel KV セットアップ手順（本人作業）

PR #feat/rate-limit-and-cost-control マージ後、以下を順番に実施してください。

## 1. Upstash KV データベースを作成する

1. https://console.upstash.com にアクセスしてログイン
2. "Create Database" → Region: ap-northeast-1（東京）を選択
3. データベース名: ipa-quiz-ratelimit（任意）
4. プランは Free（月500万リクエスト無料）で開始可能

## 2. REST API 認証情報をコピーする

作成後のダッシュボードから以下をコピー:
- UPSTASH_REDIS_REST_URL → KV_REST_API_URL として使用
- UPSTASH_REDIS_REST_TOKEN → KV_REST_API_TOKEN として使用

## 3. Vercel プロジェクトに環境変数を登録する

Vercel Dashboard → ipa-quiz-site → Settings → Environment Variables

追加する変数（Production / Preview / Development すべてに設定）:

  KV_REST_API_URL    = （Upstash REST URL）
  KV_REST_API_TOKEN  = （Upstash REST Token）

## 4. 再デプロイして動作確認する

Vercel でリデプロイ後、以下を確認:

  curl -u "ADMIN_USER:ADMIN_PASS" https://your-domain/api/admin/api-usage

"enabled": true が返れば KV 連携成功です。

## 5. /admin/api-usage でダッシュボードを確認する

ブラウザで https://your-domain/admin/api-usage を開き:
- Basic Auth でログイン
- "Upstash KV 有効" バッジが表示されること
- LLM API を呼んだ後、1分ほどで呼出カウントが反映されること

## 注意事項

- KV 未設定の場合、IP レート制限は無効（フォールバック）
  - 既存の in-memory 制限（10回/日無料）は引き続き有効
- KV設定後は 10回/分・100回/時間・500回/日 の IP 制限が追加される
- ダッシュボードは直近2時間の集計のため、設定直後はデータが少ない

## ロールバック方法

KV 環境変数を削除するだけでフォールバック（in-memory のみ）に戻ります。
コード変更は不要です。
