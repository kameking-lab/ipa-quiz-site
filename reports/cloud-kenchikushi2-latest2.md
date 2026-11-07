# 二級建築士・木造建築士（学科）直近2回の監査

> 2026-11-04 LK5追記: 以下は前回の履歴。06:10のオーナー決定で両資格の収録対象外・`permission-required` 指定は解除し、台帳を `ready-to-ingest` に変更した。本文は引き続き未収録。現在の到達点・制約・再開位置は `reports/lk5-kenchikushi2-20261104.md` と `data/qualification-staging/kenchikushi2/README.md` を参照する。

確認日: 2026-11-03。対象回は公式の「学科の試験」一覧の先頭2年から選定。

## 既存方式と今回の扱い

- `data/questions/civil2/index.ts` 等は公式問題・正答URLを原問に持たせる構成。
- `lib/qualifications/catalog.ts` が公開可否の台帳。`permission-required` は未公開。既存の日商簿記3級と同じく、本文未収録の資格は `examCode` を付けず登録する。
- `data/questions/index.ts` は `isExamPublished` を経由して公開問題を登録し、`app/[exam]/page.tsx` は利用可能な試験からルートを生成する。`app/qualifications/page.tsx` は live のみ一覧に表示する。
- 今回は本文の収録を見送ったため、Question型・問題レジストリ・ルート・公開一覧・画像は追加しない。本文を備えたステージング追加は未完了。類題・生成問題による代替はしていない。

## 二級建築士（学科）

公式一覧・利用条件: https://www.jaeic.or.jp/shiken/2k/2k-mondai.html

| 対象回 | 学科I・IIの問題PDF | 学科III・IVの問題PDF | 公式正答PDF |
| --- | --- | --- | --- |
| 令和8年（2026年） | https://www.jaeic.or.jp/.assets/R8_2k_1_2.pdf | https://www.jaeic.or.jp/.assets/R8_2k_3_4.pdf | https://www.jaeic.or.jp/.assets/R08_2k_gokakukizyun.pdf |
| 令和7年（2025年） | https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka1_2.pdf | https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gakka3_4.pdf | https://www.jaeic.or.jp/assets/pdf/shiken/2k/2k-mondai/2k-2025-1st-gokakukijun.pdf |

4冊をダウンロードしてテキスト抽出し、各冊で1〜25の問題番号が2組、計50件あることを確認。問題PDFの抽出テキストに著作権による非掲載・削除の告知は検出されなかった。これは全問の本文・図版の目視校合完了を意味しない。公式正答PDFの公開も確認したが、収録していないため各問との正答照合は未実施。

追加問数: **0問**（対象の問題番号は2年合計200問）。除外: 両年・全科目の本文収録を見送り。

理由: 公式一覧の注意事項3で個人利用以外の無断転載・複製を禁止し、問題PDF表紙にも転載・複製禁止の表示がある。今回取得した、ユーザーから提供されていない著作権保護対象の問題文・選択肢を大量に転載する依頼には対応できないため。全問非公開と判定したためではない。転載許諾を取得したという主張はしない。

法令: 令和8年問題表紙の基準日は2026-01-01。本文・解説は未作成であり、現在法による解説への置換はしていない。

資格台帳には `kenchikushi2` / `permission-required` として記録。

## 木造建築士（学科）

公式一覧・利用条件: https://www.jaeic.or.jp/shiken/mk/mk-mondai.html

| 対象回 | 学科I・IIの問題PDF | 学科III・IVの問題PDF | 公式正答PDF |
| --- | --- | --- | --- |
| 令和8年（2026年） | https://www.jaeic.or.jp/.assets/R8_mk_1_2.pdf | https://www.jaeic.or.jp/.assets/R8_mk_3_4.pdf | https://www.jaeic.or.jp/.assets/R08_mk_gokakukizyun.pdf |
| 令和7年（2025年） | https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka1_2.pdf | https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gakka3_4.pdf | https://www.jaeic.or.jp/assets/pdf/shiken/mk/mk-mondai/mk-2025-1st-gokakukijun.pdf |

3冊は各冊1〜25の問題番号が2組、50件ずつ抽出できた。令和8年学科III・IVはローカルのテキスト抽出では施工問12の本文が欠け49件だったが、公式PDFの別の読み取りではPDF18ページ（施工17ページ）の問12と全5肢を確認できた。抽出失敗を公式非公開と誤認しない。

令和8年施工問12には、選択肢2・4の図の出典を住宅金融支援機構の仕様書として示す注記がある。これは問題を非掲載とする告知ではない。全問の本文・図版の目視校合は未完了であり、完全収録可能と確定したものではない。

追加問数: **0問**（対象の問題番号は2年合計200問）。除外: 両年・全科目の本文収録を見送り。

理由: 二級建築士と同様、公式一覧の注意事項3とPDF表紙に転載・複製禁止の表示があり、ユーザーから提供されていない問題文・選択肢の大量転載には対応できないため。全問非公開を理由とする除外ではない。第三者の図の利用条件も解決したものではない。

法令: 令和8年問題表紙の基準日は2026-01-01。本文・解説は未作成。公式正答PDFの公開は確認したが、各問との正答照合は未実施。

資格台帳には `mokuzo-kenchikushi` / `permission-required` として記録。本文を備えたステージング追加は未完了。

## 検証

- `pnpm install`: 成功。
- `pnpm validate:questions`: 成功。26,444問、fail=0、warn=16,808（既存データ）。
- `pnpm typecheck`: 初回は既定ヒープ上限でOOM。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で再実行し成功。
- `pnpm exec vitest run __tests__/lib/home-directory.test.ts __tests__/questions/live-qualification-coverage.test.ts`: 2ファイル・18テスト成功。
- 初回の `pnpm test -- ...` は引数の区切りにより全件実行となったため停止し、上記の指定ファイルのみで再実行。
- 木造建築士の台帳追加後も問題検証・ヒープ上限を増やした型チェック・上記18テストを再実行し、すべて成功。
- `pnpm build`・デプロイは実行していない。
