# 宅建 2024年度・公開証跡

- 公式原本: [RETIO 令和6年度 問題・正解番号表](https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf)
- PDF SHA-256: `82a95815f991567ebc4982b05a15a71f6ec942bd6794c3bafe3bcf9c2e985bae`
- 原本29ページ。50問・各4肢・公式正答50件、法令基準日2024年4月1日。
- `extracted.json` は固定ハッシュのPDFから抽出。別取得した同PDFで、問題番号・正答表・全肢を独立照合済み。
- 初稿は5バッチで `claude-opus-5-5` を指定して生成。5バッチの独立監査で46問PASS、問3・34・40・41をHOLD。修正後の別応答による再監査で4問PASS。全12 receiptの `resolvedModel` と `modelUsage` に `claude-opus-5-5` / `firstParty` を記録。
- `takken-2024-build-data.py` は50問と全12 receiptの受入を必須にし、HOLD稿を出力しない。生成した `data/questions/takken/2024.ts` は50問すべて正答・主解説・ア〜エ個別解説を含む。問50のルビ改行だけを表示用に正規化。
- 2025年度の既存50問は `2025.ts` に分離し、`index.ts` で両年度を統合。法令基準日を年度ごとに保持。
- ローカル検証: typecheck PASS、問題検証15,523問 fail=0、宅建年度別テスト5件PASS、全テスト3,966件PASS（`--maxWorkers=2`）。本番ビルドは確認中。
