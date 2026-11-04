# LK5 ローカル引継ぎ記録（2026-11-04）

## 到達点

**部分完了。本文収録は0/400問。** オーナー決定（2026-11-04 06:10）を反映し、二級建築士・木造建築士の台帳を `permission-required` から `ready-to-ingest` に戻した。公式の転載禁止表示によるプロジェクト上の停止指定は解除。権利者の許諾取得を意味しない。

エージェントが外部サイトから取得した著作権保護対象の問題本文・選択肢・図版を全問大量転載する作業には対応できないため、今回は出典メタデータと数値の公式正答までを追加した。ユーザー提供PDFを用いた整形・解説追加として再開する。これはSKILL.mdによる確認待ちや自動承認レビューによる拒否ではない。オーナーに収録対象としての承認を再要求しているものでもない。

`data/qualification-staging/kenchikushi2/source-manifest.json` に両資格の2026・2025年各100問、計400問の予定数、問題8PDF・正答4PDFのURL、HTTP状態、SHA-256、ページ数、公式正答400件を記録。`publicAllowed=false`、`ingestionState=source-metadata-only`、`ingestedQuestionCount=0`。実体のない `Question`、生成類題、図表を落とした代替問題は作成していない。ExamCode・公開問題レジストリ・公開ルートへ接続していない。

## 取得と出典

- 二級公式一覧: https://www.jaeic.or.jp/shiken/2k/2k-mondai.html
- 木造公式一覧: https://www.jaeic.or.jp/shiken/mk/mk-mondai.html
- 直近2回はどちらも令和8年・令和7年。前回報告と同じ12URLを通常アクセスで取得し、全てHTTP 200・PDF形式を確認。
- **取得不能PDF一覧: なし（0/12）**。ログイン、CAPTCHA、ボット拒否の迂回はしていない。
- 全12URLはmanifestに収録。ローカルPDF・確認画像はgit対象外の `.cache/lk5/`。原PDF・抽出草稿はコミットしない。
- 公式一覧注意事項3は個人利用以外の無断転載・複製を禁止。問題表紙にも禁止表示がある。表示を記録したが、これを全問非掲載・取得不能と判定していない。
- 公式正答は4枚の表画像を確認し、各25問×4科目の固定テストと別のPDF文字抽出結果を照合した。本文と正答の対応確認・全図表の目視校合は未実施。
- 2026年の法令基準日は2026-01-01。2025年は原則2025-01-01だが、表紙指定の令和4年法律第69号と関係政省令に基づく規定は2025-04-01。manifestの例外欄に記録した。現行法での置換はしていない。
- PDFの公開年月日、実際の試験実施日は今回未確定。確認日・年次・法令基準日と混同しない。

## 作業場所

- worktree: `C:/Users/kanet/20260522/wt-kenchikushi2`
- branch: `qual/kenchikushi2-20261104`
- 起点: `8258da1431784ae0b95033f3b47c93ae89ac4131`（`origin/claude/ecstatic-ride-tfc4jt` と一致）
- 変更: 台帳、前回報告への追記、未公開メタデータ、取得監査スクリプト、公式正答と未公開維持のテスト。
- push・PR・デプロイ・main操作は実施しない。

## 検証

- 環境のpnpm 9.15.9ではfrozen installがoverrides不一致で失敗。リポジトリ指定の `corepack pnpm` 10.33.0で `install --frozen-lockfile` 成功。lockfile変更なし。
- `corepack pnpm validate:questions`: PASS。26,444問、fail=0、warn=16,808（前回と同数）。今回の出典メタデータはQuestionデータではなく、この検査の対象外。
- `corepack pnpm exec vitest run __tests__/questions/kenchikushi2-staging.test.ts __tests__/lib/home-directory.test.ts __tests__/questions/live-qualification-coverage.test.ts`: PASS、3ファイル20テスト。新規テストは公式正答400件と未公開維持を検査。
- `NODE_OPTIONS=--max-old-space-size=8192 corepack pnpm typecheck`: PASS。
- `git diff 8258da143 HEAD --check`: PASS。初回コミットでCRLF警告を見落としたため、次コミットでLFと生成処理を修正。正答データは不変。修正後のステージング2テストも再実行してPASS。
- 独立レビューは指定どおり `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` を別プロセスで2回実施。初回 `0f273810f` は「差分品質PASS／依頼全体INCOMPLETE」、軽微なCRLF指摘。修正後 `562051674` の再レビューも「差分品質PASS／依頼全体INCOMPLETE」、修正必須の欠陥なし。原文・全肢解説の品質を検証したPASSではない。
- レビュー原文: `reports/lk5-kenchikushi2-review-1.md`、`reports/lk5-kenchikushi2-review-2.md`。外部報告先にも `lk5-review-1.md`、`lk5-review-2.md` として保存。

## コミットと引継ぎ成果物

- `0f273810f`: 台帳の停止解除、未公開の出典メタデータ・公式正答400件、テスト、報告。
- `562051674`: manifestのLF固定・確認日の自動取得。
- この報告と独立レビュー原文は最後の文書コミットに保存。
- 指定の外部報告: `C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lk5-report.md`（本書のコピー）。
- 所要は約12分で区切り。残る作業は資料入力に依存し、40分までの待機で解消するものではないため、再開位置を明示して引き継ぐ。

## 次回の再開位置

1. ユーザー提供PDFを用いる本文変換として再開。オーナー決定は済んでおり、対象選定の再承認は不要。
2. 二級2026年学科I問1から開始。学科I〜IV各25問、2026・2025年、続いて木造の同2年で計400問。全5肢、図表、独自の全肢解説を保持する。公式正答はmanifestに準備済み。
3. 木造2026年施工問12は前回の文字抽出欠落箇所。PDF18ページ（施工17ページ）の画像で本文・5肢・第三者図版注記を確認する。抽出欠落だけで非掲載扱いにしない。
4. `docs/two-round-question-ingestion.md` に従い、原文・数値・選択肢順・図表・正答と一次根拠を照合。人手で確認した問題だけ `needsReview` を解除する。`publicAllowed=false` を維持して段階コミットし、本文を含めて検証・独立レビューを再実施する。

今回の検証・レビューがPASSでも、本文・図表・全肢解説400問の完了を示さない。
