# LQ4C 作業報告（2026-11-04 JST）

判定：部分完了。前回残518原問のうち、新規73原問・365肢解説を内容検収PASSにした。前回の2原問を含む受入済みは75/520原問、残り445原問・2225肢。2資格全体の完成・公開接続は未完了。

## 作業場所・条件

- worktree：`C:/Users/kanet/20260522/wt-LQ4B`
- branch：`qual/lq4b-integration-20261104`
- 開始時HEAD：`028e4a4fa`。元のipa-quiz-siteの作業中変更には触れていない。
- オーナー決定（2026-11-04 01:30）による権利確認済みの条件を採用。権利・過去の取得STOPを停止理由としていない。アクセス制限の迂回なし。
- 作業開始：03:00:59 JST。40分の区切りに向けて動作する状態を保存。push・PR・デプロイ・公開・本番DB操作は実施していない。

## 内容・受入記録

新規稿は `data/qualification-staging/lq4c-biru-kan/` と `lq4c-engineer-first/`。ビル管理は2024・2025年午前各Q1–20と、受入票に記載した2025年の追加分を受入済み。技術士適性の受入済み範囲は `acceptance.json` のquestionIdsが正本。前回の年度別Ⅱ－9は変更していない。

本文・選択肢・公式正答・総合解説・全5肢理由・出典URL・PDFページ・原典SHAを保持。2条件のOCRは原画像で裁定した。必要図は2024適性Ⅱ－12のJISマーク、2025適性Ⅱ－14のALARP図を公式PDFから直接切出し、パス・SHA・切出し座標・dpi・altを付けた。図は再描画していない。

`reports/lq4c-20261104/acceptance.json` は受入票、`reviewed-manuscripts/` はレビュー対象そのものの保存版。レビュー対象SHA・現在稿SHA・受入時メタデータを除いた内容SHA・レビュー票SHAを結合した。内容・票・図の改変、重複、文字化け、正答不一致を専用validatorで検出する。

共通ローダーには未登録。全稿 `publicGo:false`。3資格統合済みアプリの実行コードには変更を加えていない。

## 独立レビュー

全回、指定の `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra` を使用（read-only）。票は `independent-review*.md`、プロンプト・終了コード・実行記録は同じreportディレクトリ。FAIL票も残した。文字化け、法令・解説の精度、参照法令ID、受入票の内容結合不足などを修正し、対象範囲の再レビューPASS後にのみ受け入れている。

内容PASS：review3・4・7・9・12・13・15・17・18。review16で指摘された原文転記2か所を修正し、review17で変更点の画像一致と他の全バイト不変を確認してPASS。validator・受入票のコードはreview8のFAILを修正しreview11 PASS、図の検証追加はreview14 PASS。各票は当時の限定範囲の判定であり、全520原問を審査した票ではない。

review15の任意改善提案：2025適性Ⅱ－3の参照先へ公式問題・正答PDF、Ⅱ－6の参照先へDEI宣言本文URLを追加すると直接性が高まる。内容FAILではなく、受入対象の原稿自体は変更せず保存した。review18にもQ21・22・31の参考URLをより直接的な資料へ補う任意提案があり、レビュー票に一次資料が記録されている。

## 検証

- `corepack pnpm validate:questions`：終了0、26,873問、fail0、既存warn16,854。ステージング稿はこの共通件数に含まれない。
- `corepack pnpm typecheck`：終了0、診断なし。`NODE_OPTIONS=--max-old-space-size=12288`。
- 関連Vitest：終了0、25ファイル・282テスト成功。実行対象は下記コマンド。
- `node --test scripts/validate-lq4-staging.test.mjs`：終了0、14テスト成功。内容や図の改変・不正な完成宣言等を実際に拒否するテスト。
- 変更MJSのESLint：終了0。
- `node scripts/validate-lq4-staging.mjs --require-reviewed --sources`：最終結果は `staging-validation-final.json`。14本の保存原典SHA、受入全稿・レビュー対象版・図を検査する。
- `git-blob-verification.json`：コミット済み稿・レビュー票・保存版・図をGit blobで読み戻して照合。最終コミットのハッシュ一覧はGitから確認できる。
- 今回はビルド・ブラウザ検収の再実行なし。前回LQ4Bの成功記録を今回実施したとは扱っていない。関連コード変更は単独validatorのみ。

```powershell
corepack pnpm exec vitest run qkensetsu chizai2 kisho ReviewClient practice-session questions-filter category-pool exam-config-integrity QuizModeTabs PracticeSessionTabs QuizClient.year get-questions questions-load exam-library-coverage question-jsonld question-meta --maxWorkers=2
```

検証ログ・終了コード・ログSHAは `checks-final.json`。独立レビュー実行記録は `review-executions.json`。hash付き票や原稿の改行・Markdown末尾空白を一括整形しない。

## 次回の再開

```powershell
Set-Location C:/Users/kanet/20260522/wt-LQ4B
git status --short
git log -6 --oneline
Get-Content -Raw -Encoding utf8 reports/lq4c-20261104/acceptance.json
node scripts/validate-lq4-staging.mjs --require-reviewed --sources
node --test scripts/validate-lq4-staging.test.mjs
```

未受入の正確な全番号は `reports/lq4c-20261104/remaining-originals.json`。図や組合せ表を含めて全問転記・全肢説明・独立レビューを継続する。ビル管理は2024年Q21–180（160問）、2025年Q23–29・33–180（155問）、計315原問が残る。技術士は両年度の適性15問ずつ計30問が揃った。基礎各30・機械各35の計130原問が残る。機械2024Ⅲ－28・2025Ⅲ－32は公式採点例外（選択した受験者全員に得点）のまま保持し、通常正答を捏造しない。

専用validatorの技術士印字番号チェックは今回の適性（Ⅱ）向け。基礎（Ⅰ）・機械（Ⅲ）に着手するときは科目別に拡張し、採点例外も扱う検証を追加する。全520問の内容・必要図が揃ってから共通ローダー登録と導線等のテストを行う。

原典取得をやり直す必要はない。保存済み14PDF、両OCRと画像：`C:/Users/kanet/AppData/Local/Temp/codex-work/lq4b-sources/`。索引：`reports/lq4b-20261104/source-inventory.json`、`official-answer-index.json`、OCR索引。前回バックアップZIP：`C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lq4b-source-preparation.zip`。保存場所が失われた場合は前回報告のSHAを確認してZIPから復元する。

現時点の未受入稿：なし（作成済み稿はすべて受入済み）。

## ローカルコミット

```text
bf96d7452 content(lq4c): complete both aptitude years and accept five hygiene originals
16c5b1fff content(lq4c): accept 27 originals and verify original figure assets
5d5310752 content(lq4c): accept 20 more originals and bind reviews to exact snapshots
427e55c80 content(lq4c): accept 15 source-verified building hygiene and engineering originals
```

報告・検証結果保存の後続コミットは `git log` で確認する。未完了は内容制作の残作業であり、権利保留・原典未取得によるものではない。

## 40分時点の保存

追加制作は終了。新規73原問・365肢、累計75原問、残445原問を保存済み。内容・原典・受入票の整合はreview19/20でPASS。review19が求めた証跡コミットはeb1b86ebaで実施。review20が検出した初期プロンプト/終了コード8ファイルの作業コピー改行差は、HEADの実バイト列で復元済み（原稿・票・図には変更なし）。この8ファイルだけreview21で再確認中。残問は内容制作の未了であり、未受入の草稿はない。
