# 安全衛生試験の選択肢別解説契約

択一問題の新しい解説は `data/exam-library/choice-explanations.json` に問題ID単位で追加する。
既存の `explanations.json` は、記述式の模範解答と構造化移行前の表示に残す。

```json
{
  "cskohyo-CS20251902-q1": {
    "sourceHash": "問題textのSHA-256（64桁）",
    "correctChoice": 5,
    "summary": "設問全体の判断基準",
    "choices": [
      { "number": 1, "verdict": "incorrect", "reason": "選択肢固有の理由（40字以上）" },
      { "number": 2, "verdict": "incorrect", "reason": "選択肢固有の理由（40字以上）" },
      { "number": 3, "verdict": "incorrect", "reason": "選択肢固有の理由（40字以上）" },
      { "number": 4, "verdict": "incorrect", "reason": "選択肢固有の理由（40字以上）" },
      { "number": 5, "verdict": "correct", "reason": "正答の根拠（40字以上）" }
    ],
    "sources": [
      { "title": "e-Gov 労働安全衛生法", "url": "https://laws.e-gov.go.jp/law/347AC0000000057" }
    ]
  }
}
```

解説根拠のURLは HTTPS の `go.jp` 配下だけを許可する。出題原典である安全衛生技術試験協会のPDFはカタログと問題画面の「公式PDF」リンクに残し、解説根拠の `sources` には入れない。

ローダーは原文ハッシュ、公式正答、5選択肢、各判定、理由、政府一次資料をすべて検証する。一つでも不整合があれば構造化解説を表示せず、既存のプレーン解説へフォールバックする。公開前は次を実行する。

1回分の移行とレビューが完了したら、`coverage-contract.json` の `structuredChoiceExplanations.requiredPaperIds` にその paper ID を追加する。以後、その回に含まれる公式択一問題は構造化解説が一つでも欠けるとvalidatorとintegration testが失敗する。

```bash
node scripts/validate-safety-exams.mjs
node scripts/validate-safety-exams.mjs --require-consultant-five-years
```

`--require-explanations` は、取り込んだ全問のプレーン解説まで完成した編集リリースで追加する。5年収録の正本は `data/exam-library/coverage-contract.json`。2021〜2025年の11科目すべてが取り込まれるまで、後者のコマンドは不足年度・科目を列挙して失敗する。
