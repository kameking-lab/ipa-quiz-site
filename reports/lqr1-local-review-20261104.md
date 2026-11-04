# LQR1 ローカル独立レビュー：給水装置工事主任技術者

実施日：2026-11-04 JST。既存2025・2026年度の各60問、計120原問のみ。新しい回の追加なし。

- 起点：`origin/claude/loving-galileo-852qa2` / `c09698750048767b66d0b5e346e7faa26b56a9fc`
- ブランチ：`qual/kyusui-review-20261104`
- worktree：`C:/Users/kanet/20260522/wt-LQR1-kyusui`
- オーナー決定2026-11-04 01:30：権利確認済み。決定時刻であり停止期限ではない。権利・過去のSTOPを理由とする停止もアクセス制限の迂回もなし。

## 公式照合

保存済み公式問題4冊・公式正答2冊を使用。`source-manifest.json` の全9資料と126画像のハッシュ一致を確認した。実装担当側でも公式PDFから正答を新規抽出し、120問すべての採点データと照合した。2025問18は正答番号を作らず、2ページ目の「正答肢なし・受験者全員」通知と全員正解の採点方式を確認した。

原本画像126枚をPyMuPDF 1.28.0で保存PDFから再描画し、全126枚が画素一致。本文4,435語の中心点すべてが切出し範囲に入ることも確認した。証拠は外部作業フォルダ `C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lqr1-evidence/` の `answer-audit.json` と `kyusui-region-audit.json`。

## 指定CLIによる独立レビュー

`C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only -C C:/Users/kanet/20260522/wt-LQR1-kyusui -o <review-output> -`

初回は日本語標準入力がWindowsの文字コードで崩れて未完了。英語の同等指示で再実行し、第2回は **PASS・修正要求なし**。最終回答を `reports/lqr1-independent-review-20261104.md` に保存した。独立レビューでは120問・540肢、公式正答120問、採点660ケース、全126画像の画素、本文図形1,533件の切出し範囲を確認。図・計算関係10画像は追加目視した。既存クラウドレビューのPASSを今回の根拠にはしていない。

## 検証

- `pnpm validate:questions`：既存標準形式26,444問、fail=0、既存警告16,808件。給水の専用形式120問はこの共通バリデータの対象外で、下記専用テストと今回の原本照合で検証した。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：終了コード0。
- `pnpm exec vitest run __tests__/questions/kyusui-staging.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/questions/qualification-expansion.test.ts`：3ファイル・1,080合格・2スキップ。
- 2スキップは任意のPopplerによるPDF抽出テスト。Git付属のXpdfは `-v` の終了コードが99のためPopplerとして扱われない。今回PyMuPDFで正答全件・全画像・本文領域を別途実検証した。
- `git diff --check`：成功。
- 既存の依存インストールをnode_modulesジャンクションで再利用。双方のpnpm-lock.yamlは改行正規化後のSHA-256が `456c76de0140f54c4f8b11ccb89b9949f3b130eaa88c0bbd20176185663e48ae` で一致。依存・ロックファイル変更なし。

今回修正が必要な不備は確認されず、問題データ変更なし。未公開stagingを維持。補足根拠URLの全件再取得、全体ビルド、ブラウザE2Eは未実施。push・PR・デプロイなし。
