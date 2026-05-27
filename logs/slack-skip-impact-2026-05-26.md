# SLACK_WEBHOOK_URL スキップの影響範囲 — 2026-05-26

`vercel env ls` で `SLACK_WEBHOOK_URL` は **未設定（ABSENT）**。社長判断でスキップ。
依存機能への影響を整理する。

## 1. コスト上限（lib/ai/cost-guard.ts）

- ¥40,000 警告通知・¥50,000 緊急通知 → Slack に送られず `console.error`（Vercel ログ）に出力。
  fail-open ではない（ログには必ず残す）設計。
- ¥50,000 自動停止（`checkMonthlyCostCap` の 503 遮断）→ **Slack とは独立にコード側で実行**されるため、
  Slack 未設定でも本来は機能する。
- **ただし現状は KV も未設定のため上限自体が degrade-open で発動しない**（`logs/kv-setup-guide-2026-05-26.md`）。
  つまり「通知が無い」以前に「上限が効いていない」。KV を設定して初めて、上限発動 + console.error 通知になる。
- 月次累計の確認手段: KV 設定後は Upstash の `ai_cost:YYYY-MM` キーを直接参照、または将来の管理画面。

## 2. フィードバック転送（app/api/contact + lib/notify/slack.ts）

- ユーザーのフィードバック / 問題コメント / 問題評価 / お問い合わせは `/api/contact` に集約され、
  `sendSlackMessage()` で Slack へ転送する設計（フェーズ13 #448）。
- Slack 未設定時 → `console.error("[slack] SLACK_WEBHOOK_URL unset; message not delivered:", text)`。
  送信内容は Vercel ログに残るのみ（揮発的・検索性低）。
- 旧フィードバック一覧 UI `app/admin/feedback` はフェーズ13 #448 で削除済み（常に空だったため）。
  → **届いたフィードバックを閲覧する常設 UI が現状ない。** Vercel ログを見るしかない。

## 影響まとめ・代替手段

- 無効化される機能: コスト閾値の能動通知、フィードバックの能動通知/常設閲覧。
- 代替手段（社長判断）:
  - 最小: Slack Incoming Webhook を登録（`logs/cost-control-deployment-2026-05-26.md` 手順）。
    KV と合わせて設定すればコスト通知・フィードバック受信の両方が機能する。
  - 暫定: Vercel ログ（`tag: kakomon-ai:inbound`、`[slack]`、`[cost-guard]`）を定期確認。
  - 中期: フィードバックを Prisma テーブルに保存し簡易管理 UI を再構築（DB スキーマ変更 = CLAUDE.md §10
    承認必須のため、社長判断が前提）。

## 優先度

KV 未設定によりコスト上限自体が無効な現状では、Slack 単独設定の価値は限定的。
**KV → SLACK の順で設定**するとコスト安全装置（発動 + 通知）が完成する。フィードバック受信のためだけなら
Slack のみでも可。
