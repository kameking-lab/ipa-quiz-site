# 通関士（tsukanshi）収録報告 2026-11-07

## 対象回と根拠
| 回 | 実施日 | 問題 | 正答 | 扱い |
|---|---|---|---|---|
| 第60回 | 2026-10-04 | [問題](https://www.customs.go.jp/tsukanshi/60_shiken/60shikenkaito.html)（20261004tukanshi01〜04） | 未掲載（2026-11-10 合格発表以降の予定） | 問題文のみ転記（59原問、`sources/transcription-60.json`） |
| 第59回 | 2025-10-05 | [問題](https://www.customs.go.jp/tsukanshi/59_shiken/59shikenkaito.html)（20251005tukanshi01〜04） | [正答及び配点](https://www.customs.go.jp/tsukanshi/59_shiken/59shiken_seikai.pdf) | 全肢解説付きで収録 |

## 追加数
第59回 65原問（通関業法20・関税法等30・通関実務15）、105解答単位。既存WIP（claude/compassionate-brahmagupta-wkiu7v）の転記・正答を取り込み、解説を全空欄・全記述・計算過程ごとに書き直した。

## 除外
- 通関実務 第1・2問（第59回・第60回とも）: 申告書作成式（別紙仕入書・別冊を使う欄入力）で既存の問題形式で表せない。
- 第58回: 第59回と第60回（正答公表後）で直近2回になるため着手していない。

## 第60回を仕上げる手順（11/10以降）
1. 税関の第60回ページで正答PDFを確認し、`official-answers.json` の "60" に科目・問ごとの正答を入れる（画像で目視照合）。
2. `sources/transcription-60.json` の `officialAnswers` を埋め、`editorial/60-<session>.json` を TSUKAN-SPEC と同じ書式で作成。
3. `scripts/build-tsukanshi-staging.py` を第60回（構成：通関業法17・関税法等28・通関実務14、択一に「０」なしの問あり）に対応させて `2026.json` を生成し、独立レビュー。

## 検証
ビルダー errors 0（正答一致・全肢解説・計算値一致）。独立レビュー TRV1・TRV2（FAIL）→修正→RV15 再確認 PASS。関連テスト成功。

## 権利
税関の利用規約案内（https://www.customs.go.jp/kiyaku.htm）を記録。オーナー決定により権利文言では止めない。
