# UX オーバーホール フェーズ13 総括 — 2026-05-26〜27

フェーズ13は「新機能ではなく、構造的激辛レビュー第2弾 + 実機激辛レビュー第2弾で
指摘された致命傷・実機反証・残課題を、実機検収プロセス（コード前に E2E）込みで潰す」
ことに専念した。基点 main: `f0dd2d3`（フェーズ12完了）。完了時 main: `f03aafb`。

## 各タスクの PR・マージ SHA・実装内容

- タスク① 構造レビュー保存 — PR #444 / `66dc43a` — `logs/structural-spicy-review-v2-2026-05-26.md`
- タスク② 実機レビュー保存 — PR #445 / `ca25ffc` — `logs/ipa-quiz-site-empirical-spicy-review-v2-2026-05-26.md`
- タスク③ AIコスト上限（致命傷①）— PR #446 / `bc91c5e` — `lib/ai/cost-guard.ts` 新設。Upstash KV に月次累計（`ai_cost:YYYY-MM`、JST、月初ローテート）、`checkMonthlyCostCap()` で ¥50,000 到達時に copilot/essay-grade/generate-question を 503 遮断、¥40k 警告 / ¥50k 緊急で Slack。テスト7件。
- タスク④ CI に test+lint（致命傷②）— PR #447 / `1e6982d` — `e2e.yml` に `pnpm lint` と `pnpm test` ステップ追加（fail-fast: install→lint→typecheck→test→build→playwright）。133→以後の全ユニットテストが PR ゲートに寄与。
- タスク⑤ フィードバック一本化（致命傷③）— PR #448 / `19a8a22` — 三重配線を `/api/contact` 単一経路へ。`question-rating` kind 追加、`QuestionFeedback` 再配線、全 kind を `lib/notify/slack.ts` で Slack 転送。死蔵 `/api/feedback`・並存 `/api/question-feedback`・常時空 `admin/feedback`(+CSV) を削除。テスト4件。
- タスク⑥ /admin 無限待機（実機反証1）— PR #449 / `c80de76` — 調査の結果 middleware は同期・即時 401/503 返却でサーバハングなし（実機の「ハング」は Basic 認証ダイアログが自動ナビをブロックする仕様）。bare `/admin`・`/api/admin` を matcher に明示追加。E2E で bare /admin が 5 秒未満に 401/503 を返すことを保証。
- タスク⑦ Server ヘッダ抑制（実機反証2）— PR #450 / `911a9ff` — `next.config.ts` の `headers()` で `Server: kakomon-ai` に上書き。`next start` で適用を E2E 確認。**注意: Vercel edge が上書きする可能性があり本番要確認**（後述・社長作業）。
- タスク⑧ 学習カレンダー 24px（実機反証3）— PR #451 / `6178d62` — 実機の 12-14px は `components/motivation/LearningHeatmap.tsx`（前回 PR #424 は別物の home カレンダーを直していた）。`CELL_BASE` を `h-6 w-6`(24px) に。E2E でセル ≥24×24px を測定。
- タスク⑨ クイズ role=radio（実機反証4）— PR #452 / `7ccb911` — `ChoiceButton` を forwardRef + `role=radio`/`aria-checked`/`aria-disabled` に。フォーカス専用 roving フック `useQuizChoiceRoving`（矢印=フォーカス移動のみ、Enter/Space=選択。選択＝不可逆開示のため）。`QuizPlayer` と `DailyChallengeClient` に `role=radiogroup`。E2E で 4 radio・単一タブストップ・矢印移動・Space選択を検証。
- タスク⑩ 解説矛盾検出（実機反証5）— PR #453 / `46d4f1d` — AP令和7年春問1のデータは **main では既に修正済み**（dispute=0/14,402問）。実機残存はデプロイ stale。検出パターン強化（おり/が正解とされているが/公式解答とは異なる）+ `question-quality.yml` に dispute 監査ゲート追加。テスト2件追加。
- タスク⑪ 試験LP/ブログ問題数（その他）— PR #454 / `3efcd79` — ソースに 2,398 は存在せず（ブログは exam profile 動的生成・count は SSOT）。実機差異はデプロイ stale。`no-hardcoded-counts` ガードに `data/blog` 走査 + `2,398` 追加。
- タスク⑫ skip-link（その他）— PR #455 / `4c72a6b` — 既存の skip-link（`#main-content`）を DOM 先頭へ移し 1 Tab で到達可能に。E2E で Tab→focus→Enter→`#main-content` を検証。
- タスク⑬ 内部ページ撤去+文書整合（その他）— PR #456 / `f9e4ac2`（ページ削除）+ PR #458 / `5d82abc`（追補）— `app/final-review-v3`・`app/strategy-discussion-v2` 削除。robots Disallow 整理、CLAUDE.md §10「現状30→10」、schema.prisma「本番未接続→接続済」。
  注: #456 は `git add` がエラー中断し本文編集が未コミットだった事故を #458 で完結。
- タスク⑭ ShareButtons 統合（その他）— PR #457 / `e479570` — 同名2実装を `components/ShareButtons` 単一へ統合（full: X/LINE/Facebook/copy/native、compact: 36px アイコンクラスタ）。`/q` を再配線、`components/seo/ShareButtons` 削除。
- タスク⑮ localStorage 命名統一（その他）— PR #459 / `f03aafb` — `kakomon-ai-*` 3キーを `ipa-quiz:*` へ改名 + `migrateLegacyKey` で既存データ移行（新キー未設定時のみコピー・旧キー削除・新規ユーザーは無書き込み）。テスト6件。
- タスク⑯ 本総括 — docs PR（本ファイル）。

## 致命傷3件の対応状況：3/3 実装完了

1. AIコスト上限（CLAUDE.md §0 違反）→ 実装（#446）。要・社長作業（SLACK_WEBHOOK_URL 登録、KV 本番確認）。
2. CI が test/lint 未実行 → 実装（#447）。要・社長作業（ブランチ保護で `e2e` 必須化）。
3. フィードバック三重配線+管理画面空 → 一本化+Slack 転送（#448）。

## 実機反証5件の対応状況：5/5 対応（うち1件は本番要確認）

1. /admin 無限待機 → サーバハング無しを実証 + bare /admin ゲート + E2E（#449）。社長: Vercel Deployment Protection オフ確認。
2. Server ヘッダ → アプリ層で上書き（#450）。**本番で Vercel edge が勝つ可能性、要 prod 確認。**
3. カレンダー 24px → 正しいコンポーネントを修正 + E2E（#451）。
4. AI解説矛盾 → main は既に修正済み、ゲート強化（#453）。デプロイで self-heal。
5. role=radio 欠落 → 全面実装 + E2E（#452）。

## その他検出項目の対応状況

- ブログ問題数（#454）、skip-link（#455）、内部ページ+文書（#456/#458）、ShareButtons 重複（#457）、localStorage 命名（#459）— すべて対応。

## 実機検収プロセスの導入

フェーズ13で「対応した」と主張する前に E2E で動作を実証する方針を徹底。新規/拡張 E2E spec:
`admin-auth.spec.ts`（bare /admin 高速応答）、`security-headers.spec.ts`（Server 非露出）、
`study-calendar-tap-target.spec.ts`（≥24px）、`quiz-radiogroup.spec.ts`（radio/roving/Space選択）、
`skip-link.spec.ts`（Tab→main）。これらは #447 以降 CI（e2e ワークフロー）で毎 PR 実行される。
新規ユニットテスト: `cost-guard`(7) / `contact`(4) / `migrate-key`(6) / 解説整合(+2) / counts ガード強化。
ユニットテスト総数は 133 → 152 に増加し、全て CI ゲート対象。

## 全フェーズ累計 PR

フェーズ13で 16 本（#444〜#459）をマージ。リポジトリ PR 番号は #459 に到達（フェーズ1-13 累計）。

## 「研ぎ澄まし完成度」の再評価

- 前回判定: 構造「表層7-7.5割・安全装置5割」/ 実機「6.5-7割・前回から横ばい」。
- フェーズ13後（コード基準）: **約8割**。理由 — (a) §0 が義務付けた安全装置（コスト自動停止）が実在、(b) CI が test+lint を回し退行防止テストに番人が付いた、(c) フィードバックが Slack へ届く、(d) 実機反証5件が E2E 付きで解消、(e) クイズ中核 UI の a11y（radiogroup+roving+skip-link）が実装済み。
- ただし正直な留保: 実機反証のうち AP問1・ブログ数値・skip-link は「main は元々正しく、本番が stale」だった（＝コードの欠陥でなくデプロイ鮮度の問題）。Server ヘッダは本番未確認。完成度の最後の 2 割は「コード」より「本番反映・社長作業・ブランド SEO」に依存する。

## 残課題と将来対応（フェーズ14以降）

- cold TTFB 500–700ms（実機 D-1/F-4）: RSC ペイロード + 関連問題サジェストのプロファイリング。Vercel Speed Insights 有効化。未対応（フェーズ14候補）。
- ブランド SEO（指名検索「過去問AI」圏外、実機 B-1）: 被リンク・X 運用・記事増産。継続テーマ。
- インデックス率 ~32%（実機 B-2）: GSC で主要 LP の手動インデックス申請。
- stated-mismatch 43件（解説監査の advisory）: 人手レビュー（多くは別選択肢への言及で誤検知の見込み、機械一括修正は過大修正のため非推奨）。
- 構造レビュー積み残し（低優先）: analytics 二重計測（PostHog+Vercel）一本化、FAQPage 死スキーマ撤去、冗長 index 削除、use client 棚卸し、history-sync の無制限 findMany ページング。

## 社長作業（必須・本番反映に必要）

1. `SLACK_WEBHOOK_URL` を Vercel 環境変数に登録（コスト上限通知 + フィードバック転送）。手順: `logs/cost-control-deployment-2026-05-26.md`。
2. main ブランチ保護で status check `e2e` を必須化 + 直 push 禁止。手順: `logs/ci-branch-protection-2026-05-26.md`。
3. Vercel → Deployment Protection が**オフ**であることを確認（/admin 含む全公開ページのため）。
4. デプロイ後、本番で `Server` ヘッダが `Vercel` でないこと、AP問1・ブログ数値が最新であることを確認（stale 解消の確認）。
5. `KV_REST_API_URL` / `KV_REST_API_TOKEN` が本番に設定済みであること（コスト上限の永続化前提）。

## 過大修正の罠（継続して回避した項目）

crossExam 全走査（topicTags 空で短絡、現状実害なし）、stated-mismatch 43件の機械一括修正、
StatsCharts 同名（中身は別物、統合不要）— いずれも放置継続が妥当。
