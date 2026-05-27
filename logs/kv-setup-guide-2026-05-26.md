# Vercel KV（Upstash）接続セットアップ — 2026-05-26

## 現状（最優先課題）

`vercel env ls`（全環境・名称のみ）で確認した結果、本番に以下が **未設定（ABSENT）**:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

そのため次が本番で機能していない:
1. **CLAUDE.md §0 のコスト上限（¥50,000 自動停止）**。`lib/ai/cost-guard.ts::checkMonthlyCostCap()` は
   KV 未設定時に `{ allowed: true }`（degrade-open）を返すため、上限が**発動しない**。`recordAiCost` も no-op。
2. **レート制限の永続化**。`lib/rate-limit/server.ts` は KV 未設定で in-memory（インスタンス毎・非永続）に縮退。
   複数サーバレスインスタンスをまたぐと日次/分次上限が緩くなる。

→ 暴走 AI コスト防止という自走運用の前提が成立していない。**KV 設定が単独で最優先。**

## 必要な環境変数

- `KV_REST_API_URL`（Upstash REST エンドポイント URL）
- `KV_REST_API_TOKEN`（Upstash REST トークン）

コードは Upstash REST API（`/get` `/incr` `/incrbyfloat` `/expire`）を fetch で直叩きする実装。
npm パッケージ追加は不要。

## 社長作業手順

1. https://console.upstash.com で Redis データベースを作成（無料枠で可。リージョンは ap-northeast or 近接）。
2. 作成した DB の「REST API」セクションから `UPSTASH_REDIS_REST_URL` と `UPSTASH_REDIS_REST_TOKEN` をコピー。
3. Vercel → Project ipa-quiz-site → Settings → Environment Variables に **本番（Production）** で登録:
   - `KV_REST_API_URL` = （Upstash の REST URL）
   - `KV_REST_API_TOKEN` = （Upstash の REST トークン）
   - ※ コードが参照する変数名は `KV_REST_API_*`。Upstash 側の `UPSTASH_REDIS_REST_*` の値を
     この名前で登録する（Vercel の Upstash 統合を使う場合は自動で `KV_REST_API_*` が入ることもある）。
4. 再デプロイ（env 変更を反映）。

## 設定後の確認

- AI コパイロットを連続で叩き、日次上限超過で 429 が返ること（レート制限の永続化）。
- Upstash コンソールで `rl:day:*` キーや `ai_cost:YYYY-MM` キーが生成されること。
- 任意: Upstash で `ai_cost:YYYY-MM` を一時的に 50000 以上へ手動セット → AI 機能が 503（cost_capped）に
  なることを確認 → 確認後キー削除。
