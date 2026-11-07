# caremanager（介護支援専門員実務研修受講試験）新規資格 — 公開接続の差分案（親が直列で反映）

データは `data/qualification-staging/caremanager/{2024,2025}.json`（各60問、独立レビュー PASS 済み）。
公開する場合は以下を反映する。表示名に都道府県名は付けない（発行元の都道府県は各問の `sourceAttribution` だけ）。

## 1. lib/questions/types.ts
`ExamCode` に `| "caremanager"` を追加。

## 2. 新規ローダー data/questions/caremanager/index.ts（新規ファイル。親が作成）

```ts
import type { ChoiceKey, Question } from "@/lib/questions/types";
import y2024 from "@/data/qualification-staging/caremanager/2024.json";
import y2025 from "@/data/qualification-staging/caremanager/2025.json";

const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
type Item = {
  id: string; year: number; round: number; examDate: string; qNumber: number; lawAsOf: string;
  section: string; category: string; topicTags: string[]; question: string;
  choices: Record<"1" | "2" | "3" | "4" | "5", string>; requiredSelections: number;
  officialAnswerNumbers: number[]; summary: string;
  choiceExplanations: Record<"1" | "2" | "3" | "4" | "5", string>; lawSensitive: boolean;
  sourcePdfUrl: string; sourceAnswerUrls: string[]; sourceAttribution: string;
};
const NOTICE = (date: string) => `\n※出題時点（${date}）の法令・基準に基づく解説です。その後の改正等で結論が変わる場合があります。`;

function toQuestion(item: Item): Question {
  const answer = item.officialAnswerNumbers.map((n) => KEYS[n - 1]!) as ChoiceKey[];
  if (answer.length !== item.requiredSelections || answer.length < 2) throw new Error(`Invalid caremanager ${item.id}`);
  return {
    id: `caremanager-${item.year}-annual-gakka-q${item.qNumber}`,
    exam: "caremanager",
    session: "gakka",
    year: item.year,
    season: "annual",
    qNumber: item.qNumber,
    examDate: item.examDate,
    subject: item.category,
    officialAnswerNumber: item.officialAnswerNumbers.join(","),
    type: "multiple-choice",
    category: item.category,
    topicTags: item.topicTags.length ? item.topicTags : [item.category],
    difficulty: 2,
    question: item.question,
    choices: Object.fromEntries(KEYS.map((k, i) => [k, item.choices[String(i + 1) as "1"]])),
    answer,
    requiredSelections: answer.length,
    explanation: `${item.summary}${item.lawSensitive ? NOTICE(item.lawAsOf) : ""}`,
    choiceExplanations: Object.fromEntries(KEYS.map((k, i) => [k, item.choiceExplanations[String(i + 1) as "1"]])),
    explanationCoverage: "full",
    hasImage: false,
    sourcePdfUrl: item.sourcePdfUrl,
    sourceAnswerUrl: item.sourceAnswerUrls[0],
    sourceAttribution: item.sourceAttribution,
    license: "PREF-published",
    lawReferenceDate: item.lawAsOf,
    lastUpdated: "2026-11-06",
  };
}

export const CAREMANAGER_QUESTIONS: Question[] = [...(y2025 as Item[]), ...(y2024 as Item[])].map(toQuestion);
```
（`license` の値の型が union なら既存の値に合わせる。`lawReferenceDate` が Question 型に無ければ削る）

## 3. data/questions/index.ts
```ts
import { CAREMANAGER_QUESTIONS } from "./caremanager";
...(isExamPublished("caremanager") ? { caremanager: CAREMANAGER_QUESTIONS } : {}),
```

## 4. lib/questions/get-questions.ts
```ts
caremanager: async () => isExamPublished("caremanager") ? (await import("@/data/questions/caremanager")).CAREMANAGER_QUESTIONS : [],
```

## 5. lib/exam-config.ts
```ts
caremanager: {
    code: "caremanager",
    nameFull: "介護支援専門員実務研修受講試験",
    urlSlug: "caremanager",
    level: "basic",
    sessions: [{
            session: "gakka",
            urlSlug: "gakka",
            expectedQuestions: 60,
            label: "試験問題",
            categories: ["介護支援分野", "保健医療サービスの知識等", "福祉サービスの知識等"],
        }],
    seasons: ["annual"],
    yearRange: { start: 2024, end: 2025 },
},
```

## 6. lib/qualifications/catalog.ts
```ts
{
    slug: "caremanager",
    examCode: "caremanager",
    shortName: "ケアマネ",
    fullName: "介護支援専門員実務研修受講試験",
    domain: "welfare",
    administrator: "都道府県（全国共通問題）",
    officialQuestionsUrl: "https://www.fukushi.metro.tokyo.lg.jp/kourei/shikaku/r7_seitoukijyun",
    officialReuseTermsUrl: "https://www.fukushi.metro.tokyo.lg.jp/kourei/shikaku/r7_seitoukijyun",
    status: "live",
    reuseSummary: "第27回（令和6年度）・第28回（令和7年度）の各60問、計120問を、公式正答と全選択肢の解説付きで収録。",
    attributionTemplate: "出典：第○回介護支援専門員実務研修受講試験 問題○（○○掲載）",
    remainingWork: ["第29回（2026-10-11）は正答公表（合格発表 2026-11-24 予定）後に追加", "法改正・報酬改定で成立しなくなった問題の失効管理"],
},
```

## 7. lib/seo/exam-meta.ts
```ts
// description
caremanager: "介護支援専門員実務研修受講試験（ケアマネ試験）の第27回・第28回（令和6・7年度）全120問を収録。「2つ選べ」「3つ選べ」は全部そろえて採点し、公式正答と全選択肢の解説を確認できます。",
// short name
caremanager: "ケアマネ試験（介護支援専門員実務研修受講試験）",
// count template
caremanager: (c, y, k) => `介護支援専門員実務研修受講試験（ケアマネ試験）を${c}問・${y}回分・${k}分野で収録。公式正答と全選択肢の解説で学べます。解説は過去問AIの独自作成です。`,
```

## 8. lib/home/home-directory.ts
```ts
{ code: "caremanager", name: "ケアマネジャー", sub: "介護支援専門員実務研修受講試験", domain: "welfare" },
```

## 9. lib/utils.ts（EXAM_LABELS）
```ts
caremanager: "ケアマネ試験",
```

## 10. 共有だが上の一覧にないファイル（親判断）
- `lib/questions/display.ts` の `PLAIN_NUMBER_CHOICE_EXAMS` に `"caremanager"`（選択肢を 1〜5 で表示）。
- `lib/questions/practice-session.ts` の既定セッション一覧に `"caremanager"`（→ "gakka"）。
- `lib/seo/question-jsonld.ts` の複数選択系の分岐に `q.exam === "caremanager"` を追加するか確認。
- runtime-pins フィクスチャに新資格の問題数 120 を追加。
