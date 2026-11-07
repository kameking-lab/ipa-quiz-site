# zoen1（1級造園施工管理技術検定 第一次検定）補充報告 2026-11-06

## 対象回と根拠
- 令和8年度第一次検定（2026-09-06実施）。公式一覧 https://www.jctc.jp/mondai/
  - 問題A https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_mondaia.pdf （SHA256 fd2af674…）
  - 問題B https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_mondaib.pdf （SHA256 f3b0df0c…）
  - 正答肢 https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_seitou.pdf （SHA256 6faa5bee…）
  - 2026-11-06に再取得し、既存データ記録のSHA256と一致。

## 追加問数
- 24問 → 65問（全問）。
  - 未マージの `origin/codex/zoen1-owner-batch10-20261011`（補充5〜10の累積、34問・図版5点・根拠資料）を取り込み。
  - 残り7問（問題A No.11/16/20/27/28、問題B No.19/27）を新規作成（`2026-september-supplement11.json`）。
- 全65問の正答を公式正答肢PDFの画像読取り値と照合するテスト `__tests__/questions/zoen1-supplement11.test.ts` を追加。

## 独立レビュー
- 別エージェント（read-only）で41問を照合：PASS（`reports/zoen1-review.md`）。P2（B27の届出先の書き方）とP3（A11景養木の説明）を修正済み。

## 除外・未解決
- 除外なし。B27は「全て選べ」形式だが公式正答は(2)のみで、そのまま単一正答として収録。
- 問題B No.24〜29の共通前提（工事数量表・工事に係る条件）は既存の公開分と同じく本文に含めていない（全体の課題）。
- 2回目（令和7年度）は問題PDFが公開終了（正答肢のみ残存）。令和9年度試験の公表まで不可。
- 文言更新は `reports/zoen1-registry.md`。
