# 測量士（国土地理院）未公開収録

CQ2。候補の根拠は COV1 B の上位40候補・第3位。測量士補とは別資格。
直近2回は2026年5月17日、2025年5月18日。各回午前28問（五肢択一）、
午後は必須No.1と選択No.2～5（記述、実際の受験時は選択から2題を解答）。

`publicAllowed=false`。このディレクトリを公開ルート、公開問題レジストリ、
`public/`、API、Copilotインデックスへ登録しない。

問題・公式正答・午後公式解答例・解答用紙13件をWindows標準HTTPSの通常GETで取得。
原本PDFは一時領域のみ。SHA-256、取得方法、URL、ページ画像をsource-manifest.jsonに保存する。
本文に文字層のないページ、数式の一部しか抽出できないページがあるため、
原文の正本は無劣化WebPページ画像とする。図表・地形図・関数表・解答用紙も保持する。
OCRは転記照合の補助であり、原文の代わりにしない。

出典：国土地理院 令和7年・令和8年測量士試験問題・解答一覧・解答例。
ページ画像化、問題との対応付け、独自解説は過去問AIが作成・加工。
一般利用規約に加えて、地図・空中写真等の測量成果の複製・使用に関する手続と
第三者権利の確認は公開判断時に別途必要。未公開収録は転載許可済みという意味ではない。
法令・作業規程等は出題時点のものと現行のものを混同しない。

検証:

```powershell
pnpm validate:questions --staging=sokuryoshi
pnpm typecheck
pnpm exec vitest run __tests__/questions/sokuryoshi-staging.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/exam-catalog-browser.test.tsx __tests__/survey-assistant-candidate.test.ts
```

午後の公式解答例は採点基準の全体ではない。記述・作図の一例として原文画像を保持し、
択一正答や完全一致による自動採点へ変換しない。`needsReview=true`は人手による
最終原本・根拠確認前の公開を防ぐために維持する。

独立レビュー: gpt-6-astra / read-only の別プロセスによる再レビュー8でPASS。
詳細は `reports/cq2-sokuryoshi/review-8-result.md`。これは非公開収録のレビュー結果で、
`publicAllowed=false` と `needsReview=true` は維持する。
ページ参照の `page` はPDFの1始まりのページ番号で、紙面に印刷された通し番号とは区別する。
