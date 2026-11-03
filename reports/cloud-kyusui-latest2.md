# 給水装置工事主任技術者：直近2回・全120問のステージング収録

確認日：2026-11-03（UTC）。実施団体：公益財団法人給水工事技術振興財団。

## 結果と方針変更

令和8年度（2026年度）・令和7年度（2025年度）の全120原問を、問題本文・全選択肢・公式最終正答・原問題画像とともに未公開で追加した。回の除外・問題の省略は0。類題や生成問題による置換はない。

| 対象回 | 試験日 | 学科試験1 | 学科試験2 | 収録数 | 省略数 |
| --- | --- | ---: | ---: | ---: | ---: |
| 令和8年度 | 2026-10-25 | 問1〜40：40問 | 問41〜60：20問 | 60 | 0 |
| 令和7年度 | 2025-10-26 | 問1〜40：40問 | 問41〜60：20問 | 60 | 0 |
| 合計 | | 80 | 40 | **120** | **0** |

当ブランチの前回コミット `f5e3fcf9` による「問題未収録・許諾待ち・120問除外」の状態を、今回のオーナー決定（権利確認済み）に基づき置き換えた。既存登録の継続作業であり、重複登録として除外していない。資格台帳の同じ `slug: "kyusui"` を `permission-required` から `staging` に更新し、問題未収録や許諾待ちを現状として示す記載を削除した。この報告は前回の監査報告を更新したものである。

## 公式サイトでの対象回確認

[指定の過去問一覧](https://www.kyuukou.or.jp/shiken/jyuken-kakomon.html) の表は令和3〜7年度を掲載している。同ページには令和8年度の「試験問題・正答番号一覧」へのリンクもあり、リンク先の [当年度試験案内](https://www.kyuukou.or.jp/shiken/shiken-annai.html) で令和8年度の学科試験1・2と正答番号一覧が実際に公開されていることを確認した。令和8年度の正答公表日は2026-10-30で、確認日以前である。したがって対象は令和8年度・令和7年度であり、過去問表だけから令和7年度・令和6年度と推測していない。

| 対象回 | 学科試験1 | 学科試験2 | 正答 |
| --- | --- | --- | --- |
| 令和8年度 | [問1〜40](https://www.kyuukou.or.jp/shiken/file-r08/file-r08_gakka-01.pdf) | [問41〜60](https://www.kyuukou.or.jp/shiken/file-r08/file-r08_gakka-02.pdf) | [正答番号一覧](https://www.kyuukou.or.jp/shiken/file-r08/file-r08_seitou-num.pdf) |
| 令和7年度 | [問1〜40](https://www.kyuukou.or.jp/shiken/file-r07/file-r07_gakka-01.pdf) | [問41〜60](https://www.kyuukou.or.jp/shiken/file-r07/file-r07_gakka-02.pdf) | [正答番号一覧・問18訂正](https://www.kyuukou.or.jp/shiken/file-r07/file-r07_seitou-num.pdf) |

両回とも全問・正答が公式に公開済みのため、回のスキップはない。表紙の解答例・注意事項は実問題数に含めていない。

## 令和7年度問18の公式訂正

正答PDFの2ページ目で「正答肢なし・受験者全員正解」とされている。肢4の「埋設した年度」ではなく「埋設した年」であるべきことが訂正理由である。原文を修正して通常問題に変えることや、肢4を正答として補完することはしていない。

原問・5肢・画像を120問の中に保持し、`scoring.kind: "all-correct"`、`correctChoice: null` として公式の扱いと訂正ページを明記した。ステージング用の採点関数は、無回答を含め全員正解とする。通常の単一正答は119問、公式全員正解は1問で、保留・除外・未収録ではない。

## データと公開範囲

- 台帳：`lib/qualifications/catalog.ts`。新設の公開状態 `staging` と `stagingDataPath` で未公開の実データに結び付けた。
- データ入口：`data/qualification-staging/kyusui/index.ts`。型付きの `KYUSUI_STAGED_QUESTIONS` と公式扱いを反映する `scoreKyusuiStagedQuestion` を提供する。
- 年度別データ：同ディレクトリの `2026-annual.json`・`2025-annual.json`、各60問。原問番号、年度、試験日、学科区分、8科目、抽出本文、全肢、公式問題・正答URL、出典表記を保持する。
- 原問題画像：同ディレクトリの `assets/`、126枚。問題本文・図・表・空欄枠・数式・選択肢をPDFから144 dpiで切り出し、掲載範囲と出典ページ、SHA-256を記録した。問題画像と公式PDFが原文の正本となる。
- 原資料：同ディレクトリの `sources/` に公式問題4 PDF、正答2 PDF、確認した公式ページ3 HTMLを保存。`source-manifest.json` に全資料・画像のURL、ハッシュ、切出し座標、取得確認日と権利方針を記録した。
- 再生成：`scripts/import-kyusui-latest2.py`。Python 3・PyMuPDF（今回2.1）で実行する。ネットワークから取得するか、`--source-dir` で保存資料を指定できる。公開用ディレクトリには出力しない。

複数ページの計算問題は、令和7年度問33（3ページ）、令和8年度問33（2ページ）・問34（2ページ）・問35（3ページ）を欠かさず保持した。令和7年度問34は図中の5つの番号を選ぶ形式なので、図中番号に対応する肢として記録した。令和8年度問34の後続グラフ、問35の算出手順・計算欄は `postOptionContent` と画像に保持し、最終選択肢の本文と区別した。科目名は各PDFの見出しから取得した（学科2は問41〜51が概要、問52〜60が施工管理法）。

抽出テキストはPDFの配置を保った検索・編集確認用であり、ルビや表、数式の読み順が通常の文章と異なる場合があるため、原問題画像と原PDFを併せて保持する。`explanationCoverage` は全問 `official-summary` とし、公式正答と出題時点の扱いを示す要約を保存した。全肢の独自解説を作成済みとは扱わない。

未公開の指定に従い、`examCode`・公開用問題レジストリ・動的ローダー・公式PDFライブラリ・公開ルート・公開画像パスへの登録は行っていない。トップページと資格一覧は従来どおり `status === "live"` のみを表示する。ステージング資料はすべて `public/` の外にあり、通常の出題プールにも入らない。

## 転載禁止文言の記録

[サイトポリシー](https://www.kyuukou.or.jp/sitepolicy.html) には「当サイトに掲載の記述・写真の無断転載を禁じます。」との記載がある。この文言とURL・ページの保存資料・ハッシュを記録した。今回のオーナーによる権利確認済みの決定に従い、この文言を収録停止や許諾待ちの理由として扱っていない。

## 取得資料のSHA-256

保存先はいずれも `data/qualification-staging/kyusui/sources/`。公式PDF6点のハッシュは前回確認時の値とも一致した。

| 資料 | SHA-256 |
| --- | --- |
| jyuken-kakomon.html | `3b1919ae0013fe08bf09d894366a506da5002ba2169685b4b3f6fc00c8c75242` |
| shiken-annai.html | `29c355d7ee847ce069a4f1a253fd7c463462fc960692f488fcc4edf212ab8f9a` |
| sitepolicy.html | `c89aecdb9f83d89a13c05c300d4e367a7b4c9539e3482c2401de2ceb4d7079c8` |
| file-r08_seitou-num.pdf | `f5a0a5fe3d522278ceba843e35146fd1384525fa9bb871b072d91c6c915cac62` |
| file-r08_gakka-01.pdf | `1694eeadcdc008ec997f026d5b611e8af1d68dbd96dbfbb76eb00f73d39f1421` |
| file-r08_gakka-02.pdf | `7a36fcca01456e2378a451e6273515d314cc0183cc44bd66e628d39727ae4ac5` |
| file-r07_seitou-num.pdf | `d6d5403eb23e2d803327dd9b9c8f70f7d5c9702ebd7812c85d5ee46279b5b8fb` |
| file-r07_gakka-01.pdf | `a288de23dff69389e9bec0a7645e4eafb30d3d6d92c72f359cfc71e3ed9b4371` |
| file-r07_gakka-02.pdf | `6c776068efe70d9e5fa9497901d9fd6cb62468b5ab95489d01cca770a9560a01` |

## 検証

- 再生成：`PYTHONPATH=/tmp/kyusui-python python scripts/import-kyusui-latest2.py --source-dir /tmp/kyusui-latest2` 成功。120原問、126画像、9原資料、省略0。
- 新規の `__tests__/questions/kyusui-staging.test.ts` は、全問番号・公式正答全件・原資料と画像のハッシュ・出典・継続ページ・問18の全員正解・計算欄の分離・未公開状態を検証する。正答は別途読み取った期待値と、別のPDFエンジンPopplerの抽出結果の双方で照合する。
- Poppler `pdftotext -cropbox -bbox-layout` による独立した本文座標確認で、試験本文の5,054語について保存画像の範囲外にある語は0。見出し・フッターを除き、ルビ・図中テキストも確認範囲に含む。図形自体の意味の自動検証ではない。図中番号問題と継続グラフも画像を目視確認した。Popplerを使う2件の監査テストは `poppler-utils` 未導入環境では明示的にスキップする。今回の環境では両方を実行して成功した。
- `pnpm test __tests__/questions/kyusui-staging.test.ts __tests__/lib/home-directory.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/exam-library-model.test.ts`：4ファイル・37テストすべて成功（スキップ0）。
- `pnpm validate:questions`：成功。既存の公開プール26,444問、`ok=26444 fail=0 warn=16808`。ステージングの120問はこの公開プール検証に含まれず、上記の専用テストで検証した。既存警告の増加はない。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。
- `pnpm exec eslint data/qualification-staging/kyusui/index.ts __tests__/questions/kyusui-staging.test.ts lib/qualifications/catalog.ts`：成功。
- `git diff --check`：成功。

ビルド・デプロイ・公開操作は行っていない。
