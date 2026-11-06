# 測量士補（国土地理院）・未公開ステージング

測量士補試験（国土地理院）の直近2回、令和8年（2026-05-17）と令和7年（2025-05-18）の全問題を収録する。各28問・五肢択一で計56問。
測量士（`sokuryoshi`）とは別資格であり、データ・ID・正答を共有しない。

`manifest.json`と各問の`publicAllowed`は常に`false`、`needsReview`は`true`。
公開レジストリ（ExamCode、`lib/qualifications/catalog.ts`、`data/questions/index.ts`、通常ローダー、`public/`）には接続しない。
登録用の差分案は`reports/sokuryoshiho-registry.md`にある。

## 作り方

- 2026-11-06に公式一覧 https://www.gsi.go.jp/LAW/SHIKEN/past.html を通常GET（HTTP 200）し、測量士補の問題・解答一覧PDFのURLを確認した。
- PDF 5件のURL・HTTP結果・バイト数・SHA-256は`manifest.json`の`files`にある。原本PDFとページ描画はリポジトリに含めない。
- 問題PDFはほぼスキャン画像でテキスト層がない。PyMuPDFで2倍描画したページ画像を目視して転記した（OCR結果は使っていない）。
- 表は「項目：値」形式のテキストに整理し、空欄は［ア］等で表す。図の要旨は`figureDescription`に書く（原文ではない）。
- 2026年No.25は原本で各肢の2文目に下線がある。下線部を【】で囲み、設問文末に「（【】内は原本で下線が引かれた部分）」と注記した（【】と注記は転記上の表示）。`transcriptionNote`にも記録した。
- 図・地図が解答に必要な11問だけ、原本ページから図の部分を切り出し、`images/`にwebpで保存した。各画像のSHA-256は問題データに入っている。
  両年No.21の地形図は、記号がスマートフォンでも読めるようPDFから4倍で切り出し直した（幅約1,830〜1,860 px、webp品質80）。
- 「巻末の関数表を使用すること」とある20問（各年10問）には、その回の関数表ページ（R7は問題2の13ページ、R8は問題の31ページ）を3倍描画したwebpを`referenceImages`で添付した。
  問題文には関数値を追記していない。表の出典情報は`function-tables.json`にある。
- 公式正答は解答一覧PDFのテキスト層から抽出し、描画画像で目視照合した（`official-answers.json`）。
- 解説はすべて過去問AIの独自作成（`explanationAuthorship: "original"`）。
  既存候補`data/exam-library/survey-assistant/candidate.json`（同一PDF版）の解説と肢別理由を下敷きにした。
  そのうえで原本と公式正答で再検証し、根拠が確認できない条文番号などは削った。全5肢の解説は単独で読めるように書き直した。
- 計算問題（`calculationCheck`あり）はすべて再計算し、主要な計算過程を解説に記載した。
- `sourceTextSha256`は`{"choices": {...}, "question": ...}`をキー順・区切り`", "`/`": "`・NFCでJSON化したUTF-8のSHA-256。目視照合後の改変検知用で、原本との文字一致を証明するものではない。

## 公式正答との不一致（1件）

令和8年No.12（往復較差による再測区間）では、公式正答表が3を示しており、注記はない。
一方、掲載数値と許容範囲2.5 mm√Sで計算すると全区間が許容範囲内となり、計算上は5になる。
許容範囲を2.0 mm√S、又は√なしの2.5 mm×Sとした場合に限り(2)～(3)だけが超過して3になるため、出題側の誤記が疑われる（公式訂正は未確認）。
公式正答は変更せずに`officialAnswerNumber: 3`を保持し、`referenceOnly: true`、`computedAnswerNumber: 5`と`scoringNote`を付けて採点対象外とする。
この扱いは既存の`lib/exam-library/survey-assistant-reference-policy.ts`と同じ。

## 法令の基準日

公式資料に法令の基準日の明記はないため、`lawReferenceDate`は`null`とする。
法令や作業規程の準則に関わる問題の解説は試験日時点の内容である（`legalContextDate`は各試験日）。

## 権利表記（記録のみ）

国土地理院コンテンツ利用規約（令和7年11月20日改正）は、特段の記載がない限り公共データ利用規約（第1.0版、PDL1.0）を適用するとしている。
出典は`sourceAttribution`に記載した（例：「出典：国土地理院 令和8年測量士補試験 No.1。解説は過去問AIの独自作成。」）。
No.21の図（電子地形図25000の一部）は、測量法に基づく複製承認が要るかを公開前に別途確認する。
オーナーの判断により、権利表記の確認は公開可否を止める要因にしない。

## 検証

```powershell
pnpm exec vitest run __tests__/questions/sokuryoshiho-staging.test.ts
```

各回28問、IDの重複なし、公式正答の一致、5肢と5肢解説、`publicAllowed: false`、画像の存在とSHA-256、`sourceTextSha256`の再計算、公開レジストリからの非参照を検査する。
独立レビューは2026-11-06にPASS（`reports/sokuryoshiho-review.md`）。指摘されたP2（No.25の下線部明示、No.21地図の高解像度化、関数表の添付）とP3（留保表現の具体化、転記注記の修正、No.12への2.5 mm×Sの追記、誤答肢の由来説明）を反映した。
