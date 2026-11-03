**総合判定：PASS — [2025-pm-161-180.json](/C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2025-pm-161-180.json)。必須修正なし。**

指定された **gpt-6-astra** が読み取り専用で独立レビューしました。ファイルの編集・保存・commit・登録・公開は行っていません。

全20問の問題文・100選択肢を、両OCRパスの原画像14枚とOCRテキスト14件（PDF物理ページ23～29）に照合しました。意味を変える転記差異はありません。解説20件・肢別理由100件も確認済みです。

| 問 | PDFページ | 公式正答 | 判定・検証結果 |
|---|---:|---:|---|
| 161 | 23 | 3 | PASS：厨芥と雑芥、感染性判断、針刺し事故の説明は妥当。 |
| 162 | 24 | 4 | PASS：缶の選別圧縮、発泡体の減容、新聞・雑誌の結束処理は妥当。 |
| 163 | 24 | 5 | PASS：有価物の留保、マニフェストの適正処理確認目的は妥当。 |
| 164 | 24 | 4 | PASS：貯留方式の衛生・防災性、規模・費用比較は妥当。 |
| 165 | 25 | 4 | PASS：帳簿保存5年、発生しやすい場所の調査2か月以内ごとを確認。 |
| 166 | 25 | 3 | PASS：活動時間、発生水域、初回無吸血産卵等は妥当。 |
| 167 | 25 | 5 | PASS：CO₂誘引、捕虫網、産卵トラップ、幼虫採集の説明は妥当。 |
| 168 | 26 | 3 | PASS：散布前4、散布後0.02、防除率99.5%を再計算。 |
| 169 | 26 | 5 | PASS：雑食性、集合成分、昼間の潜伏の説明は妥当。 |
| 170 | 26 | 2 | PASS：原因特定と宿主・清掃・寝具対策の理由は妥当。 |
| 171 | 26 | 1 | PASS：全5組の対応を確認。アレルゲン・刺咬・寄生の区別は妥当。 |
| 172 | 27 | 4 | PASS：完全変態、一化性、蛹化・休眠、外骨格の説明は妥当。 |
| 173 | 27 | 3 | PASS：衣類・食品害虫、コロモジラミの疾病媒介等は妥当。 |
| 174 | 27 | 3 | PASS：全5組の対応を確認。IGRの速効殺虫効果に関する限定も適切。 |
| 175 | 27 | 2 | PASS：尾長、耳、登攀性、警戒性の説明は妥当。 |
| 176 | 28 | 5 | PASS：承認区分、忌避用途、毒餌、第2世代、急性作用を確認。 |
| 177 | 28 | 2 | PASS：抵抗性選択、死骸とハエ、離脱するダニ、管理配置は妥当。 |
| 178 | 28 | 4 | PASS：A＝1,000匹/m²、B＝2,000匹/m²、比率2倍を再計算。 |
| 179 | 29 | 5 | PASS：IPM、6／2か月の調査周期、日常予防の説明は妥当。 |
| 180 | 29 | 4 | PASS：高さ2mの措置、効力指標、ダニ体区分、鳥卵の許可、ノミ幼虫食性を確認。 |

公式解答は全問、索引および[公式正答PDF](https://www.jahmec.or.jp/kokka/shiken_pdf/2025/2025kizyun_seitou.pdf)と一致し、採点例外はありません。[公式問題PDF](https://www.jahmec.or.jp/kokka/shiken_pdf/2025/2025shiken_pm.pdf)のURL・SHA・ページ情報も台帳と一致します。物理ページ23～29は印刷ページ20～26です。

171・174の組合せの対応関係は保持され、必須図の欠落はありません。`expectedFullQualificationCount: 360` は2年×180問として確認し、ドラフト・未登録・`publicGo: false` は意図された状態として扱いました。

**任意改善（PASSを妨げません）**

- 問178 `explanation`：「捕獲数を除します」を「捕獲数を採取面積で割ります」にすると明確です。
- 問176 `choiceExplanations["1"]`：承認実例「ラニラットF」と畜鶏舎用であることを補足できます。
- 問162：新聞・雑誌の説明に「建築物内での通常の分別回収」と範囲を明示できます。
- 空の `explanationReferenceUrls` に、対応する一次資料を追加すると再検証が容易です。

独立検証では、特に以下の一次資料を使用しました。

| 検証対象 | 根拠 |
|---|---|
| 感染性廃棄物・マニフェスト | [環境省マニュアル](https://www.env.go.jp/recycle/misc/guideline/kansen-manual.pdf)、[JWセンター資料](https://www.jwnet.or.jp/jwnet/practice/assets/files/guidebook_2023ver1.pdf) |
| 処理・貯留設備 | [日工の缶選別圧縮装置](https://www.tombo-plaza.com/business/environment/petris.html)、[新明和のコンパクタ・コンテナ](https://www.shinmaywa.co.jp/products/environment/introduction/storage/scc.html) |
| 保存期間・調査周期・IPM | [神戸市管理基準](https://www.city.kobe.lg.jp/documents/5708/kanrikijyun.pdf)、[東京都講習資料](https://www.tmiph.metro.tokyo.lg.jp/files/k_kenchiku/bldg/kousyukaisiryo/ea5639d34dba25ac672395392f230e952.pdf)、[厚労省IPM資料](https://www.mhlw.go.jp/shingi/2007/03/s0322-15b.html) |
| 蚊・ゴキブリ・ダニ | [東京都の蚊調査](https://www.tmiph.metro.tokyo.lg.jp/kj_kankyo/mosq/mosquito/)、[埼玉県衛生研究所のゴキブリ資料](https://www.pref.saitama.lg.jp/b0714/eiseigaityu/goki.html)、[同ダニ資料](https://www.pref.saitama.lg.jp/b0714/eiseigaityu/dani.html) |
| 昆虫の休眠・疾病媒介・IGR | [休眠制御の学会資料](https://www.jstage.jst.go.jp/article/konchubiotec/84/2/84_2_135/_pdf/-char/ja)、[JIHS発しんチフス](https://id-info.jihs.go.jp/infectious-diseases/typhus/detail/index.html)、[メーカーIGR資料](https://corp.earth.jp/jp/company/business-product/products/sources-nuisance-insect/index.html) |
| ネズミ・殺そ剤 | [目黒区の形態・防除資料](https://www.city.meguro.tokyo.jp/seikatsueisei/kenkoufukushi/eisei/nezumi.html)、[NVAL承認情報](https://www.vm.nval.go.jp/public/detail/2647)、[宮崎県の殺鼠剤資料](https://hinatamafin.pref.miyazaki.lg.jp/material/files/group/18/1634_9.pdf) |
| 高所作業・鳥卵・ノミ | [滋賀労働局資料](https://jsite.mhlw.go.jp/shiga-roudoukyoku/content/contents/002168993.pdf)、[新宿区の鳥獣保護案内](https://www.city.shinjuku.lg.jp/kankyo/kankyo02_000001_00006.html)、[大阪市のノミ資料](https://www.city.osaka.lg.jp/kenko/cmsfiles/contents/0000388/388188/nomi.pdf) |

対象・参照JSONの正確なSHA-256：

```text
data/qualification-staging/lq4c-biru-kan/2025-pm-161-180.json
8789e49741d6cabf833d2d4366a136ee2d60178baef15f9a4698a4e42c987426

reports/lq4b-20261104/official-answer-index.json
ae007f42cdf7c18939cd044e9fda0b05287e4c02ad8287a5fa05a4a64f81dfd5

reports/lq4b-20261104/source-inventory.json
4d46f6675fc766355a00c48e8be3243f725c2f7e67a8fc79e8ef2f063f6fb322
```

保存済み公式PDFも実ファイルから再計算し、原稿・台帳との一致を確認しました。

```text
biru-kan-2025-pm.pdf
6d537264afbd40657eb6075fbf16e07cd879528a6925a67abd5bb52a241ed3e8

biru-kan-2025-answer.pdf
587f114205af05d4776f241af9a822bff5caa70bae5178f13ad6c948d8ac4088
```