# LQ9 検証記録

2026-11-04 / origin/main `00e49b940` 起点 / `qual/shohi-sodan-20261104`。

## 対象と結果

- 消費生活相談員2025・2024年度: 各160小問、計320小問、770肢解説。
- マンションリフォームマネジャー学科2026・2025年度: 各50問、計100問、400肢解説。
- 合計420問・1,170肢。保留０問。公開registry/loader・公開一覧への登録０、public静的図版０。
- 法令基準日: 消費生活相談員は各年度５月１日、マンション学科は各年度４月１日。
- 問題と正答は公式PDF、解説は独自作成。元URL・PDFページ・SHA-256は各source-audit参照。

## 機械検証

- `pnpm.cmd validate:questions`: **26,864問 / ok=26,864 / fail=0 / warn=17,007**。警告は解説の文字数や表現等で、既存データも含む。終了コード０。
- `pnpm.cmd typecheck`: **PASS**（終了コード０）。
- `pnpm.cmd test -- __tests__/questions/lq9-staging.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/questions/get-questions.test.ts`: **３ファイル・1,162件PASS**（終了コード０）。
- `python scripts/verify-lq9-sources.py --pdf-dir <公式PDF保存先>`: **原本６本のSHA-256・ページ数一致、全420問の本文・選択肢を比較して不一致０**。明示した空白・ルビ・下線表示の変更のみ正規化。
- 全66問の下線強調はReactMarkdown+remark-gfmで実際にHTML化し、すべてstrongとして表示され、リテラルの`**`が残らないことを検証。
- 公式正答は別抽出のofficial-answer-keysと全420問で一致。消費生活相談員の○×／下線指摘／文章選択のラベル変換もテスト。
- 図１点の候補data URIとprivate assetsのbytesが一致し、publicへの配置がないことをテスト。

実行証跡: `reports/lq9-evidence/`。node_modulesは既存ローカル依存へのjunctionで、コミット対象外。

## 独立レビュー

指定された `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` で実施。

1. IPA専用一覧への混入、ルビ、スロッシングとバルジングの対比、public図版配置を修正。
2. 一部の下線を代替するMarkdown強調が描画されない問題を修正。全66問を実表示テストへ追加。
3. 消費生活相談員2025大問12②の解説を、営業所等ではない喫茶店での契約（特商法２条１項１号）と特定顧客（同項２号）の区別が分かる内容へ修正。
4. 修正とPDF照合はPASS。レビューのread-only環境でVitestがspawn EPERMとなったため、ホストで完了した検証証跡を提示して最終判定を依頼。
5. **PASS**（提示したホスト検証証跡と、read-only環境で再実行した６PDF・420問本文照合に基づく）。最終記録は `reports/lq9-independent-review-5.md`。第３回の内容レビューで挙がった必須指摘は解消済み。第５回で全1,170肢を改めて再審査したという主張ではない。

レビューは未公開ステージングとしての検収であり、公開・法改正後の更新を許可するものではない。push・PR・デプロイは実施していない。
