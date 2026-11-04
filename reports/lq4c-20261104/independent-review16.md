**総合判定：FAIL（原文転記に必須修正2件）。正答6件・選択肢30件・選択肢解説30件の内容判断はPASSです。** 編集・公開・登録は行っていません。

対象：[2025-aptitude-010-015.json](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-engineer-first/2025-aptitude-010-015.json)

レビューしたJSONのSHA256（開始時・終了時一致）：
`4a6fbdbf3940b88d3eb0db5e02fcba6d2c528aa30c216cc5c92b8cac1dcf3550`

公式p10～15の画像を**各ページ目視**し、各問のocr-pass1・ocr-pass2、計12テキストと照合しました。既存画像6枚は保存済みPDFを220dpiで再レンダリングした画素とも一致しました。正答は索引だけでなく、保存済み正答PDFの**2ページ目を直接レンダリングして目視確認**しています。

- **II10：PASS／正答③。** 本文・全選択肢一致。ア・エが正しく、イ・ウは定義の入替え、オは再使用と再生利用の順位が逆。解説①～⑤すべて妥当で、優先順位の例外への言及も第7条と整合します。[環境省・基本法条文](https://www.env.go.jp/recycle/circul/kihonho/law.html)
- **II11：FAIL／正答④は一致。** 必須修正は下記。ウのみ適切という判定、カルテル・インサイダー取引・入札談合の区別、解説①～⑤は妥当です。[公取委Q5](https://www.jftc.go.jp/dk/dk_qa.html)、[JPX相場操縦規制](https://www.jpx.co.jp/regulation/preventing/manipulation/index.html)
- **II12：PASS／正答④。** 本文・全選択肢一致。対象となる動産、安全性と品質の区別、OEMの表示製造業者、消滅時効、民法の補充適用について、解説①～⑤すべて妥当です。第5条・第6条の番号も正確です。[消費者庁Q&A](https://www.caa.go.jp/policies/policy/consumer_safety/other/pl_qa.html)、[逐条解説](https://www.caa.go.jp/policies/policy/consumer_safety/other/product_liability_act_annotations)
- **II13：PASS／正答⑤。** 本文・全選択肢一致。公務員の保護、3種類の通報先、300人以下の努力義務について解説①～⑤は妥当。「令和4年改正・施行」は原本の表記であり、解説で令和2年改正・令和4年施行と補足する処理も適切です。2025年の設問が指定する制度として確認しました。[消費者庁・基本事項Q&A](https://www.caa.go.jp/policies/policy/consumer_partnerships/whisleblower_protection_system/faq/faq_001)
- **II14：FAIL／正答②・図版はPASS。** 必須修正は下記。解説①～⑤は、無条件の許容を否定し、追加対策の負担と安全上の改善との「著しい不釣合い」を説明できています。賠償費用との単純比較、無視できるリスク領域、他事業への予算振替も適切に区別しています。登録参考文献HSG244の63～64段落が直接の裏付けです。[HSE HSG244](https://www.hse.gov.uk/pubns/priced/hsg244.pdf)
- **II15：PASS／正答②。** 本文・全選択肢一致。OCRでは崩れた組合せ表も、画像で全20セルを確認しました。ア○・イ×・ウ×・エ○で、解説①～⑤すべて妥当。年休取得済み日数の控除、清算期間1→3か月、時間外労働の上限規制と割増賃金の説明も整合します。[厚労省施行通達](https://www.mhlw.go.jp/web/t_doc?dataId=00tc3655&dataType=1&pageNo=1)、[2023年の割増賃金率変更](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000198659_00015.html)

**必須修正は次の2件です。**

1. **II11 `questionText`（ウ）**  
   JSON「他人に**誤解**させ」→原本「他人に**認識**させ」。  
   pass1は「認識」、pass2は「論議」と認識していますが、画像は明確に「認識」です。意味が近くても原文の置換に当たります。

2. **II14 `questionText` 冒頭**  
   JSON「取り**入れられて**いる」／原本「取り**入られて**いる」。  
   両OCRとPDFの拡大画像で確認しました。原文に戻し、必要なら原文の表記について解説側で注記してください。補正を維持する場合も、現在の「改行・空白・句読点を整理」という出典注記だけでは変更内容を説明できません。

**図版・出典の検証結果**

II14の指定矩形 `[190,285,430,500]` PDFポイント、300dpiから再生成したPNGは、既存アセットと**画素・寸法1001×897・ファイルSHA256すべて一致**しました。

`bd5d817bf6e1dd23a2f2236c380ea2dec196a4ec96b04802aa10f6a43682cb96`

「許容できないリスク」「許容できない領域」「ALARP領域」「広く受け入れられる領域」、矢印・境界線・図題をすべて含み、欠落はありません。

問題URL・正答URLは公式公開先と一致。問題p10～15、正答p2、2025年度（令和7年度）・適性科目という対応も正確です。適性科目は部門共通なので、機械部門用データへの収録に矛盾はありません。保存PDFの実測SHA256はJSON・inventoryと一致しました。

- 問題PDF：`d1f4732eb7aecad4dfe345ff06152ba2b6499dc7f74b33905f214d86e0686d7f`
- 正答PDF：`6d4f5427838059ab50f0e7785f3f9cb2718fafaf96a8b74afcb332d969d7e311`

公式正答の並びは **③・④・④・⑤・②・②**。official-answer-indexとも一致し、この6問に採点例外はありません。[公式正答PDF](https://www.engineer.or.jp/c_topics/004/attached/attach_4106_4.pdf)

**任意の改善**として、II11に[インサイダー取引規制](https://www.jpx.co.jp/regulation/preventing/insider/index.html)、II12に上記逐条解説、II13に公務員を明示した上記Q&Aを追加すると、解説の根拠を直接追いやすくなります。II15は割増率引上げについて「中小企業への2023年適用」を補足すると、時系列がさらに明確です。これらは必須修正とは区別します。

照合した保存原本：
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq4b-sources/gijutsushi1-kikai-2025-aptitude.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq4b-sources/gijutsushi1-kikai-2025-answer.pdf" purpose="source"}