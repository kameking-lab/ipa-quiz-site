# 2025年掲載・免許試験の選択肢別解説

対象は `data/exam-library/papers/lckohyo-LC2025*.json` の公式択一672問（3,360肢）。特級ボイラー技士の記述16問は別の模範解答対象であり、五肢解説の母数に含めない。既存のプレーン解説は全688問にあり、構造化解説は今回の着手前に0問だった。

| バッチ | 正本の設問 | 完了 | 公式原本・根拠の照合 |
| --- | --- | ---: | --- |
| 01 | 第二種衛生管理者 `lckohyo-LC20252115-q1`～`q5` | 5問・25肢 | 協会の2025年10月掲載[問題・正答入りPDF](https://www.exam.or.jp/wp-content/uploads/2025/10/LC20252115.pdf)の2～4ページで正答番号1,3,4,5,1を再照合。e-Govの労働安全衛生法、同施行令、労働安全衛生規則、労働基準法施行規則と厚生労働省のストレスチェック案内を各肢に照合。Opus独立レビューの初回FIXを修正し再審査した。 |

出典リンクの公開欄は `.go.jp` の一次資料だけとし、協会PDFは設問・正答の原典リンクに限る。各肢の解説は「その肢を選ぶ理由／選ばない理由」を個別に書き、正答選択肢だけを詳しくして残りを定型文にしない。構造化レコードは設問原文SHA-256、公式正答、5肢、政府資料を既存validatorとUIローダーの双方で照合する。加えて同一問内で同じ理由を複写した場合は拒否する。

検証: `node scripts/validate-safety-exams.mjs --require-explanations` PASS、構造化解説455件（うち今回5件）。`__tests__/exam-library-choice-explanations.test.ts` 14件、`__tests__/exam-library-integration.test.ts` 5件、`__tests__/validate-safety-exams-explanations.test.ts` 4件、ESLint、TypeScript typecheckがPASS。残りは2025年択一667問・3,335肢。`coverage-contract.json` はこの回30問を完了するまで要求対象に加えないため、今回の5件を紙全体の完成とは扱わない。
