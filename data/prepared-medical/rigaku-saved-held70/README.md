# 理学療法士・保存HOLD70問のレビュー候補

所有者 `pt-unowned-20261011` / thread `01a129c2-0017-7289-9986-2630110cc08f`。
固定main `a13ececaf3062840ba5476ce153623460b2e2981` の出題179問とPR711/743/747/748を照合し、予約範囲と重ならない保存70問を整理した。新規の原問生成・保存稿の再生成は0。既存59問295肢、既存稿、所有台帳のHOLD、公式正答、productionの登録を変更していない。

70問・350肢の本文、37問の正規図版対応、公式原本ページ65枚をこのフォルダに保存した。画像は既存の公式PDF描画PNGからbyte一致でコピー。図だけの選択肢に推測した名称を付加しない。PM1/44の隣接問題由来の誤図cueを除外し、PM2/3の共通症例・別冊を保持した。AM19(2025)、AM12/PM3(2026)の印刷captionはPDFテキスト層の抽出欠落と区別して目視確認した。

厚労省の公式正答PDFから400問の表を保存パケットと独立に再抽出し、今回70問のキーと選択数が全件一致した。結合した2桁の正答と別欄の許容正答を区別し、公式の採点除外4問を候補に含めない。

最新main `7b2a4ce744e061bfb4f74f7a7badfa67d460f3ec` の登録179問との担当ID重複は0。既存179問も読取りだけで公式キーを照合し、差分0だった（`registered179-readonly-key-audit.json`）。

出典がある説明の有限修正は現在85フィールド（今回の10修正は新規8フィールドと既修正2フィールドへの追加修正）。心電図PM20は公式の25mm/秒・R-R間隔を再現可能に測り、A約72/分、B約108/分と検証した。有限修正を適用しても、旧HOLDを解除したことにはならない。

**全70問を `needsReview=true`、`publicGo=false` に保持する。** 専門的な全肢理由の受入れは未完で、専門受入れ・独立公開査読のreceiptはない。臨床HOLDを本文の定型保留文に置換せず、原稿と検証状況を別に保全した。追加QCの残HOLDは43問・75レコードで、旧HOLDは全て保全している。第61回の追加臨床QCは19/19問で実施済み。根拠未取得の提案3件は未採用のまま `qa/helper-pt61-finite-corrections.json` に残した。高解像度のcaption・心電図・図2確認画像4枚も `qa/helper-pt61-assets/` に保存し、原図とは別にSHAを照合する。本bundleを出題登録やpublic画像配置に使う際は統合担当による別の受入れ作業が必要。

既存モデルのreceiptはSonnet60問・Opus10問（すべて実served model・firstParty）であり、Opus実行へ名称を付け替えない。フォルダ名によるモデル認定をしない。原典未取得や版違いの補強、403・429停止履歴もQAに残す。

## 担当ID（canonicalの詳細はmanifest）

- 2025 AM: 1, 7, 9, 15, 19, 82, 84, 89, 94
- 2025 PM: 1, 2, 3, 5, 6, 7, 8, 9, 13, 15, 17, 20, 21, 22, 24, 25, 27, 28, 30, 33, 34, 35, 36, 44, 56, 71
- 2026 AM: 1, 2, 3, 4, 5, 7, 10, 11, 12, 81, 83, 85, 88, 89, 90, 94, 95, 96
- 2026 PM: 1, 3, 4, 5, 7, 10, 12, 15, 21, 22, 23, 25, 26, 33, 34, 35, 36

## 成果物

| ファイル | 用途 |
| --- | --- |
| `adoption-candidates.json` / `adoption-receipts.json` / `ADOPTION.md` | 既存6＋追加限定候補2の最小レビューセット、40肢と条件 |
| `candidates70.json` | 70問・350肢の候補。公式キー不変、全問レビュー中 |
| `saved-baseline70.json` | 旧説明・旧ラベル・旧review理由の不変な比較用コピー |
| `source-receipts70.json` / `sources/` | 原問・正答・別冊、モデルreceipt、原図SHAと対応 |
| `official-key-table400.json` | 元PDFから独立抽出した正答表（出題登録には使わない） |
| `ownership-and-gaps400.json` | 固定main・固定PRhead・400問の不足/所有状態 |
| `applied-finite-corrections.json` | 旧文→新文、出典、QA担当がある限定差分 |
| `qa/` / `review-summary.json` | 原図視認、専門一次資料、個別HOLD、追加QCの状況 |
| `validate.test.mjs` | キー、350肢、図、所有範囲、モデル、公開gateの10項目検査 |

## 固定時点の400問（現在の本番件数ではない）

| 状態 | 問数 |
| --- | ---: |
| `THIS_OWNER_SAVED_HELD_COMPLETION` | 70 |
| `MAIN_READY` | 179 |
| `PT60_SAVED59_OWNER` | 59 |
| `EXISTING_DRAFT_PR` | 43 |
| `OFFICIAL_EXCLUDED_NO_SCORING` | 4 |
| `PR711_SAVED_QA_INDIVIDUAL_HOLD` | 2 |
| `PT61_RESERVED_OWNER` | 43 |

別所有者の129問は全て既存稿・予約・PR・公式採点除外と一致し、未予約の新規原問は0だった。今回の70問は保存HOLDの未処理部分を再生成せず回収したもの。PR711の個別HOLD2問（2025PM19/2026PM46）はこのscope外である。

## 検査

軽量検査:

```sh
node --test data/prepared-medical/rigaku-saved-held70/validate.test.mjs
```

Windows sandboxでrunnerのchild-processが`spawn EPERM`となる場合、同じ10件を `node data/prepared-medical/rigaku-saved-held70/validate.test.mjs` で実行できる。Hosted CIの専用workflowはdependency installやローカルbuildを要さず10項目を検査する。全体lint/typecheck/buildは既存Hosted CIへ委ねた。

未完項目には1995年版ROM原表、Steinbrocker原典、遠城寺式検査の原表、SIASの厳密な採点、術後個別制限などが含まれる。最新版資料や公式正答だけを旧版/臨床理由の検証と数えない。HOLDと出典はquestion/choice単位でQAを参照する。

既存6問の本文不変と3問だけの有限修正・追加候補は [ADOPTION.md](ADOPTION.md) を参照。追加候補は専門受入れ・公開許可ではない。43問75レコードの旧臨床HOLDはそのまま保持し、PM35の診断時点・単一原因頻度は追加QA側に未解消事項として残す。
