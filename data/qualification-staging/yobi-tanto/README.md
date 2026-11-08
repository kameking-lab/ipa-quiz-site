# 司法試験予備試験 短答式（法律基本科目）・未公開ステージング

令和8年（2026-07-19実施）・令和7年（2025-07-20実施）の短答式のうち法律基本科目7科目（憲法・行政法・民法・商法・民事訴訟法・刑法・刑事訴訟法）。各年 95原問・137解答欄。**一般教養科目は未収録**（令和8年分のテキスト層のみ `sources/2026-liberal-arts.json` に保存）。

**未公開。** `publishable: false`、全レコード `publicAllowed: false`。差分案は `reports/yobi-tanto-registry.md`。

- 司法試験と本文完全一致の問（令和8年28問・令和7年30問）は editorial で `sameAs` とし、解説を共有。レコードには `sharedWith` を付ける。
- **令和7年の法律科目PDF（001443616〜18）は ToUnicode が壊れていて文字を抽出できない。** PyMuPDF のテキストトレースからグリフIDを取り出し、埋め込みフォント（MS明朝・MSゴシック）の cmap で Unicode に戻した（`sources/2025-*.json` の `generatedBy`）。同一の司法試験30問で本文が完全一致することを確認。解答欄番号の字形が本文中に分離した6か所・ルビ混入1か所は修正し、各問の `transcriptionNote` に記録。令和7年刑訴第26問の「Ｉ．」はグリフが全角Ｉ（U+FF29）のため原文どおり。
- 解答形式の写像・部分点の扱いは shiho-tanto と同じ（`data/qualification-staging/shiho-tanto/README.md`）。

再生成・検証は shiho-tanto と同じコマンド（`scripts/build-moj-tanto-staging.py` が両方を扱う）。
