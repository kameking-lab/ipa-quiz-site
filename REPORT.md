# SRCPDF1 結果（2026-11-04）

通常HTTP GETで公式PDF 48件（60,485,175バイト）を取得。PDF URLの取得失敗36件、公式一覧の確認不能1件。全資格2回分の完了ではありません。

保存先：`C:/Users/kanet/20260522/wt-srcpdf`。専用orphanブランチ：`ops/source-pdfs-20261104`。

権利はオーナー決定2026-11-04 01:30に従い確認済みとして実施。通常HTTP GET（ブラウザ相当User-Agent）のみ使用。ログイン・CAPTCHA・ボット拒否回避、拒否後の再取得、非公式配布元からのPDF取得は実施していません。HTTP 202/403/404等・メンテナンスHTMLはPDFとして保存していません。

## 取得数（実PDFファイル）

|スラッグ|取得PDF数|失敗PDF URL数|確認した回・補足|
|---|---:|---:|---|
|sekou-1kenchiku|2|0|["令和8年度", "令和7年度"]。過去問一覧・年度日程一覧および各公式実施日程で確認。令和7年度URLは検索結果から発見。|
|sekou-2kenchiku|2|0|["令和8年度前期", "令和7年度後期"]。公式一覧で確認。令和8年度後期は2026-11-08予定のため未実施。|
|sekou-1denki|2|0|["令和8年度", "令和7年度"]。過去問一覧・年度日程一覧および各公式実施日程で確認。令和7年度URLは検索結果から発見。|
|sekou-2denki|2|0|["令和8年度前期", "令和7年度後期"]。公式一覧で確認。令和8年度後期は2026-11-08予定のため未実施。|
|sekou-1kankoji|3|3|["令和8年度", "令和7年度"]。令和8年度は公式一覧。令和7年度第一次の項目は公式一覧の検索結果と公式正答PDFの検索結果で確認したが、現行一覧では掲載終了。旧URLの問題A・B・正答はすべてHTTP 404。|
|koutan|0|0|null。メンテナンスのため4区分すべて直近2回を確認できず、回・PDF URLは未確定。|
|keiryoshi|9|9|["第76回（令和7年12月）", "第75回（令和6年12月）"]。公式一覧で確認。法規・管理・正解番号は3資格共通。PDF実ファイルは重複保存していない。|
|yamaguchi-shoku|6|0|["令和8年度（ふぐは令和8年）", "令和7年度（ふぐは令和7年）"]。3資格とも公式一覧で確認。各PDFは問題・正答を同梱。|
|kenki|22|0|["令和8年度", "令和7年度"]。公式履歴一覧と両年度の公表ページで確認。2級は共通・第1〜6種問題、共通正答・種別正答を保存。解答用紙・第二次検定は対象外。|
|senmon-chori|0|24|{"すし料理・中国料理・給食用特殊料理": ["2026年度前期", "2025年度前期"], "日本料理・西洋料理・麺料理": ["2025年度後期", "2024年度後期"]}。指定lq2b-report.mdの24件を現行公式一覧に照合。全24 URLが掲載されている。実技は対象外。|

資格別：1級建築2、2級建築2、1級電気2、2級電気2、1級管工事3、工事担任者4区分とも0。一般計量士・環境計量士濃度・騒音振動は各5ファイル参照（各2専門科目＋法規・管理・共通正答、重複を除く実ファイル計9）。山口県は調理師2・製菓衛生師2・ふぐ処理師2。建設機械は1級4・2級18。専門調理師は6料理とも0（各4URL失敗）。

## 失敗URL（Claude引継ぎ）

以下は各スラッグの `FAILED.json` にも記録。工事担任者は一覧確認不能のため、直近2回を推測していません。

### sekou-1kankoji

- 令和7年度 / 正答: https://www.jctc.jp/wjctcp/wp-content/uploads/2025/09/20250908k_seitou.pdf — ValueError: HTTP 404
- 令和7年度 / 問題: https://www.jctc.jp/wjctcp/wp-content/uploads/2025/09/20250908k_mondaia.pdf — ValueError: HTTP 404
- 令和7年度 / 問題: https://www.jctc.jp/wjctcp/wp-content/uploads/2025/09/20250908k_mondaib.pdf — ValueError: HTTP 404

### koutan

- 回未確定（4区分） / 公式一覧（問題・正答PDFの特定）: https://www.dekyo.or.jp/shiken/charge/exam — 公式一覧からメンテナンス画面へ転送。直近2回・PDF URLは確認不能。推測URLへのアクセスなし。

### keiryoshi

- 第75回（令和6年12月） / 問題: https://www.meti.go.jp/policy/economy/hyojun/techno_infra/1_R06kanka.pdf — HTTP 202; PDFではない応答のため未保存。チャレンジ等の回避・再試行なし。
- 第75回（令和6年12月） / 問題: https://www.meti.go.jp/policy/economy/hyojun/techno_infra/2_R06kanbutsu.pdf — HTTP 202; PDFではない応答のため未保存。チャレンジ等の回避・再試行なし。
- 第75回（令和6年12月） / 問題: https://www.meti.go.jp/policy/economy/hyojun/techno_infra/3_R06kannou.pdf — HTTP 202; PDFではない応答のため未保存。チャレンジ等の回避・再試行なし。
- 第75回（令和6年12月） / 問題: https://www.meti.go.jp/policy/economy/hyojun/techno_infra/4_R06kanon.pdf — HTTP 202; PDFではない応答のため未保存。チャレンジ等の回避・再試行なし。
- 第75回（令和6年12月） / 問題: https://www.meti.go.jp/policy/economy/hyojun/techno_infra/5_R06houki.pdf — HTTP 202; PDFではない応答のため未保存。チャレンジ等の回避・再試行なし。
- 第75回（令和6年12月） / 問題: https://www.meti.go.jp/policy/economy/hyojun/techno_infra/6_R06kanri.pdf — HTTP 202; PDFではない応答のため未保存。チャレンジ等の回避・再試行なし。
- 第75回（令和6年12月） / 問題: https://www.meti.go.jp/policy/economy/hyojun/techno_infra/7_R06ichiki.pdf — HTTP 202; PDFではない応答のため未保存。チャレンジ等の回避・再試行なし。
- 第75回（令和6年12月） / 問題: https://www.meti.go.jp/policy/economy/hyojun/techno_infra/8_R06keishitsu.pdf — HTTP 202; PDFではない応答のため未保存。チャレンジ等の回避・再試行なし。
- 第75回（令和6年12月） / 正答: https://www.meti.go.jp/policy/economy/hyojun/techno_infra/75seikaibangou.pdf — HTTP 202; PDFではない応答のため未保存。チャレンジ等の回避・再試行なし。

### senmon-chori

- 2026年度前期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/08/R08_gakka_mondai_sushi.pdf — ValueError: HTTP 403
- 2026年度前期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/08/R08_gakka_kaitou_sushi.pdf — ValueError: HTTP 403
- 2026年度前期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/08/R08_gakka_mondai_chuugoku.pdf — ValueError: HTTP 403
- 2026年度前期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/08/R08_gakka_kaitou_chuugoku.pdf — ValueError: HTTP 403
- 2026年度前期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/08/R08_gakka_mondai_kyuusyoku.pdf — ValueError: HTTP 403
- 2026年度前期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/08/R08_gakka_kaitou_kyuusyoku.pdf — ValueError: HTTP 403
- 2025年度後期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/01/R07_nihon_mondai.pdf — ValueError: HTTP 403
- 2025年度後期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/01/R07_nihon_gakka_kaitou.pdf — ValueError: HTTP 403
- 2025年度後期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/01/R07_seiyou_mondai.pdf — ValueError: HTTP 403
- 2025年度後期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/01/R07_seiyou_gakka_kaitou.pdf — ConnectTimeout: HTTPSConnectionPool(host='chouri-ggc.or.jp', port=443): Max retries exceeded with url: /cms/wp-content/uploads/2026/01/R07_seiyou_gakka_kaitou.pdf (Caused by ConnectTimeoutError(<HTTPSConnection(host='chouri-ggc.or.jp', port=443) at 0x5a0b408>, 'Connection to chouri-ggc.or.jp timed out. (connect timeout=45)'))
- 2025年度後期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2022/01/R07_men_mondai.pdf — ValueError: HTTP 403
- 2025年度後期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2022/01/R07_men_gakka_kaitou.pdf — ValueError: HTTP 403
- 2025年度前期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_monndai_sushi.pdf — ValueError: HTTP 403
- 2025年度前期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_kaitou_sushi.pdf — ValueError: HTTP 403
- 2025年度前期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_mondadi_chuugoku.pdf — ValueError: HTTP 403
- 2025年度前期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_kaitou_chuugoku.pdf — ValueError: HTTP 403
- 2025年度前期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_mondai_kyuusyoku.pdf — ValueError: HTTP 403
- 2025年度前期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_kaitou_kyuusyoku.pdf — ValueError: HTTP 403
- 2024年度後期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_nihon_mondai.pdf — ValueError: HTTP 403
- 2024年度後期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_niho_gakka_kaitou.pdf — ValueError: HTTP 403
- 2024年度後期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_seiyou_monndai.pdf — ValueError: HTTP 403
- 2024年度後期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_seiyou_gakka_kaitou.pdf — ValueError: HTTP 403
- 2024年度後期 / 問題: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_men_mondai.pdf — ValueError: HTTP 403
- 2024年度後期 / 正答: https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_men_gakka_kaitou.pdf — ValueError: HTTP 403

## 形式・検証

各 `MANIFEST.json` は取得成功PDFだけを列挙し、資格・回・種別・元URL・取得日時（UTC ISO 8601）・SHA256・バイト数・ページ数を保持。`LISTINGS.json` は公式一覧の取得結果、`COVERAGE.json` は2回分の対象と不足を保持します。問題・正答の合冊PDFは1ファイルとして計数しています。

全PDFに `%PDF-` ヘッダーがあり、pypdfでページ構造を読み取れることを確認。保存後のバイト数・SHA256・ページ数を48件すべて再計算してmanifestと照合済み。文字抽出が困難だった建築3PDFは画像化して末尾の正答ページを目視確認済み。試験内容の校正や問題データ化は本タスクの対象外。

## Git引継ぎ

`git fetch origin ops/source-pdfs-20261104` でクラウドから取得可能。orphanコミットでアプリ履歴・アプリファイルを含めず、このブランチだけをpushします。main・他ブランチへの変更・PR作成は行いません。
