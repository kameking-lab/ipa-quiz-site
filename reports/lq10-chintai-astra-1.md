**FAIL**

確認範囲：全100問の本文・400選択肢・正答を原本PDFと照合し、全400肢・内側88記述の解説を通読。非公開境界、台帳、専用検証・テストコードも確認。専用検証と異常系確認は成功。Vitest自体は未実行です。

修正必須は以下の3点です。各項目とも `choiceExplanations` と重複する `explanation` を修正してください。

- **[2025.json:2038](C:/Users/kanet/20260522/wt-LQ10/data/qualification-staging/chintai/2025.json:2038)／問50・肢2**
  「借家割合38.0％」「民営借家約29％」を訂正。正しくは借家 **35.0％（前回35.6％から低下）**、民営借家 **28.2％**。設問の借家割合・増減方向も誤りと説明してください。[総務省統計局・表5-1](https://www.stat.go.jp/data/jyutaku/2023/pdf/kihon_gaiyou.pdf)

- **[2025.json:748](C:/Users/kanet/20260522/wt-LQ10/data/qualification-staging/chintai/2025.json:748)／問18・肢2**
  誤りの理由がIT説明への意向確認にずれています。「説明書等は原則事前送付だが、説明を受ける者が承諾した場合は例外があるため、『承諾の有無にかかわらず』が誤り」と修正してください。[国土交通省・IT説明の取扱い](https://www.mlit.go.jp/tochi_fudousan_kensetsugyo/pm_portal/sublease.html)

- **[2025.json:1839](C:/Users/kanet/20260522/wt-LQ10/data/qualification-staging/chintai/2025.json:1839)／問45・肢4**
  死因による告知要否だけでなく、義務の主体を訂正する説明が必要です。「本指針は宅建業者が宅建業法上負う義務を整理したもので、賃貸住宅管理業者に直接、一律の告知義務を課すものではない」と明記してください。[国土交通省・指針概要](https://www.mlit.go.jp/report/press/content/001427709.pdf)
