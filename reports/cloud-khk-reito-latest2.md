# khk-reito 直近2回の収録監査

確認日：2026-11-03 UTC。オーナー指示に記された判断日時は2026-11-04 06:10としてそのまま記録する。実行環境の日付と区別する。

## 対象回と根拠

国家試験の令和7年度（2025-11-09）・令和6年度（2024-11-10）を対象とする。科目免除の講習検定とは別の試験である。

- [公式公表ページ](https://shiken.khk.or.jp/shiken.html)：令和8年度用の枠はあるが問題・正答のリンクはまだない。問題は試験翌日から1月下旬、択一正答は翌年度試験の1週間前まで、記述式解答例は12月中旬から翌年度試験の1週間前までと記載。
- [令和8年度公式申込案内](https://www.khk.or.jp/qualification/qualification_application/)：試験日は2026-11-08。確認時点では未実施なので対象に含めない。
- [令和7年度公式受験案内](https://www.khk.or.jp/Portals/0/khk/exam/2025/R07fy_exam__seizouhanbai.pdf.pdf)：試験日は2025-11-09、法令基準日は2025-04-01。
- [令和6年度公式受験案内](https://www.khk.or.jp/Portals/0/khk/exam/2024/%E3%80%90%E9%9B%BB%E5%AD%90%E7%94%B3%E8%AB%8B%E7%94%A8%E3%80%91%E4%BB%A4%E5%92%8C6%E5%B9%B4%E5%BA%A6%E5%8F%97%E9%A8%93%E6%A1%88%E5%86%85%E6%9B%B8%28%E8%A3%BD%E9%80%A0%E3%83%BB%E8%B2%A9%E5%A3%B2%29.pdf)：試験日は2024-11-10。問題冊子冒頭に2024-04-01の法令基準日を明記。

「令和8年度」というページ見出しだけで対象年度を決めず、実施日と実際の公表原本を確認した。

## 事前重複確認と既存方式

作業開始時のHEADは `00e49b94060cc2671e9d098df91d653a4ed3ffe2`。
`data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library`、既存の`data/qualification-staging`を検索し、khk-reito及び第一種・第二種・第三種冷凍機械の既存収録がないことを確認した。別資格で冷凍等に言及した問題は本資格の既存成果ではない。

既存のガス主任技術者・電気系資格、`docs/two-round-question-ingestion.md`、資格カタログ、問題レジストリ、遅延ローダー、資格一覧、図表・全肢解説の型、公開ゲートを参照した。親slugは`khk-reito`、資格別は`khk-reito-1`、`khk-reito-2`、`khk-reito-3`とする。公開状態は`ready-to-ingest`で、liveにはしていない。演習・遅延ローダー・資格一覧の既存ゲートを使用する。`data/exam-library/official-catalog.json`へは未公開問題を登録せず、`source-packs/khk-reito-N.json`に未公開の出典台帳を保存する。

## 取得結果と権利表記

公式一覧から過年度リンクが外れていても、公式の問題PDF16点、第一種の解答用紙2点、択一正答2点、第一種記述式解答例2点は直接URLからすべてHTTP 200・PDFとして取得できた。取得不能URLは0件。ログイン・CAPTCHA・ボット拒否の迂回は行っていない。
指定の`ops/source-pdfs-20261104`はcommit `4efb29d8aaac5d5fceb2e347ba93a982384f9427`を取得して`khk-reito/`を確認したが該当ファイルはなかった。今回は公式原本を使用したため代替取得依頼は不要。原PDFと抽出草稿は`/tmp/khk-reito-pdfs/`に保存し、コミットに含めない。

[公式利用条件](https://www.khk.or.jp/condition.html)には、私的使用・引用を除き権利者の許諾なく使用等を行うことについて、次の禁止文言がある。

> 許諾なく使用、転載、複製、再配布、再出版、販売、貸与等を行う行為を禁止します。

オーナー決定「この資格は公式サイトに転載・複製禁止の文言があるが、オーナーの判断で収録する（文言は報告に記録するだけで止めない）」に従って収録した。許諾取得済み・自由利用可能という表示には置き換えていない。データの権利識別子`KHK-owner-decision`は、この判断記録を意味する。

## 第一種冷凍機械

令和7年度40原問、令和6年度40原問、計80原問。各年度は法令20、保安管理技術15、学識（記述式）5。択一70原問・350肢に独自解説を付けた。学識10原問は選択肢を創作せず、公式記述式解答例と照合した独自解説・式・単位・指定丸めを持つ。公式に入替えを認めた穴埋め解答はその条件も保持した。記述式は自己採点用であり、公式が公表していない配点細目や自動採点基準は作っていない。

法令の問9～13・問14～20に必要な共通設例を各問に保持。出題時点の法令と基準日を明記した。本文と選択肢はPDFの文字層から転記し、第一種学識の図表、文字化け（CID）、添字をページ画像・抽出設定と照合して補正した。図は2024学識問2の系統図・記入前線図、問3の断面図、2025学識問2の系統図・問4の原表を使用し、該当問だけ`hasImage`を付けた。2024学識問2の公式解答線図は解答本文側に置き、設問画像に混在させていない。

除外0原問。未実施の令和8年度と国家試験ではない講習検定を範囲外とした。各問の問題・正答URLと原本SHA-256は資格別出典台帳に記録。

検証：`pnpm install`完了。第一種対象の`pnpm validate:questions --exam=khk-reito-1`は80件OK・エラー0。独立転記した正答列によるテストで、令和6年度正答表の次資格の法令行を拾う抽出バグを検出して修正した。型検査は既定ヒープでOOMのため8GBで再実行した。法令解説の確認には[e-Gov冷凍保安規則](https://laws.e-gov.go.jp/law/341M50000400051/20221001_504M60000400072)も参照し、保安検査は原則3年、定期自主検査は原則年1回であることを区別した。第一種の8GB型検査、正答・非公開ゲート・科目ラベル・資格設定・ホーム一覧の関連テストは通過。最終検証結果は後段に記録する。

## コミット保存先

作業元の`.git`は環境の明示設定で読み取り専用であり、通常の`git fetch`は`cannot open '.git/FETCH_HEAD': Read-only file system`となる。作業元を変更せず、`/tmp/khk-reito-commits/.git`に書込み可能な別メタデータを用意し、作業ツリーの変更を資格ごとにコミットする。監督役が取り込めるGit bundleを出力した。pushは実施しない。

## 第二種冷凍機械

令和7年度40原問、令和6年度40原問、計80原問。各年度は法令20、保安管理技術10、学識10。全400肢に独自解説を付けた。法令の共通設例を各問へ保持し、出題時点の法令基準日を明示した。学識問1のp–h線図は各年度の原図を使用し、該当2問だけhasImageを設定した。計算問題は冷凍能力・循環量・軸動力・COP・乾き度を再計算して選択値と照合した。

除外0原問。正答は公式表から取得し、独立転記した80桁の正答列とテストで照合した。第一種のコミットは6deccfb6。

第二種の検証：`pnpm validate:questions --exam=khk-reito-2`は80件OK・エラー0、8GB設定の`pnpm typecheck`通過、関連5ファイル62テスト通過。公開候補を検証対象へ明示的に含め、検証件数が0件になっていないことも確認した。

## 第三種冷凍機械

令和7年度35原問、令和6年度35原問、計70原問。各年度は法令20、保安管理技術15。全350肢に独自解説を付けた。出題時点の法令基準日を明示した。図を必要とする原問はなくhasImageは全問false。令和7年度法令問6の分数の横線を文字抽出がマイナスにしたため、PDFの2ページ目を視認して原式「G=V/C」に補正した。令和6年度保安問5のCID文字も原本視認で「汲」に対応付けた。

除外0原問。第二種までのコミットは6deccfb6、4d0077e5。

## 原本URL一覧（全22点取得済み）

|年度|原本|役割|
|---|---|---|
|2025|[R7ACGX-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACGX-W.pdf)|questions|
|2025|[R7ACGY-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACGY-W.pdf)|questions|
|2025|[R7ACGZ-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACGZ-W.pdf)|questions|
|2025|[R7ACGZK-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACGZK-W.pdf)|answer-sheet|
|2025|[R7ACHX-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACHX-W.pdf)|questions|
|2025|[R7ACHY-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACHY-W.pdf)|questions|
|2025|[R7ACHZ-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACHZ-W.pdf)|questions|
|2025|[R7ACIX-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACIX-W.pdf)|questions|
|2025|[R7ACIY-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACIY-W.pdf)|questions|
|2025|[R7fy_kaitou.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7fy_kaitou.pdf)|answers|
|2025|[R7fy_kaitourei_3.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2025/1219/R7fy_kaitourei_3.pdf)|answers|
|2024|[R6ACGX-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACGX-W.pdf)|questions|
|2024|[R6ACGY-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACGY-W.pdf)|questions|
|2024|[R6ACGZ-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACGZ-W.pdf)|questions|
|2024|[R6ACGZK-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACGZK-W.pdf)|answer-sheet|
|2024|[R6ACHX-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACHX-W.pdf)|questions|
|2024|[R6ACHY-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACHY-W.pdf)|questions|
|2024|[R6ACHZ-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACHZ-W.pdf)|questions|
|2024|[R6ACIX-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACIX-W.pdf)|questions|
|2024|[R6ACIY-W.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACIY-W.pdf)|questions|
|2024|[R6fy_03.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_03.pdf)|answers|
|2024|[R6fy_kaitou.pdf](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_kaitou.pdf)|answers|

PDF本文の抽出は`scripts/khk-reito-extract.py`、資格別整形は`scripts/khk-reito-build.py`、原図の切り出しは`scripts/khk-reito-figures.py`に記録した。Pythonのpdfplumberを使用。解説は`first-notes.json`・`second-notes.json`・`third-notes.json`、記述式の照合記録は`descriptive-review.json`に保存した。問題作成器は原本にない問題・選択肢を生成せず、択一正答は必ず公式正答表を読む。

## 最終検証・追加数

|資格|令和7年度|令和6年度|計|全肢解説|記述式|除外|
|---|---:|---:|---:|---:|---:|---:|
|第一種冷凍機械|40|40|80|350肢|10原問|0|
|第二種冷凍機械|40|40|80|400肢|0|0|
|第三種冷凍機械|35|35|70|350肢|0|0|
|合計|115|115|230|1,100肢|10原問|0|

- `pnpm install`：完了（pnpm 10.33.0、専用の/tmpキャッシュ・ストアを使用）。
- `pnpm validate:questions`：26,674件、ok=26,674、fail=0、warn=16,808。警告は既存データのもの。新規khk-reitoの230件は資格別でも80/80/70件を検証し、すべてエラー0・警告0。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：既定ヒープのOOM後、8GBで通過。最終表示変更も同じ設定で再確認し、通過した。
- 関連テスト10ファイル・177テスト通過：独立転記した公式220択一正答、記述式10原問、各科目の連番・問題数、1,100肢の解説、法令基準日、必要画像、230原問の演習可能性、公開ゲート、遅延ローダー、科目名・メタデータ、記述式の通常演習・ストリーム・自己確認・キーボード・無採点完了、既存土地家屋調査士の回帰を確認した。
- PDF照合で修正した主な抽出不備：令和6年度の正答行境界、CID文字、数式の添字、第三種法令問6の分数、印刷用ページ記号。
- `git diff --check`：通過。

`pnpm build`・デプロイ・pushは行っていない。公開カタログへの登録と公開切替も行っていない。取得不能PDFのURL一覧は空（0件）。

監督役へのコミット引渡しは`reports/khk-reito-latest2.bundle`を使用する。作業元のGitメタデータは読み取り専用のため、コミットの参照は別メタデータの`khk-reito-staging`ブランチに保存した。bundleは元HEADを前提とする差分bundleであり、検証後に生成した（bundle自身は自己参照を避けてコミットしない）。監督役は書込み可能なcheckoutで `git fetch /path/to/khk-reito-latest2.bundle khk-reito-staging:khk-reito-staging` として取り込める。

第一種学識の記述式は通常演習・ストリーム・問題ページで自己確認カードを使用する。KHKの公式問題・解答例へのリンクを示し、自動採点と0点の成績記録は行わない。土地家屋調査士の既存動作を含めた表示・キーボード・完了動作の回帰テストを通した。構造化データの問題著者もKHKとし、IPAの利用条件を誤表示しない。

bundleの`git bundle verify`に加え、別の/tmpリポジトリへ実際にfetchして、資格別の3コミットが含まれることと、3つの問題JSONが作業ツリーとバイト単位で一致することを確認した。
