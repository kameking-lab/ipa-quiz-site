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
# LQR1 ローカル独立レビュー：浄化槽管理士

実施日：2026-11-04 JST。既存2025・2026年度の各80問、計160原問のみ。新しい回の追加なし。

- 起点：`origin/claude/serene-bohr-pmlt6o` / `e501dacaa5e13ab28c837df59b830b2ed55a35f3`
- ブランチ：`qual/jokaso-review-20261104`
- worktree：`C:/Users/kanet/20260522/wt-LQR1-jokaso`
- オーナー決定2026-11-04 01:30：権利確認済み。これは決定時刻であり停止期限ではない。権利・過去STOPを理由とする停止、アクセス制限の迂回なし。

## 公式資料との照合

`reports/jokaso-latest2/source-manifest.json` の公式問題4本・正答2本を公式URLから再取得。全6本のSHA-256はクラウド記録と一致。原本と新規抽出テキストは `C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lqr1-evidence/jokaso/sources/` に保存。実装担当側でも公式正答をPyMuPDFで新規抽出し、全160問の公式正答番号の一致を確認した。図版2025問56、2026問21・45・80等も画像で確認した。

## 指定CLIによる独立レビューと修正

両回とも `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only -C C:/Users/kanet/20260522/wt-LQR1-jokaso -o <review-output> -` を使用。

初回は160問・800選択肢・800全肢解説・図版20点を原本と照合し、正答160/160一致、図版の原本一致、未公開ガードを確認。そのうえで以下2件を指摘してFAILとなった。

1. **2025問56のろ材容量**：ろ材高さの参照を誤った `1.150−0.500` から、原図の `Z3−Z5＝1.000−0.300＝0.700 m` に訂正。容量は `X2×Y×高さ＝0.570×1.000×0.700＝0.399 m3`。全肢と総合解説を整合させた。正答2（0.4 m3）は変更なし。
2. **2026問21のエアリフトポンプ**：誤答肢の「揚程と一致しない」という反復を、各矢印の起点・終点の説明に変更。イは水面～給気位置、ウは水面～吸込口、エは給気位置～吐出位置、オは吸込口～吐出位置で、揚程ア（水面～吐出位置）との違いを明示した。正答1は変更なし。

第2回は **PASS・追加指摘なし**。公式正答PDFから160問を再抽出して一致し、修正2問の解説を公式図と直接再照合。未変更部分は初回の全件レビューを引き継いだ。公開ガードも再確認した。初回回答は `reports/lqr1-independent-review-20261104-initial.md`、最終回答は `reports/lqr1-independent-review-20261104.md`。

変更は上記2問の解説だけであり、全160問の問題本文・選択肢・公式正答・原図・回数が元ブランチから変わらないことも別途比較した。

## 修正後の検証

- `pnpm validate:questions`：26,604問、fail=0（既存警告16,808件）。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：終了コード0。
- `pnpm exec vitest run __tests__/questions/jokaso-latest-two.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/questions/eisei2-two-publications.test.ts`：4ファイル・1,079テスト合格。
- `git diff --check`：成功。
- 既存依存インストールをnode_modulesジャンクションで再利用。双方のpnpm-lock.yamlは改行正規化後のSHA-256が `456c76de0140f54c4f8b11ccb89b9949f3b130eaa88c0bbd20176185663e48ae` で一致。依存・ロックファイル変更なし。

検証ログの最終版は外部証拠フォルダの `jokaso-{validate,typecheck,tests}-final.log`。全体ビルド・ブラウザE2E、解説全記述を別の外部専門資料で裏付ける作業は未実施。資格は未公開のまま。push・PR・デプロイなし。
