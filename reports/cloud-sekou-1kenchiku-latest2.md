# 1級建築施工管理技術検定（第一次検定）直近2回の監査

確認日: 2026-11-03（UTC）。末尾に今回の再確認結果を追記。本文の既存監査・レビュー記録は前回作業から引き継いだもの。

## 今回の結果

**教材追加は未完了、追加0問。令和8・7年度の公式PDF原本を本環境で直接取得できず、全問の公式正答・必要図版を確認できないため収録保留。** 未公開のままであり、「公開できる状態まで完成」とは判定していない。

依頼に明記されたオーナー決定に従い、権利は確認済みとして取り扱う。旧監査の「転載禁止表示を理由に収録中止」という判断を撤回し、本報告で更新する。公式の転載条件や過去のSTOP記録は今回の収録保留理由にしていない。資格台帳も `permission-required` から既存の未公開状態 `ready-to-ingest` へ修正した。問題データの登録や公開ルートの追加は、原本照合の完了後に行う。

## 対象回と根拠

実施機関: 一般財団法人建設業振興基金 試験研修本部。

公式の[過去の受検状況・検定問題・合格基準](https://www.fcip-shiken.jp/about/index.html)の「検定問題・正答肢」で、建築施工管理技術検定・1級・第一次検定の現行掲載が令和8年度であることを確認した。令和7年度・令和7年度臨時試験という同じ行の他のリンクは第二次検定なので対象外。

令和7年度第一次検定は検索で発見した公式ドメインのPDFをWeb閲覧で開き、表紙の年度・級・区分・実施日を確認した。令和8年度と令和7年度の第一次検定を対象とする。URLの年度部分の推測や、第二次検定の実施回の流用による選定ではない。現行の一覧表に令和7年度第一次検定へのリンクが残っているという主張もしない。

| 対象回 | 実施日 | 公式問題・正答肢PDF | Web閲覧上のページ数 | 対象番号 | 追加問数 |
| --- | --- | --- | --- | --- | --- |
| 令和8年度 第一次検定 | 2026-07-19 | [r08_1kg_mondai.pdf](https://www.fcip-shiken.jp/pdf/r08_1kg_mondai.pdf) | 38 | No.1–72 | 0 |
| 令和7年度 第一次検定 | 2025-07-20 | [r07_1kg_mondai.pdf](https://www.fcip-shiken.jp/pdf/r07_1kg_mondai.pdf) | 39 | No.1–72 | 0 |

問題番号と表紙の指示から、収録対象は各72問、計144問（試験で解答するのは各60問）。午後No.51–60は五肢択一式であり、類似資格の四肢固定変換をそのまま使ってはならない。令和8年度の午前No.21–30は7問選択・No.31–40は8問選択、令和7年度はそれぞれ8問選択・7問選択である。上記は全問照合済みの収録数を意味しない。

## 取得できないPDFと確認限界

| 資料 | 直接取得の結果 | 現時点でできない作業 |
| --- | --- | --- |
| [令和8年度 問題・正答肢](https://www.fcip-shiken.jp/pdf/r08_1kg_mondai.pdf) | 通常のHTTPS GETが403、curl終了22 | 原本保存、必要図版の切り出し・照合、全公式正答照合 |
| [令和7年度 問題・正答肢](https://www.fcip-shiken.jp/pdf/r07_1kg_mondai.pdf) | 通常のHTTPS GETが403、curl終了22。HEADではCONNECT tunnelの403も発生 | 同上 |

Web閲覧ツールではPDFの表紙・問題本文の抽出テキストを参照できた。しかし、抽出テキストは令和8年度がNo.72のPDF35ページ目（0起算）、令和7年度がNo.72の36ページ目（0起算）で終わり、正答表の内容を取得できなかった。PDFの図版・最終ページへのスクリーンショット要求も、本セッションに返るのは参照文字列だけで画像データはなかった。したがって「公式PDFが一切閲覧できない」とは扱わない一方、全正答と必要図を確認できたとも扱わない。

403の発生元を試験実施機関のボット拒否と断定しない。プロキシの拒否を含む取得上の制限として記録する。ログイン・CAPTCHA・取得拒否を迂回する操作は行っていない。PDFを取得できない場合は一覧にして報告するという依頼条件を適用した。公式が全問・正答を非公開にしているとの判定でもない。

資格ごとの追加問数: **1級建築施工管理技術検定（第一次検定）0問**。収録保留: 両年度計144問。原本による全問の本文・全選択肢・正答・図の検収、独自の全選択肢解説の作成は未実施。生成問題や推測正答による補完はしていない。再開には両PDF原本を通常の許可された方法で取得できる環境、または正規に取得済みの原本が必要。

## 転載条件の記録

[公式過去問ページ](https://www.fcip-shiken.jp/about/index.html)末尾に次の表示がある。

> 本サイトに掲載されている記事・写真・図表などの転載を禁じます。

この表示は記録にとどめ、依頼のオーナー決定により収録の阻害条件にはしない。新たな許諾取得や権利再確認は依頼しない。

## 作業前の重複確認

開始時HEAD: `2edf160334dcc496080910cddd63674e446b4c9f`。ブランチ: `codex/cloud-sekou-1kenchiku-latest2`。

- 現在の `data/questions`、`data/exam-library`、`data/qualification-staging` に当該資格・回の問題データはなかった。`lib/qualifications/catalog.ts` には旧 `sekou-kenchiku1` 台帳のみ存在。
- 元ワークスペースの `.git` が読み取り専用でfetchできなかったため、`/tmp/sekou-1kenchiku-git` の作業用Gitリポジトリでoriginをfetchした。元の `.git` の権限は変更していない。
- originの `claude/*` 106本、`codex/*` 266本、`qual/*` 0本、計372本の先端を確認。対象4パスのGitオブジェクト構成が同じものをまとめた242組を検索した。
- 検索式: `建築施工|fcip-shiken|sekou-1kenchiku|1kg_mondai|kenchiku1`。各代表ブランチで `git grep -n -I -E` を実行。関連記述のあるブランチは311本だが、問題データ・exam-library・stagingでの一致は0件。
- 既存の本ブランチと旧レポートは0問の監査成果であり、依頼の補足に従い教材の重複とは扱わない。

詳細な走査結果は作業ログ `/tmp/sekou-current-duplicate-scan.json` に保存（この一時ファイルはコミット対象外）。

## 既存方式と公開状態

類似資格 `data/questions/civil1/index.ts` は年度・冊子別JSONから原問・公式正答番号・全肢解説・図・出典を `Question` に変換する。登録は `data/questions/index.ts`、遅延読込は `lib/questions/get-questions.ts`、設定は `lib/exam-config.ts` と `lib/questions/types.ts` を使用する。公開制御は資格台帳の `isExamPublished`、資格一覧は `app/qualifications/page.tsx` の `status === "live"` による。既存のステージング置場は `data/qualification-staging` にある。

今回は台帳の状態と監査報告を更新した。未照合データをステージング完成品として登録せず、examCode・問題ローダー・exam-library・公開ルートは追加していない。台帳にexamCodeがない場合だけでは公開ゲートにならない設計のため、未登録コードを既存の公開レジストリへ追加しないことも確認した。`ready-to-ingest` は権利確認後の収録待ちを示し、教材検収済みを意味しない。

## 今回の検証

- `pnpm install`: Prisma Client生成とインストール完了表示まで進んだが、既定キャッシュ先への任意プラットフォームパッケージ取得に `ERR_PNPM_EROFS` が出た。書込可能なキャッシュを指定し `pnpm install --offline --config.cache-dir=/tmp/sekou-pnpm-cache` で再実行、終了0（4.7秒）。既存ロックファイルを使用し、Prisma Client生成成功。
- `pnpm validate:questions`: 終了0。26,444問、`fail=0`、既存警告 `warn=16808`。追加問題は0問。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`: 台帳変更後の最終実行が終了0、型エラーなし。
- `pnpm exec vitest run __tests__/lib/exam-config-integrity.test.ts __tests__/lib/home-directory.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/exam-library-integration.test.ts __tests__/exam-library-coverage.test.ts`: 台帳変更後の最終実行が終了0、6ファイル・1,099テスト成功。
- `git diff --check`: 成功。

ログは `/tmp/sekou-current-install-offline.log`、`/tmp/sekou-current-validate.log`、`/tmp/sekou-current-typecheck-final.log`、`/tmp/sekou-current-tests-final.log`。終了コードは親セッションの実行ツールの結果で確認し、全ログに終了コードを埋め込んだとは主張しない。これらは既存データおよび台帳変更の検査であり、未作成144問の内容検収ではない。

`pnpm build`・デプロイ・Vercel操作・PR作成・mainへのpushは行わない。コミットと専用ブランチへのpushは書込可能な `/tmp/sekou-1kenchiku-git` のGit管理領域を用い、ワークツリーを元のリポジトリに指定して行う。元の読み取り専用 `.git` のHEADやインデックスは更新できないため、元ワークスペースでは2ファイルの差分が残る。

## 今回の独立レビュー

指定コマンド `codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check` は、本環境の読み取り専用制約により起動失敗。`--ephemeral`、`sqlite_home`・`log_dir` の一時領域への変更等でも解消しなかった。ファイル操作のみのstraceで `~/.codex/installation_id` を `O_RDWR|O_CREAT` で開く操作の `EROFS` を確認した。権限制約の解除や `HOME`・`CODEX_HOME` の置換は行っていない。

代替として、指定と同じモデル `gpt-6-astra`・推論設定 `medium` の、履歴を引き継がない別Codexを独立レビュアーとして起動した。CLIによるレビュー成功とは主張しない。

初回判定は **PASS、具体的な修正指摘なし**（台帳・監査更新の正確性のみ）。レビュアーは公式Webで対象回・実施日・ページ数・五肢形式・午前の選択数の差を独立確認し、正答表が抽出されずスクリーンショットが参照文字列のみとなる現象も再現した。Git走査を独立再実行し、372本・242組・関連311本・教材一致0件と元の走査JSONの全内容一致を確認した。検証ログと報告の数値・記述、および差分チェックも確認済み。

独立確認の限界: fetch・テスト・PDF直接GETの再実行は行っていない。令和7年度の403終了22はログで確認したが、令和8年度のGET403とCLI起動時straceの詳細、検証コマンドの終了コードは親セッションの実測結果に依存する。CLIの起動失敗EROFSログ自体は確認済み。全問・全図・正答の内容検収は未実施。

結果を追記した最終版は **再レビューでも最終PASS、修正を要する指摘なし**。レビュアーは報告全文・台帳・ステージ済み2ファイルの差分を照合し、初回結果と確認限界の記録が正確で、未ステージ差分がなく、`git diff --cached --check` が成功することを確認した。合格判定の対象は今回の台帳・監査更新の正確性であり、未作成の144問の教材内容の合格ではない。


## 追加依頼を受けた今回の再確認（2026-11-03 UTC）

今回の開始時点で `/tmp/sekou-1kenchiku-git` の作業用Git管理領域には `b2a445e7`（権利確認済みへの台帳更新・取得保留監査）があり、originの専用ブランチも同コミットを指していた。元ワークスペースにはこの結果が既に反映されていた。旧監査・この0問の監査は教材重複と扱わない。

公式一覧と両PDFをWeb閲覧で再確認した。令和8年度第一次検定と令和7年度第一次検定の原本は参照できるが、正答表の抽出内容はなく、末尾ページのスクリーンショットも参照文字列しか返らない。両PDFへの通常の `curl --fail --location --max-time 30` はいずれもHTTP 403・終了22。取得拒否の迂回はしていない。上記の取得不可PDF一覧は今回も有効であり、全144問を保留、追加0問・未公開を継続する。権利・転載条件は保留理由ではない。

今回も書込可能な作業用Git管理領域で `git fetch origin` が終了0。fetch後にoriginの `claude/*` 114本・`codex/*` 267本・`qual/*` 0本、計381本を再走査し、245組の対象パス構成・関連320本、問題データの一致0件を確認した。ローカルの `data/questions`・`data/exam-library` にも教材はない。fetch完了前の走査は372本・243組・関連311本で教材一致0件だった。前掲の過去記録との差はoriginの取得更新による。

今回改めて次を実行した（新規問題の内容検収ではない）。

- `pnpm install --offline --config.cache-dir=/tmp/sekou-pnpm-cache`: 終了0。
- `pnpm validate:questions`: 終了0、26,444問、fail=0、既存警告16,808件。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`: 終了0。
- 前掲6ファイルの関連Vitest: 終了0、1,099テスト成功。

ログ: `/tmp/sekou-recheck-install.log`、`/tmp/sekou-recheck-validate.log`、`/tmp/sekou-recheck-typecheck.log`、`/tmp/sekou-recheck-tests.log`。

指定CLIの再試行（同じ指定に `--ephemeral` を追加）は、今回も `failed to initialize in-process app-server client: Read-only file system` で終了1。CLIレビューは実行できていない。代替の別Codexセッションによるレビューは以下に結果を追記する。教材完成・教材レビュー合格とは扱わない。

今回の代替独立レビュー（別Codex、`gpt-6-astra`・推論 `medium`、親の会話履歴なし）は **監査報告としてPASS、修正必須の指摘なし**。今回差分が報告書のみであること、台帳の未公開状態、既存データ検索一致0、検証ログの数値、差分チェックを確認した。公式PDFを独立閲覧し38/39ページ、午前選択数の相違、抽出末尾P35/P36と末尾スクリーンショットが参照文字列のみという制約を再現した。初回レビュー時点の走査はスクリプトとJSON（372本・243組・関連311本、教材一致0件）を読んで確認し、独立再実行はしていない。fetch後の最終走査（381本・245組・関連320本、教材一致0件）は再レビューで確認する。コマンド終了コード、直接GETの403、今回CLI終了1、fetch成功は親の実測に依存する。教材完成のPASSではない。

今回の最終版も **再レビューで最終PASS（監査報告として）、修正必須の指摘なし**。最新JSONの381本（claude 114・codex 267・qual 0）・245組・関連320本・教材一致0件とステージ済み報告の一致、初回時点との数値の区別、`git diff --cached --check` 成功、報告書1ファイルのみの変更と未ステージ差分なしをレビュアーが確認した。教材完成・内容検収のPASSではない。
