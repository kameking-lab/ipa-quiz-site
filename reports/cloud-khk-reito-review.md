# khk-reito 独立レビュー結果 (gpt-6-astra, read-only)

## 1回目: FAIL
**判定：FAIL**。対象は直近コミット `94db9767`。正答番号は一致していますが、解説の誤りと転記・図版の不備が残っています。コード・データは変更していません。

1. **[P1] 公式正答と矛盾する法令解説**
   令和6年度・第一種／第二種「法令」問1で、「現在圧が0.9MPaでも高圧ガスである」と説明しています。しかし原問ロは「高圧ガスではない」で、公式正答⑶「イ、ロ」はこれを正しいとしています。総合解説と全5選択肢の解説に同じ誤りが複製されています。
   該当：[第一種](/home/user/ipa-quiz-site/data/questions/khk-reito-1/latest-two.json:1739)、[第二種](/home/user/ipa-quiz-site/data/questions/khk-reito-2/latest-two.json:1803)。生成元の `first-notes.json`・`second-notes.json` も修正対象です。根拠：[公式問題・問1](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACGX-W.pdf)、[公式正答](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_kaitou.pdf)。

2. **[P2] 「全肢解説」に誤りの理由が欠落**
   令和7年度・第一種「保安管理技術」問6では、ハを誤りと判定していますが、汚れ係数と熱通過率の低下割合についての説明がありません。全選択肢に同じ説明を付けても、この論点は補えていません。令和6年度同科目問2も、取付位置について「順序がある」とするだけで正しい上下流関係を示していません。
   該当：[問6の解説](/home/user/ipa-quiz-site/data/questions/khk-reito-1/latest-two.json:1150)、[問2の解説](/home/user/ipa-quiz-site/data/questions/khk-reito-1/latest-two.json:2680)。`explanationCoverage: "full"` と[レポートの全肢解説完了記載](/home/user/ipa-quiz-site/reports/cloud-khk-reito-latest2.md:93)は再評価が必要です。[公式問題](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACGY-W.pdf)

3. **[P2] 数式の指数表記が失われている**
   令和7年度・第二種「学識」問4ロの原式は `E＝σT⁴` ですが、収録本文は `Ｅ＝σ Ｔ ４`。指数であることが保持されず、表示側にも上付きへ復元する処理がありません。正誤判断の対象となる数式なので、`T⁴` または `T^4` 等で明示すべきです。
   該当：[問題本文](/home/user/ipa-quiz-site/data/questions/khk-reito-2/latest-two.json:1483)。[公式PDF・本文3ページ](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACHZ-W.pdf)

4. **[P3] 作図用画像の下端が切れている**
   令和6年度・第一種「学識」問2の[記入前線図](/home/user/ipa-quiz-site/public/questions/khk-reito/2024-gakushiki-q2-blank-chart.png)で、横軸の `h` の下部が切れています。切り出し範囲の下側に余白が必要です。[公式解答用紙・5ページ](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACGZK-W.pdf)

確認できた正常事項は、収録数 **80／80／70＝230問**、択一 **220問すべての正答番号一致**、記述式10問の解答値・指定丸め・入替許容条件の一致です。本文230問の再抽出比較と画像8点の確認も実施しました。手元の原本PDF22点のSHA-256は出典台帳と一致しています。

既存レポートのテスト通過実績とは別に、上記の内容上の不備があるため、追加差分全体はPASSにできません。
## 2回目(再レビュー): PASS
**判定：PASS**。対象は `94db9767 → a8e8211f` の追加差分です。前回FAILの指摘はすべて解消され、今回の差分に新たな問題は見つかりませんでした。

| 再確認項目 | 結果 |
|---|---|
| R6 第一種・第二種 法令問1 | 「ロは正しい＝高圧ガスではない」に修正。生成元・総合解説・全5選択肢に反映され、公式正答③「イ、ロ」と一致。[公式正答](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_kaitou.pdf) |
| R7 第一種 保安管理技術問6 | `K＝K₀/(1＋K₀f)` により、汚れ係数の増分に対する低下が緩やかになる理由を補足。公式正答①と整合。[公式問題](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACGY-W.pdf) |
| R6 第一種 保安管理技術問2 | 調整弁を感温筒・均圧管より下流側に設置することと、その理由を明記。公式正答①と整合。[公式問題](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACGY-W.pdf) |
| R7 第二種 学識問4ロ | `Ｅ＝σＴ⁴` に修正。単位の `m²`・`K⁴` も保持。[公式問題](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACHZ-W.pdf) |
| R6 第一種 学識問2図版 | 横軸 `h` 全体と下側余白を目視確認。切れは解消。[修正画像](/home/user/ipa-quiz-site/public/questions/khk-reito/2024-gakushiki-q2-blank-chart.png) |

収録230問のID・選択肢・正答・記述式解答は変更なし。択一220問の正答列は公式表と一致し、原本PDF22点のSHA-256も出典台帳と一致しました。

今回の判定範囲は前回指摘と追加差分です。全解説の全面再監査・テストスイートの再実行は行っていません。コード・データは変更していません。