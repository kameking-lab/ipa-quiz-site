# REPORT — r8-zenki / shakai-fukushi（社会福祉）

令和8年度前期・地域限定保育士試験「社会福祉」（筆記試験日 2026-04-18 を `lawReferenceDate` に設定）

## 件数
- 収録数: **20 / 20問**
- HOLD: **0件**（図・写真・グラフに依存する設問なし）
- PARTIAL_HOLD: **0件**（全問、公式正答が一意）
- 査読 PASS: **20問すべて**（`reviewStatus: "PASS"`。選択肢解説100文すべて PASS、FIX_PENDING なし）
- 公式正答: `official-answers.json`（r8-zenki→社会福祉）と20問すべて一致することをスクリプトで照合済み
- 複数選択の問題: 問4 [3,4]、問5 [2,5]、問7 [2,5]、問8 [3,5]（requiredSelections=2）。その他は単一選択
- lawSensitive=true: 問3, 5, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19, 20

## 転記
- passA と passB を正規化して差分を取った。差分10か所はすべてページ番号フッターの位置ずれで、本文・選択肢・組み合わせ表の差異は0件（`transcription/notes.md`参照）。
- `final.json` の問題文の各行と組み合わせ表14問を passA と機械照合した。不一致は0件。

## 起稿・査読の流れ（claude CLI 呼び出し: 計5回、すべて `--model claude-opus-5-5 --output-format json`）
| # | 役割 | allowedTools | receipt |
|---|------|--------|---------|
| 1 | 起稿 問1〜10 | ""（ツールなし） | explanations/batch1.draft.receipt.json |
| 2 | 起稿 問11〜20 | ""（ツールなし） | explanations/batch2.draft.receipt.json |
| 3 | 査読 問1〜10（文単位） | WebFetch, WebSearch | explanations/review1.receipt.json |
| 4 | 査読 問11〜20（文単位） | WebFetch, WebSearch | explanations/review2.receipt.json |
| 5 | 再査読（FIX 1文と裏取りの弱い14文） | WebFetch, WebSearch | explanations/rereview1.receipt.json |

- `--dangerously-skip-permissions` / `--permission-mode bypassPermissions` 等の全許可オプションは5回とも未使用。5回すべてのreceipt JSONの `permission_denials` を確認したが、いずれも空配列（許可外ツールの呼び出し試行・拒否なし）。
- 1回目の査読: 99文 PASS、FIX 1文、HOLD 0文。
- 再査読（別セッション）で、FIXの修正文と、1回目に「検索結果の抜粋のみ」「条文未取得」と記録された14文を一次資料の本体で確認し直した。15文すべて PASS。

## 主な修正点
- **問15 選択肢1の解説（FIX→PASS）**: 起稿では、配偶者暴力相談支援センターを担う主体として都道府県の女性相談支援センターだけを挙げていた。これに、市町村も自ら設置する施設でその機能を果たすよう努める旨（配偶者暴力防止法第3条第2項）を補った。
- **再確認で裏付けを強化**（文言の変更なし）:
  - 問3: 1950年勧告の原文PDFを取得して確認（原文は「直接公の負担」）
  - 問4: グローバル定義の本文を確認
  - 問6: 設備運営基準 第27・38・42・73・80条と児童相談所運営指針を確認
  - 問7: 老人福祉法第11条・第20条の5、社会福祉法第60・69条を確認

## 査読者のコメント（参考。判定には影響なし）
- 問10 Ｂ（代弁・権利擁護）: 一般には「アドボカシー」の説明とされ、ソーシャルアクションに含めるかは論者によって見解が分かれる、との指摘があった。公式正答（1: すべて○）は一意に定まっているので PARTIAL_HOLD にはしていない。統括側で要否を判断してほしい。
- 問20 Ｂ: 設問文は旧「障害程度区分」の定義とほぼ同じ文言。現行の障害支援区分の定義（障害者総合支援法第4条第4項）と異なるので×、という解説は条文と整合する。

## 参照した一次資料URL
- https://laws.e-gov.go.jp/law/322AC0000000164 （児童福祉法）
- https://laws.e-gov.go.jp/law/323AC0000000198 （民生委員法）
- https://laws.e-gov.go.jp/law/323M40000100063 （児童福祉施設の設備及び運営に関する基準）
- https://laws.e-gov.go.jp/law/326AC0000000045 （社会福祉法）
- https://laws.e-gov.go.jp/law/338AC0000000133 （老人福祉法）
- https://laws.e-gov.go.jp/law/345AC1000000084 （障害者基本法）
- https://laws.e-gov.go.jp/law/409AC0000000123 （介護保険法）
- https://laws.e-gov.go.jp/law/411M50000100036 （介護保険法施行規則）
- https://laws.e-gov.go.jp/law/129AC0000000089 （民法）
- https://laws.e-gov.go.jp/law/411AC0000000150 （任意後見契約に関する法律）
- https://laws.e-gov.go.jp/law/413AC0100000031 （配偶者暴力防止法）
- https://laws.e-gov.go.jp/law/417AC1000000124 （高齢者虐待防止法）
- https://laws.e-gov.go.jp/law/417AC0000000123 （障害者総合支援法）
- https://laws.e-gov.go.jp/law/424AC0000000065 （子ども・子育て支援法）
- https://laws.e-gov.go.jp/law/425AC0000000065 （障害者差別解消法）
- https://laws.e-gov.go.jp/law/504AC0100000052 （困難な問題を抱える女性への支援に関する法律）
- https://www.mhlw.go.jp/web/t_doc?dataId=00ta8363&dataType=1&pageNo=1 （苦情解決の仕組みの指針）
- https://www.ipss.go.jp/publication/j/shiryou/no.13/data/shiryou/syakaifukushi/1.pdf （1950年 社会保障制度審議会勧告）
- https://www.jfsw.org/definition/global_definition/ ／ https://www.jacsw.or.jp/citizens/kokusai/IFSW/documents/SW_teigi_01705.pdf （ソーシャルワーク専門職のグローバル定義）

出典: 問題 https://www.hoyokyo.or.jp/08AP5-1.pdf ／ 正答 https://www.hoyokyo.or.jp/exam/pasttest/08-1.html

## その他
- 中間ファイル（プロンプト、抽出したJSON、stderr、ビルドスクリプト `build_final.py`）は `_work/` に置いた。
