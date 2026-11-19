# PLAN9-C22 新規資格の収録候補

2026年11月19日確認。依頼時の収録済み一覧（手元補充分を含む）と `main` の `data/questions/` を照合した。実施機関の令和7年度全国受験者数（申請者数とは区別）で降順に並べた。

| 順位 | 資格・試験区分 | 年間受験者数 | 実施機関の問題・正答公表先 | 受験者数の出典 |
| ---: | --- | ---: | --- | --- |
| 1 | 危険物取扱者 乙種第5類 | 10,972人 | [消防試験研究センター](https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html) | [令和7年度試験実施状況](https://www.shoubo-shiken.or.jp/result/r07/) |
| 2 | 危険物取扱者 乙種第3類 | 10,275人 | [消防試験研究センター](https://www.shoubo-shiken.or.jp/kikenbutsu/exercise.html) | [令和7年度試験実施状況](https://www.shoubo-shiken.or.jp/result/r07/) |
| 3 | 消防設備士 乙種第4類 | 8,047人 | [消防試験研究センター](https://www.shoubo-shiken.or.jp/shoubou/exercise.html) | [令和7年度試験実施状況](https://www.shoubo-shiken.or.jp/result/r07/) |
| 4 | 高圧ガス販売主任者 第二種 | 7,185人 | [高圧ガス保安協会](https://shiken.khk.or.jp/shiken.html) | [令和7事業年度業務報告・33ページ](https://www.khk.or.jp/Portals/0/khk/gp/2026/HP_R7_gyoumuhoukoku.pdf) |
| 5 | 消防設備士 乙種第7類 | 5,822人 | [消防試験研究センター](https://www.shoubo-shiken.or.jp/shoubou/exercise.html) | [令和7年度試験実施状況](https://www.shoubo-shiken.or.jp/result/r07/) |
| 6 | 下水道技術検定 第3種 | 4,377人 | [日本下水道事業団・令和8年度問題と正答](https://www.jswa.go.jp/kentei/pdf/r8mondai_seito.pdf) | [第51回の実施結果](https://www.jswa.go.jp/topics/2025pdf/20251217kisya.pdf) |
| 7 | 消防設備士 甲種第3類 | 4,353人 | [消防試験研究センター](https://www.shoubo-shiken.or.jp/shoubou/exercise.html) | [令和7年度試験実施状況](https://www.shoubo-shiken.or.jp/result/r07/) |
| 8 | 消防設備士 甲種第2類 | 4,334人 | [消防試験研究センター](https://www.shoubo-shiken.or.jp/shoubou/exercise.html) | [令和7年度試験実施状況](https://www.shoubo-shiken.or.jp/result/r07/) |
| 9 | 消防設備士 甲種第5類 | 4,226人 | [消防試験研究センター](https://www.shoubo-shiken.or.jp/shoubou/exercise.html) | [令和7年度試験実施状況](https://www.shoubo-shiken.or.jp/result/r07/) |
| 10 | 高圧ガス販売主任者 第一種 | 3,498人 | [高圧ガス保安協会](https://shiken.khk.or.jp/shiken.html) | [令和7事業年度業務報告・33ページ](https://www.khk.or.jp/Portals/0/khk/gp/2026/HP_R7_gyoumuhoukoku.pdf) |

- 消防試験研究センターは出題年度・回を特定しない抜粋を公表する。公表版で区分を特定できる問題と、当該区分に適用される共通問題を扱う。
- 高圧ガス販売主任者の第一種・第二種は `main` に未公開ステージングがある。収録時に公式原本と照合して既存の書き起こし・全肢解説を利用できる。
- 小型船舶操縦士は試験会場で当日の正答を掲示しており、過去問公開ページには正答の掲載がない。海技士も公式ページで確認できたのは問題のみ。 [JMRA 学科試験FAQ](https://www.jmra.or.jp/faqs_cat/subjects)・[国土交通省 海技試験の過去問](https://www.mlit.go.jp/maritime/maritime_tk1_000111.html)
- 一級建築基準適合判定資格者検定は問題のみ、コンクリート技士・主任技士・診断士は択一式の正解肢のみが公表されている。 [国土交通省 過去問の公表](https://www.mlit.go.jp/jutakukentiku/build/jutakukentiku_house_fr_000028.html)・[日本コンクリート工学会 技士・主任技士](https://www.jci-net.or.jp/j/exam/gishi/index.html)・[同 診断士](https://www.jci-net.or.jp/j/exam/shindan/index.html)
- 下水道技術検定第2種は931人、下水道管理技術認定試験（管路施設）は1,787人、液化石油ガス設備士の筆記は1,577人で、受験者数の目安を下回る。 [日本下水道事業団の実施結果](https://www.jswa.go.jp/topics/2025pdf/20251217kisya.pdf)・[高圧ガス保安協会の業務報告](https://www.khk.or.jp/Portals/0/khk/gp/2026/HP_R7_gyoumuhoukoku.pdf)
- 無人航空機操縦士は学科試験のサンプル問題を公開している。 [国土交通省 無人航空機操縦者技能証明等](https://www.mlit.go.jp/koku/license.html)
- 機械設計技術者3級の2025年度受験者は1,678人で、受験者数の目安を下回る。 [日本機械設計工業会 試験結果](https://www.kogyokai.com/news/exam/20260109102103.html)

## 収録結果

| 資格・試験区分 | 年度・公表版 | 収録数 |
| --- | --- | ---: |
| 危険物取扱者 乙種第5類・第3類 | 2026年6月公表版 | 各35問（共通25問、類別10問） |
| 消防設備士 乙種第4類 | 2026年6月公表版 | 筆記18問、実技2解答単位 |
| 高圧ガス販売主任者 第二種 | 2022〜2026年度 | 各年度40問、計200問 |
| 消防設備士 乙種第7類 | 2026年6月公表版 | 筆記16問、実技1解答単位 |
| 下水道技術検定 第3種 | 2023年度第49回、2025年度第51回、2026年度第52回 | 各年度60問、計180問 |
| 消防設備士 甲種第3類 | 2026年6月公表版 | 筆記18問、実技4解答単位 |
| 消防設備士 甲種第2類 | 2026年6月公表版 | 筆記20問、実技4解答単位 |
| 消防設備士 甲種第5類 | 2026年6月公表版 | 筆記12問、実技6解答単位 |
| 高圧ガス販売主任者 第一種 | 2022〜2026年度 | 各年度40問、計200問 |

計751解答単位。危険物取扱者の共通問題は区分ごとに集計した。消防設備士の実技は公式解答例のある小問を収録した。

- 高圧ガス販売主任者の2022・2023年度は、実施機関が掲載した問題PDFのアーカイブと、協会サイトの正答PDFを使用した。 [2022年度正答](https://www.khk.or.jp/Portals/0/khk/exam/2022/R4fy_kaitou.pdf)・[2023年度正答](https://www.khk.or.jp/Portals/0/khk/exam/2023/R5fy_kaitou.pdf)
- 下水道技術検定の2023・2025年度は、事業団が掲載した問題・正答PDFのアーカイブを使用した。2023年度は11月16日公表時の保存版を利用した。11月24日付の修正告知も確認したが、告知先の修正版PDF一覧は取得できなかった。問16は公式発表に従い全員加点として記録し、通常演習から除いた。 [2023年度公表一覧](https://web.archive.org/web/20231116043914id_/https://www.jswa.go.jp/kentei/pdf/shikenmondai-seito-kohyo.pdf)・[11月24日付告知](https://www.jswa.go.jp/kentei/pdf/annai/20231124oshirase.pdf)・[問16の公式発表](https://web.archive.org/web/20231116044019id_/https://www.jswa.go.jp/kentei/R5-shiken/r5_fubitaio.pdf)・[2025年度問題](https://web.archive.org/web/20251127081332id_/https://www.jswa.go.jp/kentei/pdf/r7mondai_seito/mondai_3syu.pdf)・[2025年度正答](https://web.archive.org/web/20251127063443id_/https://www.jswa.go.jp/kentei/pdf/r7mondai_seito/seito_3syu.pdf)
- 下水道技術検定の2022・2024年度は、問題と正答の公式原本をそろえられなかったため見送った。2022年度は旧掲載先、2024年度は公表一覧まで確認できた。 [2022年度の掲載告知](https://jstodakentei.livedoor.blog/archives/17671669.html)・[2024年度公表一覧](https://web.archive.org/web/20241209092823id_/https://www.jswa.go.jp/kentei/pdf/shikenmondai-seito-kohyo.pdf)
