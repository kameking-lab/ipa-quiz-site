# ローンチ後 24h 監視チェックリスト

作成日: 2026-05-16
対象: 早期アクセス公開告知後 24時間

本ファイルは公開告知投稿後から翌日同時刻まで、時間帯別に実施するモニタリング手順。

---

## 0-1h（告知直後）

### Vercel Functions ログ確認

確認場所: Vercel Dashboard > Deployments > Functions Logs
確認内容:
- [ ] API エンドポイント /api/copilot にエラーが出ていないか
- [ ] 500 系エラーが多発していないか
- [ ] "Rate limit exceeded" 以外の unexpected エラーがないか

エラーが出た場合: logs/launch-rollback-procedure.md の「部分機能停止手順」を参照

### Sentry エラーモニタリング

確認場所: https://sentry.io（Sentry プロジェクト）
確認内容:
- [ ] 新規 Issue が発生していないか（Unresolved Issues 欄）
- [ ] エラーレート: 告知前と比較してスパイクがないか

初出エラー対応フロー:
1. Sentry の Issue 詳細でスタックトレースを確認
2. エラーが UI 系（JavaScript）か API 系かを判定
3. UI 系で軽微なら告知継続、機能不全なら rollback 手順へ
4. API 系で AI コパイロット全断の場合は「AIコパイロット停止手順」を実施

### PostHog リアルタイム確認

確認場所: PostHog > Live Events
確認内容:
- [ ] pageview イベントが届いている（流入がある）
- [ ] ai_question_asked イベントが届いている（AI機能が使われている）
- [ ] quiz_answered イベントが届いている（クイズが使われている）

PostHog にイベントが一切来ない場合: 環境変数 POSTHOG_API_KEY が本番に設定されているか確認

### Twitter 反応モニタリング

確認場所: Twitter @kakomon_ai_jp の通知
確認内容:
- [ ] リプライ・RT・いいねの確認
- [ ] 不具合報告が来ていないか
- [ ] 「〇〇が使えない」等の障害報告がないか

ユーザーから障害報告が来た場合: 必ず返信して状況確認中である旨を伝える

---

## 1-3h

### Vercel Analytics 初動確認

確認場所: Vercel Dashboard > Analytics
確認内容:
- [ ] リクエスト数が想定範囲（急激なスパイクがない）
- [ ] 404 エラーの発生URL一覧（想定外の 404 がないか）
- [ ] レスポンスタイム: P95 が 3秒以内

### AI コパイロット利用状況

確認場所: PostHog > Insights または /admin/api-usage
確認内容:
- [ ] AI リクエスト数が月間コスト上限（5万円 = 約 90 万リクエスト/月）の範囲内
- [ ] 1日分を換算した場合のコスト見積もり

急増対応:
- AI リクエストが 10万回/日を超えそうな場合は rate limit 強化を検討
- 具体的な対応は logs/launch-rollback-procedure.md の「高負荷時のrate limit強化」を参照

---

## 3-12h

### /admin/funnel 初日ファネル確認

確認場所: https://www.kakomon-ai.jp/admin/funnel （Basic Auth）
確認内容:
- [ ] ホーム → 試験選択 → 問題開始 の遷移率
- [ ] 離脱ポイントの特定（どこで多く離脱しているか）
- [ ] AI コパイロット利用率（問題を解いたユーザーのうち何%がAIを使ったか）

基準値（初日の目安）:
- ホーム→問題開始率: 40% 以上なら良好
- AI コパイロット利用率: 20% 以上なら良好

### GSC 申請URLの初期反応

申請から数時間〜1日後に GSC で確認:
- [ ] 申請URLが「URL がグーグルに登録されています」になっているか
- [ ] まだ「URL がグーグルに登録されていません」の場合は1〜3日後に再確認

---

## 12-24h

### インデックス状況

確認場所: GSC > インデックス登録 > ページ
確認内容:
- [ ] インデックス登録済みページ数が告知前から増加しているか
- [ ] 「クロール済み - 現在インデックス未登録」の URL 数が多すぎないか

### エラーレート最終確認

確認場所: Sentry + Vercel Logs
確認内容:
- [ ] 24h 合計の 5xx エラー率が 1% 未満
- [ ] AI コパイロットのタイムアウトエラーが連続して発生していないか

### 翌日の action アイテム確認

- [ ] ユーザーからのフィードバック・バグ報告をまとめる
- [ ] 修正が必要な項目を GitHub Issues に登録
- [ ] 次回の Dispatch / PR 優先度を判断

---

## 判断基準（告知継続 vs 一時停止）

告知継続:
- Sentry エラーレート 1% 未満
- AI コパイロットが正常動作
- ユーザーからの致命的バグ報告なし

一時停止を検討:
- 5xx エラーレート 5% 超
- AI コパイロット全断（全リクエストがエラー）
- ユーザーデータの漏洩が疑われる事態

一時停止の場合: Twitter @kakomon_ai_jp に「メンテナンス中」の告知ツイートを投稿し、
logs/launch-rollback-procedure.md の手順に従う

---

## 監視ツールへのアクセス先まとめ

- Vercel Dashboard: https://vercel.com/dashboard
- Sentry: https://sentry.io
- PostHog: https://app.posthog.com
- GSC: https://search.google.com/search-console
- /admin/funnel: https://www.kakomon-ai.jp/admin/funnel (Basic Auth)
- /admin/api-usage: https://www.kakomon-ai.jp/admin/api-usage (Basic Auth)
