# AI 月次コスト上限（¥50,000 自動停止 + Slack）デプロイ手順 — 2026-05-26

CLAUDE.md §0 が定める「月間 API コストが 5 万円に達した場合、新規 AI リクエストを自動停止し、
Slack 通知を送る」安全制御の実装（`feat/ai-monthly-cost-cap-50k`）に伴う運用設定。

## 実装サマリ

- 実体: `lib/ai/cost-guard.ts`
  - `checkMonthlyCostCap()` … AI 呼び出し前に当月累計を Upstash KV から読み、¥50,000 以上なら遮断
  - `recordAiCost()` … 呼び出し後に推定コストを当月バケットへ加算し、閾値で Slack 通知
- 配線済み経路（mock プロバイダ時は無課金なので素通り）:
  - `app/api/copilot/route.ts`（ストリーム完了時に記録）
  - `app/api/essay-grade/route.ts`
  - `app/api/generate-question/route.ts`
- 上限超過時のユーザー応答: HTTP 503 + `{"error":"cost_capped"}` + 控えめな日本語メッセージ
- KV キー: `ai_cost:YYYY-MM`（JST 月。月初に自動ローテート＝リセット。70 日 TTL）
  - 通知フラグ: `ai_cost:YYYY-MM:notified:40k` / `:notified:50k`（月内で各 1 回だけ通知）
- トークン量はプロバイダが usage を返さないため文字数から推定（`estimateTokens`、chars/2、やや高めに見積もって早めに発火）

## 社長作業（Vercel 環境変数）

以下を Vercel（Project → Settings → Environment Variables、Production + Preview）に登録する。

1. `SLACK_WEBHOOK_URL`（新規・要登録）
   - Slack で Incoming Webhook を作成し、その URL を貼り付ける。
   - 手順: Slack → Apps → 「Incoming Webhooks」→ チャンネル選択 → Webhook URL をコピー。
   - 未登録でも自動停止（¥50k 遮断）は機能する。未登録時は閾値到達を `console.error`
     （Vercel ログ）に残す＝サイレント握り潰しはしない（fail-open 禁止）。

2. `KV_REST_API_URL` / `KV_REST_API_TOKEN`（既存・確認のみ）
   - 既に IP レート制限・/admin/api-usage で使用中の Upstash KV をそのまま流用。
   - 未設定の場合、コスト上限は「許可（degrade open）」で動作する＝累計を追跡できないため
     遮断もしない。本番では必ず設定されていること（レート制限と同じ前提）。

## 動作確認（登録後）

- Vercel ログで AI 呼び出し時にエラーが出ていないこと。
- KV に `ai_cost:YYYY-MM` キーが増えていくこと（Upstash コンソールで確認可）。
- 任意: Upstash コンソールで `ai_cost:YYYY-MM` を一時的に 40000 以上へ手動セット →
  `/contact` 等ではなく AI 機能（コパイロット）を叩き、Slack に警告が届くこと、
  50000 以上で 503（メンテナンス表示）になることを確認 → 確認後キーを削除。

## 不可逆・注意

- 上限値（¥50,000）と警告値（¥40,000）は `lib/ai/cost-guard.ts` の定数。CLAUDE.md §0 により
  ユーザー（社長）承認なしの引き上げ・無効化は禁止。本実装は「安全装置の追加」であり上限緩和ではない。
- 月初リセットは KV キーのローテーションに依存。タイムゾーンは JST 固定。
