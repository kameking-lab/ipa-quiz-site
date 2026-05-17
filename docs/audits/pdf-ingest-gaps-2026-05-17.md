# IPA PDF 取り込みカバレッジ監査

- 生成日: 2026-05-17
- ソース: `scripts/audit-pdf-coverage.ts`
- 対象データ: `data/questions/<exam>/by-year/**`

## サマリ

- 想定スロット数: 442 (exam × year × season × session)
- complete: 341
- partial: 8
- missing: 93
- 想定問題数合計: 17514
- 実問題数合計: 14402
- ギャップ合計: 3112

## 試験区分別カバレッジ

- **IP** ITパスポート試験: 想定 2900 / 実 2398 (slots: complete=24 / missing=5 / total=29)
- **SG** 情報セキュリティマネジメント試験: 想定 544 / 実 442 (slots: complete=8 / missing=0 / total=11)
- **FE** 基本情報技術者試験: 想定 2000 / 実 1747 (slots: complete=21 / missing=2 / total=28)
- **AP** 応用情報技術者試験: 想定 2720 / 実 2640 (slots: complete=33 / missing=1 / total=34)
- **ST** ITストラテジスト試験: 想定 935 / 実 680 (slots: complete=24 / missing=10 / total=34)
- **SA** システムアーキテクト試験: 想定 935 / 実 680 (slots: complete=24 / missing=10 / total=34)
- **PM** プロジェクトマネージャ試験: 想定 935 / 実 680 (slots: complete=24 / missing=10 / total=34)
- **NW** ネットワークスペシャリスト試験: 想定 935 / 実 680 (slots: complete=24 / missing=10 / total=34)
- **DB** データベーススペシャリスト試験: 想定 935 / 実 680 (slots: complete=24 / missing=10 / total=34)
- **ES** エンベデッドシステムスペシャリスト試験: 想定 935 / 実 680 (slots: complete=24 / missing=10 / total=34)
- **SC** 情報処理安全確保支援士試験: 想定 1870 / 実 1735 (slots: complete=63 / missing=5 / total=68)
- **SM** ITサービスマネージャ試験: 想定 935 / 実 680 (slots: complete=24 / missing=10 / total=34)
- **AU** システム監査技術者試験: 想定 935 / 実 680 (slots: complete=24 / missing=10 / total=34)

## 不足スロット (missing + partial)

格納形式: `<exam>/<year>-<season>/<session>` 想定<expected> 実<actual> gap=<gap> [flags]

- `ap/2020-spring/am` 想定80 実0 gap=80 [MISSING]
- `au/2011-spring/am1` 想定30 実0 gap=30 [legacy,MISSING]
- `au/2011-spring/am2` 想定25 実0 gap=25 [legacy,MISSING]
- `au/2012-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `au/2013-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `au/2014-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `au/2015-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `au/2016-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `au/2017-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `au/2018-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `au/2019-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `db/2011-spring/am1` 想定30 実0 gap=30 [legacy,MISSING]
- `db/2011-spring/am2` 想定25 実0 gap=25 [legacy,MISSING]
- `db/2012-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `db/2013-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `db/2014-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `db/2015-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `db/2016-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `db/2017-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `db/2018-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `db/2019-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `es/2011-spring/am1` 想定30 実0 gap=30 [legacy,MISSING]
- `es/2011-spring/am2` 想定25 実0 gap=25 [legacy,MISSING]
- `es/2012-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `es/2013-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `es/2014-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `es/2015-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `es/2016-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `es/2017-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `es/2018-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `es/2019-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `fe/2011-spring/am` 想定80 実0 gap=80 [MISSING]
- `fe/2023-cbt/kamoku-a` 想定60 実20 gap=40 [CBT,partial]
- `fe/2023-cbt/kamoku-b` 想定20 実0 gap=20 [CBT,MISSING]
- `fe/2024-cbt/kamoku-a` 想定60 実20 gap=40 [CBT,partial]
- `fe/2024-cbt/kamoku-b` 想定20 実5 gap=15 [CBT,partial]
- `fe/2025-cbt/kamoku-a` 想定60 実20 gap=40 [CBT,partial]
- `fe/2025-cbt/kamoku-b` 想定20 実2 gap=18 [CBT,partial]
- `ip/2011-spring/am` 想定100 実0 gap=100 [MISSING]
- `ip/2016-spring/am` 想定100 実0 gap=100 [MISSING]
- `ip/2020-spring/am` 想定100 実0 gap=100 [MISSING]
- `ip/2021-cbt/am` 想定100 実0 gap=100 [CBT,MISSING]
- `ip/2025-cbt/am` 想定100 実0 gap=100 [CBT,MISSING]
- `nw/2012-spring/am2` 想定25 実0 gap=25 [MISSING]
- `nw/2013-spring/am2` 想定25 実0 gap=25 [MISSING]
- `nw/2014-spring/am2` 想定25 実0 gap=25 [MISSING]
- `nw/2015-spring/am2` 想定25 実0 gap=25 [MISSING]
- `nw/2016-spring/am2` 想定25 実0 gap=25 [MISSING]
- `nw/2017-spring/am2` 想定25 実0 gap=25 [MISSING]
- `nw/2018-spring/am2` 想定25 実0 gap=25 [MISSING]
- `nw/2019-spring/am2` 想定25 実0 gap=25 [MISSING]
- `nw/2020-spring/am1` 想定30 実0 gap=30 [MISSING]
- `nw/2020-spring/am2` 想定25 実0 gap=25 [MISSING]
- `pm/2011-spring/am1` 想定30 実0 gap=30 [legacy,MISSING]
- `pm/2011-spring/am2` 想定25 実0 gap=25 [legacy,MISSING]
- `pm/2012-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `pm/2013-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `pm/2014-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `pm/2015-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `pm/2016-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `pm/2017-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `pm/2018-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `pm/2019-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `sa/2012-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sa/2013-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sa/2014-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sa/2015-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sa/2016-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sa/2017-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sa/2018-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sa/2019-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sa/2020-spring/am1` 想定30 実0 gap=30 [MISSING]
- `sa/2020-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sc/2011-spring/am1` 想定30 実0 gap=30 [MISSING]
- `sc/2011-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sc/2012-autumn/am2` 想定25 実0 gap=25 [MISSING]
- `sc/2020-spring/am1` 想定30 実0 gap=30 [MISSING]
- `sc/2020-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sg/2023-cbt/kamoku-a` 想定48 実14 gap=34 [CBT,partial]
- `sg/2024-cbt/kamoku-a` 想定48 実15 gap=33 [CBT,partial]
- `sg/2025-cbt/kamoku-a` 想定48 実13 gap=35 [CBT,partial]
- `sm/2012-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sm/2013-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sm/2014-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sm/2015-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sm/2016-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sm/2017-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sm/2018-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sm/2019-spring/am2` 想定25 実0 gap=25 [MISSING]
- `sm/2020-spring/am1` 想定30 実0 gap=30 [MISSING]
- `sm/2020-spring/am2` 想定25 実0 gap=25 [MISSING]
- `st/2012-spring/am2` 想定25 実0 gap=25 [MISSING]
- `st/2013-spring/am2` 想定25 実0 gap=25 [MISSING]
- `st/2014-spring/am2` 想定25 実0 gap=25 [MISSING]
- `st/2015-spring/am2` 想定25 実0 gap=25 [MISSING]
- `st/2016-spring/am2` 想定25 実0 gap=25 [MISSING]
- `st/2017-spring/am2` 想定25 実0 gap=25 [MISSING]
- `st/2018-spring/am2` 想定25 実0 gap=25 [MISSING]
- `st/2019-spring/am2` 想定25 実0 gap=25 [MISSING]
- `st/2020-spring/am1` 想定30 実0 gap=30 [MISSING]
- `st/2020-spring/am2` 想定25 実0 gap=25 [MISSING]

## 注記

- CBT 期 (IP 2021+, FE/SG 2023+) の PDF URL は IPA 側で公開形式が変則的なため
  `buildPdfUrl` は空文字を返す。URL マニフェストでも qsPdfUrl/ansPdfUrl は空。
- legacy フラグは 2009-2011 の高度試験 (春⇄秋スワップ) を示す。
- `complete` は実 ≥ 想定×0.9 を意味する。hasImage 除外で減ったケースを許容。
- 本監査は `ALL_QUESTIONS` (午前のみ) を対象。午後・論述は別管理。
