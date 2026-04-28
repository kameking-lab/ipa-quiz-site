# 激辛レビュー第2巡 — Loop 5

実施日: 2026-04-26
レビュアー: 齋藤ナオ厳格モード
対象: origin/main 9e646b3（Loop 4 修正後）
重点: AI Copilot プロンプト品質 / Streak ロジック / NextAuth / 状態UX / 3層解説 / フォームバリデーション / データ整合性 / Sentry / rate-limit 整合

## サマリ

| 区分 | 件数 |
|------|------|
| Critical | 0 |
| Minor | 1（即修正） |
| Major | 1（保留） |

## 観点別所見

### 観点1: AI Copilot プロンプト品質
- `lib/ai/prompts.ts:4-66` COPILOT_SYSTEM_PROMPT
  - 競合言及禁止テンプレート ✅、試験制度の正確な事実列挙 ✅、ハルシネーション抑制注記 ✅
  - プロンプトインジェクション耐性: ユーザー入力は messages 配列に閉じ込められ、system は固定。OK
  - 改善余地: 確信度・正答率言及指示なし → **Major M2-18**
- `QUICK_ACTIONS` 9 アクション、analyze-* で「シラバス項目」言及あり。topicTags 欠如時も Gemini 一般知識で補完可、許容範囲
- Critical 0 / Minor 0

### 観点2: Streak ビジネスロジック
- `lib/streak/core.ts:20-23` `jstDateString()` は UTC + 9h で ISO date を slice、JST 境界・年跨ぎとも正常
- `applyStudyDay`/`decayIfLapsed` の diff 計算は `Date.parse` 経由で TZ 影響なし、過去日付 lastStudyDate でも diff 大なら currentStreak=0 にリセット
- agent 報告の「nextJstMidnight 越年バグ」は誤検出（該当関数は streak ではなく rate-limit 側、かつ実装も正常）
- Critical 0 / Minor 0

### 観点3: NextAuth flow edge cases
- NextAuth v5 はデフォルトで cookie の secure/sameSite/httpOnly を環境に応じて適切に設定
- `auth.config.ts` で session strategy/JWT設定は標準
- agent 報告「cookie 設定不在 = Critical」は v5 デフォルト挙動を見落とした誤検出
- Critical 0 / Minor 0

### 観点4: Empty/Loading/Error 状態 UX
- `app/error.tsx` / `app/global-error.tsx` で Sentry connect、リカバリーボタンあり（Loop 2 で対応済）
- `not-found.tsx` 確認済、ホーム導線あり
- Copilot ストリーミング失敗時はインライン `[エラー] AI応答の取得に失敗しました...` を controller へ enqueue（route.ts:122）
- Critical 0 / Minor 0

### 観点5: 3層解説（一言/詳細/類題）
- AP 2024秋 68問完了（memory 記録）。残 12,094 問
- サンプル抽出で 3 層構造の一貫性 OK、フォーマット統一済
- 進捗管理は `pnpm refactor:by-file` で再開可能
- Critical 0 / Minor 0

### 観点6: フォームバリデーション
- `app/api/copilot/route.ts:12-39` zod schema strict、messages content min(1) max(4000) で XSS 抑制境界あり
- `auth/signin` フォームは NextAuth の標準 validation
- Stripe checkout 開始は server action 経由、CSRF 自動防御
- Critical 0 / Minor 0

### 観点7: データ整合性
- `data/questions/**/*.ts` で `answer: [` パターンを grep → 0件、全て string で型統一済
- agent 報告「answer 配列混在 10,186 件」は Array.isArray defensive コードを誤読した誇張
- Critical 0 / Minor 0

### 観点8: rate-limit 整合
- `lib/rate-limit/server.ts:18-22` BETA_DAILY_LIMIT=50 / BETA_MINUTE_LIMIT=15、`FREE_DAILY_LIMIT = BETA_DAILY_LIMIT` でクライアント表示と同期
- `nextJstMidnight` ロジックは UTC 跨ぎ・年跨ぎとも正常、cleanup 10 分間隔で leak 防止
- Critical 0 / Minor 0

### 観点9: Sentry 監視実態
- `lib/monitoring/sentry.ts:31` `SENTRY_DSN` 設定済かつパース失敗時に **無言で disabled** → **Minor N5-1（即修正）**
- `captureException` 呼び出しは error.tsx / global-error.tsx の 2 箇所、PII（userId 任意）は明示的にだけ送信、OK
- Critical 0 / Minor 1

### 観点10: 認証エラー UX
- `app/auth/error/page.tsx` 標準エラーマップ表示、ホーム導線 OK
- Critical 0 / Minor 0

## 即修正

| ID | 内容 | ファイル |
|----|------|----------|
| N5-1 | `SENTRY_DSN` が設定されているがパース失敗時に `console.warn` で警告（無言 disabled の検出性向上） | `lib/monitoring/sentry.ts` |

## Major（保留）— logs/major-issues-2.md に追記

- M2-18: COPILOT_SYSTEM_PROMPT に「選択肢の正答率・確信度を言及」指示追加（プロンプト品質改善）

## 品質保証

- ✅ `pnpm typecheck` 成功
- ✅ `pnpm build` 成功
- NPS 予測: +31 → +31（軽微改善のみ）

## 1巡目との比較
- 1巡目では Sentry の存在自体に踏み込まず、警告 path も未点検
- 本ループで AI プロンプト品質・Streak・rate-limit を初めて精密検証 → 構造的問題なし確認

## 早期完了判定
- Loop 5: Critical 0 / Minor 1 → 3 連続 0/0 条件はまだ未達（Loop 5 で Minor 1 検出）
- Loop 6 〜 8 で連続 0/0 になれば Loop 8 終了で打ち切り可
