# 司法試験 短答式（shiho-tanto）収録報告 2026-11-07

## 対象回と根拠
| 回 | 実施日 | 問題 | 正解及び配点 |
|---|---|---|---|
| 令和8年 | 2026-07-19（短答式） | [問題一覧](https://www.moj.go.jp/jinji/shihoushiken/jinji08_00295.html)（憲法 001466994・民法 001466995・刑法 001466996） | [短答式試験結果](https://www.moj.go.jp/jinji/shihoushiken/jinji08_00296.html)（001468205〜07） |
| 令和7年 | 2025-07-20 | [問題一覧](https://www.moj.go.jp/jinji/shihoushiken/jinji08_00267.html)（001443620〜22） | [短答式試験結果](https://www.moj.go.jp/jinji/shihoushiken/jinji08_00270.html)（001444424〜26） |
実施日は各年の「実施日程」PDF（001450988 / 001422325）で確認。SHA-256 は `data/qualification-staging/shiho-tanto/manifest.json`。

## 追加数
各年 77原問（憲法20・民法37・刑法20）、109解答欄レコード（記述ごと45・択一60・順不同2個選択4）。合計154原問・218レコード。全記述・全選択肢に独自解説（条文・判例付き）。

## 除外
なし。部分点（「2問正解で部分点1点」等）は再現せず、配点のみ `officialPoints` に保持。

## 検証
- ビルダー（逐語・網羅・公式正解・正誤整合）errors 0。
- 独立レビュー RV1〜RV4・RV7〜RV10。FAIL 2件は修正して再確認済み（`reports/shiho-tanto-review.md`）。
- `pnpm validate:questions` ok（公開データ 36,981件 fail 0）、`tsc --noEmit`（8GB）exit 0、`__tests__/questions/w3-law-customs-staging.test.ts` 6件成功。

## 権利
2026-11-04 オーナー決定により権利文言では止めない。法務省の利用規約（https://www.moj.go.jp/hisho06_00280.html）を出典表示の根拠として記録。

## 未解決
公開判断、部分点の表示方針。
