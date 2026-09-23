# 第一種作業環境測定士・全肢解説の受入台帳

2025年の5紙100問と2026年の13紙260問、計18紙360問が対象。紙IDは`official-catalog.json`の`group=emkohyo`かつ`date`の年が2025または2026で抽出し、各公式択一の原文・正答・5肢を確認する。`EM2026...`だけで数えると、2026年2月の共通4紙80問が漏れる。

`scripts/emkohyo-choice-status.py`を実行すると、年度・紙ごとに草稿、静的検証、公開overlayを分けて表示する。草稿やモデルのPASSは公開件数には含めない。`scripts/emkohyo-choice-orchestrate.py 2`は5問単位の未作成草稿だけを最大3並列で生成し、中断後に再開できる。政府資料を直接確認できない肢は`reviewIssues`に残し、無関係なURLを付けて通さない。

2025有機溶剤Q1〜3の最初の独立審査ではQ2のみPASS、Q1・Q3はFIXだった。SDSの温度表示とDMF構造・融点を補修した。Q2・Q3は現在候補hashと一次資料pack hashが一致する独立審査でPASSとなり、公開overlayへ追加済み。Q1は20℃から25℃への蒸気圧推定に依存するため公開保留。Q4は捕集・真空瓶手順、Q5は物質別の捕集材と脱着溶媒の政府一次資料が足りず保留。Q6は厚労省の拡散式と日本原子力研究開発機構の化学種別拡散係数資料を追加し、現在候補・資料hashで独立審査PASS、公開overlayへ追加済み。Q7は換算値と検知管値の計算式を厚労省告示・通達と直接照合し、5肢の算術と出典の独立審査を経て追加した。現時点の公開受入は4/360問。その他の草稿は、静的検証と一次資料検証が済むまで公開受入しない。

科目別一次資料packは`subject-source-registry.json`と`emkohyo-build-subject-source-packs.py`で9科目を一度取得し、URL・本文hash・該当ページ/抜粋を固定する。各5問はその科目packと、必要に応じて物質別SDSだけを入力する。同じ政府ページを問題ごとに検索し直さず、packにない論点だけ個別に探索する。pack内のURLが生きていても肢の理由を直接支えない場合は保留する。

法令の長文は先頭ページや科目共通の数抜粋だけでは個別条文が欠ける。`emkohyo-cache-source-text.py`で16原典の全文をSHA照合してローカルに保持し、`emkohyo-expand-mhlw-law-pages.py`で厚労省の分割法令25ページをURL・SHA別に固定した。今後の草稿では`emkohyo_source_retrieval.py`が問題文と既存解説から該当部分だけを検索し、設問別に根拠候補を渡す。公開判断は別の原文・正答・政府資料照合で行い、検索結果だけで承認しない。旧草稿は自動受入せず、根拠不足が残る問だけ再起票する。

`coverage-contract.json`の`emkohyoTwoYearTarget`に18紙360問を固定した。通常の検証では対象紙と収録数・現受入数を表示し、`node scripts/validate-safety-exams.mjs --require-em-two-years`は360問すべてで全肢解説が揃うまで失敗する。`requiredPaperIds`は既存の公開済み必須集合として維持し、未完成のEMを完了とは呼ばない。
