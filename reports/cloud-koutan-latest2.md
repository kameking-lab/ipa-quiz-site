# 工事担任者 koutan 直近2回の取得監査

- 調査日: 2026-11-03 UTC（実行環境の日付）。依頼に記載されたオーナー決定「2026-11-04 01:30」は権利確認済みの指示として適用した。
- 対象: 総合通信、第一級アナログ通信、第二級アナログ通信、第二級デジタル通信。
- 第一級デジタル通信は別作業中のため、本作業の取得・データ追加対象から除外。
- **結果: 4資格とも追加0問。資格追加は未完了。** 公式PDFを直接取得できず、全問の原文・選択肢・図・正答の照合ができない。監査資料だけを保存し、資格登録・問題データ・ルーティングは変更していない。
- 権利未確認、転載条件の文言、過去の取得STOP記録を理由に停止したものではない。

## 対象回と公式根拠

公式の[試験問題・正答一覧](https://www.dekyo.or.jp/shiken/charge/exam)について、検索サービスに保存された公式ページ本文には、令和8年度第1回、令和7年度第2回、令和7年度第1回、令和6年度第2回の順で、全5種別の問題・正答が掲載されている。

本作業で対象とする直近2回は **令和8年度第1回と令和7年度第2回**。令和8年度第2回は対象外。[令和8年度公式案内PDF](https://www.dekyo.or.jp/shiken/assets/files/articles/2464/file_2464.pdf?q=69e0d26b33044)の検索保存本文で第2回は2026年11月22日と確認でき、調査日には未実施である。第1回は2026年5月24日。[令和7年度公式公示](https://www.dekyo.or.jp/shiken/assets/files/articles/2510/announcement_2510.pdf)の検索保存本文で第2回は2025年11月23日と確認した。

ただし一覧ページを現在直接開くと、[公式メンテナンス案内](https://www.dekyo.or.jp/mtninfo.html)へ転送される。最新回の判断に使ったのは公式ドメインの検索保存本文であり、現在配信中の一覧HTMLを確認できたという意味ではない。再開時には一覧を再確認すること。公式一覧・両年度日程の検索保存本文を `cloud-koutan-latest2-official-search.txt` に保存した（現在配信中のPDF原本の代わりにはならない）。

## 作業前の既存成果確認

開始時の作業ツリーはクリーン。基点は `00e49b94060cc2671e9d098df91d653a4ed3ffe2`、元のブランチは `claude/dreamy-fermi-y13gi9`。

`data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` を `koutan`、工事担任者、対象4種別の名称で検索し、対象資格・対象回の収録データは見つからなかった。

元の `.git` が読み取り専用で `git fetch` は `cannot open '.git/FETCH_HEAD': Read-only file system` となったため、同じoriginを `/tmp/koutan-audit-repo` に通常cloneし、origin の `claude/*`・`qual/*`・`codex/*` を確認した。374ブランチ（対象3パスの組合せは239種類）を検索し、一致した16の異なるblobも確認した。一致は無線資格の「総合通信局」等、PM論述の「総合通信事業者」、建築設備士の問題文中の工事担任者への言及であり、対象資格・対象回の既存成果はなかった。詳細・全ブランチ名・commit SHAは `cloud-koutan-latest2-remote-scan.json` に保存した。

## 既存方式の確認と今回の扱い

- 類似例 `data/questions/tsushin1/index.ts` と年度別JSON: 原文テキスト・選択肢・全肢解説・問題/正答URL・必要画像を `Question` に変換する方式。
- `data/questions/index.ts` と `lib/questions/get-questions.ts`: 同期・遅延ロードの登録。`lib/questions/types.ts` と `lib/exam-config.ts` に資格型・設定を登録する。
- `lib/qualifications/catalog.ts` の `isExamPublished` と `lib/exam-config.ts` の公開資格一覧: カタログの `status: "live"` で公開を制御する。未登録資格も同関数では公開扱いになるため、未公開追加では公開ゲートも必ず確認する。
- `data/exam-library/official-catalog.json` と `lib/exam-library-catalog.ts`: 問題ライブラリの別登録経路。

今回は公式問題原本を取得できなかったため、空の資格や確認済みと誤解されるステージング問題は作成していない。公開前ステージングへの登録も未着手。

## 資格別の追加問数と除外理由

| 資格 | 令和8年度第1回 | 令和7年度第2回 | 追加合計 | 未収録理由 |
| --- | ---: | ---: | ---: | --- |
| 総合通信 | 0 | 0 | 0 | 問題PDFはメンテナンスHTMLへ転送。正答PDFの直接URLは現在の一覧から取得不可 |
| 第一級アナログ通信 | 0 | 0 | 0 | 両回の問題PDF・令和7年度第2回の正答PDFはメンテナンスHTMLへ転送。令和8年度第1回の正答URLは未取得 |
| 第二級アナログ通信 | 0 | 0 | 0 | 両回の問題PDFはメンテナンスHTMLへ転送。両回の正答URLは未取得 |
| 第二級デジタル通信 | 0 | 0 | 0 | 両回の問題PDF・令和7年度第2回の正答PDFはメンテナンスHTMLへ転送。令和8年度第1回の正答URLは未取得 |

全対象問を今回は未収録とした。検索保存本文に問題や正答の断片が存在しても、全ページ・全図・全問の公式正答を原PDFと照合できないため問題データには変換していない。問題数の最終照合、全肢解説、図の作成、法令の出題時点注記は未実施。公式に問題・正答が非公開だと断定するものではなく、現在の配信停止による取得不可である。

## 取得できない公式PDF一覧

以下の10 URLは公式ドメインの検索結果で特定し、通常のHTTP GETとリダイレクト追従で個別確認した。すべて最終HTTP 200、Content-Type `text/html`、最終URL `https://www.dekyo.or.jp/mtninfo.html`。本文に「ただいまシステムメンテナンス中です」を含み、PDFヘッダ `%PDF-` はない。

各リクエストの確認時刻・HTTP結果・本文SHA-256は `cloud-koutan-latest2-http.json` に記録。ハッシュは返されたHTMLのものであり、公式PDFのハッシュではない。

| 回 | 資格 | 種類 | 取得不可URL |
| --- | --- | --- | --- |
| 令和8年度第1回 | 総合通信 | 問題 | https://www.dekyo.or.jp/shiken/assets/files/articles/2563/files25636a1629f1a9617.pdf |
| 令和8年度第1回 | 第一級アナログ通信 | 問題 | https://www.dekyo.or.jp/shiken/assets/files/articles/2563/files25636a1628d6ad0ac.pdf |
| 令和8年度第1回 | 第二級アナログ通信 | 問題 | https://www.dekyo.or.jp/shiken/assets/files/articles/2563/files25636a16292ca933d.pdf |
| 令和8年度第1回 | 第二級デジタル通信 | 問題 | https://www.dekyo.or.jp/shiken/assets/files/articles/2563/files25636a1629b61aea9.pdf |
| 令和7年度第2回 | 総合通信 | 問題 | https://www.dekyo.or.jp/shiken/assets/files/articles/2527/files2527692638fe67579.pdf |
| 令和7年度第2回 | 第一級アナログ通信 | 問題 | https://www.dekyo.or.jp/shiken/assets/files/articles/2527/files25276926371c03d29.pdf |
| 令和7年度第2回 | 第二級アナログ通信 | 問題 | https://www.dekyo.or.jp/shiken/assets/files/articles/2527/files2527692637b9c235e.pdf |
| 令和7年度第2回 | 第二級デジタル通信 | 問題 | https://www.dekyo.or.jp/shiken/assets/files/articles/2527/files25276926389821001.pdf |
| 令和7年度第2回 | 第一級アナログ通信 | 正答 | https://www.dekyo.or.jp/shiken/assets/files/articles/2527/files2527692639569429b.pdf |
| 令和7年度第2回 | 第二級デジタル通信 | 正答 | https://www.dekyo.or.jp/shiken/assets/files/articles/2527/files252769263ab23c335.pdf |

残り6正答PDFは、令和8年度第1回の4資格分、令和7年度第2回の総合通信・第二級アナログ通信分。一覧の検索保存本文では正答の掲載を確認できたが、リンク先URLを取得できなかった。これらは「個別GETが失敗したURL」には含めず、**直接URL未特定・本文未取得**として区別する。URLは推測していない。

ログイン、CAPTCHA、ボット拒否を迂回する処理は行っていない。

## 転載条件の記録

公式一覧の検索保存本文では、受験等に使う問題・正答のダウンロード/印刷を認め、許諾・使用料は不要、著作権は保持し、出典表記が必要との案内を確認した。依頼のオーナー決定を適用し、この文言を停止理由にはしていない。

## 検証・独立レビュー

- `pnpm install --store-dir /tmp/koutan-pnpm-store`: 成功。標準キャッシュ先が書込不可だったため、`COREPACK_HOME=/tmp/koutan-corepack XDG_CACHE_HOME=/tmp/koutan-cache` を指定した。lockfile変更なし。
- `pnpm validate:questions`: 26,444問、fail=0、warn=16,808（既存データの警告）。
- 関連テスト: `pnpm exec vitest run __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/exam-library-coverage.test.ts`、3ファイル・1,077テスト合格。
- 最初の `pnpm test -- ...` は全スイートを起動したため中断し、上記の関連3ファイル指定で完走させた。
- `pnpm typecheck` はNodeのメモリ不足（終了134）。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で再実行し、終了0で成功。
- `pnpm build`・デプロイ・PR作成は行っていない。
- 指定CLI `codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check` を実行したが、`failed to initialize in-process app-server client: Read-only file system (os error 30)` で起動失敗。`--ephemeral` と `sqlite_home`/`log_dir` の `/tmp` 指定でも同じ失敗。指定CLIでのレビュー・再レビュー合格は達成していない。
- 代替として同じ `gpt-6-astra`、推論 `medium` の独立エージェントへ監査資料のレビューを依頼。初回レビューで「監査資料PASS（資格追加完了のPASSではない）」と判定。公式URLへの独立curl確認も同じ転送だった。指摘された検索保存本文の証跡不足を補うため、公式検索本文の保存ファイルを追加し、型チェックの完走結果を追記した。確定版も代替独立レビューで「監査資料PASS」。資格追加は4資格0問・未完了のままであり、対象資格の公開可能判定ではない。これは指定CLIでの成功を意味しない。

問題データを追加していないため、既存検証・監査資料レビューの合格は対象資格の収録完了・全問照合合格を意味しない。

## 保存ブランチ

元の `.git` は読み取り専用のため、監査4ファイルは `/tmp/koutan-audit-repo` の `codex/cloud-koutan-latest2-20261103` でコミットする。資格データの追加はないため資格別コミットは発生せず、共通の取得監査を1コミットとする。元の作業ディレクトリにも同じ監査ファイルを残す。

## 再開に必要な作業

公式配信の復旧後、最新の掲載回と重複成果を再確認し、4資格それぞれ2回の問題・正答PDFを取得する。原文テキスト・選択肢・全正答・必要図を照合し、独自の全肢解説と出題時点の法令注記を作成する。資格ごとに未公開の登録、問題数照合、検証、独立レビューを完了してから資格ごとにコミット・pushする。
