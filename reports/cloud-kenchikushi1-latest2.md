# 一級建築士（学科）直近2回の追加監査

確認日: 2026-11-03 UTC（2026-11-04 JST）。**未完了・未公開**。資格コードは `kenchikushi1`。

## オーナー決定と今回の状態

ユーザー提示の **2026-11-04 06:10 のオーナー決定**により、公式の転載・複製禁止表示は報告に記録したうえで収録を続行する方針となった。従前の「許諾必須で本文収録中止」「書面許諾まで着手しない」という方針は無効とし、本報告を更新した。カタログの利用条件確認を残作業の前提とする記述も削除した。

既存方式に従い `status: permission-required`、`publicationGo: false` の未公開ステージングを維持する。このステータス名をオーナーへの再承認要求として扱っていない。権利者への連絡は行っていない。

本実行では、URL参照の著作物250問の問題文・全選択肢をそのまま大量収録する依頼部分には対応していない。これはオーナーの作業承認不足ではなく、本アシスタントによる著作物の全文提供に関する制約による。**追加問題数は0問、収録完了は0/250問**。公開可能な状態には達していない。

## 対象回と収録数

[建築技術教育普及センターの公式一覧](https://www.jaeic.or.jp/shiken/1k/1k-mondai.html)の「学科の試験」で、直近2回が令和8年・令和7年であることを再確認した。設計製図は対象外。

| 年度 | 計画 | 環境・設備 | 法規 | 構造 | 施工 | 原問計 | 本文収録済み |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 2026（令和8） | 20 | 20 | 30 | 30 | 25 | 125 | 0 |
| 2025（令和7） | 20 | 20 | 30 | 30 | 25 | 125 | 0 |

問題本文・全選択肢・必要図・独自の全肢解説は全250問で未収録。正答メタデータ250件と収録済み問題数を区別する。類題・生成問題・画像だけの代替問題は追加していない。設計製図以外に個別の問を除外した判断はなく、全250問が未収録である。

## 公式PDFの取得

公式一覧の8リンクをブラウザで開いて確認し、`source-manifest.json` の各URLから直接HTTP取得した。8件すべてHTTP 200、PDFヘッダー、バイト数、SHA-256を確認し、前回台帳と全件一致した。**取得不能のURLは0件**。公開期間終了を理由に取得できなかったPDFは今回なかった。

原本は指定の `ops/source-pdfs-20261104/1k-<年度>-1st-<資料>.pdf` に保存した。実行開始時、このディレクトリは存在しなかったため作成した。取得ログは同ディレクトリの `kenchikushi1-download-results.json` に保存。原本とローカル取得ログはコミット対象に含めず、取得先と取得結果を `source-manifest.json` に記録した。

| 年度 | 資料 | 公式URL | 照合済みSHA-256 |
| --- | --- | --- | --- |
| 2026 | gakka1_2 | [PDF](https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka1_2.pdf) | ` 0d0c77ce367c9a5668e39a3c6c23e42ba2718270e479dd2c099b601a30adf7b3 ` |
| 2026 | gakka3 | [PDF](https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka3.pdf) | ` a97a1d754de0ec7f539ce1f2b682dab6d18f7d313e9737ece4826ea454ef7030 ` |
| 2026 | gakka4_5 | [PDF](https://www.jaeic.or.jp/.assets/1k-2026-1st-gakka4_5.pdf) | ` 04903b7678e64394f56501579c6fdc0a61c7f1683596c115136cef6e855188aa ` |
| 2026 | gokakukijun | [PDF](https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf) | ` 0cba655793975a94bcc8b84a769c885261d66434ba6627af0349ea9c4b8f80b8 ` |
| 2025 | gakka1_2 | [PDF](https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka1_2.pdf) | ` e3446e195fc9b042cb3f1a88393c6b85d4c2e0b8a1a6a6c538cc1d77ac841503 ` |
| 2025 | gakka3 | [PDF](https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka3.pdf) | ` d691e1b9542f185c32dc1f5d0947451a33349caf488c15ed1b5585e7a542afb0 ` |
| 2025 | gakka4_5 | [PDF](https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gakka4_5.pdf) | ` ef64537389a52b31cab7b841ab24081250f886077dc69c070e7f19dbbb88539a ` |
| 2025 | gokakukijun | [PDF](https://www.jaeic.or.jp/assets/pdf/shiken/1k/1k-mondai/1k-2025-1st-gokakukijun.pdf) | ` 23f5e9b60091e1503592f7e0c8af7d3dac60e85958ab73db10bde6e849f19219 ` |

## 最終正答250件の照合

取得した2026年・2025年の最終正答PDFを `pdftotext -layout` で抽出し、学科Ⅰ〜Ⅴの正答行を独立に読み取った。科目別件数20/20/30/30/25、各年125件、計250件が既存台帳の正答と全件一致した。これは問題本文・全肢解説の照合ではない。

`__tests__/questions/kenchikushi1-staging.test.ts` に10科目分の正答を固定リテラルとして追加した。台帳自身から期待値を生成せず、250件の正答番号、全員加点の位置、科目別の順番、各年125件の正答メタデータを固定する。既存の本文収録数0件と未公開境界の検査も維持する。取得記録の検査も追加した。テストは後述の環境エラーにより実行できていない。

## 2026年 学科Ⅲ No.29 の採点・表示

[公式最終正答PDF](https://www.jaeic.or.jp/.assets/1k-2026-1st-gokakukijun.pdf)の1ページ目注記と2ページ目訂正理由を再確認した。正答肢なし・全員加点であり、台帳は `officialAnswerNumber: null`、`grading: credit-for-all` を維持する。当初の肢1に戻したり四肢全正解に変換したりしていない。

既存実装はそのままでは対応できない。`Question` に全員加点を表す属性はなく、`isAcceptedAnswer` は正答肢と選択肢の一致で判定する。未回答はfalse。問題バリデーターも空の正答・空配列を許容せず、解説画面も正答肢の表示を前提としている。四肢全正解では未回答を含む全員加点を表現できない。

今回は採点・表示の実装変更を行っていない。本文未収録で実問への結合検証ができず、依存関係の導入も環境制約で停止している。専用の採点状態、未回答を含む加点、正答肢のない表示、保存・結果集計の検証が残る。現在の台帳だけでは演習の採点は実装済みではない。

## 出題時点の法令

- 2026年: 2026-01-01現在施行の法令。
- 2025年: 原則2025-01-01現在施行。ただし問題表紙には令和4年法律第69号、令和6年政令第172号、令和6年国土交通省令第68号に基づく指定規定について2025-04-01現在施行の規定を適用する例外がある。

上記は既存台帳に維持した。今後の収録では法令が関わる各問に「出題時点の法令」と明記し、2025年の例外も保持する必要がある。今回、各問の解説への反映は未実施。

## 転載・複製禁止文言の記録

[公式一覧の注意事項](https://www.jaeic.or.jp/shiken/1k/1k-mondai.html)には「試験問題等は、個人利用の目的以外に、無断で転載・複製することを禁止します。」とある。問題PDFにも「禁無断転載・複製」の表示がある。オーナー決定は上記のとおり記録し、この表示を根拠とする従前の許諾待ち方針は解除した。

## 検証と実行制約

- `pnpm install`: 終了コード1。Corepackの `mkdir /root/.cache/node/corepack/v1` が `ENOENT` で失敗し、依存関係の導入前に停止。`node_modules` も存在しない。
- `pnpm validate:questions`: 同じCorepackエラーで起動前に停止。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`: 同じCorepackエラーで起動前に停止。
- 関連テストのコマンド: `pnpm exec vitest run __tests__/questions/kenchikushi1-staging.test.ts __tests__/lib/accepted-answers.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/lib/home-directory.test.ts __tests__/lib/questions-load.test.ts __tests__/seo/question-jsonld.test.ts`。同じCorepackエラーで起動前に停止。
- サンドボックスの外への書込み、キャッシュ場所の変更による迂回、別のパッケージマネージャーへの切替は行っていない。
- PythonによるPDF8件のハッシュ・バイト数照合と最終正答250件の照合は成功。
- 追加テストの固定値250件もPythonで最終正答PDF・台帳と三者照合して全件一致。`git diff --check` は成功。Vitest・TypeScriptによる検証の代替とは扱わない。
- 現在のブランチは `claude/upbeat-goodall-510hlw`。変更4ファイルを指定して `git add` を試みたが、`.git/index.lock` 作成が `Read-only file system`（終了コード128）で拒否された。コミット・pushは未実施。別Gitディレクトリなどへの迂回は行わず、変更を作業ツリーに保持した。

前回実行のテスト成功を今回の検証結果として流用していない。`build`・デプロイ・PR作成・mainへのpushは実行していない。秘密値・環境変数の値は出力していない。

## 残作業

1. 250問の問題文・全選択肢のテキスト収録、必要図の添付と `hasImage`、原本との照合。
2. 全問の独自の全肢解説と出典URL、法令基準日の明記。
3. 正答肢なし・全員加点の採点、表示、未回答、結果集計への対応。
4. 実問題250問の収録数・正答・全肢解説・図の固定テストと、指定検証の実行。今回追加したテストは正答メタデータの検査であり、本文収録の検証ではない。
5. 年度×科目ごとのコミット・push。完成した科目はないため、科目完了コミットは作成していない。
