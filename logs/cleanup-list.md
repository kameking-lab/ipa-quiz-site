# Repo Cleanup List — 2026-04-26

実行ブランチ: `claude/jovial-lalande-6dc56e`（rebase onto origin/main 6a8987f）

## 削除前ベースライン
- リポジトリ総量: **22 MB / 21,220,027 bytes**（node_modules / .git 除く）
- logs/ 合計: 105 KB

## スキャン結果まとめ

| カテゴリ | 検出数 |
| --- | --- |
| .DS_Store / Thumbs.db / *.tmp / *.bak / *.swp / *.old / *.draft | 0 |
| *.tsbuildinfo / .turbo キャッシュ | 0 |
| ビルド出力 (.next, out/, build/) | 0（gitignore で除外済み） |
| ローカル PDF (data/raw_pdfs/) | 未存在（gitignore） |
| 空ファイル | 0（`logs/.gitkeep` のみ、これは保持） |
| TODO のみのファイル | 0 |
| 未 import の .ts/.tsx | 1（要判断、`cleanup-questions.md` 参照） |

→ 既存の .gitignore（`/logs/*.json`, `/logs/backup_*.ts`, `/data/raw_pdfs/`）が機能しており、典型的なゴミファイルの混入はゼロ。

## 削除対象（確実に削除可能）

### A. 1巡目 激辛レビュー ログ（完了済み・git 履歴に残る）

CLAUDE 指示書の安全策に従い、git log には完全保全されているのでファイル削除のみ実施。

- `logs/review-loop-1.md` (4.7 KB)
- `logs/review-loop-2.md` (4.2 KB)
- `logs/review-loop-3.md` (2.8 KB)
- `logs/review-loop-4.md` (3.4 KB)
- `logs/review-loop-5.md` (4.7 KB)
- `logs/review-loop-6.md` (4.1 KB)
- `logs/review-loop-7.md` (4.0 KB)
- `logs/review-loop-8.md` (4.0 KB)
- `logs/review-loop-9.md` (4.3 KB)
- `logs/review-loop-10.md` (5.4 KB)
- `logs/major-issues.md` (2.2 KB) — 1巡目の Major Issues
- `logs/final-report.md` (7.2 KB) — 1巡目最終レポート

合計: 約 51 KB / 12 ファイル

**根拠**:
- ユーザー指示「1巡目 review-loop-*.md はアーカイブ後削除可」
- 全 10 ループとも完了済み（最終ループ Loop 10 にて「最終ループ」明記）
- Round 2 は別系統（`docs/review-loop2-*.md`）で並行稼働中、こちらの記録は別ファイルなので影響なし
- git log で再アクセス可能（コミット 4c17b15 以前すべて参照可）

## 保持理由つき除外リスト（誤削除防止メモ）

- `logs/.gitkeep` — 空ディレクトリ維持の慣例ファイル、保持
- `logs/ui-redesign-progress.json` — 別ブランチ `claude/practical-meninsky-5a5165` の進行中UI再設計の進捗記録（git 追跡済み）。**保持**
- `logs/major-issues-2.md` — Round 2 関連、`cleanup-questions.md` で判断仰ぐ
- `data/refactor-input/*.json` — 解説リファクタの入力ファイル（メモリにある進行中タスク）。**保持**
- `scripts/fix-question-data-types.ts` / `scripts/verify-prod.mjs` — package.json には未登録だがファイル冒頭に手動実行手順あり、運用ツールとして **保持**
- `lib/analytics/events.ts` — 未 import だが `app/admin/stats/page.tsx:100,195,199` で文字列参照あり（将来用基盤）。`cleanup-questions.md` で判断仰ぐ
- `HANDOFF_FROM_CURSOR.md` — 古い（2026-04-17）が contents が判断要素。`cleanup-questions.md` で判断仰ぐ

## 削除後ベースライン

- リポジトリ総量: **22 MB / 21,174,254 bytes**（−45,773 bytes）
- logs/ 合計: 33 KB（−72 KB）

## 削減カテゴリ別内訳

| カテゴリ | ファイル数 | 削減サイズ |
| --- | --- | --- |
| 1巡目 review-loop-*.md | 10 | 約 41 KB |
| 1巡目 major-issues.md | 1 | 2.2 KB |
| 1巡目 final-report.md | 1 | 7.2 KB |
| **合計** | **12** | **約 51 KB（git ls-files基準は 45 KB）** |

## ビルド検証

- `pnpm typecheck`: ✅ 通過（exit 0、`tsc --noEmit`）
- `pnpm build`: ✅ 通過（`✓ Compiled successfully in 6.4s` / `✓ Generating static pages 2015/2015 in 9.4s`）

