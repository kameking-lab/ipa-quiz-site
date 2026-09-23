# 2025・2026年掲載の免許試験の選択肢別解説

対象は `data/exam-library/papers/lckohyo-LC2025*.json` と `lckohyo-LC2026*.json` の公式択一各672問、計1,344問（6,720肢）。2025年の特級ボイラー技士の記述16問は別の模範解答対象であり、五肢解説の母数に含めない。2025年の既存プレーン解説は全688問にあり、構造化解説は今回の着手前に0問だった。

| バッチ | 正本の設問 | 完了 | 公式原本・根拠の照合 |
| --- | --- | ---: | --- |
| 01 | 第二種衛生管理者 `lckohyo-LC20252115-q1`～`q5` | 5問・25肢 | 協会の2025年10月掲載[問題・正答入りPDF](https://www.exam.or.jp/wp-content/uploads/2025/10/LC20252115.pdf)の2～4ページで正答番号1,3,4,5,1を再照合。e-Govの労働安全衛生法、同施行令、労働安全衛生規則、労働基準法施行規則と厚生労働省のストレスチェック案内を各肢に照合。Opus独立レビューの初回FIXを修正し再審査した。 |
| 02 | 同 `q6`～`q10` | 5問・25肢 | 同PDFの4～6ページで正答番号3,5,2,1,2を再照合。Opus生成とは別の独立レビューで25肢・一次法令を再検証し、指摘された労基則34条の根拠リンクを追加した。 |
| 03 | 同 `q11`～`q15` | 5問・25肢 | 公式PDFの正答と原文を照合。独立抜取の`q11`はPASS。`q13`は当初の引用資料に換気量式がなくFIXとなったため、厚労省研究報告書PDF79頁の数式を実見し、選択肢2の定常条件と出典名を修正して再審査PASS。検証receiptは`docs/evidence/lckohyo-choice-batches/809ebb2daf02.json`。同一原文・正答の2026年`lckohyo-LC20260414-1-q15`はfingerprint一致を確認して再利用。 |

出典リンクの公開欄は `.go.jp` の一次資料だけとし、協会PDFは設問・正答の原典リンクに限る。各肢の解説は「その肢を選ぶ理由／選ばない理由」を個別に書き、正答選択肢だけを詳しくして残りを定型文にしない。構造化レコードは設問原文SHA-256、公式正答、5肢、政府資料を既存validatorとUIローダーの双方で照合する。加えて同一問内で同じ理由を複写した場合は拒否する。

検証: `node scripts/validate-safety-exams.mjs --require-explanations` PASS、構造化解説466件（既存450件＋今回15件＋重複1件）。`__tests__/exam-library-choice-explanations.test.ts` 14件、`__tests__/exam-library-integration.test.ts` 5件、`__tests__/validate-safety-exams-explanations.test.ts` 4件、ESLint、TypeScript typecheckがPASS。残りは2025年択一657問・3,285肢、2026年択一671問・3,355肢。`coverage-contract.json` の対象集合には2025・2026年の全38紙、各672問を固定し、完了要求集合へは各紙の公式択一全問を仕上げてから移す。今回の16件を紙全体の完成とは扱わない。

以後は `scripts/complete-safety-choice-explanations.py` で既存のClaude契約を用い、5～8問のバッチを最大3件まで並列生成する。各バッチは機械的な原文・正答・五肢・政府資料ゲートと、別セッションによる一次資料の抜取レビューを通るまで掲載データへ統合しない。原文・正答・肢数が完全一致する設問だけ再利用し、未完の紙は `coverage-contract.json` の完成集合に含めない。
