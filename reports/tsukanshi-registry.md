# tsukanshi（通関士）共有レジストリ差分案

W3 では共有レジストリも UI も編集していない。データは `data/qualification-staging/tsukanshi/2025.json`（第59回 65原問・105解答単位）。第60回は `sources/transcription-60.json` に問題文のみ（正答待ち）。
元の WIP（`origin/claude/compassionate-brahmagupta-wkiu7v` 47110393c）は共有レジストリと UI を直接変更していたが、現在の main とは衝突するため取り込まず、必要な差分を以下にまとめた。WIP のコミットそのものも参照可能。

## lib/questions/types.ts
```ts
| "tsukanshi"                                         // ExamCode
| "tsukan-law" | "customs-law" | "tsukan-practical"   // Session
// license の union に追加
| "CUSTOMS-attributed"
```

## lib/exam-config.ts
```ts
tsukanshi: {
    code: "tsukanshi", nameFull: "通関士試験", urlSlug: "tsukanshi", level: "advanced",
    sessions: [
        { session: "tsukan-law", urlSlug: "tsukan-law", expectedQuestions: 20, label: "通関業法", categories: ["通関業法"] },
        { session: "customs-law", urlSlug: "customs-law", expectedQuestions: 30, label: "関税法等", categories: ["関税法等"] },
        { session: "tsukan-practical", urlSlug: "tsukan-practical", expectedQuestions: 15, label: "通関実務", categories: ["通関実務"] },
    ], seasons: ["annual"], yearRange: { start: 2025, end: 2025 },
},
```
通関実務の expectedQuestions は収録対象15（第1・2問の申告書作成式を除く）。第60回の正答公表後は yearRange.end を 2026 にする。第60回は構成が違う（通関業法17問・関税法等28問・通関実務14問＋申告書2問）。

## lib/qualifications/catalog.ts
```ts
{
    slug: "tsukanshi", examCode: "tsukanshi", shortName: "通関士", fullName: "通関士試験",
    domain: "legal", administrator: "財務省関税局・税関",
    officialQuestionsUrl: "https://www.customs.go.jp/tsukanshi/",
    officialReuseTermsUrl: "https://www.customs.go.jp/kiyaku.htm",
    status: "ready-to-ingest",
    reuseSummary: "第59回（2025年）の通関業法・関税法等・通関実務65原問（語群の空欄ごと105解答単位）を公式問題・公式正答どおりに保存。全空欄・全記述・計算過程に条文・通達を示した独自解説。申告書作成式2問は対象外。第60回は問題文のみ転記し正答公表待ち。",
    attributionTemplate: "出典：税関 第○回通関士試験（○年）科目 第○問・同正答及び配点。解説は過去問AIの独自作成で税関とは関係ありません。",
    remainingWork: ["第60回の公式正答（2026-11-10以降）を確認して解答・解説を追加", "公開判断"],
},
```

## lib/questions/display.ts（WIP の差分を現行に当てる）
- `PLAIN_NUMBER_CHOICE_EXAMS` に `"tsukanshi"`。
- 択一式の「該当なし＝0」を内部キー「カ」で持つ。表示で「カ」を「0」とするため `choiceDisplayLabel(exam, key, question?: Pick<Question,"part">)` に `if (exam === "tsukanshi" && key === "カ" && !question?.part) return "0";` を追加し、呼び出し側（QuizPlayer / StreamQuizPlayer / QuestionAnswerCard / ExplanationCard / OrderingAnswerInput / QuestionSourcePresentation / DailyChallengeClient / CopilotPanel / q ページ / formatQuestionAnswerForDisplay）で `question` を渡す。語群問題（part あり）の15番目「ソ」は「15」のまま。詳細は WIP コミット 47110393c の該当ファイルの差分を参照。

## lib/questions/practice-session.ts
`PRACTICE_SESSIONS` に `"tsukan-law", "customs-law", "tsukan-practical"`、ラベル `"tsukan-law": "通関業法", "customs-law": "関税法等", "tsukan-practical": "通関実務"`、`defaultPracticeSession` に `if (exam === "tsukanshi") return "tsukan-law";`。

## lib/utils.ts / lib/seo/exam-meta.ts / lib/questions/source-label.ts
- `EXAM_LABELS`: `tsukanshi: "通関士",`
- exam-meta 状態説明: `tsukanshi: "第59回の65原問（105解答単位）を公式正答どおりに保存。全空欄・全記述・計算過程に独自解説。"`、表示名 `tsukanshi: "通関士試験"`、カテゴリ説明 `` tsukanshi: (c) => `通関士試験の${c}。公式正答どおりに収録。` ``
- source-label（公式出典名）: `tsukanshi: "税関"`（WIP と同じ）。

## data/questions/tsukanshi/index.ts・data/questions/index.ts・lib/questions/get-questions.ts
```ts
// data/questions/tsukanshi/index.ts
import type { Question } from "@/lib/questions/types";
import q2025 from "@/data/qualification-staging/tsukanshi/2025.json";
export const TSUKANSHI_QUESTIONS: Question[] = q2025 as Question[];
// index.ts / get-questions.ts は shihoshoshi と同形（isExamPublished("tsukanshi")）
```

## scripts/validate-questions.ts
公開前にも検証対象とするなら候補配列へ `TSUKANSHI_QUESTIONS` を追加（WIP と同じ）。現状は `__tests__/questions/w3-law-customs-staging.test.ts` が staging を検査する。

## 注意
- 「すべてを選び」形式は `requiredSelections` で正解の数を示す（原問は個数を示さない）。表示方針は公開時に判断。
- runtime-pins: tsukanshi 2025=105。
