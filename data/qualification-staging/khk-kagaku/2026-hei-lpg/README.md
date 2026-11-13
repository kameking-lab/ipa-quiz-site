# 丙種化学（液石）2026年度・非公開保管

法令（CX）・保安管理技術（CY）・学識（CZ）の公式原問各20問、合計60問。独自解説と全300選択肢の解説を保存している。公式正答は変更していない。

高圧ガス全区分が揃ってから一括公開する方針のため、全問とmanifestの `publicAllowed` は `false`。配信対象の `data/questions/khk-kagaku/ready.json`・`public-questions.json`、カタログ、公開ローダー、画像許可リストには追加していない。このフォルダを本番コードからimportしない。

- `questions.json`: 既存のQuestion形式、IDは `khk-kagaku-2026-annual-cx-q1` 等。法令基準日は2026-04-01。実施日はこの作業で確認していないため未設定。
- `official-answer-keys.json`: 公式正答表のCX・CY・CZ各20件。1～5を既存のア～オへ対応させる。
- `sources.json`: 公式問題3冊・公式正答1冊のURL、SHA-256、ページ数。法令4件はe-Gov改正履歴から2026-04-01以前で最新の施行版を確認した。
- `review.json`: 原文内容のダイジェスト、確認ページ、数値計算5問の再計算結果、画像の原本・切出し座標・ハッシュ。
- `images/`: 原本の共通設例表2点を描き直さず切り出したPNG。13問の `imageUrls` は将来の既存API形式に合わせているが、まだ配信許可リストに登録していない。ローカルの照合は `review.assets` の対応表で行う。

公式本文20ページと正答表1ページを画像で確認し、PyMuPDFから転記した本文・全300選択肢・共通設例・公式正答を別のpdfplumber抽出結果と照合した。全角英数字・記号のNFKC正規化とPDFの折返し・空白の整形のみ行っている。

学識問20は、公式正答4（イ・ロ・ニ）と原文をそのまま保持している。ロのフッ素ゴム一般の耐寒性は、確認したメーカー資料では耐寒性改良グレードの説明にとどまり、一般化は未確認。`needsReview=true` とし、技術確認を `review.technicalReview` に残した。残る59問は原本・正答・解説の照合を完了した。

検証:

```sh
pnpm validate:questions --staging=khk-kagaku-2026-hei-lpg
pnpm exec vitest run __tests__/questions/khk-kagaku-2026-hei-lpg.test.ts --maxWorkers=1
pnpm typecheck
```

原本PDFと今回限りの抽出・照合スクリプトは実行フォルダ `tools/q2-new-1/` に保存した。原本を再取得する場合も `sources.json` のハッシュと照合する。
