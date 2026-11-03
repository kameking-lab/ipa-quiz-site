# qual-new:8 R7上下水道 最終私有引渡し

令和7年度（2025）技術士第一次試験・専門科目10「上下水道」Ⅲ-1～Ⅲ-35の**実原問35問・全175肢を独立内容受入済み**。独立レビュー3担当が原問・公式正答・公開一次根拠に照合し、全35問pass、実質修正指摘0、内容HOLD0。既存原稿を再生成せず、原問・選択肢・年度・番号・出題時点・解説は同じ版を維持した。

`INDEPENDENT-ACCEPTANCE.json` が受入ID・入力hash・レビュー報告hashを結ぶ最終票。`review/reviewer-1-12.json`、`review/reviewer-13-24.json`、`review/reviewer-25-35.json` が別担当による実結果。従来の `CHECKS.json` は著者票としてそのまま保存しており、独立受入へ読み替えていない。

## 採用材料

- `questions.json`：原問・各肢・正答・全肢理由・出典・原文画像の対応。
- `全35問・全肢解説.md`：通読用。`manuscript.txt`：原稿保存。
- `data/exam-library/papers/` と `data/exam-library/choice-explanations.delta.json`：既型に寄せた候補データ。
- `public/exam-library/`：原本からの設問画像35枚。図形依存0問、表Q1/4/30/33は原表と列対応を保持。
- `evidence/`、`official-answer-key.json`、`sources.json`、`figures.json`、`ORIGINAL-PROVENANCE.json`：公式原本・正答・由来・画像位置。
- `FINAL-CHECKS.json`、`FILES.json`：最終整合とファイルhash。

最不適切問題では、誤った記述の肢が選ぶべき正答になる。Q19⑤「分けずに」、Q27②「剛性管」、Q29必要面積200m²、Q31脱水体積比1/10～1/5、Q30の一酸化二窒素、Q32の臭気分解温度、Q33の測定法に依存するBOD/CODの扱いを維持。解説を公式解説とは称さない。

## 残る共有工程（main専有）

共有適用担当は `01a18919-2bca-71a1-aee9-c0486fa7203b`。固定入力base `b9760e7eb3d5a34a8cf36bf08133e50ed9ec7957573de4a7523e0a956f87337b` の既型は本資格のgroup/ID、engineer.or.jp、.go.jp以外の一次出典等に未対応。`INTEGRATION-CHECK.json` の具体差に沿って、mainが登録・読込・出典の扱いを接続する。このpacketを無変換投入すれば動くとの保証ではない。採用する最終ID・原文に合わせてhashを照合する。実runtime同一性・本番収録状況は断定しない。

独立内容受入は完了しておりmain待ちの残件ではない。共有採用0、本番公開0。公開/build/deploy/preview/merge/push/鍵/契約/認証/DB/永続設定変更は実施していない。追加Playground API送信0・費用0（判断理由は `API-DECISION.json`）。

先の候補ZIPと別note IS067のZIPはhash不変で保全した。IS067は引き続き原問採用対象外で、今回の35問へ混入させていない。年度未指定・権利再調査・特定モデル必須を新たなgateにはしていない。
