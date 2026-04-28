# Cleanup 判断保留リスト — 金田さん判断待ち

リスク回避のため、以下は今回の自動削除から除外しました。
コメント or 別タスクで指示いただければ追って削除します。

---

## Q1. `HANDOFF_FROM_CURSOR.md`（ルート / 8.4 KB）

- 更新日: 2026-04-17（セッション2）
- 内容: PR #1〜#3 時代の引き継ぎメモ。Gemini Vision PDF パイプライン、PWA、settings ページの説明
- 現状: その後 72+ commits 進行、内容のほとんどは古い
- 参照状況: 他ファイルからの参照ゼロ
- 提案: `docs/archive/HANDOFF_2026-04-17.md` に移動 or 削除（git 履歴に残るので削除でも実害なし）
- 判断観点: もう参照しないなら削除、後輩オンボード資料として残すなら docs/archive/ へ

## Q2. `logs/major-issues-2.md`（9.5 KB）

- 内容: 「第2巡 Major Issues（承認必須・本自動レビュー外）」M2-1 〜 M2-N
- Round 2 が並行稼働中とのことなので、**今回は触らずに残置**しています
- 提案: Round 2 が完了したらまとめて archive へ、判断はそのとき

## Q3. `lib/analytics/events.ts`（既製の analytics 基盤）

- `trackEvent()` / `AnalyticsEvent` 型を export
- `@vercel/analytics` の `track()` をラップ
- **import している実装ファイルゼロ**（`app/admin/stats/page.tsx` で文字列参照のみ：「9 種のイベント定義あり」と表示）
- 提案: A) このまま将来の配線まで保持 B) 即削除して必要時に再実装
- 推奨: **保持**（admin/stats が「ある前提」で表示しており、ファイル削除すると見栄え壊れる）

## Q4. `docs/` 配下の setup ドキュメント

`docs/` 直下には以下のセットアップ資料が混在しています：

| ファイル | 内容 | 状態判断 |
| --- | --- | --- |
| AUTH_AND_BILLING_SETUP.md | Auth.js + Stripe 全体導入手順 | 完了済か Active か不明 |
| FINAL_EXECUTION_STEPS.md | デプロイ最終手順 | おそらく完了 |
| LOCAL_PDF_PIPELINE.md | PDF パイプ ローカル運用 | 運用ドキュメント、保持推奨 |
| NEXT_LOCAL_STEPS.md | 「次のローカル手順」 | 一時的タスクメモの可能性 |
| afternoon-questions-handoff.md | 午後問題ハンドオフ | 引き継ぎ完了済か不明 |
| neon-setup.md / resend-setup.md / sentry-setup.md / monitoring-setup.md / uptime-setup.md / restricted-key.md / stripe-keys-restricted.md | 各種外部サービス設定手順 | 運用 runbook、保持推奨 |
| review-loop2-*.md | Round 2 進行中ログ | **触らない** |

- 提案: `FINAL_EXECUTION_STEPS.md` / `NEXT_LOCAL_STEPS.md` / `afternoon-questions-handoff.md` の3つは「完了したか」教えていただければ削除可能
- 残り setup 系は運用 runbook として保持を推奨

## Q5. `logs/.gitkeep`

- 全 1巡目ログを削除すると `logs/` ディレクトリが空に近づきますが、`logs/.gitkeep` と `logs/ui-redesign-progress.json` が残るため空にはなりません
- 提案: そのまま保持

---

総じて削除リスクが高いものは含まれていません。
判断方針: 「削除でも archive 移動でも、git 履歴があるので復元コスト ≈ 0」です。
