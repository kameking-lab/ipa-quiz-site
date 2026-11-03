# khk-reito 直近2回の収録監査

確認日：2026-11-03 UTC。独立レビュー（対象 `94db9767`）のFAIL指摘4項目を生成元から修正し、下記「独立レビュー指摘の修正と再検証」に記録した。今回の修正は未コミットの作業ツリー差分として監督役へ引き渡す。既存bundleには今回の修正を含まない。

オーナー指示に記された判断日時は2026-11-04 06:10としてそのまま記録する。実行環境の日付と区別する。

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

作業元の`.git`は環境の明示設定で読み取り専用であり、通常の`git fetch`は`cannot open '.git/FETCH_HEAD': Read-only file system`となる。初回収録時は作業元を変更せず、`/tmp/khk-reito-commits/.git`に書込み可能な別メタデータを用意し、作業ツリーの変更を資格ごとにコミットした。監督役が取り込めるGit bundleを出力した。今回のレビュー修正はコミットせず、作業ツリー差分として渡す。pushは実施しない。

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

## 初回収録時の検証・追加数（独立レビュー前の記録）

|資格|令和7年度|令和6年度|計|肢別解説の登録数|記述式|除外|
|---|---:|---:|---:|---:|---:|---:|
|第一種冷凍機械|40|40|80|350肢|10原問|0|
|第二種冷凍機械|40|40|80|400肢|0|0|
|第三種冷凍機械|35|35|70|350肢|0|0|
|合計|115|115|230|1,100肢|10原問|0|

- `pnpm install`：完了（pnpm 10.33.0、専用の/tmpキャッシュ・ストアを使用）。
- `pnpm validate:questions`：26,674件、ok=26,674、fail=0、warn=16,808。警告は既存データのもの。新規khk-reitoの230件は資格別でも80/80/70件を検証し、すべてエラー0・警告0。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：既定ヒープのOOM後、8GBで通過。最終表示変更も同じ設定で再確認し、通過した。
- 初回の関連テスト10ファイル・177テスト通過（解説の内容品質を保証する判定ではない）：独立転記した公式220択一正答、記述式10原問、各科目の連番・問題数、1,100肢の解説キー・文字数等の構造、法令基準日、必要画像、230原問の演習可能性、公開ゲート、遅延ローダー、科目名・メタデータ、記述式の通常演習・ストリーム・自己確認・キーボード・無採点完了、既存土地家屋調査士の回帰を確認した。
- PDF照合で修正した主な抽出不備：令和6年度の正答行境界、CID文字、数式の添字、第三種法令問6の分数、印刷用ページ記号。
- `git diff --check`：通過。

`pnpm build`・デプロイ・pushは行っていない。公開カタログへの登録と公開切替も行っていない。取得不能PDFのURL一覧は空（0件）。

初回収録時のコミット引渡しには`reports/khk-reito-latest2.bundle`を使用した（今回の修正は含まない）。作業元のGitメタデータは読み取り専用のため、コミットの参照は別メタデータの`khk-reito-staging`ブランチに保存した。bundleは元HEADを前提とする差分bundleであり、検証後に生成した（bundle自身は自己参照を避けてコミットしない）。監督役は書込み可能なcheckoutで `git fetch /path/to/khk-reito-latest2.bundle khk-reito-staging:khk-reito-staging` として取り込める。

第一種学識の記述式は通常演習・ストリーム・問題ページで自己確認カードを使用する。KHKの公式問題・解答例へのリンクを示し、自動採点と0点の成績記録は行わない。土地家屋調査士の既存動作を含めた表示・キーボード・完了動作の回帰テストを通した。構造化データの問題著者もKHKとし、IPAの利用条件を誤表示しない。

初回bundle作成時には`git bundle verify`に加え、別の/tmpリポジトリへ実際にfetchして、資格別の3コミットが含まれることと、3つの問題JSONが当時の作業ツリーとバイト単位で一致することを確認した。今回のレビュー修正はそのbundleに含まれない。


## 独立レビュー指摘の修正と再検証

対象コミット `94db9767` の独立レビュー判定はFAIL。正答番号・件数の一致や既存テスト通過では検出できなかった内容上の不備として受け入れ、以下を修正した。ここでの修正・検証完了は、独立レビューの再PASSを意味しない。

1. **[P1] 令和6年度 第一種・第二種 法令問1**：`first-notes.json` の `R6ACGX-W`、`second-notes.json` の `R6ACHX-W` を修正。圧縮ガスの定義には常用温度で1MPa以上という条件に加えて「現に1MPa以上」が必要。本問は現在0.9MPaであり、40℃で1MPaなので35℃の条件も満たさず、高圧ガスではない。ロは正しい、ハは誤り、正答⑶「イ、ロ」と整合する解説にした。総合解説と各5選択肢へ反映済み。根拠：[公式原問](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACGX-W.pdf)、[公式正答](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_kaitou.pdf)、[高圧ガス保安法第2条（試験基準日前の施行版）](https://laws.e-gov.go.jp/law/326AC0000000204/20231221_504AC0000000074)。
2. **[P2] 第一種 保安管理技術の説明不足2問**：`first-notes.json` の該当項目を修正し、総合解説・各5選択肢を再生成した。令和7年度問6ハは、外表面積基準に換算した汚れ熱抵抗fについて `1/K＝1/K₀＋f` と表せるため、同じ汚れ係数の増分に対する熱通過率の低下は次第に緩やかになる。「低下割合が大きくなる」という後半が誤りであることを明記した。清浄時からの累積低下率とは区別する。これは[日本機械学会の熱通過率の式](https://www.jsme.or.jp/jsme-medwiki/doku.php?id=10%3A1009677)からの計算による説明であり、KHKが解説を公表したという意味ではない。[公式原問](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACGY-W.pdf)のイ・ロ・ニも理由とともに説明した。令和6年度問2ロは、蒸発圧力調整弁を感温筒・均圧管の取付位置より下流（圧縮機側）に配置し、蒸発器出口の温度・圧力を検出することを明記した。イ・ハの正しい理由と、ニの単位冷凍能力当たり消費動力が増加する理由も保持した。根拠：[公式原問](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACGY-W.pdf)。
3. **[P2] 令和7年度 第二種 学識問4ロの指数**：`scripts/khk-reito-build.py` に原本照合済みの個別補正と抽出文字列の一致チェックを追加。`Ｅ＝σＴ⁴` とし、同じ記述の単位も `ｋＷ/ｍ²`、`ｍ²・Ｋ⁴` に補正した。[公式PDF本文3ページ](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACHZ-W.pdf)を画像で照合済み。
4. **[P3] 令和6年度 第一種 学識問2の記入前線図**：`scripts/khk-reito-figures.py` の切り出し下端を435ptから460ptへ拡張し、PNGを再生成。837×600pxとなり、横軸h全体と下側余白を目視確認した。濃度128未満の描画画素から画像下端まで59pxの余白がある。[公式解答用紙5ページ](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACGZK-W.pdf)と照合した。

### 全肢解説の再評価

従来の「全肢解説完了」という記載を、1,100肢への解説登録・構造検証の実績として読み替えた。5つの解説キー、文字数、選択肢間の差分を確認するだけでは、各記述の正誤理由の十分性を保証できない。指摘対象の法令2問・保安2問は、各記述の正誤とその理由を補い、総合解説と全選択肢に反映したことを内容確認したため、`explanationCoverage: "full"` を維持する。今回、指摘対象以外の全解説を独立に再監査したとは扱わない。

### 再生成・差分照合

```sh
python scripts/khk-reito-extract.py /tmp/khk-reito-pdfs
python scripts/khk-reito-build.py /tmp/khk-reito-pdfs 1
python scripts/khk-reito-build.py /tmp/khk-reito-pdfs 2
python scripts/khk-reito-build.py /tmp/khk-reito-pdfs 3
python scripts/khk-reito-figures.py /tmp/khk-reito-pdfs 1
python scripts/khk-reito-figures.py /tmp/khk-reito-pdfs 2
```

再生成をもう一度実行し、問題JSON3点・出典台帳3点・画像8点の計14ファイルがバイト単位で同一になることを確認した。差分は解説4問、本文の数式1問、線図1点。全230問のID・件数（80/80/70）、全220択一正答番号・選択肢、記述式10問のanswer/modelAnswerは元データと一致する。第三種の問題JSON、出典台帳、残り7画像には差分なし。原本PDF22点のSHA-256を出典台帳と再照合し、22/22一致した。

### 再検証結果（2026-11-03 UTC）

コマンド実行時は書込み可能なCorepackキャッシュ `COREPACK_HOME=/tmp/khk-corepack` を使用した。

- `pnpm validate:questions`：26,674件、ok=26,674、fail=0、warn=16,808（既存データの警告）。
- `pnpm validate:questions --exam=khk-reito-1,khk-reito-2,khk-reito-3`：230件、ok=230、fail=0、warn=0。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：終了コード0、通過。
- 関連テスト：下記10ファイル・99テスト通過。うちkhk-reitoは14テストで、今回追加の5テストが法令2問・保安2問の総合解説／全選択肢、数式1問を確認する。公式220択一正答列、記述式、収録数、公開ゲート、ローダー、科目、演習の表示・操作・完了、土地家屋調査士の回帰も通過した。初回177テストの記録とは別の、下記コマンドによる今回の実測値である。
- `git diff --check`：通過。

```sh
pnpm exec vitest run \
  __tests__/questions/khk-reito-staging.test.ts \
  __tests__/components/QuizPlayer.descriptive.test.tsx \
  __tests__/components/QuizPlayer.keyboard.test.tsx \
  __tests__/components/StreamQuizPlayer.keyboard.test.tsx \
  __tests__/components/QuizPlayer.completion.test.tsx \
  __tests__/lib/exam-config-integrity.test.ts \
  __tests__/lib/home-directory.test.ts \
  __tests__/lib/practice-session.test.ts \
  __tests__/lib/questions-load.test.ts \
  __tests__/questions/chosashi-integrity.test.ts
```

実行ログ：`/tmp/khk-reito-review-validate.log`、`/tmp/khk-reito-review-target-validate.log`、`/tmp/khk-reito-review-typecheck.log`、`/tmp/khk-reito-review-related-tests.log`。

今回の変更は`.git`読み取り専用のためコミットせず、監督役が作業ツリー差分を保存する。既存の `reports/khk-reito-latest2.bundle` は初回成果の保存物であり、今回の修正を取り込む用途には使わない。
