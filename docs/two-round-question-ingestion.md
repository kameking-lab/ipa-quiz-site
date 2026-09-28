# 公式問題を2回分追加する手順

1. 実施団体の公式ページで、**別の2回**の問題と正答を確認する。PDFの公開年月、実際の出題期間、法令基準日、転載条件を別々に記録する。問題・正答が同一PDFなら両URLに同じ公式URLを入れる。許可取得中であることを転載許可済みと扱わない。
2. 公式PDFをローカルの一時領域に保存し、`pdfplumber` 等で文字を抽出する。問番号と正答表を別々に解析し、各回で `1..N` が一度ずつ現れることを検査する。図、表、ルビ、文字化け、解答訂正はPDFのページ画像も確認する。PDFの原ファイルや抽出草稿は問題データのコミットに含めない。
   - 問題PDFがスキャン画像で文字層が無い場合（例：技術士・日本技術士会）は、ページ画像を解像度を変えて2回独立に転記し、機械差分の不一致を原本の拡大切り出しで裁定したうえで、別担当が原本と1字ずつ照合する。転記・差分・裁定・照合結果は `reports/<作業名>/transcription/` に残す（例：`reports/gijutsushi-soukan-20260929`）。
3. Antigravity の Gemini Pro High 等へ、10問程度ずつ原文と**公式正答**を渡して全選択肢の解説案を作る。モデルには出典URLや法令条文を推測して作らせない。特に「いくつ」「組合せ」問題では、設問内の記述ア・イ・ウと、画面の選択肢1〜4（内部キーのア・イ・ウ・エ）を区別する。
4. 別実行で草稿と原文・正答を照合し、疑義のある肢を一次資料で確認する。数値、法令基準日、選択肢の順番、正答訂正を重点的に見る。`needsReview` を消すのは人手で原本と根拠を確認できた問題だけとする。
5. `Question` の `officialAnswerNumber`、`answer`、4〜5肢の `choiceExplanations`、`sourcePdfUrl`、`sourceAnswerUrl`、`sourceAttribution`、`lawReferenceDate` を設定する。公式が複数肢を個別に正解と認めた場合は `answer: ["ア", "エ"]` とし、`requiredSelections` は設定しない。両方の選択を要求する設問だけ `requiredSelections: 2` とする。
6. 問題ごとの公式正答を固定したテストと、各回の収録数・全肢解説を検査するテストを追加する。公開前に次を実行する。資格を追加する際は回の指定を入れ替える。

```powershell
pnpm exec tsx scripts/validate-questions.ts --exam=kanri
pnpm exec tsx scripts/verify-two-round-coverage.ts --exam=kanri --expected-per-round=50 --round=2024-annual --round=2025-annual
pnpm exec vitest run __tests__/questions/kanri-two-publications.test.ts
pnpm exec tsc --noEmit
```

`verify-two-round-coverage.ts` は収録数、選択肢解説の存在、出典、査読状態を機械検査する。解説の法的・技術的な正確さや権利者の許可を証明するものではない。CI・本番配信後に匿名画面で年度、問番号、正誤、誤答解説を確認する。
