# 電験三種2025年度・作業中断点

- 2025年度上期・理論Q1–10は、公式問題・正答PDF、原図、全肢、必要な図をOpusで直接照合し、10問/10解答単位/50肢が最終PASS。`py -3.12 scripts/denken3-2025-strict-partial.py` は10/160、公開ゲートCLOSED。
- 次のQ11–15は**未受入**。初回レビューの原文は `pending/20250831-theory-q11-15-initial.json`、SHA-256 `4aeeff9fc83215d0ddc2560cf62b0d9574884ad6744820822b3149de54a6ef63`。結果はQ14だけPASS、Q11/12/13/15はFIX。元candidateはGit対象外の `data/raw_pdfs/denken3/review/20250831/theory/qXX-vision-draft.json`。
- Q11: ホール素子の電流・磁界からの偏向導出、電極/電流の図説明を修正。Q12: 肢2のエネルギー換算とヒータ配線の図説明を修正。Q13: 動作点のグラフ読み取りを(6 V, 4.0 mA)と(10 V, 4.4 mA)に直し、図だけ再クロップ。Q15: Δ結線の循環電流に関する前提、(b)肢1の矛盾を修正し、Ė_cラベルが入るよう図を再クロップ。`scripts/denken3-2025-figure-crops.json` のQ11–15範囲は未確定。
- 修正後は `scripts/denken3-2025-direct-review.py 20250831 theory <FIX番号>` で現在candidate＋原図＋図を再入力し、PASSかつ全issue配列空のみを `denken3-2025-promote-reviewed.py` へ渡す。古い初回PASSをQ14以外へ流用しない。
- 2025年度下期は試験日2026-03-22であり、年初の `2025*` ファイル名だけを数えてはいけない。`denken3-2025-strict-partial.py` はmanifestのfiscalYearで対象日を取る。
- 試験センターへの利用状況通知と16紙320解答単位の全問PASSまでは、電験三種をliveへ昇格しない。
