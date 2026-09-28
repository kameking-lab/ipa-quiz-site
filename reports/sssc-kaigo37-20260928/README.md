# 第37回介護福祉士国家試験 収録証跡

- 対象：第37回（令和6年度、2025-01-26実施）全125問、各5肢、合計625肢。
- 出典：[試験センターの過去問題一覧](https://www.sssc.or.jp/kaigo/past_exam/index.html)、[公式正答](https://www.sssc.or.jp/kaigo/past_exam/pdf/no37/k_kijun_seitou.pdf)、[午前の読み上げ用問題文](https://www.sssc.or.jp/kaigo/past_exam/pdf/no37/listen_k_am_37.html)、[午後の読み上げ用問題文](https://www.sssc.or.jp/kaigo/past_exam/pdf/no37/listen_k_pm_37.html)。
- [過去問題利用条件](https://www.sssc.or.jp/pastissues/index.html)は教育目的の問題集・アプリ等への使用を許し、許諾申請・使用料を不要とし、独自解説と試験センターの無関係を明示するよう求める。問題文の変更は禁止。問題の出典と独立性の表示を全問に設置した。
- 問題本文・選択肢は公式の読み上げ用HTMLから抽出。13冊の公式PDFと正答PDFおよびHTMLのSHA-256は `official-transcription.json` に固定。125問分の正答照合値は `official-answer-keys.json` に固定した。問題121の問題文は公式PDF本文から、図は同PDFの系図部分から取り出した。読み上げ用HTMLに含まれる図の説明は正答が分かるため設問本文に置かない。
- 解説は Gemini 3.8 Flash で下書きし、別リクエストで125問を独立査読。121件PASS、4件FIX、HOLDなし。全125問の査読状態は `review-receipt.json`。問題39・88・99・114は一次資料で修正した。問題1の選択肢5も過度な断定を避けた。
- 個別照合：[認知症施策推進大綱の進捗確認](https://www.mhlw.go.jp/wp/seisaku/hyouka/dl/r06_jizenbunseki/00_zentai.pdf)、[総義歯の着脱順](https://www.mhlw.go.jp/content/001489487.pdf)、[ウェルシュ菌芽胞の耐熱性](https://www.mhlw.go.jp/content/11130500/000759552.pdf)、[パーキンソン病重症度分類](https://www.nanbyou.or.jp/entry/314)。
- 制度等の解説は出題時点の内容に基づき、公開面で法改正等の注意書きを表示する。

問題データは `data/questions/kaigo/2024-annual.json`。既存の第38回125問と合わせ、介護福祉士は2回分250問となる。
