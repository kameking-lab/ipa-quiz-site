# khk-kagaku 直近2回の原本取得・ステージング監査

監査日：2026-11-04（日本時間。取得記録は2026-11-03 UTC）。

**未完了。公開可能な問題データの追加は0問。** 公式28PDFとSHA256、24科目422原問の機械抽出下書き、択一410問の公式正答番号を保存した。問題文・数式・全選択肢・必要図の原本照合、独自解説、演習用の登録とルーティングは未完了であり、今回の成果を公開準備完了とは扱わない。機械抽出下書きは公開・出題しない。

## 対象回の決定と公式根拠

依頼の4区分はいずれも国家試験（講習検定ではない）を対象とする。

|年度|試験日|判断|公式根拠|
|---|---|---|---|
|令和8年度|2026-11-08|監査時点では未実施。対象に含めない|[令和8年度受験案内書](https://www.khk.or.jp/Portals/0/khk/exam/2026/R8FY_exam_seizouhanbai_%20rev.pdf) PDF4頁「Ⅰ 試験の概要」|
|令和7年度|2025-11-09|直近の実施済み回|[令和7年度受験案内書](https://www.khk.or.jp/Portals/0/khk/exam/2025/R07fy_exam__seizouhanbai.pdf.pdf) PDF3頁|
|令和6年度|2024-11-10|その前の実施済み回|[令和6年度受験案内書](https://www.khk.or.jp/Portals/0/khk/exam/2024/%E3%80%90%E9%9B%BB%E5%AD%90%E7%94%B3%E8%AB%8B%E7%94%A8%E3%80%91%E4%BB%A4%E5%92%8C6%E5%B9%B4%E5%BA%A6%E5%8F%97%E9%A8%93%E6%A1%88%E5%86%85%E6%9B%B8%28%E8%A3%BD%E9%80%A0%E3%83%BB%E8%B2%A9%E5%A3%B2%29.pdf)「Ⅰ 試験の概要」|

[公式の公表一覧](https://shiken.khk.or.jp/shiken.html)は令和8年度向けに切り替わっており、4区分の科目名はあるが過年度PDFのリンクはない。一覧による掲載期間は、問題が当年度試験翌日から当年度1月下旬、択一正答が当年度試験翌日から翌年度試験の1週間前、記述式解答例が当年度12月中旬から翌年度試験の1週間前まで。したがって一覧上の年度表示だけでは対象回を決めていない。

通常HTTP GETで過年度の公式URLから全28PDFを取得できた。HTTP 200、PDFヘッダー、バイト数、SHA256を記録した。ログイン・CAPTCHA・ボット拒否の回避はしていない。最初のWeb閲覧ツールによるホスト直下アクセスは403だったが、公表ページと公式PDFの通常GETは成功した。公式に非公開の問題を推測・生成して補っていない。

## 作業前の重複確認

- ローカルの `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` に同じ資格の問題成果はなかった。
- origin の `claude/*`・`qual/*`・`codex/*` の388ブランチを確認。対象データのパスに `khk` / `kagaku` を含む既存成果は0件。
- 上記ブランチのカタログ2ファイルを、各コミットを指定したGitHub raw URLでも確認した。384個の異なるコミットについて768ファイルを検査し、661件取得、107件は当該ファイルが存在せず404。取得エラーは0。異なるカタログblobは160。
- 唯一の該当記録は `origin/claude/awesome-mayer-10yje5`（`db84c57f93895350b0e088aa40a630109b94459d`）の `koatsu-gas` カタログ項目。令和7・6年度の全区分を「転載・複製禁止のため本文を収録しない」とした過去STOP記録であり、問題本文・正答の収録成果はない。今回の明示指示に従い停止理由にせず、再作成すべき既存問題成果とも扱わなかった。
- `origin/ops/source-pdfs-20261104`（`4efb29d8aaac5d5fceb2e347ba93a982384f9427`）のルート一覧とREPORT.mdを確認。`khk-kagaku/` は存在しなかった。今回は公式から全PDFを取得できたため代替利用なし。

参照ブランチ名とコミット、検査結果は [branch-audit.json](cloud-khk-kagaku-branch-audit.json) に記録。

## 権利文言とオーナー決定

[公式ご利用条件](https://www.khk.or.jp/condition.html)の「1. 著作権について」は、私的使用・引用の場合を除き、権利者の許諾なく使用・転載・複製・再配布等を行う行為を禁止している。公式の文言「許諾なく使用、転載、複製、再配布、再出版、販売、貸与等を行う行為を禁止します。」を記録する。

オーナー決定2026-11-04 06:10により、この資格は権利確認済みの収録対象とする。上記文言・過去STOP・権利未確認を今回の停止理由にはしていない。公式が一般公開に同意しているという主張や、公共データ利用規約の適用を捏造していない。

## 問題数と追加数

|区分|1年度の法令・保安・学識|対象2回の原問数|機械抽出下書き|公開可能な追加問数|
|---|---|---:|---:|---:|
|甲種化学|20・15・記述6|82|82|0|
|乙種化学|20・15・15|100|100|0|
|丙種化学（液石）|20・20・20|120|120|0|
|丙種化学（特別）|20・20・20|120|120|0|
|合計|1年度211原問|422|422|0|

択一410原問は、各問の公式正答番号と5選択肢の抽出下書きを保持。記述12原問は原問単位を保持し、独自の選択式問題へ変換していない。法令の共通設例を対象問に `sharedPassagesDraft` として保持した。法令の基準日は問題冊子に記された各年度4月1日であり、現行法令に読み替えていない。

正答表の各科目行の数値列と410問の正答番号の一致を機械検査した。これは原本の全問目視照合や解説の内容検証の完了を意味しない。記述式は公式解答例を保存しているが、12原問の解答照合と独自解説は未完了。

## 保存物と既存方式との関係

- `data/exam-library/source-packs/khk-kagaku/`：公式PDF28件、PDFごとの抽出テキスト28件、URL・バイト数・全SHA256・頁数付きmanifest。
- `data/questions/khk-kagaku/staging-drafts.json`：全422原問の抽出下書き。各問に問題URL・正答URL・PDF頁・未照合フラグを保持。
- `data/questions/khk-kagaku/official-answer-keys.json`：公式択一正答表の22科目行・410番号。
- `lib/qualifications/catalog.ts`：未公開の `ready-to-ingest` 項目。`examCode` はまだ割り当てていない。独自解説の掲載を既に完了したという意味ではない。

類似の `data/questions/civil1/index.ts`、`data/questions/gas/{kou,otsu,hei}` を確認。既存方式は、照合済み原問JSONを `index.ts` で `Question[]` に変換し、`data/questions/index.ts` と `lib/questions/get-questions.ts` へ登録し、`lib/exam-config.ts` で科目・ルートを設定するもの。公開はカタログの `isExamPublished` と、資格一覧ページの `status === "live"` で制御する。

今回はその実装の前段である資料ステージングまで。演習用Question[]、ローダー、exam-configの登録は未実施。下書きを公開問題に見せるための架空の解説や `explanationCoverage: "full"`、未照合の図への `hasImage` は付けていない。画像だけの問題や生成類題は追加していない。

令和6年度の通常pdftotextは日本語文字マップ不足により本文が欠落した。PyMuPDF 2.1の `get_text(sort=True)` で日本語本文を抽出し直した。抽出テキストは数式の指数・添字・分数、表、図の関係が失われる可能性があり、下書きのままである。

## 除外・取得不能URLと残作業

公式に問題・正答が公表されていないため除外した実施済み回：なし。ブラウザでの代替取得を依頼するPDF URL：**なし（全28件取得済み）**。

未公開で保留する原問：422問すべて。権利条件やPDF未取得ではなく、内容制作・原本照合が未完了のため。今回、資格追加の全作業は完了していない。

残作業：

1. 全422原問の本文・選択肢・共通設例・表・数式を公式PDFと直接照合する。
2. 択一410問の全2050選択肢と、記述12原問の解説を独自作成し、公式正答・解答例と照合する。
3. 必要な図の部分のみ切り出し、本文テキストと併用してhasImageと代替テキストを設定する。
4. 演習用Question[]、科目・登録・ルーティングを実装し、公開前ステージングのまま全件を検証する。

独立レビューは起動していない。push・PR作成・build・デプロイは実施していない。

## 検証

- `pnpm install --frozen-lockfile`：成功。読み取り専用の既定キャッシュを避けるためCOREPACK_HOME・XDGのキャッシュ／データ先・pnpm storeを `/tmp` に指定。
- `pnpm validate:questions`：既存26444問、ok=26444、fail=0、warn=16808。新規422件は未公開資料であり、この実行の収録問題数には含まれない。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功（exit 0）。テストファイルで発生したJSON推論型のエラーを修正後に再実行済み。
- 関連テスト：3ファイル・1077件成功。`pnpm exec vitest run __tests__/questions/khk-kagaku-staging.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts` を実行。原本SHA256、422原問の番号と科目別件数、公式正答テキストとの410番号の一致、未公開・出題対象外を検査する。内容レビューの代替ではない。

補足：最初の `pnpm test -- ...` はVitestの引数の扱いにより全スイートを実行し始めたため、Ctrl-Cで中断（exit 130）。全スイートの合格を主張していない。上記の関連3ファイルは正しいフィルターで別途完了した。

## コミット環境

作業先 `.git` は環境設定により読み取り専用で、fetch/commitができない。`/tmp/khk-kagaku-git` に作業用Gitディレクトリを作り、元HEADを親としたコミットを作成する。元の `.git` のHEAD・ブランチは更新していない。適用用パッチは `/tmp/khk-kagaku-staging.patch` に保存する。

## 公式PDF一覧

全SHA256と保存パスは `data/exam-library/source-packs/khk-kagaku/manifest.json` を参照。各URLについて通常GET、HTTP 200、PDF実体を確認した。

|原本|公式URL|SHA256|
|---|---|---|
|R6ACAX-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACAX-W.pdf)|`552cf123be19da1793c99927a4ec3394bf40c900d9cddff95de1d7249c023bdb`|
|R6ACAY-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACAY-W.pdf)|`6223a5a5312c1ba35faa43d9fb08220ec41559975ff3e4ee4d6a992b37bc51a9`|
|R6ACAZ-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACAZ-W.pdf)|`c31804a87cfcaafd4c3f6b2907519a5f7f18aaf11896b0967cf99231c70eb422`|
|R6ACBX-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACBX-W.pdf)|`27439aafc0830b87c04a4af360ab6253ffe87e58a54afae977256d97184afa81`|
|R6ACBY-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACBY-W.pdf)|`ff70926d7bf387b0e221f5d1471a04680672dd7f4e10bc2ef25078307e26607c`|
|R6ACBZ-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACBZ-W.pdf)|`fb4a82c07a9cf2b80aadcec2dfc543cfc6f22b21e5176f89157f89a933673422`|
|R6ACCX-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACCX-W.pdf)|`2a0067825fa9c7c856c5b2b57c90b55f65c14237b304e00bf51444d8910fbd9d`|
|R6ACCY-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACCY-W.pdf)|`2f2b862ccff35a493356c0b7b71722b2ee818a5bf67cfb78084c238d031a3002`|
|R6ACCZ-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACCZ-W.pdf)|`7b128de5c1dd1b2c4db3ed0361770ff8cd2aaffccbba9e5b7f6d6b2324354112`|
|R6ACDX-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACDX-W.pdf)|`ebdd18d1f4d60b32469e242ece8326e02dd70dacde5dab836189c685b0fc33c7`|
|R6ACDY-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACDY-W.pdf)|`6b9ef246f197c3a5970071fcb7b8e078a4117a06f5bbc64531a5d28adf10412f`|
|R6ACDZ-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACDZ-W.pdf)|`557f9ff5937059bdb4546815d9ca61173d7178e145761a31d39610c2d275dfcf`|
|R6fy_kaitou.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_kaitou.pdf)|`0fd73548590e9cc8da07c84bbc088ed8aac224275b1d5869706fe39433e6cc7b`|
|R7ACAX-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACAX-W.pdf)|`15cd45135c243d0e9dfb29be0a6fdd76cf839a52dc356c760b737e87b3634581`|
|R7ACAY-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACAY-W.pdf)|`0ac513299a24e7931768ef9a66bedd3d69e03fda02277e137c1cdfee92f1f7df`|
|R7ACAZ-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACAZ-W.pdf)|`658a61918d3ae0b3044f356235d72b90213495d66c6de572d3987c8fd08c1b3f`|
|R7ACBX-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACBX-W.pdf)|`48297ba6b2d28968c253851508d33717bb98a3fad501f407ecefad9df9548041`|
|R7ACBY-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACBY-W.pdf)|`2397b9e9614f79d24d0c584be58977d620418da16cb2b749b4ce9a6fbfb6d7ca`|
|R7ACBZ-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACBZ-W.pdf)|`bb44992d5d41c16c0a25bc63659655a574ea3ea333806d95edc06ea1af2e39f0`|
|R7ACCX-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACCX-W.pdf)|`8309752573b268d35818839d051079953dffcffd42c12cd112a417accdfa9cbf`|
|R7ACCY-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACCY-W.pdf)|`c8fb2ba515ed23fd956551f04b75e8c12d70e6c934bfa5bf463ccc713a14dcf6`|
|R7ACCZ-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACCZ-W.pdf)|`ae38c12dbf7633618890052216c4aa4d8f026542ae44ea29e367f36dcd67d02a`|
|R7ACDX-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACDX-W.pdf)|`23ea1fc0846b7c5629857a711fa32b857303335442f4f8881cb3f0c22cd43e62`|
|R7ACDY-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACDY-W.pdf)|`de2b9da19437f23672640a8c40a611acac2c65b8a805b7c430266a1ede6d7a07`|
|R7ACDZ-W.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACDZ-W.pdf)|`aed7adbc98b5d1e3f936cdc21e74b66bc082746d71071086dc8fae8e7a0673b8`|
|R7fy_kaitou.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7fy_kaitou.pdf)|`3de6b459e2639f352ca27f31d413d7bfc6ce6bcb467dbde9d40dd5c8b594c660`|
|R7fy_kaitourei_1.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1219/R7fy_kaitourei_1.pdf)|`b116231c19f085af0835165b57cdd22cd127cb5569d5fbc8214c7a2292b9f43e`|
|R6fy_01.pdf|[公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_01.pdf)|`8f6168a1fd55805efd71eace96111fe906c8025dc8c94783af651f652d841c4b`|
