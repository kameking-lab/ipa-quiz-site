# 社労士2025年択一・労災問1 保存稿回収

原問・全5肢・公式正答Bを保存稿と親の回収payloadから継承し、全5肢の一次資料不足を解消した。基準日は2025年4月11日。新規公開数は0問。共有repo、runtime、担当ロックは変更していない。

- 統合用の全記録：[Q01-PRIMARY-VERIFIED.json](Q01-PRIMARY-VERIFIED.json)。`correctedSavedDraft` と `correctedCanonicalQuestion` を含み、`remainingSourceGaps` は空。
- 原保存形式：[corrected-saved-draft.json](corrected-saved-draft.json)。A〜Eの肢番号を維持。
- サイト形式：[corrected-canonical-question.json](corrected-canonical-question.json)。ア〜オと公式正答Bを維持し、`needsReview: true` を維持。
- 機械検査：[VALIDATION.json](VALIDATION.json)。原保存稿hash、原問・全肢・正答の一致、全肢解説、採用資料のHTTP 200とhash、基準日版法令を検査。
- PDFの目視確認：[VISUAL-QA.json](VISUAL-QA.json)。関連箇所の物理ページ番号を記録。
- 全取得履歴：[SOURCE-RECEIPTS.json](SOURCE-RECEIPTS.json)。各資料の取得時刻、公式URL、HTTP結果、SHA-256を保存。

| 肢 | 一次資料と判断 |
| --- | --- |
| A・誤り | [昭和35年基発932号](https://www.mhlw.go.jp/web/t_doc?dataId=00tb2519&dataType=1&pageNo=1)の記一が、出向目的・契約・労働実態によって保険関係を決めると直接規定。出向先への一律帰属とはしていない。 |
| B・正しい | [昭和61年基発383号・発労徴41号](https://www.mhlw.go.jp/web/t_doc?dataId=00tb2521&dataType=1&pageNo=1)の記第二一が、派遣元の災害補償責任と保険適用を直接規定。 |
| C・誤り | [平成18年基発1002004号の平成19年改正掲載PDF](https://www.pref.oita.jp/uploaded/attachment/10217.pdf)物理3〜4頁の記二と[平成24年改正](https://www.mhlw.go.jp/web/t_doc?dataId=00tb8726&dataType=1&pageNo=1)を確認。雇用契約なしA型・B型も区別する。労災適用の結論は労基法9条・労災法3条との法定推論であり、通達に労災適用が直接記載されると誤表示しない。 |
| D・誤り | [長野労働局2017年公式ガイド](https://jsite.mhlw.go.jp/nagano-roudoukyoku/library/nagano-roudoukyoku/_new-hp/2hourei_seido/roudoukijun/internship291006.pdf)物理1頁が基発636号を参照し、使用従属・生産活動・報酬等により労働者に該当する場合を説明。労災適用は基準日版法令との法定推論。通達636号の完全原文を取得したとは表示しない。 |
| E・誤り | [徳島県教育委員会公式表](https://health.tokushima-ec.ed.jp/file/92)物理1頁の小中学校欄が常勤職員の育休代替臨時任用を地公災法に分類。[学校共済東京支部R2.1版](https://www.kouritu.or.jp/tokyo/content/files/about/handbooketc/tebiki/R2.1tebiki7syou.pdf)物理1頁・印刷217頁も臨時的任用教職員を基金に分類。地公災法2条・67条2項と合わせ、一律に労災法適用という肢を反証。全ての非常勤区分の結論を一律に推測していない。 |

e-Govの法令はAPIの `asof=2025-04-11` で取得し、回答のrevision ID・施行日を保存した。徳島資料はPDF作成・更新日2020年8月31日、東京資料は2020年2月13日である。徳島資料の正式な公表日は確認できないため、PDF作成日と公表日を混同していない。

Cの「A型は全員雇用契約を結ぶ」という旧稿の単純化と、Eの一般的な常勤・非常勤論を補正した。元保存稿は上書きせず、原文未確認という旧注記を補正稿から除いた。

全肢の根拠不足は解消済みだが、親担当による独立した内容確認と統合は未実施である。`publicationReady: false`、`independentReviewPending: true` を維持する。今回の1問は既存保存稿の完成増分であり、既存PR・公開済み問題への重複計上をしない。
