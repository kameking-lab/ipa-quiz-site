# 司法試験予備試験 短答式（yobi-tanto）収録報告 2026-11-07

## 対象回と根拠
| 回 | 実施日 | 問題 | 正解及び配点 |
|---|---|---|---|
| 令和8年 | 2026-07-19 | [問題](https://www.moj.go.jp/jinji/shihoushiken/jinji07_00317.html)（001466957〜60） | [正解](https://www.moj.go.jp/jinji/shihoushiken/jinji07_00319.html)（001467794〜97） |
| 令和7年 | 2025-07-20 | [問題](https://www.moj.go.jp/jinji/shihoushiken/jinji07_00287.html)（001443616〜19） | [正解](https://www.moj.go.jp/jinji/shihoushiken/jinji07_00289.html)（001444173〜76） |

## 追加数
法律基本科目7科目、各年 95原問・137解答欄レコード（合計190原問・274レコード）。司法試験と本文完全一致の問（令和8年28問・令和7年30問）は解説を共有（`sharedWith`）。

## 除外とその理由
- **一般教養科目（各年44問中20問選択）**: 未収録。数式・図・英文長文を含み、本バッチでは法律科目を優先した（令和8年のテキスト層のみ `sources/2026-liberal-arts.json` に保存）。

## OCR・復元
令和7年の法律科目PDFは文字コード表が壊れており通常の抽出では文字化けする。グリフIDを埋め込みフォント（MS明朝・MSゴシック）の cmap で Unicode に戻して本文を得た。司法試験と同一の30問で完全一致、独自65問は独立レビューでページ画像と照合。解答欄番号の字形が分離した6か所・ルビ混入1か所を修正（各問の `transcriptionNote`）。

## 検証
ビルダー errors 0。独立レビュー RV5・RV6・RV11〜RV14（FAIL 3件は修正後 RV7・RV15 で再確認 PASS）。validate:questions・typecheck・関連テストは shiho-tanto と同じく成功。

## 未解決
公開判断、一般教養科目の扱い、部分点の表示方針。
