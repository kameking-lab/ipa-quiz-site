# IPA 2024–2025 全肢解説の受入手順

対象は `ap`、`ip`、`sg`、`fe` の公開済み2024・2025年問題です。現在の正本では502問、2,053肢です。IPは公開済みデータが2024年100問だけであり、存在しない2025年問題は生成しません。

## データの置き場所

問題本文、選択肢、公式正答は自動生成済みの `by-year` を正本とし、変更しません。全肢解説だけを次の試験別overlayへ保存します。

- `data/questions/ap/choice-explanations-2024-2025.json`
- `data/questions/ip/choice-explanations-2024-2025.json`
- `data/questions/sg/choice-explanations-2024-2025.json`
- `data/questions/fe/choice-explanations-2024-2025.json`

## 品質ゲート

1. 現問題の本文、全選択肢、公式正答、既存解説を入力にして5問単位で草稿を作る。
2. 正答は変更しない。正答肢は正しい理由、誤答肢はその肢が誤りである具体的な理由を40文字以上で書く。
3. 選択肢ごとに固有語を含め、結論だけの文や他問への使い回しを拒否する。
4. 草稿担当とは別の高品質モデルが、正答整合、全肢固有性、テンプレ不使用、公式正答維持を設問単位で審査する。
5. PASSだけをoverlayへ入れ、`reviews/` のreceiptに現問題source SHAとoverlay SHAを固定する。FIXは修正して再審査する。
6. `pnpm exec tsx scripts/validate-ipa-choice-explanations.ts` で登録済み全件を検証する。全502問完成時だけ `--complete` を付け、未作成も失敗にする。

草稿用の入力は次のように出力できます。

```bash
pnpm exec tsx scripts/validate-ipa-choice-explanations.ts --exam=ap --limit=5 --dump=.cache/ipa-choice-explanations/ap-q001-005.json
```

自動検査だけでは意味の正しさを保証できないため、独立レビューreceiptが一致しない解説は受入件数に含めません。
