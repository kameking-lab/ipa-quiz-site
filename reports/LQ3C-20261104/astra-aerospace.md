**FAIL：航空宇宙2024・35問の受入は修正が必要です。**

必須修正は以下です。原稿と採用データの双方に残っています。

| 箇所 | 指摘 |
|---|---|
| [Q3](/C:/Users/kanet/20260522/wt-LQ3/reports/LQ3B-20261104/manuscripts/pe-first-aerospace-2024.json:49) | ②と④が逆。原本p.2は②「ア=pr/t、イ=pr/(2t)」、④「ア=pr/t、イ=pr/t」。対応する理由も入れ替える必要があります。正答⑤は維持。 |
| [Q25](/C:/Users/kanet/20260522/wt-LQ3/reports/LQ3B-20261104/manuscripts/pe-first-aerospace-2024.json:508) | 設問が「最も不適切なものはど」で途切れています。「れか。」が欠落。 |
| 本文・選択肢のOCR残存 | Q4②「2兀」→「2π」、Q5④「ビッチ」→「ピッチ」、Q11本文「工,ンジン」→「エンジン」、Q13⑤「バイバス」→「バイパス」。ほかにも「必,要」「比べて。小さい」「カ.バー」など、不正な句読点が残っています。 |

確認結果：

- 全19ページ、35問・175肢と理由を確認。公式正答は独立抽出して**35/35一致**。[公式正答](https://www.engineer.or.jp/c_topics/004/attached/attach_4106_5.pdf#page=5)
- manifestの原稿・採用データ・両PDF・画像19枚のハッシュは一致。画像19枚もPDF再描画と画素一致。
- テキスト30問、原本画像5問（Q8・21・30・34・35）の構成とページ対応を確認。
- Q17の公式①を維持し、TIDとDDを区別する注記は妥当。[JAXA資料 §4.4.6](https://sma.jaxa.jp/TechDoc/Docs/JAXA-JERG-0-052B.pdf#page=46)
- Q34の公式④と、平面測位の3局／高度未知の三次元測位の4局という説明を確認。
- 基準コミットから既存問題ファイルの変更なし。追加問題とcatalog変更はあります。
- `validate-questions.log`は`fail=0 / exitCode=0`。ただし航空宇宙の検証対象包含は確認できず、`tests-aerospace.log`・`typecheck-aerospace.log`も未存在のため、両チェックはPASS判定できません。

読み取り専用で実施し、編集・push・PR作成はしていません。