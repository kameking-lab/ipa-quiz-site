# W6 再確認: dekyo.or.jp と anta.or.jp（2026-11-06）

対象3資格（工事担任者 / 電気通信主任技術者 / 国内旅行業務取扱管理者）は、公式サイトが
メンテナンス中のため **追加0問**。ログイン・CAPTCHA・ボット回避は行っていない。

## 工事担任者（koutan）・電気通信主任技術者（denki-tsushin-shunin）

一般財団法人日本データ通信協会（デ協）。2026-11-06 に通常の HTTP GET で確認した。

| URL | 結果 |
| --- | --- |
| https://www.dekyo.or.jp/shiken/charge/exam | 302 → https://www.dekyo.or.jp/mtninfo.html |
| https://www.dekyo.or.jp/ | 302 → https://www.dekyo.or.jp/mtninfo.html |
| https://www.dekyo.or.jp/shiken/assets/files/articles/2563/files25636a1629f1a9617.pdf（令和8年度第1回 総合通信 問題） | 302 → mtninfo.html |
| https://www.dekyo.or.jp/shiken/assets/files/articles/2527/files2527692638fe67579.pdf（令和7年度第2回 総合通信 問題） | 302 → mtninfo.html |

メンテナンス案内ページの本文には「ただいまシステムメンテナンス中です」とあり、
2026年11月6日時点の注記として個人情報の漏洩は発生していないと記載されている。
試験そのものは継続しており、同ページから令和8年度第2回工事担任者定期試験（試験日11月22日）の
会場案内が CBT 事業者のサイト（cbt-s.com）へ案内されている。試験問題・正答のPDFは配信されていない。

既存の WIP（`origin/claude/dreamy-fermi-y13gi9` の `reports/cloud-koutan-latest2.md`、
`origin/ops/source-pdfs-20261104/koutan/`）も、2026-11-03 時点で同じ理由により取得0件で、
MANIFEST.json は空配列、FAILED.json にメンテナンス転送が記録されている。
その監査で特定された問題・正答PDFの直接URL（全10件）は上記のとおり現在も302のままで、
**取り込んで続けられる問題データは存在しない**（監査資料のみ）。

電気通信主任技術者も同じドメイン・同じ一覧ページ配下であり、対象回の特定自体ができない。

次の着手条件: `https://www.dekyo.or.jp/shiken/charge/exam` が 200 で一覧HTMLを返し、
問題・正答PDFが `%PDF-` で取得できること。再開時は一覧を再取得して対象回を確認し直す
（検索キャッシュの本文を公式の現行掲載とみなさない）。

## 国内旅行業務取扱管理者（kokunai-ryoko）

全国旅行業協会（ANTA）。

| URL | 結果 |
| --- | --- |
| https://www.anta.or.jp/ | 302 → http://www.anta.or.jp/maintenance.html |
| http://www.anta.or.jp/maintenance.html | 301（CloudFront）でメンテナンス案内へ |

サイト全体がメンテナンス中で、過去問の一覧ページ・PDFに到達できない。対象回（直近2回）の
特定もできないため、問題データは作成していない。

なお、同系の旅行業務取扱管理者では、総合旅行業務取扱管理者（jata-net.or.jp）と
地域限定旅行業務取扱管理者（観光庁、既収録）は公式掲載が生きている。国内の代替として
これらを使う判断は親に委ねる（本バッチの担当範囲外）。

## まとめ

| 資格 | 追加問数 | 理由 |
| --- | ---: | --- |
| 工事担任者（4種別） | 0 | dekyo.or.jp がメンテナンス中（一覧・PDFとも302） |
| 電気通信主任技術者 | 0 | 同上。対象回の特定も不可 |
| 国内旅行業務取扱管理者 | 0 | anta.or.jp がサイト全体メンテナンス中 |
