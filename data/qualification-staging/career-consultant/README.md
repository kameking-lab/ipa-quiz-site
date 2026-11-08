# 国家資格キャリアコンサルタント試験 学科（W5・未公開）

第33回（2026-11-01）・第32回（2026-07-05）の学科試験 各50問、計100問。4肢択一。
`publicAllowed=false`、`publicationStatus=staging`。公開レジストリ・ローダーには接続しない（差分は `reports/career-consultant-registry.md`）。

- 原本：キャリアコンサルティング協議会の問題・正答PDF（日本キャリア開発協会にも同一問題を掲載）。URL・SHA-256・取得日は `manifest.json`。
  第33回は両機関のPDFがバイト一致、第32回はバイト差があるが文字層は完全一致。直近3回しか掲載されないため、古い回は消える。
- 法令等の基準日：両回とも 2026-04-01（問題用紙の注意事項）。
- 選択肢キー：公式番号 1→ア, 2→イ, 3→ウ, 4→エ。`officialAnswerNumber` に公式番号を保持。
- 本文は PDF 文字層から抽出し、折返し改行だけを結合（PDF 由来の「45 歳」等の空白は原文のまま）。図表なし。
  最終ページのフッター（著作権表示）は本文に含めない。
- 解説は全肢とも過去問AIの独自作成。報告書・統計からの出題は一次資料で照合した箇所を `explanationNotes` に記録。
  `explanationConfidence` は作成時の自己評価（high/medium、low なし）。
- 問題用紙に「無断転載・無断複製を禁ず」の記載あり。オーナー決定（2026-11-04）により権利文言では止めず、記録のみ。公開可否は親・オーナーが判断する。

## 再現・照合

```powershell
# manifest の4本を通常GETで <dir> に 33_mondai.pdf / 33_seito.pdf / 32_mondai.pdf / 32_seito.pdf として保存
python scripts/ingest-career-consultant.py --source-dir <dir>      # SHA・本文・全肢・正答を保存JSONと照合
pnpm vitest run __tests__/questions/career-consultant-staging.test.ts
```

独立レビュー：`reports/career-consultant-review.md`。
