# shiho-tanto（司法試験 短答式）共有レジストリ差分案

W3 ブランチ `qual/w3-20261106` では共有レジストリを編集していない。公開判断のときに親が以下を直列で反映する。
データは `data/qualification-staging/shiho-tanto/{2026,2025}.json`（各109解答単位・77原問）。

## lib/questions/types.ts
```ts
// ExamCode の union に追加
| "shiho-tanto"
// Session の union に追加（yobi-tanto と共用）
| "constitution" | "civil-law" | "criminal-law"
```
`license: "MOJ-attributed"` は既存値。staging レコードには型に無い補助フィールド（`sourcePage`, `officialPoints`, `references`, `transcriptionNote`）がある。取り込み時に削るか、`as Question[]` のキャストで持ち込む（shihoshoshi と同じ）。

## lib/exam-config.ts（EXAM_CONFIGS）
```ts
"shiho-tanto": {
    code: "shiho-tanto", nameFull: "司法試験（短答式）", urlSlug: "shiho-tanto", level: "specialist",
    sessions: [
        { session: "constitution", urlSlug: "constitution", expectedQuestions: 20, label: "憲法", categories: ["憲法"] },
        { session: "civil-law", urlSlug: "civil-law", expectedQuestions: 37, label: "民法", categories: ["民法"] },
        { session: "criminal-law", urlSlug: "criminal-law", expectedQuestions: 20, label: "刑法", categories: ["刑法"] },
    ], seasons: ["annual"], yearRange: { start: 2025, end: 2026 },
},
```
expectedQuestions は原問数。レコードは解答欄単位（憲法 40・民法 37・刑法 32。刑法の「２個選びなさい（順不同）」4問は1レコードで requiredSelections: 2）。

## lib/qualifications/catalog.ts
```ts
{
    slug: "shiho-tanto", examCode: "shiho-tanto", shortName: "司法試験（短答）", fullName: "司法試験 短答式（憲法・民法・刑法）",
    domain: "legal", administrator: "法務省",
    officialQuestionsUrl: "https://www.moj.go.jp/jinji/shihoushiken/jinji08_00295.html",
    officialReuseTermsUrl: "https://www.moj.go.jp/hisho06_00280.html",
    status: "ready-to-ingest",
    reuseSummary: "令和8・7年の短答式（憲法・民法・刑法）各77問・109解答欄を公式問題・公式正解どおりに保存。各記述の個別解答・組合せ・順不同2個選択を解答欄単位で再現し、全記述・全選択肢に条文・判例を示した独自解説を付けています。",
    attributionTemplate: "出典：法務省 令和○年司法試験 短答式試験問題（科目）第○問・同正解及び配点。解説は過去問AIが独自作成。",
    remainingWork: ["公開判断", "部分点（2問正解で1点等）の表示方針の決定"],
},
```

## lib/questions/display.ts
`PLAIN_NUMBER_CHOICE_EXAMS` に `"shiho-tanto"` を追加（原問の選択肢は算用数字1〜8。記述ごとの問は 1=正しい等／2=誤っている等）。

## lib/questions/practice-session.ts
`PRACTICE_SESSIONS` に `"constitution", "civil-law", "criminal-law"` を追加し、`practiceSessionLabel` に `constitution: "憲法", "civil-law": "民法", "criminal-law": "刑法"` を追加。`defaultPracticeSession` に `if (exam === "shiho-tanto") return "constitution";`。

## lib/utils.ts（EXAM_LABELS）
```ts
"shiho-tanto": "司法試験（短答）",
```

## lib/seo/exam-meta.ts
```ts
// 状態説明マップ
"shiho-tanto": "令和8・7年の短答式（憲法・民法・刑法）各77問を解答欄単位で保存。全記述に条文・判例を示した独自解説。",
// 表示名マップ
"shiho-tanto": "司法試験 短答式",
// カテゴリ説明
"shiho-tanto": (c) => `司法試験 短答式の${c}。各記述の正誤・組合せ問題を公式正解どおりに収録。`,
```

## data/questions/shiho-tanto/index.ts（新規、取り込み時）＋ data/questions/index.ts / lib/questions/get-questions.ts
```ts
// data/questions/shiho-tanto/index.ts
import type { Question } from "@/lib/questions/types";
import q2026 from "@/data/qualification-staging/shiho-tanto/2026.json";
import q2025 from "@/data/qualification-staging/shiho-tanto/2025.json";
export const SHIHO_TANTO_QUESTIONS: Question[] = [...q2026, ...q2025] as Question[];

// data/questions/index.ts
import { SHIHO_TANTO_QUESTIONS } from "./shiho-tanto";
...(isExamPublished("shiho-tanto") ? { "shiho-tanto": SHIHO_TANTO_QUESTIONS } : {})

// lib/questions/get-questions.ts
"shiho-tanto": async () => isExamPublished("shiho-tanto") ? (await import("@/data/questions/shiho-tanto")).SHIHO_TANTO_QUESTIONS : [],
```
staging レコードは `publicAllowed: false`。公開時は true にするか取り込み時に外す。

## lib/home/home-directory.ts
法律系の並びで `shihoshoshi` の直後に `"shiho-tanto"`（公開判断後）。

## __tests__/fixtures の runtime-pins
公開時に問題数ピンを追加: shiho-tanto 2026=109, 2025=109（解答欄単位）。
