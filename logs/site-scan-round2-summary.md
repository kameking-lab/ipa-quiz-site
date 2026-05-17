# Site Scan Round 2 — 統合サマリ

調査対象: HEAD ecc5845 (origin/main, PR #254 マージ後)
ブランチ: audit/site-scan-round2
スキャン日: 2026-05-17
第1弾比較基準: PR #225 (HEAD 37e85b7, 2026-05-16)
方針: 報告のみ、削除実施はオーナー判断による別ディスパッチ


## 全体所感

PR #225〜#254 の累計 30PR で追加された領域を走査。
第1弾で指摘した「即削除 8件」のうち半数（final-review v1, strategy-discussion v1 等）は解消済みだが、
v2/v3 のバリアントが残存。加えて logs/ のアーティファクト蓄積が加速しており、
169ファイル・1.3MB に達した。コード品質に問題はなく、即用ユーザー影響なし。


## 第1弾(Round 1)との差分

Round 1 指摘 8件（即削除推奨）の状況:
- final-review v1, strategy-discussion v1, exec-review, feature-review, scoring-test, tmp/round7-review, test/posthog, test/sentry → 削除済み（解消）
- final-review v3, strategy-discussion v2 → 残存（Round 2 で再掲）

Round 1 指摘 3件（アーカイブ推奨）の状況:
- demo/afternoon, demo/essay-grading → 残存（robots.ts の disallow に明記あり、影響なし）
- launch/ → 削除済みを確認（解消）


## 即削除推奨（8件）

根拠: 本番で404/noindex 且つ「24時間後削除予定」記述あり、または一時生成物でソースに取り込み済み。

1. app/final-review-v3/page.tsx
   - production 環境では notFound() を返す（本番公開なし）
   - metadata に「24時間後削除」記述。スキャン時点で未削除。
   - 参照: robots.ts の disallow リストに明示

2. app/strategy-discussion-v2/page.tsx
   - noindex/nofollow 設定、「24時間後削除予定」記述。未削除。
   - force-static でビルド時に logs/strategy-discussion-v2.md を読む依存あり
   - 参照: robots.ts の disallow リストに明示

3. logs/final-review-v3.md (20KB)
   - app/final-review-v3/page.tsx のみが参照。上記 #1 と一緒に削除可。

4. logs/strategy-discussion-v2.md (36KB)
   - app/strategy-discussion-v2/page.tsx のみが参照。上記 #2 と一緒に削除可。

5. logs/old-essays-2023spring/ (44KB, 5ファイル)
   - construction.ts / finance.ts / healthcare.ts / it.ts / public.ts
   - 旧エッセイデータ。現行 data/essays/ に取り込み・差し替え済みと推定。
   - オーナー確認: 本当に取り込み済みか一応確認推奨。

6. logs/old-essays-pr200/ (172KB, 5ファイル)
   - au/pm/sa/sm/st の 2024年度産業別エッセイ TS ファイル
   - PR #200 以降に正式データファイルへ移行済みと推定。
   - オーナー確認: 移行完了済みかを確認してから削除。

7. logs/explanations-batch-2017a-001.json + 002.json (合計 48KB)
   - AP 2017-autumn の解説バッチ生成の中間産出物
   - PR #253 (fill 50 + 24 explanations) でソースに取り込み済み。
   - 中間ファイルはソースに不要。

8. logs/alive-*.log ファイル 63本 (合計 63KB)
   - 各タスクの "alive marker" として生成した 1KB 前後のログ
   - 内容は「タスク名 + タイムスタンプ」のみで再利用価値なし
   - git 履歴に commit されており、ファイル自体の存在は無意味


## アーカイブ推奨（3件）

根拠: 最新版が存在するか、参照頻度ゼロの古いレビュードキュメント。

1. logs/comprehensive-harsh-review-20260516.md と logs/comprehensive-harsh-review-latest.md
   - 両ファイル共に 36KB、内容が同一または近似
   - latest は 20260516 のシンボリック的コピーとみられる
   - どちらか一方を残し、他方を削除

2. logs/persona-review.md (48KB) と logs/persona-review-v2.md (12KB)
   - v2 が最新なら v1 (48KB) はアーカイブ候補
   - 両ファイルとも logs/ 内でのみ存在し、コードからの参照なし

3. logs/generate-essays-2023.log と logs/generate-essays-2025.log (各 4KB)
   - スクリプト実行時の stdout ログ。再実行すれば再生成可能。
   - ソース管理不要。


## 重複統合候補（2件）

1. origin/* マージ済みリモートブランチ 54本
   - git branch -r --merged origin/main でリストアップ
   - うち claude/* は 5本、feat/chore/fix 系は 49本
   - gh api でまとめて削除可能（PRマージ後の自動削除設定も検討）
   - オーナー確認: Vercel preview URL が残っているブランチは preview 削除後に実施

2. origin/claude/* 42本（未マージ 37本）
   - Claude Code の自動生成ブランチ。open PR がないものは残骸。
   - 現在アクティブな worktree に紐づくブランチは除外要。
   - gh pr list コマンドで open PR なしブランチを特定してから削除推奨。


## 観察事項（4件）

コード変更不要・情報共有目的の記録。

1. ANTHROPIC_API_KEY が .env.example に記載
   - CLAUDE.md § 5 に「Anthropic SDK はスタブのみ」と明記
   - .env.example への記載は開発者を混乱させる可能性あり
   - オーナー確認: スタブ以外での利用予定がないなら削除可

2. logs/ ディレクトリ肥大化
   - 総数 169 ファイル / 1.3MB
   - 第1弾スキャン時点 (2026-05-16) からさらに増加
   - alive-*.log だけで 63本。今後の運用ルール策定を推奨

3. robots.ts の disallow リストに削除対象ページが残存
   - /final-review-v3 と /strategy-discussion-v2 が disallow に明記
   - 上記ページを削除した後に robots.ts からも除去が必要

4. account/ リダイレクトページ 6本
   - account/api-keys, badges, heatmap, notifications, tutor, weakness
   - いずれも他ページへ redirect() するだけの 5行スタブ
   - 旧 URL → 新 URL のリダイレクトとして意図的なら問題なし
   - 意図的でないならオーナー確認推奨（削除 or 維持どちらか明示）


## 件数サマリ

カテゴリ               件数    推定削除可能サイズ
即削除推奨              8件    約 383KB (alive-*.log 63KB + old-essays 216KB + JSON 48KB + md 56KB)
アーカイブ推奨          3件    約 116KB
重複統合候補            2件    54本 + 37本のブランチ
観察事項                4件    -

重要注意: コード変更ゼロ。全削除はオーナー確認後の別ディスパッチで実施。
