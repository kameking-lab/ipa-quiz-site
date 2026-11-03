# AP・FE 直近2回の公開過去問監査

監査日：2026-11-03。対象は実際に出題され、IPAが問題と解答例を公開した回。サンプル問題・類題・生成問題で欠落を埋めていない。

## 対象回を確定した公式掲載

- [IPA過去問題の入口](https://www.ipa.go.jp/shiken/mondai-kaiotu/)
- [AP 2025年度（秋期・春期）の問題・解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html)
- [AP等2026年度の実施案内](https://www.ipa.go.jp/shiken/2026/ap_koudo_sc_kikan.html)：CBT問題は非公開と明記。実施年だけを理由に2026年度の問題を生成・推定しない。公開済みの直近2回は2025年度秋期・春期。
- [FE公開問題の年度一覧](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/index.html)
- [FE 2026年度](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/2026r08.html)：2026-07-01公開。実際の出題から科目A20問・科目B6問を公開。
- [FE 2025年度](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/2025r07.html)：2025-07-04公開。同じく科目A20問・科目B6問。春秋の2回ではなく、この年次公開2回を対象にした。

## 回ごとの有無と追加数

| 試験・回 | 公式公開範囲 | 変更前の実効データ | 追加 | 変更後 |
| --- | --- | --- | ---: | --- |
| AP 2025秋期 | 午前80問・午後11大問 | 午前80問あり／午後なし | 午後11大問 | 午前80問・午後11大問 |
| AP 2025春期 | 午前80問・午後11大問 | 午前80問あり／午後なし | 午後11大問 | 午前80問・午後11大問 |
| FE 2026年度公開 | 科目A20問・科目B6問 | なし | 26問 | 科目A20問・科目B6問 |
| FE 2025年度公開 | 科目A20問・科目B6問 | 全26問あり | 0問 | 科目A20問・科目B6問 |

追加は計48レコード（AP午後は全設問を含む大問を1件と数える）。監査対象は計234レコード。FE2025科目Bの年度ファイルだけを見ると2問だが、既存のIPA補完データを適用した公開読込経路には6問あるため重複追加しなかった。

## 原本との照合と表示

AP午前の既存文字起こしには否定の上線消失、選択肢の同一化、数式・変数の崩れがあり、問数だけでは完備と判断できなかった。旧文字起こしを公開表示に使わず、今回の対象全問について公式PDFの問題部分を可逆WebP画像として掲載する。**問題文・選択肢の一致は原本画像によって保持する方式**であり、全文テキスト化を完了したという意味ではない。選択ボタンの文字列は印刷された記号だけにし、その記号に対応する原文の選択肢を画像内で読む。記号と正答の対応が変わるシャッフルは行われない。

全問に実在する画像URLと `hasImage: true` を設定した。図表だけでなく、否定記号・空欄・プログラムの字下げ・表の列対応も原本に保持する。画像内の本文はテキスト検索や読み上げの対象にはならないという制限がある。OCRはAP午前の切出し位置の補助にだけ用い、OCR出力の文言を公開問題として採用していない。

- AP午前160問、FE52問の全正答を公式解答例と照合し一致。既存分の正答変更は0件。
- AP午後22大問は全設問を原本画像で保持し、公式解答表を `answer` と `modelAnswer` に格納。独自の全問一律正答などは作っていない。
- AP午後の解説とFE2026の解説は独自作成。既存の午前・FE2025の独自解説は維持し、AP2025春期午前問1は否定を含む公式論理式に沿って修正した。
- AP午後は既存の記述問題用カードで公式解答例と比較する自己確認方式。通常・ストリーム・個別問題ページで対応し、択一の正誤履歴や正答率には自動加算しない。IPA公式解答例と当サイト解説を区別して表示する。
- `sourcePdfUrl` と `sourceAnswerUrl` は `www.ipa.go.jp` 上の公式PDF、`license` は全件 `IPA-public`。IDは既存の `ap-2025a/h-am/pm-qN`、`fe-2026cbt-kamoku-a/b-qN` に合わせた。
- 既存の補正機構に今回の表示補正を最後に適用し、古い本文や別の図への参照が再適用されないようにした。直接試験別importと遅延読込の両方を検証した。

## 除外した問題・理由

対象の公開問題から除外した問題は0問。図が再現できない問題を代替の生成問題で補っていない。AP2026年度CBTの非公開問題、FEの非公開残問（実試験の科目A60問・科目B20問と公開数の差）、サンプル問題は今回の公開過去問の収録対象外。AP午後は枝問単位の独立採点には分割していないが、各大問の全設問を収録している。

## 公式PDF

### AP2025秋期

- [2025r07a_ap_am_qs.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_ap_am_qs.pdf)
- [2025r07a_ap_am_ans.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_ap_am_ans.pdf)
- [2025r07a_ap_pm_qs.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_ap_pm_qs.pdf)
- [2025r07a_ap_pm_ans.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_ap_pm_ans.pdf)

### AP2025春期

- [2025r07h_ap_am_qs.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07h_ap_am_qs.pdf)
- [2025r07h_ap_am_ans.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07h_ap_am_ans.pdf)
- [2025r07h_ap_pm_qs.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07h_ap_pm_qs.pdf)
- [2025r07h_ap_pm_ans.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07h_ap_pm_ans.pdf)

### FE2026年度

- [2026r08_fe_kamoku_a_qs.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/rcu1hd0000012qj6-att/2026r08_fe_kamoku_a_qs.pdf)
- [2026r08_fe_kamoku_a_ans.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/rcu1hd0000012qj6-att/2026r08_fe_kamoku_a_ans.pdf)
- [2026r08_fe_kamoku_b_qs.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/rcu1hd0000012qj6-att/2026r08_fe_kamoku_b_qs.pdf)
- [2026r08_fe_kamoku_b_ans.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/rcu1hd0000012qj6-att/2026r08_fe_kamoku_b_ans.pdf)

### FE2025年度

- [2025r07_fe_kamoku_a_qs.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/tbl5kb0000005r9r-att/2025r07_fe_kamoku_a_qs.pdf)
- [2025r07_fe_kamoku_a_ans.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/tbl5kb0000005r9r-att/2025r07_fe_kamoku_a_ans.pdf)
- [2025r07_fe_kamoku_b_qs.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/tbl5kb0000005r9r-att/2025r07_fe_kamoku_b_qs.pdf)
- [2025r07_fe_kamoku_b_ans.pdf](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/tbl5kb0000005r9r-att/2025r07_fe_kamoku_b_ans.pdf)

## 検証証跡

- `reports/cloud-ap-fe-latest2/sources.json`：取得した公式PDFのURL、SHA-256、ページ数。
- `reports/cloud-ap-fe-latest2/answers.json`：公式解答例から取り出した全212択一問の正答表。
- `reports/cloud-ap-fe-latest2/images.json`：全444画像の公式出典、ページ、切出し矩形、SHA-256。
- `python scripts/verify-cloud-ap-fe-images.py /tmp/ap-fe-audit`：取得PDFのハッシュを確認し、全444画像をPDFから再描画した画素と比較して一致。
- `pnpm install`：成功（postinstallのPrisma生成を含む）。
- `pnpm validate:questions`：成功、26,492件中 fail=0。既存を含む警告は16,856件。警告ゼロを達成したという報告ではない。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。通常の `pnpm typecheck` はNodeの既定約2GBのヒープ上限で終了コード134になったため、メモリ上限を8GBとして再実行。型検査の範囲・設定は変更していない。
- 関連Vitest：今回の公開回網羅性・全択一正答・画像ハッシュ・直接／遅延読込・IPA補正・表示と出題の一致・FE2025科目B問2の既存解説・記述問題の通常／ストリーム操作を検証。6ファイル・36テスト成功。

`pnpm build`、デプロイは実施していない。秘密値や環境ファイルは証跡・コミット対象に含めていない。
