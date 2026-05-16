# 激辛レビュー 修正必須5件 修復計画 (Dispatch: fix/harsh-review-required-5)

レビュー原典: logs/comprehensive-harsh-review-latest.md (課題#004-#008)
ベースHEAD: cc2a8da (origin/main, PR #238 merged)
作業ブランチ: fix/harsh-review-required-5
作成日: 2026-05-16

---

## 課題ステータス一覧

### #004 app/stats/page.tsx:117 内部開発文書パス露出
- 状態: 未対応 (本Dispatchで修復)
- 該当: app/stats/page.tsx の GSC 未連携フォールバック表示
- 現状: `セットアップ手順: logs/gsc-setup-guide.md` がユーザー向けUIに露出
- 修復方針: 内部パスを完全削除し「Google Search Console との連携が完了次第、月間表示回数を自動表示します。」のみに簡素化
- 工数: 5分
- 影響範囲: app/stats/page.tsx の表示テキストのみ。データ取得・連携ロジック無変更

### #005 /test/sentry, /test/posthog 外部実行可能性
- 状態: 既に解消済 (PR #237 でルートごと削除)
- 確認: `app/test/sentry/` と `app/test/posthog/` ディレクトリ削除済を git status で確認済
- 追加作業: 不要

### #006 /api-docs に noindex なし・robots.txt 未除外
- 状態: 未対応 (本Dispatchで修復)
- 該当: app/api-docs/page.tsx の metadata と app/robots.ts の disallow
- 現状: canonical のみ設定。robots: {index:false} なし。robots.txt にも /api-docs エントリなし
- 修復方針: (a) app/api-docs/page.tsx の metadata に `robots: { index: false }` を追加、(b) app/robots.ts の disallow 配列に "/api-docs" を追加
- 工数: 5分
- 影響範囲: SEO のみ。Public API β を意図的に開発者向け非公開導線へ統一

### #007 重複ペア・一時公開ルート削除
- 状態: 既に解消済 (PR #237 でルートごと削除)
- 確認: `app/launch/`, `app/final-review/`, `app/strategy-discussion/`, `app/exec-review/`, `app/feature-review/`, `app/scoring-test/`, `app/tmp/round7-review/` すべて削除済
- 追加作業: 不要

### #008 Rate limit が in-memory map で Vercel serverless では効果限定
- 状態: 既に解消済 (PR #237/#238 で lib/rate-limit.ts 追加)
- 確認: lib/rate-limit.ts が Upstash KV REST API ベースの永続レート制限を実装。`checkIpRateLimit` を app/api/copilot, essay-grade, essay-grading, generate-question, scoring の5エンドポイントが呼び出し済。KV_REST_API_URL / KV_REST_API_TOKEN が .env.example にドキュメント化済。logs/post-merge-kv-setup.md に運用手順記載済
- 追加作業: 不要 (KV 環境変数の Vercel への設定は本人作業として明示済)

---

## 修復対象の確定

- 本Dispatchで実装する課題: #004, #006 (2件)
- 既に解消済として確認: #005, #007, #008 (3件)

停止条件「5件すべて既に対応済」には該当せず、また「賛否ある修復方針が3件以上」にも該当しないため、本Dispatchは続行する。

## 各修復のコミット計画

1. fix(#004): replace internal log path with user-friendly fallback on /stats
2. fix(#006): add noindex to /api-docs and disallow in robots.txt

各修復ごとに pnpm typecheck / lint を通し、最後に build と既存テストを通す。
